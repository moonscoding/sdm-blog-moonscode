# JS - 어디까지 알고있나요 ?
## 내가 몰랐던 property
<div class="pull-right"> 문스코딩 - 2018.03.16 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS - 어디까지 알고있나요 ?](#js-어디까지-알고있나요)
	* [내가 몰랐던 property](#내가-몰랐던-property)
		* [Property란?](#property란)
		* [속성값 이해하기 (Enumerable, Writable, Configurable)](#속성값-이해하기-enumerable-writable-configurable)
		* [defineProperty & getOwnPropertyDescriptor](#defineproperty-getownpropertydescriptor)
		* [Enumerable 예제](#enumerable-예제)
		* [Wriatable 예제](#wriatable-예제)
		* [Configurable 예제](#configurable-예제)
		* [클래스 함수, no property, prototype 영역!](#클래스-함수-no-property-prototype-영역)

<!-- /code_chunk_output -->

### Property란?

자바스크립트의 property는 다 아는 것 같으면서도 모르는 부분인 것 같습니다.

이번 글을 통해서 자바스크립트의 property를 이해해 보도록 하겠습니다.

```js
// 객체 생성
var ob = {a: 1};

// property에 접근하기
ob.a; // => 1

// property 수정하기
ob.a = 0;
ob.a; // => 0;

// property 새로 생성하기
ob.b = 2;
ob.b; // => 2

// property 삭제하기
delete ob.b;
ob.b; // => undefined
```

### 속성값 이해하기 (Enumerable, Writable, Configurable)

property는 다음과 같은 3가지 속성을 가지고 있습니다.

==- Enumerable :: 열거 할 수 있는==

만약 해당 property가 열거할 수 있는 속성이라면, for...in... 루프를 사용하여 그것들에 접근할 수 있습니다.

또한 개체의 열거 가능한 속성의 키는 Object.keys 메서드를 이용해 반환 받을 수 있습니다.

즉, 조회는 가능하지만 열거해서 볼 수 없는 속성입니다.

Object 속성의 기본 property가 for...in... 루프에 반환되지 않는 이유는 해당 속성이 false이기 때문입니다.

==- Wriatable :: 쓸 수 있는==

만약 property가 쓸 수 있는 속성이라면, 값을 수정할 수 있습니다.

obj.a = 10 과같이 수정할 수 있습니다.

==- Configurable :: 구성할 수 있는==

구성 가능한 property는 삭제 연산자를 사용하여 제거 할 수있는 유일한 특성을 가집니다.

delete obj.a;

### defineProperty & getOwnPropertyDescriptor

Object의 메소드인 defineProperty & getOwnPropertyDescriptor를 사용하면

개발자가 원하는 속성의 propety를 만들수 있습니다.

```js
Object.defineProperty( obj, 'c', {
  value: 3,
  enumerable: false,
  writable: false,
  configurable: false
});
```

다음 코드를 보면 defineProperty로 obj.c 라는 property를 만들었습니다.

열거 할 수 없고, 쓸 수도 없으며, 구성할 수도 없습니다.

getOwnPropertyDescriptor 메서드를 이용하면 정의한 값의 속성을 확인할 수 있습니다.

```js
Object.getOwnPropertyDescriptor(obj, 'c');
// { value : 3, enumerable : false, writable : false, configurable : false }
```

그럼 우리가 지금까지 사용했던 기능을 이용해서

객체의 속성들이 어떻게 구성되는지 살펴보겠습니다.

```js
// 다양한 타입의 속성을 만들어 보겠습니다.
var obj = {
	a : 'a',

	_b : 'b',
	get b () { return this._b; },

	_c : 'c',
	set c (c) { this._c = c; },

	_d : 'd',
	get d () { return this._d; },
	set d (d) { this._d = d; }
}

Object.defineProperty( obj, 'e', { value: 'e'} );
```

```js
Object.getOwnPropertyDescriptor(obj, 'a');
// {value: "a", writable: true, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptor(obj, 'b');
// {get: ƒ, set: undefined, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptor(obj, 'c');
// {get: undefined, set: ƒ, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptor(obj, 'd');
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}

Object.getOwnPropertyDescriptor(obj, 'e');
// {value: "e", writable: false, enumerable: false, configurable: false}
```
> enumerable, configurable 속성은 기본적으로 true로 설정된 것을 볼 수 있습니다.
> getter, setter를 이용하면 writable 속성은 생성되지 않습니다.
> get/set 메소드로 조작할 수 있게 되는 것 입니다.
> 또한, defineProperty를 이용해서 변수를 정의할 때, 기본값은 모두 false입니다.

### Enumerable 예제

```js
var ob = {a:1, b:2};

ob.c = 3;
Object.defineProperty(ob, 'd', {
  value: 4,
  enumerable: false
});

ob.d; // => 4

for( var key in ob ) console.log( ob[key] );
// Console will print out
// 1
// 2
// 3

Object.keys( ob );  // => ["a", "b", "c"]

JSON.stringify( ob ); // => "{a:1,b:2,c:3}"

ob.d; // => 4
```

### Wriatable 예제

```js
var ob = {a: 1};
Object.defineProperty( ob, 'B', {value: 2, writable:false} );

// Assingments returns the value
ob.B = 6; // => 6
ob.B = 1000; // => 1000

// But the property remains the same
ob.B; => 2;

function updateB(){
  'use strict';
  ob.B = 4; // This would throw an exception
}

updateB(); // Throws the exception. I told you.
```

객체는 객체를 변경하는 것 외에, 내부는 수정이 가능합니다.

```js
var ob = {a: 1};
Object.defineProperty( ob, 'OB', {value: {c:3}, writable:false} );

ob.OB.c = 4;
ob.OB.d = 5;

ob.OB; // => {c:4, d:5}

ob.OB = 'hola';

ob.OB; // => {c:4, d:5}
```

### Configurable 예제

```js
var ob = {};
Object.defineProperty(ob, 'a', {configurable:false, writable:true} );

Object.defineProperty(ob, 'a', { enumerable: true }); // throws a TypeError (이미 정의된 객체의 속성을 변경할 수 없습니다.)
Object.defineProperty(ob, 'a', { value: 12 });        // throws a TypeError (이미 정의된 객체의 속성을 변경할 수 없습니다.)
Object.defineProperty(ob, 'a', { writable: false });  // This is allowed!!! (이부분만 가능합니다. 수정가능 > 수정불가)
Object.defineProperty(ob, 'a', { writable: true });   // throws a TypeError (수정불가가 된 후로는 처리할 수 있습니다.)
```
```js
var ob = {};

Object.defineProperty( ob, 'a', {configurable: true, value: 1} );

ob; // => {a:1}
delete ob.a; // => true
ob; // => {}

Object.defineProperty( ob, 'a', {configurable: false, value: 1} );

ob; // => {a:1}
delete ob.a; // => false
ob; // => {a:1}
```

### 클래스 함수, no property, prototype 영역!

> 클래스에 선언하는 함수들은 property가 아니다 !?

> 클래스에 선언하는 함수들은 prototype입니다.

```js
class Test {
	constructor () {
		this._a = 'a'
	}

	get a () { return this._a; }
}
```

```js
var t = new Test();

Object.getOwnPropertyDescriptor(t, 'a');  
// undefined
Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), 'a');
// {get: ƒ, set: undefined, enumerable: false, configurable: true}
```

클래스 내부에 선언한 함수들은 prototype에 저장되게 됩니다.

그래서 getter & setter를 조회해도 undefined가 나게 되는 것입니다.

올바르게 조회하려면 Object.getPrototypeOf(classObj) OR classObj.\__proto\__ 와 같이 처리해주면

참고하고 있는 prototype을 찾아가기 때문에 getter setter를 조회할 수 있습니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: http://arqex.com/967/javascript-properties-enumerable-writable-configurable](http://arqex.com/967/javascript-properties-enumerable-writable-configurable)

[링크2 :: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
