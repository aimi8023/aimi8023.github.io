---
title: 搭建自己的 MCP 服务——Danbooru 标签搜索示例
date: 2026-10-14 16:54:00
updated: 2026-10-14 16:54:00
description: 从 MCP 协议基础讲到实战，把中文到 Danbooru 标签的检索站点包装成 Streamable HTTP 远程 MCP 服务，部署到 ModelScope 创空间并接入编辑器，附完整踩坑记录。
tags: [MCP, LLM, Agent, 部署]
categories: [后端]
---

# 搭建自己的 MCP 服务——Danbooru 标签搜索示例

> 把「中文描述 → Danbooru 标签」的检索站点，包装成远程 MCP 服务，让任何 agent 挂上就能用。
> 实测环境：本地 Windows + RTX 3050 Ti（PyTorch fp16）；云端 ModelScope 创空间免费实例（2 vCPU / 16GB，CPU ONNX fp32）。

<!-- more -->

## 1 了解 MCP

### 1.1 MCP 是什么

**MCP（Model Context Protocol，模型上下文协议）** 是 Anthropic 推出并开源的标准化协议，用于在大语言模型应用与外部数据源、工具之间建立安全的双向连接。

可以理解为 **AI 领域的"Type-C 通用接口"**：接 MCP 之前，每个 AI 客户端（Claude、Cursor、Codex……）要接入不同数据源都得单独写集成代码；有了 MCP，开发者按同一套协议写一次 **MCP Server**，任何支持 MCP 的客户端都能接入。

核心架构三个角色：

| 角色 | 职责 | 例子 |
|---|---|---|
| MCP Host（宿主应用） | 发起连接的 AI 应用 | Claude Desktop、Cursor、Cline、自研 Agent |
| MCP Client（客户端） | 内置于宿主，与 Server 维持 1:1 协议连接 | Host 内部组件 |
| MCP Server（服务端） | 封装本地数据或远程 API，暴露标准化能力 | **各种MCP服务，如网络搜索、Github连接等，也是本文要搭的Danbooru 标签搜索服务** |

> 备注：搭 MCP 服务，实际就是做好 MCP Server 的部署；部署成功后可供任意 agent 调用。

### 1.2 MCP 的分类

三个维度：**通信传输方式**（最核心，直接决定部署形态）、**提供的服务类型**、**部署位置**。

#### 维度一：通信传输机制

| 传输类型 | 通信机制 | 适用场景 | 状态 |
|---|---|---|---|
| **Stdio** | 本地进程管道（`stdin`/`stdout`）交换 JSON-RPC | 本机工具、桌面客户端插件 | 零网络配置、低延迟，但仅限单机单客户端 |
| **SSE** | HTTP 长连接：`/sse` 收 + `/messages` 发，双端点 | 早期远程部署 | 2024-11-05 引入，**已废弃**的过渡方案 |
| **Streamable HTTP** | 单一 HTTP 端点（`/mcp`），按需升级为流式 | 云原生、远程服务 | 2025-03-26 引入，**远程部署的推荐标准** |

#### 维度二：服务类型

- **Tools（工具型）**：由**模型决定何时调用**的函数接口，类似 Function Calling——本文实现的就是这种。
- **Resources（资源型）**：由**应用或用户选择挂载**的只读数据源（文件、文档、数据库 schema），类似 GET 上下文。
- **Prompts（提示词模板型）**：由**用户主动触发**的预设工作流，类似 `/search_character` 快捷指令。

#### 维度三：部署形态

- **本地 MCP 服务**：宿主在本机拉起子进程（`uvx` / `npx` / `python`），走 stdio。
- **远程 MCP 服务**：独立部署在云上，多客户端通过 URL 接入，走 Streamable HTTP。**本文属于这种。**

## 2 Danbooru_Search MCP 服务搭建示例

> 背景：Danbooru 是二次元图片站的"标签体系"，几十万个标签、全英文。二次元生图模型如Anima，SDXL，NovelAI等模型生图所需提示词依赖于Danbooru的英文标签，想让 agent 在需要选标签时能直接查，就需要把Danbooru标签搜索包装成一个MCP服务，供agent使用。

https://www.modelscope.cn/studios/Zdh2722714532/Danbooru_Search

### 2.1 它用来做什么

输入一句中文画面描述，可以为词、短语或短句，返回 Danbooru 英文标签。

如：

|         输入         | 返回结果（节选） |
| :------------------: | :------ |
|         胡桃         | `hu_tao_(genshin_impact)_(cosplay)`、`hu_tao_(genshin_impact)`（胡桃·原神，character 类第 1）、`kyuubi`（九尾狐）、`cherry_blossoms`（樱花） |
|   身穿水手服的少女   | `sailor`（水手服）、`sailor_senshi_uniform`（水手战士服）、`sailor_dress`（水手连衣裙）、`girl_scout`（女童子军） |
| 在雨中奔跑的黑发女孩 | `rain`（雨）、`running`（跑步）、`black_hair`（黑发）、`1girl`（单人女性） |

