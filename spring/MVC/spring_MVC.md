
<div class="pull-right">  업데이트 :: 2018.08.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [스프링 MVC](#스프링-mvc)
* [웹 애플리케이션 개발특징](#웹-애플리케이션-개발특징)
* [MVC 특징](#mvc-특징)

<!-- /code_chunk_output -->

### 스프링 MVC

- Model : 애플리케이션 상태(데이터)나 비즈니스 로직을 제공
- View : 모델이 보유한 애플리케이션 상태(데이터)를 참조하고 클라이언트에 반환할 응답데이터를 생성
- Controller : 요청을 받아 모델과 뷰의 호출을 제어, 요청과 응답의 처리흐름을 제어

### 웹 애플리케이션 개발특징

- POJO(Plain Old Java Objecct) 구현
  - 컨트롤러나 모델등의 클래스는 POJO 형태로 구현
  - 특정 프레임워크에 종속적일 필요가 없어 단위테스트에 유리
- 애너테이션을 이용한 정의 정보 설정
  - 요청 매핑과 같은 각종 정보를 설정파일이 아닌 애너테이션 방식으로 설정
  - 비즈니스 로직과 그 로직을 수행하기 위한 각종 정의정보를 자바 파일안에서 함께 기술
- 유연한 메서드 시그니처 정의
  - 컨트롤러 클래스의 메서드 매개변수에는 처리에 필요한 것만 골라서 정의
  - 인수에 지정할 수 있는 타입도 다양한 타입이 지원
  - 프레임워크가 인수에 전달하는 값을 자동으로 담아주거나 변환하기 떄문에 사양변경이나 리팩토링에 강함
- Servlet API 추상화
  - 서블릿 API를 추상화하는 기능 제공
    - HttpServletRequest, HttpServletResponse, HttpSession 등의 API
  - 컨트롤러 클래스 구현에서 서블릿 API를 직접 사용하는 코드가 제거
    - 컨트롤러 클래스의 테스트가 서블릿 API를 사용할때보다 상대적으로 쉬움
- 뷰 구현 기술의 추상화
  - 컨트롤러는 뷰 이름을반환
  - 스프링 MVC는 뷰 이름에 해당하는 화면이 표시
  - 컨트롤러는 뷰의 이름만 알면 되기 때문에 그 뷰가 어떤 구현 기술로 만들었는지 모름
    - JSP, 타임리프, 서블릿 API, 프리마커 등등
- 스프링 DI 컨테이너와의 연계
  - DI컨테이너 상에서 동작하는 프레임워크
  - DI컨테이너가 제공하는 DI나 AOP같은 구조를 그대로 활용

> 구현예제

```java
@Controller // DI 컨테이너와의 연게
public class WelComeController { // POJO (=프레임워크에서제공하는 인터페이스 구현은 불필요)

  @Autowired // DI 컨테이너와의 연게
  MyService myService;

  @RequestMapping("/") // 애너테이션에서 정의정보를 지정
  public String home(Model model)  { // 유연한 인수 정의
    Data now = myService.getCurrentData();
    model.addAttribute("now", now); // 서블릿 API에 의존하지 않는 구현
    return "home"; // 부 구현기술에 의존하지 않는 뷰 이름 지정
  }
}
```
### MVC 특징

- 풍부한 확장 포인트 제공
- 엔터프라이즈 애플리케이션에 필요한 기능 제공
- 서드파티 라이브러리와의 연계 지원

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
