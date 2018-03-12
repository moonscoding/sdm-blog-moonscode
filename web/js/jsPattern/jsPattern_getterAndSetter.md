# JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.
## Getter & Setter에 대한 고찰

<div class="pull-right"> 문스코딩 - 2018.02.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
	* [Getter & Setter에 대한 고찰](#getter-setter에-대한-고찰)
		* [01. Getter & Setter는 필요할까요 ?](#01-getter-setter는-필요할까요)
		* [02. Getter](#02-getter)
			* [2.1 Getter의 기본](#21-getter의-기본)
			* [2.2 Immutable Pattern을 적용할 때](#22-immutable-pattern을-적용할-때)
		* [03. Setter](#03-setter)
			* [3.1 Setter의 기본](#31-setter의-기본)
			* [3.2 객체의 불변규칙(Invariant Rule) - string은 절대로 null이여선 안된다.](#32-객체의-불변규칙invariant-rule-string은-절대로-null이여선-안된다)
		* [04. get / set 메소드로 상속이 되나요?](#04-get-set-메소드로-상속이-되나요)
		* [05. private 변수에서의 Getter / Setter 처리](#05-private-변수에서의-getter-setter-처리)
		* [05. 결론](#05-결론)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. Getter & Setter는 필요할까요 ?

getter와 setter를 사용하면
- 변수에 새로운 값을 할당할 때마다 Validation을 검사할 수 있게 됩니다.
- lazy loading을 할 수 있게 됩니다.
- read와 write 권한을 다르게 할 수 있습니다. (예를 들면 getter는 pubic, setter는 private)
- 상속을 사용하는 경우, getter와 setter를 overriding해서 클래스마다 validation 등을 다르게 할 수 있습니다.

### 02. Getter

#### 2.1 Getter의 기본

getter & setter는 Object의 변수에 접근하는 메소드를 말합니다.

getter는 프로퍼티의 속성을 read 합니다.

getter는 프로퍼티 값을 나중에 접근하기 위해 캐싱하는 것입니다.
값은 getter가 처음 호출될 때 계산되며, 캐싱됩니다. 이후의 호출에는 다시 계산하지 않고, 이 캐시 값을 반환합니다.

```js
var log = ['test'];
var obj = {
  get latest () {
    if (log.length == 0) return undefined;
    return log[log.length - 1]
  }
}
console.log (obj.latest); // "test"를 반환.
```

**Getter 삭제**
```js
delete obj.latest
```

**객체가 생성된 후 Getter 추가**
```js
var o = { a:0 }
Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });
console.log(o.b) // getter를 실행합니다. a + 1 (= 1)이 반환됩니다.
```

**동적 프로퍼티 Getter**

해당 방식은 ES6 문법에서만 적용됩니다. babel-polyfill을 이용해주세요.
```js
var expr = "foo";

var obj = {
  get [expr]() { return "bar"; }
};

console.log(obj.foo); // "bar"
```

#### 2.2 Immutable Pattern을 적용할 때

> Immutable Pattern: 객체의 생명 주기동안 내부의 상태가 절대 변경되지 않도록 강제하는 방법

Immutable Pattern을 적용한 객체는 필드에 값을 할당하는 것이 생성자(Constructor)를 통해서만 이루어지고,

필드에 접근을 하는 Getter만 사용하게 됩니다.

```js
const _list = new WeakMap();

class SomeClass {

    constructor(list) {
        _list.set(this, list);
    }

    // 필드 자체 값 대신에 복사본을 반환
    getList() {
        // 객체를 복제하는 clone()이라는 메서드가 있다고 칩시다.
        return _list.get(this).clone();
    }
}
```

> 다음과 같이 처리하지 않으면 해당 객체가 리턴되어서 수정이 가능하게 됩니다.

### 03. Setter

#### 3.1 Setter의 기본

**Setter 선언**w
```js
var o = {
  set current (str) {
    this.log[this.log.length] = str;
  },
  log: []
}
```

**Setter 삭제**
```js
delete o.current;
```

**Setter 추가**
```js
var o = { a:0 };
Object.defineProperty(o, "b", { set: function (x) { this.a = x / 2; } });
o.b = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(o.a) // 5
```

**동적 Setter 추가**

```js
var expr = "foo";

var obj = {
  baz: "bar",
  set [expr](v) { this.baz = v; }
};

console.log(obj.baz); // "bar"
obj.foo = "baz";      // run the setter
console.log(obj.baz); // "baz"
```

#### 3.2 객체의 불변규칙(Invariant Rule) - string은 절대로 null이여선 안된다.

항상 변수의 Exception을 처리하다보면 Null 또는 타입 검사에 대한 위치를 고민하게 됩니다.

하지만, 이에 대한 명쾌한 답이 있습니다.

> "밖에서 먼저 null 검사를 하고 field1에 할당하면 되지 않나요?"

그러면 field1이 Non-Null이라는 불변규칙이 객체 안에 내재화 되지 못하고 객체 외부에서 떠돌아다니게 됩니다.

이런 것을 캡슐화 위반이라고 합니다.

단순한 필드 접근 이상의 기능을 넘어가면 당연히 메서드를 통해서만 가능합니다. (내부 구현 은닉)

```js
// [#] null은 Object로 처리됩니다.
setProp(prop) {
    if(typeof(prop) != "string") return;
    this.prop = prop;
}
```

### 04. get / set 메소드로 상속이 되나요?

### 05. private 변수에서의 Getter / Setter 처리

우리는 클래스 내부의 변수를 private하게 유지하길 원합니다.

또 다른 사람의 접근으로 변수를 바꾸지 않게 말입니다.

그래서 앞서 클래스 내부에 변수를 private 하게 하는 방식을 알아봤습니다. (es6_class.md 참조)

해당 방식으로 접근하면 또 다른 사람의 변수의 접근을 막을 수 있습니다.

또한 메소드 getSomething을 이용해서 프로퍼티의 속성만 얻게 할 수 있는 방법도 있습니다.

하지만, 문제는 하위 클래스에서 private한 변수에 접근할 수 없다는 문제가 있습니다 !

```js
(function Parent() {
    const _prop = new WeakMap();

    return class {
        constructor(prop) {
            _prop.set(this, prop);
        }
    }
}())

(function Child() {
    const _prop = new WeakMap();

    return class extends Parent {
        constructor(prop) {
            // _prop를 얻을 수 없다.
        }
    }
}())
```

그렇기 떄문에 \_getProp()라는 함수를 열어줘서 Child 클래스에서 해당 스코프에 접근하게 해줘야만 합니다.


```js
(function Parent() {
    const _prop = new WeakMap();

    return class {
        constructor(prop) {
            _prop.set(this, prop);
        }

        _getProp() {
            return _prop.get(this);
        }

        _setProp(prop) {
            _prop.set(this, prop);
        }
    }
}())

(function Child() {
    const _prop = new WeakMap();

    return class extends Parent {
        constructor(prop) {
            // _getProp를 얻을 수 있다.
        }
    }
}())
```

하지만 이렇게 하면 외부에 메소드가 열리게 됩니다.

다음과 같은 방법중에 메소드를 열지않고 scope를 하위로 전달하는 방법은 없을까요?

즉, 스코프를 클래스끼리만 공유하는 것입니다.

### 05. 결론

부작용 위주로 프로그래밍을 하는 명령형 언어에서는 간결성, 신속성, 합목적성을 추구하겠지만,

객체지향 언어에서는 객체의 의미를 최대한 살려서 객체와의 관계 안에서 프로그래밍을 하는 것이 바람직합니다.

그런 점에서 객체의 상태는 오로지 그 객체의 동작에 의해서만 접근/변경이 가능하도록 해야하는 것이 맞습니다.

그러면 필드에서 선언할 수 있는 접근 제한자 중에서도 public이나 (package)는 빼고 private, protected만 쓸 수 있도록 해야하지 않을까 생각해봅니다.

캡슐화란 이런 것이지요.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: getter ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get)

[링크2 :: setter ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set)

[링크3 :: 댓글중에 참고해야할 좋은 글이 있습니다. civilizeddev ](http://qna.iamprogrammer.io/t/encapsulation-getter-setter/193/7)

[링크4 :: protected에 대한 누군가의 견해](http://huns.me/development/516)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
