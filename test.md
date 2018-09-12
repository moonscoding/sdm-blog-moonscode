
<div class="pull-right">  업데이트 :: 2018.09.02 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [1 환경](#1-환경)
	* [1.1 개발환경](#11-개발환경)
	* [1.2 Front-End 라이브러리](#12-front-end-라이브러리)
	* [1.3 실행방법](#13-실행방법)
* [2 기능](#2-기능)
	* [2.1 중점사항](#21-중점사항)
	* [2.2 주요기능](#22-주요기능)
	* [2.3 예정기능](#23-예정기능)
* [3. RESTful 명세](#3-restful-명세)

<!-- /code_chunk_output -->

### 1 환경

#### 1.1 개발환경

- OS : MacOS (10.13.6)
- JDK: Java (1.8)
- Framework: Spring Boot (2.0.4)
- Build: Maven
- DataBase: H2
- ORM: JPA
- Template: ThymeLeaf
- WAS : SpringBoot Embedding Tomcat
- IDE: InteliJ (2018.1.4)

#### 1.2 Front-End 라이브러리

- bootstrap (4.1.3)
	- IE10부터 지원
- jquery (4.1.3)
	- IE9부터 지원
- vue (2.5.17)
	- IE9부터 지원
- axios (0.18.0)
	- IE11부터 지원
- sweetalert2 (7.26.12)
	- IE11부터 지원

> IE11이상의 버전과 그 외 브라우저에서 안정적으로 사용할 수 있습니다.

#### 1.3 실행방법

> mvn spring-boot:run

### 2 기능

#### 2.1 중점사항

> RESTful API

개발하기에 앞서 RESTful한 API서버에 대한 요청과 WAS서버에 대한 요청을 분리해서 설계를 진행했습니다.

RESTful API 개발에서는 ROA(Resource Oriented Architectrue)의 규칙을 준수했습니다.

HTTP 메서드를 통한 리소스의 행위를 정의하고 JOSN을 이용한 포맷을 사용했습니다.

또한 HTTP 상태코드를 이용해 클라이언트에게 적절한 정보를 전달하도록 했습니다.



> Security

모든 페이지는 인증처리후에 접근할 수 있습니다.

RESTful API에 있어서도 인가처리를 적용했습니다.

권한은 "USER", "EMPLOYEE", "ADMIN" 3가지가 있으며, RESTful API는 권한에 따라 다른 인가처리를 합니다.

예를 들어 상품에 대한 조회는 누구나 가능하지만, 상품에 대한 등록 및 수정은 관리자만 가능해야 하기 때문입니다.

~~해당 기능에 대해 관리자계정에 대한 관리자모드로 확인이 가능합니다.~~
(권한에 따른 인가처리는 반영이 되있으나 관리자모드로 API에 접근할 수 있는 VIEW가 아직 개발되지 않은 상태입니다.)

-  **3가지의 테스트 아이디 제공**
	- admin@kakao.com && admin1234 (권한 admin)
	- employee@kakao.com && employee1234 (권한 employee)
	- user@kakao.com && user1234 (권한 user)

> Exception

서버개발을 진행할 때 안정적인 서버에 중점을 두었습니다.

발생가능한 예외를 모두 관리하기 위해 노력을 들였고, RESTful API에선 반환값의 Http상태코드와 연관지어 처리했습니다.

~~또한 발생을 예상할 수 없는 UncaughtException에 대한 예외를 ExceptionLog처리를 통해 대처할 수 있도록 기획했습니다.~~ (반영되지않음)

> DataBase

결제와 관련된 모든 데이터는 매우 중요하기 때문에 물리적으로 삭제하지 않고,

"enable"이 란 칼럼을 두어 모두 논리적으로만 삭제되게 처리했습니다.

#### 2.2 주요기능

- 회원가입
- 로그인
- 상품목록
- 장바구니
- 상품구매
- 구매목록

#### 2.3 예정기능

- Tranaction 처리
	- 유한한 리소스에 대한 접근에서 처리할 수 없는 경우의 Rollback 처리
	- 외부 결제 API의 실패에 대해 무결성을 유지하기 위한 Rollback 처리
- 테스트코드
	- Junit을 통한 Build전 테스트코드 작성
- Exception Log
	- UncaughtException에 대해서 ExceptionLog데이터 저장을 통한 대처
- Profile 처리
	- DEV, TEST, PROD에 따른 Profile 처리
- 관리자모드
	- 관리자권한에 제공되는 API를 테스트하기 위한 관리자 VIEW 개발

### 3. RESTful 명세



여러 장점들을 조합해 봤을때 RESTful한 API서버를 WAS서버와 분리하는 것이 유리할 것이라 생각했습니다.
하지만 여건상 가능하지 않아 현재 API서버와 WAS서버가 같이 존재하며
모른 RESTful한 API서버는 "/api"를 통해서 접근할 수 있습니다.

> Goods

|Method|URI|Auth|HttpStatus|Desc|
|--			|--													|--				|--						|--|
|GET		|/api/goods/{goodsNo}				|USER			|200, 400, 404|Goods 단건조회 (PK이용)|
|GET		|/api/goods?page={num}			|USER			|200, 400, 404|Goods 복수조회<br>Pagenation을 위해 10건씩 반환|
|POST		|/api/goods									|EMPLOYEE	|204, 400, 404|Goods 등록|
|PUT		|/api/goods/{goodsNo}				|EMPLOYEE	|204, 400, 404|Goods 내용수정|
|PUT		|/api/goods/price/{goodsNo}	|ADMIN		|204, 400, 404|Goods 가격수정|
|PUT		|/api/goods/stock/{goodsNo}	|ADMIN		|204, 400, 404|Goods 재고수정|
|PUT		|/api/goods/active/{goodsNo}|ADMIN		|204, 400, 404|Goods 활성여부수정|
|DELETE	|/api/goods/{goodsNo}				|ADMIN		|204, 400, 404|Goods 삭제 (논리삭제)|

> Basket

|Method|URI|Auth|HttpStatus|Desc|
|--|--|--|--|--|
|GET|/api/basket/{basketNo}|ADMIN|204, 400, 404|Basket 단건조회 (PK이용)|
|GET|/api/basket?page={num}|ADMIN|204, 400, 404|Basket 복수조회<br>Pagenation을 위해 10건씩 반환|
|GET|/api/basket/user?page={num}|USER|204, 400, 404|Basket 복수조회 (내정보)<br>Pagenation을 위해 10건씩 반환|
|POST|/api/basket|USER|200, 400, 404, 409, 410, 416|Basket 등록<br>409 - 중복저장<br>410 - 재고소진<br>416 - 범위이탈|
|PUT|/api/basket/{basketNo}|USER|204, 400, 404, 410, 416|Basket 수량수정<br>410 - 재고소진<br>416 - 범위이탈|
|DELETE|/api/basket/{basketNo}|USER|204, 400, 404|Basket 삭제 (논리삭제)|


> Purchase

|Method|URI|Auth|HttpStatus|Desc|
|--|--|--|--|--|
|GET|/api/purchase/{purchaseNo}|EMPLOYEE|204, 400, 404|Purchase 단건조회 (PK이용)|
|GET|/api/purchase?page={num}|EMPLOYEE|204, 400, 404|Purchase 복수조회<br>Pagenation을 위해 10건씩 반환|
|GET|/api/purchase/user?page={num}|USER|204, 400, 404|Purchase 복수조회 (내정보)<br>Pagenation을 위해 10건씩 반환|
|POST|/api/purchase|USER|200, 400, 410, 500|Purchase 등록<br>410 - 재고소진<br>500 - 결제실패|
|PUT|/api/purchase/cancel/{purchaseNo}|USER|204, 400, 404, 406|Purchase 취소<br>406 - 컨텐츠상태로 인한 취소불가|

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
