
<div class="pull-right">  업데이트 :: 2018.08.22 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [스프링 테스트](#스프링-테스트)
* [DI 컨테이너와 빈의 테스트](#di-컨테이너와-빈의-테스트)
	* [빈의 단위 테스트](#빈의-단위-테스트)
	* [의존컴포넌트의 모의화](#의존컴포넌트의-모의화)
	* [DI 컨테이너에서의 빈의 통합테스트](#di-컨테이너에서의-빈의-통합테스트)
* [스프링 TestContext 프레임워크](#스프링-testcontext-프레임워크)
* [DI 컨테이너 설정](#di-컨테이너-설정)
* [DI 컨테이너의 라이프사이클 제어](#di-컨테이너의-라이프사이클-제어)
* [프로파일 지정](#프로파일-지정)
* [테스트용 프로퍼티 값 지정](#테스트용-프로퍼티-값-지정)

<!-- /code_chunk_output -->

### 스프링 테스트

> 기능

- Junit, TestNG 라는 테스팅 프레임워크 사용해서 스프링의 DI 컨테이너 동작
- 트랜젹션을 테스트 상황에 맞게 제어
- 애플리케이션 서버를 사용치 않고 스프링 MVC 동작을 재현
- 테스트 데이터를 적재하기 위해 SQL을 실행
- RestTemplate을 이용해서 HTTP 요청에 대한 임의의 응답을 보내는 기능

### DI 컨테이너와 빈의 테스트

> 다음과 같은 애너테이션을 테스트 하는 모듈

- @Controller
- @Service
- @Repository
- @Component

> Junit 설정

```xml
<dependency>
   <groupId>junit</groupId>
   <artifactId>junit</artifactId>
   <scope>test</scope>
</dependency>
```

#### 빈의 단위 테스트

- 단위테스트
  - 스프링 DI 컨테이너 기능을 사용하지 않고 테스트 대상 클래스에서 구현한 로직으로만 테스트
  - 외부 참조 없이 하드코딩된 고정 메시지를 반환하는 클래스를 Junit 테스트

```java
@Service
public class MessageService {
  public String getMessage() {
    return "Hello!";
  }
}
```

```java
import static org.hamcrest.core.Is.*;
import static org.junit.Assert.*;

public class MessageServiceTest {
  @Test
  public void testGetMessage() {
    MessageService service = new MessageService();
    String actualMessage = service.getMessage();
    assertThat(actualMessage, is("Hello!"));
  }
}
```

- 실제로는 고정메세지가 아닌 동적메시지를 가져오는 클래스가 일반적

> MessageSource에서 메세지를 취득하는 클래스

```java
@Service
public class MessageService {

  @Autowired
  MessageSource messageSource;
	
  public String getMessageByCode(String code) {
    return messageSource.getMessasge(code, null, Localle.getDefault());
  }
}
```

- 실제 운영환경일 경우
  - MessageSource에 ResourceBundleMessageSource를 사용해서 외부 정의된 메시지를 가져옴

#### 의존컴포넌트의 모의화

```xml
<dependency>
   <groupId>org.mockito</groupId>
   <artifactId>mockito-core</artifactId>
   <scope>test</scope>
</dependency>
```

```java
import static org.hamcrest.core.Is.*;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class MessageServiceTest {
  @InjectMocks
  MessageService service;

  @Mock
  MessageSource mockMessageSource;

  @Test
  public void testGetMessageByCode() {
    deReturn("Hello!").when(mockMessageSource)
      .getMessage("greeting", null, Locale.getDefault());

    // 테스트
    String actualMessage = service.getMessageByCode("greeting");
    assertThat(actualMessage, is("Hello!"));
  }
}
```

- MockitoJUnitRunner를 이용 테스트할 컴포넌트(@InjectMocks)에 모의화한 컴포넌트(@Mock/@Spy)를 인젝션
- MessageSource의 Mock을 설정
  - "greeting"이라는 코드가 지정될때 "Hello!"를 반환하도록 설정

#### DI 컨테이너에서의 빈의 통합테스트

- 단위테스트를 통과한 클래스는 스프링의 DI 컨테이너에 등록
- 다른 컴포넌트까지 통합된 상태에서 통합테스트를 진행
  - 기본적으로는 DB와 같은 외부 리소스의 접근까지 포함해서 테스트
  - Mock이나 Stub으로 대체가능

> 빈 정의파일 작성

```java
@Configuration
@ComponentScan("example.domain")
public class AppConfig {

    @Bean // MessageSource의 빈정의
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasenames("messages");
        return messageSource;
    }
}
```

> messages.properties

```
greeting=Hello!
```

> 의존성 주입

- 스프링 테스트 모듈 의존성 모듈에 추가

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-test</artifactId>
  <scope>test</scope>
</dependency>
```

> 통합 테스트용 테스트 케이스 클래스

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = AppConfig.class)
public class MessageServiceIntegrationTest {

    @Autowired
    MessageService service;

    @Test
    public void testGetMessageByCode() {
        String actualMessage = service.getMessageByCode("greeting");
        assertThat(actualMessage, is("Hello!"));
    }
}
```

- @RunWith의 value속성에 Junit 테스트용 DI 컨테이너를 동작하기 위한 Runner 클래스를 지정
- @ContextConfiguration의 classes 속성에 DI 컨테이너가 사용하는 설정 클래스를 지정
- @Autowired를 사용해서 DI 컨테이너에 등록할 테스트 대상 빈을 인젝션
- 인젝션된 빈의 메서드를 호출해서 DI 컨테이너에 의해 의존 관계가 결합된 컴포넌트를 테스트

### 스프링 TestContext 프레임워크

- 스프링 테스트에서 테스팅 프레임워크에서 동작하는 테스트용 프레임워크의 기능
- 스프링 제공 애너테이션, 자바 표준애너테이션, 스프링 테스트 제공 테스트용 애너테이션등을 사용

> 스프링 JUnit 러너와 룰

- org.springframwork.test.context.junit4.SpringJUnit4ClassRunner
  - JUnit에서 스프링 TestContext 프레임워크를 동작시키기 위한 지원 클래스
  - @RunWith의 value 속성에 SpringJUnit4ClassRunner.class를 지정
  - 단, @RunWith에는 하나의 Runner 클래스만 지정가능
    - 서드파티에서 제공하는 Runner 클래스를 함께 사용 불가
    - SpringClassRule과 SpringMethodRule을 활용하면 함께 사용할 수 있음

```java
@RunWith(MockitoJUnitRunner.class) // 다른러너지정
@ContextConfiguration(classes = AppConfig.class)
public class MessageServiceIntegrationTest {
  @ClassRule
  public static final SpringClassRule SPRING_CLASS_RULE = new SpringClassRule();

  @Rulle
  public final SpringMethodRule springMethodRule = new SpringMethodRule();
}
```

### DI 컨테이너 설정

- @org.springframwork.test.context.ContextConfiguration
  - 스프링 TestContext 프레임워크에 DI 컨테이너를 생성
  - classes 속성이나 localtions 속성으로 빈 정의 파일을 지정
    - 다음 속성들은 생략이 가능

```java
@ContextConfiguration(classes = AppConfig.class)
public class MessageServiceIntegrationTest {

}
```

> 기본 테스트 환경 설정

```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class MessageServiceIntegrationTest {
  @Configuration
  static class LocalContext {
    // 빈정의 생략
  }
}
```

- @ContextConfiguration 속성 생략
- @Configuration이 붙은 static 설정 클래스 생성
- 만약 classes나 values를 명시하지 않았다면
  - 테스트 케이스 클래스 안에 내부 클래스로 정의된 static 설정 클래스의 정보를 사용
  - 명명 규칙을 만족하는 XML 파일 정보 사용
  - MessageServiceIntegrationTest일 때
    - com/example/domain/MessageServiceIntegrationTest-context.xml이라는 파일이 클래스 패스에 있어야함

> 웹 애플리케이션의 환경 설정

- @ContextConfiguration를 사용하는 방법외 @WebAppConfigration을 사용하는 방법
  - 웹 애플리케이션 전용 DI 컨테이너를 만들 수 있음
  - 프로젝트의 src/main/webapp 디렉터리가 웹 애플리케이션의 루트 디렉터리로 인식
    - 메이븐이나 그레이들이 정한 표준 웹 애플리케이션의 루트 디렉터리와 같음
  - 서블릿 API를 사용한 각종 목 객체도 테스트 케이스 클래스에 주입해서 활용 가능
    - 사전 설정 작업이나 테스트 결과를 검증해야 할때, 서블릿 API를 사용해야 하는 상황에서 유용
    - 종류
      - MockServletContext
      - MockHttpSession
      - MockHttpServletRequest
      - MockHttpServletResponse

```java
@WebAppConfiguration
public class WebApplicationIntegrationTest {

    @Autowired
    MockServletContext mockServletContext;

    @Autowired
    MockHttpSession mockHttpSession;

    @Autowired
    MockHttpServletRequest mockHttpServletRequest;

    @Autowired
    MockHttpServletResponse mockHttpServletResponse;

}
```

### DI 컨테이너의 라이프사이클 제어

> DI 컨테이너의 캐시

- 기본적으로 같은 테스트 케이스 클래스의 테스트 메서드 간에는 같은 DI 컨테이너가 사용
- 테스트 케이스의 클래스가 다른 경우에도 @ContextConfiguration에 지정한 속성값이 같으면 캐시된 DI 컨테이너 사용
- @ContextConfiguration 빈정의 파일을 여러개 지정할때 순서에 유의
  - 파일들이 같은파일이라도 지정하는 순서가 달라지면 앞에서 캐시된 것을 사용하지 못하고 새로운 컨테이너 생성
  - 순서를 다르게 쓰기만 해도 불필요한 DI 컨테이너가 만들어지면ㅅ 테스트 시간이 길어지거나 메소리소모가 발생

> DI 컨테이너의 파기

- 기본적으로 테스트에 사용되는 DI컨테이너는 자바 VM이 시작할 때 만들어 지고 종료될때 파기
- DirtiesContext를 이용해 제어
- 테스트 케이스의 클래스단위로 DI컨테이너를 제어하고 싶다면 클래스레벨에 @DirtiesContext 선언
  - classMode 속성에 파기 타이밍을 지정
    - 테스트 케이스 클래스의 테스트가 종료된 후 (기본값)
    - 테스트 케이스 클래스의 테스트가 실행되기 전
    - 테스트 케이스 클래스의 각 메서드가 실행되기 전
    - 테스트 케이스 클래스의 각 메서드가 종료된 후

> 테스트 케이스 클래스의 모든 테스트가 종료한 타이밍에 파기

```java
@DirtiesContext
publlic class MessageServiceIntegrationTest {

}
```

> 테스트 메서드가 종료된 타이밍에 파기

```java
@Test
@DirtiesContext
public void testGetMessageByCode() {

}
```

### 프로파일 지정

- @ActiveProfiles를 사용해서 테스트
  - 테스트할때 원하는 프로파일을 지정할 수 있음

```java
@Configuration
@Profile("dev")
public class DevContext {
  @Bean
  public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder().setType(EmbeddedDatabaseType.H2).build();
  }
}
```

```java
@Configuration
@Profile("default") // 기본값(개발자 로컬 환경 외)의 빈 정의
public class DevContext {
  @Bean
  public DataSource dataSource() throws NamingException {
    JndiTemplate jndiTemplate = new JndiTemplate();
    return jndiTemplate.lookup("jdbc/dataSource", DataSource.class);
  }
}
```

- JUnit에서 테스트를 진행시 서버의 데이터소스를 사용할 수 없어 @ActiveProfiles을 통해 DevContext활성화

```java
@ActiveProfiles("dev") // 적용할 프로파일 지정
public class AccountServiceIntegrationTest {

}
```

- 프로파일을 명시적으로 지정하지 않았다면 'default'라는 이름의 프로파일이 기본으로 적용
- 앞서 예를 든 빈 정의 예에서 프로파일을 생략하면 DefaultContext가 활성화, 서버의 데이터소스를 사용

### 테스트용 프로퍼티 값 지정

- @TestPropertySource
  - 프로파티에서 값을 가져오는 클래스에서 프로퍼티 값을 다양하게 바꿔가면서 테스트해야 할 때
    - 시스템 프로퍼티 (자바 VM의 -D 옵션)
    - 프로퍼티 파일
  - 테스트 케이스의 클래스 단위로 테스트할 프로퍼티 값을 설정해 줄 수 있음
  - 테스트 대상 클래스로 failureCountToLock의 값을 프로퍼티에서 가져오거나 없으면 기본값사용

```java
public class AuthenticationService {
  @Value("${auth.failureCountToLock:5}")
  int failureCountToLock;
}
```

- 애너테이션에 지정
- 프로퍼티 파일에 지정

> 애너테이션 지정

```java
@TestPropertySource(properties = "auth.failureCountToLock=3")
public class AuthenticationServiceIntegrationTest {

}
```

> 프로퍼티에 지정

```java
@TestPropertySource(location = "/test.properties")
public class AuthenticationServiceIntegrationTest {

}
```

```
auth.failureCountToLock=3
```

- location 속성과 properties 속성을 생략하려면 명명규칙을 만족하는 프로퍼티 파일이 사용
  - AuthenticationServiceIntegrationTest -> com/example/domain/AuthenticationServiceIntegrationTest.properties


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
