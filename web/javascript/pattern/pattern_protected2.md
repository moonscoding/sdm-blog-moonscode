
<div class="pull-right">  업데이트 :: 2018.03.12 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Protected 구현하기 (Wrapper 이용하기)](#protected-구현하기-wrapper-이용하기)
* [Wrapper 적용하기](#wrapper-적용하기)
* [생성자가 반환됨을 알 수 있을까요 ?](#생성자가-반환됨을-알-수-있을까요)

<!-- /code_chunk_output -->


### Protected 구현하기 (Wrapper 이용하기)

우리는 명시적으로 '\_' 접두사를 사용해서 private를 표현하곤 합니다.

하지만 해당 방식은 불안정하고 완벽하지 않습니다.

그래서 클래스를 원래 방식대로 구현하고 마지막에 wrapper() 메소드를 이용해 protected를 감춰버리는 방법입니다.

코드를 먼저 보겠습니다.

```js
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

해당 방식은 '\_' 접두사를 사용하고 있는 public한 속성들을 모두 private를 요청한 것으로 인식해서 function 안에 scope에 감춘후에 '\_' 접두사를 가지지 않는 속성만 return하는 방식입니다.

오브젝트에 적용시켜 모든 객체가 getProtected 메소드를 갖게 할 수도 있습니다.

하지만 해당 메소드는 새로운 객체를 생성해서 반환하는 것이기 때문에 객체 생성에 대한 메모리 소모가 있을 수 있습니다.

### Wrapper 적용하기

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

### 생성자가 반환됨을 알 수 있을까요 ?

// TODO

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
