# Issue tracker: GitHub Issues

本仓库的 Issues 和 PRD 都存放在 GitHub Issues 中。所有操作通过 `gh` CLI 完成。

## 操作约定

- **创建 Issue**：`gh issue create --title "..." --body "..."`。多行正文可用 heredoc。
- **读取 Issue**：`gh issue view <编号> --comments`，可用 `jq` 过滤评论内容，同时获取标签。
- **列出 Issues**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` 配合 `--label` 和 `--state` 过滤。
- **评论 Issue**：`gh issue comment <编号> --body "..."`
- **打标签/去标签**：`gh issue edit <编号> --add-label "..."` / `--remove-label "..."`
- **关闭 Issue**：`gh issue close <编号> --comment "..."`

仓库信息通过 `git remote -v` 自动推断——在 clone 内执行时 `gh` 会自动识别。

## 外部 PR 是否纳入 triage

**否。** 本仓库不将外部 PR 视为需求入口，/triage 只处理 Issues。

## 技能引用约定

- 当技能说"发布到 issue tracker"：创建 GitHub Issue。
- 当技能说"获取相关 ticket"：执行 `gh issue view <编号> --comments`。

## Wayfinding 操作

供 `/wayfinder` 使用。**地图（Map）**是一个带 `wayfinder:map` 标签的单个 Issue，其**子 ticket** 是子 Issue。

- **Map**：一个带 `wayfinder:map` 标签的 Issue，内容包含 Notes / 当前决策 / Fog 主体。`gh issue create --label wayfinder:map`。
- **子 ticket**：关联为 GitHub sub-issue 的 Issue（通过 `gh api` 调用 sub-issues 端点）。若 sub-issues 不可用，则在 map 正文的任务列表中加入该子项，并在子项正文顶部写上 `Part of #<map编号>`。标签使用 `wayfinder:<类型>`（`research` / `prototype` / `grilling` / `task`）。一旦认领，将该 ticket 分配给当前开发者。
- **阻塞关系**：使用 GitHub 原生 issue 依赖。添加阻塞边：`gh api --method POST repos/<所有者>/<仓库>/issues/<子>/dependencies/blocked_by -F issue_id=<阻塞者数据库ID>`，其中 `<阻塞者数据库ID>` 是阻塞者的数字数据库 ID（`gh api repos/<所有者>/<仓库>/issues/<编号> --jq .id`，**不是** `#编号` 或 `node_id`）。GitHub 通过 `issue_dependencies_summary.blocked_by` 报告未关闭的阻塞者。若依赖不可用，退而在子项正文顶部写入 `Blocked by: #编号, #编号`。当所有阻塞者关闭时，ticket 不再被阻塞。
- **前沿查询（Frontier query）**：列出 map 下所有打开的 children（`gh issue list --state open`，限定到 map 的子 Issue / 任务列表），去掉仍有未关闭阻塞者（`issue_dependencies_summary.blocked_by > 0` 或 `Blocked by` 行中有未关闭 Issue）或已有分配者的项；按 map 顺序取第一个。
- **认领**：`gh issue edit <编号> --add-assignee @me`——当前对话的第一次写操作。
- **解决**：`gh issue comment <编号> --body "<答案>"`，然后 `gh issue close <编号>`，最后将上下文指针（gist + 链接）追加到 map 的 "当前决策" 部分。
