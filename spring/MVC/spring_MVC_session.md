
<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [HTTP 세션](#http-세션)
* [세션 속성 (@SessionAttributes)](#세션-속성-sessionattributes)
* [세션 스코프 빈](#세션-스코프-빈)

<!-- /code_chunk_output -->

### HTTP 세션

- javax.servlet.http.HttpSession

> 세션에서 데이터를 관리하는 법

- @SessionAttributes(세션속성) 이용
  - 스프링 MVC의 org.springframework.ui.Model에 추가한 객체
- 세션 스코프 이용
  - HTTP 세션에 관리하고 싶은 객체를 DI 컨테이너에 세션 스코프 빈으로 등록
- HttpSession API 이용
  - HttpSession API( setAttribute, getAttribute, removeAttribute )를 직접 사용

### 세션 속성 (@SessionAttributes)

- @org.springframework.web.bind.annotation.SessionAttributes
  - 하나의 컨트롤러에서 여러 요청간에 데이터를 공유하는 경우 효과적

> 세션에 관리할 객체를 지정하는 방법

- 클래스명 지정 : 관리대상이 되는 클래스명을 types 속성에 지정
- 속성명 지정 : 관리대상이 되는 객체명을 names 속성에 지정

```java
@Controller
@RequestMapping("/accounts")
@SessionAttributes(types=AccountCreateForm.class)
public class AccountCreateController {

}
```

- HTTP 세션에 저장할 객체의 클래스를 @SessionAttributes의 타입속성에 지정
  - @ModelAttribute 애너테이션이 붙은 메서드나 Model의 addAttribute()를 통해 Model에 추가한 객체중에 저장

```java
@Controller
@RequestMapping("/accounts")
@SessionAttributes(name="password")
public class AccountCreateController {

}
```

- name 속성을 이용해서 세션에 저장할 객체의 속성명을 지정
  - 같은 클래스로 만들어지는 객체 중 관리할것과 관리하지 않을 것이 섞인 경우 사용

> 세션에 객체를 저장하고 저장된 객체를 이용하는 방법

- @SessionAttributes를 이용해서 객체를 HTTP 세션안에 관리하고 싶다면 Model에 저장
- Model에 저장한 객체 중에서 HTTP 세션에 관리하겠다고 지정한 객체만 HTTP 세션에 저장
- HTTP 세션에 관리되는 객체 중에서 HTTP 세션에 관리하겠다고 지정한 객체가 Model에 저장

```java
@Controller
@RequestMapping("/accounts")
@SessionAttributes(types=AccountCreateForm.class)
public class AccountCreateController {

  @ModelAttribute("accountCreateForm")
  public AccountCreateForm setUpAcccountCreateForm() {
    return new setUpAcccountCreateForm();
  }
}
```

- @ModelAttribute 메서드에서 반환한 객체가 Model에 저장
- @SessionAttributes에 저장한 types에 해당하므로 HTTP 세션에 저장

```java
@RequestMapping(path="create", method=RequestMethod.POST)
public String create(
  @Validated AccountCreateForm form,
  BindingResult result,
  @ModelAttribute("password") String password,
  RedirectAttributes, redirectAttributes) {
      // do something
      return "redirect:/account/create?complete";
}
```

- Model에서 객체를 받기 위한 인수를 선언
- 인수에 클래스명의 첫글자를 소문자로 바꾼 이름과 같은 객체가 설정
- Model에서 가져올 객체의 이름을 @ModelAttribute의 value속성에 지정가능
- 만약 해당객체가 Model(HTTP세션)에 존재하지 않으면 RequiredException 발생

> 세션에 저장된 객체의 삭제

```java
@RequestMapping(path="create", params="complete" method=RequestMethod.GET)
public String createComplete(SessionStatus sessionStatus) {
      sessionStatus.setComplete();
      return "account/createComplete";
}
```

- SessionStatus이 setComplete()로 세션처리가 완료됬을을 표시
  - @SessionAttributes에 관리되던 객체가 모두 삭제
  - SesstionStatus의 setComplete() 직후에 바로 객체가 삭제되는 것은 아님
    - 실제는 메서드의 처리가 완료된후에 프레임워크가 내부적으로 HTTP 세션에 객체를 삭제
  - Handler메소드후에 HTTP세션에서 객체가 삭제되지만, 뷰와의 연게영역(Model)에는 같은 객체가 남음
    - setComplete() 후에 이동한 뷰에서는 HTTP세션에서 삭제한 객체를 Model에서 참조가 가능

> 뷰에서 접근하는 방법

```html
이메일주소 : <c:out value="${accountCreateForm.email}" />
```

### 세션 스코프 빈

- 여러 컨트롤러에 걸쳐 화면을 이동해야 할 때, 컨트롤러 간에 데이터를 공유하는 매개체

> 세션 스코프 빈 정의

```java
@Component
@Scope(value="session", proxyMode=ScopedProxyMode.TARGET_CLASS)
public class Cart implements Serializable {

}
```

- 애너테이션이용방식

```java
@Bean
@Scope(value="session" proxyMode=ScopedProxyMode.TARGET_CLASS)
public Cart cart() {
  return new Cart();
}
```

- 자바이용방식

> 세션 스코프 빈 이용

```java
@Controller
@RequestMapping("/items")
public class ItemController {
  @Autowired
  Cart cart;
  // do something
}

@Controller
@RequestMapping("/cart")
public class CartController {
  @Autowired
  Cart cart;
  // do something
}

@Controller
@RequestMapping("/orders")
public class OrderController {
  @Autowired
  Cart cart;
  // do something
}
```

- 세션 스코프 빈을 컨트롤러에 인젝션

> 뷰에서 접근하는 방법

```html
<spring:eval var="cart" expression="@cart" />
<c:forEach var="cartItem" items="${cart.cartItems}">
  <!-- do something -->
</c:forEach>
```
















---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
