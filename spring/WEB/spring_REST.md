
<div class="pull-right">  업데이트 :: 2018.08.15 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [REST API 아키택처](#rest-api-아키택처)
* [ROA(Resource Oriented Architecture)](#roaresource-oriented-architecture)
* [프레임워크 아키텍처](#프레임워크-아키텍처)

<!-- /code_chunk_output -->

### REST API 아키택처

- REpresentational State Transfer
- 클라이언트와 서버사이에 데이터를 주고받는 애플리케이션을 만들기 위한 아키텍처 스타일 중 하나
- REST API는 데이터베이스 등에서 관리되는 정보에서 클라이어트에게 제공할 정보를 '리소스'의 형태로 추출
- 추출된 리소스에 접근(CRUD 조작)하기 위한 수단으로 REST API를 제공

### ROA(Resource Oriented Architecture)

- ROA는 RESTful 웹애플리케이션을 구축하기 위한 구체적인 아키택처를 정의

> 7가지 특징
- 웹 리소스로 공개
- URI를 통한 식별 (Uniform Resource Identifier)
- HTTP 메소드를 통한 리소스의 조작
- 적절한 포맷을 사용
- 적절한 HTTP 상태코드를 사용
- 클라이언트와 서버간의 무상태 통신
- 연관된 리소스에 대한 링크

> 추가사항
- 버전을 관리하며 호환성을 최대한 유지

> 웹 리소스로 공개

- 클라이언트에 제공할 정보는 웹에서 리소스로 공개
- HTTP 프로토콜을 이용해 접근

> URI를 통한 식별

- 웹에 공개할 리소스에 그 리소스를 고유하게 식별할 수 있는 URI(Uniform Resource Identifier)를 할당
- 네트워트에 연결되어 있다면 어디서든 같은 리소스에 접근

> HTTP 메서드를 통한 리소스 동작

- CRUD 조작을 ( GET, POST, PUT, DELETE, PATCH )와 같은 메서드로 구분
  - GET : URI에 지정된 리소스를 가져옴
  - POST : 리소스를 생성하고 생성된 리소스에 접근하는 URI를 받아옴
  - PUT : URI에 지정한 리소스를 갱신
  - DLEETE : URI에 지정한 리소스를 삭제
  - PATCH : URI에 지정한 리소스를 단건수정하는데 사용됨
  - HEAD : ...
  - OPTIONS : ...

> 적절한 포맷을 이용

- json
- xml
- 포멧을 규정하지 않음

> 적절한 HTTP 상태 코드를 사용

- 클라이언트에 응답할때 HTTP 상태 코드를 설정
- 서버측의 처리결과를 알려주기 위한 것
  - 1xx : 요청을 접수하고 처리를 계속하고 있음
  - 2xx : 요청을 접수하고 처리가 완료됬음
  - 3xx : 요청을 완료하기 위해 추가적인 처리(리다이렉트 등등)가 필요
  - 4xx : 요청에 결함이 있어 처리를 중단
  - 5xx : 요청에 대해 서버가 제대로 처리하지 못함
- HTTP의 상태코드는 어떤 경우에 어떤 코드가 사용되는지가 RFC(Request for Comments)문서에 정의

> 클라이언트와 서버간의 무상태 통신

- 서버는 클라이언트가 용청한 데이터만으로 처리를 진행
- 서버과 HTTP 세션과 같은 공유 메모리를 사용하지 않고 요청 데이터만으로 리소스를 조작
- 무상태(stateless) 통신을 구현할때는 애플리케이션 상태를 클라이언트 측의 애플리케이션에서 관리

>  연관된 리소스에 대한 링크

- 리소스에는 관련된 다른 리소스나 서브 리소스에 대한 하이퍼미디어링크(URI)를 포함
- 이것은 관련된 리소스끼리 서로 링크를 가ㅏ짐으로 링크만 따라가면 연관된 모든 리소스에 접근할 수 있게 만드는 것
- 다음과 같은 방식을 HATEOAS(Hypermedia as the Engine of Application State)라고 함
- 클라이언트와 서버간의 결합도를 낮춤

```json
{
  "login" : "spring-project",
  "id" : 1234,
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/users/spring-projects"
    },
    "users" : {
      "href" : "http://localhoost:8080/users"
    }
  }
}
```

### 프레임워크 아키텍처

- REST API는 스프링 MVC를 활용해서 구현
  - 응답 본문을 생성하기 위한 뷰를 사용하지 않음
  - 요청 본문 해석과 응답 본문 생성은 HttpMessageConverter라는 컴포넌트에서 처리

> HttpMessageConverter

- org.springframework.http.converter.HttpMessageConverter
- 요청본문을 자바 객체로 변환하고 자바 객체를 응답 본문으로 변환
- RestTemplate(클래스)는 HttpMessageConverter를 사용해 자바객체를 요청본문으로 응답본문을 자바객체로 변환

> 의존 라이브러리가 필요없는 주요 HttpMessageConverter 구현클래스

- ByteArrayHttpMessageConverter
  - 본문(임의의 미디어 타입) <-> 바이트배열 변환용 클래스
- StringHttpMessageConverter
  - 본문(텍스트 형식의 미디어 타입) <-> String 변환용 클래스
- ResourceHttpMessageConverter
  - 본문(임의의 미디어 타입) <-> org.springframework.core.io.Resource.구현클래스 변환용 클래스
- AllEncompassingFormHttpMessageConverter
  - 본문(폼 형식 또는 멀티파트 형식의 미디어 타입) <-> org.springframework.util.MultiValueMap 변환용 클래스
  - 멀티파트 형식을 사용할 때, MultiValueMap에서 본문으로의 변환은 할 수 있으나, 그 반대 변환은 지원하지 않음
- MappingJackson2HttpMessageConverter
  - FasterXML Jackson Databind를 이용한 본문(JSON 형식의 미디어 타입) <-> 임의의 자바빈즈 변환용 클래스
- GsonHttpMessageConverter
  - Google Gson을 이용한 본문(JSON 형식의 미디어 타입) <-> 임의의 자바빈즈 변환용 클래스
- Jaxb2RootElementHttpMessageConverter
  - 자바표준의 JAXB2를 사용한 본문(XML형식의 미디어 타입) <-> 임의의 자바빈즈 변환용 클래스

> 리소스 클래스

```json
{
    "login" : "spring-project",
    "id" : 1234,
    "name" : "Spring",
    "blog" : "http://spring.io/projects"
}
```

```java
public class UserResource implements Serializable {
  private static final long serialVersionUID = -3106927618180228823L;
  private String login;
  private Integer id;
  private String name;
  private String blog;
}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
