
<div class="pull-right">  업데이트 :: 2018.08.10 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Form Class](#form-class)
	* [폼 객체의 스코프](#폼-객체의-스코프)
	* [폼클래스 작성](#폼클래스-작성)
	* [HTML 포맷과 바인딩](#html-포맷과-바인딩)
	* [간단한타입과 바인딩](#간단한타입과-바인딩)
	* [간단한타입과 컬렉션과의 바인딩](#간단한타입과-컬렉션과의-바인딩)
	* [중첩된 자바빈즈와의 바인딩](#중첩된-자바빈즈와의-바인딩)
	* [자바빈즈의 컬렉션과 바인딩](#자바빈즈의-컬렉션과-바인딩)
	* [프로퍼티 값의 설정해제](#프로퍼티-값의-설정해제)

<!-- /code_chunk_output -->

### Form Class

- HTML 폼의 입력 필드 구조를 자바빈즈로 표현한 클래스
- 스프링 MVC는 폼객체를 통해 다음 값을 서버와 클라이언트 사이에서 연계(바인딩)하는 구조

#### 폼 객체의 스코프

- 요청 스코프 (Request Scopes)
  - 요청에서 객체를 공유하기 위한 스코프(기본값)
  - 객체를 요청 스코프로 취급하는 경우 특별한 구현은 필요 없음
  - 단순히 Model객체를 저장만 하면 요청 스코프의 객체로 취급
- 플래시 스코프 (Flash Scope)
  - PRG(Post/RedirectGet)패턴의 요청사이에서 객체를 공유하기 위한 스코프
    - Post와 리다이렉트 후의 GET과의 두 요청사이
    - 중복 된 양식 제출을 방지하여 user-agent(사용자)를 위한 보다 직관적인 인터페이스를 만드는 웹개발 디자인 패턴
		- 북마크와 새로고침 버튼을 예측가능한 방식으로 지원하여 중복된 양식 제출을 생성하지 않음
  - 객체는 일시적으로 HttpSession에 저장되어 리다이렉트 처리 완료 후에 자동으로 파기
- 세션 스코프 (Session Scope)
  - 같은 세션의 여러 요청에서 객체를 공유하기 위한 스코프
  - 객체는 HttpSession에 저장되어 명시적으로 파기하기까지 HttpSession에 계속 남음

> 요청 스코프

- 기본사용방식

> 플래시 스코프

- RedirectAttributes 객체를 추가
- addFlashAttribute 사용

```java
@RequestMapping(path="create", method=RequestMethod.PSOT)
public String create(
  @Validated AccountCreateForm form,
  BindigResult result,
  RedirectAttributes redirectAttributes) {
  redirectAttributes.addFlashAttribute(form); // PRG방식으로 처리
  return "redirect:/account/create?complete";
}

@RequestMapping(path="create", method=RequestMethod.GET, params="complete")
public String createComplete(AccountCreateForm) {
  return "account/complete";
}
```

- 플래시 스코프에 추가해서 리다이렉트 대상에 폼객체를 공유
- 플래시 스코프(Model)에서 취득한 폼객체가 설정

> 세션 스코프

```java
@Controller
@RequestMapping("account/create")
@SessionAttribute(type=AccountCreateForm.class) // 세션스코프에서 관리할 대상을 지정
public class AccountCreateController {

}
```

- 폼데이터를 <input type="hidden">을 사용해 여기저기 가지고 다니는 것이 어려운 경우
  - 폼 객체를 세션 스코프로 관리하는 방법을 고려

#### 폼클래스 작성

```java
public class AccountCreateForm implements Serializable {
  private static final log serialVersionUID = 123456789L;

  @NotNull
  @Size(min=1, max=50)
  private String name;

  @NotNull
  @Size(min=9, max=11)
  private String tel;

  @NotNull
  @DateTimeFormat(pattern="yyyy/MM/dd")
  private Date dateOfBrith;

  @NotNull
  @Size(min=9, max=256)
  private String email;

}
```
- HTMl 폼 입력 필드와 같은 구조
- Serializable 인터페이스를 구현 serialVersionUID 필드를 정의
  - serialVersionUID 구현이 필수인 것은 폼 객체를 세션 스코프에서 관리하는 경우
  - 스코프와 관계없이 구현하는 것이 좋음

#### HTML 포맷과 바인딩

> 폼 객체를 모델에 저장

```java
@RequestMapping("create")
public String form(Model model) {
  model.addAttribute(new AccountCreateForm());
  return "account/createForm";
}
```

> @ModelAttribute

```java
@ModelAttribute
public AccountCreateForm setUpForm() {
  return new AccountCreateForm();
}
@RequestMapping("create")
public String form(Model model) {
  return "account/createForm";
}
```
- @ModelAttribute를 붙인 메서드를 구현
- @ModelAttribute가 붙은 메서드는 핸들러 메서드가 호출되기 전에 실행
  - 이때 반환되는 객체가 Model에 저장
- Model에 추가할 때의 속성명은 @ModelAttribute의 value 속성에 지정할 수 있음
- 생략한 경우 기본 속성명이 적용, 예제의 경우 accountCreateForm(카멜케이스)이 속성명

> 폼객체와 저장된 폼객체와 HTML 객체를 연결

```html
<form:form ModelAttribute="accountCreateForm">
  <!-- skip -->
</form:form>
```

#### 간단한타입과 바인딩

- 기본형 (int, boolean 등등) 및 래퍼형(Integer, Boolean 등등)
- 값을 표현하는 타입(String, Date 등등)
- MultipartFile

> 간단한 타입의 프로퍼티와 바인딩하는 경우 HTML 폼의 필드명과 폼 클래스의 프로퍼티명을 일치시켜야함

```java
String name;

String tel;

Date dateOfBrith;

String email;
```

```html
<form:form modelAttribute="accountCreateForm">
  <span>이름</span><form:input path="name" /><br>
  <span>TEL</span><form:input path="tel" /><br>
  <span>생년월일</span><form:input path="dateOfBrith" /><br>
  <span>Email</span><form:input path="email" /><br>
  <!-- skip -->
</form:form>
```

#### 간단한타입과 컬렉션과의 바인딩

```java
List<String> roles;
```

```html
<input type="checkbox" name="roles" value="1"> 이용자
<input type="checkbox" name="roles" value="2"> 승인자
<input type="checkbox" name="roles" value="3"> 관리자
```

#### 중첩된 자바빈즈와의 바인딩

```java
public class AccountCreateForm implements Serializable {
  private static final long serialVersionUID = 123456789L;
  private AccountForm account;
  private CardForm card;
}

public class AccountForm implements Serializable {
  private static final long serialVersionUID = 123456789L;
  private String name;
  private String email;

}

public class CardForm implements Serializable {
  public static final long serialVersionUID = 1233456789L;
  private String no;
  private Date validMonth;
}
```

```html
<form:form modelAttribute="accountCreateForm">
  <span>이름</span><form:input path="account.name" /><br>
  <span>Email</span><form:input path="account.email" /><br>

  <span>번호</span><form:password path="card.no" /><br>
  <span>기간</span><form:input path="card.validMonth" /><br>
</form:form>
```

#### 자바빈즈의 컬렉션과 바인딩

```java
List<CardForm> cards;
```

```html
<form:form modelAttribute="accountCreateForm">
  <span>번호</span><form:password path="card[0].no" /><br>
  <span>기간</span><form:input path="card[0].validMonth" /><br>

  <span>번호</span><form:password path="card[1].no" /><br>
  <span>기간</span><form:input path="card[1].validMonth" /><br>
</form:form>
```

#### 프로퍼티 값의 설정해제

> 다음과 같은 작업은 요청 파라미터 자체가 전송되지 않음
> 폼 객체의 상태가 변경되지 않음

- 체크박스를 체크에서 해제
- 여러 선택가능한 셀렉트 박스를 선택에서 해제
- 입력항목을 활성에서 비활성으로
- 입력항목을 화면에 표시되지 않게 변경 (Dom상에서 삭제)

> 설정해제용 요청파라미터

- 이름의 앞에 '\_'를 붙인 것
- 폼 객체의 프로퍼티값에 null을 설정
- 폼 객체의 프로퍼티값에 데이터 바인딩용 요청 파라미터를 설정
- 결국 데이터바인딩용 요청파라미터가 전송되지 않은 프로퍼티는 값이 해제


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
