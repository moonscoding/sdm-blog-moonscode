
# JAVA SCRIPT
## 오직 나의, 나에 의한, 나를 위한 자바스크립트 정리방식

<div class="pull-right"> 문스코딩 - 2018.02.27 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA SCRIPT](#java-script)
	* [오직 나의, 나에 의한, 나를 위한 자바스크립트 정리방식](#오직-나의-나에-의한-나를-위한-자바스크립트-정리방식)
		* [01. 차례](#01-차례)
			* [dom](#dom)
			* [es5](#es5)
				* [JS - 어디까지 알고 있나요 ?](#js-어디까지-알고-있나요)
			* [es6](#es6)
			* [es7](#es7)
			* [pattern](#pattern)
				* [JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.](#javascript-pattern-세상에-잘-짜여진-코드는-많다)
			* [lib](#lib)
		* [02. 주석 방법](#02-주석-방법)
			* [2.1 기본주석](#21-기본주석)
			* [2.2 함수정의](#22-함수정의)
			* [2.3 파일 정리](#23-파일-정리)
			* [2.4 Get & Set 정의](#24-get-set-정의)
			* [2.5 Class 템플릿](#25-class-템플릿)

<!-- /code_chunk_output -->

### 01. 차례

```
	javascript/
		dom/
		es5(native)/
		es6/
		es7/
		lib/
		pattern/
```

#### dom

자바스크립트를 이용해 html dom을 컨트롤하는 방법이 정리되어 있습니다.

#### es5
##### JS - 어디까지 알고 있나요 ?

자바스크립트의 기본내용은 해당 폴더에 정리되어 있습니다.

- es5_scope.md
- es5_closure.md
- es5_function.md
- es5_gc.md
- es5_hoisting.md
- es5_object.md
- es5_property.md
- es5_prototype.md

#### es6
자바스크립트 ES6에서 추가된 기능만 추가 정리되어 있습니다.
#### es7
자바스크립트 ES7에서 추가된 기능만 추가 정리되어 있습니다.
#### pattern
##### JavaScript Pattern, 세상에 잘 짜여진 코드는 많다.

유용한 자바스크립트 패턴이 정리되어 있습니다.

- pattern_IIFE.md
- pattern_singleton.md
- pattern_get&set.md
- pattern_private.md
- pattern_protected.md
- pattern_accessModifier.md
- pattern_chaining.md
- pattern_functional.md
- pattern_observer.md
- pattern_watcher.md

#### lib
유용한 자바스크립트의 라이브러리가 정리되어 있습니다.

### 02. 주석 방법

#### 2.1 기본주석

```js
// [D] -> 변수 정의
// [S] -> 변수 수정
// [T] -> 테스트 관련
// [E] -> 예외 관련
// [F] -> 함수 관련
// [V] -> 변수 관련
// [!] -> 주의 사항
// [#] -> 중요 사항
```

#### 2.2 함수정의

**함수 기본**

```js
/**
 * @DES :: 내용
 * @IP1 :: 인풋
 * @O.P :: 아웃풋
 * @S.E :: 부작용
 */
```

IP1 , IP2 , IP3 과 같이 늘리며 사용합니다.

**오버라이딩 관련**

```js
// @OVERRIDING
function() {}
```

#### 2.3 파일 정리

```js
/**
 * file_name.js
 *
 * @경로 :
 * @목적 :
 * @설명 :
 * @진행 :
 * @주의 :
 * @이슈 :
 * @일자 :
 * @작성 :
 * @참조 :
 */
```

#### 2.4 Get & Set 정의

```js
// @DES :: HelloWorld[num] - append something...
```

#### 2.5 Class 템플릿
```js
const CNAME = function() {
	// TODO input private variable here...

	return class {

	}
}();
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
