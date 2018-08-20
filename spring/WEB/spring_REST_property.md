
<div class="pull-right">  업데이트 :: 2018.08.20 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

	* [애플리케이션 설정](#애플리케이션-설정)
		* [라이브러리 설정](#라이브러리-설정)
* [#](#)
* [#](#-1)

<!-- /code_chunk_output -->

### CORS

- CORS : Cross-Origin Resource Sharing
  - AJAX(XMLHttpRequest)를 사용할 때 다른 도메인의 서버리소스에 접근하기 위한 메커니즘

### CORS 기능

- allowedOrigins
  - 접근을 허용할 오리진(도메인) 지정
  - 기본값 : '\*' (모두이용가능)
- allowdMethods
  - 접근을 허용할 HTTP 메서드 지정
  - 기본값 : '\*' (모두이용가능)
- allowHeaders
  - 접근을 허용할 헤더를 지정
  - preflight 요청이 들어올때 이 값으로 점검
  - preflight 요청에 대한 응답으로 Access-Control-Allow-Headers 헤더에 설정
  - 기본값 : '\*' (모두이용가능)
- exposedHeaders
  - 허용할 데이터의 화이트리스트(WhiteList)를 지정
  - 지정한 헤더가 응답의 Access-Control-Expose-Headers 해더에 설정
- allowCredentials
  - 인증정보(쿠기나 Basic인증)를 취급할지 여부를 결정
  - true를 지정하면 Access-Control-Allow-Credentials 해더에 설정
  - 기본값 : true (인증정보취급)
- maxAge
  - 클라이언트가 preflight 요청에 대한 응답을 캐시할 시간(초단위)을 지정
  - preflight 요청에 대한 응답의 Access-Control-Max-Age 해더에 설정
  - 기본값 : 1800 (30분)

### URI조립

- UriComponentsBuilder
- MvcUriComponentBuilder

### Jackson

- 포맷제어에 이용한는 서드파티 라이브러리
  - JSON 들여쓰기 설정
  - 언더스코어('\_')로 구분되는 JSON 필드를 다루는 법
  - Java SE8에서 추가된 Date and Time API 클래스를 지원
  - 날짜/시간 타입의 포맷을 지정

> 기능

- Jackson2ObjectMapperBuilder
- Jackson2ObjectMapperFactoryBean

> Jackson2ObjectMapperBuilder 예

```Java
@Bean
ObjectMapper objectMapper() {
  return Jackson2ObjectMapperBuilder.json()
    // 옵션설정
    .build();
}
```

> JSON 들여쓰기 처리방법

```java
@Bean
ObjectMapper objectMapper() {
  return Jackson2ObjectMapperBuilder.json()
    .indentOutput(true)
    .build();
}
```

> Date and Time 클래스 지원

```xml
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
  </dependency>
```

> Date and Time 포맷지정방법

```java
@Bean
ObjectMapper objectMapper() {
  return Jackson2ObjectMapperBuilder.json()
    .indentOutput(true)
    .dateFormat(new StdDateFormat())
    .build();
}
```

- ISO 8601 날짜/시간형식(yyyy-MM-dd)로 처리
- StdDateFormat 포맷 종류
  - LocalDate : yyyy-MM-dd
  - LocalDateTime : yyyy-MM-dd'T'HH:mm:ss:SSS
  - ZonedDateTime : yyyy-MM-dd'T'HH:mm:ss:SSS'Z'
  - LocalTime HH:mm:ss.SSS


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
