
<div class="pull-right">  업데이트 :: 2018.08.15 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [뷰 선택](#뷰-선택)
* [템플릿 기반 뷰](#템플릿-기반-뷰)
* [ViewResolver 빈정의](#viewresolver-빈정의)

<!-- /code_chunk_output -->

### 뷰 선택

- 뷰는 Model에 저장된 자바객체를 참조 클라이언트에 반환할 응답데이터를 만드는 컴포넌트
  - org.springframework.web.servlet.View (인터페이스)
  - org.springframework.web.servlet.ViewResolver (구현클래스)

### 템플릿 기반 뷰

> 템블릿 기반 View 클래스

- InternalResourceView
  - JSP
- JstlView
  - JSP + JSTL
- TilesView
  - Apache Tiles (레이아웃엔진)
  - JSP (템플릿엔진)
- FreeMarkerView
  - FreeMarker
- GroovyMarkupView
  - Groovy Markup Template Engine
- ScriptTemplateView
  - JSR 223 script engine
  - Handlebars.js, Mustache.js, React.js, EJS 등등

> 템플릿 기반 ViewResolver 클래스

- InternalResourceViewResolver
  - JSP
- TilesViewResolver
  - Apache Tiles (레이아웃엔진)
  - JSP (템플릿엔진)
- FreeMarkerViewResolver
  - FreeMarkerView
- GroovyMarkupViewResolver
  - Groovy Markup Template Engine
- ScriptTemplateViewResolver
  - JSR 223 script engine
  - Handlebars.js, Mustache.js, React.js, EJS 등등


### ViewResolver 빈정의

- 최근 주목받는 것은 타임리프(Thymeleaf)
- 스프링부프에서는 JSP사용을 권장하지 않고, 타임리프와 같은 서블릿컨테이너에 의존하지 않는 템플릿 엔진을 사용하길 권장

```java
@Override
public void configureViewResolvers(ViewResolverRegistry registry) {
  registry.jsp();
}
```

- configureViewResolvers() 오버라이드
- ViewResolverRegistry의 jsp() 호출
  - InternalResourceViewResolver가 생성
    - prefix 프로퍼티에 '/WEB-INF/'
    - suffix 프로퍼티에 '.jsp'

```xml
<mvc:view-resolvers>
  <mvc:jsp/>
</mvc:view-resolvers>
```

- JSP의 파일 저장위치 변경시에 InternalResourceViewResolver의 prefix 프로퍼티값을 변경

```java
@Override
public void configureViewResolvers(ViewResolverRegistry registry) {
  registry.jsp().prefix("/WEB-INF/views/");
}
```



---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
