
<div class="pull-right">  업데이트 :: 2018.08.10 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [컨트롤러](#컨트롤러)
	* [컨트롤러 구현](#컨트롤러-구현)
	* [DI 컨테이너 등록](#di-컨테이너-등록)
	* [컨트롤러 클래스](#컨트롤러-클래스)
	* [핸들러 메서드](#핸들러-메서드)
	* [핸들러 메서드의 Param값](#핸들러-메서드의-param값)
	* [핸들러 메서드의 Return값](#핸들러-메서드의-return값)
	* [뷰 컨트롤러 이용](#뷰-컨트롤러-이용)

<!-- /code_chunk_output -->


### 컨트롤러

#### 컨트롤러 구현

- 컨트롤러 클래스
- 폼 클래스
- JSP와 같은 템플릿 파일 (뷰)

> 컨트롤러에서 처리할 내용

- 선언형 처리 : 메서드 시그니처를 참조해서 프론트 컨트롤러가 하는일
	- 요청 매핑
	- 요청 데이터 취득
	- 입력값 검사 수행
- 프로그래밍형 처리 : 컨트롤러 클래스의 메서드 안에서 하는 일
	- 입력값 검사 결과 확인
	- 비즈니스 로직 호출
	- 이동대상 확인 및 데이터 연계
	- 이동대상 지정

```java
// == 선언형처리 ==
@RequestMapping(path="/message", method=RequestMethod.GET) // 요청매핑
public String search(@Valid MessageSearchForm form/*요청데이터취득*/, BindingResult result) { // 입력검사수행

	// == 프로그래밍형처리 ==
	if(result.hasErrors()) { // 입력값검사 결과처리
		return 'message/searchForm';
	}

	List<Message> messages = service.search(form.getKeyword()); // 비즈니스 로직

	model.addAttribute("messages", messages); // 이동대상과 데이터 연계

	return "message/searchResult"; // 이동대상 지정
}
```

#### DI 컨테이너 등록

```java
@Configuration
@EnableWebMvc
@ComponentScan("example.app")
public class WebMvcConfig extends WebMvcConfigurerAdapter {

}
```

#### 컨트롤러 클래스

```java
@Controller
public class WelcomeController {

}
```

- 컴포넌트 스캔기능을 사용해 DI컨테이너에 빈으로 등록
- 요청을 처리하는 메서드(이후 핸들러 메서드로 표기)가 정의돼 있는 클래스로 인식

#### 핸들러 메서드

```java
@Controller
public class WelcomeController {
	@RequestMethod("/")
	public String home(Model model) {
		model.addAttribute("now", new Date());
		return "home";
	}
}
```

#### 핸들러 메서드의 Param값

> 주요타입

- Model
	- 이동대상에 전달할 데이터를 가지고 있는 인터페이스
- RedirectAttributes
	- 리다이렉트 대상에 전달할 데이터를 가지고 있는 인터페이스
- 폼클래스 등의 자바빈즈
	- 요청 파라미터를 가지고 있는 자바빈즈 클래스
- BindingResult
	- 폼 클래스의 입력값 검사 결과를 가지고 있는 인터페이스
- MultipartFile
	- 멀티파트 요청을 사용해 업로드된 파일 정보를 가지고 있는 인터페이스
- HttpEntity<?>
	- 요청해더와 응답본문을 가지고 있는 인터페이스
	- 요청본문은 HttpMessageConverter의 메커니즘을 사용해 임의의 타입으로 변환
- java.util.Locale
	- 클라이언트 로캘
- java.util.TimeZone / java.util.ZoneId (Java SE 8 이상)
	- 클라이언트 시간대
- java.security.Principal
	- 클라이언트 인증을 위한 사용자 정보를 가지고 있는 인터페이스
- UriComponentsBuilder
	- URL를 조립하기 위한 인터페이스
	- 커넥스트 경로로 기본 URL을 가지고 있는 객체가 전달
- SessionStatus
	- @SessionAttributes 사용 세션 스코트에 저장한 객체의 라이프사이클을 관리하는 인터페이스
	- 실제 세션값 설정과 설정완료여부만 확인

> 주요 애너테이션

- @PathVariable
	- URL에서 경로 변수 값을 가져오기 위한 애너테이션
- @MatrixVariable
 	- URL에서 매트릭스 변수값을 가져오기 위한 애너테이션
 	- 기본 설정에서는 사용불가
- @RequestParam
	- 요청 파라미터 값을 가져오기 위한 애너테이션
- @RequestHader
	- 요청 해더값을 가져오기 위한 애너테이션
- @RequestBody
	- 요청 바디값을 가져오기 위한 애너테이션
	- HttpMessageConverter구조를 사용해 지정한 타입으로 변환
- @CookieValue
	- 쿠기값을 가져오기 위한 애너테이션

> 정보 애너테이션

- @ModelAttribute
	- 모델에 저장된 객체를 인수로 받음
	- 인수가 자바빈즈형태라면 생략
- @Value
	- '${...}'와 같은 플레이스홀더로 대체된 값이나 '#{...}'과 같은 SpEL식의 실행결과를 인수로 받음

> 추가사항

- 인수타입이 String이나 Integer같은 간단한 타입인 경우 인수의 이름과 일치하는 요청 파라미터에서 값을 가져올수 있음
- 인수타입이 자바빈즈인 경우 자바빈즈의 기본 속성명과 일치하는 객체를 Model에서 가져올 수 있음
	- 만약 해당하는 객체가 Model에 없다면 기본 생성자를 호출해서 새로운 객체를 생성

#### 핸들러 메서드의 Return값

> 주요타입

- String
	- 이동대상의 뷰 이름 반환
- Model
	- 이동대상에 전달할 데이터 반환
- ModelAndView
	- 이동대상에 뷰이름과 이동대상에 전달할 데이터를 반환
- void
	- HttpServletResponse에 직접 응답데이터를 쓰거나
	- RequestToViewNameTranslator 매커니즘을 이용해 뷰 이름결정할때 사용
- ResponseEntity<?>
	- 응답해더와 응답본문에 직렬화된 객체를 반환
	- 반환한 객체를 HttpMessageConverter 메커니즘을 이용해 임의의 형식을 직렬화
- HttpHeaders
 	- 응답해더만 반환

> 주요 애너테이션

- @ModelAttribute
	- Model에 저장하는 객체를 반환
	- 반환값의 형이 자바빈즈인 경우 생략가능
- @ResponseBody
	- 응답본문에 직렬화하는 객체를 반환
	- 객체는 HttpMessageConverter의 매커니즘을 이용해 임의의 형식으로 직렬화ㄴ

#### 뷰 컨트롤러 이용

- 뷰만 호출하는 경우에 뷰 컨트롤러를 이용가능

```java
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("home");
	}
}
```

- addViewControllers 오버라이드
- addViewController에 경로 지정
- setViewName에 뷰 이름을 인수로 지정

```xml
<mvc:view-controller path="/" view-name="home" />
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
