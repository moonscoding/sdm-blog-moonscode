
<div class="pull-right">  업데이트 :: 2018.08.28 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [타임리프](#타임리프)
	* [타임리프이용 뷰로변경](#타임리프이용-뷰로변경)
	* [템플릿구현](#템플릿구현)
* [텍스트입력](#텍스트입력)
* [표현식](#표현식)
	* [기본표현식](#기본표현식)
	* [리터럴](#리터럴)
	* [기본적인연산자](#기본적인연산자)
	* [텍스트연산자](#텍스트연산자)
	* [조건연산자](#조건연산자)
* [th속성에 의한 속성값 설정](#th속성에-의한-속성값-설정)
	* [특정속성에 값을 설정하는 방법](#특정속성에-값을-설정하는-방법)
	* [현재속성에 값을 추가하는 방법](#현재속성에-값을-추가하는-방법)
	* [존재여부가 중요한 속성의 출력을 제어하는 방법](#존재여부가-중요한-속성의-출력을-제어하는-방법)
	* [여러 속성에 같은 값을 설정하는 방법](#여러-속성에-같은-값을-설정하는-방법)
	* [임의속성에 값을 설정하는 방법](#임의속성에-값을-설정하는-방법)
* [HTML 요소의 출력제어](#html-요소의-출력제어)
	* [조건에 따른 출력여부 제어](#조건에-따른-출력여부-제어)
	* [반복 출력 제어](#반복-출력-제어)
* [인라인 표기법](#인라인-표기법)
* [주석](#주석)
* [스프링과 연계](#스프링과-연계)
	* [폼객체의 바인딩](#폼객체의-바인딩)
	* [입력오류 표시](#입력오류-표시)
	* [SpEL 이용](#spel-이용)
	* [ConversionService 연계](#conversionservice-연계)
* [공통 템플릿 재사용](#공통-템플릿-재사용)
	* [템플릿 프래그먼트](#템플릿-프래그먼트)
	* [템플릿 레이아웃](#템플릿-레이아웃)
* [스프링 시큐리티 연계](#스프링-시큐리티-연계)
	* [스프링 시큐리티 다이얼렉트 설정](#스프링-시큐리티-다이얼렉트-설정)
	* [인증정보 접근](#인증정보-접근)
	* [화면항목에 대한 인가처리](#화면항목에-대한-인가처리)
	* [CSRF 토근 접근](#csrf-토근-접근)
* [JSR 310 : Date and Time 이용](#jsr-310-date-and-time-이용)

<!-- /code_chunk_output -->

### 타임리프

#### 타임리프이용 뷰로변경

- JSP파일에 대응하는 타임리프 템플릿 파일을 자성
  - .html 형식으로 지정
  - src/main/webapp/WEB-INF/index.jsp => src/main/webapp/WEB-INF/templates/index.html

#### 템플릿구현

> index.html

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h2>Hello World !</h2>
    <li>
        <a href="./echo/input.html">에코 애플리케이션으로 이동</a>
    </li>
</body>
</html>
```

> input.html

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<body>
<h2>입력화면</h2>
    <form action="./output.html" th:action="@{echo}">
        <div>텍스트를 입력해 주세요.</div>
        <div>
            <input type="text" name="text" th:field="*{text}"/><br/>
            <span th:if="${#fields.hasErrors('text')}" th:errors="*{text}">
                    text의 에러메시지
                </span>
        </div>
        <div>
            <button type="submit">전송</button>
        </div>
    </form>
</body>
</html>
```

> output.html

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<body>
    <h2>출력 화면</h2>
    <div>입력한 텍스트는</div>
    <div>
        '<span th:text="*{echoForm.text}">여기에 입력한 값이 표시됩니다.</span>'
    </div>
    <br />
    <div>
        <a href="../index.html">최상위 페이지로 이동</a>
    </div>
</body>
</html>
```

### 텍스트입력

- 스프링 MVC 모델에 저장된 값이나 프로퍼티 파일에서 취득한 메시지를 텍스트로 출력하는 경우
  - th:text
    - 속성값으로 지정한 값에 포함된 HTML 특수문자를 무효화해서 출력
    - 이스케이프
  - th:utext
    - 속성값으로 지정한 값을 이스케이프하지 않고 출력

> th:utext 속성

```
guidance.agreeToTerms=이 시스템을 위해서는 우선 <b>이용약관에 동의</b>해 주세요.
<span th:utext="#{guidance.agreeToTerms}"><b>이용약관에 동의</b>가 필요합니다.</span>
```

> th:text 속성

```
이 시스템을 위해서는 우선 <b>이용약관에 동의</b>해 주세요.
```

### 표현식

#### 기본표현식

- 변수식
  - ${user.firstName}
    - 타임리프는 변수식에 OGNL이라는 자바와 비슷한 언어를 기술해 HTTP세션과 요청을 비롯한 각종 타임리프가 관리하는 변수에 접근하거나 메서드 실행
    - 묵시적으로 준비하고 있는 유틸리티 객체(날짜/시간)에 접근 가능
    - 스프링 MVC와 연동하는 경우 스프링이 관리하는 객체에 접근할 수 있도록 확장
    - ${@cart.getSize()}와 같이 SpEL을 이용해 빈에 접근하는 코드를 기술하거나 프로퍼티명을 지정해 폼 객체등의 모델에 저장된 정보에 접근
- 선택변수식
  - \*{name}
    - th:object 속성과 선택변수식을 조합하면 변수식보다 간단한 코드 작성
    - th:object="${user}" 정의
      - \*{name}
      - \*{address}
      - \*{tel}
      - 다음과 같이 접근이 가능 (user. 생략)
- 메시지식
  - #{status.reserved.message}
    - 타임리프는 메시지를 KeyValue로 관리
    - 메시지의 본문을 가져오고 싶을때, 메시지식을 사용
    - MessageFormat의 사양을 따름, 메시지 본문에 매개변수 삽입가능
      - #{home.welcome(${session.user.name})}
- 링크 URL식
  - @{/echo}
    - 웹 애플리케이션에서 링크 URL을 컨텍스트 경로에서 시작하는 절대경로로 출력
    - JSP에서 ${pageContext.request.contextPath}등을 사용해서 컨텍스트 경로를 취득 URL 시작부분에 추가
    - 링크 URL을 이용 지정한 URL이 시작되는 부분에 컨텍스트 경로 추가

#### 리터럴

- 타임리프가 제공하는 5가지 리터럴
  - 텍스트 리터럴
  - 수치 리터럴
  - 불린 리터럴
  - Null 리터럴
  - 리터럴 토큰
    - 이용 가능한 문자를 제한한 텍스트 리터럴 : error-class
    - A-Z a-z 0-9 [ ] , . - _ 만 사용가능
    - 리터럴 토큰을 사용함으로 따옴표로 묶는 수고를 덜수 있음
    - th:class 속성에 단독 클래스명을 설정하는 경우 등등 제한된 문자열만 사용하는 경우에 활용

#### 기본적인연산자

- 타임리프가 제공하는 연산자
  - 산술연산
    - th:text="${price} * ${num}"
  - 논리연산
    - th:if="${not todo.finished}"
  - 마이너스 부호
    - th:text="-10"
  - 비교연산
    - th:if="${items.count} gt 1"
      - '<' 등의 문자를 사용하는 경우 '\&lt;' 등으로 이스케이프 해야함
      - 별칭
        - gt (>)
        - lt (<)
        - ge (>=)
        - le (<=)
        - not (!)
        - eq (==)
        - neq/ne (!=)

#### 텍스트연산자

- 텍스트추가
  - th:text="'My name is + ${username}."
- 텍스트치환
  - th:text="|My name is ${username}.|"

#### 조건연산자

- 삼항연산자
  - th:class="${row.even} ? 'even' : 'odd'"
- 엘비스연산자
  - th:text="${username}?: 'Sam Smith'"

### th속성에 의한 속성값 설정

- 타임리프 템플릿 엔진의 기능은 th 속성에 지정된 식을 해석하고 HTML 각 요소의 속성 값을 설정 또는 덮어쓰는 것

> th 속성 이용한 속성값 설정

- 특정 속성값에 값을 설정하는 방법
  - 특정 속성에 값을 설정
  - HTML의 각 속성에 대한 전용 th 속성이 제공
  - 가독성이 높고 알기 쉬음
- 현재 속성 값의 전후에 값을 추가하는 방법
  - class 속성처럼 여러개의 값을 설정할 수 있는 속성에서 현재 값 전후에 지정한 값을 추가
  - 동적으로 변화하는 속성의 일부를 템플릿화할 때 사용
- 존재 여부가 중요한 속성의 출력을 제어하는 방법
  - checked 속성이나 readonly 속성등 속성으로 값을 갖는 것이 아닌 존재여부가 중요한 속성에 대해 속성 자체의 출력 여부를 제어
- 여러 속성에 같은 값을 설정하는 방법
  - 특정속성값을 설정하는 방법의 특수한 형태
  - 여러 속성에 같은 값을 동시에 설정
  - alt 속성과 title 속성처럼 같은 값을 설정하는 것이 일반적인 속서에 대해 전용 설정방법을 제공
- 임의의 속성에 값을 설정하는 방법
  - 범용적인 th 속성인 th:attr 속성을 사용해서 임의속성값을 설정
  - 범용적이나 가속성이 떨어짐

#### 특정속성에 값을 설정하는 방법

- 전용 th 속성
  - th:href
  - th:action
  - th:value
  - th:form
  - th:action
  - th:formmethod
  - th:id
  - th:name
  - th:class
  - th:src

#### 현재속성에 값을 추가하는 방법

- class 속성과 같이 여러 값을 설정할 수 있는 경우 현재 설정된 값의 앞 또는 뒤에 값을 추가하고 싶을 때
  - th:classappend 속성처럼 속성값을 추가하는 전용 th 속성 이용
    - thclassappend 속성
      - class 속성 전용이며 현재 설정값을 다음에 값을 추가
    - thstyleappend 속성
      - style 속성 전용이며 현재의 설정 값을 다음에 값을 추가

```html
<input type="button" value="등록" class="btn" th:classappend="${cssStyle}" />
```


#### 존재여부가 중요한 속성의 출력을 제어하는 방법

- selected & checked & readonly 등의 속성 값처럼 명확하지만 속성의 존재 여부가 의미가 있는 속성
  - 속성의 값을 동적으로 변화하는 것이 아니라 속성의 유무를 동적으로 변화
  - 속성 자체의 출력을 동적을 제어하는 th 속성을 대상이 될 수 있는 속성별로 제공

```html
<!-- 참 -->
<input type="checkbox" name="understand" th:checked="${info.understand}" />
<!-- 거짓 -->
<input type="checkbox" name="understand" />
```

- 템플릿에 checked 속성을 기술하는 경우 th:checked 속성이용
- 속성값에 출력 여부를 제어하기 위한 판단식을 기술
  - 참인경우 속성으로 checked="checked" 부여
  - 거짓인 경우 checked 자체가 부여되지 않음

#### 여러 속성에 같은 값을 설정하는 방법

- alt & title 속성등 같은 값을 설정하는 것이 일반적
  - th:alt-title 속성
    - th:alt 속성과 th:title 속성을 동시에 적용
  - th:lang-xmllang 속성
    - th:lang 속성과 th:xmllang 속성을 동시에 적용

```html
<img src="../images/sample.jpg" th:src="@{/image/sample.jpg}" th:alt-title="#{info}" />
```

#### 임의속성에 값을 설정하는 방법

- th:attr 속성
  - '속성명=설정값' 과 같은 설정대상의 속성과 값의 쌍을 기술
  - 여러값을 설정할 수 있음
    - '속성명1=설정값1', '속성명2=설정값2', ...

> 처리전

```html
<button th:attr="data-product-id=${product-id}">삭제</button>
```

> 처리후

```html
<button data-product-id="P00001">삭제</button>
```

### HTML 요소의 출력제어

- 동적으로 HTML 요소를 출력을 제어해야 하는 경우
  - 특정 조건에서만 메시지를 표시
  - 데이터의 건수만 행을 추가

#### 조건에 따른 출력여부 제어

- th:if
  - 속성값이 참인 경우에만 출력
- th:unless
  - 속성값이 거짓인 경우에만 출력
- th:switch
  - 자식요소 th:case 속성 값과 비교평가
- th:caasw
  - 부모요소 th:switch 속성 값의 경우에 출력

> 참거짓 판단기준

- null 은 거짓
- 숫자 타입에서 0이 아닌 값이면 참, 그밖엔 거짓
- 문자열 타입에서 'false', 'off', 'no' 이면 거짓, 그밖엔 참
- boolean 타입, 숫자 타입, 문자열 타입 이외의 경우 참

```html
<h2>조건(if)</h2>
<div th:if="${not #strings.isEmpty(room.remark)}">
  <label>비고</label>
  <span th:text="*{room.remark}">비고가 입력되어 있다면 표시</span>
</div>

<h2>조건(switch)</h2>
<div th:switch="*{room.size}">
  <label th:case="'L'">대</label>
  <label th:case="'M'">중</label>
  <label th:case="'S'">소</label>
  <label th:case="*">불명</label>
</div>
```

#### 반복 출력 제어

- java.util.List 구현클래스
- java.util.Iterable 구현클래스
- java.util.Map 구현클래스
- 배열

> 메타정보종류

- index
  - 0부터시작
- count
  - 1부터시작
- size
  - 반복대상 총건수
- current
  - 현재 반복처리에서 취급값
- odd
  - 현재 반복처리에서 홀수여부를 나타내는 논리값
- even
  - 현재 반복처리에서 짝수여부를 나타내는 논리값
- first
  - 현재 반복처리에서 첫번째 여부를 나타내는 논리값
- last
  - 현재 반복처리에서 마지막 여부를 나타내는 논리값

```java
List<Product> products = new ArrayList();
products.add(new Product("lemon", 1000, 10));
products.add(new Product("apple", 2000, 10));
products.add(new Product("potato", 3000, 10));
products.add(new Product("orange", 4000, 10));
products.add(new Product("berry", 1000, 10));
model.addAttribute("products", products);
```

```html
<h2>반복</h2>
<table>
  <tr>
    <th>No</th><th>이름</th><th>가격</th><th>재고</th>
  </tr>
  <tr th:each="prod : ${products}">
    <td th:text="${prodStat.count}">num</td>
    <td th:text="${prod.name}">name</td>
    <td th:text="${prod.price}">price</td>
    <td th:text="${prod.stock == 0 ? '품절' : prod.stock}">stock</td>
  </tr>
</table>
```

- prodStat
  - 반복에 대한 메타정보에 접근시에 타임리프가 묵시적으로 생성한 변수를 이용
  - 묵시적으로 준비한 변수는 변수명에 접미사 Stat을 부여한것

### 인라인 표기법

- [[...]]
  - 내부가 동적으로 치환되는 방식

```html
<p>Hello, [[${user.name}]]!</p>
```

> 인라인표시법을 활성화 하는경우

```html
<p th:inline="text"> Hello, [[${user.name}]]!</p>
```

> body 요소안에 모든 인라인 표기법을 활성화 하는 경우

```html
<body th:inline="text">
  <p>Hello, [[${user.name}]]!</p>
</body>
```

- 인라인표기법은 텟플릿 파일에서 브라우저에 직접 표시할 때 인라인 표기법을 적용한 텍스트가 그대로 표시
- th:text 속성처럼 샘플데이터를 표시할 수 없어 가시성이 떨어질 수 있음

### 주석

```html
<!--
  타임리프처리 후에도 남아 있음
-->

<!--/*
  타임리프처리 후에 사라짐  
*/-->
```

### 스프링과 연계

#### 폼객체의 바인딩

- th:object
  - HTML 폼에 연결되는 폼객체를 지정하기 위한 속성
- th:field
  - 입력항목에 연결되는 폼 객체의 프로퍼티를 지정하기 위한 속성

```html
<form th:action="@{/sample}" method="POST" th:object="${echoForm}">
  <div>텍스트를 입력해 주세요.</div>
  <div>
    <input type="text" name="text" th:field="*{text}" />
  </div>
</form>
```

- th:object 속성에 연결하고 싶은 폼객체 변수 식을 사용해 지정
  - 변수식에는 모델에 저장한 폼객체의 속성명을 지정
- th:field 속성에 연결하고 싶은 폼객체의 프로퍼티를 선택변수식을 사용해 지정
  - 선택변수식은 폼객체의 프로퍼티명을 지정
  - 중첩된 프로퍼티를 지정하는 경우 '.' 사용

#### 입력오류 표시

- th:errors 속성
  - 오류메시지의 출력 대상을 지정하기 위한 속성
- th:errorclass 속성
  - 오류 발생시 적용하는 CSS 클래스를 지정하기 위한 속성
- #fields 객체
  - 오류 정보에 접근하기 위한 편리한 메서드를 제공하는 객체

> 타임리프 처리전의 HTML

```html
<input type="text" name="text" th:field="*{text}" th:errorclass="fieldError" />
<span th:errors="*{text}">text 오류메시지</span>
```

- th:errorclass 속성에 오류가 발생할때 적용하는 CSS wlwjd
- th:errors 속성에 폼객체의 프로퍼티를 선택변수식을 사용해 지정
- 지정한 프로퍼티에 대한 오류 메시지만이 표시
- 오류메시지가 여러개인 경우 분할 문자열은 <br/>

> 타임리프 처리후의 HTML

```html
<input type="text" name="text" id="text" value="" class="fieldError" />
<span>may not be empty</span>
```

#### SpEL 이용

> SpEL를 활용한 빈접근 구현

```java
@Component
public class AppSettings implements Serializable {
  @Value("${passwordValidDays:90}")
  private int passwordValidDays;

  // ..
}
```

> 템플릿 파일의 구현

```html
<span th:text="${@appSettings.passwordValidDays}">60</span>일
```

- DI 컨테이너에 등록된 빈에 접근하는 경우 '@ + 빈이름' 지정

> 타임리프 처리 후

```html
<span>90</span>일
```

#### ConversionService 연계

- 변수식
  - '${{...}}' 형식으로 지정하면 적용
- 선택변수식
  - '\*{{...}}' 형식으로 지정하면 적용
- th:filed
  - 식의 지정 형식과 관계없이 항상 지정
- #conversions 객체
  - 형변환용 메서드를 제공하는 객체
  - 형변환을 수행할때 호출

> ConversionService 형변환 구현

```java
@Component
public class AppSettings implements Serializable {
  @Value("${basicPostage:1250}")
  @NumberFormat(style=NumberFormat.Style.NUMBER)
  private int basicOneDayCost;

  // ..
}
```

```html
<span th:text="${@appSettings.basicOneDayCost}">1300</span>원
<span th:text="${{@appSettings.basicOneDayCost}}">1300</span>원
```

```html
<span>1250</span>원
<span>1,250</span>원
```

- 프로퍼티에 지정한 포맷 (@NumberFormat)으로 출력

### 공통 템플릿 재사용

- 반복적으로 사용되는 템플릿을 공통으로 만들어 재사용하는 방법
  - 템플릿 프래그먼트
  - 템플릿 레이아웃

#### 템플릿 프래그먼트

- 타임리프의 th : fragment 속성을 이용한 프래그먼트 정의
- CSS 셀렉터와 마찬가지로 id 속성을 이용한 프래그먼트 정의

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org">
<body>
    <footer th:fragment="footerA">$copy; 푸터 예 A</footer>
    <footer id="footerB">$copy; 푸터 예 B</footer>
</body>
</html>
```

- th:fragment
  - 프래그먼트로 정의하는 요소에 부여
- id 속성
  - 프래그먼트를 정의하는 경우 일반적으로 이용
  - 지정한 속성 값이 프래그먼트명

> 프래그먼트를 읽어들이는 방법

- 타임리프의 th:include 속성을 이용한 프래그먼트의 인클루드
- 타임리프의 th:replace 속성을 이용한 프래그먼트의 대체

> th:include

```html
<h2>템플릿 프래그먼트 A (th:include + frag)</h2>
<div th:include="footer :: footerA"></div>

<h2>템플릿 프래그먼트 B (th:include + id)</h2>
<div th:include="footer :: #footerB"></div>
```

> include 결과

```html
<h2>템플릿 프래그먼트 A (th:include + frag)</h2>
<div>
  $copy; 푸터 예 A
</div>

<h2>템플릿 프래그먼트 B (th:include + id)</h2>
<div>
  $copy; 푸터 예 B
</div>
```

- th:include 속성
  - 프래그먼트를 참조해서 인클루드하는 경우
    - '템플릿명 :: 프래그먼트명' 과 같은 형식으로 처리
  - id 속성을 참조해서 인클루드하는 경우
    - '템플릿명 :: #프래그먼트명' 과 같은 형식으로 처리

> th:include & th:replace 차이

```html
<h2>th:include와 th:replace의 차이</h2>
<div th:include="footer :: footerA"></div>
<div th:replace="footer :: footerA"></div>
```

```html
<h2>th:include와 th:replace의 차이</h2>
<div>
  $copy; 푸터 예 A
</div>
<footer>
  $copy; 푸터 예 A
</footer>
```

#### 템플릿 레이아웃

> 타임리프 레이아웃 dialect 설정 (pom.xml)

```xml
<dependency>
  <groupId>nz.net.ultraq.thymeleaf</groupId>
  <artifactId>thymeleaf-layout-dialect</artifactId>
</dependency>
```

> 설정클래스

```java
@Bean
public SpringTemplateEngine templateEngine() {
    SpringTemplateEngine engine = new SpringTemplateEngine();
    engine.addDialect(new LayoutDialect());
    engine.setTemplateResolver(templateResolver());
    return engine;
}
```

- addDialect()
  - 타임리프의 레이아웃 다이얼렉트 활성화

> 다이얼렉트에 의한 뷰구현

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"
  xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout">
<head>
    <title>개별 값으로 대체</title>
    <script type="text/javascript" src="your-common-script.js"></script>
</head>
<body>
    <section layout:fragment="content">
      <p>개별 부분에서 정의하는 내용</p>
    </section>
</body>
</html>
```

- xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
  - 타임리프 레이아웃 다이얼렉트를 사용하기 위해서 XML 네임스페이스를 지정
- \<title>
  - 설정한 값은 Fragment 템플릿에서 정의한 \<title> 값으로 대체
- 공통 CSS & JS 설정
- layout:fragment
  - 프래그먼트를 정의하고 싶은 요소에 부여

> 개별부분이 되는 프래그먼트

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"
  xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
  layout:decorator="layout">
<head>
    <title>개별 제목</title>
    <script type="text/javascript" src="content-script.js"></script>
</head>
<body>
    <section layout:fragment="content">
      <p>개별 내용</p>
    </section>
</body>
</html>
```
- xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
  - 타임리프 레이아웃 다이얼렉트를 사용하기 위해서 XML 네임스페이스를 지정
- layout:decorator="layout"
  - 공통적인 템플릿을 이용하는 Decorator 뷰이름을 지정
- \<title>
  - 개별제목으로 대체
- 개별 CSS & JS 설정
- layout:fragment
  - 속성을 부여한 요소로 대체
  - \<sectionlayout:fragment="content">의 내뇽이 HTML에 설정

### 스프링 시큐리티 연계

- 스프링 시큐리티 다이얼렉트 이용
  - 스프링 시큐리티에서 제공하는 JSP 태그 라이브러리와 같은 기능을 타임리프에 포함

> 주요기능

- sec:authentication
  - 인증정보에 접근하는 기능
- sec:authorize
  - 스프링 시큐리티 표현식을 이용한 인가처리와 같은 기능
- sec:authorize-url
  - URL기반의 인증처리
- sec:authorize-acl
  - ACL(Access Control List)를 이용한 인가처리
- CSRF 토큰에 접근하는 기능

#### 스프링 시큐리티 다이얼렉트 설정

> pom.xml

```xml
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-springsecurity4</artifactId>
  </dependency>
```

> 설정클래스

```java
@Bean
public SpringTemplateEngine templateEngine() {
    SpringTemplateEngine engine = new SpringTemplateEngine();
    engine.addDialect(new SpringSecurityDialect());
    engine.setTemplateResolver(templateResolver());
    return engine;
}
```

- addDialect()
  - SpringSecurityDialect() 인스턴스 설정

#### 인증정보 접근

> sec:authentication

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"
  xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<body>
    <h3>Hello. <span sec:authentication="principal.username">이순신</span>님.</h3>
</body>
</html>
```

- xmlns:sec="http://www.thymeleaf.org/extras/spring-security"
- sec:authentication
  - 인증정보를 표시하는 요소에 부여하고 속성값에 접근하는 프로퍼티를 지정
  - 중첩된 프로퍼티에 접근시에 '.' 사용

#### 화면항목에 대한 인가처리

- sec:속성
  - 화면항목에 대한 인가처리
  - sec:authorize
  - sec:authorize-url


>  적용하는 화면 항목과 접근 정책 지정

- 접근 정책을 적용하는 화면 항목요소에 sec:authorize 속성을 부여
- 다음으로 적용할 접근 정책을 속성 값을 설정
- 속성값으로 설정된 표현식 결과가 True이면 적용한 요소가 HTML 표시

> sec:authorize

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"
  xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<div sec:authorize="hasRole('ADMIN')">
  <h2>관리자메뉴</h2>
  <!--  -->
</div>
</html>
```

- sec:authorize
  - 접근정책을 설정
  - Admin 롤을 부여하고 있는 것을 조건으로 사용

> 웹리소스에 지정한 접근정책과의 연동

- 웹리소스에 지정한 접근 정책과 연동가능
- sec:authorize-url 속성이용

```html
<ul>
  <li sec:authorize-url="/admin/accounts">
    <a href="./admin/accounts.html" th:action="@{/admin/accounts}">계정관리</a>
  </li>
</ul>
```

- sec:authorize-url
  - 적용할 화면항목의 요소에 부여
  - 속성값으로 연동할 웹리소스를 설정

#### CSRF 토근 접근

- CSRF 기능을 활성화한 상태에서 폼이나 Ajax 통신을 사용해 데이터를 POST하는 경우
  - CSRF 토큰값을 요청파라미터나 요청해더에 설정
  - 폼의경우 스프링시큐리티 다이얼렉트를 적용하는 것만으로 포함
  - Ajax를 이용하는 경우 프로그래머가 직접구현

> 폼의경우 (타임리프 설정전)

```html
<form th:action="@{/login}" method="post">
  <!--  -->
</form>
```

```html
<form action="index.html" method="post">
  <!--  -->
  <input type="hidden" name="_csrf" value="321123-12312312213-123213123123">
</form>
```

> \<meta>요소에 CSRF 토큰을 포함하는 방법

```html
<head>
  <meta name="_csrf" th:content="${_csrf.token}" />
  <meta name="_csrf_header" th:content="${_csrf.headerName}" />
</head>
```

```html
<head>
  <meta name="_csrf" th:content="1231241-12312412123" />
  <meta name="_csrf_header" th:content="X-CSRF-TOKEN" />
</head>
```

- CSRF 토큰정보에서 토큰값을 취득
- CSRF 토큰정보에서 토큰해더명을 취득
- Ajax 통신을 수행시에 \<meta> 요소에서 토큰값과 요청헤더명을 취득

### JSR 310 : Date and Time 이용

- 타임리프 템플릿에서 JSR: 310 : Date and Time API의 객체를 조작하기 위해 라이브러리 필요

```xml
<dependency>
  <groupId>org.thymeleaf.extras</groupId>
  <artifactId>thymeleaf-extras-java8time</artifactId>
</dependency>
```

> 빈정의추가

```java
@Bean
public SpringTemplateEngine templateEngine() {
    SpringTemplateEngine engine = new SpringTemplateEngine();
    engine.addDialect(new Java8TimeDialect());
    engine.setTemplateResolver(templateResolver());
    return engine;
}
```


> 유티리티 객체 (temporals)

```html
<head>
  <meta charset="utf-8"/>
  <title th:text="|${#temporals.format(date, 'yyyy/M/d')} 회의실|">2017/5/10 회의실</title>
</head>
```



---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
