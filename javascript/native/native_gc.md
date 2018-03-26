# JS - 어디까지 알고있나요 ?
## JS의 Garbage Collection 메모리 관리

<div class="pull-right"> 문스코딩 - 2018.02.03 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS - 어디까지 알고있나요 ?](#js-어디까지-알고있나요)
	* [JS의 Garbage Collection 메모리 관리](#js의-garbage-collection-메모리-관리)
		* [메모리 관리](#메모리-관리)
		* [메모리의 생명 주기](#메모리의-생명-주기)
			* [자바스크립트의 메모리 할당](#자바스크립트의-메모리-할당)
		* [가비지 컬렉션](#가비지-컬렉션)
			* [참조-세기 가비지 콜렉션 (Reference-counting)](#참조-세기-가비지-콜렉션-reference-counting)
			* [객체-참조 가비지 콜렉션 예제](#객체-참조-가비지-콜렉션-예제)
		* [순환 참조](#순환-참조)
		* [마크스위프 알고리즘](#마크스위프-알고리즘)
		* [GC 단점](#gc-단점)
		* [흔한 자바스크립트의 메모리 누수](#흔한-자바스크립트의-메모리-누수)
			* [1. 전역 변수 (window 객체)](#1-전역-변수-window-객체)
			* [2. 잊혀진 타이머 혹은 콜백함수](#2-잊혀진-타이머-혹은-콜백함수)
			* [3. 클로저](#3-클로저)
			* [4. DOM 에서 벗어난 요소 참조](#4-dom-에서-벗어난-요소-참조)

<!-- /code_chunk_output -->


**용어정리**
```
    가비지 컬렌션 :: 필요없는 메모리를 정리하는 과정
		가비지 컬렉터 :: 필요없는 메모리를 수집하는 소프트웨어
		메모리 누수 :: 사용하지 않는 메모리가 해제되지 않는 것
```

### 메모리 관리

혹자는 훌륭한 개발자가 되기 위해선

managed language와 unmanaged language를 각각 1개씩 숙지하라고 말합니다.

managed language란, 말그대로 메모리를 관리해주는 언어입니다. java, javascript, python 등이 있습니다.

unmanaged language란, 메모리를 개발자가 직접 관리해주는 언어입니다. C, C++ 등이 있습니다.

이번에는 managed language인 javascript의 메모리가 어떻게 관리되는지 한번 살펴 보겠습니다.

프로그래밍에서 메모리 관리한 항상 중요합니다.

예전과 달리 메모리 처리에 많이 부담이 덜어졌지만,

프로그래머는 항상 사용자에게 최적의 환경을 제공해야 하는 것은 변하지 않는 사실입니다.

### 메모리의 생명 주기

Allocate memory => Use Memory => Release Memory

1. 메모리 할당 :: 프로그램이 사용할 수 이도록 운영체제가 메모리를 할당합니다.
    - 저수준의 언어는 이를 개발자가 명시적으로 처리해줍니다.
    - 고수준의 언어느 개발자가 이를 신경쓰지 않아도 됩니다.
2. 메모리 사용 :: 할당된 메모리를 실제로 프로그램이 사용하는 단계입니다.
    - 개발자가 필요에 따라 읽기와 쓰기 작업을 진행합니다.
3. 메로리 해제 :: 프로그램에서 필요하지 않은 메모리를 전체를 되돌려 주어 다시 사용가능하게 만드는 단계입니다.
    - 메모리 할당 작업과 마찬 가지로 저수준은 이를 명시합니다.

#### 자바스크립트의 메모리 할당

```js
var n = 374;            // 숫자에 대한 메모리 할당
var s = 'sessionstack'; // 문자에 대한 메모리 할당
var o = {               // 객체 및 그 값에 대한 메모리 할당
  a: 1,
  b: null
};
var a = [1, null, 'str']; // (객체와 같음) 배열과 그 값에 대한 메모리 할당
function f(a) {           // 함수에 대한 할당(함수는 호출할 수 있는 객체임)
  return a + 3;
}
someElement.addEventListener('click', function() { // 함수 표현식 또한 객체를 할당함
  someElement.style.backgroundColor = 'blue';
}, false);
```

다음과 같이 우리가 변수와 함수를 선언하고 함수의 표현식을 이용하는 것이

전부 메모리를 할당하는 과정입니다.

### 가비지 컬렉션

Garbage Collection이란 사용이 완료된 메모리를 정리하는 것 입니다.

고수준의 언어에서는 이를 대부분 **가비지 컬렉터 (Garbage Collector)** 라는 내장된 소프트웨어가 진행합니다.

이것의 역할은 메모리 할당을 추적하고 언제 할당된 메모리가 더 이상 사용하지 않는지 파악해서 자동으로 반환하는 것입니다.

이러한 과정은 모두 추정에 의해서 기반하는데 일반적으로 메모리의 일부가 필요할지 알아내는 문제는 알고리즘으로 풀기 어렵기 때문입니다.

가비지 콜렉션 알고리즘의 핵심 개념은 참조입니다.

A라는 메모리를 통해 (명시적이든 암시적이든) B라는 메모리에 **접근할 수 있다면 "B는 A에 참조된다"** 라고 합니다.

예를 들어 모든 자바스크립트 오브젝트는 prototype 을 암시적으로 참조하고 그 오브젝트의 속성을 명시적으로 참조합니다.

참조가 하나도 없는 경우 가비지 컬렉션의 대상 (garbage collectible)으로 간주합니다.

#### 참조-세기 가비지 콜렉션 (Reference-counting)

```js
var o = {
  a: {
    b:2
  }
};

var o2 = o; // 'o2' 변수는 위의 오브젝트를 참조하는 두 번째 변수입니다.
o = 1;      // 이제 'o2' 변수가 위의 오브젝트를 참조하는 유일한 변수가 되었습니다.

var oa = o2.a; // 위의 오브젝트의 'a' 속성을 참조했습니다.

// 이제 'o2.a'는 두 개의 참조를 가집니다. 'o2'가 속성으로 참조하고 'oa'라는 변수가 참조합니다.

o2 = "yo";
// 이제 맨 처음 'o' 변수가 참조했던 오브젝트를 참조하는 오브젝트는 없습니다.
// (역자: 참조하는 유일한 변수였던 o2에 다른 값을 대입)
// 이제 오브젝트에 가비지 콜렉션이 수행될 수 있을까요 ?
// NO ! 오브젝트의 'a' 속성이 여전히 'oa' 변수에 의해 참조되므로 메모리를 해제할 수 없습니다.

oa = null;
// 'oa' 변수에 다른 값을 할당했습니다.
// 이제 맨 처음 'o' 변수가 참조했던 오브젝트를 참조하는 다른 변수는 없으므로 가비지 콜렉션이 수행됩니다.
```

> 즉 참조하는 값이 없다면 해당 메모리는 가비지 컬렉션이 수행되게 되는 것입니다.

#### 객체-참조 가비지 콜렉션 예제

```js
let obj1 = new Sample(1)
let obj2 = new Sample(2)
let obj3 = new Sample(3)
let arrObj = [ obj1, obj2, obj3 ];

// 다음과 같은 상황에서 어떻게 처리할까요 ?
obj1 = null;    
// 삭제되지 않습니다. 참조값이 있기때문입니다.
console.log(arrObj[0]);

// 만약 이 상태에서 배열의 참조값을 지우면 ? 데이터는 삭제될까요 ?
arrObj.splice(0, 1);
// 더 이상 참조되는 값이 없기 때문에 가비지 컬렌션이 진행됩니다.
```

> 이렇기 때문에 소스코드상에 메모리 참조를 관리하는 것이 매우 중요합니다.
> 다 사용한 메모리는 가비지 컬렉션에 의해 삭제되어야 하지만,
> 만약 개발자가 여기저기에 참조를 걸어 뒀다면 ?
> 가비지 컬렉션을 진행할 수 없을 것입니다.

### 순환 참조

```js
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1은 o2를 참조함
  o2.p = o1; // o2는 o1을 참조함. 이를 통해 순환 참조가 만들어짐.
}
f();
```

다음 예제는 두 객체가 생성되서 서로를 참조해서 순환 참조가 생성됩니다.

이 객체들은 함수 호출이 끝나고 스코프를 벗어나므로 실질적으로 쓸모가 없습니다.

그리고 이들의 객체는 더이상 사용하지 않아 메모리가 반환되야 합니다만,

서로를 참조하고 있기 때문에 가비지 컬렉션 되지 않습니다.

### 마크스위프 알고리즘

객체가 필요한지 결정하기 위해서 이 알고리즘은 해당 객체에 닿을 수 있는지(reachable)를 판단합니다.

다음 마크스워프 알고리즘은 세 단계를 거칩니다.

1. 루트(Roots) :
	일반적으로 루트는 코드에서 참조되는 전역변수입니다.
	예를 들어 자바스크립트에서 루트로 동작할 수 있는 전역변수는 window 객체입니다.
	nodejs에서는 global입니다. 가비지 컬렉터는 모든 루트의 완전한 목록을 만들어냅니다.
2. 활성상태표시 :
	그런 다음 모든 루트와 그 자식들을 검사해 활성화 여부를 표시합니다.
	활성 상태라면 가비지의 대상이 아닙니다.
	루트가 닿을 수 없는 것들도 가비지로 표시됩니다. (참조불가 가비지)
3. 메모리 반환 :
	마지막으로 가비지 컬렉터는 활성으로 표시되지 않은 모든 메모리를 OS에 반환합니다.

(순환참조는 서로에 대한 참조가 있기는 하지만 루트에서는 닿을 수 없는 상태입니다.)

[https://en.wikipedia.org/wiki/Tracing_garbage_collection](https://en.wikipedia.org/wiki/Tracing_garbage_collection)

### GC 단점

- 대단히 큰 규모의 메모리 할당이 일어남
- 요소들의 대부분(혹은 전체)은 닿을 수 없음(unreachable)의 상태로 표시됨(더 이상 필요로 하지 않는 캐쉬에 대한 참조 포인터를 null로 만듦)
- 더 이상의 메모리 할당이 일어나지 않음

이 부분은 메모리 누수라고 말할 수는 없지만

보통때보다 많은 메모리를 사용하는 원인이 되기도 합니다.

### 흔한 자바스크립트의 메모리 누수

#### 1. 전역 변수 (window 객체)

자바스크립트는 흥미로운 방식으로 선언되지 않은 변수를 처리합니다.

선언되지 않은 변수가 참조되면 전역 객체에 새로운 변수를 생성하는 것입니다.

```js
function foo(arg) {
    bar = "some text";
}
```

```js
function foo(arg) {
    window.bar = "some text";
}
```

다음 두 예제는 같습니다.

다음과 같이 의도치 않게 전역변수를 호출할 수도 있습니다.

```js
function foo() {
    this.var1 = "potential accidental global";
}
// 다른 함수 내에 있지 않은 foo를 호출하면 this는 글로벌 객체(window)를 가리킴
foo();
```

> 자바스크립트 상단에 'use strict'를 사용하면 다음과 같은 모든 문제를 해결할 수 있습니다.

#### 2. 잊혀진 타이머 혹은 콜백함수

```js
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); // 매 5초 마다 실행
```

다음 인터벌 함수는 활성상태동안 외부 변수인 serverData를 저장하고 있습니다.

그래서 옵저버를 사용할 때 그 사용이 종료 되었을 때 꼭 명시적으로 그것을 제거해야합니다.

현재는 브라우저가 모두 지원해 주지만, 옵저버를 제거하는 것이 모범 사례입니다.

```js
var element = document.getElementById('launch-button');
var counter = 0;
function onClick(event) {
   counter++;
   element.innerHtml = 'text ' + counter;
}
element.addEventListener('click', onClick);
// 필요한 작업 수행
element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);
// 이제 요소들이 스코프를 벗어나게 되면
// 순환참조를 잘 처리하지 못 하는 구형 웹브라우저에서도
// 해당 요소와 onClick 콜백을 가비지컬렉터가 가져감
```

#### 3. 클로저

```js
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;

  // 클로저1 unused
  var unused = function () {
    if (originalThing) // 'originalThing'에 대한 참조
      console.log("hi");
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    // 클로저2 someMethod
    someMethod: function () {
      console.log("message");
    }
  };
};
setInterval(replaceThing, 1000);
```

다음은 클로저에서 발생할 수 있는 메모리 누수의 문제점을 나타낸 예제입니다.

replaceThing 함수 내부에는 unused 라는 클러저와 someMethod 라는 클로저가 있습니다.

그리고 다음 2개의 클로저는 originalThing 이라는 외부함수의 변수를 기억하고 있습니다.

> 여기서 발생하는 문제점은 unused는 함수 호출이 끝나면 더이상 사용하지 않아 가비지 컬렉션의 대상이 되야 하지만,
> someMethod와 같이 originalThing을 참조한다는 사실 때문에 활성상태가 유지 됩니다.
> 그 이유는 같은 외부함수의 영역을 기억하고 있는 someMethod가 unused와 클로저 스코프를 공유하고
> someMethod는 외부에서도 접근이 가능하여 활성상태로 남아있기 때문입니다.

이것을 파악하고 개발을 하는 것은 자바스크립트 메모리 관리에 큰 도움이 될 것입니다.

[Link :: An interesting kind of JavaScript memory leak](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)

#### 4. DOM 에서 벗어난 요소 참조

Dom 노드를 데이터 구조속에 저장하는 경우가 있습니다.

```js
var elements = {
    button: document.getElementById('button'),
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
    // image는 body 요소의 바로 아래 자식임
    document.body.removeChild(document.getElementById('image'));
    // 이 순간까지 #button 전역 요소 객체에 대한 참조가 아직 존재함
    // 즉, button 요소는 아직도 메모리 상에 있고 가비지컬렉터가 가져갈 수 없음
}
```

다음과 같이 dom 요소를 데이터에 저장하면, dom을 참조하는 곳이 2곳이 생기게 되는 셈입니다.

이 열들을 제거하고자 결정한다면 이 두가의 참조가 모두 제거되야 합니다.

또 하나, Dom 트리의 리프 노드나 내부 노드를 참조할 때 고려할 것은

테이블 내의 셀 태그를 참조하고 있다가 해당 테이블을 Dom에서 제거한 상태에서 해당 셀에 대한 참조를 갖고 있다면

커다란 메모리 누수가 발생할 수 있습니다.

해당 셀만 놔두고 나머지 부분을 가지비 컬렉터가 반환시켜줄꺼라 생각할 수 있지만,

실제로는 그 셀은 테이블의 자식 노드이고

그 자식 노드들은 부모에 대한 참조를 갖고 있기 때문에 테이블 셀에 참조 만으로 전체 테이블이 메모리에 남습니다.

> 자바스크립트에서 메모리 관리는 그렇게 큰 부분이 아닐 수 있으나,
> 해당 부분을 알고 개발하는 것과 알지 못하고 개발하는 것은 큰 프로젝트에서 많을 영향이 있을 것입니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: 가비지 컬렌션](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-4%EA%B0%80%EC%A7%80-%ED%9D%94%ED%95%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98-%EB%8C%80%EC%B2%98%EB%B2%95-5b0d217d788d)

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
