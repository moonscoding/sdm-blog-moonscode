# JS ES6 - 필수입니다.
## ES6 기본 문법 - 자료형

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS ES6 - 필수입니다.](#js-es6-필수입니다)
	* [ES6 기본 문법 - 자료형](#es6-기본-문법-자료형)
		* [01. scope 활용 전략 (var , let 비교)](#01-scope-활용-전략-var-let-비교)
		* [02. ES6 - const](#02-es6-const)
		* [03. ES6 - String](#03-es6-string)
		* [04. Symbol](#04-symbol)
		* [05. null & undefined](#05-null-undefined)

<!-- /code_chunk_output -->


**용어정리**
```
    LITERAL (리터럴) :: 변수를 설정할때 식별자와 할당된 값이 있다. 이중에서 할당된 값을 리터럴이라고 부름
    SCOPE :: 변수가 선언된 영역
    CLOSURE :: 클로저는 외부함수 (포함하고 있는)의 변수에 접근할 수 있는 내부 함수를 일컫습니다. 스코프 체인(scope chain)으로 표현되기도 합니다.
    Symbol (심볼) :: 심볼은 유일한 토큰을 나타내기 위해 새로이 도입한 데이터 타입
```

### 01. scope 활용 전략 (var , let 비교)

ES6 이전에는 아래와 같이 function 단위의 scope만 존재했습니다.
따라서, function 안에 있는 지역변수를 먼저 찾고 이후에 scope chain을 따라 전역변수를 찾는 방식이었습니다.

**ES5 - var**
```js
var name = "global var";

function home() {
    var homevar = "homevar";
    for(var i=0; i<100;i++) {
    }
    console.log(i);
}

home();
```

**ES6 - let**
```js
var name = "global var";

function home() {
  var homevar = "homevar";
  for(let i=0; i<100;i++) {
    console.log(i);
  }
  console.log(i);

  if(true) {
    let myif = "myif";
  }

  console.log(myif);
}

home();
```
let을 사용하게 되면 scope의 범위가 더 지협적으로 변하게 된다.
for문 or if문 안에 let 변수를 사용하게 되면
function 단위인 var 와 다르게 for문 or if문 밖에서는 인식할 수 없음
> 변수의 범위가 작아 더 메모리 소모가 적다는 장점

**closure scope 문제 해결 방법**

```js
var list = document.querySelectorAll("li");
for(let i=0; i<list.length; i++) {
    list[i].addEventListener("click", function(){
        console.log(i + "번째 리스트 입니다");
    });
}
```

### 02. ES6 - const

> const 타입은 변수에 대한 새로운 값 할당이 불가능

```js
function home() {
  const homename = 'my house';
  // homename = "your house";
  console.log(homename);

  const homearray = [1,2,3,4];
  // homearray = ["1", "2"];
  console.log(homearray);

  /*
   하지만 const와 let을 동시에 사용하는 것은 매우 좋지 못한 방법입니다.
   두가지 모두를 사용할 수 있는 경우라면, const를 사용하는 것을 권장합니다.
   만약 변경이 될 수 있는 변수라면, let을 사용합니다.

   var는 사용하지 않는 것이 일종 scope 전략입니다.
  */
}
home();
```

```js
function home() {
  const list = ["apple", "orange", "watermelon"];
  list.push("banana");
  console.log(list);
}

home();
```

> const를 사용하더라도 배열과 오브젝트의 값을 변경하는 것은 가능. (const 값을 재할당하는 코드 형태만 불가능합니다.)


**immutable array**

immutable array는 뒤로가기 앞으로 가기 등 어떤 값을 되돌리고 싶을 때,
그때그떄 저장한 데이터 값을 가져와서 사용하는 array 저장방식

```js
// immutable array를 어떻게 만들지?
// 뒤로가기, 앞으로가기 어떤 값을 되돌리고 싶을때, 그때그때
// 저장한 데이터 값을 가져와서 사용해야할 필요가 생깁니다.

const list = ["apple", "orange", "watermelon"];
list2 = [].concat(list, "banana");
console.log(list, list2);

console.log(list === list2);
```

> const는 재할당은 안되지만 배열, 오브젝트 값을 변경하는 것은 가능


### 03. ES6 - String

```js
// ES2015 string에 새로운 메소드들
let str = 'hello world!';
let matchstr = 'hello';
console.log(str.startsWith(matchstr));              // true
console.log(str.endsWith(matchstr));                // false
console.log("include test", str.includes("world")); // true
```

### 04. Symbol

심볼은 항상 유일, 다른 어떤 심볼과도 일치하지 않습니다. (객체와 유사)

```js
const RED = Symbol("The color of a sunset!")
const ORANGE = Symbol("The color of a sunset!")
console.log(RED === ORANGE)     // false (모든 심볼은 유일)
console.log(typeof RED)         // symbol
```

> 다른 식별자와 혼동해서 안되는 고유한 식별자가 필요하다면 심볼을 사용하세요 !

### 05. null & undefined

null은 프로그래머에게 허용된 데이터 타입 (할당된 값의 텅빈값)
undefined는 자바스크립트 자체에서 사용 (할당조차 되지 않은 빈값)

> 프로그래머가 undefined를 사용하는 경우는 아직 값이 주어지지 않은 변수의 동작을 고의로 흉내낼때 사용


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
