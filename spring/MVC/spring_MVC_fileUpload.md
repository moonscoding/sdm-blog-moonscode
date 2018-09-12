
<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [파일업로드](#파일업로드)
* [구조](#구조)
* [파일 업로드 기능설정](#파일-업로드-기능설정)
* [업로드 데이터 취득](#업로드-데이터-취득)

<!-- /code_chunk_output -->

### 파일업로드

- 서블릿 표준 업로드기능
- Apache Commons FileUpload 업로드기능

### 구조

1. 업로드할 파일을 선택하고 업로드를 실행
2. DispatcherServlet은 MultipartResolver 인터페이스의 메서드를 호출해서 멀티파트 요청을 해석
3. MultipartResolver 구현클래스는 멀티파트 요청을 해석하고 업도르 데이터를 담을 MultipartFile 생성
4. DispatcherServlet은 컨트롤러의 처리 메서드를 호출, MultipartFile 객체는 컨트롤러 인수나 폼객체에 바인드
5. 컨트롤러는 MultipartFile 객체의 메서드를 통해 업로드된 파일의 내용이나 메타 정보를 가져옴

### 파일 업로드 기능설정

> 파일 업로드 기능 이용하기 위한 설정 (web.xml)

```xml
<servlet>
  <servlet-class></servlet-class>
  <multipart-config />
</servlet>
```

```xml
<multipart-config>  
 <!-- 파일하나의 최대 바이트수 (기본값 제한없음 : -1) -->
 <!--<max-file-size></max-file-size>-->
 <!-- 멀티파트 요청 전체의 최대 바이트수 (기본값 제한없음 : -1) -->
 <!--<max-request-size></max-request-size>-->
 <!-- 전송된 파일의 크기가 이 크기를 넘어서면 메모리에 있던 파일 내용을 임시파일로 생성 (기본값 항상 파일에 출력 : 0) -->
 <!--<file-size-threshold></file-size-threshold>-->
</multipart-config>
```

- <servlet> 요소에 <multipart-config /> 요소를 추가

> 스프링 MVC와 연계

```java
@Bean
public MultiportResolver multipartResolver() {
  return new StandardServletMultipartResolver();
}
```
- StandardServletMultipartResolver
  - 서블릿 표준 파일 업로드 기능과 스프링 MVC를 연게

### 업로드 데이터 취득

- 특정 업로드 기능의 API에 의존하지 않음
- Bean Validation 기능으로 입력값 검사를 할 수 있음

> 폼클래스 작성

```java
public class FileUploadForm implements Serializable {
  private MultipartFile file;
  // do something
}
```

> 뷰 구현

```html
<form:form modelAttribute="fileUploadForm" enctype="multipart/form-data" >
  파일 : <form:input path="file" type="file" /><br>
  <form:button>업로드</form:button>
</form:form>
```
- <form:form> 요소의 enctype 속성에 multipart/form-data 지정
- <form:input> 요소의 type 속성에 file 지정

> 컨트롤러의 구현

```java
@RequestMapping("/file/upload")
@Controller
public class FileUploadController {

  @RequestMapping(method=RequestMethod.POST)
  public String upload(FileUploadForm form) {
    MultipartFile file = form.getFile();

    String contentType = file.getContentType();
    String parameterName = file.getName();
    String originFilename = file.getOriginalFilename();
    long fileSize = file.getSize();

    // try(InputStream content = file.getInputStream()) {
      // 업로드된 데이터를 저장
      // do something
    // }
    return "redirect:/file/upload?complete";
  }
}
```
- 콘텐츠 타입정보 가져오기
- 요청 파라미터 이름 가져오기
- 파일 이름 가져오기
- 파일 크기 가져오기
- 파일 내용을 InputStream을 사용해 가져오기
---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
