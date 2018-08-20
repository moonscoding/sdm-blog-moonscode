
<div class="pull-right">  업데이트 :: 2018.03.20 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Getter & Setter 필요성](#getter-setter-필요성)
* [Getter](#getter)
	* [Getter 기능](#getter-기능)
	* [Getter 사용법](#getter-사용법)
	* [생성된 객체에 Getter 추가](#생성된-객체에-getter-추가)
	* [동적으로 Getter 정의](#동적으로-getter-정의)
	* [변경할 수없는 패턴 (Immutable Pattern)](#변경할-수없는-패턴-immutable-pattern)
	* [getter에서 주의할 점](#getter에서-주의할-점)
* [Setter](#setter)
	* [Setter 기능](#setter-기능)
	* [Setter 사용법](#setter-사용법)
	* [생선된 객체에 Setter 추가](#생선된-객체에-setter-추가)
	* [동적으로 Setter 정의](#동적으로-setter-정의)
	* [객체의 불변규칙 (Invariant Rule)](#객체의-불변규칙-invariant-rule)
* [get / set 의 상속?](#get-set-의-상속)
* [private 변수에서의 Getter / Setter 처리](#private-변수에서의-getter-setter-처리)
* [결론](#결론)

<!-- /code_chunk_output -->


### Getter & Setter 필요성

getter와 setter를 사용하면

- Validation을 검사
- Lazy Loading
- Read와 Write 권한을 다르게 할 수 있습니다.

그렇기 때문에 클래스 내부에 변수를 정의할 때,

scope를 이용한 private로 처리한 후

getter, setter로 public으로 만들어 주는 방식을 사용하고 있습니다.

### Getter

#### Getter 기능

- 계산 미루기
- 캐싱처리

getter는 getter가 호출되기 전까진 계산을 하지않고 대기합니다.

getter의 값 계산은 실제 값이 필요할 때 이루어 지게 됩니다.

또한, getter는 프로퍼티 값을 나중에 접근하기 위해 값을 캐싱하게 됩니다.

값은 getter가 처음 호출될 때 계산되며, 캐싱하게 됩니다.

#### Getter 사용법

```js

// 선언
var log = ['test'];
var obj = {
  get latest () {
    if (log.length == 0) return undefined;
    return log[log.length - 1]
  }
}
console.log (obj.latest); // "test"를 반환.

// 삭제
delete obj.latest
```

#### 생성된 객체에 Getter 추가

- defineProperty 이용

getter는 객체를 초기화 할때만 생성할 수 있는 건 아닙니다.

객체가 이미 생성된 후에도 추가가 가능합니다.

```js
var o = { a:0 }
Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });
console.log(o.b) // getter를 실행 // a + 1 (=> 1)
```

#### 동적으로 Getter 정의

해당 방식은 ES6 문법에서만 적용됩니다.

지원하지 않는 브라우저가 있으니, babel-polyfill을 이용해주세요.

```js
var expr = "foo";

var obj = {
  get [expr]() { return "bar"; }
};

console.log(obj.foo); // "bar"
```

#### 변경할 수없는 패턴 (Immutable Pattern)

> Immutable Pattern - 객체의 생명 주기동안 내부의 상태가 절대 변경되지 않도록 강제하는 방법

Immutable Pattern은 getter를 이용하면 쉽게 처리할 수 있습니다.

Immutable Pattern을 적용한 객체는 필드에 값을 할당하는 것이 생성자(Constructor)를 통해서만 이루어지고,

필드에 접근을 하는 Getter만 사용하게 됩니다.

```js
const _list = new WeakMap();
const key = new Object();

class SomeClass {

    constructor(list) {
	_list.set(key, list);
    }

    // 필드 자체 값 대신에 복사본을 반환
    getList() {
        // 객체를 복제하는 clone()이라는 메서드가 있다고 가정
        return _list.get(key).clone();
    }
}
```

> 다음과 같이 처리하지 않으면 해당 객체가 리턴되어서 수정이 가능하게 됩니다.

#### getter에서 주의할 점

```js
var o = {
  set foo (val) {
    delete this.foo;
    this.foo = val;
  },
  get foo () {
    delete this.foo;
    return this.foo = 'something';
  }
};

o.foo = "test";
console.log(o.foo); // 'test' 출력
```

> 'something' 이란 값이 나와야 할 것 같지만 'test'가 출력됩니다.
> getter가 값을 캐싱하고 있기 때문입니다.

### Setter

#### Setter 기능

setter는 객체의 프로퍼티를 설정하는 함수를 말합니다.

매게변수를 1개 가지며 그 값은 수정할 값이 되야합니다.

#### Setter 사용법
```js
// 선언
var o = {
  set current (str) {
    this.log[this.log.length] = str;
  },
  log: []
}

// 삭제
delete o.current;
```

#### 생선된 객체에 Setter 추가

- defineProperty 이용

```js
var o = { a:0 };
Object.defineProperty(o, "b", { set: function (x) { this.a = x / 2; } });
o.b = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(o.a) // 5
```

> 이 부분에서 주의해야할 점이 하나 있습니다.
> 만약 getter와 setter를 이미 생성된 객체에 동시에 추가하면 어떻게 될까요 ?

```js
Object.defineProperty(o, "b", { get: function () { return this.a; } });
Object.defineProperty(o, "b", { set: function (x) { this.a = x / 2; } });
```

이 부분은 'b' 라는 property가 다시 호출되는 것이기 때문에

**TypeError: Cannot redefine property** 에러가 발생하게 됩니다.

다음과 같이 처리할 수 있습니다.

```js
Object.defineProperty(yourObject,targetProperty,{
	 get: getter,
	 set: setter,
	 enumerable: true, // depending on your needs
	 configurable: true // depending on your needs
 });
```

> writable를 속성으로 사용할 수 없습니다.

#### 동적으로 Setter 정의

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

#### 객체의 불변규칙 (Invariant Rule)

- string은 절대로 null이여선 안된다.

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

### get / set 의 상속?

결론은 되지 않습니다.

getter / setter 는 property로 처리되기 때문에

상속받을 수 없습니다.

prototype 메소드를 이용해서 상속해야합니다.

### private 변수에서의 Getter / Setter 처리

우리는 클래스 내부의 변수를 private하게 유지하길 원합니다.

또한 메소드 getSomething을 이용해서 프로퍼티의 속성만 얻게 할 수 있는 방법도 있습니다.

하지만, 문제는 하위 클래스에서 private한 변수에 접근할 수 없다는 문제가 있습니다 !

```js
(function Parent() {
    const _prop = new WeakMap();
		const key = new Object()l

    return class {
        constructor(prop) {
            _prop.set(key, prop);
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
		const key = new Object();

    return class {
        constructor(prop) {
            _prop.set(key, prop);
        }

        _getProp() {
            return _prop.get(key);
        }

        _setProp(prop) {
            _prop.set(key, prop);
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

해당 방식을 자바에서는 protected 라고 합니다.

해당 방식을 구현하는 법은 다음글에 작성하도록 하겠습니다.

### 결론

객체지향 언어에서는 객체의 의미를 최대한 살려서 객체와의 관계 안에서 프로그래밍을 하는 것이 바람직합니다.

그런 점에서 객체의 상태는 오로지 그 객체의 동작에 의해서만 접근/변경이 가능하도록 해야하는 것이 맞습니다.

그러면 필드에서 선언할 수 있는 접근 제한자 중에서 private, protected을 활용해야 합니다.

> 이것이 바로 캡슐화입니다.

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
