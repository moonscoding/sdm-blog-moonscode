
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [빈의 생명주기](#빈의-생명주기)
* [빈 초기화단계](#빈-초기화단계)
	* [빈 설정정보 읽기 및 보완](#빈-설정정보-읽기-및-보완)
	* [빈 생성 및 의존관계 해결](#빈-생성-및-의존관계-해결)
	* [빈 생성 전후처리](#빈-생성-전후처리)
	* [빈 생성 초기화처리](#빈-생성-초기화처리)
* [빈 종료단계](#빈-종료단계)
	* [빈 파괴 전처리](#빈-파괴-전처리)
* [DI 컨테이너 종료](#di-컨테이너-종료)

<!-- /code_chunk_output -->

### 빈의 생명주기

- 빈 초기화 단계 (initialization)
- 빈 사용 단계 (activation)
- 빈 종료 단계 (destruction)

### 빈 초기화단계

- 빈을 설정하는 과정
- 빈을 인스턴스화 하는 과정
- 빈을 생성한 다음 후처리 하는 과정

#### 빈 설정정보 읽기 및 보완

```java
public interface BeanFactoryPostProcessor {
	void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory);
}
```
- BeanFactoryPostProcessor를 직접 구현해서 빈으로 정의하면 자신만의 빈 정보 보완 처리도 추가 가능

#### 빈 생성 및 의존관계 해결

- 생성자 기반 의존성 주입
- 세터 기반 의존성 주입
- 필드 기반 의존성 주입

#### 빈 생성 전후처리

- 전처리
	- BeanPostProcessor(BPP) 인터페이스의 메소드를 통해 실행
- 후처리
	- BeanPostProcessor(BPP) 인터페이스의 메소드를 통해 실행

전후처리관련 인터페이스
```java
public interface BeanPostProcessor {
	// 전처리
	Object postProcessBeforeInitialization(Object bean, String beanName);

	// 후처리
	Object postProcessAfterInitialization(Object bean, String beanName);
}
```

#### 빈 생성 초기화처리

- 애너테이션기반설정
	- @PostConstruct를 사용하는 경우
	- InitializingBean 인터페이스를 구현하는 경우, afterPropertiesSet 메서드 오버라이드
- 자바기반설정
	- @BEAN 의 initMethod 속성에 지정한 메서드
- XML기반설정
	- <bean>요소의 init-method 속성에 지정한 메서드

초기화처리 @PostConstruct 활용
```java
@Component
public class UserServiceImpl implements UserService {
	// do something

	@PostConstruct
	void populateCache() {
		// 캐시등록
	}
}
```

- @PostConstruct 메소드의 반환값은 반드시 'void'
- @PostConstruct 메소드의 매개변수는 없어야함

초기화처리 InitializingBean 인터페이스
```java
@Component
public class UserServiceImpl implements UserService, InitializingBean {
	// do something

	@Override
	public void afterPropertiesSet() {
		// 캐시등록
	}
}
```

초기화 메서드 지정 (자바)
```java
@Bean (initMethod="populateCache")
UserService userService(){
	return new UserServiceImpl();
}
```

초기화 메서드 지정 (xml)
```xml
<bean id="userService" class="com.example.demo.UserServiceImpl" init-method="populateCache" >
```

- 서드파티를 사용할때 소스코드에 @PostConstruct 나 InitializingBean을 사용하기 힘들때 사용할 수 있음


### 빈 종료단계

#### 빈 파괴 전처리

- 애너테이션기반 설정
	- @PreDestroy 애너테이션 사용한 경우
	- DisposableBean 인터페이스를 구현한 경우, destroy 메소드 오버라이드
- 자바기반 설정
	- @Bean의 destroyMethod 속성에 지정된 메서드
- Xml기반 설정
	- <bean>의 destroy-method 속성에 지정된 메서드

@PreDestroy를 활용한 예
```java
@Component
public class UserServiceImpl implements UserService {
	// do something

	@PreDestroy
	void clearCache() {
		// 캐시 삭제
	}
}
```

DisposableBean 인터페이스 구현한 예
```java
@Component
public class UserServiceImpl implements UserService, DisposableBean {
	// do something

	@Override
	void destroy() {
		// 캐시 삭제
	}
}
```

자바기반
```java
@Bean(destoryMethod="clearCache")
UserService userService() {
	return new UserServiceImpl();
}
```

xml 기반
```xml
<bean id="userService" class="com.example.demo.UserServiceImpl" destroy-method="clearCache" >
```

### DI 컨테이너 종료

ConfigurableApplicationContext 인터페이스는

ApplicationConext 인터페이스를 확장한 서브 인터페이스로

우리가 사용하는 DI 컨테이너가 바로 ConfigurableApplicationContext의 구현체

이 인터페이스의 'close()' 메소드가 컨테이너를 종료시킴

기본 처리
```java
ConfigurableApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
context.close();
```

Closeable 인터페이스 관련 처리
```java
try(ConfigurableApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class)) {

};
```

JVM 종료시에 함께 종료되도록 Hook처리
```java
ConfigurableApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
context.registerShutdownHook();
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
