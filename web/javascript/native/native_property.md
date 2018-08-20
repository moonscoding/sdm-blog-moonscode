
<div class="pull-right">  업데이트 :: 2018.03.16 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [프로퍼티(Property)](#프로퍼티property)
* [속성값 이해하기](#속성값-이해하기)
	* [value](#value)
	* [get & set](#get-set)
	* [enumerable (열거 할 수 있는)](#enumerable-열거-할-수-있는)
	* [wriatable (쓸 수 있는)](#wriatable-쓸-수-있는)
	* [configurable (구성할 수 있는)](#configurable-구성할-수-있는)
* [Property 속성설정하기](#property-속성설정하기)
	* [defineProperty](#defineproperty)
	* [getOwnPropertyDescriptor](#getownpropertydescriptor)
	* [get&set의 getOwnPropertyDescriptor](#getset의-getownpropertydescriptor)
* [클래스 메소드는 Prototype](#클래스-메소드는-prototype)

<!-- /code_chunk_output -->

### 프로퍼티(Property)

=='Property'== 는 ==속성== 이란 뜻으로, JS에서는 객체 내부의 속성을 의미합니다.

```js
// 객체 생성
var ob = {a: 1};

// property 접근하기
ob.a; // => 1

// property 수정하기
ob.a = 0;
ob.a; // => 0;

// property 추가하기
ob.b = 2;
ob.b; // => 2

// property 삭제하기
delete ob.b;
ob.b; // => undefined
```

### 속성값 이해하기

Property는 총 6가지의 속성을 가지고 있습니다.

- value
- get
- set
- enumerable
- writable
- configurable

여기서 먼저 value, get, set에 대해서 설명하겠습니다.

#### value

value는 일단 프로퍼티의 속성값을 말합니다.

value는 단지 값을 의미할뿐 다른 기능은 없습니다.

value에 대한 접근 권한자를 설정하기 위해서  ==Enumerable, Writable, Configurable==를 이용할 수 있습니다.

#### get & set

get & set 은 ES6에서 부터 나오기 시작한 문법으로

객체의 속성값에 대한 접근 권한자 역할을 할 수 있습니다.

> 그렇기 때문에 get & set 과 wriatable 속성을 함께 줄 수 없습니다.

get & set 자체로 writable의 역할을 가지고 있기 때문입니다.

#### enumerable (열거 할 수 있는)

만약 해당 property가 열거할 수 있는 속성이라면,

==for...in...== 루프를 사용하여 그것들에 접근할 수 있습니다.

또한 개체의 열거 가능한 속성의 키는 ==Object.keys== 메서드를 이용해 반환 받을 수 있습니다.

> 즉, 조회가능여부와 열거가능여부는 엄연히 다릅니다.

Object속성의 기본 property가 for...in... 루프에 반환되지 않는 이유는 해당 속성이 false이기 때문입니다.

```js
var ob = {a:1, b:2};

ob.c = 3;

Object.defineProperty(ob, 'd', {
  value: 4,
  enumerable : false
});

// enumerable속성은 조회가능여부와 엄연히 다릅니다.
ob.d; // => 4

// enumerable속성은 열거가능여부와 관련이 있습니다.
for( var key in ob ) console.log( ob[key] );
// Console will print out
// 1, 2, 3

Object.keys( ob );  // => ["a", "b", "c"]

JSON.stringify( ob ); // => "{a:1,b:2,c:3}"

// enumerable속성은 조회가능여부와 엄연히 다릅니다.
ob.d; // => 4
```

#### wriatable (쓸 수 있는)

만약 property가 쓸 수 있는 속성이라면, 값을 수정할 수 있습니다.

obj.a = 10 과같이 수정할 수 있습니다.

- 원시 속성

```js
var ob = {a: 1};
Object.defineProperty( ob, 'B', {value: 2, writable:false} );

ob.B = 6; // => 6
ob.B = 1000; // => 1000

// Wriatable속성은 값을 수정하는 것과 관련이 있습니다.
ob.B; // => 2;

function updateB(){
  'use strict';
  ob.B = 4; // Error
}
updateB(); // Error
```

- 참소 속성

```js
var ob = {a: 1};
Object.defineProperty( ob, 'OB', {value: {c:3}, writable:false} );

// Wriatable속성을 Object에 줬다면 객체 내부 수정은 가능합니다.
ob.OB.c = 4;
ob.OB.d = 5;
ob.OB; // => {c:4, d:5}

// Wriatable속성을 Object에 줬다면 객체의 변경은 되지 않습니다.
ob.OB = 'hola';
ob.OB; // => {c:4, d:5}
```

#### configurable (구성할 수 있는)

구성 가능한 property는 삭제 연산자를 사용하여 제거 할 수있는 여부를 의미합니다.

> delete obj.a; 다음 명령어를 사용할 수 있는가 여부를 나타냅니다.

```js
var ob = {};
Object.defineProperty(ob, 'a', { configurable:false, writable:true });

// throws a TypeError (이미 정의된 객체의 속성을 변경할 수 없습니다.)
Object.defineProperty(ob, 'a', { enumerable: true });

// throws a TypeError (이미 정의된 객체의 속성을 변경할 수 없습니다.)
Object.defineProperty(ob, 'a', { value: 12 });  

// This is allowed!!! (이부분만 가능합니다. 수정가능 > 수정불가)     
Object.defineProperty(ob, 'a', { writable: false });  

// throws a TypeError (수정불가가 된 후로는 처리할 수 있습니다.)
Object.defineProperty(ob, 'a', { writable: true });   
```

```js
var ob = {};

Object.defineProperty( ob, 'a', {configurable: true, value: 1} );
delete ob.a; // => true
ob;          // => {}

Object.defineProperty( ob, 'a', {configurable: false, value: 1} );
delete ob.a; // => false
ob;          // => {a:1}
```

### Property 속성설정하기

#### defineProperty

앞서 설명한 속성들을 defineProperty를 통해서 만들수 있습니다.

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

> enumerable, writable, configurable의 기본값은 false라는 점을 기억해 둬야합니다.

#### getOwnPropertyDescriptor

getOwnPropertyDescriptor 메서드를 이용하면 정의한 값의 속성을 확인할 수 있습니다.

```js
Object.getOwnPropertyDescriptor(obj, 'c');
// { value : 3, enumerable : false, writable : false, configurable : false }
```

#### get&set의 getOwnPropertyDescriptor

그럼 우리가 지금까지 사용했던 기능을 이용해서 get&set이 속성은 어떻게 구성되는지 살펴보겠습니다.

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

- enumerable, configurable, writable의 기본속성은 'true'
- 반대로, defineProperty를 이용해서 변수를 정의할 때, 기본값 'false'
- get&set의 enumerable과 configurable의 기본값은 'true'
- get&set의 writable 속성은 없음

### 클래스 메소드는 Prototype

> 클래스에 선언하는 함수들은 property가 아니다 !?

ES6가 생기면서 Class단위 개발을 진행할 수있게 되었는데,

일단 Class단위 개발이라고 하더라도 자바스크립트는 프로토타입단위의 언어입니다

```js
class Test {
	constructor () {
		this._a = 'a'
	}

	funcA() {
		console.log(this._a);
	}
}
var t = new Test();

Object.getOwnPropertyDescriptor(t, 'funcA');  
// undefined

Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t), 'funcA');
// {get: ƒ, set: undefined, enumerable: false, configurable: true}
```

==클래스 내부에 선언한 함수들은 prototype에 저장되게 됩니다.==

그래서 funcA를 조회해도 undefined가 나게 되는 것입니다.

올바르게 조회하려면 ==Object.getPrototypeOf(classObj) OR classObj.\__proto\__== 와 같이 처리해주면

참고하고 있는 prototype을 찾아가기 때문에 funcA를 조회할 수 있습니다.


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
