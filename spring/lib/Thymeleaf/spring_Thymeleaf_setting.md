
<div class="pull-right">  업데이트 :: 2018.08.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [의존성 라이브러리](#의존성-라이브러리)
* [스프링과 타임리프 연계](#스프링과-타임리프-연계)

<!-- /code_chunk_output -->

### 의존성 라이브러리

> pom.xml

```xml
<dependency>
  <groupId>org.thymeleaf</groupId>
  <artifactId>thymeleaf-spring4</artifactId>
</dependency>
```

### 스프링과 타임리프 연계

```java
@Configuration
public class ThymeleafConfig {

    @Bean
    public ServletContextTemplateResolver templateResolver() {
        ServletContextTemplateResolver resolver = new ServletContextTemplateResolver();
        resolver.setPrefix("/WEB-INF/templates");
        resolver.setSuffix(".html");
        resolver.setTemplateMode("HTML5");
        resolver.setCharacterEncoding("UTF-8");
        return resolver;
    }

    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setTemplateResolver(templateResolver());
        return engine;
    }

    @Bean
    public ThymeleafViewResolver thymeleafViewResolver() {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine());
        resolver.setCharacterEncoding("UTF-8");
        resolver.setOrder(1);
        return resolver;
    }
}
```

- ServletContextTemplateResolver
  - 서블릿 컨테이너의 리소스에서 템플릿을 읽어들임
  - 템플릿이 위치한 장소에 따라 TemplateResolver를 바꿀 수 있음
  - 스프링이 관리하는 리소스에서 템플릿을 가져오기 위해 SpringResourceTemplateResolver를 선택가능
- SpringTemplateEngine
  - 템플릿이 스프링 MVC와 연계
- ThymeleafViewResolver
  - 스프링 MVC의 뷰를 결정하는 ViewResolver의 구현체를 타임리프가 확장한 ThymeleafViewResolver로 대체
  - 뷰 랜더링에서 사용하는 템플릿엔진으로 정의한빈을 설정
  - 출력데이터의 문자인코딩과 ViewResolver의 우선순의 설정
  - 스프링 MVC는 빈으로 정의된 ViewResolver를 자동으로 인식, 빈 정의 만으로 스프링 MVC에 적용

```java
@Configuration
@EnableWebMvc
@ComponentScan("com.example.app")
@Import(ThymeleafConfig.class)
public class WebMvcConfig extends WebMvcConfigurerAdapter {

}
```

- @Import
  - 설정클래스를 임포스
  - JSP와 병용할 수도 있지만 우선순위로 타임리프의 뷰가 우선처리


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
