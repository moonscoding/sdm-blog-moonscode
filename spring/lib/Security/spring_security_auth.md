
<div class="pull-right">  업데이트 :: 2018.08.22 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [인증처리](#인증처리)
	* [인증처리 매커니즘](#인증처리-매커니즘)
* [폼인증](#폼인증)
* [인증 성공시 응답](#인증-성공시-응답)
* [인증 실패시 응답](#인증-실패시-응답)
* [데이터베이스 인증](#데이터베이스-인증)
* [패스워드 해시](#패스워드-해시)
* [인증 이벤트 처리](#인증-이벤트-처리)
* [로그아웃](#로그아웃)
	* [로그아웃 성공시 응답](#로그아웃-성공시-응답)
* [인증정보 접근](#인증정보-접근)
* [인증처리 & 스프링 MVC 연계](#인증처리-스프링-mvc-연계)
* [오류메세지](#오류메세지)

<!-- /code_chunk_output -->

### 인증처리

#### 인증처리 매커니즘

- 클라이언트는 인증이 필요한 리소스 경로에 접근할 때, 자격정보(사용자명 패스워드)를 요청 파라미터로 설정
- 인증필터(Authentication Filter)는 요청 파라미터에서 자격정보를 구해, AuthenticationManager 클래스의 인증메서드 호출
- ProviderManager(AuthenticationManager의 구현클래스)는 실제 인증처리를 AuthenticationProvider의 구현클래스에 위임

> 인증 필터

- 인증필터는 인증처리방식에 대한 구현을 제공하는 서브릿 필터
- 폼 인증용 서블릿 필터 클래스(UsernamePasswordAuthenticationFilter)를 사용하는 것을 전제로 설명
  - 그 밖에 Basic 인증, Digest 인증, Remember Me 인증과 같은 다양한 서블릿 필터가 있음

> AuthenticationManager

- 인증처리를 수행하기 위한 인터페이스
- 스프링 시큐리티에서 제공하는 기본구현(ProviderManager)에서 실제 인증처리를 AuthenticationProvider에게 위임
  - 반환되는 인증결과를 처리하는 구조

> AuthenticationProvider

- 인증처리기능을 구현하기 위한 인터페이스
- 사용자 자격정보와 상태정보를 확인하기 위해 DaoAuthenticationProvider를 사용하는 것을 전체로 설명
  - 그 밖에 인증 방식별로 그에 맞는 다양한 구현클래스를 제공

### 폼인증

- 클라이언트는 폼인증이 필요한 리소스경로에 접근시에 자격정보(사용자명 & 패스워드)를 요청 파라미터로 전송
- UsernamePasswordAuthenticationFilter 클래스는 요청 파라미터에서 자격정보를 구함
  - 그 후에, AuthenticationManager를 통해 해당 이용자가 인증된 사용자인지 확인
- UsernamePasswordAuthenticationFilter 클래스는 AuthenticationManager에서 반환한 인증 결과를 확인
  - 인증에 성공한 경우 AuthenticationSuccessHandler() 호출
  - 인증에 실패한 경우 AuthenticationFailureHandler() 호출

> 폼인증의 적용

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      // ..
      http.formLogin();
    }
}
```

- formLogin() 호출시에 폼인증 활성화 FormLoginConfigurer 인스턴스 반환
  - FormLoginConfigurer
    - 폼인증에 사용하는 컴포넌트 동작을 커스텀하는 메서드

> 기본동작

- '/login' 경로에 GET 메서드 호출시 스프링 시큐리티가 제공하는 기본 로그인 폼표시
- 로그인폼에 필요한 정보를 입력한 다음 로그인 버튼을 누르면 '/login' 경로에 대한 POST 메서드가 실행되어 인증처리

> 로그인 폼의 작성

- 기본폼을 제공하지만, 그대로 이용하지 않음

```html
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
<body>
    <div id="wrapper">
        <h3>로그인폼</h3>
        <c:if test="${param.containsKey('error')}">
            <span stype="color : red;">
                <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}" />
            </span>
        </c:if>
        <c:url var="loginUrl" value="/login" />
        <form:form action="${loginUrl}">
            <table>
                <tr>
                    <td><label for="username">사용자명</label></td>
                    <td><input type="text" id="username" name="username"></td>
                </tr>
                <tr>
                    <td><label for="password">패스워드</label></td>
                    <td><input type="password" id="password" name="password"></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td><button>로그인</button></td>
                </tr>
            </table>
        </form:form>
    </div>
</body>
</html>
```

- 인증오류를 표시하기 위해 영역을 만듬
  - 인증오류가 발생시에 세션이나 요청스코프에 'SPRING_SECURITY_LAST_EXCEPTION'이라는 속성명으로 예외 객체 저장
- 사용자명과 패스워드를 입력하기 위한 로그인 폼생성

```java
@Controller
public class AuthenticationController {

    @RequestMapping(path = "/login", method = RequestMethod.GET)
    public String viewLoginForm() {
        return "loginForm";
    }
}
```

- loginForm 뷰를 반환
- ViewResolver가 로그인 폼의 JSP(src/main/webapp/views/loginForm.jsp)를 찾아줌

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin()
            .loginPage("/login")
            .permitAll();
        http.authorizeRequests()
                .anyRequest()
                .authenticated();
    }
}
```

- loginPage() 호출시에 로그인 폼을 표시하기 위한 경로 지정
- 익명의 사용자가 인증이 필요한 리소스에 접근시에 지정한 경로로 리다이렉트해서 로그임 폼 표시
- loginPage() 인수가 변경되면 인증 경로(loginProcessingUrl)도 함께 변경
- permitAll 메서드를 호출해서 모든 이용자가 로그인 폼에 접근이 가능하도록 처리
  - 익명 사용자에게 로그인 폼에 대한 접근 권한을 주지 않을 경우
    - 로그인 폼을 표시할 때 인증오류가 발생해서 리다이렉트 루프가 발생

> 기본동작의 커스텀

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.formLogin()
            .loginPage("/login")
            .loginProcessingUrl("Authenticate")
            .usernameParameter("uid")
            .passwordParameter("pid")
            .permitAll();
    http.authorizeRequests()
            .anyRequest()
            .authenticated();
}
```

- loginProcessingUrl()
  - 인증경로를 수정
- usernameParameter()
  - 사용자명의 요청 파라미터 수정
- passwordParameter()
  - 패스워드의 요청 파라미터 수정

### 인증 성공시 응답

- AuthenticationSuccessHandler 인터페이스
  - 구현클래스
    - SavedRequestAwareAuthenticationSuccessHandler
      - 인증전에 접근을 시도한 URL로 리다이렉트
      - 기본값
    - SimpleUrlAuthenticationSuccessHandler
      - 생성자에 지정한 URL(defaultTargetUrl)로 리다이렉트나 포워드

> 기본동작

- 인증전에 접근 시도한 요청을 HTTP 세션에 저장해 뒀다가 인증이 성공한 후에 저장된 요청을 복원해서 리다이렉트
  - 인증된 사용자가 리다이렉트되는 경로에 접근 권한이 있으면 페이지가 표시
  - 인증된 사용자가 리다이렉트되는 경로에 접근 권한이 없으면 인증 오류 발생
  - SavedRequestAwareAuthenticationSuccessHandler가 다음과 같은 과정을 처리
- 처음부터 로그인 폼을 명시적으로 요청했을때 성공하면 루트('/')로 이동

> 기본동작 커스텀

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.formLogin()
            .defaultSuccessUrl("/menu")
            .permitAll();
}
```

### 인증 실패시 응답

- AuthenticationFailureHandler 인터페이스
  - 구현클래스
    - SimpleUrlAuthenticationFailureHandler
      - 생성자에 지정한 URL(defaultFailureUrl)로 리다이랙트나 포워드
      - 기본값
    - ExceptionMappingAuthenticationFailureHandler
      - 인증예외나 이동대상의 URL을 매핑
      - 스프링 시큐리티는 오류의 원인마다 발생하는 예외의 클래스가 바뀌어 다음을 사용하면 오류의 종류에 따라 이동대상을 변경 가능
    - DelegatingAuthenticationFailureHandler
      - 인증예외와 AuthenticationFailureHandler를 매핑
      - 인증예외마다 AuthenticationFailureHandler를 지정하므로 더 유연

> 기본동작

- 로그인 폼을 표시하는 경로에 error라는 쿼리 파라미터가 붙은 URL로 리다이렉트하게 됨
- 로그인 폼의 경로가 '/login' 일때, '/login?error' 로 리다이렉트

> 기본동작 커스텀

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
    http.formLogin()
            .failureUrl("/loginFailure")
            .permitAll();
}
```

### 데이터베이스 인증

- 클라이언트로부터 인증의뢰를 받아 DaoAuthenticationProvider에 인증처리를 위임
- DaoAuthenticationProvider는 UserDetailsService에게 사용자정보를 가져옴
	- UserDetailsService
		- 데이터 저장소에서 사용자정보를 가져옴
		- 데이터 저장소에서 가져온 사용자 정보를 사용해 UserDetails를 만듬
- DaoAuthenticationProvider는 UserDetailsService에서 반환된 UserDetails과 클라이언트가 제공하는 인증정보를 대조
	- 이용자가 정당한 사용권한을 가지고 있는지 확인
	- 이용자가 정당한 사용권한을 가지고 있지 않다면 인증 오류 발생
- JDBC를 통해 사용자정보를 가져오기 위한 구현 클래스 제공
	- org.springframework.security.core.userdetails.User
	- org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl

> UserDetails

- 인증처리에 필요한 자격정보(사용자명 & 패스워드)와 사용자의 상태정보를 제공하기 위한 인터페이스

```java
public interface UserDetails extends Serializable {
	String getUsername();
	String getPassword();
	boolean isEnabled();
	boolean isAccountNonLocked();
	boolean isAccountNonExpired();
	boolean isCredentialsNonExpired();
	Collection<? extends GrantedAuthority> getAuthorities();
}
```

- getUsername()
	- 사용자명반환
- getPassword()
	- 등록된 패스워드 반환
	- 반환된 패스워드와 클라이언트에서 전달된 패스워드가 다르면 DaoAuthenticationProvider가 BadCredentialException발생
- isEnabled()
	- 유효한 패스워드인지 판단
	- 유효하다면 true
	- 그렇지 않다면 DaoAuthenticationProvider가 BadCredentialException발생
- isAccountNonLocked()
	- 계정의 잠금상태를 판단
	- 잠겨있다면 true
	- 그렇지 않다면 DaoAuthenticationProvider가 BadCredentialException발생
- isAccountNonExpired()
	- 계정의 유효기간 상태를 판단
	- 유효하다면 true
	- 그렇지 않다면 DaoAuthenticationProvider가 BadCredentialException발생
- isCredentialsNonExpired()
	- 자격정보의 유효기간상태를 판단
	- 유효하다면 true
	- 그렇지 않다면 DaoAuthenticationProvider가 BadCredentialException발생
- getAuthorities()
	- 사용자가 가진 권한 리스트를 반환
	- 인가처리에서 필요

> UserDetails 구현

```java
public class AccountUserDetails implements UserDetails {

    private final Account account;
    private final Collection<GrantedAuthority> authorities;

    public AccountUserDetails(Account account, Collection<GrantedAuthority> authorities) {
        this.account = account;
        this.authorities = authorities;
    }

    public Account getAccount() {
        return this.account;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.account.isEnabled();
    }
}
```

> User 구현클래스이용

```java
public class AccountUserDetails extends User {

    private final Account account;

    public AccountUserDetails(
            Account account,
            boolean accountNonExpired,
            boolean credentialsNonExpired,
            boolean accountNonLocked,
            Collection<GrantedAuthority> authorities) {
        super(account.getUsername(), account.getPassword(), account.isEnabled(), true, true, true, authorities);
        this.account = account;
    }

		public Account getAccount() {
				return this.account;
		}
}
```

> UserDetailsService

- 자격정보와 사용자 상태 정보를 데이터 저장소에서 가져오기 위한 인터페이스

```java
public interface UserDetailsService {
    UserDetails loadUserByUsername(String var1) throws UsernameNotFoundException;
}
```

> 구현

```java
public class AccountUserDetailsService implements UserDetailsService {

    @Autowired
    AccountRepository accountRepository;

    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = Optional
                .ofNullable(accountRepository.findOne(username))
                .orElseThrow(()->new UsernameNotFoundException("user not found."));

        return new AccountUserDetails(account, getAuthorities(account));
    }

    private Collection<GrantedAuthority> getAuthorities(Account account) {
        if(account.isAdmin()) {
            return AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_USER", "ROLE_ADMIN");
        } else {
            return AuthorityUtils.createAuthorityList("ROLE_USER");
        }
    }
}
```

- 데이터베이스에 계정정보를 검색
	- 계정정보가 없는경우 UsernameNotFoundException 발생
- 계정정보가 있는경우 UserDetails 생성
- 사용자가 가진 권한정보를 가져옴, 여기서 생성한 권한정보는 인가처리에서 사용
	- 스프링 시큐리티에서 인가처리를 할 때 'ROLE_'로 시작하는 권한 정보를 롤로 취급
	- 리소스에 대한 권한제어를 롤 기반으로 할때는 권한정보에 반드시 'ROLE_' 접두사를 붙임

> 인증처리 적용

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    void configureAuthenticationManager(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

- AuthenticationManager의 빈을 정의하기 위한 메서드 구현
- AuthenticationManagerBuilder에 앞서 만든 UserDetailsService 설정
- PasswordEncoder 설정
	- BCrypt 알고리즘으로 해시하는 BCryptPasswordEncoder 사용

### 패스워드 해시

- PasswordEncoder 제공
	- BCryptPasswordEncoder
		- BCrypt 알고리즘으로 해시
	- StandardPasswordEncoder
		- SHA-256 알고리즘으로 해시
	- NoOpPasswordEncoder
		- 해시화하지 않은 구현클래스
		- 테스트용으로 실제 애플리케이션에서는 사용하지 않음

> BCryptPasswordEncoder

- 솔트에는 16바이트 크기의 난수가 사용 기본적으로 1024번 스트레칭을 수행

### 인증 이벤트 처리

- 스프링이 제공하는 이벤트 통지 메커니즘을 이용해서 인증처리결과를 다른 컴포넌트로 전달
	- 인증의 설공이나 실패와 같은 이력을 데이터베이스나 로그에 저장
	- 패스워드가 연속으로 일정횟수 이상 틀렸을때 계정을 잠그고 싶은 경우

> 처리과정

- AuthenticationEventPubilsher에 전달해서 인증이벤트의 통지
- AuthenticationEventPubilsher의 기본 구현클래스는 인증결과에 대해 인증이벤트를 인스턴스로 만음
- ApplicationEventPublisher에게 전달해서 이벤트 통지를 의뢰
- ApplicationEventPublisher의 구현클래스는 ApplicationListener의 인터페이스의 구현클래스에 이벤트를 통지
	- 구현클래스인 ApplicationListenerMethodAdaptor는 @EventListener가 붙은 메서드를 호출하는 방법으로 이벤트를 통지

> 인증성공 이벤트

- AuthenticationSuccessEvent
	- AuthenticationProvider의 인증처리가 성공했음을 통징
	- 이벤트정보를 활용하면 클라이언트가 올바른 인증정보를 가지고 있다는 것을 알 수 있음
	- 단, 다음 인증처리에서 오류가 발생할 가능성이 있음
- SessionFixationProtectionEvent
	- 세션 고정 공격에 대비한 처리(세션 ID 변경)가 성공했음을 통지
	- 이벤트정보를 활용하면 변경 후의 세션 ID를 알 수 있음
- InteractiveAuthenticationSuccessEvent
	- 인증처리가 모두 성공했음을 통지
	- 이벤트정보를 활용하면 이동을 제외한 모든 인증처리가 성공했음을 알 수 있음

> 인증실패 이벤트

- AuthenticationFailureBadCredentialsEvent
	- BadCredentialsException 발생통지
- AuthenticationFailureDisableEvent
	- DisabledException 발생통지
- AuthenticationFailureLockedEvent
	- LockedException 발생통지
- AuthenticationFailureExpiredEvent
	- AccountExpiredException 발생통지
- AuthenticationFailureCredentialsExpiredEvent
	- CredentialsExpiredException 발생통지
- AuthenticationFailureServiceExceptionEvent
	- AuthenticationServiceException 발생통지

> 이벤트 리스너 작성

```java
@Component
public class AuthticationEventListeners {

    private static final Logger log = LoggerFactory.getLogger(AuthticationEventListeners.class);

    @EventListener
    public void handleBadCredentials(AuthenticationFailureBadCredentialsEvent event) {
        log.info("Bad credentials is detected. username : {}", event.getAuthentication().getName());
    }
}
```

- @EventListener
- 메서드의 인수에 처리하고 싶은 인증이벤트 클래스를 지정

### 로그아웃

> 처리과정

- 클라이언트는 로그아웃을 처리하는 경로로 요청을 보냄
- LogoutFilter는 LogoutHandler() 호출해서 로그아웃 처리
- LogoutFilter는 LogoutSuccessHandler() 호출해서 화면을 이동
	- 대부분 구현이 되있어 직접구현할 필요가 없음

> 구현클래스

- SecurityContextLogoutHandler
	- 인증정보를 제거하고 세션을 파기
- CookieClearingLogoutHandler
	- 지정한 쿠기를 삭제하기 위한 응답
- CsrfLogoutHandler
	- CSRF 방지용 토큰 파기

```java
@Override
	protected void configure(HttpSecurity http) throws Exception {
			// ..

			// == 로그아웃 ==
			http.logout()
							.permitAll();
	}
```

- logout() 호출시에 로그아웃 기능이 활성화 LogoutConfigurer 인터페이스 반환
- LogoutConfigurer에 로그아웃용 컴포넌트를 커스텀하기 위한 메서드 제공
- permitAll() 호출해서 익명 사용자를 포함한 모든 사용자가 로그아웃과 로그아웃 후에 이동할 경로에 대해 접근 가능

> 기본동작방식

```html
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<html>
<body>
<form action="<c:url value='/logout' />" method="post">
    <sec:csrfInput />
    <button>로그아웃</button>
</form>
</body>
</html>
```

- CSRF 방지용 토큰값을 요청파라미터에 포함

> 기본동작 커스텀

```html

```

#### 로그아웃 성공시 응답

- AuthenticationFailureHandler 구현클래스
	- SimpleUrlLogoutSuccessHandler
		- 지정한 URL(defaultTargetUrl)로 리다이렉트
	- HttpStatusReturningLogoutSuccessHandler
		- 지정한 HTTP 상태로 응답

> 기본동작방식

- 기본구현에선 로그인폼을 표시하는 경로에 'logout'이라는 쿼리 파라미터가 붙은 URL로 리다이렉트

> 기본동작방식 거스텀

```java
@Override
protected void configure(HttpSecurity http) throws Exception {
	// ..

	// == 로그아웃 ==
	http.logout()
					.logoutUrl("/auth/logout")
					.logoutSuccessUrl("/logoutSuccess")
					.permitAll();
}
```

### 인증정보 접근

- 기본구현에서는 세션에 저장
- 인증정보는 요청마다 SecurityContextPersistenceFilter 클래스에 의해 SecurityContextHolder라는 클래스에 저장
	- 같은 스레드라면 소스코드의 어디서든 인증정보 접근 가능

> 자바코드에서 접근

```java
Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

String userUuid = null;
if(authentication.getPrincipal() instanceof AccountUserDetails) {
	AccountUserDetails userDetails = AccountUserDetails.class.cast(authentication.getPrincipal());
	userUuid = userDetails.getAccount().getUserUuid();
}
```

- SecurityContextHolder 에서 인증정보(Authentication객체)를 가져옴
- getPrincipal() 호출해서 UserDetails 객체를 가져옴
	- 인증되지 않은 경우 (익명사용자) 에는 익명 사용자임을 나타내는 문자열이 반환
- UserDetails 에서 처리에 필요한 정보를 가져옴
	- 예제에선 사용자를 고유하게 식별하기 위한 값 UUID를 가져옴

> JSP에서 접근

```html
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
반갑습니다.
<sec:authentication property="principal.account.lastName" />
님.
```

- \<sec:authentication>
	- 스프링 시큐리티에서 제공
	- 인증정보(Authentication 객체)를 가져옴
	- property 속성에 접근하고 싶은 프로퍼티 경로를 지정
	- 중첩된 객체에 접근할 때는 프로퍼티명을 '.'으로 연결

### 인증처리 & 스프링 MVC 연계

- AuthenticationPrincipalArgmentResolver
	- 인증정보(UserDetails)를 스프링 MVC 컨트롤러 메서드에 전달
	- 컨트롤러의 메서드 파라미터로 UserDetails 인터페이스나 그 구현 클래스의 인스턴스를 받음

```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

}
```

- @EnableWebSecurity를 붙여주면 자동으로 적용

> 인증정보 (UserDetails) 를 사용하는 메서드 구현

```java
@RequestMapping(method = RequestMethod.GET)
public String view(
			 @AuthenticationPrincipal AccountUserDetails userDetails,
			 Model model) {
	 model.addAttribute(userDetails.getAccount());
	 return "profile";
}
```

### 오류메세지

> 오류메시지 변경(messages.properties)

```
AbstactUserDetailsAuthenticationProvider.badCredentials = 입력한 인증 정보에 오류가 있습니다.
AbstactUserDetailsAuthenticationProvider.credentialsExpired = 인증 정보의 이용 기간이 만료됐습니다.
AbstactUserDetailsAuthenticationProvider.disabled = 잘못된 계정입니다.
AbstactUserDetailsAuthenticationProvider.expired = 계정 이용 기간이 만료됐습니다.
AbstactUserDetailsAuthenticationProvider.locked = 게정이 잠겨 있습니다.
```

> 시스템 오류가 발생할 때는 메시지

- InternalAuthenticationServiceException
	- 화면에 그대로 표시하는 것은 바람직하지 않음
	- ExceptionMappingAuthenticationFailureHandler or DelegatingAuthenticationFailureHandler를 사용
		- 이동활 화면을 시스템 오류 화면으로 설정

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
