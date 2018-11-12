<div class="pull-right"> 업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[프로파일 (profile)](#프로파일-profile)
	-	[web.xml](#webxml)
	-	[application.yml](#applicationyml)
-	[클래스레벨](#클래스레벨)
-	[메서드레벨](#메서드레벨)
-	[프로파일 선택](#프로파일-선택)

<!-- /code_chunk_output -->

### 프로파일 (profile)

-	설정 파일을 특정 환경이나 목적에 맞게 선택적으로 사용할 수 있도록 그룹화
-	스프링은 프로파일이 활성상태인지를 경정하는 두 가지 다른 프로퍼티를 가짐
	-	spring.profiles.active
	-	spring.profiles.default

> spring.profiles.active vs spring.profiles.default

-	설정되어 있는 경우, 그 값은 프로파일이 활성상태인지 결정
-	설정되어 있지 않다면, 스프링은 spring.profiles.default로 처리
-	둘 다 설정되어 있지 않다면, 활성화 프로파일이 없으며 프로파일이 정의되지 않은 것만 만들어 진다.

#### web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app>

    <!-- DI Container : Root -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/spring/root-context.xml</param-value>
    </context-param>

    <!-- Profile : Root -->
    <context-param>
        <param-name>spring.profiles.default</param-name>
        <param-value>local</param-value>
    </context-param>

    <servlet>
        <servlet-name>appServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- DI Container : Servlet -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/spring/appServlet/servlet-context.xml</param-value>
        </init-param>

        <!-- Profile : Servlet -->
        <init-param>
            <param-name>spring.profiles.active</param-name>
            <param-value>local</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup> <!-- priority (1) -->
    </servlet>
</web-app>
```

-	Serlvet 안의 Profiles는 외부 Root Profiles에 영향을 주지 않습니다. (독립적)

#### application.yml

```yml
# [REF] https://jojoldu.tistory.com/269

# common
server:
  port: 8282

spring:
  profiles:
    active: local # default

property:
  hello: hello

# local
---
spring:
  profiles: local
  datasource:
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:3306/sdm
    username: root
    password:

property:
  hello: local_hello

# stage
---
spring.profiles: stage
spring.profiles.include: local

property:
  hello: stage_hello # 적용안됨 (local_hello)

# live
---
spring.profiles: live
spring.profiles.include: local

property:
  hello: live_hello # 적용안됨 (local_hello)
```

### 클래스레벨

> 자바기반 (@Profile 사용)

```java
@Configuration
@Profile("dev")
public class DevConfig {

}

@Configuration
@Profile("test")
public class TestConfig {

}

@Configuration
@Profile("prod")
public class ProductionConfig {

}
```

> XML 기반 (profile="")

```xml
<beans
  profile="dev">

</beans>
```

> 애너테이션 기반

```java
@Component
@Profile("dev")
public class DummyUserRepository implements UserRepository {

}
```

### 메서드레벨

> 자바기반

```java
@Configuration
public class AppConfig {

    @Bean(name="dataSource")
    @Profile("dev")
    DataSource dataSourceForDev() {

    }

    @Bean(name="dataSource")
    @Profile("test")
    DataSource dataSourceForTest() {

    }

    @Bean(name="dataSource")
    @Profile("prod")
    DataSource dataSourceForDev() {

    }
}
```

-	@Profile({"dev", "test"}) 와 같이 여러개의 프로파일도 가능
-	@Profile("!prod") 와 같이 하나만 제외하는 것도 가능

> XML기반

```xml
<beans>
  <beans profile="dev">
    <bean id=""/>
  </beans>
  <beans profile="test">
    <bean id=""/>
  </beans>
  <beans profile="prod">
    <bean id=""/>
  </beans>
</beans>
```

### 프로파일 선택

> 자바 명령행 옵션으로 프로파일 지정

```
-Dspring.profiles.active=dev
```

-	설정방법

```
(리눅스) export JAVA_OPTS="$JAVA_OPTS -Dspring.profiles.active=dev"
(윈도우) set JAVA_OPTS=%JAVA_OPTS% -Dspring.profiles.active=dev
(IntelliJ) Edit Configuration > Override Parameter > Name : spring.profiles.active , Value : {profiles_name}
```

-	jar 실행시 등록

```
$ java -jar myproject.jar --spring.profiles.active=test
```

-	환경변수로 처리

```
export SPRING_PROFILES_ACTIVE=dev
```

-	파일등록

http://feco.tistory.com/106

-	web.xml 프로파일

```xml
<context-param>
  <param-name>spring.profiles.active</param-name>
  <param-value>dev</param-name>
</context-param>
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
