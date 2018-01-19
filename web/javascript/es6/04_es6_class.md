# JAVASCRIPT ES6 - CLASS

#### es6 - class

<div class="pull-right"> 문스코딩 - 20178.01.17 </div>

---

**용어정리**
```
    getter ::
    setter ::
```

#### 01. class 기본

```js
class TempClass {
    constructor (a, b) {
        this.a = a;
        this.b = b;
    }

    get a() {
        return this.a;
    }

    set a(a) {
        // # 이렇게 사용하면 무한루프
        this.a = a;
    }
}

```

#### 02. property 안전하게 저장하기

**방식1**

```js
class Car{
    constructor (a) {
        let a = a;
        this.getA() { return a; }
        this.setA(a) { a = a; }
    }
}
```

> 해당 방식은 메소드 오버라이딩을 사용할 수 없음 

**방식2**

```js
const Car = (function() {
    const carProps = new WeakMap();

    class Car {
        constructor(make , model) {
            this.make = make;
            this.model = model;
            this._usersGears = ['a', 'b', 'c'];
            carProps.set(this, { userGear : this._userGears[0]} )
        }

        get userGear() { return carProps.get(this).userGears; }
        set userGear(value) {
            if(this._userGear.indexOf(value) < 0)
                throw new Error(`Invalid gear : ${value}`);
            carProps.get(this).users = value;
        }

        shift(gear) { this.users = gear }
    }
})

```

즉시, 호출하는 함수 표현식을 사용해서 WeakMap을 클로저로 감싸고 바깝에서 접근할 수 없게 처리합니다.
그리고 WeakMap은 클래스 외부에서 접근하면 안되는 프로퍼티를 안전하게 저장합니다.

#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
