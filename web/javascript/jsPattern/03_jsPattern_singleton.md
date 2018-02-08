# JAVASCRIPT 디자인 패턴 - 싱글턴 패턴

#### 싱글턴 패턴 - 하나의 클래스로 하나의 객체만 만들기.

<div class="pull-right"> 문스코딩 - 2018.01.dd </div>

---

**용어정리**
```
    싱글턴 패턴 ::
```

#### 01. 싱글턴 패턴

객체를 만들때, 하나의 생성자로 여러 객체를 만들 수 있습니다.
하지만 싱글턴 패턴은 필요에 의해 단 하나의 객체만들 만들 때 사용합니다.
C#의 static class와 같은 기능을 의미 합니다.
하나의 객체를 전역적으로 공유해야 할 때 많이 사용됩니다.



```js
var obj = {
    a : "hello",
    b : function() {
        alert(this.a);
    }
}
```

> 바로 객체 리터럴이 사로 싱글턴 패턴의 대표적인 예입니다.
> 저 객체는 단 하나밖에 존재하지 않습니다. 하지만 모든 속성이 공개되어 있다는 단점이 있습니다.

#### 02. Private 싱글턴 패턴

```js
var singleton = (function() {
    var instance;
    var a = 'hello';
    function initiate() {
        return {
            a : a,
            b : function() {
                alert(a);
            }
        };
    }
    return {
        getInstance : function() {
            if(!instance) {
                instance = initate();
            }
            return instance;
        }
    }
})();

var first = singleton.getInstance();
var second = singleton.getInstance();
console.log(first === second); // true
```

> IIFE를 이용해서 비공개 변수를 가질 수 있게 만들어 줍니다.
> 그리고 그 안에 instance 변수와 initiate 함수를 만들어 주고 객체를 리턴 시켜줍니다.

> 한번만 생성되는 객체는 싱글턴 패턴이 적절

#### 03. ES6 싱글톤 패턴

```js
// ES6
let instance;
class Singleton {

    constructor() {
        if (instance) return instance;

        this.name = '김수한무';
        this.date = new Date();
        instance = this;
    }
}

var singleton_1 = new Singleton();
var singleton_2 = new Singleton();

singleton_1 === singleton_2; // true
instance === singleton_1     // true

//ES7
class Singleton {

    // ES7 추가
    static instance;

    constructor() {
        if (instance) return instance;

        this.name = '김수한무';
        this.date = new Date();
        instance = this;
    }
}

var singleton_1 = new Singleton();
var singleton_2 = new Singleton();

singleton_1 === singleton_2 // true

```

#### 04. 문제점

싱글톤은 인스턴스가 너무 많은 일을 하거나
많은 데이터를 공유시킬 경우 다른 클래스의 인스턴스들 간에 결합도가 높아져
"개방-폐쇄원칙"을 위배하게 된다. (= 객체지형설계 원칙에 어긋남)

따라서 수정이 어려워지고 테스트 하기가 어려워진다.

또한 멀티 쓰레드 환경에서 동기화 처리를 안하면 인스턴스 두개가 생성된다던지 하는 경우가 발생할 수 있습니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ES5에서 싱글톤 사용하기 ](https://www.zerocho.com/category/JavaScript/post/57541bef7dfff917002c4e86)

[링크2 :: ES6에서 싱글톤 사용하기 ](https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae)

[링크3 :: 다양한 싱글톤 설정 방법 (원어)](https://medium.com/@dmnsgn/singleton-pattern-in-es6-d2d021d150ae)


Copyright (c) 2017 Copyright Holder All Rights Reserved.
