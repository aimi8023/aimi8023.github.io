'use strict';

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const siteUrl = (path) => {
  const root = hexo.config.root.endsWith('/') ? hexo.config.root : `${hexo.config.root}/`;
  return `${root}${String(path).replace(/^\/+/, '')}`;
};

const getPosts = () => hexo.locals.get('posts').sort('-date').toArray();

const categoryName = (post) => {
  const categories = post.categories && post.categories.toArray
    ? post.categories.toArray()
    : [];
  return categories[0] ? categories[0].name : '未分类';
};

const renderRecentPosts = (limit) => getPosts()
  .slice(0, limit)
  .map((post) => `
    <a class="garden-post" href="${escapeHtml(siteUrl(post.path))}">
      <time datetime="${post.date.format('YYYY-MM-DD')}">
        <span>${post.date.format('MM.DD')}</span>
        <small>${post.date.format('YYYY')}</small>
      </time>
      <div class="garden-post-copy">
        <span class="garden-post-category">${escapeHtml(categoryName(post))}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.description || '查看文章详情')}</p>
      </div>
      <span class="garden-row-arrow" aria-hidden="true">↗</span>
    </a>
  `)
  .join('');

hexo.extend.tag.register('home_index', () => `
  <div class="garden-home">
    <section class="garden-hero">
      <div class="garden-hero-copy">
        <p class="garden-overline">WELCOME TO MY CORNER OF THE WEB</p>
        <h1>嗨，我是艾米。</h1>
        <p class="garden-intro">计算机专业硕士研究生，关注后端工程、人工智能和实用开发工具。这是我的个人知识站，用来分享我学到的东西，也展示我真正动手完成的作品。</p>
        <div class="garden-actions">
          <a class="garden-button garden-button-primary" href="/about/">关于我</a>
          <a class="garden-button" href="https://github.com/aimi8023">GitHub ↗</a>
        </div>
      </div>
      <aside class="garden-profile" aria-label="关注方向">
        <span class="garden-profile-mark" aria-hidden="true">A</span>
        <p>主要关注</p>
        <ul>
          <li>Java 与 Spring 生态</li>
          <li>LLM 与计算机视觉</li>
          <li>简单可靠的开发工具</li>
        </ul>
      </aside>
    </section>

    <section class="garden-section">
      <header class="garden-heading">
        <div>
          <span class="garden-heading-mark garden-mark-writing" aria-hidden="true"></span>
          <h2>文章</h2>
          <p>技术笔记、实践过程和能够复现的解决方案。</p>
        </div>
        <a href="/articles/">查看全部</a>
      </header>
      <div class="garden-posts">
        ${renderRecentPosts(5)}
      </div>
    </section>

    <section class="garden-section">
      <header class="garden-heading">
        <div>
          <span class="garden-heading-mark garden-mark-project" aria-hidden="true"></span>
          <h2>作品</h2>
          <p>不只展示结果，也记录问题、选择与实现过程。</p>
        </div>
        <a href="/projects/">项目归档</a>
      </header>
      <article class="garden-project">
        <a class="garden-project-hitarea" href="https://anime.zhanghome.qzz.io/" aria-label="访问作品：追番记录"></a>
        <a class="garden-project-source" href="https://github.com/aimi8023/anime-diary">查看源码 ↗</a>
        <div class="garden-project-year">2026</div>
        <div class="garden-project-copy">
          <span class="garden-project-label">在线运行</span>
          <h3>追番记录</h3>
          <p>按季度整理和浏览追过的番剧，支持全局搜索、多条件筛选、标签、评分，以及带密码保护的管理后台。</p>
          <ul>
            <li>Next.js 16</li>
            <li>TypeScript</li>
            <li>Upstash Redis</li>
          </ul>
        </div>
        <span class="garden-project-action" aria-hidden="true">访问作品 ↗</span>
      </article>
    </section>

    <section class="garden-section garden-tools-section">
      <header class="garden-heading">
        <div>
          <span class="garden-heading-mark garden-mark-tool" aria-hidden="true"></span>
          <h2>工具箱</h2>
          <p>在浏览器本地运行，解决开发过程中的具体小问题。</p>
        </div>
        <a href="/tools/">全部工具</a>
      </header>
      <div class="garden-tool-list">
        <a class="garden-tool" href="/tools/image-converter/">
          <span class="garden-tool-icon garden-tool-icon-image" aria-hidden="true">IMG</span>
          <div>
            <span class="garden-tool-status">新工具 · 本地处理</span>
            <h3>图片压缩与转换</h3>
            <p>批量转换 JPG、PNG 与 WebP，调整尺寸、压缩质量或目标体积。</p>
          </div>
          <span class="garden-tool-action">打开工具 ↗</span>
        </a>
        <a class="garden-tool" href="/tools/json-formatter/">
          <span class="garden-tool-icon" aria-hidden="true">{ }</span>
          <div>
            <span class="garden-tool-status">在线可用 · 本地处理</span>
            <h3>JSON 格式化</h3>
            <p>格式化、校验、树形编辑、搜索、复制、文件导入与下载。</p>
          </div>
          <span class="garden-tool-action">打开工具 ↗</span>
        </a>
      </div>
    </section>
  </div>
`);

