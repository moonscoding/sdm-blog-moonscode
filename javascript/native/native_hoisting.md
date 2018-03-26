# JS - 어디까지 알고있나요 ?
## 알지만 모르는, 호이스팅(hoisting)

<div class="pull-right"> 2018.01.05 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS - 어디까지 알고있나요 ?](#js-어디까지-알고있나요)
	* [알지만 모르는, 호이스팅(hoisting)](#알지만-모르는-호이스팅hoisting)
		* [선언과 정의](#선언과-정의)
		* [함수 레벨 스코프와 호이스팅](#함수-레벨-스코프와-호이스팅)
		* [함수 호이스팅](#함수-호이스팅)

<!-- /code_chunk_output -->


**용어정리**
```
    hoisting :: 끌어올린다는 뜻으로, 선언부 (할당이 아닌) 만 최상위로 올려준다.
```

### 선언과 정의

호이스팅은 선언과 정의의 개념에 밀접한 연관이 있습니다.

일부 언어는 선언(declaration) 정의(definition)를 명확히 구분합니다.

- 선언 :: 변수를 선언한다는 것은 식별자를 주어서 그 존재를 알리는 것입니다.
- 정의 :: 변수를 정의한다는 것은 선언과 함께 값도 부여하는 것을 말합니다.

자바스크립트에서는 모든 변수를 동시에 값이 주어지므로 두 용어를 구분하지 않습니다.
명시적으로 정하지 않으면 undefined가 암시적으로 적용됩니다.

```js
var a;        // 선언
var b = 'b';  // 선언 + 정의
let c;        // 선언
let d = 'd';  // 선언 + 정의

// 함수의 선언이 이루어진 예입니다.
function funcA() { }

// 함수의 선언과 정의가 동시에 이루어진 예입니다.
var funcA = function() {}
```

### 함수 레벨 스코프와 호이스팅

=='var' 과 '함수의 선언'== 은 함수 레벨의 스코프를 가집니다.
=='let' 과 'const'== 는 블록 레벨의 스코프를 가집니다.

다음 내용을 자세하게 알고 싶다면 다음을 참고해주세요.
[스코프(Scope)의 모든것](http://moonscode.tistory.com/3)

'var'는 함수 레벨 스코프라 불리는 스코프를 가졌습니다.

'let'으로 변수를 선언하면, 그 변수는 선언하기 전에 존재하지 않습니다.

var로 선언한 변수는 현재 스코프 안이라면 어디서든 사용가능하며, 심지어 선언하기 전에도 사용할 수 있습니다.

```js
let var1;
let var2 = undefined;
var1 // undefined
var2 // undefined
undefinedVar // ReferrenceError
```

```js
x;  // ReferenceError
let x = 3;
```

```js
x;  // undefined !?
var x = 3;
```

'var'로 선언한 변수는 끌어올린다는 뜻의 ==호이스팅(hoisting)== 이라는 매커니즘을 따릅니다.

자바스크립트는 함수나 전역 스코프 전체를 살펴보고 'var'로 선언한 변수를 맨 위로 끌어 올립니다.

==여기서 중요한 것은 선언만 끌어 올려진다는 것이며, 할당은 끌어 올려지지 않는 다는 겁니다.==

```js
var x;  // 선언(할당은 아닌) 끌어 올려집니다.
x;      // undefined
x = 3;  
x;      // 3
```

### 함수 호이스팅

```js
f()                      // 'f'
function f() {           // 함수 선언
    console.log('f');
}

f2();                    // ReferrenceError
let f2 = function() {    // 함수 할당
    console.log('f')
}
```

'var'와 마찬가지로 함수 선언도 맨 위로 끌어 올려집니다.

따라서 함수를 호출하기전에 사용할 수 있습니다.

> 자바스크립트에서 함수 레벨 스코프에 호이스팅을 제공하지만,
> 블록 레벨 스코프, 'let'과 'const'를 사용하는 것을 권하고 싶습니다.
> 문맥에 흐름에 맞는 직관적인 소드코드 운용이 가능하기 때문입니다.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

Copyright (c) 2017 Copyright Holder All Rights Reserved.
