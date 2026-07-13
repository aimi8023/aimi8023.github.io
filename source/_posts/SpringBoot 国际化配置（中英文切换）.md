---
title: SpringBoot 国际化配置（中英文切换）
date: 2025-09-26 13:58:10
tags: [SpringBoot]
categories: [后端]
---



# SpringBoot 国际化配置（中英文切换）

[TOC]

### 1.Idea新建springboot项目

					- 环境：**Java17+Springboot6**

1.1选择Springboot项目名称和类型

<img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925195119.png" alt="image-20250925195116571" style="zoom: 67%;" />

#### 1.2 勾选Web支持 和 模板引擎（Thymeleaf）

<img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925202039.png" alt="image-20250925201955357" style="zoom:80%;" /><img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925225907.png" alt="image-20250925201959255" style="zoom:80%;" />



#### 1.3进入Springboot项目

<img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925202407.png" alt="image-20250925202319562" style="zoom: 80%;" /> **→** <img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925202418.png" alt="image-20250925202349290" style="zoom:67%;" />



- 得到一个看起来很干净的项目:slightly_smiling_face:

***

### 2.建文件和引入静态资源

<img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925225853.png" alt="image-20250925210725526" style="zoom:67%;" />

- **i18n** 为单词 **internationalization**(国际化)的缩写:smile: 是实现国际化的必要文件.

  	- 需要创建在**src/main/resources/**目录下
		
  	 - login,login_en_US,login_zh_CN三个配置文件均为 **properties**，yml配置国际化暂不支持（我不会）
  	 - 创建成功后三个文件会直接被Springboot识别为资源包'login'

- 静态资源css和images需放在**static/**目录下

- 首页index.html需放在**templates/**目录下

  <span style="font-size:22px;">==**css/style.css ，index.html 放在文章末尾, images/banner.jpg 可以自己随便放张照片 **==</span> 

***

### 3.测试项目运行成功，再进行国际化配置

#### 3.1新建config/MyWebMvcConfig配置类，添加首页访问路径

![image-20250925211927545](https://raw.githubusercontent.com/2722714532/Typora/main/image20250925225847.png)

```JAVA
@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index.html").setViewName("index");
    }

   
}
```

- 首页访问也可以如下直接新建一个类直接进行路径映射，不过这里采用继承==WebMvcConfigurer接口==的方式是为了接下来的国际化配置

```JAVA
 //  不采用该方式
 //	  @Component
 //   public class HelloController {
 //      @RequestMapping({"/","/index.html"})
 //       public String index() {
 //           return "index";
 //       }
 //   }                                                              

```

#### 3.2 运行程序,访问<localhost:8080> 即可访问index.html首页

![image-20250925215606289](https://raw.githubusercontent.com/2722714532/Typora/main/image20250925215617.png)

***

### 4 login文件配置

#### 4.1 三个文件的配置

​		实现国际化配置，我们需要替换首页中的所有中文，使其点击中英文按钮时可以切换中文和英文，实现方法就是将==中文文本==**替换**为==Login配置文件中的变量==，通过控制变量的解析文件即可实现中英文配置

以下为三个文件的配置，应该不用解释，很好理解，login为默认配置，zh_CN为中文,en_US为英文

- <span style="fontsize:22px;color:red;">注意：打开项目setting->fileEncoding,需要更改properties为UTF-8格式，否则中文乱码</span>

  <img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925220917.png" alt="image-20250925220629880" style="zoom:50%;" />

**login.properties**

```properties
login.title=欢迎使用
login.msg=登录
login.userid=用户名
login.forget=忘记密码
login.login=登录
login.new=新用户
login.register=注册
login.here=点击这里
```

**login_zh_CN.properties**

```properties
login.title=欢迎使用
login.msg=登录
login.userid=用户名
login.forget=忘记密码
login.login=登录
login.new=新用户
login.register=注册
login.here=点击这里
```

**login_en_US.properties**

```properties
login.title=Welcome To Use
login.msg=LOGIN FORM
login.userid=User Id
login.forget=forget Password
login.login=Login
login.new=New User
login.register=Register
login.here=Here
```

#### 4.2 application.properties 或 applicationyml 配置

- 需要在配置文件中声明i18n的位置

如果为**application.properties**

```properties
spring.messages.basename=i18n.login
```

如果为**applicationyml**

```yml
spring:
  messages:
    basename: i18n.login
```

***

### 5.实现中英文切换

#### 5.1替换index.html中的中文文本，需要thymeleaf模板引擎解析

<img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925221300.png" alt="修改前" style="zoom:50%;" />

<img src="https://raw.githubusercontent.com/2722714532/Typora/main/image20250925225833.png" alt="修改后" style="zoom: 67%;" />

代码修改前：

```HTML
<div class="login">
	<h2>欢迎使用</h2>
	<div class="login-top">
		<h1>登录</h1>
		<form>
			<input type="text" value="用户名" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'User Id';}">
			<input type="password" value="password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'password';}">
			<div class="forgot">
				<a href="#">忘记密码</a>
				<input type="submit" value="登录" >
			</div>
		</form>

	</div>
	<div class="login-bottom">
		<h3>新用户<a href="#">注册</a>&nbsp;点击这里</h3>
	</div>
	<div class="login-change">
		<a class="lang-btn" th:href="@{/(language=zh_CN)}">中文</a>
		<a class="lang-btn" th:href="@{/(language=en_US)}">English</a>
	</div>

</div>
```

​	修改后：

```HTML
<div class="login">
	<h2 th:text="#{login.title}"></h2>
	<div class="login-top">
		<h1>[[#{login.msg}]]</h1>
		<form>
			<input type="text" th:value="#{login.userid}" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'User Id';}">
			<input type="password" value="password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'password';}">
			<div class="forgot">
				<a href="#" th:text="#{login.forget}"></a>
				<input type="submit" th:value="#{login.login}" >
			</div>
		</form>

	</div>
	<div class="login-bottom">
		<h3>[[#{login.new}]]<a href="#" th:text="#{login.register}"></a>&nbsp;[[#{login.here}]]</h3>
	</div>
	<div class="login-change">
		<a class="lang-btn" th:href="@{/(language=zh_CN)}">中文</a>
		<a class="lang-btn" th:href="@{/(language=en_US)}">English</a>
	</div>

</div>	
```

#### 5.2增加MyLocalResoverConfig类

仔细观察中英文切换的链接，他会传给后端不同的language参数

```html
	<div class="login-change">
		<a class="lang-btn" th:href="@{/(language=zh_CN)}">中文</a>
		<a class="lang-btn" th:href="@{/(language=en_US)}">English</a>
	</div>
```

![image-20250925222000029](https://raw.githubusercontent.com/2722714532/Typora/main/image20250925222002.png)

**MyLocalResoverConfig**

```java
@Configuration
public class MyLocalResoverConfig implements LocaleResolver {
    @Override
    public Locale resolveLocale(HttpServletRequest request) {
        String language = request.getParameter("language");
        System.out.println(language);
        Locale locale = Locale.getDefault();//默认配置
        //如果携带参数
        if (language != null) {
            //zh_CN 或 en_US
            String[] split = language.split("_");
            locale = new Locale(split[0], split[1]);
        }
        return locale;
    }

    @Override
    public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {

    }
}
```

- 继承LocaleResolver接口，必须重写两个方法，通过解析不同的参数实现中英文切换

#### 5.3 在MyWebMvcConfig中添加 MyLocalResoverConfig的@bean解析

**MyWebMvcConfig**

```JAVA
@Configuration
public class MyWebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/index.html").setViewName("index");
    }

    //localeResolver名字必须相同  	
    @Bean
    public LocaleResolver localeResolver() { 
        return new MyLocalResoverConfig();
    }
}
```

#### 5.4重新运行项目，清一下浏览器缓存或  **ctrl+F5** 强制刷新

   - 点击中文 和 English 按钮即可实现切换

     ![image-20250925223903982](https://raw.githubusercontent.com/2722714532/Typora/main/image20250925230546.png)



**记录和分享学习过程，如有错误，请指正。**

***

**style.css**

```css
html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,dl,dt,dd,ol,nav ul,nav li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}
article, aside, details, figcaption, figure,footer, header, hgroup, menu, nav, section {display: block;}
ol,ul{list-style:none;margin:0;padding:0;}
blockquote,q{quotes:none;}
blockquote:before,blockquote:after,q:before,q:after{content:'';content:none;}
table{border-collapse:collapse;border-spacing:0;}
/* start editing from here */
a{text-decoration:none;}
.txt-rt{text-align:right;}/* text align right */
.txt-lt{text-align:left;}/* text align left */
.txt-center{text-align:center;}/* text align center */
.float-rt{float:right;}/* float right */
.float-lt{float:left;}/* float left */
.clear{clear:both;}/* clear float */
.pos-relative{position:relative;}/* Position Relative */
.pos-absolute{position:absolute;}/* Position Absolute */
.vertical-base{	vertical-align:baseline;}/* vertical align baseline */
.vertical-top{	vertical-align:top;}/* vertical align top */
.underline{	padding-bottom:5px;	border-bottom: 1px solid #eee; margin:0 0 20px 0;}/* Add 5px bottom padding and a underline */
nav.vertical ul li{	display:block;}/* vertical menu */
nav.horizontal ul li{	display: inline-block;}/* horizontal menu */
img{max-width:100%;}
/*end reset*/
/*--login start here--*/
body{
   background: url(../images/banner.jpg);
   padding:100px 0px 30px 0px;
   font-family: 'Roboto', sans-serif;
   font-size: 100%;
}
.login {
  width: 32%;
  margin: 0 auto;
}
.login h2 {
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin: 0px 0px 50px 0px;
  font-family: 'Droid Serif', serif;
}
.login-top {
  background: #E1E1E1;
  border-radius: 25px 25px 0px 0px;
  -webkit-border-radius:  25px 25px 0px 0px;
  -moz-border-radius: 25px 25px 0px 0px;
  -o-border-radius: 25px 25px 0px 0px;
  padding: 40px 60px;
}
.login-top h1 {
  text-align: center;
  font-size: 27px;
  font-weight: 500;
  color: #F45B4B;
  margin: 0px 0px 20px 0px;
}
.login-top input[type="text"] {
	outline: none;
  font-size: 15px;
  font-weight: 500;
  color: #818181;
  padding: 15px 20px;
  background: #CACACA;
  border: 1px solid #ccc;
  border-radius:25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  -o-border-radius: 25px;
  margin: 0px 0px 12px 0px;
  width: 88%;
  -webkit-appearance: none;
}
.login-top input[type="password"]{
	outline: none;
  font-size: 15px;
  font-weight: 500;
  color: #818181;
  padding: 15px 20px;
  background: #CACACA;
  border: 1px solid #ccc;
  border-radius:25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  -o-border-radius: 25px;
  margin: 0px 0px 12px 0px;
  width: 88%;
  -webkit-appearance: none;
}
.forgot  a{
  font-size: 13px;
  font-weight: 500;
  color: #F45B4B;
  display: inline-block;
  border-right: 2px solid #F45B4B;
  padding: 0px 7px 0px 0px;
}
.forgot  a:hover{
  color: #818181;
}
.forgot input[type="submit"] {
  background: #F45B4B;
  color: #FFF;
  font-size: 17px;
  font-weight: 400;
  padding: 8px 7px;
  width: 20%;
  display: inline-block;
  cursor: pointer;
  border-radius: 6px;
  -webkit-border-radius: 19px;
  -moz-border-radius: 6px;
  -o-border-radius: 6px;
  margin: 0px 7px 0px 3px;
  outline: none;
  border: none;
}
.forgot input[type="submit"]:hover {
	background:#818181;
	transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
}
.forgot {
  text-align: right;
}
.login-bottom {
  background: #E15748;
  padding: 30px 65px;
  border-radius: 0px 0px 25px 25px;
  -webkit-border-radius:  0px 0px 25px 25px;
  -moz-border-radius: 0px 0px 25px 25px;
  -o-border-radius: 0px 0px 25px 25px;
  text-align: right;
  border-top: 2px solid #AD4337;
}
.login-bottom h3 {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}
.login-bottom h3 a {
  font-size: 25px;
  font-weight: 500;
  color: #fff;
}
.login-bottom h3 a:hover {
	color:#696969;
	transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
}
.copyright {
  padding: 150px 0px 0px 0px;
  text-align: center;
}
.copyright p {
  font-size: 15px;
  font-weight: 400;
  color: #fff;
}
.copyright p a{
  font-size: 15px;
  font-weight: 400;
  color: #E15748;
}
.copyright p a:hover{
	color: #fff;
	 transition: 0.5s all;
  -webkit-transition: 0.5s all;
  -moz-transition: 0.5s all;
  -o-transition: 0.5s all;
}
/*--login end here--*/
/*--meadia quiries start here--*/
@media(max-width:1440px){
.login {
  width: 35%;
}
}
@media(max-width:1366px){
.login {
  width: 37%;
}
}
@media(max-width:1280px){
.login {
  width: 40%;
}
}
@media(max-width:1024px){
.login {
  width: 48%;
}
.copyright {
  padding: 100px 0px 0px 0px;
}
}
@media(max-width:768px){
.login {
  width: 65%;
}
.login-top h1 {
  font-size: 25px;
}
.login-bottom h3 a {
  font-size: 22px;
}
.copyright {
  padding: 250px 0px 0px 0px;
}
body {
  padding: 100px 0px 0px 0px;
}
.login h2 {
  font-size: 28px;
}
}
@media(max-width:640px){
.login-top h1 {
  font-size: 23px;
}
.forgot input[type="submit"] {
  font-size: 15px;
  width: 22%;
}
.login-top input[type="text"] {
  padding: 12px 20px;
}
.login-top input[type="password"] {
  padding: 12px 20px;
}
.login-bottom h3 a {
  font-size: 19px;
}
.login-bottom h3 {
  font-size: 13px;
}
.copyright {
  padding: 110px 0px 0px 0px;
}
body {
  padding: 110px 0px 0px 0px;
}
}
@media(max-width:480px){
.login {
  width: 80%;
}
.login-top h1 {
  font-size: 21px;
}
.login-top input[type="text"] {
  width: 85%;
}
.login-top {
  padding: 30px 40px;
}
.login-top input[type="password"] {
  width: 85%;
}
.login h2 {
  font-size: 25px;
}
}
@media(max-width:320px){
.login {
  width: 90%;
}
.login-top {
  padding: 20px 25px;
}
.login-top input[type="text"] {
  width: 81%;
  padding: 10px 20px;
  font-size: 13px;
  margin: 0px 0px 7px 0px;
}
.login-top input[type="password"] {
  width: 81%;
  padding: 10px 20px;
  font-size: 13px;
  margin: 0px 0px 7px 0px;
}
.forgot input[type="submit"] {
  font-size: 11px;
  width: 25%;
  padding: 6px 7px;
}
.forgot  a {
  font-size: 11px;
}
.login-bottom {
  padding: 20px 25px;
}
.login-bottom h3 {
  font-size: 11px;
}
.login-bottom h3 a {
  font-size: 17px;
}
body {
  padding: 50px 0px 0px 0px;
}
.copyright p {
  font-size: 13px;
}
.copyright p a{
  font-size: 13px;
}
.login h2 {
  font-size: 23px;
  margin:0px 0px 35px 0px;
}
.copyright {
  padding: 75px 0px 0px 0px;
}
}
.login-change {
  text-align: center;       /* 按钮整体居中 */
  margin-top: 20px;         /* 距离上方留点空间 */
}

.login-change .lang-btn {
  height: 45px;
  background: transparent;  /* 背景透明 */
  color: white;             /* 白色文字 */
  border: 2px solid white;  /* 白色边框 */
  padding: 8px 16px;        /* 内边距 */
  margin: 0 10px;           /* 两个按钮之间间距 */
  border-radius: 6px;       /* 圆角边框 */
  font-size: 18px;          /* 字体大小 */
  cursor: pointer;          /* 鼠标悬停小手 */
  transition: all 0.3s ease;
  line-height: 1;
}

.login-change .lang-btn:hover {
  color: black;             /* 文字变黑 */
}
/*--meadia quiries end here--*/
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
<title>Home</title>
<!-- Custom Theme files -->
<link th:href="@{/css/style.css}" rel="stylesheet" type="text/css" media="all"/>
<!-- Custom Theme files -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<meta name="keywords" content="Login form web template, Sign up Web Templates, Flat Web Templates, Login signup Responsive web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<!--Google Fonts-->
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
<!--Google Fonts-->
</head>
<body>
<div class="login">
	<h2>欢迎使用</h2>
	<div class="login-top">
		<h1>登录</h1>
		<form>
			<input type="text" value="用户名" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'User Id';}">
			<input type="password" value="password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'password';}">
			<div class="forgot">
				<a href="#">忘记密码</a>
				<input type="submit" value="登录" >
			</div>
		</form>

	</div>
	<div class="login-bottom">
		<h3>新用户<a href="#">注册</a>&nbsp;点击这里</h3>
	</div>
	<div class="login-change">
		<a class="lang-btn" th:href="@{/(language=zh_CN)}">中文</a>
		<a class="lang-btn" th:href="@{/(language=en_US)}">English</a>
	</div>

</div>	
<div class="copyright">

</div>


</body>
</html
```