# JS interpreter, 어디에 쓰는 물건일까요 ?
## Intro
<div class="pull-right"> 문스코딩 - 2018.03.09 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS interpreter, 어디에 쓰는 물건일까요 ?](#js-interpreter-어디에-쓰는-물건일까요)
	* [Intro](#intro)
		* [01. JS interpreter란 ?](#01-js-interpreter란)
		* [02. acorn-interpreter](#02-acorn-interpreter)
			* [2.1 Serialization](#21-serialization)
			* [2.2 Threading](#22-threading)
			* [2.3 Security](#23-security)
			* [2.4 Limitations](#24-limitations)
			* [2.5 Dependency](#25-dependency)
			* [2.6 Compatibility](#26-compatibility)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->

### 01. JS interpreter란 ?

JS 인터프리터를 처음 알게 된 것은, Blockly를 접하게되면서 입니다.

JS 인터프리터는 자바스크립트를 해석하는 라이브러리로써,

자바스크립트의 순차적인 진행을 원할때 유용합니다.

예를 들어 게임에서 자바스크립트를 순차적으로 진행시키길 원한다면 ?

다음 라이브러리가 도움이 될 것입니다.

### 02. acorn-interpreter

다음의 기능을 제공하는 몇몇 라이브라리가 있겠지만,

저는 구글 Blockly에서 사용하는 acorn-interpreter를 사용하겠습니다.

[github 링크](https://github.com/NeilFraser/JS-Interpreter)
[doc 링크](https://neil.fraser.name/software/JS-Interpreter/docs.html)
[sample 링크](https://neil.fraser.name/software/JS-Interpreter/index.html)

해당 라이브라이에서는 다음을 특징으로 말합니다.

- Serialization (직렬화)
- Threading
- Security
- Limitations
- Dependency
- Compatibility
- Disclaimer

#### 2.1 Serialization

JS-Interpreter의 고유 한 기능은 실행을 일시 중지하고

현재 상태를 직렬화 한 다음 나중에 실행을 재개하는 기능입니다.

루프, 변수, 클로저 및 다른 모든 상태는 보존됩니다.

#### 2.2 Threading

JavaScript는 단일 스레드이지만 JS-Interpreter는 동시에 여러 스레드를 실행할 수 있습니다.

서로 독립적으로 실행되는 두 개 이상의 완전히 독립적 인 스레드를 만드는 것은 간단합니다.

두 개 이상의 인터프리터 인스턴스를 만들고 각각은 자체 코드를 사용하고 각 인터프리터의 단계 기능을 대신 호출하십시오.

제공되는 외부 API를 통해 서로 간접적으로 통신 할 수 있습니다.

#### 2.3 Security

JS-Interpreter의 일반적인 사용 사례는 잠재적으로 적대적인 코드를 샌드 박싱하는 것입니다.

인터프리터는 기본적으로 안전합니다.

위험한 작업을 방지하기 위해 블랙리스트를 사용하지 않고,

개발자가 제공 한 경우를 제외하고는 외부 API가없는 자체 가상 시스템을 만듭니다.

현재까지 하나의 보안 버그도 보고되지 않았습니다.

#### 2.4 Limitations

인터프리터에 의해 구현 된 JavaScript의 버전은 브라우저에서 실행되는 버전과 약간 다릅니다.

**API**
DOM API는 노출되지 않습니다. 그것은 샌드 박스의 요점입니다. 필요한 경우 자신의 인터페이스를 작성하십시오.
**ES6**
let 또는 Set와 같은 JavaScript에 대한 최근 추가 사항은 구현되지 않습니다. ES5 이상이 필요하면 프로젝트를 포크하십시오.
**toString & valueOf**
객체를 primitives 변환 할 때 사용자가 생성 한 함수는 호출되지 않습니다.
**Performance**
interpreter는 효율적이지 않습니다. 현재 기본 JavaScript보다 약 200 배 느리게 실행됩니다.

#### 2.5 Dependency

유일한 의존성은 Marijn Haverbeke의 JavaScript 파서 인 Acorn입니다. JS-Interpreter 패키지에 포함되어 있습니다.

#### 2.6 Compatibility

브라우저 지원의 제한 요소는 Acorn 및 JS-Interpreter에서 해시 객체를 만들 때 Object.create (null)를 사용하는 것입니다.

그 결과 다음과 같은 최소 브라우저 요구 사항이 발생합니다.

Chrome 5
Firefox 4.0
IE 9
오페라 11.6
사파리 5

### 용어정리

```

```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
