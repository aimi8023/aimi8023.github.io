---
title: Typora图床配置
date: 2025-09-25 14:57:16
tags: [Typora, 图床, 工具]
categories: [工具]
---

## Typora图床配置





### Gitup config.json

```JSON
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
  }
    "picgoPlugins": {
    "picgo-plugin-super-prefix": true
  },
  "picgo-plugin-super-prefix": {
    "fileFormat": "YYYYMMDDHHmmss",         // 时间前缀格式
    "separator": "-"                          // 可选分隔符
  }
}
```





### Gitee config.json

```JSON
"picBed": { //设置图床
					   "uploader": "gitee", //图片上传的图床选择
						"current": "gitee", //同上，根据官网手册，可不需要
						"gitee": { //设置gitee
						  "branch": "master", //分支，默认就是master
						  "customUrl": "", //可以不填
						  "path": "images", //仓库中建立的文件夹,初始化以后自行创建
						  "repo": "zdh5201314/Typroa", //“账号名称/仓库名称”，注意大小写敏感，要和网站链接保持一致
						  "token": "YOUR_GITEE_TOKEN" //私人令牌
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

