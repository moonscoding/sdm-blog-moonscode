


<div class="pull-right">  업데이트 :: 2018.08.20 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [REST API 오류응답](#rest-api-오류응답)
* [스프링 MVC 에외 핸들러](#스프링-mvc-에외-핸들러)
* [예외클래스 추가](#예외클래스-추가)
* [입력값 검사 예외의 처리](#입력값-검사-예외의-처리)
* [서블릿컨테이너에 전달된 오류의 응답](#서블릿컨테이너에-전달된-오류의-응답)

<!-- /code_chunk_output -->

### REST API 오류응답

> Json 오류 응답

```json
{
  "message" : "Not Found",
  "documentation_url" : "http://developer.github.com/v3"
}
```

> 오류를 담을 자바빈즈

```java
public class ApiError implements Serializable {

    private static final long serialVersionUID = -8119817744873562082L;

    private String message;

    @JsonProperty("documentation_url")
    private String documentationUrl;
}
```

### 스프링 MVC 에외 핸들러

```Java
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    private ApiError createApiError(Exception ex) {
        ApiError apiError = new ApiError();
        apiError.setMessage(ex.getMessage());
        apiError.setDocumentationUrl("http://example.com/api/errors");
        return apiError;
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
            Exception ex,
            Object body,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        ApiError apiError = createApiError(ex);
        return super.handleExceptionInternal(ex, apiError, headers, status, request);
    }
}
```
- ResponseEntityExceptionHandler
  - 스프링 MVC에서 발생하는 예외를 처리하기 위한 @ExceptionHandler 메서드 구현
- createApiError
  - 오류정보를 담을 객체를 만드는 메서드
- handleExceptionInternal
  - 메소드 재정의한 후에 원하는 정보를 담아서 ResponseEntity 반환

> 오류 메세지를 가져오는 방법

```java
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    private final Map<Class<? extends Exception>, String> messageMappings =
            Collections.unmodifiableMap(new LinkedHashMap() {
                {
                    put(HttpMessageNotReadableException.class, "Request body is invalid");
                }
            });

    private String resolveMessage(Exception ex, String defaultMessage) {
        return messageMappings.entrySet().stream()
                .filter(entry -> entry.getKey().isAssignableFrom(ex.getClass()))
                .findFirst().map(Map.Entry::getValue).orElse(defaultMessage);
    }

    private ApiError createApiError(Exception ex) {
        ApiError apiError = new ApiError();
        apiError.setMessage(resolveMessage(ex, ex.getMessage()));
        apiError.setDocumentationUrl("http://example.com/api/errors");
        return apiError;
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
            Exception ex,
            Object body,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        ApiError apiError = createApiError(ex);
        return super.handleExceptionInternal(ex, apiError, headers, status, request);
    }
}
```

- messageMappings
  - 예외 클래스와 오류 메세지를 매핑
- resolveMessage
  - 발생한 예외 타입에 매핑된 오류 메시지 반환
  - 만약 매핑된 오류 메시지 없다면 인수에 지정한 기본 메시지 반환
- createApiError
  - 오류 메시지를 가져오는 메서드를 호출해서 생성하도록 처리

### 예외클래스 추가

- ResponseEntityExceptionHandler
	- 기본적으로 프레임워크 가정하는 예외에 대해서만 처리

> 사용자 정의 예외 처리

```java
@ExceptionHandler
public ResponseEntity<Object> handleBookNotFountException (
	BookNotFoundException ex,
	WebRequest request
) {
		return handleExceptionInternal(ex, null, null, HttpStatus.NOT_FOUNT, request);
}
```

- @ExceptionHandler
- 메서드의 매개변수에 처리하고 싶은 예외클래스를 선언
	- 인수에 선언한 클래스에 할당가능(형변환가능)한 예외가 발생하면 이 메서드로 예외처리
- 예외객체와 HTTP 상태코드를 인수로 주고 RequestEntity를 만들기 위해 handleExceptionInternal()를 호출

> 시스템 예외 처리

- 시스템예외처리는 오류 메시지에 설정에 주의
	- 오류응답메시지에 실제 발생한 예외 메시지 대신 오류원인의 특징을 알 수 없는 문구를 사용

```java
@ExceptionHandler
public ResponseEntity<Object> handleSystemException (
	BookNotFoundException ex,
	WebRequest request
) {
	ApiError apiError = createApiError(ex, "System error is occured");
	return super.handleExceptionInternal(ex, apiError, null, HttpStatus.INTERNAL_SERVER_ERROR, request);
}

private ApiError createApiError(Exception ex, String defaultMessage) {
	ApiError apiError = new ApiError();
	apiError.setMessage(resolveMessage(ex, defaultMessage));
	apiError.setDocumentationUrl("http://example.com/api/errors");
	return apiError;
}
```

- 기본 메시지에 고정문구를 사용
- 오류 정보를 생성하는 메서드에 기본 메세지를 인수로 받도록 설정

### 입력값 검사 예외의 처리

- 입력값 검사 오류가 발생
	- org.springframework.web.bind.MethodArgumentNotValidException
	- org.springframework.validation.BindException
- Response EntityExceptionHandler
 	- @ExceptionHandler 메서드가 오류를 처리

> 적절한 오류메시지로 변환

```java
private final Map<Class<? extends Exception>, String> messageMappings =
  Collections.unmodifiableMap(new LinkedHashMap() {
      {
          // 생략
          put(HttpMessageNotReadableException.class, "Request body is invalid");
      }
  });
```

> 오류 응답

```json
{
  "message" : "Request value is invalid",
  "documentation_Url" : "http://example.com/api/errors"
}
```

> 상세오류정보의 출력

```java
public class Detail implements Serializable {

    private static final long serialVersionUID = -8119817744873562082L;
    private final String target;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private final List<Detail> details = new ArrayList<>();

    private Detail(String target, String message) {
        this.target = target;
        this.message = message;
    }

    public String getTarget() {
        return target;
    }

    public String getMessage() {
        return message;
    }

    public List<Detail> getDetails() {
        return details;
    }

    public void addDetail(String target, String message) {
        details.add(new Detail(target, message));
    }
}
```

- 상세 오류 정보를 담을 클래스
  - ApiError 클래스의 정적 내부 클래스
- 상세 오류 정보를 리스트로 담을 프로퍼티
  - @JsonInclude
    - 상세 오류 정보가 없을때 details 필드가 JSON에 출력되지 않게 처리

> 상세한 오류 정보를 추가하는 구현

```java

@Autowired
MessageSource messageSource;

@Override
protected ResponseEntity<Object> handleMethodArgumentNotValid(
       MethodArgumentNotValidException ex,
       HttpHeaders headers,
       HttpStatus status,
       WebRequest request) {
   ApiError apiError = createApiError(ex, ex.getMessage());
   ex.getBindingResult().getGlobalErrors().stream()
           .forEach(e -> apiError.addDetail(e.getObjectName(), getMessage(e, request)));
   ex.getBindingResult().getFieldErrors().stream()
           .forEach(e -> apiError.addDetail(e.getField(), getMessage(e, request)));
   return super.handleExceptionInternal(ex, apiError, headers, status, request);
}

public String getMessage(MessageSourceResolvable resolvable, WebRequest request) {
   return messageSource.getMessage(resolvable, request.getLocale());
}
```

- MessageSource
  - 오류 메시지를 가져오기 위한 컴포넌트를 DI
- ResponseEntityExceptionHandler의 handleMethodArgumentNotValid() 재정의
  - BindException 처리시엔 handleBindException() 재정의
- 객체에 연결된 오류객체(ObjectError)를 상세 오류정보에 추가
- 필드에 연결된 오류객체(FieldError)를 상세 오류정보에 추가

> 상세오류를 출력한 오류응답

```json
{
  "message" : "Request value is invalid",
  "details" : [
    {
      "target" : "name",
      "message" : "may bot be null"
    }
  ],
  "document_url" : "http://example.com/api/errors"
}
```

### 서블릿컨테이너에 전달된 오류의 응답

- 서블릿컨테이너로 전달된 오류는 서블릿컨테이너 오류페이지기능(web.xml의 <error-page> 요소)를 이용해서 처리
- 오류 정보를 담은 클래스를 HttpMessageConverter를 사용해 JSON으로 변환하는 것도 가능

```java
@RestController
public class ApiErrorPageController {

    @RequestMapping("/error")
    public ApiError handleError(HttpServletRequest request) {

        String message;
        Exception ex = (Exception) request
                .getAttribute(RequestDispatcher.ERROR_EXCEPTION);
        Integer statusCode = (Integer) request
                .getAttribute(RequestDispatcher.ERROR_STATUS_CODE);

        if(ex != null) {
            message = ex.getMessage();
        } else {
            if(Arrays.asList(HttpStatus.values()).stream()
                    .anyMatch(status -> status.value() == statusCode)) {
                message = HttpStatus.valueOf(statusCode).getReasonPhrase();
            } else {
                message = "Custom error(" + statusCode + ") is occured";
            }
        }

        ApiError apiError = new ApiError();
        apiError.setMessage(message);
        apiError.setDocumentationUrl("http://example.com/api/errors");
        return apiError;
    }
}
```

- 오류응답용 오류정보를 반환할 핸들러 메서드 추가
- 요청 스코프에 저장된 예외객체와 HTTP 상태코드를 통해 오류정보에 설정할 메시지르 얻어옴
  - 예외 객체에 설정된 메시지는 애플리케이션의 내부정보를 포함하고 있을 가능성이 있어 부적절
  - 예외 객체를 참조해서 오류 메시지를 가져오는 부분은 MVC 예외 핸들러와 공유
- 오류정보를 반환

> 오류 처리 정의 (web.xml)

```xml
<!-- 예외 클래스 지정 및 오류처리정의 -->
<error-page>
    <exception-type>java.lang.Exception</exception-type>
    <location>/error</location>
</error-page>

<!-- HTTP 상태코드 지정 및 오류처리정의 -->
<error-page>
    <error-code>404</error-code>
    <location>/error</location>
</error-page>
```

- 3.1 이상일 경우 서블릿컨테이너의 기본 오류 페이지를 커스텀 가능

> 기본오류페이지를 변경하는 예 (web.xml)

```xml
<error-page>
    <location>/error</location>
</error-page>
```
---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
