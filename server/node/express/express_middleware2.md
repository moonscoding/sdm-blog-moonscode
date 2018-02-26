# EXPRESS MIDDLEWARE

#### node - express middleware

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

**용어정리**
```
    미들웨어 :: Express에 내장된 중간 처리 함수 모듈
    라우트 레벨 미들웨어 :: 라우트 단에서 처리하는 미들웨어 함수
    오류 처리 미들웨어 ::
```

#### 01 라우터 레벨 미들웨어

라우터 레벨 미들웨어는 **express.Router() 인스턴스에 바인드된다** 는 점을 제외하면 애플리케이션 레벨 미들웨어와 동일

```node
var router = express.Router();
```

router.use() 및 router.method() 함수를 사용해서 라우터 레벨 미들웨어를 로드
다음 예의 코드는 위에서 애플리케이션 레벨 미들웨어에 대해 표시된 미들웨어 시스템을 라우터 베벨 미들웨어를 사용하여 복제

```node
var app = express();
var router = express.Router();

// a middleware function with no mount path.
// This code is executed for every request to the router (모든 미들웨어에 적용)

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request
// info for any type of HTTP request to the /user/:id path

router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack
// that handles GET requests to the /user/:id path

router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page

router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
```

#### 02 오류처리 미들웨어

```node
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

#### 03 기본제공 미들웨어

#### 04 써드파티 미들웨어

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](http://expressjs.com/ko/guide/using-middleware.html)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
