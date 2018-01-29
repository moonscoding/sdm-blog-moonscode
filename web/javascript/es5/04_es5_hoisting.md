# JS HOISTING

#### javascript 호이스팅 (hoisting) 이란 무엇인가 ?

<div class="pull-right"> 문스코딩 - 2018.01.dd </div>

---

**용어정리**
```
    hoisting :: 끌어올린다는 뜻으로 선언부 (할당이 아닌) 만 최상위로 올려준다.
```

#### 01. 함수 스코프와 호이스팅

var는 함수 스코프라 불리는 스코프를 가졌습니다.
let으로 변수를 선언하면, 그 변수는 선언하기 전에 존재하지 않습니다.
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
x;  // undefined  ???
var x = 3;
x;  // 3
```

var로 선언한 변수는 끌어올린다는 뜻의 호이스팅 (hoisting)이라는 매커니즘을 따릅니다.
자바스크립트는 함수나 전역 스코프 전체를 살펴보고 var로 선언한 변수를 맨 위로 끌어 올립니다.
여기서 중요한 것은 선언만 끌어 올려진다는 것이며, 할당은 끌어 올려지지 않는 다는 겁니다.

```js
var x;  // 선언(할당은 아닌) 끌어 올려집니다.
x;      // undefined
x = 3;  
x;      // 3
```

#### 02. 함수 호이스팅

```js
f()                 // 'f'
function f() {
    console.log('f');
}

f2();                // ReferrenceError
let f2 = function() {    // 변수할당한 함수는 올려지지 않음
    console.log('f')
}
```
> var와 마찬가지로 함수 선언도 맨 위로 끌어 올려집니다. 따라서 함수를 호출하기전에 사용할 수 있습니다.


#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
