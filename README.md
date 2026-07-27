# Aimi's Personal Knowledge Hub

A personal knowledge hub built with Hexo + Fluid, combining technical writing, learning records, project work, and browser-based tools.

Site: https://aimi8023.github.io/

## Current Sections

- **Articles**: technical notes and learning records.
- **Projects**: portfolio and engineering practice.
- **Toolbox**: local-first utilities that process data inside the browser.
- **About**: profile, technical interests, and contact information.

## Online Tools

| Tool | Path | Current capabilities |
|------|------|----------------------|
| JSON Formatter | `/tools/json-formatter/` | Format and validate JSON, tree editing, search, navigation, file import, copy, and download |
| Image Converter | `/tools/image-converter/` | Batch JPG/PNG/WebP conversion, target-size percentage or quality compression, proportional resize, original/result comparison, individual download, and ZIP download |

The image tool defaults to WebP and a target size of 70% of each source image. Processing and ZIP creation happen locally without uploading files.

## Tech Stack

- [Hexo](https://hexo.io/) v8
- [Fluid](https://github.com/fluid-dev/hexo-theme-fluid)
- Vanilla HTML, CSS, and JavaScript for online tools
- GitHub Actions and GitHub Pages

## Project Structure

```text
source/
├── index.md                  # Custom homepage
├── _posts/                   # Articles and learning notes
├── projects/                 # Project portfolio
├── tools/                    # Toolbox and standalone tools
├── about/                    # About page
└── images/                   # Local images
scripts/
└── site-hub-tags.js          # Homepage and section components
quality/
├── check-content.js          # Source content checks
└── check-build.js            # Generated page and link checks
.github/workflows/deploy.yml  # main → gh-pages deployment
_config.yml                   # Hexo config
_config.fluid.yml             # Fluid theme config
scaffolds/                    # Post templates
```

## Local Development

Node.js 22 or newer is required.

```bash
npm install
npm run server
```

Open http://localhost:4000/.

## Write a New Post

```bash
npx hexo new your-post-title
```

Edit the generated Markdown file in `source/_posts/`.

### Front matter

```yaml
---
title: Post Title
date: 2025-10-24 23:18:25
tags: [tag1, tag2]
categories: [category]
---
```

Available categories: 后端、前端、工具、杂项.

## Quality Checks

```bash
npm run check
```

This checks source metadata and secret placeholders, generates the site, validates internal links, and verifies the generated tool structure and script syntax.

## Deployment

Pushing `main` triggers `.github/workflows/deploy.yml`. The workflow:

1. installs dependencies with Node.js 22;
2. runs content checks and the Hexo build;
3. validates generated links and tool pages;
4. scans for leaked secrets;
5. publishes `public/` to `gh-pages`.

Manual deployment remains available as a fallback:

```bash
npm run clean
npm run deploy
```

## Author

Aimi — CS Master's student at ECUST.
