

<div class="pull-right">  업데이트 :: 2018.01.05 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [01. 싱글턴 패턴](#01-싱글턴-패턴)
* [02. Private 싱글턴 패턴](#02-private-싱글턴-패턴)
* [03. ES6 싱글톤 패턴](#03-es6-싱글톤-패턴)
* [04. 문제점](#04-문제점)

<!-- /code_chunk_output -->


### 01. 싱글턴 패턴

객체를 만들때, 하나의 생성자로 여러 객체를 만들 수 있습니다.

하지만 싱글턴 패턴은 필요에 의해 단 하나의 객체만들 만들 때 사용합니다.

하나의 객체를 전역적으로 공유해야 할 때 많이 사용됩니다.

```js
var obj = {
    a : "hello",
    b : function() {
        alert(this.a);
    }
}
```

> 바로 객체 리터럴이 싱글턴 패턴의 대표적인 예입니다.
> 저 객체는 단 하나밖에 존재하지 않습니다. 하지만 모든 속성이 공개되어 있다는 단점이 있습니다.

### 02. Private 싱글턴 패턴

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

IIFE를 이용해서 비공개 변수를 가질 수 있게 만들어 줍니다.

그리고 그 안에 instance 변수와 initiate 함수를 만들어 주고 객체를 리턴 시켜줍니다.

한번만 생성되는 객체는 싱글턴 패턴이 적절합니다.

### 03. ES6 싱글톤 패턴

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

### 04. 문제점

싱글톤은 인스턴스가 너무 많은 일을 하거나 많은 데이터를 공유시킬 경우

다른 클래스의 인스턴스들 간에 결합도가 높아져 "개방-폐쇄원칙"을 위배하게 됩니다. ( = 객체지형설계 원칙에 어긋남)

따라서 수정이 어려워지고 테스트 하기가 어려워집니다.
또한 멀티 쓰레드 환경에서 동기화 처리를 안하면 인스턴스 두개가 생성된다던지 하는 경우가 발생할 수 있습니다.

그렇기 때문에 꼭 필요한 곳에 사용해야합니다.

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
