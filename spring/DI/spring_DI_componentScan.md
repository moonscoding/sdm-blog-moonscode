
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [컴포넌트 스캔](#컴포넌트-스캔)
* [기본설정 컴포넌트 스캔](#기본설정-컴포넌트-스캔)
* [필터적용 컴포넌트스캔](#필터적용-컴포넌트스캔)
	* [할당가능한 타입활용 필터](#할당가능한-타입활용-필터)
	* [정규표현식 패턴으로 필터](#정규표현식-패턴으로-필터)
	* [기본대상이나 특정대상을 빼고 필터](#기본대상이나-특정대상을-빼고-필터)

<!-- /code_chunk_output -->

### 컴포넌트 스캔

- 클래스로더를 스캔하면서 특정 클래스를 찾아 DI 컨테이너에 등록하는 방법

### 기본설정 컴포넌트 스캔

- ==@Component==
  - 아래 세 경우에 해당하지 않는 컴포넌트 ( 유틸리티, 기타 지원 클래스 )에 붙는 애너테이션
- ==@Controller==
  - MVC패턴에서 C, 컨트롤러 역할을 하는 컴포넌트에 붙이는 애너테이션
  - 클라이언트에서 오는 요청을 받고, 비즈니스 로직의 처리 결과를 응답으로 돌려보내는 기능
  - 실제 비즈니스 로직은 @Service 컴포넌트가 처리하도록 위임
- ==@Service==
  - 비즈니스 로직(service)을 담당하는 컴포넌트에 붙이는 애너테이션
  - 컨트롤러에서 받은 입력 데이터를 활용해서 비즈니스 로직을 실행
  - 이때 영속적으로 보관해야 하는 데이터가 있으면 @Repository 컴포넌트로 위임
- ==@Repository==
  - 영속적인 데이터 처리를 수행하는 컴포넌트에 붇이는 애너테이션
  - ORM(Object Relational Mapping) 관련 라이브러리를 활용해서 데이터의 CRUD를 처리하는 기능
- @Configuaration
- @RestController
- @ControllerAdvice
- @ManageBean
- @Named

> 탐색범위의 나쁜예

```java
@CompoentScan(basePackages="com")
@CompoentScan(basePackages="com.example")
```

- 탐색범위가 다음과 같이 광범위한 것은 좋지 않음

> 탐색범위의 좋은예

```java
@CompoentScan(basePackages="com.example.demo")
@CompoentScan(value="com.example.demo.app")
```

- basePackages 속성 대신 별칭으로 value 사용가능
- @ComponentScan은 설정된 클래스가 속한 패키지부터 그 하위 패키지를 스캔

### 필터적용 컴포넌트스캔

- 애너테이션을 활용한 필터 (ANNOTATION)
- 할당 가능한 타입을 활용한 필터 (ASSIGNABLE_TYPE)
- 정규 표현식 패턴을 활용한 필터 (REGEX)
- AspectJ 패턴을 활용한 필터 (ASPECTJ)

#### 할당가능한 타입활용 필터

> 할당가능한 타입으로 필터링 (인터페이스)
>
```java
public interface DemainService {}
```

> 할당가능한 타입으로 필터링 (자바기반 설정방식)
>
```java
@ComponentScan(
  basePackages="com.example.demo"
  includeFilters={ @CompoentScan.Filter(type=FilterType.ASSIGNABLE_TYPE, classes={DomainService.class}) }
)
```

> 할당가능한 타입으로 필터링 (Xml기반 설정방식)
>
```xml
<context:component-scan base-package="com.example.demo">
  <context:include-filter type="assignable" expression="com.example.demo.domain.DomainService" />
</context:component-scan>
```

#### 정규표현식 패턴으로 필터

>정규표현직 패턴으로 필터 (자바기반 설정방식)

```java
@ComponentScan(
  basePackages="com.example.demo",
  includeFilters = { @CompoentScan.Filter( type=FilterType.REGEX, pattern = { ".+DomainService$" }) }
)
```

> 정규표현직 패턴으로 필터 (xml기반 설정방식)

```xml
<context:component-scan base-package="com.example.demo">
  <context:include-filter type="regex" expression=".+DomainService$" />
</context:component-scan>
```

#### 기본대상이나 특정대상을 빼고 필터

- 필터를 적용해서 컴포넌트를 스캔할때 앞서 살펴본 애너테이션이 붙은 스캔 대상도 함께 탐색 범위에 포함
- 애너테이션에 붙는 스캔 대상을 무시하고, 순수하게 필터를 적용해서 탐색되는 컴포넌트만 사용할 때
  - useDefaultFilters = false 처리

>기본스캔대상 제외하고 필터로만 스캔(자바기반)
```java
@ComponentScan(
  basePackages="com.example.demo",
  userDefaultFilters=false,
  includeFilters={ @CompoentScan.Filter( type=FilterType.REGEX, pattern={".+DomainService$"}) }
)
```

>기본스캔대상 제외하고 필터로만 스캔(Xml기반)
```xml
<context:component-scan base-package="com.example.demo" use-default-filters="false">
  <context:include-filter type="regex" expression=".+DomainService$" />
</context:component-scan>
```

- 특정컴포넌트를 스캔 대상에서 빼고 싶을 때
  - excludeFilters 속성을 활용

>기본스캔대상과 특정컴포넌트를 제외하고 필터로만 스캔(자바기반)
```java
@ComponentScan(
  basePackages="com.example.demo",
  userDefaultFilters=false,
  includeFilters={ @CompoentScan.Filter( type=FilterType.REGEX, pattern={".+DomainService$"}) },
  excludeFilters={ @ComponntScan.Filter( type=FilterType.ANNOTATION, pattern={ Exclude.class } ) }
)
```

>기본스캔대상과 특정컴포넌트를 제외하고 필터로만 스캔(xml기반)
```xml
<context:component-scan base-package="com.example.demo" use-default-filters="false">
  <context:include-filter type="regex" expression=".+DomainService$" />
  <context:exclude-filter type="annotation" expression="com.example.demo.Exclude" />
</context:component-scan>
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
