# Aimis Personal Website

Personal blog and study notes built with Hexo + Fluid theme, hosted on GitHub Pages.

URL: https://aimi8023.github.io/

## Tech Stack

- [Hexo](https://hexo.io/) v8 - static site generator
- [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) - Material Design theme
- GitHub Pages

## Project Structure

```
source/
- _posts/       # Blog posts (Markdown)
- about/        # About page
- images/       # Images
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

Available categories: backend, frontend, tools, misc.

## Deploy

```bash
npx hexo clean; npx hexo deploy
```

Pushes to gh-pages branch. GitHub Pages auto-deploys.

## Author

Aimi - CS Master at ECUST