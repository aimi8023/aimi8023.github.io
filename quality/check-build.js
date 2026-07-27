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

const imageToolFile = path.join(publicDir, 'tools', 'image-converter', 'index.html');
if (!fs.existsSync(imageToolFile)) {
  failures.add('缺少图片压缩与转换工具生成页面');
} else {
  const imageToolHtml = fs.readFileSync(imageToolFile, 'utf8');
  const requiredFragments = [
    'id="ic-tool"',
    'id="ic-files"',
    'id="ic-format"',
    'id="ic-mode"',
    'id="ic-quality"',
    'id="ic-target"',
    'id="ic-resize"',
    'id="ic-process"',
    'id="ic-list"',
    'function encodeTarget(',
  ];

  for (const fragment of requiredFragments) {
    if (!imageToolHtml.includes(fragment)) {
      failures.add(`图片工具缺少生成结构：${fragment}`);
    }
  }

  if (imageToolHtml.includes('{% image_tool_intro %}') || imageToolHtml.includes('&lt;button class=&quot;ic-btn')) {
    failures.add('图片工具包含未渲染或被转义的页面内容');
  }

  if (imageToolHtml.includes(`<img src="'+previewUrl+'" srcset=`)) {
    failures.add('图片工具动态预览被主题懒加载占位图接管');
  }

  const scriptMatch = imageToolHtml.match(
    /<script>\s*(\(function\(\)\{\s*'use strict';\s*var MAX_FILES[\s\S]*?\}\)\(\);)\s*<\/script>/,
  );
  if (!scriptMatch) {
    failures.add('图片工具脚本未正确生成');
  } else {
    try {
      new Function(scriptMatch[1]);
    } catch (error) {
      failures.add(`图片工具脚本语法错误：${error.message}`);
    }
  }
}

if (failures.size) {
  console.error(`生成链接检查失败：\n- ${[...failures].join('\n- ')}`);
  process.exit(1);
}

console.log('生成链接检查通过。');
