---
title: Java数据库学习
date: 2025-10-11 22:50:00
tags: [Java, 数据库]
categories: [后端]
---



# Java数据库连接(从JDBC->Mybatis->SpringBoot)

## Java 无Springboot数据库连接

​		学习Java如何连接数据库，我想 对于什么是jdbc？数据源又为何有那么多，诸如c3p0,druid以及HikariCP等。Mybatis是什么？它有什么作用？

​		对这些问题有有一个清晰的了解，将会更有利于我们对Java的数据库连接的学习。

***

### 1 JDBC和数据库驱动的关系

- JDBC是什么？

​		JDBC全称为 Java DataBase Connectivity(Java 数据库连接)，是Java官方提供的连接数据库的API规范，它是一个API 接口，内部==定义==了连接数据库的接口和方法。但需要注意：**仅仅只是定义了接口和方法，并没有实现这些接口和方法**。

​		比如：

| 函数名                          |     功能      | 由谁定义 |              由谁实现               |
| :------------------------------ | :-----------: | :------: | :---------------------------------: |
| `Drivermanager.`getConnection() |  数据库连接   | Java官方 | 数据库厂商（如Mysql、Oracle等官方） |
| Connection.createStatement()    | Sql语言执行器 | Java官方 | 数据库厂商（如Mysql、Oracle等官方） |
| Statement.executeQuery()        |   查询方法    | Java官方 | 数据库厂商（如Mysql、Oracle等官方） |
| Statement.getResultSet();       |  得到结果集   | Java官方 | 数据库厂商（如Mysql、Oracle等官方） |
| ·······                         |    ·······    | Java官方 | 数据库厂商（如Mysql、Oracle等官方） |

  		上述方法都是由Java官方定义好接口和方法，具体实现由各家数据库厂商去分别针对自家的数据库去实现，数据库厂家提供的JDBC具体实现就是==数据库驱动。==

​			因此，在Java里想要连接数据库，必须先引入对应的数据库驱动。想要使用Mysql就需要引入`mysql-connector-j`依赖，想要使用Oracle就需要引入`ojdbc8`依赖,想要使用SQLite就需要引入`sqlite-jdbc`依赖。作为Java程序员，只需要学习Java定义好的JDBC方法，就能操纵不同的数据库，只需要更换不同的数据库依赖即可。

![image-20251009143836324](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224116.png)

### 2 数据源(DataSource) 是什么？有什么作用？ 

​			既然依靠JDBC和数据库驱动就能操纵数据库，那么数据源`DataSource`又是什么呢？实际上，`DataSource`也是JDBC，不过是对JDBC内部==获取数据库连接==这个特定功能的升级版。

​			无论操纵什么数据库，我们首先都需要获取一个数据库连接，传统方式采用`DriverManager`,现在主流使用`DataSource`方式连接数据库，两者有什么区别呢？

`DriverManager:`

 - 这是一个静态类，由**Java官方提供**，不需要数据库厂商或第三方实现。

 - 获取连接方式：每次调用`DriverManager.getConnection(url,user,password)`都会新建一个数据库连接。

 - 连接池：没有连接池，每次操作都需要新建和关闭连接，性能较低。

 - 没有SQL 监控，没有异常统计，配置内嵌入代码，不易维护。

```java
// 原始方式：DriverManager获取数据库连接
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class MyDriverManager {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/study?useSSL=false&serverTimezone=Asia/Shanghai";
        String user = "root";
        String password = "123456";

        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url, user, password);
            System.out.println("连接成功！");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println(conn);
    }
}
```

   `DataSource:`

 - 这是一个接口，由**Java官方定义但不实现**，需要数据库厂商或第三方实现。

 - 获取连接方式：通过`dataSource.getConnection()`获取数据库连接,连接可复用。

 - 连接池：通常自带连接池，性能高。

 - 有SQL 监控，有异常统计，配置可结合Spring外置，方便维护。

​	下面是使用Druid数据源的连接方式，需要先在`pom.xml`中引入Druid依赖

```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid</artifactId>
  <version>1.2.27</version>
</dependency>
```

```java
// 主流方式：DriverSource获取数据库连接(Druid 数据源)
import com.alibaba.druid.pool.DruidDataSource;
import java.sql.Connection;

public class MyDataSourceTest {

    public static void main(String[] args){
        DruidDataSource ds = new DruidDataSource();
        ds.setUrl("jdbc:mysql://localhost:3306/study?useUnicode=true&characterEncoding=utf8");
        ds.setUsername("root");
        ds.setPassword("123456");
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");

        Connection conn = null;
        try {
            conn = ds.getConnection();
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println(conn);
    }
}

```

