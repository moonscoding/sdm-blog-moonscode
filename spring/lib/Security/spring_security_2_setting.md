
<div class="pull-right">  업데이트 :: 2018.08.22 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [라이브러리 설정](#라이브러리-설정)
* [스프링 시큐리티 빈정의](#스프링-시큐리티-빈정의)
* [서블릿 필터 설정](#서블릿-필터-설정)

<!-- /code_chunk_output -->

### 라이브러리 설정

```xml
<!-- 스프링 시큐리티 WEB -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-web</artifactId>
</dependency>

<!-- 스프링 시큐리티 Config -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-config</artifactId>
</dependency>

<!-- 스프링 시큐리티 Taglib -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-taglibs</artifactId>
</dependency>
```

### 스프링 시큐리티 빈정의

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/resources/**");
    }
}
```

- @EnableWebSecurity
  - 스프링 시큐리티가 제공하는 설정 클래스가 임포트
  - 스프링 시큐리티를 이용할 때 필요한 컴포넌트의 빈이 자동으로 정의
- WebSecurityConfigurerAdapter 상속
  - 기본적으로 적용되는 빈의 정의를 간단히 커스텀할 수 있음
- 보안기능이 필요없는 리소스에는 스프링 시큐리티를 적용치 않음

> web.xml

```xml
<listener>
     <listener-class>
         org.springframework.web.context.ContextLoaderListener
     </listener-class>
 </listener>
 <context-param>
     <param-name>contextClass</param-name>
     <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
 </context-param>
 <context-param>
     <param-name>contextConfigLocation</param-name>
     <param-value>example.config.WebSecurityConfig</param-value>
 </context-param>
```

- contextConfigLocation
  - ApplicationContext를 스프링 시큐리티가 적용된 Config 클래스로 교체

### 서블릿 필터 설정

> web.xml

```xml
<filter>
     <filter-name>springSecurityFilterChain</filter-name>
     <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
 </filter>
 <filter-mapping>
     <filter-name>springSecurityFilterChain</filter-name>
     <url-pattern>/*</url-pattern>
 </filter-mapping>
```

- DelegatingFilterProxy
  - DI 컨테이너에서 관리되는 빈(FilterChainProxy) 서블릿 컨테이너에 등록

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
