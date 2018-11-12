<div class="pull-right"> 업데이트 :: 2018.11.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[Spring Test](#spring-test)
-	[스프링 테스트](#스프링-테스트)

<!-- /code_chunk_output -->

### Spring Test

> 1.	통합테스트

-	목(mock)이나 스텁(stub)은 사용하지 않고 실제 운영 환경에서 사용될 클래스를 통합해서 테스트

> 1.	단위테스트

-	단위테스트는 테스트할 클래스가 의존하는 다른 컴포넌트를 목(mock)이나 스텁(stub)으로 처리
-	테스트 대상 클래스의 실행 결과가 다른 컴포넌트의 실행 내용에 좌우되지 않게 한다.

### 스프링 테스트

> 기능

-	Junit, TestNG 라는 테스팅 프레임워크 사용해서 스프링의 DI 컨테이너 동작
-	트랜젹션을 테스트 상황에 맞게 제어
-	애플리케이션 서버를 사용치 않고 스프링 MVC 동작을 재현
-	테스트 데이터를 적재하기 위해 SQL을 실행
-	RestTemplate을 이용해서 HTTP 요청에 대한 임의의 응답을 보내는 기능

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
