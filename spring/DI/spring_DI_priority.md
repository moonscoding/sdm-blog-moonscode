<div class="pull-right"> 업데이트 :: 2018.11.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[Bean 우선순위 지정](#bean-우선순위-지정)

<!-- /code_chunk_output -->

### Bean 우선순위 지정

> 우선생성

```java
@Configuration
class ConfA {

  @Bean(name="hello")
  public Object hello() {
    return this;
  }

}
```

> 나중생성

```java
@Configuration
@DependsOn(value={"hello"})
class ConfB {

  @Bean
  public Object byebye() {
    return this;
  }

}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
