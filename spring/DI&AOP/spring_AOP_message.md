
<div class="pull-right">  업데이트 :: 2018.08.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [메세지관리](#메세지관리)
* [MessageSource](#messagesource)
* [MessageSourceResolvable](#messagesourceresolvable)
* [MessageSource 사용](#messagesource-사용)
* [MessageSource API](#messagesource-api)
* [MessageSourceResolvable 활용](#messagesourceresolvable-활용)
* [프로퍼티파일을 UTF-8로 인코딩](#프로퍼티파일을-utf-8로-인코딩)
* [다국어 지원](#다국어-지원)

<!-- /code_chunk_output -->

### 메세지관리

- 문자열형태의 메시지
- 프로퍼티파일과 같은 곳에 따로 관리해서 소스코드에서 분리
- 다국어 지원하는 국제화기능

### MessageSource

- MessageSource는 메시지 정보의 출처를 추상화하기 위한 것
- 어딘가에 있을 메시지 정보를 가져오기 위해 getMessage() 제공

```java
public interface MessageSource {
  String getMessage(
    String code,
    Object[] args,
    Locale locale) throws NoSuchMessageException;
  String getMessage(
    String code,
    Object[] args,
    String defaultMessage,
    Locale locale);
  String getMessage(
    MessageSourceResolvable resolvable,
    Locale locale) throws NoSuchMessageException;
}
```

- 메세지 코드에 맞는 메시지를 찾아옴
- 메시지 문구안에 동적으로 변경해야 할 부분이 있다면 인수(args)로 받아 완성된 메시지를 반환
- 요청한 코드에 대응하는 메시지가 없으면 기본설정메시지(defaultMessage)를 사용하거나 예외발생가능

### MessageSourceResolvable

- 메시지정보를 가져오는데 필요한 각종정보 (code, args, defaultMessage)를 한 덩어리로 다루는 인터페이스
- 메시지코드와 인수를 여러벌 지정할 수 있다는 것

```java
public interface MessageSourceResolvable {
  String[] getCodes();
  Object[] getArguments();
  String getDefaultMessage();
}
```

- ResourceBundleMessageSource
  - JavaSE표준의 java.util.ResourceBundle
  - 프로퍼티 파일에서 메세지를 가져옴
- ReloadableResourceBundleMessageSource
  - 스프링이 제공하는 패키지 사용
  - 프로퍼티 파일에서 메시지 가져옴
  - java.util.ResourceBundle 기능확장

### MessageSource 사용

> MessageSource 정의

```java
@Bean
public MessageSource messageSource() {
  ResourceBundleMessageSource messageSource = new ReousrceBundleMessageSource();
  // 클래스패스 상에 있는 프로퍼티 파일의 이름을 확장자를 제외하고 지정
  messageSource.setBasenames("messages");
  return messageSource;
}
```

```xml
<bean id="messageSource" class="org.springframework.context.support.ResourceBundleMessageSource">
  <property name="basenames">
    <list>
      <value>messages</value>
    </list>
  </property>
</bean>
```

> 메세지정의 messages.properties 정의 예시

```
# welcome.message={0}님, 환영합니다!
welcome.message={0}[유니코드처리]
```

> 메세지정의 application-messages.properties 정의 예시

```
# result.succeed={0} 처리가 설공했습니다.
result.succeed={0} {유니코드처리}
```

- 프로퍼티키 메시지코드
- 프로퍼티값 MessageFormat클래스가 해설할 수 있는 메시지 문자열
- 한글은 유니코드문자를 사용하되 아스키코드에서 사용가능한 문자로

### MessageSource API

```java
@Autowired
MessageSource messageSource;

public void printWelcomeMessage() {
  String message = messageSource.getMessage(
    "result.succeed",
    new String[] {"사용자 등록"},
    Locale.KOREAN);
  System.out.println(message);
}
```

- 출력 => 사용자 등록 처리가 성공했습니다.

### MessageSourceResolvable 활용

- DefaultMessageSourceResolvable 활용

```java
MessageSourceResolvable functionName = new DefaultMessageSourceResolvable("functionName.userRegistration");

String message = messageSource.getMessage(
  "result.succeed",
  new MessageSourceResolvable[]{functionName},
  Locale.KOREAN);
```

```
# functionName.userRegistration=사용자 등록
functionName.userRegistration={유니코드처리}
```

### 프로퍼티파일을 UTF-8로 인코딩

```java
@Bean
public MessageSource messageSource() {
  ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
  messageSource.setBasenames("messages");
  messageSource.setDefaultEncoding("UTF-8");
  return messageSource;
}
```
- ResourceBundleMessageSource 프로퍼티 파일을 다른 인코딩 방식으로 사용하는 기능 제공
- 기존 프로퍼티파일을 UTF-8로 인코딩하고 메시지를 다시 UTF-8 작성

```
result.succeed={0}건의 처리가 성공했습니다.
functionName.userRegistration=사용자 등록
```

### 다국어 지원

- MessageSource 구현클래스는 국가별로 메시지 언어를 다르게 적용하는 국제화 기능 가짐

> messages.properties

```
welcome.message={0}님, 환영합니다.
```

> messages_en.properties

```
welcome.message=Welcome, {0}!
```

- 국가코드와 조합해서 메시지를 더 세분화 처리 가능
  - message_en_US.properties & messages_en_GB.properties

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