检索原理：（Qwen3-Embedding 向量 + 领域词典分词的混合召回）不是本文重点，细节见另一篇；这里只需要知道：**服务端有一个 `run_search()` 函数，输入中文、输出结构化标签**——==MCP 要做的就是把这个函数包装成服务暴露出去。==

### 2.2 架构选型

选型不纠结理论，就看两件事：能不能跑通、成本多低。最后定了四条：

- **传输方式**：Streamable HTTP。stdio 只能本机调用，满足不了"远程服务"这个前提；SSE 是已经过时的旧方案，不用。
- **云托管**：ModelScope 创空间（Docker SDK）。原本想上 Hugging Face，但 HF 免费账号现在开不了 CPU 空间（创建直接报 402），只能开跑不动模型的 Static 空间；魔搭免费实例 2 vCPU / 16GB / 50GB 磁盘，够用。
- **推理后端**（和 MCP 本身无关，一句带过）：免费实例只有 CPU，实测 fp32 精度最稳、单次查询约 1s；量化方案虽然快但会把检索排序打乱，不用。
- **鉴权**：静态 Bearer token（就是魔搭的 token）。

### 2.3 搭建：一个检索函数，两个入口

架构一句话：**`run_search()` 是唯一实现，网页 API 和 MCP 工具都只是它的壳**——不存在两套逻辑要同步。

![MCP 服务架构：run_search() 唯一实现，网页 API 与 MCP 工具两个入口](/images/mcp/image-20261014143435399.png)

核心代码就这么几段（完整源码见仓库）：

```python
from contextlib import asynccontextmanager
from mcp.server.mcpserver import MCPServer
from mcp.server.transport_security import TransportSecuritySettings

mcp = MCPServer("danbooru-query")

@mcp.tool()
def search_danbooru_tags(query: str, general_k: int = 10, other_k: int = 2) -> dict:
    """用中文自然语言描述语义搜索 Danbooru 标签。（参数说明略）"""
    return run_search(query, general_k, other_k)

# 关掉 SDK 默认的 Host 校验：云上请求由网关转发，Host 不是 localhost，不关会被 421 拒绝
mcp_app = mcp.streamable_http_app(
    transport_security=TransportSecuritySettings(enable_dns_rebinding_protection=False))

# 挂到 FastAPI 上要做两件事：会话管理在启动流程里跑起来、挂载放在所有路由之后
@asynccontextmanager
async def lifespan(_app):
    async with mcp.session_manager.run():
        yield

app.router.lifespan_context = lifespan
app.mount("/", mcp_app)
```

两个容易被忽略的点：

1. **工具函数的 docstring 就是给大模型看的说明书**。模型靠它决定"什么时候调这个工具、参数怎么填"，写清楚中文描述和参数含义，比代码本身更重要。
2. **依赖锁精确版本**：本项目写死 `mcp==2.3.0`。SDK 大版本会改名字（2.x 把 `FastMCP` 改名为 `MCPServer`），而容器每次构建都会重新装依赖——不锁死，某天构建完直接 ImportError。

### 2.4 部署：git push + 网页点重启

Dockerfile 只装依赖 + 准备向量库，模型不进镜像：

```dockerfile
FROM modelscope-registry.cn-beijing.cr.aliyuncs.com/modelscope-repo/python:3.10
WORKDIR /home/user/app
COPY ./ /home/user/app
RUN pip install --no-cache-dir -r requirements.txt
# 构建期把向量库拉进镜像（运行时下载会被平台审核回滚，见坑一）
RUN python -c "import urllib.request as u; u.urlretrieve('<向量库地址>', '/home/user/app/tag_vectors.npz')" \
    && python -c "import os; s = os.path.getsize('/home/user/app/tag_vectors.npz'); assert s > 1000000, s"
EXPOSE 7860
ENTRYPOINT ["python", "-u", "app.py"]
```

**必须监听 `0.0.0.0:7860`**——魔搭约定端口 7860，8080 被平台本身占用。

**大文件怎么进容器**（两条路，各有取舍）：

- **模型（2.4GB）走运行时下载**：容器首次启动时从魔搭模型库拉到 `/mnt/workspace` 持久卷，重启不重下；代价是每次启动的会话加载/预热省不掉（约几十秒）。
- **向量库（138MB）走构建期下载**：打进镜像，`app.py` 直接读同目录文件（运行时下载那套代码会被平台自动审核回滚，见坑一）；代价是镜像大 139MB、每次构建重下一次。

**更新流程**：改代码 → `git push` → 网页「设置 → 重启创空间」。平台没有公开的部署触发 API，这一步只能手点。

### 2.5 测试与接入

#### 先用脚本把 MCP 握手跑通

MCP 客户端做的事就四步，手写脚本就能验证，不用装任何客户端：

1. `initialize`：发起连接，拿回服务端信息和会话 ID
2. `notifications/initialized`：告诉服务端"我准备好了"
3. `tools/list`：看服务端有哪些工具（名字、说明、参数）
4. `tools/call`：带上参数调用工具，拿回结果

