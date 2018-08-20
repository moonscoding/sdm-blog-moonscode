

<div class="pull-right">  업데이트 :: 2018.01.25 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [심볼(Symbol)](#심볼symbol)
* [심볼을 이용한 private](#심볼을-이용한-private)
* [심볼과 객체조사(열거) (object-inspection)](#심볼과-객체조사열거-object-inspection)
* [심볼 registry](#심볼-registry)
* [심볼과 IE](#심볼과-ie)

<!-- /code_chunk_output -->

### 심볼(Symbol)

심볼은 어떤 값과도 다릅니다.

심볼은 항상 유일, 다른 어떤 심볼과도 일치하지 않습니다. (객체와 유사합니다.)

```js
var mySymbol = Symbol();
obj[mySymbol] = "ok!";
console.log(obj[mySymbol]); // ok!
```

```js
const RED = Symbol("The color of a sunset!")
const ORANGE = Symbol("The color of a sunset!")
console.log(RED === ORANGE)     // false (모든 심볼은 유일한 값을 가집니다.)
console.log(typeof RED)         // symbol
```

심볼안에 들어가는 문자열은 키가 아닌 주석입니다 !

이 문자열은 디버깅을 할때 유용합니다.

심볼값을 console.log()로 찍거나 .toString()을 이용하거나 에러 메세지에서 참조할 경우 이 문자열일 출력됩니다.

> 다른 식별자와 혼동해서 안되는 고유한 식별자가 필요하다면 심볼을 사용하세요 !

### 심볼을 이용한 private

```js
// 고유한 심볼을 생성
var isMoving = Symbol("isMoving");

if (element[isMoving]) {
  smoothAnimations(element);
}
element[isMoving] = true;
```
element[isMoving]은 심볼을 키로 갖는 속성입니다.

obj.property 과 같은 '.'을 사용해서 접근할 수 없습니다.

심볼을 키로 갖는 속성은 반드시 '[]'를 이용해서 접근할 수 있습니다.

이미 심볼값을 알고 있는 경우, 심볼을 키로 갖는 속성에 접근하는 것은 쉽습니다,

위의 예제 처럼 element[isMoving], if(isMoving in element) 처럼 속성을 첨조하거나

delete element[isMoving] 처럼 속성을 삭제할 수도 있습니다.

**하지만 이런 모든 행위는 심볼이 스코프 안에 있을때만 가능합니다.**

이런 방식으로 심볼을 간단한 캡슐화 매카니즘으로 사용할 수 있습니다.

어떤 모듈이 스스로 심볼을 만드는 경우 해당 모듈은 해당 심볼을 모든 객체에 적용할 수 있습니다.

다른 코드가 만드는 속성과 전혀 충돌할 걱정을 하지 않아도 됩니다.

### 심볼과 객체조사(열거) (object-inspection)

객체조사란 for-in과 같은 객체 내부를 반복하는 것을 말합니다.

심볼은 충돌을 피하기 위해 만들어 진 것이기 때문에, ==객체조사에서 심볼키들은 무시== 당합니다.

Object.keys(obj)와 Object.getOwnPropertyNames(obj)도 마찬가지입니다.

하지만, **Object.getOwnPropertySymbols(obj)** 와 같은 메소드를 통해 심볼을 참조할 수 있습니다.

**Reflect.ownKeys(obj)** 는 문자열 키(key)와 심볼 키(key)를 모두 리턴합니다.

### 심볼 registry

Symbol.for(string)을 호출합니다.

### 심볼과 IE

IE는 심볼을 지원하지 않습니다. 그렇기 때문에 심볼을 IE에 어떻게 적용할지 생각해야합니다.

**babel-polyfill을 사용하세요 !**

만약 ES6를 이용하고 있다면 다양한 브라우저 지원을 위해 build 툴을 사용하고 있을 것입니다.

이부분에 babel-polyfill을 사용한다면, ES6에서 생성된 다양한 기능을 사용할 수 있습니다.


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
