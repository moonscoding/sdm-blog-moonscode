# JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.
## 나만의 protected 구현하기 2

<div class="pull-right"> 문스코딩 - 2018.03.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
	* [나만의 protected 구현하기 2](#나만의-protected-구현하기-2)
		* [나만의 Protected 구현하기 (Wrapper 이용하기)](#나만의-protected-구현하기-wrapper-이용하기)
		* [모든 클래스에 해당 Wrapper 적용하기](#모든-클래스에-해당-wrapper-적용하기)
		* [어떻게 생성자의 마지막 나가는 타이밍을 알 수 있을까요 ?](#어떻게-생성자의-마지막-나가는-타이밍을-알-수-있을까요)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 나만의 Protected 구현하기 (Wrapper 이용하기)

우리는 명시적으로 '\_' 접두사를 사용해서 private를 표현하곤 합니다.

하지만 해당 방식은 불안정하고 완벽하지 않습니다.

그래서 이번에 구현할 방법은,

이번에 구현할 방법은 클래스를 원래 방식대로 구현하고 마지막에 wrapper() 메소드를 이용해

protected를 감춰버리는 방법입니다.

코드를 먼저 보겠습니다.

```js
/**
 * getProtected
 *
 * 다음 함수는 '_' 접두사를 가지고 있는 함수를 숨기고,
 * 'public'한 속성과 메소드만을 property로 만들어 반환하는 함수입니다.
 * */
 function getProtected(obj) {

	 let scope = obj;    // [#] 스코프 저장소
	 let result = {};    // [#] protected 객체

	 // [#] Object down to top ( child -> parent -> object )
	 for (let o = scope; o != Object.prototype; o = Object.getPrototypeOf(o)) {

		 // [T]
		 // console.log(o);

		 for (let name of Object.getOwnPropertyNames(o)) {

			 // [T]
			 // console.log(name);

			 // if (typeof scope[name] == 'undefined') continue;
			 if (name == 'constructor') continue;                 // [#] 생성자 제외
			 if (name[0] == '_') continue;                        // [#] '_' protected 제외

			 if(!result[name]) setProperty(scope, o, result, name);
		 }

		 function setProperty(scope, o, result, name) {

			 let preDescriptor = Object.getOwnPropertyDescriptor(o, name);
			 let newDescriptor = {};

			 if(preDescriptor.get || preDescriptor.set) {

				 // [#] CASE01 - used getter & setter

				 if(preDescriptor.get) newDescriptor.get = function() { return scope[name]; };
				 if(preDescriptor.set) newDescriptor.set = function(param) { scope[name] = param; };
				 /*if(preDescriptor.enumerable)*/ newDescriptor.enumerable = true;
				 if(preDescriptor.configurable) newDescriptor.configurable = true;
				 Object.defineProperty(result, name, newDescriptor);
				 return;
			 }
			 else {

				 // [#] CASE02 - property & prototype

				 // [#] 분기처리

				 // [#] number & string - 객체 참조 (함수이용)
				 if (
					 (typeof scope[name] !== 'object' && typeof scope[name] !== 'function')
					 ||
					 scope[name] === null
				 ) {
					 newDescriptor.get = function() { return scope[name]; };
					 newDescriptor.set = function(param) { scope[name] = param; };
					 if(preDescriptor.enumerable) newDescriptor.enumerable = true;
					 if(preDescriptor.configurable) newDescriptor.configurable = true;

					 // [*] getter & setter 를 숨기기 위해 상위로 보내면, 모든 객체에서 getter & setter 를 상속 받게 됩니다.
					 // result.__proto__ (X)
					 Object.defineProperty(result, name, newDescriptor);
					 return;
				 }

				 // [*] Function - scope 유지
				 if(scope[name] instanceof Function) {
					 result[name] = function(...arg) {
						 scope[name](...arg)
					 };
					 return;
				 }

				 // [#] RegExp - 객체 참조
				 if(scope[name] instanceof RegExp) {
					 result[name] = scope[name];
					 return;
				 }

				 // [#] Date - 객체 참조
				 if(scope[name] instanceof Date) {
					 result[name] = scope[name];
					 return;
				 }

				 // [#] Array - 객체 참조
				 if(Array.isArray(scope[name])) {
					 result[name] = scope[name];
					 return;
				 }

				 // [#] Object - 객체 참조
				 else {
					 result[name] = scope[name];
					 return;
				 }

			 }
		 }
	 }
	 return result;
 }
```

> 해당 방식은 '\_' 접두사를 사용하고 있는 public한 속성들을
> 모두 private를 요청한 것으로 인식해서 function 안에 scope에 감춘후에
> '\_' 접두사를 가지지 않는 속성만 return하는 방식입니다.
> 오브젝트에 적용시켜 모든 객체가 getProtected 메소드를 갖게 할 수도 있습니다.

일단 Wrapping 하는 것이기 때문에 객체가 많다면, 성능상 문제가 있을수 있습니다.

### 모든 클래스에 해당 Wrapper 적용하기

```js
class ToBeProtected {

	constructor() {

			// how to know latest construcor
			if(마지막생성자라면) return getProtected(this);
	}
}
```

> 다음과 같이 사용한다면 클래스를 사용하는 상위사용자는
> 개발자가 의도한 Protected 속성만 가진 객체를 받게 될 것입니다.

### 어떻게 생성자의 마지막 나가는 타이밍을 알 수 있을까요 ?


### 용어정리
```

```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
