---
title: 在线工具
date: 2026-07-20 21:30:00
---

<style>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}
.tool-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 0.5rem 0.8rem;
  border: 1px solid var(--border-color, #e8e8e8);
  border-radius: 14px;
  background: var(--card-bg, #fff);
  text-decoration: none;
  color: var(--text-color, #333);
  transition: all 0.18s;
  cursor: pointer;
  gap: 0.4rem;
}
.tool-app:hover {
  border-color: #4a90d9;
  box-shadow: 0 2px 10px rgba(74,144,217,0.13);
  transform: translateY(-2px);
  color: inherit;
}
.tool-app .icon {
  font-size: 1.8rem;
  line-height: 1;
}
.tool-app .name {
  font-size: 0.75rem;
  text-align: center;
  word-break: keep-all;
  color: var(--text-secondary, #555);
}
.tool-app.add-more {
  border-style: dashed;
  color: var(--text-secondary, #bbb);
  font-size: 1.5rem;
}
.tool-app.add-more:hover {
  border-color: #aaa;
  box-shadow: none;
  transform: none;
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
html[data-user-color-scheme="dark"] .tool-app.add-more {
  color: #555;
}
</style>

<div class="tools-grid">
  <a class="tool-app" href="/tools/json-formatter/">
    <span class="icon">{ }</span>
    <span class="name">JSON 格式化</span>
  </a>
  <div class="tool-app add-more">+</div>
</div>
