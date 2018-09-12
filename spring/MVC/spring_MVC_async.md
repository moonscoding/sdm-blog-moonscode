
<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [비동기 요청](#비동기-요청)
* [비동기 활성화 설정](#비동기-활성화-설정)
* [비동기 처리 구현](#비동기-처리-구현)
* [예외처리](#예외처리)
* [비동기 실행에 대한 공통처리](#비동기-실행에-대한-공통처리)

<!-- /code_chunk_output -->

### 비동기 요청

- 비동기 실행이 종료된 후에 HTTP응답을 하는 패턴
- 비동기 실행이 처리되는 중에 HTTP응답을 하는 패턴

 > 비동기 실행이 종료된 후에 HTTP응답을 하는 패턴

- 부하가 커서 시간이 많이 걸리는 처리를 애플리케이션 서버가 관리하는 스레드에서 분리된 스레드에서 실행하게 만듬
  - 애플리케이션 서버를 더 효율적으로 동작하게 만듬
- 실제로 HTTP응답은 비동기 처리가 완료된 후에 나오기 때문에 클라이언트 측에서 보면 동기 처리를 한 것처럼 보임

> 스프링 MVC가 이와 같은 패턴을 처리하는 방법

- 스프링 MVC의 스레드에서 비동기 처리를 하는 방법
  - 컨트롤러의 핸들러 매서드에서 Callable 타입을 반환
  - WebAsyncTask 타입을 반환할 수도
- 스프링 MVC 외의 스레드에서 비동기 처리를 하는 방법
  - 컨트롤러의 핸들러 메서드에서 DeferredResult 타입을 반환
  - ListenableFuture 타입을 반환할 수도
  - CompletableFuture 타입을 반환할 수도

> 비동기 실행이 처리되는 중에 HTTP응답을 하는 패턴

- 서버에서 임의의 타이밍에 데이터를 전송하고 싶을 때 사용
  - 서버측은 비동기 처리를 시작한 시점에 일단 HTTP 응답을 처리
  - 그 후에 비동기 처리중 임의의 타이밍에 응답 데이터를 전송
- 클라이언트가 분할응답(Transfer-Encoding)을 지원해야 가능

> 스프링 MVC가 이와 같은 패턴을 처리하는 방법

- 롱 폴링(Long Polling)을 이용한 비동기처리
  - 핸들러 메서드에서 ResponseBodyEmitter 타입을 반환
- SSE(Server-Sent Events)에 따른 비동기처리
  - 핸들러 메서드에서 SseEmitter 타입을 반환
  - 클라이언트가 'Content-Type: text/event-stream'같은 SSE를 지원해야 가능

### 비동기 활성화 설정

> web.xml 설정에서 활성화

```xml
<servlet>
  <!-- ASYNC -->
  <async-supported>true</async-supported>
</servlet>

<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>

    <!-- ASYNC -->
    <async-supported>true</async-supported>

    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
    <dispatcher>REQUEST</dispatcher>

    <!-- ASYNC -->
    <dispatcher>ASYNC</dispatcher>
</filter-mapping>
```

- 서블릿의 \<async-supported> 요소를 'true'로 설정해서 DispatcherServlet의 비동기 활성화
- 서블릿 필더의 처리 대상에 비동기 요청을 포함하고 싶은 경우에 \<dispatcher> 요초에 ASYNC 설정
- 필터의 \<async-supported> 요소를 'true'로 설정해서 서블릿 필터의 비동기 활성화

> 스프링 MVC에서 비동기 활성화

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {

  @Override
  public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
      configurer.setDefaultTimeout(5000);
  }
}
```

- @EnableWebMvc를 붙이면 비동기기능이 자동으로 활성화
- configureAsyncSupport() 재정의

> 스프링 MVC가 관리하는 스레드에서 비동기 처리할때 TaskExecutor를 커스터마이징

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {

  @Override
  public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
      configurer.setDefaultTimeout(5000);
      // == 스레드풀을 이용하도록 커스터마이징한 TaskExecutor를 설정 ==
      configurer.setTaskExecutor(mvcTaskExecutor());
  }

  @Bean
  public TaskExecutor mvcTaskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(5);
    executor.setMaxPoolSize(10);
    executor.setQueueCapacity(25);
    return executor;
  }
}
```

### 비동기 처리 구현

- CompletableFuture 이용 비동기 처리
- SseEmitter 이용한 Push형태의 비동기 처리

> CompletableFuture 이용

```java
@Async
public void save(InputStream in, File file) {
  // do something
}
```

```java
@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {

  @Bean
  public TaskExecutor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(5);
    executor.setMaxPoolSize(10);
    executor.setQueueCapacity(25);
    return executor;
  }
}
```

- @EnableWebMvc를 붙이면 @Async를 이용한 비동기 기능 활성화
- @Async가 기본적으로 사용하는 TaskExecutor는 요청마다 새로운 스레드를 생성하는 구현클래스
  - SimpleAsyncTaskExecutor
- 커스터마이징을 할때는 taskExecutor라는 빈의 이름으로 정의

```java
@Autowired
AsyncUploader asyncUploader;

@RequestMapping(path="upload", method=RequestMethod.POST)
public CompletableFuture<String> upload(MultipartFile file) {
  return asyncUploader.upload(file); // 비동기 처리 호출
}
```

```java
@Component
public class AsyncUploader {
  @Autowired
  UploadService uploadService;

  @Async
  public CompletableFuture<String> upload(MultipartFile file) {
    uploadService.upload(file); // 별도의 스레드에 실행할 만큼 무거운 처리
    return CompletableFuture.completedFuture("upload/complete");
  }
}
```

- 핸들러 메서드의 반환값으로 CompletableFuture를 반환
  - 타입 파라미터에 컨트롤러가 반환하는 타입을 지정
  - 예제는 이동할 뷰의 이름을 반환하고 있어서 String 이용
- 다른 스레드에서 수행하고 싶은 내용을 별도의 메서드로 만들어 @Async를 붙임
- @Async가 지정된 메서드의 반환값은 CompletableFuture의 타입 파라미터로 설정

> SseEmitter 이용

```java
@Autowired
GreetingMessageSender greetingMessageSender;

@RequestMapping(path="greeting", method=RequestMethod.GET)
public SseEmitter greeting() throws IOException, InterruptedException {
  SseEmitter emitter = new SseEmitter();
  greetingMessageSender.send(emitter);
  return emitter;
}
```

```java
@Component
public class GreetingMessageSender {
  @Async
  public void send(SseEmitter emitter) throws IOException, InterruptedException {

    // 1초 간격으로 이벤트를 전송
    emitter.send(emitter.event()
      .id(UUID.randomUUID().toString()).data("Good Morning"));
    TimeUnit.SECONDS.sleep(1);

    emitter.send(emitter.event()
      .id(UUID.randomUUID().toString()).data("Hello"));
    TimeUnit.SECONDS.sleep(1);

    emitter.send(emitter.event()
      .id(UUID.randomUUID().toString()).data("Good Night"));

    emitter.complete();
  }
}
```

- 핸들러 메서드의 반환값으로 SseEmitter를 반환
- @Async 지정된 메서드에서 이벤트를 전송
  - 클라이언트에 전송되는 이벤트는 핸들러 메서드의 반환값인 SseEmitter 객체의 메서드 사용

> 브라우저 (구글 크롬)에서 요청을 보내면 1초간격으로 이벤트가 발생해 브라우저에 반영

```
id : randomUUID
data : "Good Morning"

id : randomUUID
data : "Hello"

id : randomUUID
data : "Good Night"
```

### 예외처리

- 스프링 MVC ExceptionResolver가 예외를 처리
- 핸들러 메서드의 반환값으로 DeferredResult를 사용하는 경우
  - 반환할 DeferredResult의 setErrorResult() 인수에 발생한 예외를 설저

> DeferredResult 사용시 예외처리

```java
@Async
public void upload(MultipartFile file, DeferredResult<String> deferredResult) {
  try {
    // do something
    deferredResult.setResult("upload/complete");
  } catch(Exception e) {
    deferredResult.setErrorResult(e); // 발생한 예외를 DeferredResult에 설정
  }
}
```

### 비동기 실행에 대한 공통처리

- CallableProcessingInterceptor 인터페이스
- DeferredResultProcessingInterceptor 인터페이스

> 메서드 종류

- beforeConcurrentHandling : 비동기실행을 시작하기 직전 호출
- preProcess : 비동기실행을 시작한 직후에 호출
- postProcess : 비동기 실행의 처리 결과나 예외 객체가 설정된 직후에 호출
- handlleTimeout : 비동기 실행이 타임아웃될 때 호출
- afterCompletion : 비동기 실행의 처리가 종료될 떄 호출

> CallableProcessingInterceptor 구현

```java
public class CustomCallableProcessingInterceptor extends CallableProcessingInterceptor {
  @Override
  public <T> Object handlleTimeout(NativeWebRequest request, Callable<T> task) {
    return "error/timeoutError";
  }
}
```

> DeferredResultProcessingInterceptor 구현

```java
public class CustomDeferredResultProcessingInterceptor extends DeferredResultProcessingInterceptor {
  @Override
  public <T> boolean handlleTimeout(NativeWebRequest request, DeferredResult<T> deferredResult) {
    deferredResult.setResult((T) "error/timeoutError");
    return false;
  }
}
```

> 스프링 MVC 연동

```java
@Override
public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
  // do something

  configurer.registerCallableInterceptors(new CustomCallableProcessingInterceptor());
  configurer.registerDeferredResultInterceptors(new CustomDeferredResultProcessingInterceptor());
}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
