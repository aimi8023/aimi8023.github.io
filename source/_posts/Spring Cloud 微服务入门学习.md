---
title: Spring Cloud 微服务入门学习
date: 2025-10-24 20:47:25
updated: 2026-07-27 21:00:00
description: 从服务注册、远程调用、容错、网关和配置中心五个模块建立 Spring Cloud 微服务学习路线。
tags: [Spring Cloud, 微服务]
categories: [后端]
series: Spring Cloud 微服务
series_order: 1
---

# Spring Cloud 微服务入门学习

## 微服务是什么？

微服务（Microservices）是一种软件架构风格，它将一个**大型应用系统拆分成多个小型、独立、可部署的服务**。这些服务之间通过**轻量级通信机制（通常是 HTTP 或消息队列）**协作完成系统功能。

<!-- more -->

学习微服务可以从以下五个方面开始：

- 服务注册与发现：Eureka **/** Nacos 
- 服务远程调用与负载均衡：RestTemplate+Ribbon **/** Feign
- 服务熔断与限流：Hystrix **/** Resilience4j **/** Sentinel
- 服务网关：Spring Cloud Gateway **/** Zuul
- 配置中心：Spring Cloud Config **/** Nacos

## 微服务学习

下面我将分别对这五个模块的技术介绍并学习，每个模块选用的技术如下，都是当今流行的技术。

- 服务注册与发现：**Nacos**（阿里巴巴贡献）
- 服务远程调用与负载均衡：**Feign**（Spring官方提供）
- 服务熔断和限流：**Resilience4j**（社区开源）和**Sentinel**(阿里巴巴贡献)
- 服务网关：**Spring Cloud Gateway**（Spring官方提供）
- 配置中心：**Nacos**（阿里巴巴贡献）

由于多项技术混合使用，因此要提前确认版本适配。以下是本项目主要版本对应信息

- `Spring boot版本:3.2.0`

- `Spring cloud版本:2023.0.0`

- `Spring cloud Alibaba版本:2023.0.1.0`







