​		以上是使用了阿里巴巴的`Druid`数据源,也可以选择其他的`c3p0`、`DBCP`、`HikariCP`等数据源，在使用时并没有大的差别。

​		使用`Datasource`需要引入对应的数据源依赖，单纯的`Java maven`项目看不出来数据源的重要性和便捷性，在下文使用`Springboot`时我们可以体会到数据源的强大，它可以跟踪Sql的执行过程，直接在配置文件中配置更加简便等功能。

### 3 Mybatis 对JDBC的再封装

#### 		Mybatis 介绍

​      		官网： [MyBatis 官网介绍](https://mybatis.org/mybatis-3/zh_CN/index.html)

​		 接下来是`Mybatis`的出现，它是做什么的呢？直接使用JDBC我们也发现了，需要==配置数据源->获取数据库连接->Sql语句执行->获取结果集==，而且还要在java代码中写sql语句，这实际上非常不符合应用开发的解耦性；因此，Mybatis对JDBC进行了再封装，让我们在写java代码时只关注Java，写sql语言时就只是写Sql（:fearful:虽然我感觉也并不简便）。但要明白：**Mybatis只是对Jdbc的再封装，实际上底层依然是调用JDBC的接口操纵数据库。**

​		由于单纯的`Mybatis 不结合Springboot`过于麻烦，因此这里只做简单讲解。下文结合Springboot的Mybatis使用简便不少而且常用。

#### 	**Mybatis的使用**

应注意框选的文件夹建立的位置

![image-20251009204902286](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224125.png)

##### 			1 引入Mybatis依赖 以及 src/java/下静态资源导出问题

​		pom.xml 中增加Mybatis依赖：

```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis</artifactId>
  <version>3.5.19</version>
</dependency>
```

​		因为Mybatis需要我们在`src/Java`目录下写配置文件`/mapper/*.xml`（~~虽然你也可以选写在`Resource/`下，但是....这里不多说~~）;maven的默认配置是不会将`src/Java/`下的静态资源导出的，所以需要为<build>添加一些额外配置。请在<build>中加入`<resources>`标签包括的内容。

```xml

<build>
  <finalName>java-Connectsql</finalName>
  <resources>
    <resource>
      <directory>src/main/resources</directory>
      <includes>
        <include>**/*.properties</include>
        <include>**/*.xml</include>
        <include>**/*.tld</include>
      </includes>
      <filtering>false</filtering>
    </resource>
    <resource>
      <directory>src/main/java</directory>
      <includes>
        <include>**/*.properties</include>
        <include>**/*.xml</include>
        <include>**/*.tld</include>
      </includes>
      <filtering>false</filtering>
    </resource>
  </resources>
</build>
```

#####        2 编写`Mybatis-config.xml`配置文件

​		在`resources/`下添加Mybatis-config.xml 文件，内容如下，请自行更改url，username和password

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/study?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>
```

##### 		3 建数据库表对应的实体类和操纵接口

​		**User实体类：**(用了lombok的注解需要引入lombok的依赖)

```xml
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.42</version>
</dependency>
```

```java
package entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String username;
    private String password;
}

```

​	**UserMapper接口：**

```java
package mapper;

import entity.User;

import java.util.List;

public interface UserMapper {
    List<User> queryAll();

    User queryById(int id);

    int insertUser(User user);

    int updateUser(User user);

