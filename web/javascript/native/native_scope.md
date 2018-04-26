# JavaScript 어디까지 알고있나요?
## 스코프(Scope)에 대한 모든 것

<div class="pull-right"> 2018.01.24 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript 어디까지 알고있나요?](#javascript-어디까지-알고있나요)
	* [스코프(Scope)에 대한 모든 것](#스코프scope에-대한-모든-것)
		* [스코프](#스코프)
		* [스코프 레벨](#스코프-레벨)
			* [함수 레벨 스코프](#함수-레벨-스코프)
			* [블록 레벨 스코프](#블록-레벨-스코프)
		* [전역 스코프](#전역-스코프)
			* [전역스코프 의존 예제](#전역스코프-의존-예제)
			* [단일 객체를 이용한, 전역스코프 의존방지](#단일-객체를-이용한-전역스코프-의존방지)
			* [함수를 이용한, 전역스코프 의존방지](#함수를-이용한-전역스코프-의존방지)
		* [정적 스코프와 동적 스코프](#정적-스코프와-동적-스코프)
		* [스코프와 존재](#스코프와-존재)
		* [스코프 체인](#스코프-체인)
		* [사각지대 관리하기](#사각지대-관리하기)
		* [암시적 전역변수와 스트릭트 모드](#암시적-전역변수와-스트릭트-모드)

<!-- /code_chunk_output -->

### 스코프

=='Scope'== 는 범위라는 뜻을 가지고 있으며,

자바스크립트에서의 Scope는 변수 혹은 함수가 가지는 범위를 의미합니다.

Scope는 ==변수와 상수, 매개변수 (데이터)== 가 언제 어디서 정의되는지 결정합니다.

함수 매개변수가 함수 바디 안에서만 존재하는 것도 스코프의 예 입니다.

```js
function funcA(x) {
    return x + 3;
}
funcA(5); // 8
x;        // x is not defined
```
> x의 스코프가 함수 funcA 이다 ! 라고 말할 수 있습니다.

### 스코프 레벨

스코프 레벨은 2가지 형식으로 나뉠 수 있습니다.

#### 함수 레벨 스코프

자바스크립트는 전통적으로 함수 레벨 스코프를 지원해왔습니다.

=='var'== 키워드로 선언된 변수나, =='함수 선언식'== 으로만들어진 함수는

==함수 레벨 스코프== 를 가집니다.

```js
function funcB() {
	if(true) {
		var hello = 'world';
	}
	console.log(hello)
}
```

#### 블록 레벨 스코프

ES6부터 제공하는 =='let'==, =='const'== 키워드는

==블록 레벨 스코프== 변수를 가집니다.

```js
function funcB() {
	if(true) {
		let hello = 'world'
	}
	console.log(hello);	// Error !
}
```

> ES6가 지원된 후부터는 함수 레벨 스코프인 var를 사용하지 않는 것이 개발에 적합할 것으로 보입니다.

### 전역 스코프

전역 스코프(Global Scope)는 스코프의 최상위에 있는 스코프를 말합니다.

스코프는 계층적이며 트리의 맨 위에는 바탕이 되는 무엇인가 있어야 합니다.

즉, 프로그램을 시작할 때 암시적으로 주어지는 스코프가 필요합니다.

이 스코프를 ==전역 스코프== 라고 합니다. (window 객체)

> 전역 스코프에 몇 가지가 존재하는 건 피할 수 없습니다.
> 하지만 대부분의 스코프들이 전역에 의존하는 것은 피해야 합니다.

#### 전역스코프 의존 예제

다음과 같이 대부분의 데이터가 전역 객체에 의존하고 있는 것을

개발자는 피해야 합니다.

전역 스코프의 의존은 다른 여러 문제들을 야기시킬 수 있습니다.

```js
// 전역 스코프
let name = "Irena";
let age = 25;       
function greet() {
    console.log(`Hello, ${name}!`);
}
function getBirthYear() {
    return new Date().getFullYear() - age;
}
```

#### 단일 객체를 이용한, 전역스코프 의존방지

추 후에 접근 제한자 (Access Modifier)에 대해서 이야기 나눠보겠지만,

다음과 같은 방식은 전역 스코프에 선언되는 것을 줄여주긴 하지만,

선언한 데이터에 접근이 가능하기 때, 완벽한 해결책이라 보긴 어렵습니다.

[접근 제한자란?]()

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

#### 함수를 이용한, 전역스코프 의존방지

다음 예제는 함수형 프로그래밍과 밀접한 연관이 있습니다.

[함수형 프로그래밍이란?]()

```js
function greet(user) {
    console.log(`Hello, ${user.name}!`);
}
function getBirthYear(user) {
    return new Date().getFullYear() - user.age;
}
```

### 정적 스코프와 동적 스코프

보통 렉시컬 스코프(Lexical Scope)와 다이나믹 스코프(Dynamic Scope)로 불리기도 하는

정적 스코프와 동적 스코프에 대해 알아 보겠습니다.

한번에 이해가 되지 않겠지만, 일단 정의를 내려보겠습니다.

동적 스코프 :: 프로그램의 런타임 도중의 실행 컨텍스트나 호출 컨텍스트에 의해 결정됩니다.
정적 스코프 :: 소스코드가 작성된 그 문맥에서 결정됩니다.

> 자바스크립트는 정적 스코프입니다. 소스코드를 보고 문맥에서 변수의 스코프를 확인할 수 있습니다.

```js
const x = 3;

// 함수는 선언 당시의 스코프를 참조합니다.
function f() {
    console.log(x);	// (O)
    console.log(y);	// (X)
}

{
    // 새로운 블록 스코프
    const y = 5;
    f();
}
```

> 위의 예제를 보면 함수는 선언 당시의 스코프를 참조한다는 것을 알 수 있습니다.

==만약 위의 코드가 동적 스코프였다면 ?==

다음 예제는 예러가 나지 않았을 것입니다.

동적 스코프는 호출 컨텍스트에 영역을 받음으로써,

f()를 호출하는 타이밍에 y는 선언이 되있었기 때문입니다.

### 스코프와 존재

스코프와 존재를 살펴보기 전에 ==가시성과 존재== 의 의미를 살펴보겠습니다.

- 가시성 :: 스코프는 프로그램의 현재 실행중인 부분, 실행 컨텍스트에서 현재 보이고 접근 할 수 있는 식별자를 말합니다.
- 존재 :: 그 식별자가 메모리가 할당된 무엇가를 가리키고 있다는 뜻입니다.

> 스코프에 존재하지 않는다고 해도 자바스크립트는 메모리를 바로 회수하지 않습니다.

이 부분은 다음에 이야기 해볼 클로저와 밀접한 관련을 가지고 있습니다.

[클로저 살펴보기](http://moonscode.tistory.com/4)

다음을 살펴보겠습니다.

```js
function funcA() {
	// funcA Scope
	let hello = 'World'

	return function() {
		console.log(hello)
	}
}

function funcC() {
	funcB();
}
```

> funcC를 부르는 타이밍에 funcA내부 스코프에 있는 hello라는 변수는 존재할까요 ?

정답은 '존재한다' 입니다.

funcC는 타이밍에 가시적인 스코프상엔 hello에 접근할 수 없지만

funcB가 hello를 참조하고 있기 때문에

hello는 활성 상태로 자바스크립트의 가비지 컬렉션에 적용되지 않습니다.

[가비지 컬렉션이란?]()

### 스코프 체인

이제 스코프에 대해 어느정도 정리가 됬다면, ==스코프 체인(Scope Chain)== 도 이해할 수 있을 것입니다.

새롭게 정의된 스코프는 상위의 스코프에 접근할 수 있습니다.

```js
// global scope
function funcC() {
	// new block scope
}
```
그리고 위의 스코프가 1개가 아니라면,

중첩된 많은 스코프가 연결되어 있을 것입니다.

이 연결을 스코프 체인이라고 합니다.

스코프 체인은 scope의 가장 내부에서 scope chain을 따라 바깥쪽으로 검색을 하게 됩니다.

### 사각지대 관리하기

사각지대 (temporal dead zone)란,

'let으로 선언하는 변수는 선언하기 전까지 존재하지 않는다'는 직관적 개념을 잘 나타낸 표현입니다.

> typeof 연산자는 변수가 선언 됐는지 알아볼때 널리 쓰이고, 존재를 확인하는 안전한 방법으로 알려져있습니다.

사각지대 해결법 :: 안전하게 변수 사용여부 확인하기

```js
    if(typeof x === "undefined") {
        console.log("x doesn't exist or is undefined")
    }
    else {
        // x 사용가능 scope
    }

    let x = 5;  // let은 반복 선언이 블가능 => ERROR
```

### 암시적 전역변수와 스트릭트 모드

암시적 전역변수(implicit global)란,

var로 변수를 선언하는 것을 잊으면 전역변수를 참조하려고 하고,

그런 전역변수가 없을 시 스스로 만드는 것입니다.

그런, 암시적 전역변수를 선언하지 않는 모드를 스트릭트 모드라고 합니다.

==스트릭트 모드를 다른 스크립트엔 적용하고 싶지 않을때==
```js
(function() {
    'use strict';

    // 코드를 전부 이 안에 작성
    // 이 코드는 스트릭트 모드로 동작,
    // 이 코드와 함께 동작하는 다른 스크립트는 스트릭트 모드에 영향을 받지 않음
})();
```

> 스트릭트 모드는 대부분의 경우에 바람직합니다.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: 스코프와 클로저 참조하면 좋은 글](http://meetup.toast.com/posts/86)

[링크2 :: 스코프를 쉽게 설명한 글](http://hochulshin.com/everything-about-javascript-scope/)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
