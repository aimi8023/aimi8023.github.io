'use strict';

/**
 * Normalize a few Typora-specific constructs before Markdown rendering.
 * Code fences are intentionally left untouched.
 */
hexo.extend.filter.register('before_post_render', (data) => {
  if (data.layout !== 'post' || typeof data.content !== 'string') {
    return data;
  }

  let inFence = false;
  data.content = data.content
    .split('\n')
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }

      if (inFence) {
        return line;
      }

      if (/^\s*\[TOC\]\s*$/i.test(line)) {
        return '';
      }

      return line
        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
        .replace(/==([^=\n]+)==/g, '<mark>$1</mark>');
    })
    .join('\n');

  return data;
});
