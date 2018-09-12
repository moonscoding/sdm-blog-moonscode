
<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [정적리소스](#정적리소스)
* [기본서블릿과 DispatcherServlet의 공존](#기본서블릿과-dispatcherservlet의-공존)
* [스프링 MVC 리소스 취급방법](#스프링-mvc-리소스-취급방법)
* [캐시제어](#캐시제어)
* [ResourceResolver & ResoureceTransformer](#resourceresolver-resourecetransformer)

<!-- /code_chunk_output -->

### 정적리소스

- maven
- gradle
  - src/main/webapp

> JavaEE를 준수하는 웹 애플리케이션에서 정적리소스

- http://localhost:8080/context-path/static/css/app.css

```
/src
  /main
    /webapp
      /static
        /html
        /css
        /js
```

### 기본서블릿과 DispatcherServlet의 공존

- 서블릿 사양에서 루트 경로(/)에 매핑되는 서블릿을 기본 서블릿
  - 기본 서블릿을 통해 웹 애플리케이션의 문서 루트 이하의 파일에 접근 할 수 있음
  - DispatcherServlet을 루트경로에 매핑하면 웹 애플리케이션의 문서 루트 이하의 파일에 접근 불가
  - DispatcherServlet이 받은 요청을 기본 서블릿에 전송

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {
  @Override
   public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
       configurer.enable();
   }
}
```

### 스프링 MVC 리소스 취급방법

- ResourceHttpRequestHandler 클래스
  - 정적리소스를 저장해둔 임의의 디렉터리에 대해 파일접근이나 HTTP 캐시를 손쉽게 처리
  - 요청된 경로와 물리적인 저장 경로를 매핑하는 역할
  - 리소스의 저장 경로에 클래스패스의 디렉터리나 문서 루트 디렉터리 혹은 임의의 디렉터리 지정가능

> 임의의 디렉터리에 저장된 파일에 접근

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {}
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
          .addResourceLocations("classpath:/static/");
    }
}
```

### 캐시제어

> HTTP 캐시 제어

- HTTP 캐시를 제어하는 기능
  - If-Modified-Since 해더값과 리소스의 최종 수정 일시를 비교
    - 만약 리소스가 갱신되지 않았으면 HTTP 304상태 (Not Modified) 반환
  - 기본구현에서는 캐시의 유효기간이 설정되지 않아 캐시에 대한 동작은 브라우저 사양에 의존

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/static/**")
      .addResourceLocations("classpath:/static/")
      .setCachePeriod(604800); // 유효기간을 초단위로 지정 (604800 = 7일)
}
```

> 캐시를 세밀하게 제어할 때 (CacheControl클래스 이용)

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/static/**")
      .addResourceLocations("classpath:/static/")
      .setCacheControl(CacheControl.maxAge(7, TimeUnit.DAYS).cachePublic());
}
```

### ResourceResolver & ResoureceTransformer

- ResourceHttpRequestHandler
  - 정적리소스에 접근하는 다양한 방법을 제공
  - 버전 정보가 포함된 경로로 정적리소스를 접근하는 방법
  - Gzip으로 압축된 정적 리소스에 접근하는 방법
  - Webjars로 관리되는 정적 리소스에 대해 버전 번호를 은폐시켜 접근하는 방법

> 종류

- ResourceResolver 인터페이스
  - 정적리소스에 접근할 수 있도록 URL과 서버 상의 물리적인 정적 리소스를 매핑
  - 구현클래스
    - VersionResourceResolver
      - 버전정보를 포함한 URL 경로와 서버 상의 물리적인 정적 리소스를 매핑
      - 버저닝 방법으로 콘텐츠 데이터의 MD5 해시값을 사용하는 방법과 특정 버전 정보를 명시하는 방법을 지원
    - GzipResourceResolver
      - URL에 대응하는 정적리소스 gzip파일(.gz)을 사용
    - WebJarsResourceResolver
      - WebJars의 URL에서 버전부분을 은폐하는 역할
- ResoureceTransformer 인터페이스
  - 정적 리소스의 콘텐츠 데이터를 변환하는 역할
  - 구현클래스
    - CssLinkResourceTransformer
      - CSS파일의 경로를 URL로 변환
    - AppCacheManifestTransformer
      - HTML5의 AppCache manifest 파일 경로를 URL로 변환
      - manifest 파일의 주석에 콘텐츠 해시값을 추가

> 버전정보를 포함한 경로로 정적 리소스 접근

```java
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/static/**")
      .addResourceLocations("classpath:/static/")
      .resourceChain(true)
      .addResolver((new VersionResourceResolver()).addContentVersionStrategy("/**"));
}
```

- ResourceResolver & ResoureceTransformer의 실행 결과를 캐시할지 결정
  - 캐시하고 싶다면 true 지정
  - 만약 변경이 자주 발생하는 로컬 개발이라면 false로 설정
- VersionResourceResolver를 추가
  - addContentVersionStrategy()로 버저닝을 적용할 리소스 패턴을 설정
  - 예제는 "/static/" 하위의 모든 리소스에 적용
  - VersionResourceResolver를 추가시에 CssLinkResourceTransformer도 자동추가

> 정적리소스에 접근하기위한 경로를 JSP 태그 라이브러리나 타임리프 다이얼렉트등에 사용하게 만든 예 (web.xml)

```xml
<filter>
  <filter-name>ResourceUrlEncodingFilter</filter-name>
  <filter-class>
    org.springframework.web.servlet.resource.ResourceUrlEncodingFilter
  </filter-class>
</filter>
<filter-mapping>
  <filter-name>ResourceUrlEncodingFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```

- 뷰에서 태그 라이브러리를 사용해 정적리소스에 접근할 수 있음

```html
<!-- 뷰(JSP)에서 경로를 설정한 예 -->
<link href="<c:url value='/static/css/app.css' />" type="text/css" rel="stylesheet" />

<!-- 버전정보가 포함된 경로 -->
<link href="/static/css/app-sa67d7cd7d6ddf7c.css" type="text/css" rel="stylesheet" />
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
