'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const postsDir = path.join(root, 'source', '_posts');
const allowedCategories = new Set(['后端', '前端', '工具', '杂项']);
const failures = [];

for (const name of fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'))) {
  const file = path.join(postsDir, name);
  const content = fs.readFileSync(file, 'utf8');
  const frontMatter = content.match(/^---\s*\n([\s\S]*?)\n---/);

  if (!frontMatter) {
    failures.push(`${name}: 缺少 Front Matter`);
    continue;
  }

  for (const field of ['title', 'date', 'updated', 'description', 'tags', 'categories']) {
    if (!new RegExp(`^${field}:\\s*\\S+`, 'm').test(frontMatter[1])) {
      failures.push(`${name}: Front Matter 缺少 ${field}`);
    }
  }

  const categoryLine = frontMatter[1].match(/^categories:\s*\[(.*?)\]/m);
  if (categoryLine) {
    const categories = categoryLine[1].split(',').map((item) => item.trim()).filter(Boolean);
    for (const category of categories) {
      if (!allowedCategories.has(category)) {
        failures.push(`${name}: 未约定的分类“${category}”`);
      }
    }
  }

  if (!content.includes('<!-- more -->')) {
    failures.push(`${name}: 缺少首页摘要分隔符 <!-- more -->`);
  }

  if (/^\s*\[TOC\]\s*$/im.test(content)) {
    failures.push(`${name}: 包含 Typora [TOC] 标记`);
  }

  if (/```\s*apl\b/i.test(content)) {
    failures.push(`${name}: 命令行代码块不应标记为 APL`);
  }

  const tokenMatches = content.matchAll(/["']?token["']?\s*:\s*["']([^"']+)["']/gi);
  for (const match of tokenMatches) {
    if (!/^YOUR_[A-Z0-9_]+$/.test(match[1])) {
      failures.push(`${name}: 疑似包含真实访问令牌`);
    }
  }
}

if (failures.length) {
  console.error(`内容检查失败：\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log('内容检查通过。');
