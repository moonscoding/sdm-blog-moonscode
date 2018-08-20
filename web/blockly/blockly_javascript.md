# Blockly
## Blockly 자바스크립트를 통해 다루는법
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Blockly](#blockly)
	* [Blockly 자바스크립트를 통해 다루는법](#blockly-자바스크립트를-통해-다루는법)
		* [01. Blockly + Javascript](#01-blockly-javascript)
		* [02. block](#02-block)
		* [03. function](#03-function)
			* [workspaceToCode](#workspacetocode)
			* [blockToCode](#blocktocode)
		* [04. JS-Interpreter](#04-js-interpreter)

<!-- /code_chunk_output -->



### 01. Blockly + Javascript

Blockly는 각각의 기본 블록에 매칭되는 JavaScript 코드를 가지고 있습니다.

그리고 또한 JS-Interpreter를 이용해서 Blockly를 자바스크립트로 실행시킬 수도 있습니다.

### 02. block

```js
Blockly.JavaScript['block-name']
```

다음 명령어를 통해서 해당 블록의 자바스크립트 내용을 바로 확인할 수 있습니다.

### 03. function

#### workspaceToCode

워크스페이스의 내용을 코드로 바꿔줍니다.

```js
Blockly.JavaScript.workspaceToCode(workspace)
```

#### blockToCode

블록의 내용을 코드로 바꿔줍니다.

```js
Blockly.JavaScript.blockToCode(block)
```

### 04. JS-Interpreter

Blockly는 Js-Interpreter를 이용해서 코드를 해석합니다.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
