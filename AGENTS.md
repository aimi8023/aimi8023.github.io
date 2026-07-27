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
| .github/workflows/deploy.yml | main 分支自动检查并部署到 gh-pages |
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

正常发布方式：提交并推送 `main`，由 `.github/workflows/deploy.yml` 自动执行内容检查、构建、链接检查、密钥扫描，并将 `public/` 强制更新到 `gh-pages`。

手动发布仅作为备用：

```bash
npx hexo clean; npx hexo deploy
```

Site: https://aimi8023.github.io/

## Online Tools

工具位于 /tools/ 路径下，每个工具是一个独立页面（source/tools/<工具名>/index.md），HTML/CSS/JS 全部内嵌，不依赖外部库。

### 添加新工具

1. 在 source/tools/ 下创建目录 source/tools/<工具名>/
2. 创建 index.md，含 front-matter + 内联 <style> + HTML + <script>
3. 在 `scripts/site-hub-tags.js` 中注册工具页标题，并更新工具箱和首页卡片
4. 如需公共样式，更新 `source/css/custom.css`
5. 在 `quality/check-build.js` 中补充关键生成结构与脚本语法检查

### 当前工具

| 工具 | 路径 | 功能 |
|------|------|------|
| JSON 格式化 | /tools/json-formatter/ | 格式化/校验 JSON，树形视图，折叠/编辑/搜索/导航 |
| 图片压缩与转换 | /tools/image-converter/ | 本地批量转换 JPG/PNG/WebP；默认按每张原图的 70% 目标体积压缩，也支持画质压缩、等比例缩放、原图/处理后切换、单张下载和 ZIP 批量下载 |

### 图片工具当前约束

- 全程浏览器本地处理，文件不会上传
- 单次最多 20 张，单张不超过 40 MB，输出不超过 4000 万像素或 16384 像素边长
- 仅处理静态 JPG、PNG、WebP
- 暂不支持 HEIC、AVIF、动态 PNG/WebP、裁剪和水印
- 目标体积使用 0–100% 滑杆，每张图片基于自身原始体积独立计算；0% 表示尽可能压小
- 两张及以上图片处理完成后，可将处理结果打包为 ZIP 下载

## Notes

- Node.js >= 22
- `npm run check` 会依次执行源内容检查、站点生成和生成结果检查
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



