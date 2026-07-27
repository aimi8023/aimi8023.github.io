'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const failures = new Set();

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function resolveLocalUrl(url) {
  if (!url.startsWith('/') || url.startsWith('//')) {
    return null;
  }

  const clean = decodeURIComponent(url.split(/[?#]/, 1)[0]);
  const relative = clean.replace(/^\/+/, '');
  const direct = path.join(publicDir, relative);
  const candidates = [
    direct,
    path.join(direct, 'index.html'),
    `${direct}.html`,
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

for (const file of walk(publicDir).filter((item) => item.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const url = match[1];
    if (url.startsWith('/') && !url.startsWith('//') && !resolveLocalUrl(url)) {
      failures.add(`${path.relative(publicDir, file)} -> ${url}`);
    }
  }
}

if (failures.size) {
  console.error(`生成链接检查失败：\n- ${[...failures].join('\n- ')}`);
  process.exit(1);
}

console.log('生成链接检查通过。');
