---
title: BootStrap 常用标签
date: 2025-09-30 22:53:17
updated: 2026-07-27 21:00:00
description: Bootstrap 5 常用布局、组件与交互写法速查，包含容器、表单、Toast 和 Modal 等示例。
tags: [BootStrap, 前端]
categories: [前端]
series: 前端基础
series_order: 1
---

# Bootstrap 5 常用标签

## 1 导入和使用

**Bootstrap** 是常用的前端组件库，适合快速搭建响应式页面。本笔记围绕 Bootstrap 5 整理常用标签、组件和交互示例。

<!-- more -->

+ [Bootstrap 官网入门教程 ](https://v5.bootcss.com/docs/getting-started/introduction/)

			初次学习使用Bootstrap，可以选择在 HTML 页面中引入CSS和JS链接，即可调用Bootstrap的CSS样式和JS方法。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap 5 Toast 示例</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
    
<body>
    
    
    <!-- Bootstrap 5 JS -->
    <script 			     src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js">	</script>
</body>
</html>
```

- CSS链接放在<head> 标签中
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

- JS链接放在<body> 标签的末尾

```html
<script 			     src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js">	</script>
```



***

#### 2 容器与网格 Container & Grid

##### 2.1 容器

		Bootstrap 定义了自己的容器类 **.container**,用于容纳页面内的所有元素，它推荐我们把所有标签都放入container中使用

```html
<body>
    <div class="container">
        <h1>Hello Bootstrap 5 !!!</h1>
		<!-- 所有的内容都放在这个盒子里去写，BootStrap的很多样式只有放在container中才能生效 -->
    </div>
</body>
```

		Bootstrap当然不止有一个container类，官网告诉了我们有如下类别：

![image-20250930182845165](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225041.png)

这些不同的容器会针对显示设备的屏幕大小自动调整显示宽度。这种效果就被称为<mark>响应式布局</mark>。

- **bootstrap为什么将容器分为这么多类别呢？**

		是因为这些不同的类会在其达到**断点**时才会生效，否则并不会生效。这更有利于响应式布局，特别是针对于移动端设备。它默认内置了6个断点:

| 断点   | 类中后缀     | 生效断点  |
| :----- | ------------ | --------- |
| 特小   | **没有后缀** | <576像素  |
| 小的   | `sm`         | ≥576像素  |
| 中等的 | `md`         | ≥768像素  |
| 大的   | `lg`         | ≥992像素  |
| 特大号 | `xl`         | ≥1200像素 |
| 特特大 | `xxl`        | ≥1400像素 |

		比如**`.container-sm`** 只有当屏幕宽度大于等于576像素时才会生效，大多数情况下容器选择 特小**.container**没有后缀，小于576px即可生效，大于并不会失效。

##### 2.2 网格系统

Bootstrap将屏幕划分为网格式系统，更加方便开发人员对标签的布局。

- 无论设备屏幕的大小，Bootstrap都将一行分为**12块**，他会根据屏幕的大小自动平分每块的宽度。

  ![image-20250930190915129](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225050.png)

```html
    <div class="container">
        <div class="row text-white" style="height: 100px;">
            <div class="col bg-primary">1</div>
            <div class="col bg-success">2</div>
            <div class="col bg-danger">3</div>
            <div class="col bg-warning text-dark">4</div>
            <div class="col bg-info">5</div>
            <div class="col bg-secondary">6</div>
            <div class="col bg-dark">7</div>
            <div class="col bg-light text-dark">8</div>
            <div class="col bg-primary-subtle text-dark">9</div>
            <div class="col bg-success-subtle text-dark">10</div>
            <div class="col bg-danger-subtle text-dark">11</div>
            <div class="col bg-warning-subtle text-dark">12</div>
        </div>
    </div>
```

- 改变浏览器的大小，每块的宽度会随之变化，在PC/手机上当然也会根据屏幕大小自动变化宽度。

**row**：盒子指定row类，代表这是一行

**col**：在row里面指定col，代表这是一列，col不加后缀，浏览器会自动根据row里的col数量平分每个盒子的宽度，当然，我们亦可以通过  **col-数字** 的方式指定该盒子占据的列数。

![image-20250930191657237](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225057.png)

```html
   <div class="container">
        <div class="row text-white" style="height: 100px;">
            <div class="col bg-primary">1</div>
            <div class="col bg-success">2</div>
            <div class="col bg-danger">3</div>
            <div class="col bg-warning text-dark">4</div>
            <div class="col bg-info">5</div>
            <div class="col bg-secondary">6</div>
            <div class="col bg-dark">7</div>
            <div class="col bg-light text-dark">8</div>
            <div class="col bg-primary-subtle text-dark">9</div>
            <div class="col bg-success-subtle text-dark">10</div>
            <div class="col bg-danger-subtle text-dark">11</div>
            <div class="col bg-warning-subtle text-dark">12</div>
        </div>
        
        <div class="row text-white" style="height: 100px;">
            <div class="col-1 bg-primary">1</div>
            <div class="col-2 bg-success">2</div>
            <div class="col-3 bg-danger">3</div>
            <div class="col-4 bg-warning text-dark">4</div>
        </div>

        <div class="row text-white" style="height: 100px;">
            <div class="col bg-primary">1</div>
            <div class="col-3 bg-success">2</div>
            <div class="col-7 bg-danger">3</div>
            <div class="col bg-warning text-dark">4</div>
        </div>
    </div>
```

***

#### 3 输入文本框 Input group

	 bootstrap提供了更强大的输入文本框，它可以让我们方便在文本框的前后加上说明或注释。

先定义input group

				内部 input-group-text 定义输入框的文本注释

				内部 input 可以引用这个文本

![image-20250930192328972](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225110.png)

```html
<div class="container">
    <div class="input-group mb-3 mt-3">
        <span class="input-group-text" id="basic-addon1">前输入框</span>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
    </div>

    <div class="input-group mb-3 mt-3">
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon2">
        <span class="input-group-text" id="basic-addon2">后输入框</span>
    </div>
</div>
```

- 你可以通过改变两者的前后位置，控制文本出现在输入框的前面还是后面

***

#### 4 按钮 Buttons

Bootstrap 的按钮可以通过类名定义颜色、外轮廓和大小。

![image-20250930224414048](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225115.png)

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button>

<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>
<button type="button" class="btn btn-outline-success">Success</button>
<button type="button" class="btn btn-outline-warning btn-sm">Warning</button>
<button type="button" class="btn btn-outline-info btn-sm">Info</button>
<button type="button" class="btn btn-outline-dark btn-lg">Dark</button>
<button type="button" class="btn btn-outline-danger btn-lg">Danger</button>
```

***

#### 5 复选框和单选框 Checks & Radios

bootstrap提供的复选框 check 类似输入框组 input-group，都是先定义组合再定义内部的框和文本.

![image-20250930194736868](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225120.png)

```html
<div class="container mt-5">
    <div class="row col">
        <div class="form-check col-1">
            <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
                复选框
            </label>
        </div>
        <div class="form-check col-2">
            <input class="form-check-input" type="checkbox" value="2" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
                默认复选框选中
            </label>
        </div>
    </div>
</div>
```

***

bootstrap提供的单选框 Radio 和 check 只有type(类型)不同

![image-20250930195851230](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225126.png)

```html
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
  <label class="form-check-label" for="exampleRadios1">
    男
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
  <label class="form-check-label" for="exampleRadios2">
    女
  </label>
</div>
```

***

#### 6 下拉选择框 Select

		bootstrap提供下拉选择框select使用form-select类。但这是一个**display: block**属性的标签，它会占据一行，效果并不好。我们可以通过row 和 col来精确控制它的位置。

![image-20250930201044353](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225133.png)

```html
<!--> aria-label 属性是为了方便盲人用户使用阅读器使用</-->
<select class="form-select" aria-label="Default select example">
  <option selected>请选择</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

<span style="font-size: 22px;"><mark>通过div包装select，就可以控制它的位置和宽度。</mark></span>

```html
<div class="row">
    <div class="col-3 offset-2">
        <select class="form-select">
            <option selected>请选择</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
    </div>
</div>
```

![](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225139.png)

***

#### 7 消息弹窗 Toasts

		bootstrap 提供了消息弹窗 toast，它可以用来实现：

- 当我们点击或操作某个步骤完成时，它可以弹出来提示是否操作成功或失败。

![image-20250930201547703](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225144.png)

![image-20250930201623270](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225147.png)



toast 默认是自动隐藏，必须加上<mark>show 属性</mark>才能显示。

```html
<div id="msgToast" class="toast show text-bg-success">
  <div class="toast-header">
     <strong class="me-auto">消息通知</strong>
     <button type="button" class="btn-close" data-bs-dismiss="toast"</button>
  </div>
  <div class="toast-body" id="textToast">
        我是消息内容
  </div>
</div>
```

1. 先定义 toast 消息框，并添加show属性
2.  而定义消息头 toast-header ，其中可以添加button按钮用来关闭消息框
      					- button 的类属性为 `class="btn-close"` ,代表关闭样式 :x:
      					- button 的 `data-bs-dismiss="toast"` 则表示关闭最近的toast标签

			3.定义消息体 toast-body



(●'◡'●) 但是注意：**<mark>只使用html标签只是静态效果，我们需要搭配 JS 代码实现动态效果</mark>**

![合并结果_1](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225156.gif)

  ```html
  <body>
      <div class="container mt-5">
          <!-- 触发按钮 -->
          <button id="showBtn" class="btn btn-outline-success" onclick="showToast()">显示消息框</button>
  
          <!-- 自动隐藏的 Toast-->
          <div id="msgToast" class="toast text-bg-success" data-bs-delay="3000">
              <div class="toast-header">
                  <strong class="me-auto">消息通知</strong>
                  <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
              </div>
              <div class="toast-body" id="textToast">
                  我是消息内容
              </div>
          </div>
  
      </div>
      <!-- Bootstrap 5 JS -->
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js">	</script>
  
  <script>
     function showToast() {
     const msgToast = new bootstrap.Toast(document.getElementById("msgToast"));
     const textToast = document.getElementById("textToast");
     textToast.innerText = "我是改动后的消息内容";
     msgToast.show();
     }
  </script>
  
  </body>
  ```

1.    定义button 按钮触发 `showToast()`函数，去除`msgToast`原先的`class="show"`属性,可以为其添加`data-bs-delay="3000"`表示延迟3秒自动关闭消息框
2. 设计`showToast()`函数：
   1. 获取`msgToast和textToast`元素， 注意：<mark>`msgToast`是包装后得到的`bootstrap.Toast`对象</mark>
   2. 可以自定义消息体内容
   3. 执行`show()`展示消息框，3秒后消息框自动关闭

![](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225204.gif)

***

#### 8 **弹窗组件**（模态框） Modal

		bootstrap还提供了有用的弹窗 Modal（模态框）,用来不关闭和刷新页面的情况下处理一些信息，它可以做到什么呢？

看图：![image-20250930215936669](https://raw.githubusercontent.com/2722714532/Typora/main/image20250930225219.png)
- 当填写一些信息时，我们可以利用Modal来处理，主页面并不会关闭，它可以弹出一个弹窗让我们操作

**具体该如何使用呢？**

这是它的结构：

- modal
  - modal-dialog
    - modal-content
      - modal-header
      - modal-body
      - modal-footer

		 和 Toast 一脉相承，我们直接使用按钮点击来实现它的打开和关闭。

```html
<div class="container mt-5">
        <!-- 触发按钮 -->
        <button id="showBtn" class="btn btn-outline-success" onclick="showModal()">显示模态框</button>
        <div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">创建用户</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>内容体</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js">	</script>

<script>
   function showModal() {
     const myModal = new bootstrap.Modal(document.getElementById("myModal"));
     myModal.show();
   }
</script>
```

1.    定义button 按钮触发 `showModal()`函数
2.    设计`showModal()`函数：
      1. 获取`myModal`元素， 注意：<mark>`myMOdal`是包装后得到的`bootstrap.Modal`对象</mark>
      3. 执行`show()`展示模态框

- Modal 层级：`modal > modal-dialog > modal-content > (header/body/footer)`
- 每层作用不同，类可以自由组合：
  - **modal**层控制显示/动画/遮罩
  - **modal-dialog** 控制大小和位置
  - **modal-content** 控制外观
  - **header/body/footer** 控制内容和交互

***

下面是一个显示添加用户的modal，综合了上面的一些标签 

```html
<div class="container mt-5">

  <!-- 触发按钮 -->
  <button id="showBtn" class="btn btn-outline-success" onclick="showModal()">添加用户</button>

  <div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">创建用户</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body mb-3">
          <input type="text" id="newid" hidden>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-name">姓名</span>
            <input type="text" class="form-control" id="newname" aria-describedby="basic-name">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-email">邮箱</span>
            <input type="text" class="form-control" id="newemail" aria-describedby="basic-email">
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="newGender" id="maleRadios" value="1"
                   checked>
            <label class="form-check-label" for="maleRadios">
              男
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="newGender" id="femaleRadios" value="0">
            <label class="form-check-label" for="femaleRadios">
              女
            </label>
          </div>

          <div class="mt-3">
            <select class="form-select custom-select" aria-label="选择部门" id="newDepartmentId">
              <option selected>选择部门</option>
              <option>财政部</option>
              <option>研发部</option>
              <option>人事部</option>
              <option>技术部</option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">确认</button>
        </div>
      </div>
    </div>
  </div>


</div>

<!-- Bootstrap 5 JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js">	</script>

<script>
  function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
  }
</script>
```

***

**记录和分享学习过程，如有错误，请指正。**



