# 艾米的个人知识站

这是一个基于 Hexo 与 Fluid 主题构建的个人知识站，用于整理技术文章、学习记录、项目作品和浏览器在线工具。

站点地址：https://aimi8023.github.io/

## 当前内容

- **文章**：技术笔记与学习记录
- **作品**：个人项目和工程实践
- **工具箱**：数据只在浏览器本地处理的实用工具
- **关于**：个人介绍、技术方向和联系方式

## 在线工具

| 工具 | 路径 | 当前功能 |
|------|------|----------|
| JSON 格式化 | `/tools/json-formatter/` | JSON 格式化与校验、树形编辑、搜索、导航、文件导入、复制和下载 |
| 图片压缩与转换 | `/tools/image-converter/` | 批量转换 JPG/PNG/WebP、按目标比例或画质压缩、等比例缩放、原图/处理后切换、单张下载和 ZIP 批量下载 |

图片工具默认输出 WebP，并以每张原图体积的 70% 为压缩目标。图片处理和 ZIP 打包均在浏览器本地完成，不会上传文件。

## 技术栈

- [Hexo](https://hexo.io/) v8
- [Fluid](https://github.com/fluid-dev/hexo-theme-fluid)
- 原生 HTML、CSS、JavaScript 在线工具
- GitHub Actions
- GitHub Pages

## 项目结构

```text
source/
├── index.md                  # 自定义首页
├── _posts/                   # 文章与学习笔记
├── projects/                 # 项目作品集
├── tools/                    # 工具箱与独立工具页
├── about/                    # 关于页面
└── images/                   # 本地图片
scripts/
└── site-hub-tags.js          # 首页和各栏目组件
quality/
├── check-content.js          # 源内容检查
└── check-build.js            # 生成页面与链接检查
.github/workflows/deploy.yml  # main 自动部署到 gh-pages
_config.yml                   # Hexo 配置
_config.fluid.yml             # Fluid 主题配置
scaffolds/                    # 内容模板
```

## 本地开发

需要 Node.js 22 或更高版本。

首次拉取项目后安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
npm run server
```

浏览器访问 http://localhost:4000/。修改源文件后，Hexo 会自动重新生成页面；如果内容没有刷新，可以手动刷新浏览器或重新启动开发服务器。

## 开发完成后如何提交和部署

正常流程是将代码推送到 `main`。GitHub Actions 会自动检查、构建并部署到 `gh-pages`，不需要手动执行 `hexo deploy`。

### 1. 查看改动

```bash
git status
git diff
```

确认没有误改文件或提交隐私数据。

### 2. 运行完整检查

```bash
npm run check
```

该命令会检查内容元数据和敏感信息占位符、生成 Hexo 站点、验证内部链接，并检查在线工具的关键结构与脚本语法。

### 3. 暂存并提交

提交全部确认过的改动：

```bash
git add -A
git commit -m "feat: 描述本次新增功能"
```

也可以只暂存指定文件：

```bash
git add source/tools/example/index.md scripts/site-hub-tags.js
git commit -m "feat: 添加示例工具"
```

常用提交类型：

- `feat`：新增功能
- `fix`：修复问题
- `docs`：更新文档
- `style`：调整界面样式
- `refactor`：重构代码
- `chore`：工程配置或维护工作

### 4. 推送并自动部署

```bash
git push origin main
```

推送后，`.github/workflows/deploy.yml` 会自动执行：

1. 使用 Node.js 22 安装依赖
2. 检查源内容
3. 生成 Hexo 站点
4. 检查生成链接和工具页面
5. 扫描意外泄露的密钥
6. 将 `public/` 发布到 `gh-pages`

部署完成后访问：https://aimi8023.github.io/

### 日常提交的完整命令

```bash
git status
git diff
npm run check
git add -A
git commit -m "feat: 描述本次功能"
git push origin main
```

## 手动部署

仅在 GitHub Actions 无法使用时，才考虑手动部署：

```bash
npm run clean
npm run deploy
```

该命令会直接生成站点并推送到 `gh-pages`。正常情况下优先使用 `git push origin main` 触发自动部署。

## 新建文章

```bash
npx hexo new 文章标题
```

编辑生成在 `source/_posts/` 中的 Markdown 文件。

文章 front matter 示例：

```yaml
---
title: 文章标题
date: 2026-07-28 12:00:00
tags: [标签一, 标签二]
categories: [前端]
---
```

可用分类：后端、前端、工具、杂项。

## 作者

艾米，华东理工大学计算机专业硕士研究生。
