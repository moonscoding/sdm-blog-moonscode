
<div class="pull-right">  업데이트 :: 2018.08.15 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [지시자](#지시자)
	* [page 지시자](#page-지시자)
	* [taglib 지시자](#taglib-지시자)
	* [include 지시자](#include-지시자)
* [스크립트릿](#스크립트릿)
* [커스텀 태그 라이브러리](#커스텀-태그-라이브러리)
* [태그파일](#태그파일)
* [EL](#el)
	* [EL 함수](#el-함수)

<!-- /code_chunk_output -->

### 지시자

- 지시자(directive)는 JSP를 어떻게 처리할지 서블릿컨테이너에 대해 지시하는 요소
  - page 지시자
  - taglib 지시자
  - include 지시자

#### page 지시자

- contentType
  - 응답데이터의 MIME 타입과 문자코드를 지정
  - 기본값 "text/html;charset=ISO-8859-1"
- pageEncoding
  - JSP 파일의 문자코드를 지정
- errorPage
  - JSP 내에 발생한 예외를 처리할 에러용 페이지 지정
- isErrorPage
  - 해당 JSP 파일이 에러 페이지인지 여부를 지정
  - 기본값은 false (오류처리용 페이지가 아님)
  - true를 지정하면 묵시적 객체인 exception을 사용할 수 있음
- trimDirectiveWhiteapsces
  - 생성한 응답 데이터에서 여분의 빈 줄이나 여백을 제거할지 지정
  - 기본값은 false(제거하지 않음)

> page 지시자 예

```html
<%@ page pageEncoding="UTF-8" %>
```

#### taglib 지시자

- prefix
  - 태그라이브러리의 프리픽스를 지정
  - JSP에서는 태그 라이브러리를 사용
- uri
  - TLD 파일이 위치한 URI 혹은 파일 경로를 지정
- tagdir
  - 태그 파일이 저정된 디렉터리 지정

> taglib 지시자 예

```html
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

#### include 지시자

- file
  - 소스코드의 일부로 포함할 파일을 지정

> include 지시자 예

```html
<%@ include file="/WEB-INF/header.jsp" %>
```

- 다른 페이지의 내용을 포함하는 방법
  - \<jsp:include>
  - \<c:import>
- 차이점
  - 지정한 페이지를 소스코드의 일부로 포함하는가
  - 지정한 페이지를 실행한 결과(응답데이터)의 일부로 포함하는가

### 스크립트릿

- JSP
	- <% %>
	- <%= %>
	- 사이에 자바코드를 포함할 수 있음
- 스크립트릿(Scriptlet)
	- 포함시킨 자바코드
- 현재는 JSTL과 같은 커스텀 태그 라이브러리와 EL을 조합해서 JSP 구현
	- JSTL(JavaServer Pages Standard Tag Library)
	- EL(Expression Language)

```html
<% for(String hobby : java.util.Arrays.asList("스포츠", "영화", "음악")) { %>
	<%= hobbdy %><br>
<% } %>
```

### 커스텀 태그 라이브러리

- 커스텀 태그 라이브러리 (태그 라이브러리)
- 사용자가 정의한 커스터마이징된 태그를 사용

```html
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 생략 -->
<c:forEach var="hobby" items="스포츠,영화,음악">
	<c:out value="${hobby}" /><br>
</c:forEach>
```

- 뷰를 표시하기 위한 로직을 공통화
- 표현하기 복잡한 로직을 캡슐화
- JSP 코드를 간결하게 처리

> 태그라이브러리

- JSTL (JavaServer Page Standard Tag Library)
	- 오라클이 표준화한 태그 라이브러리
- spring-form JSP Tag Library
	- 스프링 MVC가 제공하는 HTML 폼용 태그 라이브러리
- spring JSP Tag Library
	- 스프링 MVC가 제공하는 범용 태그 라이브러리 및 EL 함수
- Spring Security JSP Tag Library
	- 스프링 시큐리티가 제공하는 인증 및 인가용 태그 라이브러리

### 태그파일

- 태그파일이란 JSP문법으로 기술한 프래그먼트 파일
- 태그 파일에 구현한 내용은 커스텀 태그와 같이 동작
- 확장자 - '.tag'
- taglib 지시자에 태그 파일이 저장된 디렉터리를 지정하면 커스텀 태그와 같이 사용

> /WEB-INF/tags/printTokens.tag

```
<%@ tag pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@  attribute name="tokensString" type="java.lang.String" required="true" %>

<c:forEach var="token" item="${tokensString}">
	<c:out value="${token}" /><br>
</c:forEach>
```

> 태그파일 예

```html
<%@ taglib prefix="myTags" tagdir="/WEB-INF/tags" %>

<myTags:printTokens tokensString="스포츠,영화,음악">
```

- 태그파일을 이용하면 뷰에 관한 로직을 쉽게 공통화 할 수 있음
- 반복적으로 사용하는 UI 부품(페이지처리 or 달력)에 사용하면 좋음
	- handlebars에 partial와 같은 개념

### EL

- ${...}
- #{...}

```html
<span id="message">${message}</span>
```

- HttpServletRequest에 message라는 속성명으로 안녕하세요! 라는 문자열을 저장
- EL식은 XML 특수문자에 이스케이프처리를 하지 않음
	- JSTL이 제공하는 EL함수나 JSP 태그 라이브러리 활용

> 객체참조

- 자바빈즈 프로퍼티를 조회하는 경우 "속성명.프로퍼티명"을 지정
- 리스트나 배열요소를 조회하는 경우 "속성명[요소위치]"를 지정
- 맵 요소를 조회하는 경우 "속성명.키명" 또는 "속성명[키명]"을 지정

```html
<!-- 자바빈즈의 text프로퍼티를 조회 -->
<span id="message">${message.text}</span>

<!-- 리스트의 첫 번째 요소를 조회 -->
<span id="message">${message[0].text}</span>

<!-- 맵에서 sport 키를 조회 -->
<span id="message">${hobbyCodeList.sport}</span>

<!-- 맵에서 키명에 '.'이 포함된 경우에는 ['키명'] 형식으로 조회 -->
<span id="message">${message['guidance.termsOfUse']}</span>
```

> 사용 가능한 연산자

- 산술
	- \+
	- \-
	- \*
	- /
	- %
- 비교
	- ==
	- !=
	- \<=
	- \>=
	- \<
	- \>
	- empty
- 논리
	- &&
	- ||
	- !

> 사용 가능한 묵시적 객체

- pageContext
	- javax.servlet.jsp.PageContext 객체
- requestScope
	- PageContext에서 관리하는 객체를 저장한 Map 객체
- sessionScope
	- HttpServletRequest에서 관리하는 객체를 저장한 Map 객체
- sessionScope
	- HttpSession에서 관리하는 객체를 저장한 Map 객체
- applicationScope
	- ServletContext에서 관리하는 객체를 저장한 Map 객체
- param / paramValues
	- 요청 파라미터 값을 저장한 Map 객체
- header / headerValues
	- 요청 해더 값을 저장한 Map 객체
- cookie
	- 쿠기를 저장한 Map 객체
- initParam
	- ServletConext의 초기화 파라미터를 저장한 Map 객체

#### EL 함수










---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
