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

#### 02. property 안전하게 저장하기 (Keep Data Private)

**방식1 :: constructor(생성자) closure에 담기**

```js
class Car{
    constructor (a) {
        let a = a;
        this.getA() { return a; }
        this.setA(a) { a = a; }
    }
}
```

> 해당 방식은 메소드 오버라이딩을 사용할 수 없습니다.
> 모든 처리가 constructor(생성자) 안에서 처리가 되야함

**방식2 :: symbol을 이용해서 처리하기**

[참조링크](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)

```js
let SimpleDate = (function() {
  let _yearKey = Symbol();

  class SimpleDate {
    constructor(year) {
      // Check that (year) is a valid date
      // ...

      // If it is, use it to initialize "this" date
      // ...
      this[_yearKey] = year;
    }

    getYear() {
      return this[_yearKey];
    }
  }

  return SimpleDate;
}());
```

> 유니크한 심볼 키를 이용할 수 있습니다.
> 그리고 그 심볼키를 closure에 묶어둘 수 있습니다.

**방식3 :: WeakMap을 이용해서 처리하기**

```js
let SimpleDate = (function() {
  let _years = new WeakMap();

  class SimpleDate {
    constructor(year) {
      // Check that (year) is a valid date
      // ...

      // If it is, use it to initialize "this" date
      // ...
      _years.set(this, year);
    }

    getYear() {
      return _years.get(this);
    }
  }

  return SimpleDate;
}());
```

> property를 key/value 형식으로 WeakMap에 담아둘 수 있습니다.
> 그리고 담아둔 WeakMap을 closure에 묶어둡니다

#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
