
<div class="pull-right">  업데이트 :: 2018.08.15 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [화면이동](#화면이동)
	* [이동대상지정](#이동대상지정)
	* [리다이렉트](#리다이렉트)
	* [요청파라미터지정](#요청파라미터지정)
	* [경로변수지정](#경로변수지정)
	* [요청경로로 포워드](#요청경로로-포워드)
	* [뷰와의 데이터 연계](#뷰와의-데이터-연계)
	* [리다이렉트와 데이터연계](#리다이렉트와-데이터연계)

<!-- /code_chunk_output -->

### 화면이동

#### 이동대상지정

- 핸들러의 메서드 뷰이름( 이동대상에 할당된 논리적 이름 )을 반환하도록 만듬
- 뷰 이름을 반환하면 스프링 MVC가 ViewResolver를 통해 뷰 이름과 연결

```java
@Controller
public class WelcomeControlller {
  @RequestMapping("/")
  public String home() {
    return "home";
  }
}
```

- 핸들러 메서드의 반환값으로 뷰 이름을 반환

#### 리다이렉트

```java
@Controller
public class WelcomeController {
  @RequestMapping("/")
  public String home() {
    return "redirect:/menu";
  }
}
```

#### 요청파라미터지정

```java
@RequestMapping(path="create", method=RequestMethod.POST)
public String create(
  @Validated AccountCreateForm form,
  BindingResult result,
  RedirectAttributes redirectAttributes
) {
    redirectAttributes.addAttribute("accountId", createdAccount.getAccountId());
    return "redirect:/account/create?complete";
}
```

- RedirectAttributes의 addAttribute()를 이용 요청파라미터를 저장
- 결과적으로 "/account/create/complete&accountId=A00001"과 같은식으로 처리

#### 경로변수지정

```java
@RequestMapping(path="create", method=RequestMethod.POST)
public String create(
  @Validated AccountCreateForm form,
  BindingResult result,
  RedirectAttributes redirectAttributes
) {
    redirectAttributes.addAttribute("accountId", createdAccount.getAccountId());
    return "redirect:/account/{accountId}?createComplete";
}
```

- RedirectAttributes의 addAttribute()를 이용 경로변수에 들어갈 값을 저장
- 결과적으로 "/account/A00001/createComplete"과 같은식으로 처리

> 뷰의 캐시 구조를 효율적으로 활용하기 위해 RedirectAttributes를 사용해야함

#### 요청경로로 포워드

```java
@Controller
@RequestMapping("auth")
public class AutoController {
  @RequestMapping("login")
  public String login(
    @Validated LoginForm form,
    BindingResult result
  ){
    if(result.hasErrors()) {
      return "auth/loginForm";
    } else {
      return "forward:/auth/authenticate"; // 이동대상의경로를 지정
    }
  }
}
```

#### 뷰와의 데이터 연계

- 뷰처리에 필요한 데이터(자바객체)는 Model에 저장해야 연계가 가능
- Model에 자바객체를 저장하면 스프링 MVC가 뷰에서 접근할 수 있는 영역
  - JSP라면 HttpServletRequest에 자바 객체를 익스포트해줌

> 자바 객체를 Model에 저장하는 방법

- Model API를 직접 호출
- ModelAttribute 애너테이션이 붙은 매서드를 준비

> 스코프

- Model에 저장하는 객체
  - 요청스코프
  - 플래시스코프
  - 세션스코프

> Model API를 사용 Model을 저장

```java
@RequestMapping("{accountId}")
public String detail(@PathVariable String accountId, Model model) {
    Account account = accountService.findOne(accountId);
    model.addAttribute(account); // 명시적추가
    return "account/detail";
}
```

- 속성명을 생략하면 클래스명을 자바빈즈 프로퍼티의 명명규칙에 따라 속성명이 생성
  - com.myapp.Product -> product
  - com.myapp.MyProdduct -> myProduct
  - com.myapp.UKProject -> UKProject
- org.springframework.core.Conventions 클래스의 getVariableName(Object)가 사용

> @ModelAttribute

```java
@ModelAttribute
public Account setUpAccount(@PathVariable String accountId) {
  return accountService.findOne(accountId);
}

@RequestMapping("{accountId}")
public String detail() {
  return "account/detail";
}
```

- @ModelAttribute를 붙인 메서드가 먼저 실행
- @ModelAttribute의 value로 속성명지정가능

> 뷰에서 접근

```html
성명 : <c:out value="${account.name}" />
```
- JSP에서 Model에 저장한 자바 객체에 접근할때
- 요청스코프에 저장돼 있는 자바객체에 접근
- EL을 사용해서 account라는 속성명으로 저장된 자바빈즈에 name 프로퍼티값을 가져옴

#### 리다이렉트와 데이터연계

- 리다이렉트하기 전에 리다이렉트될 컨트롤러나 뷰에서 사용할 데이터 저장
  - org.springframework.web.servlet.mvc.support.RedirectAttributes
- RedirectAttributes에 저장된 객체가 플래시스코프에 관리
- 리다이렉트된 후의 GET요청과정에서 Model에 저장한 값이 익스포트

```java
@RequestMapping(path="create", method=RequestMethod.POST)
public String create(
  @Validated AccountCreateForm form,
  BindingResult result,
  RedirectAttributes redirectAttributes
) {
  Account createdAccount = accountService.create(...);
  redirectAttributes.addFlashAttribute(createdAccount);
  return "redirect:/account/create?complete";
}

@RequestMapping(path="create", method=RequestMethod.GET, params="complete")
public String createComplete() {
  return "account/createComplete";
}
```

- RedirectAttributes의 addFlashAttribute()로 자바객체를 RedirectAttributes(플래시스코프)에 저장
- RedirectAttributes에 추가할때, 속성명은 생략할 수 있음
- 생략한 경우 기본 속성명이 적용
- createComplete()가 호출되기전에 create()에서 추가한 자바객체가 플래시스코프에서 Model에 익스포트되어 사용가능


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
