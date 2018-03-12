# JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.
## 깔끔한 메소드 진행, Chaining Pattern

<div class="pull-right"> 문스코딩 - 2018.03.07 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
	* [깔끔한 메소드 진행, Chaining Pattern](#깔끔한-메소드-진행-chaining-pattern)
		* [01. Chaining Pattern이란](#01-chaining-pattern이란)
		* [02. Method Chaining의 예](#02-method-chaining의-예)
		* [03. 비교하기](#03-비교하기)
		* [04. 사용하기](#04-사용하기)
		* [05 결론](#05-결론)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. Chaining Pattern이란

Object.function().function().function() 다음과 같은 방식으로 진행되는 패턴을 말합니다.

그리고 해당 메소드들은 순차적으로 진행됩니다.

다음과 같은 코드 진행은 코드량을 줄일 수 있는 장점도 있습니다.

### 02. Method Chaining의 예

```js
document.getElementByTagName('body')[0].appendChild(newnode);  
```

가장 흔히 볼수 있는 체이닝 패턴입니다.

### 03. 비교하기

```js
var DBConnector = function(){  
    this._host = '';
    this._port = 0;
    this._user = null;
    this._password = null;
};

DBConnector.prototype.host = function(host){  
    this._host = host;
};

DBConnector.prototype.port = function(port){  
    this._port = port;
};

DBConnector.prototype.user = function(user){  
    this._user = user;
};

DBConnector.prototype.password = function(password){  
    this._password = password;
};

DBConnector.prototype.connect = function(){  
    console.log("host : " + this._host);
    console.log("port : " + this._port);
    console.log("user : " + this._user);
    console.log("password : " + this._password);
};
```

보통은 다음과 같이 패턴을 진행할 것입니다.

그렇다면 다음과 같이 객체를 호출하고 메소드를 실행할 것입니다.

```js
var dbconn = new DBConnector();  
dbconn.host('localhost');  
dbconn.port(80);  
dbconn.user('saltfactory');  
dbconn.password('password');  
dbconn.connect();  
```

### 04. 사용하기

```js
var DBConnector = function(){  
    this._host = null;
    this._port = null;
    this._user = null;
    this._password = null;
};

DBConnector.prototype.host = function(host){  
    this._host = host;
    return this;
};

DBConnector.prototype.port = function(port){  
    this._port = port;
    return this;
};

DBConnector.prototype.user = function(user){  
    this._user = user;
    return this;
};

DBConnector.prototype.password = function(password){  
    this._password = password;
    return this;
};

DBConnector.prototype.connect = function(){  
    console.log("host : " + this._host);
    console.log("port : " + this._port);
    console.log("user : " + this._user);
    console.log("password : " + this._password);
    return this;
};
```
코드를 살펴보면 함수마다 **return this** 를 처리해주는 것을 알 수 있습니다.

이랗게 처리한다면 다음과 같이 체이닝패턴을 적용할 수 있습니다.

```js
dbconn.host('localhost').port(80).user('saltfactory').password('password').connect();  
```

### 05 결론

체이닝 패턴은 자바스크립트에서만 사용할 수 있는 패턴은 아닙니다.

다양한 언어에서 사용할 수 있습니다.

하지만 자바와 같이 리턴타입을 지정해주는 언어에서는 오히려 체이닝 패턴이 불편한 수 있습니다.

체이닝 패턴의 가장 큰 장점은 순차적으로 객체에 메소드를 호출하는 것보다

코드가 간결해지고 직관적으로 된다는 장점이 있습니다.

그리고 자바스크립트의 많은 라이브러리들이 체이닝 패턴을 지원하고 있습니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: 체이닝패턴 ](http://blog.saltfactory.net/javascript-method-chaining-pattern/)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
