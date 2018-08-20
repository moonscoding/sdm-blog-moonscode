
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [빈 설정분할](#빈-설정분할)
* [자바기반 설정분할](#자바기반-설정분할)
* [Xml기반 설정분할](#xml기반-설정분할)

<!-- /code_chunk_output -->

### 빈 설정분할

DI 컨테이너에서 관리하는 빈이 많아질수록 관리가 어려움

빈 설정범위를 명확히 하고 가독성을 높이기 위해 목적에 맞게 분할하는 것이 좋음

### 자바기반 설정분할

> @Import를 사용해서 분할된 설정을 병합
```java
@Configuration
@Import({DomainConfig.class, InfrastructureConfig.class})
public class AppConfig {
  // DomainConfig.class와 InfrastructureConfig.class에 정의한 빈을 주입할 수 있음
}
```

> 분할된 클래스 (1)
```java
@Configuration
public class DomainConfig {
  @Bean
  UserService userService() {

  }
}  
```

> 분할된 클래스 (2)
```java
@Configuration
public class InfrastructureConfig {
  @Bean
  DataSource dataSource() {

  }
}
```

### Xml기반 설정분할

> app-config.xml -  \<import>를 사용해서 분할된 설정파일 병합
```xml
<beans>
  <import resource="classpath:conf/domain-config.xml" />
  <import resource="classpath:conf/infra-config.xml" />
</beans>
```

> domain-config.xml
```xml
<beans>
  <bean id="userService" class="..." />
</beans>
```

> infra-config.xml
```xml
<beans>
  <bean id="dataSource" class="..." />
</beans>
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
