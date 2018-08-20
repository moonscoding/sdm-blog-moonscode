
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Advice 정의 (자바기반)](#advice-정의-자바기반)
	* [Before](#before)
	* [After Returning](#after-returning)
	* [After Throwing](#after-throwing)
	* [After](#after)
	* [Around](#around)
* [Advice 정의 (Xml기반)](#advice-정의-xml기반)
* [Pointcut 표현식](#pointcut-표현식)
	* [메서드명으로 JoinPoint 선택](#메서드명으로-joinpoint-선택)
	* [타입으로 JoinPoint 선택](#타입으로-joinpoint-선택)
	* [그외 방법](#그외-방법)
	* [NamedPointCut](#namedpointcut)
* [Advice 대상객체와 인수정보 가져오기](#advice-대상객체와-인수정보-가져오기)

<!-- /code_chunk_output -->

### Advice 정의 (자바기반)

#### Before

```java
@Aspect
@Component
public class MethodStartLoggingAspect {
  @Before("execution(* *..*ServiceImpl.*(..))")
  public void startLog(JoinPoint jp) {
    System.out.println("메서드시작 : " + jp.getSignature());
  }
}
```

- 메소드 시작전에 호출

#### After Returning

```java
@Aspect
@Component
public class MethodNormalEnLoggingAspect {
    @AfterReturning("execution(* *..*ServiceImpl.*(..))")
    public void endLog(JoinPoint jp) {
      System.out.println("메소드정상종료 : " + jp.getSignature());
    }
}
```

- 정상적으로 종료한 메서드의 반환값을 얻을 수 있음

```java
@Aspect
@Component
public class MethodNormalEnLoggingAspect {
  @AfterReturning(value = "execution(* *..*ServiceImpl.*(..))", returning="user")
  public void endLog(JoinPoint jp, User user) {
    System.out.println("메소드정상종료 : " + jp.getSignature() + ", 반환값 : " + user);
  }
}
```

- returning 속성에 반환값을 받을 매개변수의 이름을 지정

#### After Throwing

```java
@Aspect
@Component
public class MethodExceptionEndLoggingAspect {
  @AfterThrowing(value="execution(* *..*ServiceImpl.*(..))", throwing="e")
  public void endLog(JoinPoint jp, RuntimeException e) {
    System.out.println("메소드비정상종료 : " + jp.getSignature());
    e.printStackTrace();
  }
}
```

- 비정상으로 종료될 때 실행
- throwing 속성에 예외를 받을 매개변수를 입력

```java
@Aspect
@Component
public class MethodExceptionEndLoggingAspect {
  @AfterThrowing(value="execution(* *..*ServiceImpl.*(..))", throwing="e")
  public void endLog(JoinPoint jp, RuntimeException e) {
    throw new ApplicationException(e);
  }
}
```

- 예외를 다시 던져 전파하는 것이 가능
- 예외를 외부로 던져지는 것을 막지 못해서, 예외가 발생했을때 꼭 필요한 동작을 수행하게 만들어야함
- 굳이 막아야 하는 상황이라면 AfterThrowing -> Around를 사용하면 가능

#### After

```java
@Aspect
@Component
public class MethodEndLoggingAspect {
  @After("execution(* *..*ServiceImpl.*(..))")
  public void endLog(JoinPoint jp) {
    System.out.println("메서드종료 : " + jp.getSignature());
  }
}
```

- 정상종료던 비정상종료던 모두 실행되는 어드바이스

#### Around

```java
@Aspect
@Component
public class MethodLoggingAspect {
  @Around("execution(* *..*ServiceImpl.*(..))")
  public Object log(ProcedingJoinPoint jp) throw Throwable {
    System.out.println("메서드시작 : " + jp.getSignature());
    try {
      // 대상메서드 실행
      Object result = jp.preceed();
      System.out.println("메서드정상종료 : " + jp.getSignature() + ", 반환값 : " + result);
      return result;
    } catch(Exception e) {
      System.out.println("메서드비정상종료 : " + jp.getSignature());
      e.printStackTrace();
      throw e;
    }
  }
}
```

- 가장 강력한 어드바이스
- 메서드의 실행 전과 후의 처리
- 포인트컷이 적용된 대상 메소드 자체도 실행할 수 있음

### Advice 정의 (Xml기반)

```xml
<beans>
  <aop:config>
    <aop:aspect ref="loggingAspect">
      <aop:before pointcut="execution(* *..*ServiceImpl.*(..))" method="startLog" />
    </aop:aspect>
  </aop:config>
</beans>
```

### Pointcut 표현식

- 표현식을 이용한 조인 포인트 선택기능은 AspectJ가 제공

#### 메서드명으로 JoinPoint 선택

- execution 지시자를 사용

```
execution(* com.example.user.UserService.*(..))
# 클래스에 임의의 메서드를 대상

execution(* com.example.user.UserService.find*(..))
# 클래스에서 이름이 find로 시작하는 메소드 대상

execution(String com.example.user.UserService.*(..))
# 클래스에서 반환되는 값의 타입이 String인 메소드 대상

execution(* com.example.user.UserService.*(String, ..))
# 클래스에서 첫번째 매개변수의 타입이 String인 메서드 대상

execution(* *..*ServiceImpl.*(..))
# ServiceImpl로 끝나는 모든 클래스의 모든 메서드 대상
```

- \*
  - 임의의 문자열
  - 패키지를 표현할 때는 임의의 패키지 1개 계층을 의미
  - 매개변수를 표현할 때는 임의의 인수 1개를 의미
- ..
  - 패키지를 표현할 때 임의의 패키지 0개 이상 계층을 의미
  - 메서드의 매개변수를 표현할때는 임의의 인수 0개 이상을 의미
- \+
  - 클래스명 뒤에 붙여 쓰며, 해당 클래스와 해당 클래스의 서브클래스 혹은 구현클래스 모두를 의미

```
execution(* com.example.service.*.*(..))
# service 패키지에 임의의 클래스에 속한 임의의 메서드를 대상

execution(* com.example.service..*.*(..))
# service 패키지나 그 서브패키지 중에서 임의의 클래스에 속한 임의의 메서드

execution(* com.example.*.user.*.*(..))
# user 패키지 상위에 패키지가 1개 더 있는 user패키지에서 임의의 클래스에 속한 임의의 메서드를 대상

execution(* com.example.user.UserService.*(*))
# user 패키지에 UserService 클래스의 메서드중에서 매개변수의 갯수가 1개인 메서드를 대상
```

#### 타입으로 JoinPoint 선택

```
within(com.example.service..*)
# service 패키지나 그 서브패키지 중에서 임의의 클래스에 속한 임의의 메서드를 대상

within(com.example.user.UserServiceImpl)
# user 패키지에 UserServiceImpl 클래스의 메서드를 대상

within(com.example.password.PasswordEncoder+)
# password 패키지에 PasswordEncoder 인터페이스를 구현한 클래스의 메서드를 대상
```

####  그외 방법

```
bean(*Service)
# DI 컨테이너에 관리되는 빈 가운데 이름이 Service로 끝나는 빈의 메서드를 대상

@annotation(com.example.annotation.TraceLog)
# @TraceLog 애너데이션이 붙은 메서드 대상

@within(com.example.annotation.TraceLog)
# @TraceLog 애너테이션이 붙은 클래스의 메서드를 대상
```

#### NamedPointCut

- 포인트컷에 이름을 붙여두고 나중에 재사용하는 방법
- 이름이 붙여진 포인트컷을 네임드 포인트컷이라함
- 메서드의 반환값은 void

> 네임드 포인트컷 정의

```java
@Component
@Aspect
public class NamedPointCuts {
  @Pointcut("within(com.example.web..*)")
  public void inWebLayer() {}

  @Pointcut("within(com.example.domain..*)")
  public void isDomainLayer(){}

  @Pointcut("execution(public * *(..))")
  public void anyPublicOperation() {}
}
```

> 네임드 포인트컷 활용

```java
@Aspect
@Component
public class MethodLoggingAspect {
  @Around("isDomainLayer()")
  public Object log(ProcedingJoinPoint jp) throws Throwable {

  }
  // @Around("isDomainLayer()" || "inWebLayer()''")
}
```

- &&, ||, ! 과 같은 논리 연산자를 사용할 수도 있음

### Advice 대상객체와 인수정보 가져오기

JoinPoint 타입의 인수를 활용하면 어드바이스 대상 객체나

메서드를 호출할 때 전달될 인수의 정보를 가져올 수 있음

- getTarget()
  - 프락시가 입혀지기전 원본대상 객체정보
- getThis()
  - 프락시
- getArgs()
  - 인수정보

> JoinPoint를 통해 대상 객체와 인수정보 얻기

```java
@Around("execution* *..*ServiceImpl.*(..)")
public Object log(JoinPoint jp) throws Throwable {
  // 프락시가 입혀지기 전의 원본대상 객체반환
  Object targetObject = jp.getTarget();
  // 프락시
  Object thisObject = jp.getThis();
  // 인수
  Object[] args = jp.getArgs();
}
```

- 실제로 사용하기 전에는 형변환을 해야함
  - ClassCastException이 발생할 수 있음
  - target, this, args 등을 활용해 대상 객체나 인수를 어드바이스 메서드에 파라미터로 바인딩하면 해결


> target, args 지시자를 통해 대상객체와 인수정보 얻기

```java
@Around("execution(* com.example.CalcService.*(com.example.CalcInput)) &&
  target(service) && args(input)")
public Object log(CalcService service, CalcInput input) throws Throwable {

}
```

- 다음과 같이 처리시에 getTarget & getArgs 메서드 결과를 형변환할 필요가 없음
- 타입이 맞지 않으면 자연스럽게 어드바이스 대상에서 제외
- 타입 안전 (type safe)

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
