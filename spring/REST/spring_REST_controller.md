
<div class="pull-right">  업데이트 :: 2018.08.16 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [@RestController](#restcontroller)
* [CORS](#cors)
* [CORS 옵션](#cors-옵션)
* [URI조립](#uri조립)

<!-- /code_chunk_output -->

### @RestController

```java
@RestController
@RequestMapping("books")
public class BookRestController() {

}
```

### CORS

- CORS : Cross-Origin Resource Sharing
  - AJAX(XMLHttpRequest)를 사용할 때 다른 도메인의 서버리소스에 접근하기 위한 메커니즘

### CORS 옵션

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

```java
@RequestMapping(method=RequestMethod.POST)
public ResponseEntity<Void> createBook(
       @Validated @RequestBody BookResource newResource,
       UriComponentsBuilder uriBuilder
) {
   BookResource newBook = new BookResource();
   newBook.setName(newResource.getName());
   newBook.setPublishedDate(newResource.getPublishedDate());
   BookResource createBook = bookService.create(newBook);

   // == URI조립 (UriComponentsBuilder방식) ==
   URI resourceUri = uriBuilder.path("books/{bookId}")
           .buildAndExpand(createBook.getBookId()).encode().toUri();

   return ResponseEntity.created(resourceUri).build();
}
```

- MvcUriComponentBuilder


```java
@RequestMapping(method=RequestMethod.POST)
public ResponseEntity<Void> createBook(
       @Validated @RequestBody BookResource newResource,
       UriComponentsBuilder uriBuilder
) {
   BookResource newBook = new BookResource();
   newBook.setName(newResource.getName());
   newBook.setPublishedDate(newResource.getPublishedDate());
   BookResource createBook = bookService.create(newBook);

   // == URI조립 (UriComponentsBuilder방식) ==
   URI resourceUri = MvcUriComponentsBuilder.relativeTo(uriBuilder)
    .withMethodCall(on(BooksRestController.class))
    .getBook(createBook.getBookId()).build().encode().toUri();

   return ResponseEntity.created(resourceUri).build();
}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