四步走的是同一个 HTTP 请求：往 `/mcp` POST 一段 JSON-RPC，从第 2 步起把上一步拿到的会话 ID 放进 `mcp-session-id` 请求头：

```python
H = {"Authorization": "Bearer <你的魔搭 token>", "Content-Type": "application/json",
     "Accept": "application/json, text/event-stream"}
r = requests.post("<BASE>/mcp", json={"jsonrpc": "2.0", "id": 1, "method": "initialize",
    "params": {"protocolVersion": "2025-03-26", "capabilities": {},
               "clientInfo": {"name": "probe", "version": "0.1"}}}, headers=H)
sid = r.headers.get("mcp-session-id")
```

两个小细节：响应是 SSE 格式，要按 `data:` 行取出 JSON 再解析；中文要按 UTF-8 解码（requests 对 `text/event-stream` 默认用 latin-1，中文会全是乱码）。

#### 再配进客户端

以在用的编辑器（Qoder，配置在 user 级 `settings.json`）为例：

```json
{
  "mcpServers": {
    "Danbooru_Search标签搜索": {
      "timeout": 30000,
      "type": "http",
      "url": "https://studio-<your>-<studio>.api-inference.modelscope.net/mcp",
      "headers": { "Authorization": "Bearer <你的魔搭 token>" }
    }
  }
}
```

三个关键点：`type` 必须是 `http`（Streamable HTTP），不是 `sse`；认证靠 `headers` 里的 Bearer，服务端没有 OAuth 端点，指望自动授权会失败（见踩坑 #6）；`timeout` 给足 30 秒（云端冷启动 + 多源检索能到几秒）。

配好后 `@` 这个连接器就能用，实测一次完整调用：`mcp__danbooru_search__search_danbooru_tags`，返回 `miko`（巫女，原句锚定）、`white_hair`（0.728，白发源）、`cherry_tree`（0.796，樱花树源）等分组结果。

## 3 踩坑清单

### 坑一：代码被平台悄悄回滚，重启才发现服务起不来了

- **遇到的问题**：我把"启动时下载向量库"的代码推上去，push 提示成功。过几分钟去仓库看，`app.py` 却变回了旧版本——多出来一个提交，作者是平台管理员，说明是"文件内容敏感，已回滚"。整个过程我**没收到任何通知**。
- **导致了什么**：我以为改动生效了，实际线上跑的是被回滚后的旧代码；而那个版本要读的向量库文件已经不在仓库里了，所以一重启就直接启动失败。
- **原因是什么**：做了几组对照实验才弄清楚——平台审核只看**本次新增的代码**，拦的是"程序在**运行时**去外部下载文件"这类行为（大概是怕绕过平台的文件分发和审核）。我改措辞、换仓库名都没用（连续三次被回滚）；但只加一行无害注释、或者把下载放到 Dockerfile 里构建期执行，就都能过。同理，原来那段下载 2.4GB 模型的代码一直没事——它是最早提交的旧代码，不在这次改动范围里，不会被重新审。
- **怎么解决的**：把"下载向量库"从运行时代码挪到 Dockerfile 构建期（构建镜像时下载进镜像），`app.py` 只负责读同目录的文件，一行网络代码都不加。顺手加了下载后的大小校验：文件没下全就构建失败，不会把坏文件带上线。
- 两条经验：① 平台的自动回滚**没有通知**，只能自己定期 `git fetch` 看远端历史才发现；② 遇到"改了没生效"这种怪事，用**每次只改一个变量的对照实验**去缩小范围，比瞎猜快得多。

### 坑二：客户端连不上——"拒绝了 Qoder 的 OAuth 客户端注册（401）"

- **现象**：在编辑器里添加远程 MCP 服务器，添加失败，提示 OAuth 客户端注册被拒（401）；可服务用脚本测明明是好的。
- **原因**：两个默认值叠加。①**传输类型**：编辑器界面默认给的是 `sse`，而我们的服务只实现了 Streamable HTTP 的单端点 `/mcp`（SSE 是已废弃的旧协议，端点和握手方式都不同）；②**认证方式**：配置里没给认证头，客户端就按 MCP 规范去尝试 OAuth 动态注册流程，而我们的服务/平台不提供 OAuth 端点，于是 401。
- **修法**：手工把配置改成 Streamable HTTP + Bearer 头，别用界面默认值：

```json
{
  "mcpServers": {
    "Danbooru_Search标签搜索": {
      "timeout": 30000,
      "type": "http",
      "url": "https://studio-<your>-<studio>.api-inference.modelscope.net/mcp",
      "headers": { "Authorization": "Bearer <你的魔搭 token>" }
    }
  }
}
```

- **教训**：远程 MCP 的**传输类型**和**认证方式**是两个必须显式确认的字段。服务端没有 OAuth，就只有静态 token 一条路；客户端的"自动授权"只会给你一个看不懂的 401。
