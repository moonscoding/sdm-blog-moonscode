# JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.
## JavaScript protected 패턴으로 구현하기

<div class="pull-right"> 문스코딩 - 2018.03.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
	* [JavaScript protected 패턴으로 구현하기](#javascript-protected-패턴으로-구현하기)
		* [01. private를 설정하는 기본적인 형태](#01-private를-설정하는-기본적인-형태)
		* [02. 우리가 가져야할 목표는 무엇인가 ?](#02-우리가-가져야할-목표는-무엇인가)
		* [04. protected 사용법 (plugin 이용)](#04-protected-사용법-plugin-이용)
		* [05. 나의 제안의 제안 방식](#05-나의-제안의-제안-방식)

<!-- /code_chunk_output -->

**용어정리**
```
    protected ::
```

### 01. private를 설정하는 기본적인 형태

클로저를 이용한 비공해 변수의 기본적인 형태입니다.

```js
var Car = (function() {

  // 비공개 개체를 저장할 저장소를 만듭니다.
  var privateStore = {};
  var uid = 0;

  function Car(mileage) {
    // 이 인스턴스의 상태를 관리 할 객체를 만듭니다.
    // 비공개 ID를 사용하여 개인용 상점에서 이를 참조하십시오.
    privateStore[this.id = uid++] = {};
    // 비공개 저장소에 비공개 변수 저장
    // instead of on `this`.
    privateStore[this.id].mileage = mileage || 0;
  }

  Car.prototype.drive = function(miles) {
    if (typeof miles == 'number' && miles > 0)
      privateStore[this.id].mileage += miles;
    else
      throw new Error('drive can only accept positive numbers');
  };

  Car.prototype.readMileage = function() {
    return privateStore[this.id].mileage;
  };

  return Car;
}());
```

위의 예제는 각 인스턴스에 고유한 ID를 부여한다음에 다음 이전 에이 코드를 작성한 모든 곳에서 사용합니다.
\_mileage는 이제 모듈 클로저 내에서만 액세스 할 수 있는 객체를 가리키는 privateStore에 있습니다.

하지만 몇가지의 문제가 있습니다.
- 입력 할 코드가 너무 많습니다. 수십 또는 수백 개의 모듈을 가지고 있다면 그것은 곧 부담이 될 것입니다.
- 각 인스턴스에 ID 속성을 저장해야하는데, 이는 선택한 속성 이름에 따라 성가 시거나 잠재적으로 상충됩니다. (WeakMap으로 해결이 가능합니다.)
- 이 대신 privateStore [this.id] 객체를 사용하면 인스턴스의 프로토 타입에 액세스 할 수 없게됩니다.
- **비공개 멤버는 다른 범위에서 정의 된 하위 클래스에서 참조 될 수 없습니다. 즉, 멤버를 보호 할 수 없습니다.**
- 그것은 효율적이지 않습니다.
    privateStore 객체는 각각의 private 인스턴스 객체에 대한 참조를 보유하기 때문에
    이러한 객체 중 어느 것도 가비지 수집 될 수 없습니다.
    공개 인스턴스가 사라지면 해당 개인 속성에 액세스 할 수 없지만 여전히 메모리 공간을 차지하게됩니다.

이러한 단점이 프라이버시를 갖지 않는 것의 단점을 넘어서는 것은 논란의 여지가 있으며 상황에 달려 있습니다.
그러나  전략 (대략 제로 코드)을 사용하여 보았던 코드의 양을 토대로,
개발자는이 상용구에 개인 변수를 유출하는 것을 선호한다고 말하고 싶습니다.

### 02. 우리가 가져야할 목표는 무엇인가 ?

- private 맴버을 선포하고 액세스하는 방법은 간단하고 편리하며 직관적이어야합니다.
- 회원이 private 인지 여부는 코드에서 분명해야합니다.
- private 멤버는 귀하가 선택한 범위 내에서만 액세스 할 수 있어야합니다.
- 개인 회원은 필요한 경우 public 프로토 타입에 액세스 할 수 있어야합니다
- 솔루션은 하위 클래스를 지원해야합니다. 즉 protected 멤버가 가능해야합니다.
- 런타임시 인스턴스 또는 인스턴스의 프로토 타입을 동적으로 변경하면 개인 구성원이 노출되지 않아야합니다.
- 솔루션은 메모리 효율적이어야합니다. (WeakMap사용으로 해결이 가능합니다)

### 04. protected 사용법 (plugin 이용)

PrivateParts 키 기능은 개인 멤버의 액세스를 정의 된 범위로만 제한합니다.
해당 스코프에서만 접근이 가능하기 떄문이죠.
어떻게 안전하게 액세스를 공유 할 수 있을까요 !?

[mozart 이용방법](https://github.com/philipwalton/mozart#building-and-testing)

기본 형태

- protected :: _
- private :: __

```js
var MyConstructor = ctor(function(prototype, _, _protected, __, __private) {
  // ...
})
```

부모 클래스

```js
var ctor = require('mozart');

var Citizen = ctor(function(prototype, _, _protected) {

  // == PUBLIC ==

  prototype.init = function(name, age) {
    _(this).name = name;
    _(this).age = age;
  };

  prototype.vote = function(politician) {
    if (_(this).allowedToVote()) {
      console.log(_(this).name + ' voted for ' + politician);
    } else {
      throw new Error(_(this).name + ' is not allowed to vote.');
    }
  };

  // == PROTECTED ==

  _protected.allowedToVote = function() {
    return this.age > 18;
  };
});
```

자식 클래스

```js
var Criminal = Citizen.subclass(function(prototype, _, _protected) {

  // 생성자
  prototype.init = function(name, age, crime) {
    _(this).crime = crime;
    prototype.super.init.call(this, name, age);
  };

  // protected 함수 상속
  _protected.allowedToVote = function() {
    return _(this).crime != 'felony'
      && _protected.super.allowedToVote.call(this);
  };
});

var joe = new Criminal('Joe', 27, 'felony');

joe.vote('Obama')   // Throws: Joe is not allowed to vote. (자식 클래스 로직으로 fail 처리됨)
```

> 다중 상속 지원하나요 ?

### 05. 나의 제안의 제안 방식

일단 원칙은 이렇습니다.

- 간단한 서브 클래싱.
- 개인 및 보호 된 메서드 및 속성.
- 직관적인 수퍼 메서드 호출.
- 동적 getter 및 setter 생성.

생성자의 스트립에 protected를 넣어 주면 어떨까 생각했습니다.

최초로 생성자에 접근하면 \_pretected에 객체를 만들어 상위 클래스로 전달합니다.

혹은 최상위 생성자가 \_pretected 객체를 만들어 하위 클래스로 전달합니다.

상위 클래스는 하위에 전달하고 싶은게 있다면

생성자의 첫번째 매게변수로 전달받은 \_protected 의 객체를 이용해 하위에 전달할 수 있습니다.

그렇다면, 이 이론을 어떻게 나이스하게 구현할 수 있을까요.

일단 생각한데로 만들어본 초안입니다.

```js

// 각각의 생성자는 해당 메소드를 이용합니다.
static setProtected(_p, arg) {
    let c = [];
    for(let i=0; i<arg.length; i++) { c.push(arg[i]) }
    if(c[0]) { if(!c[0]._protected) c.unshift({ _protected : true }); }
    else c.unshift({ _protected : true });
    _p.set(this, c[0]);
    return c;
}

(function Parent() {
    const _protected = new WeakMap();
    const _create = Symbol();

    return class {

        // # 1. 기존 생성자는 setProtected 메소드를 이용해 _protected 객체를 초기화하고,
        // # 2. super 매소드를 호출하고
        // # 3. 대체 생성자를 부르는 역할을 할 뿐입니다.
        constructor() {
            let c = setProtected(_protected, arguments)
            this[_create](...c.splice(1));
        }

        // # 해당 클래스는 이렇게 대체 생성자를 갖습니다.
        [_create](a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);

            _protected.get(this).tramsmit = () { console.log("hello world") }
        }

    }
}());

(function Child() {
    const _protected = new WeakMap();
    const create = Symbol();

    return class extends Parent {

        constructor() {
            let c = setProtected(_protected, arguments);    // # 1.
            super(...c);                                    // # 2.
            this[_create](...c.splice(1));                  // # 3.
        }

        [create](a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);

            _protected.get(this).tramsmit();
        }
    }
}())

new Parent(1, 2, 3)
new Child(1, 2, 3)
```

> 공유는 가능하나 메소드 변수를 추가하는데 배우 비생산적

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: https://philipwalton.com/articles/implementing-private-and-protected-members-in-javascript/ ](https://philipwalton.com/articles/implementing-private-and-protected-members-in-javascript/)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
