# JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.
## IIFE는 무엇인가?

<div class="pull-right"> 2018.02.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
	* [IIFE는 무엇인가?](#iife는-무엇인가)
		* [01. IIFE](#01-iife)
		* [02. 함수의선언과 함수표현식](#02-함수의선언과-함수표현식)
		* [03. 즉시 함수호출표현식](#03-즉시-함수호출표현식)
			* [IIFE](#iife)
			* [IIFE 예제](#iife-예제)
			* [IIFE 이용한 함수호출카운트 예제](#iife-이용한-함수호출카운트-예제)
		* [04. 결론](#04-결론)

<!-- /code_chunk_output -->

### 01. IIFE

IIFE란, 즉시실행함수 표현식(IIFE, Immediately-Invoked Function Expression)를 의미합니다.

자바스크립트로 개발을 하고 있다면,

IIFE 알고보면 이미 사용하고 있는 패턴일 것입니다.

기본적인 형태는 다음과 같습니다.

```js
(function () {
    // TODO    
})()
```

함수를 ()로 묶어주면 호출되는 즉시 임명함수를 실행합니다.

이것은 자바스크립트에서 새로운 스코프를 생성하고 정보를 은닉하는데 중요한 역할을 할 수 있습니다.

### 02. 함수의선언과 함수표현식

IIFE를 설명하기 전에 함수의 선언과 함수의 표현에 차이점에 대해 이해할 필요가 있습니다.

- 함수의선언
- 함수표현식

이 둘의 차이점은 앞서 호이스팅에서 배운적이 있습니다. [Hoisting 바로가기](http://moonscode.tistory.com/5)

==함수의선언==은 미리 자바스크립트 실행 컨텍스트에 로딩되어 있으므로 언제든지 호출될 수 있지만,

==함수표현식==은 인터프리터가 해당 라인에 도달 했을때만 실행이 됩니다.

함수표현식은 선언과 동일한 문법을 가지고 단지 표현식에서는 함수명이 생략될 수 있다고 기술합니다.

> 즉, ==함수의선언==을 조건에 따라 할당하거나 생성 또는 괄호 연산자로 그루핑하여 표현식으로 나타낼 수 있습니다.

```js
// [함수의선언] - 호이스팅관련 성공
foo();                  // success!
function foo() {
    alert('foo');
}

// [함수표현식] - 호이스팅관련 실패
foo();                  // fail (not defined)
var foo = function() {
    alert('foo');
};
```

```js
// [즉시호춣함수]
(function foo () {})(

);
alert(foo);             // fail (not defined)
```

### 03. 즉시 함수호출표현식

==괄호쌍==이 익명함수를 감싸서 함수선언을 함수표현식으로 표현할 수 있습니다.

> 그러므로 단순한 익명함수를 글로벌 스코프에 선언하지 않고 어디서든 익명함수표현식을 가질 수 있습니다.

따라서, 아래와 같이 표현식이 가능합니다.

```js
// 괄호 사용 안함
function (){ console.log('no IIFE') }(); // ERROR

// 괄호 사용 (즉시호출함수)
(function (){ console.log('IIFE')})();
```

```js
(showName = function (name) {
  console.log(name || "No Name")
})();               // No Name
showName("Rich");   // Rich
showName();         // No Name
```

#### IIFE

```js
(function() {
    // IIFE 바디
})();
```

> IIFE의 장점은 내부에 있는 것들이 모두 자신만의 스코프를 가지지만,
> IIFE 자체는 함수이므로 그 스코프 밖으로 무언가를 내보낼 수 있다는 점입니다.

#### IIFE 예제

```js
const message = (function() {
    const secret = "I m scret!";
    return `The secret is ${secret.length} characters long.`
})();
console.log(message);
```
> 변수 secret은 IIFE의 스코프 안에서 안전하게 보호되면 외부에서 접근할 수 없습니다.
> IIFE는 함수이므로 무엇이든 반환할 수 있습니다.

#### IIFE 이용한 함수호출카운트 예제

```js
// 호출된 함수를 가지고 있는 변수 f
const f = (function() {
    let count = 0;
    return function() {
        return `i have been called ${++count} time(s).`
    }
})();

f(); // 1
f(); // 2
```

### 04. 결론

IIFE를 왜 사용하고 언제 사용하나요 ?

> 글로벌 스코프를 오염시키지 않기 위해서 사용한다고 보시면 됩니다.
> 대표적인 자바스크립트의 라이브러리들은 IIFE 패턴을 사용해서 충돌을 방지하고 있습니다.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

Copyright (c) 2017 Copyright Holder All Rights Reserved.
