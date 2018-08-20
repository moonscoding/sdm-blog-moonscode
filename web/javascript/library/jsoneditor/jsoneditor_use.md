# JSON-EDITOR
## JSON-EDITOR
<div class="pull-right">  업데이트 :: 2018.05.03 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JSON-EDITOR](#json-editor)
	* [JSON-EDITOR](#json-editor-1)
		* [01. 사용법](#01-사용법)
		* [02. import](#02-import)
		* [03. export](#03-export)

<!-- /code_chunk_output -->



### 01. 사용법

다음과 같이 생성한 json-editor 객체를 통해 데이터를 export & import 할 수 있습니다.

```js
var editor = new JSONEditor(container, options);
```

### 02. import

```js
editor.set(json);
```

### 03. export

```js
var json = editor.get();

console.log(typeof json); // object, string, number
```


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
