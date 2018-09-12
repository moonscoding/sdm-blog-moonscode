
<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [공통처리](#공통처리)
* [서블릿 필터 이용](#서블릿-필터-이용)
* [DI 컨테이너에서 관리되는 빈 인젝션](#di-컨테이너에서-관리되는-빈-인젝션)
* [스프링에서 제공하는 서블릿 필터](#스프링에서-제공하는-서블릿-필터)
* [HandlerInterceptor](#handlerinterceptor)
* [@ContollerAdvice](#contolleradvice)
* [HandlerMethodArgumentResolver](#handlermethodargumentresolver)

<!-- /code_chunk_output -->

### 공통처리

- 컨트롤러 핸들러 메서드 호출 전후에 공통 처리 실행 방법

### 서블릿 필터 이용

- 스프링 MVC(DispatcherServlet) 호출 전후에 공통된 처리
  - javax.servlet.Filter 인터페이스

> 서블릿필터 지원클래스

- GenericFilterBean
  - 서블릿 필터의 초기화 파라미터를 서블릿 필터 클래스의 프로퍼티에 바인드하는 기반 클래스
- OncePerRequestFilter
  - 같은 요청에 대해서 단 한번만 처리가 수행되는 것을 보장하는 기반 클래스
  - GenericFilterBean를 상속하고 있으며, 스프링제공 서블릿 필터는 이 클래스를 상속받음

> SLF4J의 MDC에 클라이언트의 원격 주소를 설정하는 서블릿 필터의 구현

```java
public class ClientInfoMdcPutFilter extends OncePerRequestFilter {
  private static final String FORWARDED_FOR_HEADER_NAME = "X-Forwarded-For";
  private String mdcKey = FORWARDED_FOR_HEADER_NAME;

  public String getMdcKey() {
    return mdcKey;
  }

  public void setMdcKey (String mdcKey) {
    this.mdcKey = mdcKey;
  }

  protected final void doFilterInternal(
    HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain) throws ServletException, IOException {
        String remoteIp = Optional
          .ofNullable(request.getHeader(FORWARDED_FOR_HEADER_NAME))
          .orElse(request.getRemoteAddr());
        MDC.put(mdcKey, remoteIp);
        try {
          filterChain.doFilter(request, response);
        } finally {
          MDC.remove(mdcKey);
        }
  }
}
```
- MDC 키를 담을 프로퍼티를 정의
- 서블릿 필터의 초기화 파라미터를 덮어씀
- 공통 처리는 doFilterInternal()에 구현

> 작성한 서블릿 필터 클래스를 서블릿 컨테이너에 등록 (web.xml)

```xml
<filter>
    <filter-name>clientInfoPutFilter</filter-name>
    <filter-class>example.ClientInfoMdcPutFilter</filter-class>
    <init-param>
        <param-name>mdcKey</param-name>
        <param-value>remoteIp</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>clientInfoPutFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

- 서블릿 필터의 초기화 파라미터를 사용해 MDC 키를 커스터마이징
- 파라미터명은 서블릿 필터 클래스의 프로퍼티명과 일치
  - 예에서는 remoteIp를 MDC 키로 설정

### DI 컨테이너에서 관리되는 빈 인젝션

- 서블릿 필터에서 DI 컨테이너에서 관리되는 빈을 이용시에
  - 서블릿 필터를 DI 컨테이너에 등록
  - DelegatingFilterProxy를 통해 서블릿 필터가 동작하게 만듬
    - DelegatingFilterProxy는 DI 컨테이너에 등록된 서블릿 필터에 처리를 위임하는 서블릿 필터 클래스

  ```java
  @Component
  public class ClientInfoMdcPutFilter extends OncePerRequestFilter {
    @Autowired
    MessageSource messageSource;
    // do something
  }
  ```

  ```xml
  <filter>
    <filter-name>clientInfoPutFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
  </filter>
  ```

- 서블릿 필터를 DI 컨테이너에 등록
- 이용할 빈을 인잭션
- 서블릿 필터의 이름은 DI 컨테이너에 등록한 서블릿 필터의 빈 이름을 지점
  - 기본으로 서블릿 필터 이름과 일치하는 빈에 처리를 위임
  - 위임 대상이 되는 빈을 DelegatingFilterProxy의 targetBeanName 프로퍼티로 지정가능

### 스프링에서 제공하는 서블릿 필터

- CorsFilter
  - CORS 연계용 클래스
- HttpPutFormContentFilter
  - HTML 폼으로부터 요청(application/x-www-form-urlencoded)에서 PUT과 PATCH 메서드를 사용하기 위한 클래스
- HiddenHttpMethodFilter
  - TODO
- CharacterEncodingFilter
  - TODO
- RequestContextFilter
  - TODO
- ResourceUrlEncodingFilter
  - TODO
- MultipartFilter
  - TODO
- ShallowEtagHeaderFilter
  - TODO
- ServletContextRequestLoggingFilter
  - TODO
- CommonRequestLoggingFilter
  - TODO

### HandlerInterceptor

- 컨트롤러에서 처리되는 내용중 공통으로 처리하고 싶은 내용이 있을때
  - HandlerInterceptor 인터페이스 활용

> 메서드

- preHandle
  - 컨트롤러의 핸들러 메서드를 실행하기전에 호출
  - 핸들러 메서드가 호출되지 않게 하고 싶을 때 메서드 반환값으로 false
- postHandle
  - 컨트롤러의 핸들러 메서드가 정상적으로 종료된 후에 호출
  - 핸들러 메서드에서 예외가 발생하면 호출 안됨
- afterHandle
  - 컨트롤러의 핸들러 메서드의 처리가 종료된 후에 호출
  - 예외가 발생해도 호출

> HandlerInterceptor 구현

```java
public class SuccessLoggingInterceptor extends HandlerInterceptorAdapter {
  private static final Logger logger = LoggerFactory.getLogger(SuccessLoggingInterceptor.class);

  @Override
  public void postHandle(
    HttpServletRequest request,
    HttpServletResponse response,
    Object handler,
    ModelAndView modelAndView) {
        if(handler.isInfoEnabled()) {
          HandlerMethod handlerMethod = (HandlerMethod) handler;
          Method method = ((HandlerMethod) handler).getMethod();
          logger.info(
            "[SUCCESS CONTROLLER] {}.{}"),
            method.getDeclaringClass().getSimpleName(),
            method.getName()
          );
        }
  }
}
```

- HandlerInterceptorAdapter를 상속받아 구현클래스 생성
- 정상적인 종료후에 공통처리를 우해 postHandle() 재정의

> MVC에서 사용하도록 등록

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new SuccessLoggingInterceptor())
      .includePathPatterns("/**") // 적용대상경로
      .excludePathPatterns("/resource/**") // 제외경로
  }
}
```

### @ContollerAdvice

- 컨트롤러 클래스에 핸들러 메서드와 별도로 컬트롤러 전용의 특수한 메서드를 구현 할 수 있음
  - @InitBinder
  - @ModelAttribute
  - @ExceptionHandler
- 다음과 같은 메서드를 공유하려면 @ControllerAdvice를 붙인 클래스를 만들어야함


> @ControllerAdvice

```java
@ControllerAdvice
public class GlobalExceptionHandler {
  private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  @ExceptionHandler
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public String handleSystemException(Exception e) {
    logger.error("System Error occured.", e);
    return "error/system";
  }
}
```

- 클래스레벨에 @ControllerAdvice를 부여
  - 모든 컨트롤러에 적요할 때는 애너테이션 속성을 지정하지 않아도 가능

> @ControllerAdvice 속성

- basePackages : 지정한 패키지에 속한 컨트롤러에 대해 공통처리
- value : basePackages와 같음
- basePackagesClasses : 지정한 클래스나 인터페이스가 저장된 패키지에 속한 컨트롤러에 대해 공통처리
- annotations : 지정한 애너테이션이 붙은 컨트롤러에 공통처리
- assignableTypes :  지정한 클래스나 인터페이스로 할당가능한 컨트롤러에 대해 공통처리

### HandlerMethodArgumentResolver

- 컨트롤러의 핸들러 메서드 매개변수에 스프링 MVC가 지원하지 않는 독자적인 타입을 사용하고 싶을떄
  - HandlerMethodArgumentResolver

> 공통항목을 가지고 있는 자바빈즈

```java
public class CommonRequestData {
  private String userAgent;
  private String sessionId;
}
```

> HandlerMethodArgumentResolver 구현

```java
public class CommonRequestDataMethodArgumentResolver implements HandlerMethodArgumentResolver {

  @Override
  public boolean supportsParameter(MethodParameter parameter) {
    return CommonRequestData.class.isAssignableFrom(parameter.getParameterType());
  }

  @Override
  public Object resolveArgument(
    MethodParameter parameter,
    ModelAndViewContainer mavContainer,
    NativeWebRequest webRequest,
    WebDataBinderFactory binderFactory) throws Exception {
        HttpSession session = webRequest.getNativeRequest(HttpServletRequest.class).getSession(false);

        String userAgent = webRequest.getHeader(HttpHeaders.USER_AGENT);
        String sessionId = Optional.ofNullable(session).map(HttpSession::getId).orElse(null);

        CommonRequestData commonRequestData = new CommonRequestData();
        commonRequestData.setUserAgent(userAgent);
        commonRequestData.setSessionId(sessionId);
        return commonRequestData;
  }
}
```

- supportsParameter()
  - 처리가능한 인수 타입인지 판단
  - 이 메서드에서 true를 반환하면 resolveArgument() 호출
- resolveArgument()
  - 핸들러의 메서드 매개변수에 전달할 객체를 생성

> 핸들러 메서드 매개변수 등록

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {
  @Override
  public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
    argumentResolvers.add(new CommonRequestDataMethodArgumentResolver());
  }
}
```

>  핸들러 메서드 구현

```java
@RequestMapping("/")
public String home(CommonRequestData commonRequestData) {
  System.out.println("userAgent : " + commonRequestData.getUserAgent());
  System.out.println("sessionId : " + commonRequestData.getSessionId());
  return "home";
}
```

> 기본적인 타입을 핸들러 메서드의 반환값으로 받고 싶을때

- HandlerMethodReturnValueHandler 인터페이스 사용


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
