---
title: 艾米的学习与创作空间
layout: page
description: 艾米的个人知识站，记录技术学习、项目实践与实用工具。
banner_img: /images/brand/calm-night-background.webp
banner_img_height: 52
banner_mask_alpha: 0.12
---

<section class="home-intro">
  <p class="home-eyebrow">HELLO, I’M AIMI</p>
  <h1>学习技术，动手构建，<br>把过程写清楚。</h1>
  <p class="home-lead">我是艾米，一名计算机专业硕士研究生。这里收录我在后端工程、人工智能和开发工具方向的学习文章与项目实践。</p>
  <div class="home-actions">
    <a class="home-button home-button-primary" href="/articles/">阅读文章</a>
    <a class="home-button" href="/projects/">查看作品</a>
  </div>
  <ul class="home-focus" aria-label="主要关注方向">
    <li>Java / Spring</li>
    <li>LLM / 计算机视觉</li>
    <li>实用开发工具</li>
  </ul>
</section>

<section class="home-section">
  <div class="home-section-heading">
    <div>
      <p class="home-kicker">SELECTED WORK</p>
      <h2>精选作品</h2>
    </div>
    <a href="/projects/">查看全部作品 →</a>
  </div>

  <div class="home-work-grid">
    <a class="home-work home-work-primary" href="/projects/">
      <div class="home-work-top">
        <span>持续维护</span>
        <strong>01</strong>
      </div>
      <p class="home-work-type">PERSONAL WEBSITE</p>
      <h3>个人知识与作品站</h3>
      <p>从普通博客逐步建设成文章、项目和工具互相连接的个人主页，并加入自动部署与内容质量检查。</p>
      <ul>
        <li>Hexo</li>
        <li>Fluid</li>
        <li>GitHub Actions</li>
      </ul>
    </a>

    <a class="home-work" href="/tools/json-formatter/">
      <div class="home-work-top">
        <span>在线可用</span>
        <strong>02</strong>
      </div>
      <p class="home-work-type">BROWSER TOOL</p>
      <h3>JSON 格式化工具</h3>
      <p>在浏览器本地完成格式化、校验、树形编辑、搜索、复制和下载，数据不会上传。</p>
      <ul>
        <li>Vanilla JS</li>
        <li>Local-first</li>
      </ul>
    </a>
  </div>
</section>

<section class="home-section">
  <div class="home-section-heading">
    <div>
      <p class="home-kicker">RECENT WRITING</p>
      <h2>最近文章</h2>
    </div>
    <a href="/articles/">浏览全部文章 →</a>
  </div>

  {% recent_posts 3 %}
</section>

<section class="home-closing">
  <div>
    <p class="home-kicker">ABOUT THIS SITE</p>
    <h2>不只记录结论，也记录如何走到结论。</h2>
    <p>文章尽量写清版本、步骤和踩坑过程；作品则说明它解决的问题、技术选择和后续改进。</p>
  </div>
  <div class="home-closing-links">
    <a href="/about/">了解我 →</a>
    <a href="/tools/">打开工具箱 →</a>
  </div>
</section>
