<div class="pull-right"> 업데이트 :: 2018.08.22 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[스프링 시큐리티 모듈](#스프링-시큐리티-모듈)
-	[프레임워크 아키텍처](#프레임워크-아키텍처)

<!-- /code_chunk_output -->

### 스프링 시큐리티 모듈

-	spring-security-core
	-	인증과 인가기능을 구현하기위한 핵심기능
-	spring-security-web
	-	웹 애플리케이션의 보안 기능을 구현하기 위한 컴포넌트로 구성
-	spring-security-config
	-	모듈에서 제공하는 컴포넌트의 설정을 지원하기 위한 컴포넌트로 구성
-	spring-security-taglibs
	-	인증정보나 인가정보를 사용하기 위한 JSP 태그라이브러리
-	spring-security-oauth2
	-	OAuth2를 사용해 인가기능을 구현하기 위한 모듈
-	추가기능
	-	일반적인 인증방법(LDAP, OpenID, CAS 등등)을 지원하기 위한 모듈
	-	ACL(Access Control List)을 사용한 도메인 객체의 인가를 제어하는 모듈
	-	스프링 웹소켓 기능에 보안 기능을 구현하기 위한 모듈
	-	스프링 시큐리티를 활용한 코드를 테스트하기 위한 모듈

### 프레임워크 아키텍처

> 클라이언트 -> FilterChainProxy -> HttpFirewall -> SecurityFilterChain -> Resource

-	스프링 시큐리티는 서블릿 필터의 매커니즘을 활용 웹 애플리케이션의 보안 기능을 지원
	-	클라이언트는 웹 애플리케이션에 요청을 보냄
	-	스프링 시큐리티의 FilterChainProxy 클래스가 요청을 받음
	-	HttpFirewall 인터페이스의 메서드를 호출해서 HttpServletRequest와 HttpServletResponse에 대한 방화벽 기능 수행
	-	FilterChainProxy 클래스는 SecurityFilterChain에 설정된 보안 필터 클래스에 처리를 위임
	-	이 필터는 실제로 서브릿 필터 형태로 만들어짐
	-	SecurityFilterChain에 여러 보안 필터가 연쇄적으로 연결된 형태로 설정
	-	앞의 보안 필터가 정상적으로 처리되면 뒤이은 보안 필터가 뒤이어 호출되는 형식
	-	마지막 보안 필터의 처리가 정상적으로 종료되면 뒤이어 남은 서블릿 필터나 서블릿이 실행
	-	웹 어플리케이션 리소스에 접근이 가능해짐
	-	FilterChainProxy 클래스는 웹 어플리케이션에서 반환한 리소스를 클라이언트에 전달

> FilterChainProxy

-	프레임워크의 진입점 역할을 하는 서블릿 필터 클래스
-	전체흐름을 제어하고 보안기능과 같은 추가기능을 필터에 위임하는 방식으로 동작

> HttpFirewall

-	HttpServletRequest & HttpServletResponse에 대한 방화벽 기능을 추가
-	기본적으로 DefaultHttpFirewall 클래스가 사용
-	디렉터리 탐색공격이나 인가되지 않은 요청을 차단

> SecurityFilterChain

-	FilterChainProxy가 받은 요청에 적용할 보안 필터목록을 관리
-	기본적으로 DefaultSecurityFilterChain 클래스가 사용

> 요청패턴별로 보안필터 목록을 관리

```java
@EnableWebSecurity
public class WebSecurityConfig {

    @Configuration
    @Order(1)
    public static class UiWebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/ui/**");
        }
    }

    @Configuration
    @Order(2)
    public static class ApiWebSecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            http.antMatcher("/api/**");
        }
    }
}
```

> 보안 필터

-	보안 기능을 제공하는 서블릿 필터 클래스
-	스프링 시큐리티는 이러한 보안 필터를 체인형태로 연결해서 웹 어플리케이션에 필요한 보안 기능을 하도록 처리

> 인증과 인가기능을 구현하는데 핵심 클래스

-	SecurityContextPersistenceFilter
	-	인증정보를 요청처리 과정 전반에서 공유할 수 있게 만듬
	-	기본 구현에서 HttpSession 인증정보를 저장해서 공뷰하는 방식
-	UsernamePasswordAuthenticationFilter
	-	요청 파라미터에서 지정한 사용자명과 패스워드를 사용해 인증을 처리
	-	폼인증을 수행할 때 사용
-	LogoutFilter
	-	로그아웃을 처리
-	FilterSecurityInterceptor
	-	HTTP 요청(HttpServletRequest)의 인가를 처리
-	ExceptionTranslationFilter
	-	FilterSecurityInterceptor에서 발생한 예외를 처리
	-	클라이언트 반환할 응답을 생성
	-	기본 구현방식에서는 인증되지 않은 사용자는 인증을 하도록 유도, 이미 인증된 사용자는 인가오류가 발생했다고 알림

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
