
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Resource 인터페이스 & 구현클래스](#resource-인터페이스-구현클래스)
* [ResourceLoader](#resourceloader)
* [Resource 접근](#resource-접근)
* [XML에서 리소스 지정](#xml에서-리소스-지정)

<!-- /code_chunk_output -->

### Resource 인터페이스 & 구현클래스

- 구체적인 위치정보를 직접다루지 않아도 리소스에 접근할 수 있음
- Resource 인터페이스
- WritableResource 인터페이스

> InputStreamSource

```java
public interface InputStreamSource {
  InputStream getInputStream() throws IOException;
}
```

> Resource extends InputStreamSource

```java
public interface Resource extends InputStreamSource {
  boolean exists();
  boolean isReadable();
  boolean isOpen();
  URL getURL() throws IOException;
  URI getURI() throws IOException;
  File getFile() throws IOException;
  long contentLength() throws IOException;
  long lastModified() throws IOException;
  Resource createRelative(String relativePath) throws IOException;
  String getFilename();
  String getDescription();
}
```

- exits() 리소스 존재하는지 확인
- isOpen() 읽기 위한 스트림이 열려 있는지 확인

> WritableResource

```java
public interface WritableResource extends Resource {
  boolean isWritable();
  OutputStream getOutputStream() throws IOException;
}
```

> Resource의 주요 구현클래스

- ClassPathResource
  - 클래스패스 상에 있는 리소스를 다루기 위한 클래스
- FileSystemResource
  - java.io 패키지의 클래스를 사용해 파일시스템 상의 리소스를 다루기 위한 클래스
- PathResource
  - java.nio.file 패키지의 클래스를 사용해 파일시스템 상의 리소르를 다루기 위한 클래스
- UrlResource
  - URL 상의 웹 리소스를 다루기 위한 클래스
  - "http://" 일반적
  - "file://" 가능
- ServletContextResource
  - 웹애플리케이션 상의 리소스를 다루기 위한 클래스

### ResourceLoader

- ResourceLoader 인터페이스
- ResourcePatternResolver 인터페이스
- DI 컨테이너를 구성하는 다양한 ApplicationContext도 다음 인터페이스를 구현
  - ApplicationContext의 종류에 따라 파일경로를 읽는 방식이 달라질 수 있음
  - 애당초 리소스 경로에 "classpath:"같은 접두어를 붙이는 것을 권장

```java
public interface ResourceLoader {
  String CLASSPATH_URL_PREFIX = ResourceUtils.CLASSPATH_URL.PRFIX;
  Resource getResource(String location);
  ClassLoader getClassLoader();
}
```

- Resource 객체를 가져올때 getResource()의 매개변수로 리소스의 위치 지정
  - 클래스패스상에서 리소스 지정이라면 'classpath:' 와 같은 접두어가 붙음

```java
public interface ResourcePatternResolver extents ResourceLoader {
  String CLASSPATH_ALL_URL_PREFIX = "classpath*:";
  Resource[] getResources(String locationPattern) throws IOException;
}
```

- ResourcePatternResolver는 패턴에 맞는 여러개의 리소스를 가져올 수도 있음

### Resource 접근

> Resource 인터페이스 구현클래스를통해 웹 리소스 가져오기

```java
public void accessResource() throws IOException {
  Resource greetingResource = new UrlResource("http://localhost:8080/myApp/greeting.json");
  InputStream in;

  try {
    in = greetingResource.getInputStream();
    String content = StreamUtils.copyToString(in, StandardCharsets.UTF_8);
    System.out.println(content);
  } catch(IOException e) {
    throw new IOException();
  } finally {
    in.close();
  }
}
```

- 로컬PC에 톰캣과 같은 서블릿 컨테이너나 웹 애플리케이션 서버가 설치 됐다는 가정
- myApp 이라는 웹 애플리케이션을 통해 greeting.json 파일에 접근할 수 있다 가정

> greeting.json 파일

```json
{"hello" : "world"}
```

- accessResource() 표준 출력에 greeting.json 파일의 내용이 표시

> ResouceLoader 구현클래스를 자동주입받는 방식

```java
@Autowried
ResourceLoader resourceLoader;

public void accessResource() throws IOException {
	// ResourceLoader를 통해서 Resource 가져오기
	Resource greetingResource  = resourceLoader.getResource("http://localhost:8080/myApp/greeting.json");
}
```

- 구현클래스의 의존성은 제거
- 리소스경로가 하드코딩돼 있는 상태

> 프로퍼티 기능을 활용해서 리소스 가져오기

```java
@Value("${resource.greeting:http://localhost:8080/myApp/greeting.json}")
Resource greetingResource;
InputStream in;

public void accessResource() throws IOException {
  try {
    in = greetingResource.getInputStream();
    String content = StreamUtils.copyToString(in, StandardCharsets.UTF_8);
    System.out.println(content);
  } catch(IOException e) {
    throw new IOException();
  } finally {
    in.close();
  }
}
```

- resource.greeting=classpath:greeting.json

### XML에서 리소스 지정

```xml
<import resource="classpath:/META-INF/spring/domain-context.xml" />
```

- 빈만 정의된 설정파일을 임포트하는것
- 클래스패스 상에서 주소값을 읽어옴

```xml
<context:property-placeholder location="classpath*:/**/*.properties" />
```

- 클래스패스상에 있는 모든 프로퍼티파일을 읽은후, "${프로퍼티명}"과 같은 형식으로 플레이스홀더를 사용
- 프로퍼티 파일을 불러와 플레이스홀더를 치환
- classpath* : 클래스패스상의 리소스를 모두 읽어오는 것



---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
