<div class="pull-right"> 업데이트 :: 2018.11.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[Spring Boot](#spring-boot)
-	[Spring](#spring)

<!-- /code_chunk_output -->

### Spring Boot 에서

-	application.properties / application.yaml 파일에 설정값을 추가하면 Bean 자동생성

### Spring 에서

-	직접 Bean 설정필요

```java
@Bean(initMethod = "migrate")
public Flyway globalFlyway() {
  return Flyway
              .configure()
              .dataSource(url, id, pw)
              .locations(locations)
              .load();
}
```

```java
Flyway flyway = Flyway
  .configure()
  .dataSource(url, id, pw)
  .locations(locations)
  .load();
flyway.migrate();
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
