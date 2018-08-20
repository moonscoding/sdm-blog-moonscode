# NodeJS
## RestFul
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [NodeJS](#nodejs)
	* [RestFul](#restful)
		* [01. Restful이란?](#01-restful이란)
		* [02. HTTP 메소드](#02-http-메소드)
		* [03. PUT과 POST의 차이는 무엇일까요 ???](#03-put과-post의-차이는-무엇일까요)
		* [04. Restful의 예제](#04-restful의-예제)
			* [get](#get)
			* [post](#post)
			* [put](#put)
			* [delete](#delete)

<!-- /code_chunk_output -->

### 01. Restful이란?

Web은 상당히 탄력적입니다. 그래서 Web개발에 일정부분 규칙을 두는 것은 개발과 가독성에 많은 도움을 줄 수 있습니다.

그에 연장선에서, Web개발을 진행하다 보면 Restful형식을 잘 지키는 것이 중요하다고 사람들은 말합니다.

그럼 Restful이 무엇인지 한번 알아보게습니다.

> REST 는 Representational State Transfer 의 약자로서,  
> 월드와이드웹(www) 와 같은 하이퍼미디어 시스템을 위한 소프트웨어 아키텍쳐 중 하나의 형식입니다.

### 02. HTTP 메소드

http 메소드는 크게 4가지가 있습니다.

- GET 조회
- PUT 생성 및 업데이트
- DELETE 삭제
- POST 생성

### 03. PUT과 POST의 차이는 무엇일까요 ???

다음에 차이는 **idempotent**의 개념과 연관이 깊습니다.

idempotent이란 역으로 연산해도 결과가 같은 것을 말합니다. (몇번을 시도해도 결과가 같은 것)

결론만 이야기 하자면,
- PUT은 idempotent합니다. (ex. a = 4)
- POST는 idempotent하지 않습니다. (ex. a++)

**put은 지정된 리소스에 데이터를 저장하거나 수정합니다.**
예를 들어, 'user/3'이라고 지정하면 3번 리소스에 저장하거나 수정하는등 데이터를 처리하는 것입니다.

**하지만 post는 지정된 리소스가 없습니다.**
post는 리소스의 추가 연산입니다.
즉, 'user/' 라고 실행하면 'user/2'에 생기고 다음은 'user/3'에 생기는등 매번 다른 곳에 리소스가 저장됩니다.

### 04. Restful의 예제

#### get

```js
'user/:name'
```

#### post

```js
'user/:name'
```
- body : { id : "", pw : "" }

#### put
```js
'user/:name'
```
- body : { id : "", pw : "" }

#### delete
```js
'user/:name'
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: https://velopert.com/332](https://velopert.com/332)

[링크2 :: https://1ambda.github.io/javascripts/rest-api-put-vs-post/](https://1ambda.github.io/javascripts/rest-api-put-vs-post/)
