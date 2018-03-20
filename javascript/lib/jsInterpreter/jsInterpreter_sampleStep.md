# JS interpreter, 어디에 쓰는 물건일까요 ?
## Blockly Sample로 Step 이해하기
<div class="pull-right"> 문스코딩 - 2018.03.09 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS interpreter, 어디에 쓰는 물건일까요 ?](#js-interpreter-어디에-쓰는-물건일까요)
	* [Blockly Sample로 Step 이해하기](#blockly-sample로-step-이해하기)
		* [01. 예제 살펴보기](#01-예제-살펴보기)
		* [02. initApi](#02-initapi)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. 예제 살펴보기

다음 예제는 Blockly에서 js-interpreter를 통해

스탭을 구현한 예제의 js 부분만을 분석한 것입니다.

```js

// [#] 블록클리 인젝터
var demoWorkspace = Blockly.inject('blocklyDiv',
    {media: '../../media/',
     toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), demoWorkspace);

// [#]
var outputArea = document.getElementById('output');     //
var stepButton = document.getElementById('stepButton'); // 스탭버튼 (순차실행버튼)
var myInterpreter = null;   

// [#] 이 부분은 인터프리터에서 해석할때 필요한 구문을 미리 추가해주는 부분입니다.
//      예를 들어 내가 캐릭터를 움직이는데 moveForward가 필요하다면,
//      이 곳에 추가해서 미리 함수를 선언해야합니다.
//      그렇지 않으면 moveForward는 undefined 되게 됩니다.
// param1 {object}
// param2 {scope}
function initApi(interpreter, scope) {
  // "text_print"블록에 대해 생성 된 alert () 블록 용 API 함수를 추가합니다.
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(function(text) {
        text = text ? text.toString() : '';
        outputArea.value += '\n' + text;
  }));

  // "prompt" 블록에 대한 API 함수를 추가하십시오.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(scope, 'prompt',
      interpreter.createNativeFunction(wrapper));

  // 블록을 강조 표시하기위한 API 함수를 추가합니다.
  var wrapper = function(id) {
    id = id ? id.toString() : '';
    return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));
}

var highlightPause = false;     //
var latestCode = '';            //

// [#] initApi에서 참조하는 블록 하이라이트 기능
// param1 {string}
function highlightBlock(id) {
  demoWorkspace.highlightBlock(id);
  highlightPause = true;
}

// [#] 오른쪽 프로그램 출력을 지운는 함수
function resetStepUi(clearOutput) {
  demoWorkspace.highlightBlock(null);
  highlightPause = false;

  if (clearOutput) {
    outputArea.value = 'Program output:\n=================';
  }
}

// [#]
function generateCodeAndLoadIntoInterpreter() {
  // Generate JavaScript code and parse it.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace);
  resetStepUi(true);
}

// [#] 스탭단위 실행 함수
function stepCode() {
  // [#] 인터프리터가 없다면 생성하고 / 있다면 넘어 갑니다.
  if (!myInterpreter) {  
    // 이 코드의 첫 번째 문장.
    // 프로그램 출력을 지운다.
    resetStepUi(true);
    myInterpreter = new Interpreter(latestCode, initApi);

    // 생성 된 코드를 경고에 표시합니다.
    // timeout에서 outputArea.value가 먼저 재설정되도록합니다.
    setTimeout(function() {
      alert('Ready to execute the following code\n' +
        '===================================\n' + latestCode);
      highlightPause = true;
      stepCode();
    }, 1);
    return;
  }

  // [#] 하이라이트취소
  highlightPause = false;
  do {
    try {
      // [#] 스탭단위실행
      var hasMoreCode = myInterpreter.step();
    } finally {
      // [#] 스탭단위의실행종료
      // [#] 코드가 더이상 없다면
      if (!hasMoreCode) {
        // 프로그램이 완료되고 더 이상 실행할 코드가 없습니다.
        outputArea.value += '\n\n<< Program complete >>';

        myInterpreter = null;
        resetStepUi(false);

        // 프로그램을 실수로 다시 시작하지 않으려면 식히십시오.
        stepButton.disabled = 'disabled';
        setTimeout(function() {
          stepButton.disabled = '';
        }, 2000);

        return;
      }
    }
    // 강조 표시에 도달 할 때까지 계속 실행하고,
    // 또는 코드가 완료되거나 오류가 발생했습니다.
  } while (hasMoreCode && !highlightPause);
}

// 지금 인터프리터를로드하고 나중에 변경할 때.
generateCodeAndLoadIntoInterpreter();
demoWorkspace.addChangeListener(function(event) {
  if (!(event instanceof Blockly.Events.Ui)) {
    // Something changed. Parser needs to be reloaded.
    generateCodeAndLoadIntoInterpreter();
  }
});
```

### 02. initApi

캔버스와 연결된 새로운 함수를 추가하고 싶다면

다음 initApi에 추가해줘야합니다.

initApi의 scope는 캔버스를 조작할 수 있는 영역이여야 합니다.

그래서 **here.move()** 와 같은 방식으로 조작할 수 있어야 합니다.

### 03.

### 용어정리
```

```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
