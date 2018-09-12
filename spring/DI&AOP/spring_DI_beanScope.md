
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [빈 스코프](#빈-스코프)
	* [스코프 종류](#스코프-종류)
	* [스코프 설정](#스코프-설정)
* [서로 다른 스코프의 빈 주입시 문제점](#서로-다른-스코프의-빈-주입시-문제점)
	* [룩업메소드 인젝션](#룩업메소드-인젝션)
	* [스코프트 프락시](#스코프트-프락시)
* [커스텀 스코프](#커스텀-스코프)

<!-- /code_chunk_output -->

### 빈 스코프

- DI 컨테이너는 빈 간의 의존 관계를 관리할 뿐아니라 빈의 생존 기간도 관리
- 빈의 생성방식을 빈 스코프라고 하며, 개발자는 빈 스코프를 직접 다루지 않아도 됨

#### 스코프 종류

- ==singleton==
  - DI 컨테이너를 기동할 때 빈 인스턴스가 하나 만들어지고, 이후에는 그 인스턴스를 공유하는 방식
  - 기본 스코프이므로 별도 스코프처리를 하지 않았다면 singleton으로 간주
- ==prototype==
  - DI 컨테이너에 빈을 요청할 때마다 새로운 빈 인스턴스가 만들어짐
  - 멀티 스레드 환경에서 오동작이 발생하지 않아야 하는 (thread-safety) 빈이라면 prototype을 활용
- ==request==
  - HTTP 요청이 들어올 때마다 새로운 빈 인스턴스가 만들어짐
  - 웹 애플리케이션을 만들때만 사용
- ==session==
  - HTTP 세션이 만들어질 때마다 새로운 빈 인스턴스가 만들어짐
  - 웹 애플리케이션 만들때만 사용
- ==global session==
  - 포틀릿(portlet)환경에서 글로벌 HTTP 세션이 만들어질 때마다 새로운 빈 인스턴스가 만들어짐
  - 포틀릿을 사용한 웹 애플리케이션에서만 사용
- ==application==
  - 서블릿 컨텍스트(servlet context)가 만들어질 때마다 빈 인스턴스가 만들어짐
  - 웹 애플리케이션을 만들때만 사용
- ==custon==
  - 스코프 이름을 직접 정하고 정의한 규칙에 따라 빈 인스턴스를 만들 수 있음


> 포틀릿이란 ?

- 포틀릿은 재사용이 가능한 웹구성요소로서 포탈 사용자들에게 관련정보를 표시해주는데 사용
- 전자우편, 날씨정보, 토론방, 뉴스등이 있음

#### 스코프 설정

>프로토타입 스코프 타입으로 빈 추가 (자바)
```java
@Bean
@Scope("prototype")
UserService userService() {
  return new UserServiceImpl();
}
```

>프로토타입 스코프 타입으로 빈 추가 (xml)
```xml
<bean id="userService" class="com.example.demo.UserServiceImpl" scope="prototype" />
```

> 프로토타입 스코프 타입으로 빈 추가 (Annotation)
```java
@Component
@Scope("prototype")
public class UserServiceImpl implements UserService {
}
```

> #스턴스는 서로 다름 (prototype)
```java
UserService userServiceA = context.getBean(UserService.class);
UserService userServiceB = context.getBean(UserService.class);
```

### 서로 다른 스코프의 빈 주입시 문제점

웹 애플리케이션 환경이라면 'request < session < singleton' 순으로 생명주기가 길다.

- DI 컨테이너에서는 빈간의 의존관계가 형성

- 하나의 빈이 또 다른 빈에 의존하고 있다면, DI 컨테이너에 의해 주입된 빈은 주입받는 빈의 스코프를 따름

>prototype으로 스레드 안전한 빈
```java
@Bean
@Scope("prototype")
PasswordEncoder passwordEncoder() {
  return new ThreadUnsafePasswordEncoder();
}
```

>prototype인 빈을 singleton으로 가져와 스레드 안전을 해치는 경우
```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  PasswordEncoder passwordEncoder; // prototype -> singleton

  public void register(User user, String rawPassword) {
    String encodedPassword = passwordEncoder.encode(rawPassword);
  }
}
```

#### 룩업메소드 인젝션

>의존관계가 코드상에 남지만 문제를 해결하는 방법
```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  ApplicationContext context;

  public void register(User user, String rawPassword) {
    PasswordEncoder passwordEncoder = passwordEncoder();
    String encodedPassword = passwordEncoder.encode(rawPassword);
  }

  PasswordEncoder passwordEncoder() {
    return this.context.getBean(PasswordEncoder.class); // 필요시마다 새 인스턴스를 가져옴
  }
}
```

>룩업메소드인젝션으로 문제를 해결하는 방법
```java
@Component
public class UserServiceImpl implements UserService {

  public void register(User user, String rawPassword) {
    PasswordEncoder passwordEncoder = passwordEncoder();
    String encodedPassword = passwordEncoder.encode(rawPassword);
  }

  @Lookup
  PasswordEncoder passwordEncoder() {
    return null;  // 반환값은 null이여도 상관 없음
  }
}
```

- DI 컨테이너는 UserServiceImpl클래스의 서브클래스를 동적으로 생성
- DI 컨테이너가 기존 passwordEncoder를 DI 컨테이너가 직접 만든 룩업메서드로 오버라이드
  - @Lookup 메서드는 private, final이면 안됨
  - 매개변수를 가져선 안됨

```xml
<bean id="passwordEncoder" class="com.example.demo.ThreadUnsafePasswordEncoder" scope="prototype" />
<bean id="userService" class="com.example.demo.UserServiceImpl" >
  <loopup-method name="passwordEncoder" bean="passwordEncoder" />
</bean>
```

- 룩업메서드 인젝션은 서로 다른 스코프의 빈을 조합하며 생기는 문제를 해결
- 소스코드에서 직접 DI 컨테이너를 사용하는 것을 방지하는 용도로 활용
- 자바기반의 설정방식에서는 룩업메서드 인젝션을 처리할 수 없음(Override할수없기때문)

#### 스코프트 프락시

- 기존의 빈을 프락시로 감쌈
- 프락시를 다른 빈에 주입
- 주입받은 빈에서 이 프락시의 메서드를 호출
- 프락시 내부적으로 DI 컨테이너에서 빈을 룩업
- 룩업된 빈의 메서드를 실행

>스코프트 프락시 활성화 (자바기반)
```java
@Bean
@Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
PasswordEncoder passwordEncoder() {
  return new ThreadUnsafePasswordEncoder();
}
```

```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  PasswordEncoder passwordEncoder;

  public void register(User user, String rawPassword) {
    PasswordEncoder passwordEncoder = passwordEncoder();
    String encodedPassword = passwordEncoder.encode(rawPassword);
  }
}
```

- 스코프트 프락시가 활성화 된 상태이기 때문에 passwordEncoder에 PasswordEncoder의 프락시 주입
- encode 메소드가 호출될 때 마다 request 스코프의 PasswordEncoder 인스턴스가 만들어짐

> 스코프트 프락시 속성

- ==ScopedProxyMode.INTERFACES==
  - JDK 동적 프락시 (java.lang.reflect.Proxy)를 사용해서 인터페이스 기반 프락시 생성
- ==ScopedProxyMode.TARGET_CLASS==
  - 스프링 프레임워크에 내장된 CGLIB을 사용해 서브클래스 기반의 프락시 생성

> 인터페이스 기반 프락시
```java
public void PasswordEncoderProxy implements PasswordEncoder {
  @Autowired
  ApplicationContext context;

  @Override
  public String encode(String rawPassword) {
    PasswordEncoder passwordEncoder = context.getBean("passwordEncoder", PasswordEncoder.class);
    return passwordEncoder.encode(rawPassword);
  }
}
```

> 서브클래스 기반 프락시
```java
public class PasswordEncoderProxy extends ThreadUnsafePasswordEncoder {
  @Autowired
  ApplicationContext context;

  @Override
  public String encode(String rawPassword) {
    PasswordEncoder passwordEncoder = context.getBean("passwordEncoder", PasswordEncoder.class);
    return passwordEncoder.encode(rawPassword);
  }
}
```

> 애노테이션기반 프락시
```java
@Component
@Scope(value="request", proxyMode=ScopedProxyMode.INTERFACES)
public class ThreadUnsafePasswordEncoder implements PasswordEncoder {

}
```

> xml기반 프락시

```xml
<benas
  aop관련기능추가링크>
  <bean id="passwordEncoder" class="com.example.demo.ThreadUnsafePasswordEncoder" scope="request">
    <aop:scoped-proxy proxy-target-class="false" />
  </bean>

  <bean id="userService" class="com.example.demo.UserServiceImpl" >
    <property name="passwordEncoder" ref="passwordEncoder" />
  </bean>
</beans>
```

- 스코프트 프락시를 적용할 대상 빈이 인터페이스를 가지고 있지 않다면 서브클래스 기반으로 프락시를 사용
- 프락시 메소드는 오버라이드해야하기 때문에 private, final을 붙일 수 없음

### 커스텀 스코프

> 사용자 직접정의 스코프

```java
@Bean
static CustomScopeConfigurer customScopeConfigurer() {
  CustomScopeConfigurer configurer = new CustomScopeConfigurer();
  configurer.addScope("thread", new SimpleThreadScope());
  return configurer;
}
```

- @Scope("thread") 애너테이션을 이용해서 스레드 단위의 인스턴스를 얻을 수 있음


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
