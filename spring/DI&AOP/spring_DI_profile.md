
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [프로파일 (profile)](#프로파일-profile)
* [클래스레벨](#클래스레벨)
* [메서드레벨](#메서드레벨)
* [프로파일 선택](#프로파일-선택)

<!-- /code_chunk_output -->

### 프로파일 (profile)

설정 파일을 특정 환경이나 목적에 맞게 선택적으로 사용할 수 있도록 그룹화

### 클래스레벨

> 자바기반 (@Profile 사용)
```java
@Configuration
@Profile("dev")
public class DevConfig {

}

@Configuration
@Profile("test")
public class TestConfig {

}

@Configuration
@Profile("prod")
public class ProductionConfig {

}
```

> XML 기반 (profile="")
```xml
<beans
  profile="dev">

</beans>
```

> 애너테이션 기반
```java
@Component
@Profile("dev")
public class DummyUserRepository implements UserRepository {

}
```

### 메서드레벨

> 자바기반
```java
@Configuration
public class AppConfig {
    @Bean(name="dataSource")
    @Profile("dev")
    DataSource dataSourceForDev() {

    }

    @Bean(name="dataSource")
    @Profile("test")
    DataSource dataSourceForTest() {

    }

    @Bean(name="dataSource")
    @Profile("prod")
    DataSource dataSourceForDev() {

    }
}
```

- @Profile({"dev", "test"}) 와 같이 여러개의 프로파일도 가능
- @Profile("!prod") 와 같이 하나만 제외하는 것도 가능

> XML기반
```xml
<beans>
  <beans profile="dev">
    <bean id=""/>
  </beans>
  <beans profile="test">
    <bean id=""/>
  </beans>
  <beans profile="prod">
    <bean id=""/>
  </beans>
</beans>
```

### 프로파일 선택


> 자바 명령행 옵션으로 프로파일 지정
```
-Dspring.profiles.active=dev
```

> 환경변수로 처리
```
export SPRING_PROFILES_ACTIVE=dev
```

>web.xml 프로파일
```xml
<context-param>
  <param-name>spring.profiles.active</param-name>
  <param-value>dev</param-name>
</context-param>
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
