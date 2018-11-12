
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [표현언어](#표현언어)
* [표현언어 설정](#표현언어-설정)
* [API 개요](#api-개요)
* [빈정의시 SpEL 활용](#빈정의시-spel-활용)
* [표현식 유형](#표현식-유형)

<!-- /code_chunk_output -->

### 표현언어

- 스프링 프레임워크가 제공하는 표현언어
- 어디에쓰나 ? 왜쓰나 ?
  - 모든 제품에 걸쳐서 사용할 수 있는 하나의 표현언어를 스프링 커뮤니티에 제공하기 위해서 만들어짐

### 표현언어 설정

- spring-expression 의존성모듈 추가

> pom.xml

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-expression</artifactId>
</dependency>
```

### API 개요

- ExpressionParser
  - 문자열 형태인 표현식을 분석
  - Expression 객체를 생성하기 위한 메서드 제공
- Expression
  - 분석된 표현식의 내용을 실행하기 위한 메서드 제공

> SpEL이용 간단 수식풀기

```java
ExpressionParser parser = new SpelExpressionParser(); // SpEL 분석기 생성
Expression expression = parser.parseExpression("1 * 10 + 1"); // 표현식생성
Integer calculationResult = expression.getValue(Integer.calss);
```

> SpEL이용 자바빈즈 프로퍼티 설정

```java
ExpressionParser parser = new SpelExpressionParser(); // SpEL 분석기 생성
Expression expression = parser.parseExpression("joinedYear"); // 표현식생성
Staff staff = new Staff();
expression.setValue(staff, "2000"); // 표현식실행
Integer joinedYear = staff.getJoinedYear();
```

### 빈정의시 SpEL 활용

> 인수가 있는 생성자 구현

```java
public class TemporaryDirectory implements Serializable {
  private static final long serialVersionUID = -612368765432L
  private final File directory;
  public TemporaryDirectory(File baseDirectory, String id) {
    this.directory = new File(baseDirectory, id);
  }
  // skip
}
```

- 인수가 있는 생성자 생성

> SpEL 활용 ( XML기반 )

```xml
<bean id="sessionScopedTemporaryDirectory" class="com.example.TemporaryDirectory" scope="session" >
  <constructor-arg index="0" value="file://#{systemProperties['java.io.tmpdir']}/app" />
  <constructor-arg index="1" value="#{T(java.util.UUID).randomUUID().toString()}" />
</bean>
```

> SpEL 활용 ( 애너테이션 )

```java
@Autowired
public TemporaryDirectory (
  @Value("file://#{systemProperties['java.io.tmpdir']}/app") File baseDirectory,
  @Value(#{T(java.util.UUID).randomUUID().toString()}) String id) {
    this.directory = new File(baseDirectory, id);
  }
```

- systemProperties는 Map형태의 예약된 변수로 시스템 프로퍼티 설정을 담음
- UUID.randomUUID()는 무작위 값을 만드는 static 메서드

### 표현식 유형

- 리터럴값
- 객체생성
  - "{1,2,3}" (List)
  - "{name:'홍길동', joinedYear : 2017}" (Map)
  - "new int[] {1,2,3}" (Array)
  - "new com.example.FileUploadHelper()" (Object)
- 프로퍼티참조
  - "name.first"
  - "emails[0]"
- 메서드호출
  - "'Hello World'.substring(0,5)"
- 타입
  - "T(java.util.UUID).randomUUID()"
- 변수참조
  - "#변수명"
- 빈참조
  - "@빈이름"
- 연산자
  - "name != null ? name : '-'"
  - "name ? : '-'"
- 템플릿
  - "#{표현식}"
  - "Staff Name : #{name}"
- 컬렉션

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
