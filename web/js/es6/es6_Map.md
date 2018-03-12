# JS ES6 - 필수입니다.
## ES6 - Map 이란 무엇인가 !.

<div class="pull-right"> 문스코딩 - 20178.01.18 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS ES6 - 필수입니다.](#js-es6-필수입니다)
	* [ES6 - Map 이란 무엇인가 !.](#es6-map-이란-무엇인가)
		* [01. Map의 기본 원리](#01-map의-기본-원리)
		* [02. keys(), values(), entries()](#02-keys-values-entries)
		* [03. WeakMap(위크맵)을 알아보자](#03-weakmap위크맵을-알아보자)
		* [~~**WeakMap을 지원하지 않는 브라우저에서 직접 생성하기 (ES5 :: WeakMap)**~~](#~~weakmap을-지원하지-않는-브라우저에서-직접-생성하기-es5-weakmap~~)

<!-- /code_chunk_output -->


**용어정리**
```
    Map :: 객체의 단점을 보완한 collection framework (KEY//VALUE로 저장)
    WeakMap :: GC이 적용된 Map (private한 객체를 저장할때 사용)
    set() ::
    get() ::
    has() ::
    delete() ::
    clear() ::
    size ::
    keys() ::
    values() ::
    entries() ::
```

### 01. Map의 기본 원리

es6 이전에는 키와 값을 연결하려면 객체를 사용합니다.
하지만 이러한 단점을 가집니다.

- 프로토타입 체인 때문에 의도치 않은 연결 발생
- 객체 안에 연결된 키와 값이 몇개나 되는지 쉽게 알아낼 수 없음
- 키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값과 연결 할 수 없음
- 객체는 프로터피 순서를 보장치 않음

이 문제들을 해결하기 위해 Map을 사용합니다.
키와 값을 연결할 목적이라면 객체보다 나은 선택
예를 들어 사용자 객체가 여럿 있고 이들에게 각각 역할을 부여하면 ?

```js
const u1 = { name : "User1" }
const u2 = { name : "User2" }
const u3 = { name : "User3" }
const u4 = { name : "User4" }

// create()
const userRoles = new Map();

// set()
usrRoles.set(u1, "User1")
usrRoles.set(u2, "User2")
usrRoles.set(u3, "Admin")

// userRoles
//     .set(u1, "User");
//     .set(u2, "User");
//     .set(u3, "Admin");

// const userRoles = new Map([
//     [u1, "User"],
//     [u2, "User"],
//     [u3, "Admin"]
// ])

// get()
userRoles.get(u2);  // "User"

// has()
userRoles.has(u1);  // true

// size
userRoles.size;     // 3

// delete()
userRoles.delete(u1);  

// clear()
userRoles.clear();
userRoles.size;     // 0
```

### 02. keys(), values(), entries()

**keys()** 메서드는 맵의 키를,
**values()** 메서드는 값을,
**entries()** 메서드는 첫 번째 요소가 키이고 두 번쨰 요소가 값이 배열을 각각 반환합니다.

```js

for(let u of userRoles.keys())
    console.log(u.name);

for(let r of userRoles.values())
    console.log(r);

for(let ur of userRoles.entries())
    console.log(`${ur[0]}.name : ${ur[1]}`)

// # destruct (분해)
for(let [u, r] of userRoles.entries())
    console.log(`${u.name} : ${r}`)

```

### 03. WeakMap(위크맵)을 알아보자

- 키는 반드시 객체
- WeakMap의 키는 가비지 컬렉션에 포함될 수 있음
- WeakMap은 이터러블이 아니며 clear() 메서드가 없음

> 일반적으로 js 는 어딘가 객체를 참조하는 한 그 객체의 메모리에 계속 유지합니다.
> 하지만 WeakMap은 그렇지 않아서, 그래서 이터러블이 될 수 없습니다.
> WeakMap은 이런 특징으로 객체 인스턴스 전용 (private) 키를 저장하기에 알맞습니다.

```js
const SecretHolder = (() => {
    const secrets = new WeakMap();
    return class {
        setSecret(secret) {
            secrets.set(this, secret);
        }
        getSecret() {
            return secrets.get(this);
        }
    }
})

const a = new SecretHolder();
const b = new SecretHolder();

a.setSecret("secret A");
b.setSecret("secret B");

a.getSecret()
b.getSecret()
```

> 맵을 사용해도 되지만 그렇게 하면 SecretHolder 인스턴스에 저장한 내용은 가비지 콜렉션에 포함되지 않습니다.

```js
let wm = new WeakMap();
let myfun = function() {};

// 이 함수가 얼마나 실행됐는지를 알려고 할때.
wm.set(myfun, 0);
console.log(wm);    // 0

let count = 0;
for(let i=0; i<10; i++) {
  count = wm.get(myfun); //get value
  count++;
  wm.set(myfun, count);
}

console.log(wm.get(myfun)); // 10
myfun = null;               // GC 적용
console.log(wm.has(myfun)); // false
```

> 함수를 몇 번 사용했는지 확인할 수 있는 예제

```js
function Area(height, width) {
  this.height = height;
  this.width = width;
}

// 프로토타입을 통해 함수추가
Area.prototype.getArea = function() {
  return this.height * this.width;
}

let myarea = new Area(10, 20);
console.log(myarea.getArea());  // 200
console.log(myarea.height);     // 20


// WeakMap을 이용하면, 인스턴스관리를 효율적으로 할 수 있습니다.
// GC 대상이 되는 저장소를 따로 만들 수 있습니다.

const wm = new WeakMap();

function Area(height, width) {
  // 해당 객체에 대한 추가 변수를 만들어준다 (private하게..)
  wm.set(this, {height, width});
}

Area.prototype.getArea = function() {
  const {height, width} = wm.get(this);
  return height * width;
}

let myarea = new Area(10, 20);
console.log(myarea.getArea());  // 200
console.log(wm.has(myarea));    // true

myarea = null;
console.log(wm.has(myarea));    // false
```

> WeakMap 활용 예제



### ~~**WeakMap을 지원하지 않는 브라우저에서 직접 생성하기 (ES5 :: WeakMap)**~~

**babel-polyfill을 이용하세요!**

```js
/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: false latedef: false */
/*global define: true */

if (typeof(WeakMap) === 'undefined') WeakMap = (function(global) {
  "use strict";

  function defineNamespace(object, namespace) {
    /**
    Utility function takes `object` and `namespace` and overrides `valueOf`
    method of `object`, so that when called with a `namespace` argument,
    `private` object associated with this `namespace` is returned. If argument
    is different, `valueOf` falls back to original `valueOf` property.
    **/

    // Private inherits from `object`, so that `this.foo` will refer to the
    // `object.foo`. Also, original `valueOf` is saved in order to be able to
    // delegate to it when necessary.
    var privates = Object.create(object), base = object.valueOf
    Object.defineProperty(object, 'valueOf', { value: function valueOf(value) {
      // If `this` or `namespace` is not associated with a `privates` being
      // stored we fallback to original `valueOf`, otherwise we return privates.
      return value != namespace || this != object ? base.apply(this, arguments)
                                                  : privates
    }, configurable: true })
    return privates
  }

  function Name() {
    /**
    Desugared implementation of private names proposal. API is different as
    it's not possible to implement API proposed for harmony with in ES5. In
    terms of provided functionality it supposed to be same.
    http://wiki.ecmascript.org/doku.php?id=strawman:private_names
    **/

    var namespace = {}
    return function name(object) {
      var privates = object.valueOf(namespace)
      return privates !== object ? privates : defineNamespace(object, namespace)
    }
  }

  function guard(key) {
    /**
    Utility function to guard WeakMap methods from keys that are not
    a non-null objects.
    **/

    if (key !== Object(key)) throw TypeError("value is not a non-null object")
    return key
  }

  function WeakMap() {
    /**
    Implementation of harmony `WeakMaps`, in ES5. This implementation will
    work only with keys that have configurable `valueOf` property (which is
    a default for all non-frozen objects).
    http://wiki.ecmascript.org/doku.php?id=harmony:weak_maps
    **/

    var privates = Name()

    return Object.freeze(Object.create(WeakMap.prototype, {
      has: {
        value: function has(object) {
          return 'value' in privates(object)
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      get: {
        value: function get(key, fallback) {
          return privates(guard(key)).value || fallback
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      set: {
        value: function set(key, value) {
          privates(guard(key)).value = value
        },
        configurable: true,
        enumerable: false,
        writable: true
      },
      'delete': {
        value: function set(key) {
          return delete privates(guard(key)).value
        },
        configurable: true,
        enumerable: false,
        writable: true
      }
    }))
  }

  return global.WeakMap = WeakMap
})(this)
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
