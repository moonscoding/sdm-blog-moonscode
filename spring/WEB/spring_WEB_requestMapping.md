
<div class="pull-right">  업데이트 :: 2018.08.10 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [요청매칭](#요청매칭)
	* [요청경로](#요청경로)
	* [경로패턴사용](#경로패턴사용)
	* [HTTP 메서드](#http-메서드)
	* [요청 파라미터](#요청-파라미터)
	* [요청 해더](#요청-해더)
	* [Content-Type 해더](#content-type-해더)
	* [Accept 해더](#accept-해더)

<!-- /code_chunk_output -->

### 요청매칭

- @RequestMapping

> 지정가능한속성

- value
  - 요청경로 ( 또는 경로 패턴 )을 지정
- path
  - value 속성의 별명을 지정
- method
  - HTTP 메서드값
- params
  - 요청 파라미터 유무나 파라미터값을 지정
- headers
  - 헤더 유무나 해더값을 지정
- consumes
  - Content-Type 해더값(미디어타입)을 지정
- produces
  - Accept 해더 값(미디어 타입)을 지정
- name
  - 매핑정보에 임의의 이름을 지정
  - 속성에 지정하는 값에 따라 매핑룰이 바뀌지 않음

#### 요청경로

```java
@Controller
@RequestMapping("accounts")
public class AccountController {

  @RequestMapping("me/email")
  public String showEmail(Model model) {

  }

  @RequestMapping({"he/email", "she/email"})
  public String showEmail(Model model) {

  }
}
```

- 클래스 레벨로 지정하면 기본경로로 취급
- 메서드 레벨로 지정하면 기본경로에 상대 경롤르 덧붙인 형태로 취급
  - 'accounts/me/email'
- 메서드 레벨을 복수로 지정도 가능
  - 'accounts/he/email' & 'accounts/she/email'

#### 경로패턴사용

- URL 탬플릿 형식의 경로 패턴
  - '/accounts/{accountId}'
- URL 템프릿 형식의 경로 패턴 + 정규 표혀식
  - '/accounts/{accountId:[a-f0-9-]{36}}'
- 앤트스타일의 경로 패턴
  - '/\*\*/acounts/me/email'

```java
@Controller
@RequestMapping("accounts")
public class AccountController {
  @RequestMapping("{accountId}")
  public String showAccount(@PathVariable String accountId, Model model) {

  }
}
```

- 경로상의 가변부를 '경로변수({경로벼수명}형식)'으로 지정

#### HTTP 메서드

- GET 메서드
  - 웹 페이지의 내용을 보거나 파일을 다운로드하는 것과 같이 서버에서 어떤 정보를 취득할때
  - 검색조건은 GET을 사용하는 것이 일반적
- POST 메서드
  - 서버에 어떤 정보를 전송할 때 사용

```java
@RequestMapping(path="{accountId}", method=RequestMethod.GET)
public String showAccount(@PathVariable String accountId, Model model) {

}
```

#### 요청 파라미터

- name
  - 지정한 파라미터가 존재하는 경우 매핑대상
- !name
  - 지정한 파라미터가 존재하지 않는 경우 매핑대상
- name=value
  - 파라미터값이 지정한 값에 해당하는 경우 매핑대상
- name!=value
  - 파라미터값이 지정한 값에 해당하지 않는 경우 매핑대상

```java
@RequestMethod(path="create", paraams="form")
public String form(Model model) {
    return "account/form";
}
```

- 요청 파라미터 유무 또는 요청 파라미터 값을 지정
- 파라미터명만 지정하고 있음
  - 'account/create?form=' 이라는 URL에 접근하면 form()가 실행
  - post를 사용하는 경우라면 요청본문에 form 이라는 파라미터가 포함되어 있으면 가능ㄴ

#### 요청 해더

```java
@RequestMapping(headers="X-Migration=true")
@ResponseBody
public Account postMigrationAccount(@Validated @RequestBody Account account) {

}
```

- 요청 해더 유무 또는 요청 해더 값을 지정
- X-Migration 해더값에 true를 지정하고 접근하면 다음 메서드가 실행

#### Content-Type 해더

- Content-Type 해더값을 매핑조건으로 지정하는 경우 consumes 속성을 사용

> consums 속성이 지원하는지정형식

- mediaType
  - 미디어타입이 지정한 값인 경우 매핑대상
- !mediaType
  - 미디어타입이 지정한 값이 아닌 경우 매핑대상

```java
@RequestMapping(consumes="application/json")
@ResponseBody
public Account postAccount(@Validated @RequestBody Account account) {

}
```

- 속성값에 여러개 미디어 타입 지정 가능 (OR조건)

#### Accept 해더

- Accept 해더종류
  - Accept :: 클라이언트가 우선적으로 받아들이는 미디어 형을 명시	(Accept: text/\*, text/html;level=1)
  - Accept-Charset :: 클라이언트가 우선하는 문자 세트를 지정
  - Accept-Encoding :: 클라이언트가 우선하는 인코딩 방식를 지정
  - Accept-Languaue :: 클라이언트가 우선적으로 지원하는 언어를 지정 (en, fr, kr 등등)
- Accept 해더값을 매핑조건으로 지정하는 경우 produce 속성에서 지원하는 속성 형식은 comsumes와 같음

```java
@RequestMapping(path="create", produces="application/json")
@ResponseBody
public Account postAccount(@Validated @RequestBody Account account) {

}
```

- 응답 본문의 미디어타입을 지정
- JSON (미디어 파입이 application/json)을 받을 수 있는 클라이언트가 접근하면 메서드가 실행
- 속성값에 여러개 미디어 타입 지정 가능 (OR조건)










---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
