
<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Locale 결정](#locale-결정)
* [Locale 활용](#locale-활용)
* [UI를 이용한 Locale 전환](#ui를-이용한-locale-전환)
* [LocaleChangeInterceptor 빈정의](#localechangeinterceptor-빈정의)
* [Locale 전환용 화면요소](#locale-전환용-화면요소)

<!-- /code_chunk_output -->

### Locale 결정

- org.springframework.web.servlet.LocaleResolver 인터페이스
  - 스프링 MVC는 Locale정보를 어디서 가져오느냐에 따라 다른 구현 클래스르 가짐

> 구현클래스

- AcceptHeaderLocaleResolver
  - HTTP 요청의 Accept-Language 헤더에 설정된 Locale 정보를 활용
  - Locale을 변경하고 싶다면 사용자가 브라우저의 언어 설정을 바꾸 수 있음
- SessionLocaleResolver
  - HTTP 세션에 저장된 Locale 정보를 활용
  - Locale 변경은 LocaleChangeInterceptor에서 처리
- CookieLocaleResolver
  - 쿠키에 저장된 Locale정보를 활용
  - Locale 변경은 LocaleChangeInterceptor에서 처리
- FixedLocaleResolver
  - JVM이나 OS의 Locale 정보나 애플리케이션에서 설정한 Locale 정보를 활용
  - 애플리케이션에서 Locale을 고정해서 사용하고 싶을 때

### Locale 활용

- MessageSource 인터페이스
  - 화면에 표시되는 라벨이나 메시지의 표시할 문자열을 가져옴
  - JSP를 뷰로 사용하는 경우에 \<spring:message> 같은 태그 라이브러리로 문자열을 표시
  - 이 때 사용할 Locale은 LocaleResolver가 결정

> JSP 구현의 예

```html
<spring:message code="title.home" />
```

> 핸들러 메서드에서 Locale에 의존하는 처리가 필요할때

```java
@RequestMapping(path="make", params="scope=daily")
public String makeDailyResort(Locale locale) {
  // Locale에 의존하는 처리
  return "report/complete";
}
```

- 핸들러 매서드 이외의 곳에서 Locale에 의존하는 처리가 필요할 시
  - org.springframework.web.servlet.support.RequestContextUtils의 getLocale(HttpServletRequest) 사용

### UI를 이용한 Locale 전환

- org.springframework.web.servlet.i18n.LocaleChangeInterceptor

```java
@Bean
public LocaleResolver localeResolver() {
  CookieLocaleResolver resolver = new CookieLocaleResolver();
  resolver.setCookieName("locale");
  resolver.setDefaultLocale(Locale.KOREA);
  return resolver;
}
```

- CookieLocaleResolver를 localeResolver라는 이름의 빈으로 정의
- setCookieName()
  - cookieNmae 프로퍼티에 Locale을 저장하기 위해 쿠키명 설정
  - 따로 설정하지 않으면 스프링을 사용하는 것을 유추할 수 있는 이름이 나오기 떄문에 설정하는 것을 권장
- setDefaultLocale()
  - 기본 Locale을 지정

### LocaleChangeInterceptor 빈정의

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {
  @Override
   public void addInterceptors(InterceptorRegistry registry) {
       registry.addInterceptor(new LocaleChangeInterceptor())
        .includePathPatterns("/**")
        .excludePathPatterns("/resource/**")
        .excludePathPatterns("/**/.html");
   }
}
```

- addInterceptors() 재정의
- LocaleChangeInterceptor를 스프링 MVC가 인식하도록 설정
- 이때, Locale을 지정하기 위한 요청 파라미터 이름으 기본값은 "locale"

### Locale 전환용 화면요소

```html
<a href="?locale=en">English</a>
<a href="?locale=ko">Korean</a>
```

- 요청 파라미터로 Locale을 설정하기 위해 요청 파라미터 ("locale")을 지정

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
