
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [ApplicationContext & Bean](#applicationcontext-bean)
	* [ApplicationContext 가져오기](#applicationcontext-가져오기)
	* [Bean 가져오기](#bean-가져오기)
* [AppConfig](#appconfig)
	* [Java기반](#java기반)
	* [XML 기반](#xml-기반)
	* [Annotation 기반](#annotation-기반)
	* [컴포넌트 스캔](#컴포넌트-스캔)
	* [명시적 이름주기](#명시적-이름주기)

<!-- /code_chunk_output -->

### ApplicationContext & Bean

> ApplicationContext & Bean을 설정하는 방법들

- 자바기반 설정방식
- XML기반 설정방식
- Anotation기반 설정방식

#### ApplicationContext 가져오기

```java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
ApplicationContext context = new AnnotationConfigApplicationContext("com.example.app");
ApplicationContext context = new ClassPathXmlAppplicationContext("META-INF/spring/applicationContext.xml");
ApplicationContext context = new FileSystemXmlApplication("./spring/applicationContext.xml");
```

- ApplicationContext를 사용하는 경우
  - 단독 애플리케이션에 스프링프레임워크를 사용할때
  - JUnit으로 만든 테스트 케이스 안에서 스프링프레임워크를 구동할때
- Web 환경에서는 WebApplicationContext를 사용

#### Bean 가져오기

```java
UserService userService = context.getBean(UserService.class);
UserService userService = context.getBean("userService", UserService.class);
UserService userService = (UserService) context.getBean(userService);
```

> 예제

```java
ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
UserService UserService = context.getBean(UserService.class); // lookup
```

- ApplicationContext는 DI 컨테이너 역할
- AppConfig는 DI 컨테이너에서 설정파일역할 ( = java configuration class )

### AppConfig

#### Java기반

```java
@Configuration
public class AppConfig {

  @Bean
  UserRepository userRepository() {
    return new UserRepository();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new PasswordEncoder();
  }

  @Bean
  UserService UserService() {
    return new UserServiceImpl(userRepository(), passwordEncoder());
  }
}
```

- @Configuration & @Bean 애너테이션을 사용
- Bean이란
	- DI 컨테이너에 등록하는 컴포넌트
- Lookup이란
	- DI 컨테이너에서 Bean을 찾아오는 행위

#### XML 기반

```xml
<beans
  주소생략>
  <bean id="userRepository" class="com.example.demo.UserRepositoryImpl" />
  <bean id="passwordEncoder" class="com.example.demo.BCryptPasswordEncoder" />
  <bean id="userService" class="com.example.demo.UserServiceImpl">
    <constructor-arg ref="userRepository" />
    <constructor-arg ref="passwordEncoder" />
  </bean>
</beans>
```

- 자바기반 설정방식과 Annotation기반 설정방식을 조합해서 사용하는 것이 일반적
- 만약 주입대상이 다른 빈이 아니라, 특정값일 경우 'ref'대신 'value'를 사용

#### Annotation 기반

- Bean 설정파일에 정의하는 대신 Beam을 정의하는 Annotation을 Bean의 클래스에 부여
- Annotation이 붙은 클래스를 탐색해서 DI 컨테이너에 ==자동등록== ( = 컴포넌트 스캔 )
- 명시적으로 설정하는 것이 아닌 자동으로 의존 컴포넌트를 주입 ( = 오토 와이어링 )

```java
@Component // DI 컨테이너에 자동등록
public class UserRepositoryImpl implements UserRepository {
  // do something
}
```

```java
@Component // DI 컨테이너에 자동등록
public class BCryptPasswordEncoder implements PasswordEncoder {
  // do something
}
```

```java
@Component // DI 컨테이너에 자동등록
public class UserServiceImpl implements UserService {
	// 자동으로 의존성주입
  @Autowired
  public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    // do something
  }
}
```

#### 컴포넌트 스캔

- 컴포넌트 스캔을 수행할때 스캔할 범위를 지정
- full scan을 하지 않아도 되기 때문에 성능향상

> 자바에서 컴포넌트 스캔범위 주기
```java
@Configuration
@Component("com.example.demo")
public class AppConfig {

}
```

> Xml에서 컴포넌트 스캔범위 주기
```xml
<beans>
  <context:component-scan base-package="com.example.demo" />
</beans>
```

#### 명시적 이름주기

- 기본 빈의 이름은 첫글자가 소문자로 바뀌는 형태 (CamelCase)
- 명시적으로 바꾸려면 다음과 같은 방식을 사용

```java
@Component("userService") // origin - userServiceImpl
public class UserServiceImpl implements UserService {
  // do something
}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
