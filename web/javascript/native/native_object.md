

<div class="pull-right">  업데이트 :: 2018.03.18 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [01. Object](#01-object)
* [02. Object Native 메소드 ==(property)==](#02-object-native-메소드-property)
	* [getOwnPropertyDescriptor](#getownpropertydescriptor)
	* [defineProperty](#defineproperty)
	* [getOwnPropertyNames](#getownpropertynames)
	* [getOwnPropertySymbols](#getownpropertysymbols)
	* [assign](#assign)
	* [is](#is)
	* [keys & values & entries](#keys-values-entries)
	* [preventExtensions & isExtensible](#preventextensions-isextensible)
	* [seal & isSealed](#seal-issealed)
	* [freeze & isFrozen](#freeze-isfrozen)
* [03. Object Native 메소드 ==(prototype)==](#03-object-native-메소드-prototype)
	* [getPrototypeOf](#getprototypeof)
	* [setPrototypeOf](#setprototypeof)
	* [create](#create)
	* [\__defineGetter__ & \__defineSetter__](#__definegetter__-__definesetter__)
	* [\__lookupGetter__ & \__lookupSetter__](#__lookupgetter__-__lookupsetter__)

<!-- /code_chunk_output -->

### 01. Object

자바스크립트는 native로 Object라는 객체를 제공하고 있습니다.

Object는 자바스크립트의 가장 최상위 객체로써,

==자바스크립트의 모든 객체는 Object의 프로토타입을 참조합니다.==

```js
var obj1 = {};
var obj2 = new Object();
```

다음 두 객체는 같은 object의 prototype을 참조합니다.

하지만 하나의 차이점은 2번재 코드는 new를 이용해서 생성자를 같는다는 점이 다릅니다.

[JS - 프로토타입(Prototype) 기반 언어](http://moonscode.tistory.com/8)

### 02. Object Native 메소드 ==(property)==

Object가 Property에 접근하는 내장 메소드를 살펴보겠습니다.

#### getOwnPropertyDescriptor

> 자신의 Property 속성 명세 알기

첫번째 매게변수는 instance 두번째 매게변수는 속성 이름이 들어갑니다.

```js
Object.getOwnPropertyDescriptor(obj, prop)
```

다음 데이터는 json을 반환해주며 json이 가지고 있는 속성은 다음과 같습니다.

- value
- writable
- configurable
- enumerable
- get
- set

더 자세히 살펴보고 싶다면,

[JS - 내가 몰랐던 프로퍼티(Property)](http://moonscode.tistory.com/6)를 참고해주세요.

#### defineProperty

> 새로운 Property 속성을 명세와 함께 생성합니다.

```js
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;         // 쓰기 불가 상태
console.log(object1.property1); // 42
```

객체내 프로퍼티의 속성을 설정하고 싶다면 defineProperty를 사용할 수 있습니다.

getOwnPropertyDescriptor 메소드가 반환하는 성질들을 다음 메소드로 정의할 수 있으며

설정하지 않은 속성들은 default => false 입니다.

#### getOwnPropertyNames

> 자신이 가지고 있는 모든 Property Key 배열로 받기 (enumerable에 한정)

```js
const object1 = {
  a: 1, b: 2, c: 3
};

console.log(Object.getOwnPropertyNames(object1)); // expected output: Array ["a", "b", "c"]
```
다음 메소드는 객체의 속성을 배열로 반환해 줍니다.

prototype의 속성은 반환해주지 안고 현재 레벨의 속성값만 반환합니다.

#### getOwnPropertySymbols

> 자신이 가지고 있는 모든 Symbol Key 배열로 받기

심볼이 속성을 숨길 수 있는 자료형으로 알고 있지만,

다음 메소드를 이용하면 객체에 할당된 심볼을 조회할 수 있습니다.

```js
const object1 = {};
const a = Symbol('a');
const b = Symbol.for('b');

object1[a] = 'localSymbol';
object1[b] = 'globalSymbol';

const objectSymbols = Object.getOwnPropertySymbols(object1);

console.log(objectSymbols.length); // expected output: 2
```

#### assign

> 객체의 속성을 다른 객체에 모두 할당합니다. 반복문으로 처리해야할 수고를 덜어줍니다.

```js
const object1 = {
  a: 1, b: 2, c: 3
};
const object2 = Object.assign({}, object1);
console.log(object2); // expected output: { a : 1, b : 2, c : 3}
```

#### is

> 두 객체가 같은지 확인합니다.

==다음은 \==와 같지 않습니다. \==는 강제 형변환이 진행되지만, Object.is는 그렇지 않습니다.==

```js
var obj1 = {}
var obj2 = {}
Object.is(obj1, obj2); // false
Object.is(obj1, obj1); // true
Object.is(obj2, obj2); // true
```

#### keys & values & entries

keys 메소드는 배열로 key 속성만 모아 반환합니다.

values 메소드는 배열로 value 속성만 모아 반환합니다.

두 메소드 모두 key가 숫자일 경우 자동정렬이 된다는 것에 주의해야합니다.

```js
// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering (자동정렬주의)
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo is a property which isn't enumerable
var myObj = Object.create({}, {
  getFoo: {
    value: function () { return this.foo; }
  }
});
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
```

entries 메소드는

다음 메소드는 for ... in 루프에 의해 제공된 순서와 동일한 순서로

객체의 enumerable 속성을 [key, value] 형식으로 반환합니다.

```js
const object1 = { foo: 'bar', baz: 42 };
console.log(Object.entries(object1)[1]); // expected output: Array ["baz", 42]

const object2 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(object2)[2]); // expected output: Array ["2", "c"]

const object3 = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(object3)[0]); // expected output: Array ["2", "b"]
```

#### preventExtensions & isExtensible

> 객체에 추가적으로 속성을 할당하는 것을 막습니다.

```js
const object1 = {};
Object.preventExtensions(object1);

try {
  Object.defineProperty(object1, 'property1', {
    value: 42
  });
} catch (e) {
  console.log(e);
  // Expected output: TypeError: Cannot define property property1, object is not extensible
}
```

#### seal & isSealed

> 객체를 봉인해서 새 속성이 추가 되지 않게 하고, 기존의 모든 속성들을 configurable => false 표시합니다.

현재 등록 정보의 값은 writable을 따라갑니다.

```js
const object1 = { property1: 42 };

Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1); // expected output: 33

delete object1.property1; // cannot delete when sealed
console.log(object1.property1); // expected output: 33
```

#### freeze & isFrozen

> 다음 메소드는 객체를 정지시킵니다. 즉, 새로운 속성이 추가되지 않습니다. 또한 기존의 속성이 제거되지 않습니다.

그리고 기존의 writable, enumerable, configurable속성이 변경되지 않습니다.

프로토타입 또한 바꿀수 없습니다.

메소드는 전달된 객체를 반환합니다.

```js
const object1 = { property1: 42 };
const object2 = Object.freeze(object1);

object2.property1 = 33; // Throws an error in strict mode
console.log(object2.property1); // expected output: 42
```

### 03. Object Native 메소드 ==(prototype)==

#### getPrototypeOf

> 객체의 바로 상위 prototype을 리턴합니다.

==객체.\__proto__와 같습니다.==

```js
const prototype1 = {};
const object1 = Object.create(prototype1);
console.log(Object.getPrototypeOf(object1) === prototype1); // expected output: true
```

#### setPrototypeOf

==MDN :: setPrototypeOf를 사용하지 마세요 !==

객체의 [Prototype]을 변경하는 것은 최신 자바 스크립트 엔진이 속성 액세스를 최적화하는 방식에 따라

모든 브라우저와 JavaScript 엔진에서 매우 느린 작업입니다.

퍼포먼스에 관심이 있다면, 오브젝트의 [Prototype]을 설정하는 것을 피해야합니다.

대신 Object.create ()를 사용하여 원하는 [Prototype]으로 새 객체를 만듭니다.

#### create

> 자식과 부모사이(중간) 프로토타입을 생성합니다.

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);
console.log(me)
```
me 객체를 Child prototype이라고 할때,

person 속성이 Parent prototype으로 Child와 Object 사이의 prototype으로 설정됩니다.

#### \__defineGetter__ & \__defineSetter__

> 다음은 객체의 prototype에 getter & setter를 만드는 속성입니다.

defineProperty () API를 사용하여 getter를 정의하는 데 ==더 이상 사용되지 않습니다.==

```js
obj.__defineGetter__(prop, func)
obj.__defineSetter__(prop, func)
```

#### \__lookupGetter__ & \__lookupSetter__

==Deprecated==


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
