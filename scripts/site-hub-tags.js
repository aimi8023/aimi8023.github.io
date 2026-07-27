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
        <div class="garden-project-year">2026</div>
        <div class="garden-project-copy">
          <span class="garden-project-label">持续维护</span>
          <h3>个人知识与作品站</h3>
          <p>基于 Hexo 与 Fluid 构建，把技术文章、项目作品和在线工具组织在同一个清晰入口中，并通过自动部署与内容检查保持稳定更新。</p>
          <ul>
            <li>Hexo</li>
            <li>Fluid</li>
            <li>GitHub Actions</li>
          </ul>
        </div>
        <div class="garden-project-links">
          <a href="/projects/">项目介绍</a>
          <a href="https://github.com/aimi8023/aimi8023.github.io">查看源码 ↗</a>
        </div>
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
      <a class="garden-tool" href="/tools/json-formatter/">
        <span class="garden-tool-icon" aria-hidden="true">{ }</span>
        <div>
          <span class="garden-tool-status">在线可用 · 本地处理</span>
          <h3>JSON 格式化</h3>
          <p>格式化、校验、树形编辑、搜索、复制、文件导入与下载。</p>
        </div>
        <span class="garden-tool-action">打开工具 ↗</span>
      </a>
    </section>
  </div>
`);
