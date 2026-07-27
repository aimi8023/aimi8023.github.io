# AGENTS.md - AI Assistant Project Guide

## Overview

Hexo v8 personal blog with Fluid theme, served via GitHub Pages.

## Key Paths

| Path | Purpose |
|------|---------|
| source/_posts/ | Blog posts (Markdown) |
| source/index.md | 自定义知识主页 |
| source/projects/ | 项目作品集 |
| source/about/index.md | About page |
| source/images/ | Local images |
| _config.yml | Hexo config |
| _config.fluid.yml | Fluid theme config |
| scaffolds/post.md | Post template |
| .github/workflows/deploy.yml | CI workflow (WIP) |
| source/tools/ | 在线工具列表页 |
| source/tools/*/index.md | 各工具独立页面（内嵌 HTML/CSS/JS） |
| docs/agents/ | 工程技能配置文档 |

## Post Format

Every post needs front-matter:

```yaml
---
title: Post Title
date: 2025-10-24 23:18:25
tags: [tag1, tag2]
categories: [category]
---
```

Categories: 后端、前端、工具、杂项。

## Image Handling

- Prefer GitHub image hosting (raw.githubusercontent.com)
- Local images: source/images/, refs as /images/xxx.png
- Nacos note images: source/images/nacos/

## Deploy

```bash
npx hexo clean; npx hexo deploy
```

Pushes built site to gh-pages branch. Site: https://aimi8023.github.io/

## Online Tools

工具位于 /tools/ 路径下，每个工具是一个独立页面（source/tools/<工具名>/index.md），HTML/CSS/JS 全部内嵌，不依赖外部库。

### 添加新工具

1. 在 source/tools/ 下创建目录 source/tools/<工具名>/
2. 创建 index.md，含 front-matter + 内联 <style> + HTML + <script>
3. 在 source/tools/index.md 的工具列表中追加卡片

### 当前工具

| 工具 | 路径 | 功能 |
|------|------|------|
| JSON 格式化 | /tools/json-formatter/ | 格式化/校验 JSON，树形视图，折叠/编辑/搜索/导航 |
| 图片压缩与转换 | /tools/image-converter/ | 本地批量转换 JPG/PNG/WebP，质量或目标体积压缩、等比例缩放 |

## Notes

- Node.js >= 22
- hexo-deployer-git handles gh-pages deployment
- hexo-renderer-marked handles Markdown rendering
- Only .md files in source/_posts/
- GitHub Pages configured to serve from gh-pages branch
- hexo-generator-feed 提供 RSS（atom.xml）
- hexo-generator-sitemap 提供站点地图（sitemap.xml）
- 阅读量统计使用不蒜子（busuanzi）

## Agent skills

### Issue tracker

Issues 存在本仓库的 GitHub Issues 中。外部 PR 不作为 triage 入口。详见 `docs/agents/issue-tracker.md`。

### Triage labels

五个标准 triage 角色使用默认标签名。详见 `docs/agents/triage-labels.md`。

### Domain docs

单一上下文（single-context）布局。详见 `docs/agents/domain.md`。



