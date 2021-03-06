<div class="pull-right"> 업데이트 :: 2018.08.22 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[스프링 시큐리티](#스프링-시큐리티)
	-	[특징](#특징)
	-	[기본 보안기능](#기본-보안기능)
	-	[강화 보안기능](#강화-보안기능)

<!-- /code_chunk_output -->

### 스프링 시큐리티

-	애플리케이션에 보안기능을 구현할때 사용하는 프레임워크
-	서블릿 컨테이너에 배포하는 웹 애플리케이션의 보안 기능 구현에서 많이 사용

#### 특징

-	다양한 옵션
	-	기본 구현 클래스의 동작 방식을 커스텀할 수 있는 다양한 옵션 제공
	-	기본 동작 방식이 보안 요구사항에 부합하지 않으면 옵션 값을 변경해서 요구사항 충족가능
-	다양한 확장점
	-	동작 방식을 커스텀할 수 있는 다양한 확장점 제공
	-	기본 동작 방식이 보안 요구사항에 부합하지 않으면 확장 클래스를 만드는 방법으로 충족가능

#### 기본 보안기능

-	인증 기능 (Authentication)
	-	애플리케이션 사용자의 정당성을 확인
-	인가 기능 (Authorization) -> 자원에 대한 권한 처리
	-	애플리케이션 리소스나 처리에 대해 접근을 제어

#### 강화 보안기능

-	세션관리
	-	세션 하이재킹이나 세션 고정 공격으로부터 사용자를 보호
	-	세션 라이프사이클을 제어
-	CSRF(Cross-Site Request Forgery)
	-	크로스 사이트 요청 변조 공격으로 부터 보호
-	브라우저 보안기능과 연계 기능
	-	브라우저의 보안기능과 연계해서 브라우저 기능을 악용한 공격에서 보호하는 보안 해더 출력

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
