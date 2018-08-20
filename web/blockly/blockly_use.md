
# Blockly
## 사용법
<div class="pull-right">  업데이트 :: 2018.05.10 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Blockly](#blockly)
	* [사용법](#사용법)
		* [01. get blocks](#01-get-blocks)
		* [02. set blocks](#02-set-blocks)

<!-- /code_chunk_output -->

### 01. get blocks

```js
Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
```

### 02. set blocks

```js
const INIT_BLOCK = '<xml><block></block></xml>'
const DOM_XML = Blockly.Xml.textToDom(INIT_BLOCK);
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
