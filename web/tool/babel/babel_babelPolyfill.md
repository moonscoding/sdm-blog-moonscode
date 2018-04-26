# ES6 to ES5, Babel로 배포하기
## ES6 문법을 자유롭게, babel-polyfill

<div class="pull-right"> 문스코딩 - 2018.02.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [ES6 to ES5, Babel로 배포하기](#es6-to-es5-babel로-배포하기)
	* [ES6 문법을 자유롭게, babel-polyfill](#es6-문법을-자유롭게-babel-polyfill)
		* [01. babel-polyfill 이란,](#01-babel-polyfill-이란)
		* [02. 설치](#02-설치)
		* [03. 적용](#03-적용)
		* [04. 일괄 적용하기 (feat. webpack)](#04-일괄-적용하기-feat-webpack)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. babel-polyfill 이란,

ES6가 점점 중요해지고 있습니다.

그에 따라 새로운 기법을 브라우저에 많이 적용하고 있지만,

IE 와 같은 부라우저는 아직 ES6를 지원하고 있지 않습니다.

그럴 때마다 해당 기능을 똑같이 만들어 추가해줬지만,

babel-polyfill을 이용하면 자동으로 모든 기능을 추가해 줍니다.

### 02. 설치

```
npm install --save-dev babel-polyfill
```

### 03. 적용

node_modules에 설치된 babel-polyfill의 dist 파일을 배포하는 스크립트 파일에 적용시켜주면 됩니다.

```js
import "babel-polyfill";
```

다음과 같이 적용했다면, WeakMap, Symbol 등등 다양한 ES6문법을 사용할 수 있게됩니다.

### 04. 일괄 적용하기 (feat. webpack)

```js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
