# JS - 어디까지 알고있나요 ?
## scope 샅샅히 파헤치기

<div class="pull-right"> 문스코딩 - 2018.01.24 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS - 어디까지 알고있나요 ?](#js-어디까지-알고있나요)
	* [scope 샅샅히 파헤치기](#scope-샅샅히-파헤치기)
		* [01. scope](#01-scope)
		* [02. 스코프와 존재](#02-스코프와-존재)
		* [03. 정적 스코프와 동적 스코프](#03-정적-스코프와-동적-스코프)
		* [04. 전역 스코프](#04-전역-스코프)
		* [05. 블록 스코프](#05-블록-스코프)
		* [06. closure (내부 함수에 접근할 수 있는 방식)](#06-closure-내부-함수에-접근할-수-있는-방식)
		* [07. 즉시 호출하는 함수 표현식](#07-즉시-호출하는-함수-표현식)
		* [08. 사각지대](#08-사각지대)
		* [09. 스트릭트 모드](#09-스트릭트-모드)

<!-- /code_chunk_output -->


**용어정리**
```
    scope :: 변수가 선언된 할당된 범위
    암시적 전역변수(implicit global) :: var로 변수를 선언하는 것을 잊으면 전역변수를 참조하려고 하고, 그런 전역변수가 없을 시 스스로 만드는 것
```

### 01. scope

scope는 변수와 상수, 매개변수가 언제 어디서 정의되는지 결정합니다.
함수 매개변수가 함수 바디 안에서만 존재하는 것도 스코프의 예 입니다.

```js
function f(x) {
    return x + 3;
}
f(5);   // 8
x;      // x is not defined
```
> x의 스코프가 함수 f 이다 ! 라고 말할 수 있습니다.

> 일부 언어는 선언 declaration 정의 definition을 명확히 구분합니다.
> 일반적으로 변수를 선언한다는 것은 식별자를 주어서 그 존재를 알리는 것입니다.
> 반면 정의는 선언과 함께 값도 부여하는 것을 말합니다.
> js에서는 모든 변수를 동시에 값이 주어지므로 두 용어를 구분하지 않습니다.
> (명시적으로 정하지 않으면 undefined가 암시적으로 적용)

### 02. 스코프와 존재

가시성 visibility라고도 불리는 스코프는 프로그램의 현재 실행중인 부분,
즉 실행 컨텍스트 execution context에서 현재 보이고 접근 할 수 있는 식별자를 말합니다.

반면, 존재한다는 말은 그 식별자가 메모리가 할당된 (예약된) 무엇가를 가리키고 있다는 뜻입니다.
존재하지만, 스코프 안에는 없는 변수의 예를 보곘습니다.

### 03. 정적 스코프와 동적 스코프

```js
function f1() {
    console.log('one')
}

function f2() {
    console.log('two')
}

f2()
f1()
f2()
```

정적으로 보면 이 프로그램은 단순 위에서 아래로 읽어 내리는 문의 연속입니다.
js의 스코프는 정적입니다. 소스코드만 봐도 변수가 스코프에 있는지 판단할 수 있습니다.
다만, 소스코드만 봐도 즉시 스코프를 분명히 알 수 있지는 않습니다.

```js
const x = 3;
function f() {
    console.log(x);
    console.log(y);
}

// 새 스코프
{
    const y = 5;
    f();
}
```
> 변수 x는 함수 f를 정의할때 존재하지만 y는 그렇지 않습니다.

y는 다른 스코프에 존재합니다.
다른 스코프에서 y를 선언하고 그 스코프에서 f를 호출하더라도,
f를 호출하면 x는 그 바디 안의 스코프에 있지만 y는 그렇지 않습니다.

> 즉, f는 자신의 정의될때 접근할 수 있었던 식별자에는 여전히 접근이 가능하지만, 호출할 때 스코프에 있는 식별자에는 접근할 수 없습니다.

### 04. 전역 스코프

스코프는 계층적이며 트리의 맨 아래에는 바탕이 되는 무엇인가 있어야 합니다.
즉, 프로그램을 시작할 때 암시적으로 주어지는 스코프가 필요합니다.
이 스코프를 전역 스코프라고 합니다.

> 핵심 :: 전역 스코프에 몇 가지가 존재하는 건 피할 수 없을 뿐더러, 그 자체ㅏ 그렇게 나쁜것도 아닙니다.
> 피해야 하는건 전역 스코프에 의존하는 것

**01. 전역 스코프에 의존하는 예**

```js
let name = "Irena"; // 전역 스코프에 선언된 전역 변수
let age = 25;       // 전역 스코프에 선언된 전역 변수

function greet() {
    console.log(`Hello, ${name}!`);
}
function getBirthYear() {
    return new Date().getFullYear() - age;
}
```

**02. 단일 객체에 보관하기**

```js
let user = {
    name : "Irena",
    age : 25
}

function greet() {
    console.log(`Hello, ${user.name}!`);
}
function getBirthYear() {
    return new Date().getFullYear() - user.age;
}
```

**03. 함수를 통해 전역스코프에 의존하지 않게 하기**
```js
function greet(user) {
    console.log(`Hello, ${user.name}!`);
}
function getBirthYear(user) {
    return new Date().getFullYear() - user.age;
}
```

### 05. 블록 스코프

let과 const는 식별자를 블록 스코프에서 선언합니다.

```js
console.log('before block')
{
    console.log('inside block')
    const x = 3;
    console.log(x);
}
console.log(`outside block; x=${x}`);       // x is not defined
```

### 06. closure (내부 함수에 접근할 수 있는 방식)

### 07. 즉시 호출하는 함수 표현식

**IIFE**

```js
(function() {
    // IIFE 바디
})();
```

> IIFE의 장점은 내부에 있는 것들이 모두 자신만의 스코프를 가지지만, IIFE 자체는 함수이므로 그 스코프 밖으로 무언가를 내보낼 수 있다는 점입니다.

**IIFE 기본 예제**

```js
const message = (function() {
    const secret = "I m scret!";
    return `The secret is ${secret.length} characters long.`
})();
console.log(message);
```
> 변수 secret은 IIFE의 스코프 안에서 안전하게 보호되면 외부에서 접근할 수 없습니다. IIFE는 함수이므로 무엇이든 반환할 수 있습니다.

**IIFE를 이용한 함수 호출 카운트 예제**

```js
// 호출된 함수를 가지고 있는 변수 f
const f = (function() {
    let count = 0;
    return function() {
        return `i have been called ${++count} time(s).`
    }
})();

f();    // 1
f();    // 2
```

### 08. 사각지대

사각지대 (temporal dead zone)란 let으로 선언하는 변수는 선언하기 전까지 존재하지 않는다는 직관적 개념을 잘 나타낸 표현입니다.

> typeof 연산자는 변수가 선언 됐는지 알아볼때 널리 쓰이고, 존재를 확인하는 안전한 방법으로 알려져있습니다.

**안전하게 변수 사용여부 확인하기**

```js
    if(typeof x === "undefined") {
        console.log("x doesn't exist or is undefined")
    }
    else {
        // x 사용가능 scope
    }

    let x = 5;  // let은 반복 선언이 블가능 => ERROR
```

### 09. 스트릭트 모드

암시적 전역변수(implicit global)란, var로 변수를 선언하는 것을 잊으면 전역변수를 참조하려고 하고, 그런 전역변수가 없을 시 스스로 만드는 것
그런, 암시적 전역변수를 선언하지 않는 모드

**스트릭트 모드를 다른 스크립트엔 적용하고 싶지 않을때**
```js
(function() {
    'use strict';

    // 코드를 전부 이 안에 작성
    // 이 코드는 스트릭트 모드로 동작,
    // 이 코드와 함께 동작하는 다른 스크립트는
    // 스트릭트 모드에 영향을 받지 않음
})();
```

> 스트릭트 모드는 대부분의 경우에 바람직합니다. 그래서 권합니다.
> 린트 프로그램을 사용한다면, 스트릭트 모드가 막아주는 문제를 대부분 막아줍니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [스코프와 클로저 참조하면 좋은 글](http://meetup.toast.com/posts/86)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
