# JS ES6 - 이젠 필수입니다.
## constructor 파헤치기

<div class="pull-right"> 문스코딩 - 2018.02.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS ES6 - 이젠 필수입니다.](#js-es6-이젠-필수입니다)
	* [constructor 파헤치기](#constructor-파헤치기)
		* [01. 생성자의 생성주기에 대해서 자세하게 살펴보아요.](#01-생성자의-생성주기에-대해서-자세하게-살펴보아요)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. 생성자의 생성주기에 대해서 자세하게 살펴보아요.

```js
class A {
    constructor() {
        console.log("b")

        this.print();
    }

    print() {
        console.log("c")
    }
}

class B extends {
    constructor() {
        console.log("a")
        super();
        console.log("e")
    }

    print() {
        super.print();
        console.log("d")
    }
}

new B();
```

프린트는 알파벳 순으로 진행됩니다.
여기서 중요한 점은 print 'a'를 출력하고
바로 A class에서 print 함수를 호출했을때,
B class의 method를 호출한다는 점입니다.

> 즉, A class의 생성자가 진행될 타이밍엔 이미 자식클래스(B class)의 모든 메소드는 호출 준비가 되어있다는 점입니다.




---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
