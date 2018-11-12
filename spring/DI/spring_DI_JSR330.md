
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JSR 330](#jsr-330)
* [활용](#활용)
* [스프링과 JSR 330](#스프링과-jsr-330)

<!-- /code_chunk_output -->

### JSR 330

자바 표준 사양중 DI와 관련한 JSR 330 (Dependency Injection for Java)

> pom.xml (maven)
```xml
<dependency>
  <groupId>javax.inject</groupId>
  <arttifactId>javax.inject</arttifactId>
</dependency>
```

### 활용

```java
@Named
public class UserServiceImpl implements UserService {
  @Inject
  public class UserServiceImpl (UserService UserService, PasswordEncoder passwordEncoder) {

  }
}
```

### 스프링과 JSR 330

- @Autowired // @Inject
  - @Inject에는 필수 체크 속성 require가 없음
- @Component // @Named
  - 스프링과 다르게 JSR 330에선 prototype이 기본
- @Qualifier // @Named
  - @Named는 @Component @Qualifier기능을 겸함
- @Scope // @Scope
  - ...


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
