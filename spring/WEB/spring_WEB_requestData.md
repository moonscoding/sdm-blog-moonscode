
<div class="pull-right">  업데이트 :: 2018.08.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [요청 데이터 취득](#요청-데이터-취득)
	* [경로변수값 (@PathVariable)](#경로변수값-pathvariable)
	* [요청파라미터값 (@RequestParam)](#요청파라미터값-requestparam)
	* [@RequestParam, @RequestHeader, @CookieValue](#requestparam-requestheader-cookievalue)
	* [컴파일옵션과 주의점](#컴파일옵션과-주의점)
	* [이용가능타입](#이용가능타입)
	* [WebDataBinder](#webdatabinder)
	* [애너테이션 사용 포맷지정](#애너테이션-사용-포맷지정)

<!-- /code_chunk_output -->


### 요청 데이터 취득

- 경로 변수 값 취득
  - @PathVariable을 사용해 특정 경로 변수 값을 취득
- 요청 파라미터 값 취득
  - @RequestParam을 사용해 특정 요청 파라미터 값을 취득
- 요청 해 더 값 취득
  - @RequestHeader를 사용해서 특정 요청 해더값을 취득
- 쿠기 값 취득
  - @CookieValue를 사용해서 쿠기값을 취득
- 요청 파라미터 값 일괄취득
  - 폼 클래스라 불리는 자바빈즈를 사용해 요청 파라미터를 자바빈즈 프로퍼티에 바인딩해서 취득


#### 경로변수값 (@PathVariable)

```java
@RequestMapping(path="accounts/{accountId}", method=RequestMethod.GET)
public String detail(@PathVariable String accountId) {

}
```
- value(path) 속성에 경로변수({변수명})를 선언
- 경로변수값을 취득할 인수에 @PathVariable를 지정

#### 요청파라미터값 (@RequestParam)

```java
@RequestMapping(path="detail", method=RequestMethod.GET)
public String detail(@RequestParam String format) {

}
```

- 요청파라미터는 취득하는 인수에 @RequestParam을 지정
- format이라는 이름(인수명)에 일치하는 파라미처 값으로 설정

#### @RequestParam, @RequestHeader, @CookieValue

- value
  - 값을 취득하는 파라미터명을 지정
  - 생략하는 경우에는 인수명이 파라미터명으로 적용
- name
  - value 속성의 별명
- required
  - 파라미터의 필수 여부를 지정
  - 생략한 경우에 true(필수)가 적용
  - 파라미터가 존재하지 않는 경우에 ServletRequestBindingException 발생, 400(Bad Request) 취급
- defaultValue
  - 파라미터가 존재하지 않는 경우(또는 파라미터가 공백인 경우)에 적용하는 기본값지정
  - 기본값을 지정한 경우 required 속성을 강제적으로 false

```java
@RequestMapping(path="accounts", method=RequestMethod.GET)
public String cart(
  @CookieValue("example.springbook.cartId") String cartId,
  @RequestHeader(name="X-Track-Id", required=false) String trackingId,
  @RequestParam(defaultValue=1) Integer page
) {

}
```

- required=false 대신 javaSE8에서 추가된 Optional 사용가능

```java
@RequestMapping(path="accounts", method=RequestMethod.GET)
public String cart(
  @CookieValue("example.springbook.cartId") String cartId,
  @RequestHeader(name="X-Track-Id") Optional<String> trackingId,
  @RequestParam(defaultValue=1) Integer page
) {

}
```

#### 컴파일옵션과 주의점

@PathVariable, @RequestParam, @RequestHeader, @CookieValeu의 value(name) 속성을 생략하고 싶다면

컴파일할때 -g 옵션 (디버깅정보를 출력하는 모드)

또는, javaSE8에서 추가된 -parameters 옵션(메서드 또는 파라미터에 리플렉션용 메타데이터를 생성하는 모드)를 사용

#### 이용가능타입

- 기본형 (int, boolean 등등) 및 래퍼타입(Integer, Boolean 등등)
- 값을 표현하는 타입 (String, Data 등등)
- MultipartFile
- 요청데이터는 컬랙션이나 배열로 취득할 수있음
- WebDataBinder 클래스 메소드를 통해 확장할 수 있음

#### WebDataBinder

- 바인딩 처리의 커스터마이징
- addCustomFormatter
  - Formatter 인터페이스를 구현해서 문자열을 임의의 타입으로 변환
- registerCustomEditor
  - PropertyEditor 인터페이스를 구현해서 문자열을 임의의 타입으로 변환

> @InitBinder 클래스

```java
@InitBinder
public void initBinder (WebDataBinder binder) {

}
```

- @InitBinder가 붙은 클래스 구현
- 스프링 MVC요청데이터의 바인딩을 수행하기전에 @InitBinder이 붙은 메서드 호출

> addCustomFormatter()

```java
@InitBinder
public void initBinder(WebDataBinder binder) {
  binder.addCustomFormatter(new DateFormatter("yyyyMMdd"));
}
```

> registerCustomEditor()

```java
@InitBinder
public void initBinder(WebDataBinder binder) {
  SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
  dateFormat.setLenient(false);
  binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, false));
}
```

> 특정 파라미터에 대해서만 커스텀 구현을 적용하는 예

```java
@RequestMapping(path="search", method=RequestMethod.GET)
public String search(@RequestParam targetData, Model model) {

}

@InitBinder
public void initBinder(WebDataBinder binder) {
  binder.addCustomFormatter(new DataFormatter("yyyyMMdd"), "targetDate");
}
// OR
@InitBinder("targetDate")
public void initBinder(WebDataBinder binder) {
  binder.addCustomFormatter(new DateFormatter("yyyyMMdd"))
}
```

#### 애너테이션 사용 포맷지정

- 파라미터 마다 '숫자'와 '날짜' 포맷을 지정할 때는 두 애너테이션을 사용해 직관적으로 파악
  - DateTimeFormat
    - 날짜/시간 포맷을 지정하기 위한 애너테이션
  - NumberFormat
    - 숫자나 통화 포맷을 지정하기 위한 애너테이션

> 폼클래스를 지정한예

```java
public class AccountCreateForm implements Serializable {
  @DateTimeFormat(pattern="yyyyMMdd")
  private Date dateOfBrith;
}
```

> 핸들러 메서드의 인수로 지정한예

```java
@RequestMapping(path="search", method=RequestMethod.GET)
public String search(
  @DateTimeFormat(pattern="yyyyMMdd") @RequestParam targetDate,
  Model model
)
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
