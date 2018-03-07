
# JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.

## IIFE는 무엇인가?

<div class="pull-right"> 문스코딩 - 2018.02.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
	* [IIFE는 무엇인가?](#iife는-무엇인가)
		* [01. IIFE](#01-iife)
		* [02. 함수의 선언과 함수 표현식](#02-함수의-선언과-함수-표현식)
		* [03. 즉시 함수 호출 표현식](#03-즉시-함수-호출-표현식)
		* [04. 결론](#04-결론)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. IIFE

IIFE 알고보면 이미 사용하고 있는 패턴일 것입니다.

기본적인 형태는 다음과 같습니다.

```js
(function () {
    // TODO    
})()
```

함수를 ()로 묶어주면 호출되는 즉시 임명함수를 실행합니다.

이것은 자바 스크립트에서 중요하게 사용될 수 있습니다.

### 02. 함수의 선언과 함수 표현식

IIFE를 설명하기 전에 함수의 선언과 함수의 표현에 차이점에 대해 이해할 필요가 있습니다.

함수의 표현식은 선언과 동일한 문법을 가지고 단지 표현식에서는 함수명이 생략될 수 있다고 기술합니다.

함수의 선언은 미리 자바스크립트 실행 컨텍스트에 로딩되어 있으므로 언제든지 호출될 수 있지만,

표현식은 인터프리터가 해당 라인에 도달 했을때만 실행이 됩니다.

즉, 함수 선언을 조건에 따라 할당하거나 생성 또는 괄호 연산자로 그루핑하여 표현식으로 나타낼 수 있습니다.

```js
// [함수의 선언]
foo();                  // success!
function foo() {
    alert('foo');
}

// [표현식]
foo();                  // fail (not defined)
var foo = function() {
    alert('foo');
};

// [즉시호춣함수]
alert(foo);             // fail (not defined)
(function foo () {});
alert(foo);             // fail (not defined)
```

### 03. 즉시 함수 호출 표현식

괄호쌍이 익명의 함수를 감싸서 함수 선언을 함수 표현식으로 표현될 수 있습니다.

그러므로 단순한 익명의 함수를 글로벌 스코프에 선언하지 않고 어디서든 익명함수의 표현식을 가질 수 있습니다.

따라서, 아래와 같이 표현식이 가능합니다.

```js
// 괄호 사용 안함
x = function () {};

// 괄호 사용 (즉시호출함수)
(x = function () {});
```
> 변수 x에는 함수의 값이 할당됩니다. 괄호로 둘러쌓인 함수는 익명의 함수 표현식이 됩니다.

```js
(showName = function (name) {
  console.log(name || "No Name")
})();               // No Name
showName("Rich");   // Rich
showName();         // No Name
```

### 04. 결론

IIFE를 왜 사용하고 언제 사용하나요 ?

> 글로벌 스코프를 오염시키지 않기 위해서 사용한다고 보시면 됩니다.
> 다양한 plugin을 사용할때 외부와의 충돌을 방지할 수 있습니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
