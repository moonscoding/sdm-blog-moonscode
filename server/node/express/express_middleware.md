# NODE-JS EXPRESS

## node의 express middleware 내 방식대로 정리하기

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [NODE-JS EXPRESS](#node-js-express)
	* [node의 express middleware 내 방식대로 정리하기](#node의-express-middleware-내-방식대로-정리하기)
		* [미들웨어란 ?](#미들웨어란)
		* [Express 애플리케이션의 미들웨어 종류](#express-애플리케이션의-미들웨어-종류)
		* [미들웨어에 대한 Skip 및 Jump를 이용](#미들웨어에-대한-skip-및-jump를-이용)
		* [애플리케이션 레벨 미들웨어](#애플리케이션-레벨-미들웨어)
		* [라우터 레벨 미들웨어](#라우터-레벨-미들웨어)
		* [오류 처리 미들웨어](#오류-처리-미들웨어)
		* [기본 제공 미들웨어](#기본-제공-미들웨어)
		* [써드파티 미들웨어](#써드파티-미들웨어)

<!-- /code_chunk_output -->


**용어정리**
```
    마운트 (mount) :: HTTP 요청이 접근하는 경로
```

### 미들웨어란 ?

express의 자체적인 내장 모듈 [중간연결역할]을 해주는 함수임

- 모든 코드를 실행
- 요청 및 응답 오브젝트에 대한 변경을 실행
- 요청 - 응답 주기를 종료
- 스택 내의 그 다음 미들웨어 함수를 호출

현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않은 경우에 next()를 호출하여 그 다음 함수에 제어를 전달 (방치 방지)

### Express 애플리케이션의 미들웨어 종류

- 01. 애플리케이션 레벨 미들웨어
- 02. 라우터 베벨 미들웨어
- 03. 오류 처리 미들웨어
- 04. 기본 제공 미들웨어
- 05. 써드 파티 미들웨어

### 미들웨어에 대한 Skip 및 Jump를 이용

> 하나의 라우트에서 다양한 미들웨어를 활용하면 어떨까요 ?

이 방법은 추천하지 않습니다. 로그인 하거나 로그인 하지 않았을 때 주어지는 URL은 반드시 분리해야 합니다.
따라서 동일한 경로를 같는다고 하더라도 다른 라우트를 제공하도록 노력해야 합니다.

사용자와 로그인하지 않은 사용자에 대한 같은 라우트를 사용하는 디자인은 좋은 아이디어가 아닙니다.

### 애플리케이션 레벨 미들웨어

이 예는 마운트 경로가 없는 미들웨어 함수가 표시
이 함수에는 앱이 요청을 수신할 때마다 실행

```js
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
```

'/user/:id' 해당 경로에 마운트 되는 미들웨어 함수
'/user/:id' 경로에 대한 모든 유형의 HTTP 요청에 대해서 실행

```js
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

다음으로 넘기지 않고 요청을 처리

```js
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

하나의 마운트 경로를 통해 일련의 미들웨어 함수를 하나의 마운트 위치에 로드

```js
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

라우트 핸들러를 이용해서 하나의 경로에 대해 여러 라우트를 정의
'/user/:id' 경로에 대한 GET 요청에 대해 2개의 라우트를 정의
두번째 라우트는 어떠한 문제도 발생시키지 않음
(첫번째 라우트가 요청-응답주기로 종료 시키므로 두 번째 라우트는 절대로 호출되지 않음)

```js
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```

라우터 미들웨어 스택의 나머지 미들웨어 함수들을 건너뛰려면
next('route')를 호출하여 제어를 그 다음 라우트로 전달

```js
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});

```

### 라우터 레벨 미들웨어

### 오류 처리 미들웨어

### 기본 제공 미들웨어

### 써드파티 미들웨어



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
