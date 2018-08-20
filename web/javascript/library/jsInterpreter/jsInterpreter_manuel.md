# JS interpreter, 어디에 쓰는 물건일까요 ?
## manuel
<div class="pull-right"> 문스코딩 - 2018.03.13 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS interpreter, 어디에 쓰는 물건일까요 ?](#js-interpreter-어디에-쓰는-물건일까요)
	* [manuel](#manuel)
		* [1. 시작하기전에](#1-시작하기전에)
		* [2. 주요 기능](#2-주요-기능)
		* [3. createNativeFunction vs createAsyncFunction](#3-createnativefunction-vs-createasyncfunction)
		* [4. nativeToPseudo vs pseudoToNative](#4-nativetopseudo-vs-pseudotonative)
			* [nativeToPseudo 문제점](#nativetopseudo-문제점)

<!-- /code_chunk_output -->


### 1. 시작하기전에

js-interpreter는 자바스크립트를 단계적으로 실행시키기 위한 라이브러리입니다.

그래서 자바스크립트의 모든 기능을 wrapper로 재구성합니다.

그렇기 때문에 기존의 자바스크립트보다 200배 느린 속도를 가지고 있습니다.

하지만, 직접 구현하지 않고 자바스크립트를 단계적으로 실행시킬 수 있다는 장점을 가지고 있습니다.

현재 사용하는 js-interpreter는 google에서 2013년에 개발한 라이브러리로 현재 까지도 업데이트를 진행하고 있습니다.

https://github.com/NeilFraser/JS-Interpreter

ES5까지 밖에 지원하지 않고 있으며, ES6 지원 예정 불투명하다는 단점이 있습니다.

### 2. 주요 기능

```html
 <script src="acorn_interpreter.js"></script>
```

다음과 같이 인터프리터 라이브라리를 준비합니다.

```js
var myCode = 'javacript code...';
new Interpreter(myCode)
```

그리고 작성된 자바스크립트 코드를 매개변수로 하여 객체를 생성합니다.

```js
myInterpreter.run();
myInterpreter.step();
```

다음과 같이 인터프리터를 실행할 수 있습니다.

```js
var myCode = 'alert(url);';
var initFunc = function(interpreter, scope) {
    interpreter.setProperty(scope, 'url', String(location));

    var wrapper = function(text) {
        return alert(text);
    };
    interpreter.setProperty(scope, 'alert', interpreter.createNativeFunction(wrapper));
};
var myInterpreter = new Interpreter(myCode, initFunc);
```

js-interpreter의 가장 큰 장점은 native function을 추가할 수 있다는 점입니다.

myCode는 alert를 호출하길 원하고 있습니다. 하지만, alert이 만약 native function이 아니라면 어떻게 해야할까요 ?

js-interpreter는 init API를 통해 전역 scope 내에 native한 function을 생성할 수 있습니다.

### 3. createNativeFunction vs createAsyncFunction

js-interpreter는 wrapper된 라이브러리기 때문에 자바스크립트의 모든 기능을 완벽하게 사용할 수 있는 것은 아닙니다.

예를 들어 setTimeout과 같은 비동기 함수를 실행하려할 땐 ?

createAsyncFunction 기능을 사용해야합니다.

```js
var myCode = 'wait(5); alert(url);';

var initFunc = function(interpreter, scope) {
    interpreter.setProperty(scope, 'url', String(location));

    var wrapper = function(time, cb) {
        setTimeout(cb, time * 1000)
    };
    interpreter.setProperty(scope, 'wait', interpreter.createAsyncFunction(wrapper));
};
var myInterpreter = new Interpreter(myCode, initFunc);
```

다음은 wait라는 비동기 함수를 사용하려 합니다.

요청한 시간만큼 기다렸다가 다음코드를 진행하는 코드입니다.

함수 타입을 createAsyncFunction로 설정해주면,

함수는 cb이라는 매개변수를 마지막에 1개더 가집니다.

해당 cb은 코드 후반부를 가리키며 해당 함수가 다 종료된후에 다음 코드를 진행하도록 처리할 수 있습니다.

### 4. nativeToPseudo vs pseudoToNative

앞에서 계속 말씀드렸듯이 js-interpreter는 자바스크립트를 wrapper한 라이브러리입니다.

그렇기 때문에 객체를 자바스크립트가 사용하는 것과 같이 사용할 수 없습니다.

여기서 우리는 nativeToPseudo 매소드를 사용하게 됩니다.

만약 내가 전역 변수에 native한 hello라는 객체 변수를 추가하고 싶다면 ?

```js
var myCode = 'print(hello)';

var initFunc = function(interpreter, scope) {
    interpreter.setProperty(scope, 'hello', interprter.nativeToPseudo({hello : 'world'}));
    interpreter.setProperty(scope, 'byebye', 'world');
};
var myInterpreter = new Interpreter(myCode, initFunc);
```

nativeToPseudo 함수를 사용하면 자바스크립트에서 사용하는 객체를 js-interpreter 위에서 사용할 수 있습니다.

반대로 js-interpreter 위에서 사용하는 객체를 다시 자바스크립트에서 사용하기 원한다면 pseudoToNative를 사용할 수 있습니다.

#### nativeToPseudo 문제점

해당 방식으로 객체를 처리하면 함수는 무조건 createNativeFunction 처리가 됩니다.

객체안에 함수를 createAsyncFunction로 사용하고 싶어도 사용할 수 없습니다.

그렇기 때문에 분기가 되는 새로운 nativeToPseudo를 만들어 처리하도록 합니다.

---

**Created by SDM**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
