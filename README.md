# Aimi's Personal Knowledge Hub

A personal knowledge hub built with Hexo + Fluid, combining technical writing, project work, and practical online tools.

URL: https://aimi8023.github.io/

## Tech Stack

- [Hexo](https://hexo.io/) v8 - static site generator
- [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) - Material Design theme
- GitHub Pages

## Project Structure

```
source/
- index.md      # Custom homepage
- _posts/       # Articles and learning notes
- projects/     # Project portfolio
- tools/        # Online tools
- about/        # About page
- images/       # Images
scripts/
- site-hub-tags.js # Dynamic homepage components
_config.yml       # Hexo config
_config.fluid.yml # Fluid theme config
scaffolds/        # Post templates
```

## Local Dev

```bash
npm install
npx hexo server
# Open http://localhost:4000
npx hexo clean; npx hexo deploy
```

## Write New Post

```bash
npx hexo new your-post-title
```

Edit the .md file in source/_posts/.

### Front-matter

```yaml
---
title: Post Title
date: 2025-10-24 23:18:25
tags: [tag1, tag2]
categories: [category]
---
```

Available categories: 后端、前端、工具、杂项。

## Quality Checks

```bash
npm run check
```

This validates post metadata and secret placeholders, builds the site, and checks generated internal links.

## Deploy

```bash
npx hexo clean; npx hexo deploy
```

Pushes to gh-pages branch. GitHub Pages auto-deploys.

## Author

Aimi - CS Master at ECUST
