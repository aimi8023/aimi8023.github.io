---
title: Typora图床配置
date: 2025-09-25 14:57:16
updated: 2026-07-27 21:00:00
description: 使用 PicGo 为 Typora 配置 GitHub 或 Gitee 图床，并通过占位符安全管理访问令牌。
tags: [Typora, 图床, 工具]
categories: [工具]
---

# Typora 图床配置

本文记录使用 PicGo 为 Typora 配置 GitHub 和 Gitee 图床的方法。配置中的访问令牌必须使用个人占位符替换，切勿提交到公开仓库。

<!-- more -->

> 安全提示：如果令牌曾经进入公开仓库，请立即在对应平台撤销并重新生成。只修改文章内容无法让旧令牌失效。

## GitHub `config.json`

```json
{
  "picBed": {
    "uploader": "github",
    "github": {
      "repo": "2722714532/typora",
      "branch": "main",
      "token": "YOUR_GITHUB_TOKEN",
      "path": "image",
      "customUrl": ""
    }
  },
  "picgoPlugins": {
    "picgo-plugin-super-prefix": true
  },
  "picgo-plugin-super-prefix": {
    "fileFormat": "YYYYMMDDHHmmss",
    "separator": "-"
  }
}
```

## Gitee `config.json`

```jsonc
"picBed": { //设置图床
					   "uploader": "gitee", //图片上传的图床选择
						"current": "gitee", //同上，根据官网手册，可不需要
						"gitee": { //设置gitee
						  "branch": "master", //分支，默认就是master
						  "customUrl": "", //可以不填
						  "path": "images", //仓库中建立的文件夹,初始化以后自行创建
						  "repo": "zdh5201314/Typroa", //“账号名称/仓库名称”，注意大小写敏感，要和网站链接保持一致
						  "token": "YOUR_GITEE_TOKEN" // 私人令牌，禁止提交真实值
						}
					  },
					  "picgoPlugins": { //设置插件，安装完插件后默认添加的
						"picgo-plugin-gitee-uploader": true,
						"picgo-plugin-super-prefix": true
					  },
					  "picgo-plugin-super-prefix": { //设置super-prefix插件
						"fileFormat": "YYYYMMDDHHmmss"
					  },
					  "picgo-plugin-gitee-uploader": {
						"lastSync": "2025-09-24 11:57:28"
					  }
```

