# Blockly
## 초기화과정
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Blockly](#blockly)
	* [초기화과정](#초기화과정)
		* [01. Blockly 초기화하기](#01-blockly-초기화하기)
			* [fixed size](#fixed-size)
			* [resizable size](#resizable-size)
		* [02. Block Workspace에 삽입시키기](#02-block-workspace에-삽입시키기)

<!-- /code_chunk_output -->



### 01. Blockly 초기화하기

#### fixed size

```js
var workspacePlayground = Blockly.inject(
  'blocklyDiv',
  {
    toolbox: document.getElementById('toolbox')
  }
);
```

#### resizable size

```js
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspacePlayground = Blockly.inject(blocklyDiv,
   {toolbox: document.getElementById('toolbox')});
var onresize = function(e) {
   // Compute the absolute coordinates and dimensions of blocklyArea.
   var element = blocklyArea;
   var x = 0;
   var y = 0;
   do {
     x += element.offsetLeft;
     y += element.offsetTop;
     element = element.offsetParent;
   } while (element);
   // Position blocklyDiv over blocklyArea.
   blocklyDiv.style.left = x + 'px';
   blocklyDiv.style.top = y + 'px';
   blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
   blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
 };
 window.addEventListener('resize', onresize, false);
 onresize();
 Blockly.svgResize(workspacePlayground);
```

### 02. Block Workspace에 삽입시키기

```js
const INIT_BLOCK = '<xml><block type="start_block" deletable="false" moveable="false" x="50" y="50"></block></xml>'

const DOM_XML = Blockly.Xml.textToDom(INIT_BLOCK)

Blockly.Xml.domToWorkspace(mainWorkspace, DOM_XML);
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
