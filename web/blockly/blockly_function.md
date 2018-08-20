# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. Convert 관련](#01-convert-관련)
			* [textToDom vs domToText](#texttodom-vs-domtotext)
			* [workspaceToDom vs domToWorkspace](#workspacetodom-vs-domtoworkspace)
		* [02. mainWorkspace](#02-mainworkspace)
			* [getAllBlock()](#getallblock)
			* [clear()](#clear)
			* [cleanUp()](#cleanup)

<!-- /code_chunk_output -->

### 01. Convert 관련

#### textToDom vs domToText

textToDom :: Text를 workspace에 넣을 수 있는 Dom으로 바꿔줍니다.
domToText :: Dom을 Text로 바꿔줍니다.

#### workspaceToDom vs domToWorkspace

workspaceToDom(workspace) :: 'Workspace'에서 'Dom' 정보 가져오기
domToWorkspace(workspace, dom) :: 'Workspace'에 'Dom' 정보 넣기

### 02. mainWorkspace

#### getAllBlock()

연결유무 상관없이 'Workspace'내에 모든 블록을 가져옵니다.

```js
Blockly.mainWorkspace.getAllBlocks();
```

retrun :: {arr}


#### clear()

모든 블록 지우기

```js
Blockly.mainWorkspace.clear();
```

#### cleanUp()

모든 블록 정리하기 => 'margin 0' 처리

```js
Blockly.mainWorkspace.cleanUp();
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
