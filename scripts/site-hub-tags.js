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

hexo.extend.tag.register('recent_posts', (args) => {
  const limit = Math.max(1, Number.parseInt(args[0], 10) || 4);
  const posts = getPosts().slice(0, limit);

  return `
    <div class="home-posts">
      ${posts.map((post) => `
        <a class="home-post" href="${escapeHtml(siteUrl(post.path))}">
          <div class="home-post-meta">
            <span>${escapeHtml(categoryName(post))}</span>
            <time datetime="${post.date.format('YYYY-MM-DD')}">${post.date.format('YYYY-MM-DD')}</time>
          </div>
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.description || '查看文章详情')}</p>
          <span class="home-arrow" aria-hidden="true">→</span>
        </a>
      `).join('')}
    </div>
  `;
});
