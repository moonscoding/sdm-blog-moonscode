# JS interpreter, 어디에 쓰는 물건일까요 ?
## Blockly Sample로 Async 이해하기
<div class="pull-right"> 문스코딩 - 2018.03.09 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS interpreter, 어디에 쓰는 물건일까요 ?](#js-interpreter-어디에-쓰는-물건일까요)
	* [Blockly Sample로 Async 이해하기](#blockly-sample로-async-이해하기)

<!-- /code_chunk_output -->


```js
var demoWorkspace = Blockly.inject('blocklyDiv',
	{media: '../../media/',
	 toolbox: document.getElementById('toolbox')});
Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
						   demoWorkspace);

// Exit is used to signal the end of a script.
Blockly.JavaScript.addReservedWords('exit');

var outputArea = document.getElementById('output');
var runButton = document.getElementById('runButton');
var myInterpreter = null;
var runner;

function initApi(interpreter, scope) {
  // Add an API function for the alert() block, generated for "text_print" blocks.
  var wrapper = function(text) {
	text = text ? text.toString() : '';
	outputArea.value = outputArea.value + '\n' + text;
  };
  interpreter.setProperty(scope, 'alert',
	  interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  var wrapper = function(text) {
	text = text ? text.toString() : '';
	return interpreter.createPrimitive(prompt(text));
  };
  interpreter.setProperty(scope, 'prompt',
	  interpreter.createNativeFunction(wrapper));

  // Add an API for the wait block.  See wait_block.js
  initInterpreterWaitForSeconds(interpreter, scope);

  // Add an API function for highlighting blocks.
  var wrapper = function(id) {
	id = id ? id.toString() : '';
	return interpreter.createPrimitive(highlightBlock(id));
  };
  interpreter.setProperty(scope, 'highlightBlock', interpreter.createNativeFunction(wrapper));
}

var highlightPause = false;
var latestCode = '';

function highlightBlock(id) {
  demoWorkspace.highlightBlock(id);
  highlightPause = true;
}

function resetStepUi(clearOutput) {
  demoWorkspace.highlightBlock(null);
  highlightPause = false;
  runButton.disabled = '';

  if (clearOutput) {
	outputArea.value = 'Program output:\n=================';
  }
}

// [#] 해당 부분이 중요합니다.
// 		해당 부분은 각각의 자바스크립트 값에 하이라이트블록기능을 추가로 삽입합니다.
// 		하이라이트블록기능을 기준으로 step 코드가 끝나는 시점을 확인합니다.
function generateCodeAndLoadIntoInterpreter() {

  // JavaScript 코드를 생성하고 파싱합니다.
  Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  Blockly.JavaScript.addReservedWords('highlightBlock');
  latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace);

  resetStepUi(true);
}

function resetInterpreter() {
  myInterpreter = null;
  if (runner) {
	clearTimeout(runner);
	runner = null;
  }
}

function runCode() {
  if (!myInterpreter) {
	// First statement of this code.
	// Clear the program output.
	resetStepUi(true);
	runButton.disabled = 'disabled';

	// And then show generated code in an alert.
	// In a timeout to allow the outputArea.value to reset first.
	setTimeout(function() {
	  alert('Ready to execute the following code\n' +
		'===================================\n' +
		latestCode);

	  // Begin execution
	  highlightPause = false;
	  myInterpreter = new Interpreter(latestCode, initApi);
	  runner = function() {
		if (myInterpreter) {
		  var hasMore = myInterpreter.run();
		  if (hasMore) {
			// Execution is currently blocked by some async call.
			// Try again later.
			setTimeout(runner, 10);
		  } else {
			// Program is complete.
			outputArea.value += '\n\n<< Program complete >>';
			resetInterpreter();
			resetStepUi(false);
		  }
		}
	  };
	  runner();
	}, 1);
	return;
  }
}

// [#] 지금 인터프리터를로드하고 나중에 변경할 때.
generateCodeAndLoadIntoInterpreter();
demoWorkspace.addChangeListener(function(event) {
  if (!(event instanceof Blockly.Events.Ui)) {
	// Something changed. Parser needs to be reloaded.
	resetInterpreter();
	generateCodeAndLoadIntoInterpreter();
  }
});
```

---

**Created by SDM**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
