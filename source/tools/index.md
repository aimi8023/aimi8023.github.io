---
title: 在线工具
date: 2026-07-20 21:30:00
description: 艾米制作的轻量在线开发工具，所有数据默认只在浏览器本地处理。
---

<style>
.tools-intro {
  margin: 0 0 1.5rem;
  padding: 1.1rem 1.25rem;
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.09), rgba(99, 102, 241, 0.07));
}
.tools-intro h2 {
  margin: 0 0 0.35rem;
  font-size: 1.25rem;
}
.tools-intro p {
  margin: 0;
  color: var(--text-secondary, #667085);
}
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}
.tool-app {
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 14px;
  background: var(--card-bg, #fff);
  text-decoration: none;
  color: var(--text-color, #333);
  transition: all 0.18s;
  cursor: pointer;
  gap: 0.85rem;
}
.tool-app:hover {
  border-color: #4a90d9;
  box-shadow: 0 2px 10px rgba(74,144,217,0.13);
  transform: translateY(-2px);
  color: inherit;
}
.tool-app .icon {
  display: grid;
  place-items: center;
  flex: 0 0 2.8rem;
  height: 2.8rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #0284c7, #6366f1);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}
.tool-app .copy {
  min-width: 0;
}
.tool-app .name {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-weight: 650;
  color: var(--text-color, #243044);
}
.tool-app .desc {
  display: block;
  color: var(--text-secondary, #667085);
  font-size: 0.84rem;
  line-height: 1.55;
}
html[data-user-color-scheme="dark"] .tool-app {
  background: #1e1e1e;
  border-color: #444;
}
html[data-user-color-scheme="dark"] .tool-app:hover {
  border-color: #4a90d9;
}
html[data-user-color-scheme="dark"] .tool-app .name {
  color: #aaa;
}
html[data-user-color-scheme="dark"] .tools-intro p,
html[data-user-color-scheme="dark"] .tool-app .desc {
  color: #a7b0bf;
}
</style>

<div class="tools-intro">
  <h2>轻量、直接、保护隐私</h2>
  <p>工具在浏览器本地运行，不会上传你粘贴或导入的数据。</p>
</div>

<div class="tools-grid">
  <a class="tool-app" href="/tools/json-formatter/">
    <span class="icon">{ }</span>
    <span class="copy">
      <span class="name">JSON 格式化</span>
      <span class="desc">格式化、校验、树形编辑、搜索、复制与下载。</span>
    </span>
  </a>
</div>