hexo.extend.tag.register('about_index', () => `
  <div class="editorial-page about-page">
    <header class="page-lead">
      <p class="page-overline">ABOUT ME</p>
      <h1>学习、构建，也把过程分享出来。</h1>
      <p>我是艾米，华东理工大学计算机科学与技术专业硕士研究生。本科毕业于西安科技大学，目前主要关注后端工程、人工智能与开发工具。</p>
      <div class="page-lead-actions">
        <div class="about-email">
          <span>邮箱</span>
          <a href="mailto:2722714532@qq.com">2722714532@qq.com</a>
        </div>
        <a class="garden-button" href="https://github.com/aimi8023">GitHub ↗</a>
      </div>
    </header>

    <section class="about-layout">
      <div class="about-story">
        <p class="section-label">WHY THIS SITE</p>
        <h2>这是我的公开学习档案。</h2>
        <p>这里既记录 Java、Spring Cloud 和前端开发中的实践，也整理 LLM、计算机视觉等 AI 方向的学习与思考。文章尽量写清楚适用版本、踩坑过程和可复现步骤。</p>
        <p>我也会把重复工作做成简单、可靠的在线工具，并记录项目从问题到实现的完整过程。</p>
      </div>
      <aside class="about-facts">
        <dl>
          <div><dt>目前身份</dt><dd>计算机专业硕士研究生</dd></div>
          <div><dt>研究与实践</dt><dd>后端工程 · LLM · 计算机视觉</dd></div>
          <div><dt>常用语言</dt><dd>Python · Java · C · C++</dd></div>
          <div><dt>常用工具</dt><dd>PyTorch · Spring Boot · Git · Linux</dd></div>
        </dl>
      </aside>
    </section>

    <section class="editorial-section">
      <header class="section-heading">
        <div><span class="section-dot section-dot-coral"></span><h2>我在关注</h2></div>
        <p>持续学习的四个方向</p>
      </header>
      <div class="interest-grid">
        <article><span>01</span><h3>后端工程</h3><p>Java、Spring Boot、Spring Cloud 与服务治理。</p></article>
        <article><span>02</span><h3>大语言模型</h3><p>预训练、指令微调、推理优化与工程应用。</p></article>
        <article><span>03</span><h3>计算机视觉</h3><p>图像分类、目标检测和多模态学习。</p></article>
        <article><span>04</span><h3>开发工具</h3><p>把常见重复工作做成轻量、可靠的工具。</p></article>
      </div>
    </section>

    <nav class="page-route-links" aria-label="从这里开始">
      <a href="/articles/"><span>阅读</span><strong>浏览全部文章</strong></a>
      <a href="/projects/"><span>实践</span><strong>查看项目作品</strong></a>
      <a href="/tools/"><span>使用</span><strong>打开在线工具</strong></a>
    </nav>
  </div>
`);

