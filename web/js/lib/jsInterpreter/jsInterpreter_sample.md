# JS interpreter, 어디에 쓰는 물건일까요 ?
## Sample로 이해하기
<div class="pull-right"> 문스코딩 - 2018.03.09 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS interpreter, 어디에 쓰는 물건일까요 ?](#js-interpreter-어디에-쓰는-물건일까요)
	* [Sample로 이해하기](#sample로-이해하기)
		* [01. Sample로 이해하기](#01-sample로-이해하기)
		* [02.](#02)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->

### 01. Sample로 이해하기

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS-Interpreter Demo</title>
  <link href="demos/style.css" rel="stylesheet" type="text/css">
  <script>
    // Depending on the URL argument, test the compressed or uncompressed version.
    var compressed = (document.location.search == '?compressed');
    if (compressed) {
      document.write('<scr'+'ipt src="acorn_interpreter.js"></scr'+'ipt>');
    } else {
      document.write('<scr'+'ipt src="acorn.js"></scr'+'ipt>');
      document.write('<scr'+'ipt src="interpreter.js"></scr'+'ipt>');
    }

    var myInterpreter;

	// [#] initApi 처리
    function initAlert(interpreter, scope) {
      var wrapper = function(text) {
        return alert(arguments.length ? text : '');
      };
      interpreter.setProperty(scope, 'alert',
          interpreter.createNativeFunction(wrapper));
    };

	// [#] 자바스크립트 인터프리터를 실행할 준비를 하는 버튼입니다.
    function parseButton() {
      var code = document.getElementById('code').value
      myInterpreter = new Interpreter(code, initAlert);
      disable('');
    }

	// [#] 스탭단위로 진행하는 버튼입니다.
    function stepButton() {
      if (myInterpreter.stateStack.length) {
        var node =
            myInterpreter.stateStack[myInterpreter.stateStack.length - 1].node;
        var start = node.start;
        var end = node.end;
      } else {
        var start = 0;
        var end = 0;
      }
      createSelection(start, end);
      try {
        var ok = myInterpreter.step();
      } finally {
        if (!ok) {
          disable('disabled');
        }
      }
    }

	// [#] 남은 코드를 동시에 실행 시키는 버튼입니다.
    function runButton() {
      disable('disabled');
      myInterpreter.run();
    }

    function disable(disabled) {
      document.getElementById('stepButton').disabled = disabled;
      document.getElementById('runButton').disabled = disabled;
    }

    function createSelection(start, end) {
      var field = document.getElementById('code')
      if (field.createTextRange) {
        var selRange = field.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end);
        selRange.select();
      } else if (field.setSelectionRange) {
        field.setSelectionRange(start, end);
      } else if (field.selectionStart) {
        field.selectionStart = start;
        field.selectionEnd = end;
      }
      field.focus();
    }
  </script>
</head>
<body>
  <h1>JS-Interpreter Demo</h1>

  <p>Enter JavaScript code below, then click <em>Parse</em>.  To execute, either
  click <em>Step</em> repeatedly, or click <em>Run</em> once.
  Open your browser's console for errors.</p>
  <p><textarea id="code">
	<!-- 다음 자바스크립트 코드를 인터프리터할 것입니다. -->
	var result = [];
	function fibonacci(n, output) {
	  var a = 1, b = 1, sum;
	  for (var i = 0; i &lt; n; i++) {
	    output.push(a);
	    sum = a + b;
	    a = b;
	    b = sum;
	  }
	}
	fibonacci(16, result);
	alert(result.join(', '));
	<!-- 다음 자바스크립트 코드를 인터프리터할 것입니다. -->
</textarea><br>
  <button onclick="parseButton()">Parse</button>
  <button onclick="stepButton()" id="stepButton" disabled="disabled">Step</button>
  <button onclick="runButton()" id="runButton" disabled="disabled">Run</button>
  </p>

  <p><small>
  <script>
    if (compressed) {
      document.write('[ Running compressed bundle.  Switch to <A HREF="?uncompressed">raw sources</A>. ]');
    } else {
      document.write('[ Running raw sources.  Switch to <A HREF="?compressed">compressed bundle</A>. ]');
    }
    disable('disabled');
  </script>
  </small></p>

  <p>Read the <a href="docs.html">JS-Interpreter documentation</a>.</p>
  <p>Get the <a href="https://github.com/NeilFraser/JS-Interpreter">source code</a>.</p>

</body>
</html>

```

### 02.

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
