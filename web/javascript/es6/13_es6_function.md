# JS ES6 - FUNCTION 정리

#### 함수 ! 알고 사용합시다 !

<div class="pull-right"> 문스코딩 - 2018.01.31 </div>

---

**용어정리**
```
    lexical this ::
    dynamic this ::
```

#### 01. 메소드와 서브루틴

```js
var obj = {
       myMethod: function () {
           setTimeout(function () { ... }, 0);
       }
   }
```

> js에서 서브루틴과 메소드는 함수라는 키워드로 수행됩니다.
> myMethod는 메소드이고, setTimeout의 첫번째 인수는 서브루틴입니다.

함수는 호출될 때 마다 두 가지 스코프(=문맥)을 가집니다.

1. lexical scope는 코드를 둘러싸고 있는 구문 구조를 가리킵니다.
2. dynamic scope는 호출되는 함수를 가르킵니다.

중첩된 구조에서 각각의 scope가 모두 발새한다는 것을 알아야 합니다.
자유 변수는 함수 내부에 정의 되지 않은 변수입니다.
만약 자유 변수를 호출하거나 수정하려고 하면, js는 lexical scope를 통해 변수를 탐색해야합니다.

#### 02. this

함수는 this라 불리는 특별한 변수를 가집니다.
this는 메소드를 호출되는 객체를 참조합니다.
다른 자유 변수들과는 다르게 this는 둘러싸인 코드의 lexical scopes를 탐색하지 않습니다.
this는 실행되는 시점을 통해 함수로 전달됩니다.
함수는 this를 동적으로 전달 받기 때문에 여기선의 this는 dynamic this으로 불립니다.

```js
var jane = {
      name: "Jane",

      logHello: function (friends) {
          var that = this;  // (*)
          friends.forEach(function (friend) {
              console.log(that.name + " says hello to " + friend)
          });
      }
  }


var jane = {
     name: "Jane",

     logHello: function (friends) {
         friends.forEach(function (friend) {
             console.log(this.name + " says hello to " + friend)
         }.bind(this));
     }
 }
```

함수는 서브루틴 실행으로는 잘 동작하지 않습니다.
왜냐하면 함수의 this는 동적이기 떄문입니다.
서브루틴 호출은 this를 전역 객체로 가지거나 엄격 모드에서 undefined로 셋팅됩니다.
불행히도 서브루티은 서브루틴만의 this를 사용하지 않고,
그것을 둘러싸고 있는 메소드의 this를 참조합니다. 그래서 그  자체 this에 접근이 불가능합니다.

#### 03. 화살표 함수

ES6의 화살표 함수는 서브루티을 정의할 때, 일반 함수를 사용하는 것 보다 훨씬 좋습니다.
화살표 함수는 lexical this를 가지기 때문입니다.

**arrow 함수에서의 lexical this**

```js
    x => x + this.y

   function (x) { return x + this.y }.bind(this)
```
위의 함수 표현식은 두 개의 함수를 생성합니다.
첫 번째로 매개변수 x 와 dynamic this 가 있는 익명 함수가 생성됩니다.
두 번째로 이 익명함수에 this가 결함된 바인딩 함수입니다.

> 화살표함수는 마치 bind가 붙어서 생성한 것 처럼 동작합니다.
> 그리고 상대적으로 메모리를 덜 먹습니다. 단지 하나의 엔티티 (this가 외부 함수의 this를 가리키고 있는 함수)가 생성됩니다.

**arrow 함수 vs 일반 함수**

화살표 함수와 일반 함수는 3가지 측면에서 다릅니다.
1. 화살표 함수는 항상 바인딩 된 this를 가집니다.
2. 화살표 함수는 생성자로 사용할 수 없습니다. Construct 라는 내부 메소드와 prototype 속성이 없기 때문입니다.
3. 화살표 함수는 ES6의 새로운 구조이기 때문에 새로운 방식의 인수 조작이 가능하고, 더 이상 arguments 키워드를 지원하지 않습니다.

이외에는 모두 일반 함수와 같습니다.
```js
> typeof () => {}
'function'

> () => {} instanceof Function
true
```

#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ES6의 함수 ](http://webframeworks.kr/tutorials/translate/arrow-function/)

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