    int deleteUserById(int id);

}
```

##### 		4  编写接口对应的配置文件`UserMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="mapper.UserMapper">
    <!-- 查询所有用户 -->
    <select id="queryAll" resultType="entity.User">
        SELECT id, username, password
        FROM user;
    </select>

    <!-- 根据ID查询用户 -->
    <select id="queryById" parameterType="int" resultType="entity.User">
        SELECT id, username, password
        FROM user
        WHERE id = #{id};
    </select>

    <!-- 插入用户 -->
    <insert id="insertUser" parameterType="entity.User" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO user (username, password)
        VALUES (#{username}, #{password}, #{email});
    </insert>

    <!-- 更新用户 -->
    <update id="updateUser" parameterType="entity.User">
        UPDATE user
        SET username = #{username},
            password = #{password},
        WHERE id = #{id};
    </update>

    <!-- 根据ID删除用户 -->
    <delete id="deleteUserById" parameterType="int">
        DELETE FROM user WHERE id = #{id};
    </delete>
</mapper>
```

##### 	5 测试运行

```java
import entity.User;
import mapper.UserMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MyMapperTest {
    public static void main(String[] args) throws IOException {
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();

        System.out.println(sqlSession);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        List<User> users = userMapper.queryAll();
        for (User user : users) {
            System.out.println(user);
        }

    }

}
```

​	最后的这一部分是重点，Mybatis操纵数据库的关键部分就在这里。请重点理解它们	`SqlSessionFactoryBuilder、SqlSessionFactory、SqlSession以及UserMapper。`

- `SqlSessionFactoryBuilder`

   + 作用：用于创建`SqlSessionFactory`，通过读取`Mybatis-config.xml`的输入流
   + 生命周期：一旦创建好`SqlSessionFactory`,就不再需要它
   + 比喻：SqlSession的生产工厂的建筑工人，工厂建好即可抛弃

   

- `SqlSessionFactory`

  - 作用：用于生产(创建)`SqlSession`,通过`sqlSessionFactory.openSession()`
  - 生命周期: 应用程序运行期间一直==存在且唯一==，**没有理由抛弃或创建第二个**。
  - 比喻：SqlSession的建造工厂，专用于生产一个个SqlSession

  

- `SqlSession`
  - 作用：`Session`意思为会话，`SqlSession`即表示数据库会话对象
  - 生命周期：在一个进程或一个方法内使用，不能跨进程使用
  - 比喻：数据库的操作员工，用来增删改查的真正对象

- ` UserMapper userMapper = sqlSession.getMapper(UserMapper.class)`
  - 最重要的一行代码，表面看我们得到了一个接口对象，实际上内部是==动态代理对象==

|                         调用过程如下                         |
| :----------------------------------------------------------: |
|       当调用`sqlSession.getMapper(UserMapper.class)；`       |
|                           ↓ (调用)                           |
| **this.**`configuration.getMapper(`**type, this**`)`                                                                                            其中**this** 即当前`sqlSession`对象，**type**即`UserMapper.class` 类型 |
|                           ↓(调用)                            |
| **this.**`mapperRegistry.getMapper(type, `**sqlSession**`)`                                                                                        其中**this** 即当前`sqlSession.configuration`对象，**sqlSession**即当前`sqlSession` 对象 |
|                           ↓(调用)                            |
| `mapperProxyFactory.newInstance(sqlSession)`                                                                                     其中**type**在这一步已经被确定，不需要往下传了；只需要通过**sqlSession**得到代理对象 |
|                           ↓(调用)                            |
| `Proxy.newProxyInstance(this.mapperInterface.getClassLoader(),                   ``                         new Class[]{this.mapperInterface},                                      ``                         mapperProxy)`                                                                                                                                                              ==到这一步可以清晰发现它是利用了动态代理的方式去生成**Mapper**的代理对象，而非Mapper的实现类== |

- 因此,`UserMapper`的每一个方法的调用都会被代理对象拦截，因为它本身就是动态代理对象。

分析到此，尽力了，:rage:。接下来我们来看`Springboot`如何操作数据库，使用起来简单不少。

***

## Springboot 数据库连接

​		`Springboot`作为Java最强大的Java框架，是Java学习必不可少的一部分；连接数据库这方面它也为我们简化不少，接下来我将从`Springboot`项目直接连接数据库开始，再介绍如何引入外部的数据源和使用`Mybatis`框架。

### 一 Springboot ---直连数据库

#### 创建Springboot项目并导入依赖

​			想要连接数据库，最基本需要`JDBC`依赖和`Mysql`依赖,可以选择在创建项目时勾选亦可以选择创建好项目后在`pom.xml`中手动添加依赖。

![image-20251011194040924](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224139.png)

​		勾选后可以看到`pom.xml`中存在以下两个依赖；如果没有勾选，也可以直接添加这段代码到文件中。**如果你是手动添加，一定要记得添加好后，maven刷新一下，确认依赖正确导入**

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
</dependency>
```

#### 配置数据库连接参数

​			连接数据库需要用户名，密码等参数，Springboot为我们提供了配置文件，只需要在配置文件中声明即可。
![image-20251011195144705](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224727.png)

​           Springboot直接创建的项目在`resoureces/`下会发现一种配置文件，如果没有请你创建`application.yml`,如果是`application.properties`请你删除并创建`application.yml`;这两种文件都可以进行springboot的配置，不过这里推荐使用`application.yml`,它的配置更清晰。

在`application.yml`添加以下配置即可

```yaml
spring:
  datasource:
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/study
    driver-class-name: com.mysql.cj.jdbc.Driver
```

####  测试连接

然后直接在Test文件中用如下代码测试：

```java
@SpringBootTest
class Boot08ConnectSqlApplicationTests {

    @Autowired
    DataSource dataSource;

    @Test
    void contextLoads() throws Exception {

        Connection connection =  dataSource.getConnection();

        System.out.println(connection);
    }

}
```



输出如图：

![image-20251011200001781](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224154.png)

​		从图中可以发现：

- 数据库驱动：``com.mysql.cj.jdbc`
- 数据源:`HiKari` 这是SpringBoot默认的数据源

### 二 Springboot ---如何引入外部DataSource

​			我们当然也可以选择引入外部的数据源，比如`Druid`数据源。

#### 导入数据源依赖

​	在`pom.xml`中添加下面的依赖，记得刷新Maven

```xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>druid-spring-boot-starter</artifactId>
  <version>1.2.23</version>
</dependency>
```

#### 配置数据库连接参数并测试

只需要在配置文件中增加`type`配置,其他代码不用改动，再次运行程序，你就会发现启用了Druid数据源

```yml
spring:
  datasource:
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/study
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource
```

![image-20251011204517922](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224844.png)

---

#### 进一步Druid配置

​			使用Druid真的只有这么简单吗？如果只是添加type这一项配置的话，实际上无法满足更深层次的需求，比如使用Druid数据源的独有方法，配置它的连接，监控和安全等功能，所以我们需要**注册一个DruidDataSource的bean**。

![image-20251011211251082](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224957.png)

步骤：

1. 创建配置类`DruidSourceConfig`,名字和位置其实并不重要，但推荐规范，便于开发维护。

2. 为类添加注解`@Configuration`，作用是Spring会在启动时扫描它并为其里面的`@Bean`方法注册并托管.

3. 创建方法`public DruidDataSource druidDataSource()`,这个方法的名字其实随便，但是返回值一定是`DruidDataSource`,spring自动注入依靠的就是这个返回值类型。

4. 为这个方法添加三个注解。

   - **@Bean**

     告诉 Spring，方法返回的对象要被注册为一个 Bean，并由 Spring 容器管理

   - **@ConfigurationProperties(prefix = "spring.datasource")**

     把 `application.yml` 中，以 `spring.datasource` 开头的配置，自动绑定到这个 Bean 的属性上。

      - **@ConditionalOnProperty(**

        ​                            **name = "spring.datasource.type", **

        ​                            **havingValue = "com.alibaba.druid.pool.DruidDataSource")**

        为避免和默认 Hikari或其他数据源冲突，添加该项注解；作用是：只有当配置文件中存在`spring.datasource.type=com.alibaba.druid.pool.DruidDataSource` 时，这个 Bean 才会被创建。

```java
@Configuration
public class DruidSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    @ConditionalOnProperty(name = "spring.datasource.type", havingValue = "com.alibaba.druid.pool.DruidDataSource")
    public DruidDataSource druidDataSource() {
        return new DruidDataSource();
    }
}
```

#### 进一步测试

配置文件中可添加druid相关配置,

```yml
spring:
  datasource:
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/study
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.alibaba.druid.pool.DruidDataSource

		#如果没有进行Bean的注册，以下配置不会生效
    initial-size: 5              # 初始化连接数：连接池启动时创建的物理连接数量
    min-idle: 5                  # 最小空闲连接数：连接池中保持的最少空闲连接数
    max-active: 20               # 最大连接数：连接池允许同时存在的最大连接数
    max-wait: 60000              # 获取连接的最大等待时间（ms）：当连接池没有可用连接时，等待获取连接的最长时间
    validation-query: SELECT 1   # 验证连接有效性的 SQL，用于检测连接是否可用
    test-on-borrow: false        # 从池中取出连接时是否执行验证 SQL（减少性能开销）
    test-while-idle: true        # 空闲时是否检测连接有效性，配合 time-between-eviction-runs-millis 使用
    time-between-eviction-runs-millis: 60000  # 空闲连接检测线程运行间隔（ms），每隔多久检查一次空闲连接是否可用

