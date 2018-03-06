# JS ES6 - 이젠 필수입니다.

## 코드의 재사용 - 상속

<div class="pull-right"> 문스코딩 - 2018.02.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS ES6 - 이젠 필수입니다.](#js-es6-이젠-필수입니다)
	* [코드의 재사용 - 상속](#코드의-재사용-상속)
		* [01. 싱속](#01-싱속)
		* [02. 다중상속 ? Mixin 패턴으로 해결하세요 !](#02-다중상속-mixin-패턴으로-해결하세요)
		* [03. Mixin 패턴 쉽게 사용하기](#03-mixin-패턴-쉽게-사용하기)
		* [04. Tree 구조의 상속 vs 수평 구조의 상속 어떤것이 더 좋은 방법일까요 ?](#04-tree-구조의-상속-vs-수평-구조의-상속-어떤것이-더-좋은-방법일까요)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. 싱속

클래스를 이용하는데 가장 중요한 것중에 하나가 바로 상속입니다.

상속은 부모 클래스를 통해 여러 자식클래스에게 코드의 재사용성을 높여주는 효과가 있습니다.

### 02. 다중상속 ? Mixin 패턴으로 해결하세요 !

예를 들어 내가 나는 자동차를 만들고 싶다고 했는데

비행기 클래스는 나는 메소드와 자동차 클래스의 움식이는 메소드를 동시에 상속 받고 싶습니다.

이럴땐 어떻게 사용해야 할까요 ?

> JS는 다중상속을 지원하지 않습니다. 그렇기 때문에 비슷한 기능으로 처리해야합니다.

**mixin 패턴을 이용해서 다중상속 흉내내기**

```js
var calculatorMixin = Base => class extends Base {
    calc() { }
};

´
```

다음 예제는 Base 클래스를 인자로 받아서 extends한 클래스를 리턴 받는 것입니다.

이 코드를 익숙한 코드로 바꿔 보겠습니다.

```js
var calculatorMixin = function ( Base ) {
	return class extends Base {
  		calc() { }
	};
}

var randomizerMixin = function ( Base ) {
	return class extends Base {
  		randomize() { }
	};
}
```

그럼 이렇게 만들어 놓은 코드를 다음과 같이 사용할 수 있습니다.

```js
class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
```

### 03. Mixin 패턴 쉽게 사용하기

이번에는 mixin 패턴을 쉽게 사용하는 방법을 알아 보겠습니다.
MixBuilder, mix 를 작성합니다.

```js
class MixinBuilder {  
    constructor(superclass) {
        this.superclass = superclass;
    }

    with(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this.superclass);
        // 위의 한줄은 아래의 코딩과 같은 내용이다.
        // return mixins.reduce(function(c, mixin){
        //     return mixin(c); // c -> this.superclass를 의미한다.
        // }, this.superclass)
    }
}
let mix = (superclass) => new MixinBuilder(superclass);
```

다음과 같이 사용할 수 있습니다.

```js
class Foo { }
class MyClass extends mix(Foo).with(calculatorMixin, randomizerMixin) { }
```

### 04. Tree 구조의 상속 vs 수평 구조의 상속 어떤것이 더 좋은 방법일까요 ?

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: https://blog.seotory.com/post/2017/08/javascript-es6-use-class-and-mixin ](https://blog.seotory.com/post/2017/08/javascript-es6-use-class-and-mixin)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
