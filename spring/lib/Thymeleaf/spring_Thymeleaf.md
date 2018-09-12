
<div class="pull-right">  업데이트 :: 2018.08.28 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [타임리프](#타임리프)
* [타임리프 템플릿](#타임리프-템플릿)
* [타임리프와 스프링연계](#타임리프와-스프링연계)

<!-- /code_chunk_output -->

### 타임리프

- 웹 애플리케이션 친화성 높은 템플릿 엔진
- MVC 프레임워크의 모델와 뷰를 나누는 사상과 친화성이 높음

### 타임리프 템플릿

- XHTML 이나 HTMl5 등으로 작성된 템플릿을 DOM으로 변환하고 처리하는 구조
- 처리대상의 DOM 노드와 DOM 노드에 적용하는 처리를 th 네임스페이스 속성을 사용해서 지정

### 타임리프와 스프링연계

- 타임리프에서 제공하는 thymeleaf-spring4 모듈 이용
  - 스프링 MVC가 JSP용으로 제공하는 태그 라이브러리 같은 기능을 타임리프에서도 이용가능
    - 타임리프가 관리하는 템플릿을 스프링 MVC 뷰로 취급
    - 템플릿에서 스프링 EL을 이용
    - 템플릿과 폼클래스 입력값 검사 결과를 바인드
    - 스프링이 관리하는 메시지 리소스를 이용해서 다국어 지원

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