```

可在Test中测试

```java
@SpringBootTest
class Boot08ConnectSqlApplicationTests {

    @Autowired
    DruidDataSource druidDataSource;

    @Test
    void contextLoads() throws Exception {
        Connection connection =  druidDataSource.getConnection();
        System.out.println(connection);
        System.out.println("initialSize: " + druidDataSource.getInitialSize());
        System.out.println("minIdle: " + druidDataSource.getMinIdle());
        System.out.println("maxActive: " + druidDataSource.getMaxActive());
    }

}
```

![image-20251011214140603](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224216.png)

以上就是如何在Springboot中引入外部数据源。最后让我们看如何在Springboot中使用Mybatis

### 三 Springboot ---Mybatis的使用

​		Mybatis的使用也需要从导入依赖开始。

#### 导入Mybatis依赖 	

```xml
<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
  <version>3.0.5</version>
</dependency>

<!-- lombok依赖 偷懒用的，请也导入-->
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
</dependency>
```

​	`Mybatis`有很多适配不同环境的依赖，诸如mybatis依赖，mybatis-spring依赖，mybatis-spring-boot-starter依赖等。

	- **mybatis**：只使用 MyBatis 核心功能，不依赖 Spring 框架.
	- **mybatis-spring**：Spring 项目使用，但不是 Spring Boot 项目.
	- **mybatis-spring-boot-starter**:MyBatis + Spring Boot 的整合启动器,Springboot 项目使用.

#### 配置

​		mybatis的spring配置很简单，没什么别的需求的话只需要添加自动扫描*.xml和为实体类起别名;但是请特别注意几个文件的位置。

```yml
spring:
  datasource:
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/study
    driver-class-name: com.mysql.cj.jdbc.Driver
