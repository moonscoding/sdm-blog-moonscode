# JS ES6 - 필수입니다.
## es6 - class

<div class="pull-right"> 문스코딩 - 20178.01.17 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS ES6 - 필수입니다.](#js-es6-필수입니다)
	* [es6 - class](#es6-class)
		* [01. class 기본](#01-class-기본)
		* [02. static 메소드 , 변수](#02-static-메소드-변수)
		* [03. property 안전하게 저장하기 (Keep Data Private)](#03-property-안전하게-저장하기-keep-data-private)
		* [04. 생성종료를 감시하는 감시자](#04-생성종료를-감시하는-감시자)

<!-- /code_chunk_output -->


**용어정리**
```
    getter ::
    setter ::
    static :: 정적
```

### 01. class 기본
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

### 02. static 메소드 , 변수

정적 함수 vs 인스턴스 함수를 먼저 이해해야 합니다.
정적인 함수는 객체에 대해 정의되는 함수지만 객체의 프로퍼티를 변경하진 않습니다.

[[참조] 객체지향을 자제해서 사용해야 하는 이유 ?](http://tech.thegajago.com/2016/02/20/%EC%99%9C-%EC%9E%90%EB%B0%94%EC%97%90%EC%84%9C-static%EC%9D%98-%EC%82%AC%EC%9A%A9%EC%9D%84-%EC%A7%80%EC%96%91%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94%EA%B0%80/)

- 객체의 라이프타임 내에서 static은 계속 살아있게 됩니다.
- static은 재사용성이 떨어집니다.
- 상속이 되지 않습니다.

```js
class StaticMethodCall {
  static staticMethod() {
    return 'Static method has been called';
  }
  static anotherStaticMethod() {
    return this.staticMethod() + ' from another static method';
  }
}
StaticMethodCall.staticMethod();
StaticMethodCall.anotherStaticMethod();
```

**Static과 상속의 관계**

static 메서드는 상속을 통해 오버라이드 되지 않습니다.
정적 메서드는 실행할 때 동적 바인딩을 실행하는 것이 아니고,
컴파일 할 때 결정된 객체의 타입에 따라 실행된 메서드가 결정됩니다.

### 03. property 안전하게 저장하기 (Keep Data Private)

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
> 이 방식은 완전히 참조가 불가능한 것은 아닙니다.
> es6_dataType.md의 symbol 부분을 보면 그 이유를 확인할 수 있습니다.

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

### 04. 생성종료를 감시하는 감시자

여러 클래스를 다중으로 상속처리하다보면 (문어발식 상속),

가장 마지막 클래스의 위치가 제 각각이 되게 됩니다.

그래서 생성자에 있는 로직이 모두 끝난 후에 처리되야 하는 로직을

각각의 마지막 클래스의 생성자 마지막에 설정해주어야 합니다.

**방법1 :: 객체 생성후에 처리하기**

객체를 생성하고, 모든 객체에 메소드를 이용해 처리하는것도 방법입니다.

**방법2 :: 생성자 종료를 감시하기**

해당 방법이 있는지 아직 알 수 없서 방법을 구하는 중입니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [ 링크1 :: 정적함수란 무엇인가 ? ](https://ko.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/static-functions-vs-instance-methods)**
**참조 : [ 링크2 :: 객체지향 프로그래밍에서 Static을 자사용하지 말아야 하는 이유 ?](http://tech.thegajago.com/2016/02/20/%EC%99%9C-%EC%9E%90%EB%B0%94%EC%97%90%EC%84%9C-static%EC%9D%98-%EC%82%AC%EC%9A%A9%EC%9D%84-%EC%A7%80%EC%96%91%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94%EA%B0%80/)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
