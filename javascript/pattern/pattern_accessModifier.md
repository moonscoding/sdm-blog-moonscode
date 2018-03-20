# JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.
## JS, Access Modifier 접근제한자에 대한 고민
<div class="pull-right"> 문스코딩 - 2018.03.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
	* [JS, Access Modifier 접근제한자에 대한 고민](#js-access-modifier-접근제한자에-대한-고민)
		* [01. 접근 제한자](#01-접근-제한자)
		* [02. private](#02-private)
		* [03. protected](#03-protected)
		* [04. Wrapper를 이용한 Protected 구현](#04-wrapper를-이용한-protected-구현)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->


### 01. 접근 제한자

접근 제한자는 객체지향의 필요라고 할 수 있습니다.

클래스는 속성과 메소드의 묶음뿐 아니라 정보은닉에 대한 캡슐화의 좋은 도구 이기도 합니다.

접근 제한자는

- public
- protected
- private

이렇게 3가지가 있습니다.

**public** 은 클래스 내부, 외부 모두 접근이 가능하며,
**protected** 는 클래스 내부간 같은 상속 구조라면 접근이 가능합니다.
**private** 는 같은 상속 구조라도 접근이 불가능 하며 내부에서만 접근이 가능합니다.

### 02. private

사실 자바스크립트는 프로토 타입 기반의 스크립트 언어이기 때문에

접근 제한자에 대한 기능이 녹아 있는 언어는 아닙니다.

그래서, 몇몇 패턴을 이용해서 접근 제한자 기능을 흉내내고자 합니다.

```js
const TobePrivate = function() {

		// private key storage
		const __privateKey = {}

		class TobePrivate {

				constructor(init) {
					this._wm = new WeakMap([init])
				}

				clear() {
					this._wm = new WeakMap();
				}

				get(k) {
					return this._wm.get(k)
				}

				set(k, v) {
					return this._wm.set(k, v);
				}

				has(k) {
					return this._wm.has(k);
				}
		}

		return TobePrivate;
}()
```

일단 가장 많이 이용하는 방법은

다음과 같이 함수의 스코프를 이용하는 방법, WeakMap의 Key를 은닉하는 방법입니다.

### 03. protected

자바스크립트는 공식적으로 protected를 지원하지 않습니다.

하지만 저와 같이 자바스크립트를 이용해 웹 게임을 개발한다면,

protected는 꼭 필요한 기능일 것입니다.

다음은 자바스크립트 기능을 통해서 임의로 protected 기능을 구현한 것입니다.

```js
const TobeProtected = function() {

	const $ = {
		'publicKey1' : 'publicKey1',
		'publicKey2' : 'publicKey2',
		'_protectedKey1' : 'protectedKey1',
		'_protectedKey2' : 'protectedKey2',
		'__privateKey1' : '__privateKey1',
		'__privateKey2' : '__privateKey1'
	}

	class TobeProtected {

		constructor() {
			// [#] 해당 방식으로 property를 설정하지 않습니다.
			this.publicKey1 = 'public1';
			this.publicKey1 = 'public2';

			// [#] public
			console.log(this.publicKey1);
			console.log(this.publicKey2);

			// [#] protected
			console.log(this._protectedKey1)
			console.log(this._protectedKey2)

			// [#] private
			console.log($.__privateKey1)
			console.log($.__privateKey2)

			// [*]
			return Object.makeProtected(this);
		}
	}

	manageGetAndSet(TobeProtected, $);
	return TobeProtected
}()

function manageGetAndSet(cname, props) {
	for(let key in props) {
		if(!cname.prototype[key]){	// [#] class 내부 선언
			if(key[1] != '_') {				// [#] private 제외
				cname.prototype.__defineGetter__(key, function() { return props[key] });
				cname.prototype.__defineSetter__(key, function(p) { props[key] = p });
			}
			else {
				cname.prototype.__defineGetter__(key, function() { return props[key] });
				cname.prototype.__defineSetter__(key, function(p) { props[key] = p });
			}
		}
	}
}


```

TobeProtected는 Closure를 이용해서 스코프에 변수를 기억하고 있습니다.

해당 변수는 Json으로 key-value형식으로 이루어져 있는데,

다음과 같은 규칙을 같습니다.

- public :: 앞에 접두사가 없습니다.
- protected :: 앞에 접두사 '\_'를 갖습니다.
- private :: 앞에 접두사 '\_\_'를 갖습니다.

public 과 protected 는 객체의 property로 추가되며,

private 는 scope 를 이용한 접근만이 가능합니다.

### 04. Wrapper를 이용한 Protected 구현

해당방식은 반환되는 객체를 스코프에 저장하고,

접두사 '\_'를 확인해서 객체의 접근 제한자 여부를 파악하고

올바른 접근 제한자만 가진 객체를 리턴해주는 방식입니다.

```js
Object.prototype.makeProtected = function(obj) {
			let scope = obj;            // [#] 스코프 저장소
			let result = function(){};  // [#] protected 객체

			// [#] Object down to top ( child -> parent -> object )
			for (let o = scope; o != Object.prototype; o = Object.getPrototypeOf(o)) {
				for (let name of Object.getOwnPropertyNames(o)) {
					if (name == 'constructor') continue; // [#] 생성자 제외
					if (name[0] == '_') continue;        // [#] '_' protected 제외
					if(!result.prototype[name]) setProperty(scope, o, result, name);
				}

				function setProperty(scope, o, result, name) {
					let preDescriptor = Object.getOwnPropertyDescriptor(o, name);
					let newDescriptor = {};
					if(preDescriptor.get || preDescriptor.set) {
						// [#] CASE01 - used getter & setter
						if(preDescriptor.get) result.prototype.__defineGetter__(name, function() { return scope[name] });
						if(preDescriptor.set) result.prototype.__defineSetter__(name, function(arg) { scope[name] = arg });
						return;
					}
					else {
						// [#] CASE02 - property & prototype (분기처리)

						// [*] number & string - 객체 참조 (get & set 이용)
						if (
							(typeof scope[name] !== 'object' && typeof scope[name] !== 'function')
							||
							scope[name] === null
						) {
							result.prototype.__defineGetter__(name, function() { return scope[name] });
							result.prototype.__defineSetter__(name, function(arg) { scope[name] = arg });
							return;
						}

						// [*] Function - scope 유지
						if(scope[name] instanceof Function) {
							result.prototype[name] = function(...arg) {
								scope[name](...arg)
							};
							return;
						}

						// [*] Object - 객체 참조
						else {
							result.prototype[name] = scope[name];
							return;
						}
					}
				}
			}
			return new result();
		}
```

### 용어정리
```

```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: WeakMap - Class에 사용하기 ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