mybatis:
  mapper-locations: classpath:mapper/*.xml # XML 映射文件位置
  type-aliases-package: com.tian.entity    # 实体类别名包
```

![image-20251011221830579](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224219.png)

- **User **实体类，跟数据库中的表互相映射；

```java
//这里你没导入lombok依赖的话，这三个注解不会生效；需要写get，set和构造器等方法
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String username;
    private String password;
}
```

- **UserMapper** 接口,对表的操作方法，注意位置放在mapper/下,还有最重要的注解@Mapper

```java
//注解@Mapper：告诉Spring Boot 这个接口要被扫描生成代理 Bean 并注册到容器
@Mapper
public interface UserMapper {
    List<User> queryAll();

    User queryById(int id);

    int insertUser(User user);

    int updateUser(User user);

    int deleteUserById(int id);
}
```

- **UserMapper.xml**文件，请放在`resources/mapper/`下，这样更规范

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.tian.mapper.UserMapper">
    <!-- 查询所有用户 -->
    <select id="queryAll" resultType="User">
        SELECT id, username, password
        FROM user;
    </select>

    <!-- 根据ID查询用户 -->
    <select id="queryById" parameterType="int" resultType="User">
        SELECT id, username, password
        FROM user
        WHERE id = #{id};
    </select>

    <!-- 插入用户 -->
    <insert id="insertUser" parameterType="User" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO user (username, password)
        VALUES (#{username}, #{password}, #{email});
    </insert>

    <!-- 更新用户 -->
    <update id="updateUser" parameterType="User">
        UPDATE user
        SET username = #{username},
            password = #{password}
        WHERE id = #{id};
    </update>

    <!-- 根据ID删除用户 -->
    <delete id="deleteUserById" parameterType="int">
        DELETE FROM user WHERE id = #{id};
    </delete>
</mapper>
```



#### 测试

请在测试文件中添加代码测试

```java

@Autowired
UserMapper userMapper;

@Test
void test() throws SQLException {
  List<User> users = userMapper.queryAll();
  for (User user : users) {
    System.out.println(user);
  }
}
```

结果如图

![](https://raw.githubusercontent.com/2722714532/Typora/main/image20251011224227.png)

总结：Mybatis的Spring整合帮我们省去了好多配置，只需要在配置文件中声明好即可。

***

记录和分享学习过程，如有错误，请指正。

## 参考链接

[Java中JDBC的超详细总结-CSDN博客](https://blog.csdn.net/m0_37761437/article/details/110468944)

[Java 中 DataSource-数据源 的基础介绍_java datasource-CSDN博客](https://blog.csdn.net/qq_45464560/article/details/148703229)

[详细springboot实现MySQL数据库的整合步骤_springboot配置mysql-CSDN博客](https://blog.csdn.net/English221/article/details/129347883)













































































