hexo.extend.tag.register('projects_index', () => `
  <div class="editorial-page">
    <header class="page-lead">
      <p class="page-overline">PROJECTS</p>
      <h1>项目与作品</h1>
      <p>这里记录我真正动手完成的东西：它解决了什么问题、为什么这样设计，以及后续还可以如何改进。</p>
    </header>

    <div class="work-catalog">
      <article class="work-card work-card-featured">
        <a class="work-card-hitarea" href="https://anime.zhanghome.qzz.io/" aria-label="访问作品：追番记录"></a>
        <a class="work-card-source" href="https://github.com/aimi8023/anime-diary">查看源码 ↗</a>
        <div class="work-card-meta"><span>2026</span><em>在线运行</em></div>
        <div class="work-card-main">
          <p class="section-label">FULL-STACK WEB APP</p>
          <h2>追番记录</h2>
          <p>一个按季度整理和浏览番剧的个人记录站。支持名称、年份、标签和评分筛选，包含标签管理、数据导出以及带密码保护的内容管理后台。</p>
          <ul><li>Next.js 16</li><li>TypeScript</li><li>Tailwind CSS 4</li><li>Upstash Redis</li></ul>
        </div>
        <span class="work-card-action" aria-hidden="true">访问作品 ↗</span>
      </article>

      <article class="work-card">
        <a class="work-card-hitarea" href="/" aria-label="访问作品：个人知识与作品站"></a>
        <a class="work-card-source" href="https://github.com/aimi8023/aimi8023.github.io">查看源码 ↗</a>
        <div class="work-card-meta"><span>2026</span><em>持续维护</em></div>
        <div class="work-card-main">
          <p class="section-label">PERSONAL WEBSITE</p>
          <h2>个人知识与作品站</h2>
          <p>以 Hexo 和 Fluid 构建的个人知识站，将技术文章、项目作品和在线工具组织在同一个清晰入口中，并加入自动部署与内容质量检查。</p>
          <ul><li>Hexo</li><li>Fluid</li><li>GitHub Actions</li><li>GitHub Pages</li></ul>
        </div>
        <span class="work-card-action" aria-hidden="true">访问站点 ↗</span>
      </article>
    </div>

    <section class="page-note">
      <p class="section-label">NEXT</p>
      <h2>作品会随着学习一起增长。</h2>
      <p>下一阶段会逐步加入 AI 实验、论文复现和更多完整项目复盘，而不是只展示最终截图。</p>
    </section>
  </div>
`);

hexo.extend.tag.register('tools_index', () => `
  <div class="editorial-page">
    <header class="page-lead">
      <p class="page-overline">TOOLBOX</p>
      <h1>在线工具箱</h1>
      <p>一些轻量、直接、保护隐私的小工具。数据默认只在浏览器本地处理，不会上传到服务器。</p>
    </header>

    <section class="privacy-note">
      <span class="privacy-mark" aria-hidden="true">✓</span>
      <div><strong>Local-first</strong><p>粘贴、导入和编辑的数据都留在当前设备中。</p></div>
    </section>

    <div class="tool-catalog">
      <a class="tool-catalog-card" href="/tools/image-converter/">
        <span class="tool-catalog-icon tool-catalog-icon-image" aria-hidden="true">IMG</span>
        <div>
          <span class="tool-catalog-status">新工具 · 浏览器本地运行</span>
          <h2>图片压缩与转换</h2>
          <p>批量转换 JPG、PNG 与 WebP，支持质量压缩、目标体积和等比例缩放。</p>
          <ul><li>格式转换</li><li>批量压缩</li><li>目标体积</li><li>尺寸调整</li></ul>
        </div>
        <span class="tool-catalog-arrow">打开工具 ↗</span>
      </a>
      <a class="tool-catalog-card" href="/tools/json-formatter/">
        <span class="tool-catalog-icon" aria-hidden="true">{ }</span>
        <div>
          <span class="tool-catalog-status">可用 · 浏览器本地运行</span>
          <h2>JSON 格式化</h2>
          <p>格式化、校验、树形编辑、搜索、复制、文件导入与下载。</p>
          <ul><li>格式校验</li><li>树形编辑</li><li>搜索导航</li><li>文件处理</li></ul>
        </div>
        <span class="tool-catalog-arrow">打开工具 ↗</span>
      </a>
    </div>
  </div>
`);

hexo.extend.tag.register('json_tool_intro', () => `
  <header class="tool-page-lead">
    <p class="page-overline">LOCAL BROWSER TOOL</p>
    <h1>JSON 格式化</h1>
    <p>格式化、校验、搜索和编辑 JSON 数据。所有操作都在当前浏览器中完成。</p>
  </header>
`);

hexo.extend.tag.register('image_tool_intro', () => `
  <header class="tool-page-lead">
    <p class="page-overline">LOCAL IMAGE TOOL</p>
    <h1>图片压缩与转换</h1>
    <p>批量转换、压缩和缩放图片。文件只在当前浏览器中处理，不会上传到服务器。</p>
  </header>
`);
