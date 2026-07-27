---
title: Spring Cloud 服务注册与发现：Nacos
date: 2025-10-24 23:18:25
updated: 2026-07-27 21:00:00
description: 使用 Spring Cloud Alibaba 与 Nacos 搭建服务注册和发现示例，包含环境准备、项目结构与核心配置。
sticky: 100
tags: [Spring Cloud, Nacos]
categories: [后端]
series: Spring Cloud 微服务
series_order: 2
---

# Spring Cloud 服务注册与发现：Nacos

本文通过一个可运行的示例，演示如何在 Spring Cloud 项目中使用 Nacos 完成服务注册与发现。

<!-- more -->

本项目依赖版本对应信息（请确认版本适配，否则可能出错）：

- `Spring boot版本:3.2.0`
- `Spring cloud版本:2023.0.0`
- `Spring cloud Alibaba版本:2023.0.1.0`
- `mybatis-spring-boot-starter版本：3.0.3`

## Nacos是什么？

Nacos是目前 **Spring Cloud 微服务体系中<mark>最推荐</mark>使用的服务注册、发现与配置中心**。

本节主要讲解它的**服务注册与发现**的使用。

## Nacos下载

		学习Nacos需要先下载，推荐官网点击下载，我这里版本选择3.1.0，你最好也使用这个版本。

		**[Nacos 官网](https://nacos.io/download/nacos-server/)**

![image-20251024205514047](/images/nacos/image-20251024205514047.png)

下载后解压目录结构如下
![image-20251024205900935](/images/nacos/image-20251024205900935.png)

进入`bin`目录，右键选择在终端打开
![image-20251024210134648](/images/nacos/image-20251024210134648.png)

输入下面的命令运行Nacos

```bash
./startup.cmd -m standalone
```

如图则表示成功运行

![image-20251024210515505](/images/nacos/image-20251024210515505.png)

可访问`localhost:8080`端口登录Nacos管理页面，第一次登录需要设置用户名和密码。默认的用户名和密码均为nacos

![image-20251024210658387](/images/nacos/image-20251024210658387.png)

---

## Nacos学习

   下面开始正式学习。

### 一、项目结构搭建

#### 创建父项目

建立父项目，管理依赖版本，父项目只保留`pom.xml`

![image-20251024212152646](/images/nacos/image-20251024212152646.png)

Pom.xml 内容如下：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.tian</groupId>
  <artifactId>springCloud-02-nacos</artifactId>
  <packaging>pom</packaging>
  <version>1.0-SNAPSHOT</version>

<parent>
<!--  spring boot-->
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>3.2.0</version>
</parent>
  
<modules>
    <!--当前还未添加子项目-->
</modules>

<properties>
  <springcloud.version>2023.0.0</springcloud.version>
  <alibaba.version>2023.0.1.0</alibaba.version>
  <mybatis.version>3.0.3</mybatis.version>
</properties>

<dependencyManagement>
  <dependencies>
<!--    spring cloud-->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-dependencies</artifactId>
      <version>${springcloud.version}</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
<!--    spring cloud alibaba-->
    <dependency>
      <groupId>com.alibaba.cloud</groupId>
      <artifactId>spring-cloud-alibaba-dependencies</artifactId>
      <version>${alibaba.version}</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
<!--    mybatis-springboot-->
    <dependency>
      <groupId>org.mybatis.spring.boot</groupId>
      <artifactId>mybatis-spring-boot-starter</artifactId>
      <version>${mybatis.version}</version>
    </dependency>

  </dependencies>
</dependencyManagement>

  <build>
    <finalName>springCloud-02-nacos</finalName>
  </build>
</project>
```

#### 创建子项目

三个子项目，分别是`api`,`provider`,`consumer`

项目结构如下：

```
springCloud-02-nacos 
	├─api
  |		└─ pom.xml 
  |		└─src
	├─consumer
  |		└─ pom.xml
  |		└─src
	└─provider
  | 	└─pom.xml 
  |	  └─src
└─pom.xml
```

![image-20251024230106351](/images/nacos/image-20251024230106351.png)





- `api`

		      为了测试更具体，需要创建**数据库表**和对应的**实体类**。

			**导入依赖:**

				- lombok

			**数据库表的创建：**

```sql
#创建数据库
CREATE DATABASE`school`;
#创建表student
CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '学生ID',
    name VARCHAR(50) NOT NULL COMMENT '学生姓名',
    age INT DEFAULT NULL COMMENT '学生年龄'
);
#插入数据
INSERT INTO student (name, age) VALUES
('张三', 20),
('李四', 21),
('王五', 19);
```

**实体类：**

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private Integer id;
    private String name;
    private Integer age;
}
```

注意目录结构：

![API 模块目录结构](/images/nacos/image-20251024230106351.png)

**pom.xml：**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.tian</groupId>
        <artifactId>springCloud-02-nacos</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <artifactId>api</artifactId>
    <packaging>war</packaging>

    <dependencies>
<!--        lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>
    <build>
        <finalName>api</finalName>
    </build>
</project>

```

- `provider`











