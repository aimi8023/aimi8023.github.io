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

hexo.extend.tag.register('site_metrics', () => {
  const posts = getPosts();
  const series = new Set(posts.map((post) => post.series).filter(Boolean));
  const pages = hexo.locals.get('pages').toArray();
  const tools = pages.filter((page) => (
    page.path.startsWith('tools/')
    && page.path !== 'tools/index.html'
  ));

  return `
    <div class="hub-metrics" aria-label="站点内容统计">
      <div class="hub-metric"><strong>${posts.length}</strong><span>篇知识文章</span></div>
      <div class="hub-metric"><strong>${series.size}</strong><span>个学习系列</span></div>
      <div class="hub-metric"><strong>${tools.length}</strong><span>个在线工具</span></div>
      <div class="hub-metric"><strong>持续</strong><span>记录与迭代</span></div>
    </div>
  `;
});

hexo.extend.tag.register('recent_posts', (args) => {
  const limit = Math.max(1, Number.parseInt(args[0], 10) || 4);
  const posts = getPosts().slice(0, limit);

  return `
    <div class="hub-posts">
      ${posts.map((post) => `
        <a class="hub-post" href="${escapeHtml(siteUrl(post.path))}">
          <div class="hub-post-meta">
            <span>${escapeHtml(categoryName(post))}</span>
            <time datetime="${post.date.format('YYYY-MM-DD')}">${post.date.format('YYYY-MM-DD')}</time>
          </div>
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.description || '查看文章详情')}</p>
          <span class="hub-arrow" aria-hidden="true">→</span>
        </a>
      `).join('')}
    </div>
  `;
});

hexo.extend.tag.register('series_overview', () => {
  const groups = new Map();

  for (const post of getPosts()) {
    const name = post.series || '未归入系列';
    if (!groups.has(name)) {
      groups.set(name, []);
    }
    groups.get(name).push(post);
  }

  const ordered = [...groups.entries()]
    .map(([name, posts]) => [
      name,
      posts.sort((left, right) => (
        Number(left.series_order || 0) - Number(right.series_order || 0)
      )),
    ])
    .sort((left, right) => right[1].length - left[1].length);

  return `
    <div class="series-grid">
      ${ordered.map(([name, posts]) => `
        <section class="series-card">
          <div class="series-card-head">
            <span class="series-index">${String(posts.length).padStart(2, '0')}</span>
            <div>
              <h2>${escapeHtml(name)}</h2>
              <p>${posts.length} 篇内容</p>
            </div>
          </div>
          <ol>
            ${posts.map((post) => `
              <li>
                <a href="${escapeHtml(siteUrl(post.path))}">
                  <span>${escapeHtml(post.title)}</span>
                  <small>第 ${Number(post.series_order || 1)} 篇</small>
                </a>
              </li>
            `).join('')}
          </ol>
        </section>
      `).join('')}
    </div>
  `;
});
