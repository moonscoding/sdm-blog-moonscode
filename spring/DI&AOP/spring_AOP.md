
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [AOP 개념](#aop-개념)
* [황단관심사](#황단관심사)
	* [개념](#개념)
	* [종류](#종류)
* [AOP 용어](#aop-용어)
* [Advice 유형](#advice-유형)
* [스프링 AOP 개념](#스프링-aop-개념)
* [스프링 AOP 기능](#스프링-aop-기능)
	* [트랜잭션관리](#트랜잭션관리)
	* [인가](#인가)
	* [캐싱](#캐싱)
	* [비동기처리](#비동기처리)
	* [재처리](#재처리)

<!-- /code_chunk_output -->

### AOP 개념

AOP (Aspect Oriented Programming ) 이란 여러 클래스에 흩어져 있는

==황단관심사==를 중심으로 설계와 구현을 하는 프로그래밍 기법

### 황단관심사

#### 개념

- 황단관심사
	-  크로스커팅 관심사(cross-cutting concerns)
  - 비즈니스 로직과는 다소 거리가 있으나 여러 모듈에 걸쳐 공통적 반복적으로 필요로 하는 것
- 횡단 관심사의 분리
  - 프로그램안에 횡단 관심사에 해당부분을 분리해서 한 곳으로 모으는 것

#### 종류

- 보안
- 로깅
- 트랙잭션
- 모니터링
- 캐시처리
- 예외처리

### AOP 용어

- aspect
  - AOP의 단위가 되는 횡단 관심사
- join point
  - 횡단 관심사가 실행될 지점이나 시점
- advice
  - 특정 조인 포인트에서 실행되는 코드, 횡단 관심사를 실제로 구현해서 처리하는 부분
- point cut
  - 실제로 어드바이스를 적용할 곳을 선별하기 위한 표현식, 일종의 조인포인트 그룹
- weaving
  - 애플리케이션 코드의 적절한 지점에 애스팩트를 적용하는 것
- target
  - AOP 처리에 의해 처리 흐름에 변환가 생긴 객체

### Advice 유형

- Before :: 조인 포인트 전에 실행, 예외때는 발생 안함
- After Returning :: 조인 포인트가 정상적으로 종료한 후에 실행, 예외때는 발생 안함
- After Throwing :: 조인 포인트에서 예외가 발생했을 때 실행, 정상적일때는 발생 안함
- After :: 조인 포인트에서 처리가 완료된 후 실행, 예외나 정상이나 항상 실행
- Around :: 조인 포인트 전후에 실행

### 스프링 AOP 개념

- 스프링 AOP는 AspectJ라는 AOP 프레임워크가 포함
- AspectJ는 애스팩트와 어드바이스를 정의하기 위한 애너테이션이나 포인트컷 표현 언어
- 위빙 매커니즘등을 제공하는 역할

> pom.xml ( 스프링 AOP를 사용하기 위해서 다음이 추가 되어 있어야함 )
```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-context</actifactId>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-aop</actifactId>
</dependency>
<dependency>
  <groupId>org.aspectj</groupId>
  <artifactId>aspectjweaver</actifactId>
</dependency>
```

> Aspect구현
```java
@Aspect
@Component
public class MethodStartLoggingAspect{
  @Before("execution(* *..*ServiceImpl.*(..))") // 표현식으로 적용될 대상을 정의
  public void startLog(JoinPoint jp) {
    System.out.println("메서드시작 : " + jp.getSignature());
  }
}
```

- ServiceImpl로 끝나는 클래스의 모든 public 메서드를 대상으로 지정

> 스프링 AOP 활성화 (자바기반)
```java
@Configuration
@Component("com.example")
@EnableAspectJAutoProxy
public class AppConfig {

}
```

> 스프링 AOP 활성화 (XML기반)
```xml
<beans>
  <context:component-scan base-package="com.example" />
  <aop:aspectj-autoproxy />
</beans>
```

> AOP가 적용된 빈의 메서드 실행
```java
UserService userService = context.getBean(UserService.class);
usertService.findOne("spring");
```

출력결과 => 메서드 시작 : User com.example.demo.UserServiceImpl.findOne(String)

### 스프링 AOP 기능

#### 트랜잭션관리

```java
@Transactional
public Reservation reverve(Reservation reservation) {

}
```

- @Transactional 지정
	- 복잡한 트랜잭션관리를 스프링프레임워크가 처리

#### 인가

```java
@PreAuthrize("hasRole('ADMIN')")
public User create(User user) {
	// 사용자 등록 처리 ( ADMIN 역할을 가진 사용자만 실행 가능 )
}
```

- 스프링 시큐리티에서 제공하는 인가기능을 AOP 형태로 적용
- @PreAuthrize 지정
	- 메서드 호출전에 특정 인가 조건을 만족하는지 선확인

#### 캐싱

```java
@Cacheable("user")
public User findOne(String email) {

}
```

- 캐싱을 활성화하고 @Cacheable 지정
	- 메서드의 매개변수를 키로 사용해 실행 결과를 캐시로 관리
- 캐시가 등록돼 있지 않다면 메서드 실행
- 반환값을 돌려주기전에 반환값과 키를 캐시에 함께 등록

#### 비동기처리

```java
@Async
public CompleableFuture<Result> calc() {
		Result result = doSomething();
		return CompletableFuture.completeFuture(result);
}
```

- @Async 지정
	- 반환값으로 CompletableFuture 타입의 값이나 DeferredResult 타입의 값을 반환
	- AOP 방식으로 별도의 스레드에서 실행

#### 재처리

```java
@Retryable(maxAttempts = 3)
public String callWebApi() {

}
```

- @Retryable 지정
	- 메서드가 정상적으로 처리되지 않은 경우 원하는 조건을 만족할때까지 재처리
- 신뢰성을 보장하기 어려운 외부 시스템과 연계해야 할때 유용


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
