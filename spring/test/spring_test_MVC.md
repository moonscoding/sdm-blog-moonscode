
<div class="pull-right">  업데이트 :: 2018.08.22 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [스프링 MVC 테스트](#스프링-mvc-테스트)
* [MockMvc](#mockmvc)
	* [MockMvc 란](#mockmvc-란)
	* [MockMvc 설정](#mockmvc-설정)
* [테스트 실행](#테스트-실행)
* [요청 데이터 설정](#요청-데이터-설정)
* [실행 결과 검증](#실행-결과-검증)
* [실행 결과 출력](#실행-결과-출력)

<!-- /code_chunk_output -->

### 스프링 MVC 테스트

- 스프링 MVC 컨트롤러의 테스트
- 컨트롤러의 주요역할은 다양
  - 컨트롤러의 주요역할
    - 요청 경로
    - 처리내용의 매핑
    - 입력값 검사
    - 요청한 데이터의 취득
    - 비즈니스 로직 호출
    - 다음 이동 화면의 제어
  - 정작 컨트롤러 자체에는 단위 테스트가 필요할 만한 비즈니스 로직이 존재하지 않음
  - 스프링 MVC의 프레임워크 기능까지 통합된 상태인 통합 테스트의 관점으로 봐야함

> 통합한 상태에서 컨트롤러 테스트

- E2E(End to End)로 테스트
  - 뷰가 생성한 응답 데이터(HTML)의 유효성을 검증할 수 있다는 장점
  - 단점
    - 애플리케이션이나 데이터베이스를 반드시 기동
    - 트랜잭션이 커밋되기 떄문에 테스트를 실시하기 이전의 상태로 되돌릴 수 없음
    - 회귀 테스트를 실행하기 위해 Selenium등을 활용해서 테스트 케이스를 구현
- 스프링 테스트는 E2E의 단점을 해소하면서 통합한 상태의 컨트롤러 테스트를 위해 'MockMvc' 제공

### MockMvc

#### MockMvc 란

- 웹 애플리케이션을 애플리케이션 서버에 배포하지 않고도 스프링 MVC의 동작을 재현할 수 있는 클래스

> 흐름

- 테스트 케이스의 메서드는 DispathcherServlet에 요청할 데이터(요청경로나 요청파라미터)를 설정
- MockMvc는 DispathcherServlet에 요청을 보냄
  - DispathcherServlet은 테스트용으로 확장된 TestDispathcherServlet
- DispathcherServlet은 요청을 받아 매핑정보를 보고 그에 맞는 핸들러(컨트롤러) 메서드 호출
- 테스트 케이스 메서드는 MovkMvc가 반환하는 실행결과를 받아 실행 결과가 맞는지 검증

> MockMvc 모드

- 사용자 정의 DI 컨테이너 모드
- 단독모드

#### MockMvc 설정

> 사용자 정의 DI 컨테이너 모드

- 스프링 MVC의 설정을 적용한 DI 컨테이너를 만들어 이 DI 컨테이너를 사용해 스프링 MVC 동작 재현
- 애플리케이션 서버에 배포한 것과 같은 것 처럼 테스트 가능

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextHierarchy({
        @ContextConfiguration(classes = AppConfig.class),
        @ContextConfiguration(classes = WebMvcConfig.class)
})
@WebAppConfiguration
public class WelcomeControllerTest {

    @Autowired
    WebApplicationContext context;

    MockMvc mockMvc;

    @Test
    public void setUpMockMvc() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
    }
    // ..
}
```

- @ContextHierarchy
  - 테스트용 DI 컨테이너 만들 때 빈 정의 파일을 지정
    - AppConfig.class
    - WebMvcConfig.class
- @ContextConfiguration
  - 계층관계가 필요없다면 사용
- @WebAppConfiguration
  - 테스트할 DI 컨테이너를 웹 애플리케이션 전용 DI 컨테이너로 처리
- WebApplicationContext
  - 테스트할 Application Context를 인젝션
- MockMvc
  - 테스트할 컨텍스트를 지정한 MockMvc를 생성

> 단독 모드

- 스프링 MVC 설정을 '스프링 테스트' 측에서 처리
- 스프링 테스트가 생성된 DI 컨테이너를 사용해 스프링 MVC 동작을 재현
- 스프링 테스트의 각종 설정은 테스트 케이스 측에서 커스텀 가능
- 스프링 MVC 기능을 이용하면서도 단위 테스트 관점에서 컨트롤러 테스트

```java
public class WelcomeControllerTest {
    MockMvc mockMvc;

    @Before
    public void setUpMockMvc() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(new WelcomeController()).build();
    }
}
```

- 테스트 대상의 컨트롤러를 지정해 MockMvc 생성
- 필요에 따라 standaloneMockMvcBuilder() 호출하고 스프링 테스트의 설정을 커스텀

```java
MockMvc mockMvc;

@InjectMocks
MessageRestController controller;

@Mock
MessageService mockMessageService;

// == 단독모드 ==
@Before
public void setUpMockMvc() {
    MockitoAnnotations.initMocks(this);
    this.mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
}
```

- @InjectMocks
  - 테스트 대상의 컨트롤러에 지정
- @Mock / @Spy
  - 모의화하는 컴포넌트에 @Mock이나 @Spy 지정
- 테스트 대상의 컨트롤러(@InjectMocks)에 대해 모의화한 컴포넌트(@Mock)를 인잭션
- MockitoAnnotations.initMocks(this);
  - @RunWith(MockitoJUnitRunner.class) 같은효과
- 테스트 대상의 컨트롤러를 지정해 MockMvc를 생성

> 서블릿 필터 추가

- MockMvc에 서블릿 필터 추가 가능

```java
@Before
public void setUpMockMvc() {
    MockitoAnnotations.initMocks(this);
    this.mockMvc = MockMvcBuilders
            .standaloneSetup(controller)
            .addFilter(new CharacterEncodingFilter("UTF-8"))
            .build();
}
```

> static 메서드 임포트

```java
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
```

- MockMvcRequestBuilders
  - 요청 데이터를 설정할 때 사용할 static 메서드
- MockMvcResultMatchers
  - 실행 결과를 검증할 때 사용할 static 메서드
- MockMvcResultHandlers
  - 실행 결과를 로그 등으로 출력할 때 사용할 static 메서드

### 테스트 실행

- 컨트롤러를 호출할 때 필요한 요청 데이터를 설정
- MockMvc에 요청을 의뢰

> 컨트롤러 핸들러 메소드

```java
@RequestMapping(value = "/", method = RequestMethod.GET)
public String home() {
    return "index";
}
```

> 테스트 메소드

```java
@Test
public void testHome() throws Exception {
    mockMvc.perform(get("/"))
            .andExpect(status().isOk())
            .andExpect(forwardedUrl("/WEB-INF/index.jsp"));
}
```

- perform()
  - DispathcherServlet에 요청을 의뢰
  - MockMvcRequestBuilders를 사용해 설정한 요청 데이터를 perform()의 인수로 전달
  - get / post / fileUpload 와 같은 메서드 제공
  - perform()에서 반환된 ResultActions() 호출
  - 실행 결과 검증

### 요청 데이터 설정

- MockHttpServletRequestBuilder
- MockMultipartHttpServletRequestBuilderd의 팩토리 메서드

> MockHttpServletRequestBuilder 주요 메서드

- param / params
  - 요청 파라미터 설정
- header / headers
  - 요청 해더 설정
  - contentType & accept와 같은 특정 해더를 설정하는 메서드도 제공
- cookie
  - 쿠키 설정
- content
  - 요청 본문 설정
- requestAttr
  - 요청 스코프에 객체를 설정
- flashAttr
  - 플래시 스코프에 객체를 설정
- sessionAttr
  - 세션 스코프에 객체를 설정

> MockMultipartHttpServletRequestBuilderd 주요 메서드

- file
  - 업로드할 파일 지정

```java
@Test
public void testBooks() throws Exception {
  mockMvc.perform(get("books"))
    .param("name", "Spring")
    .accept(MediaType.APPLICATION_JSON)
    .header("X-Track-Id", UUID.randomUUID().toString())
    .andExpect(status().isOk());
}
```

### 실행 결과 검증

- ResultActions의 andExpect()
  - 인수에 실행결과를 검증하는 ResultMatcher 지정 (MockMvcResultMatchers에서 제공)

> MockMvcResultMatchers 주요 메서드

- status
  - HTTP 상태 코드 검증
- header
  - 응답 해더의 상태 검증
- cookie
  - 쿠키 상태 검증
- content
  - 응답 본문 내용 검증
  - jsonPath나 xpath와 같은 특정 콘텐츠를 위한 메서드도 제공
- view
  - 컨트롤러가 반환한 뷰 이름 검증
- forwardedUrl
  - 이동대상의 경로를 검증
  - 패턴으로 검증할떄는 forwardedUrlPattern 메서드를 사용
- redirectedUrl
  - 리다이렉트 대상의 경로 또는 URL 검증
  - 패턴으로 검증할때는 redirectedUrlPattern 메서드를 사용
- model
  - 스프링 MVC 모델 상태 검증
- flash
  - 플래시 스코프의 상태 검증
- request
  - 서블릿 3.0부터 지원되는 비동기 처리의 상태나 요청 스코프의 상태, 세션 스코프의 상태 검증

> 주의

- MockMvc에서 뷰나 HttpMessageConverter가 생성한 응답 본문을 검증할 수 있음
- JSP를 뷰로 사용할 때는 응답 분문이 언제나 비어 있어 그 결과를 검증할 수 없음

> 실행결과검증 구현

```java
@Test
public void testBooks() throws Exception {
  mockMvc.perform(get("books"))
          .andExpect(status().isOk())
          .andExpect(content().string("[{\"bookId\":\"1234\",\"name\":\"슬랙으로 협업하기\"}]"));
}
```

### 실행 결과 출력

- ResultActions의 andDo()
  - 인수에 실행 결과를 처리할 수 있는 ResultHandler 지정
  - 스프링 테스트는 MockMvc ResultHandler의 팩토리 클래스를 통해 다양한 ResultHandler 제공

> MockMvcResultHandlers

- log
  - 실행결과를 디버딩 레벨에서 로그로 출력
  - org.springframework.test.web.servlet.result
- print
  - 실행결과를 임의의 출력대상에 출력
  - 출력대상을 지정하지 않으면 기본으로 System.out 출력

```java
@Test
public void testBooks() throws Exception {
   mockMvc.perform(get("books"))
           .andExpect(status().isOk())
           .andDo(log());
}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
