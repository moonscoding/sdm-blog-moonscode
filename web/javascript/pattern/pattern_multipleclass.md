
<div class="pull-right">  업데이트 :: 2018.07.18 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [다중상속](#다중상속)
* [Reduce](#reduce)
* [MixinBuilder](#mixinbuilder)
* [시작클래스와 중간클래스](#시작클래스와-중간클래스)

<!-- /code_chunk_output -->


### 다중상속

JS는 다중상속이 안됩니다.

그래서 다중상속이 필요할때 흉내내서 비슷하게 처리하는 방법을 소개하고자 합니다.

### Reduce

Reduce함수는 초기값을 받아 배열에 요소들로 차례차례 처리하는 함수입니다.

```js
[1,2,3].reduce((a, b)=>a+b, 0);
```

위의 코드는 다음과 같은 과정을 따를 것입니다.

- 0 + 1 = 1
- 1 + 2 = 3
- 3 + 3 = 6

누적된 값을 전달합니다.

이 원리를 이용해 싱석ㅇ; 누적된 클래스를 전달하면 어떨까요 ?

### MixinBuilder

다음 클래스를 사용하면 실제 다중상속을 처리해주는 것은 아니지만,

비슷하게 처리할 수 있게 도와줍니다.

```js
class MixinBuilder {
	constructor(superclass) {
		this.superclass = superclass;
	}
	with(...mixins) {
		return mixins.reduce((c, mixin) => mixin(c), this.superclass);
	}
};
```

만약 내의 "Multi 클래스"가 "A 클래스"의 속성과 "B 클래스"의 속성을 갖기를 원한다면 ?

```js
const mix = (superclass) => new MixinBuilder(superclass);
class Multi extends mix(A).with(B) {
  // something todo...
}
```

만약 "C 클래스"의 속성까지 갖기를 원한다면 ?

```js
const mix = (superclass) => new MixinBuilder(superclass);
class Multi extends mix(A).with(B, C) {
  // something todo...
}
```

다음과 같은 방식으로 with 메소드 내에 매개변수 값으로 클래스를 추가해주면 다중상과 비슷하게 처리할 수 있습니다.

### 시작클래스와 중간클래스

여기서 "with()"에 들어가는 매개변수 클래스들은 위에 "mix()"에 들어가는 클래스를 상속받아야 합니다.

그래서 중간클래스는 다음과 같은 형태를 따라야 합니다.

```js
const B = (function(superclass) {
  return class extends superclass {

  }
});

const C = (function(superclass) {
  return class extends superclass {

  }
});
```

> 무엇인지는 모르지만 위에 오는 클래스를 상속 받겠습니다.

하지만 "mix()"에 들어가는 상속받을게 없으니

```js
class A {

}
```

> 다음과 같이 정상적인 클래스로 처리해주면 됩니다.

이렇듯 시작클래스들과 중간클래스들을 나눠서 관리해야는 번거로움이 생기는 방법이지만,

중간클래스들을 모듈로 만들어놓고 연속적인 부품처럼 사용할때는 유용한 방법이라 정리해봤습니다.

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
