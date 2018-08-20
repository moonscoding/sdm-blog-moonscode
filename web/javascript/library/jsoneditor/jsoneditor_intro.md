# JSON-EDITOR
## JSON-EDITOR
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JSON-EDITOR](#json-editor)
	* [JSON-EDITOR](#json-editor-1)
		* [01. 데이터 관리](#01-데이터-관리)
		* [02. 복잡한 UI를 단순하게](#02-복잡한-ui를-단순하게)
		* [03. get started](#03-get-started)

<!-- /code_chunk_output -->



### 01. 데이터 관리

web 페이지에서 'json' 데이터를 관리하는 경우는 빈번하게 발생합니다.

이때 사용할 수 있는 자바스크립트 라이브러리가 바로 jsoneditor입니다.

같은 이름에 다양한 에디터가 있지만,

가장 많이 사용하는 것은 'ace의 jsoneditor'로 보입니다.

=> git :: https://github.com/josdejong/jsoneditor

=> docs :: https://ace.c9.io/

### 02. 복잡한 UI를 단순하게

사용자를 위한 대쉬보드 화면이라면 당연히 서버에서 가져온 json 데이터를 UI에 맞춰줘야 할 것입니다.

하지만 내부적으로 사용하는 화면이라면 json 데이터를 UI에 맞춰 처리하는 것이 오히려 작업을 복잡하게 할 수도 있습니다.

사용자가 json이라는 형식만 이해하면 간단히 처리할 수 있습니다.

### 03. get started

일단 jsoneditor를 사용하기 위한 라이브러리를 준비합니다.

```
npm install jsoneditor
&
bower install jsoneditor
```

```html
<!DOCTYPE HTML>
<html>
<head>
    <!-- when using the mode "code", it's important to specify charset utf-8 -->
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">

    <link href="jsoneditor/dist/jsoneditor.min.css" rel="stylesheet" type="text/css">
    <script src="jsoneditor/dist/jsoneditor.min.js"></script>
</head>
<body>
    <div id="jsoneditor" style="width: 400px; height: 400px;"></div>

    <script>
        // create the editor
        var container = document.getElementById("jsoneditor");
        var options = {};
        var editor = new JSONEditor(container, options);

        // set json
        var json = {
            "Array": [1, 2, 3],
            "Boolean": true,
            "Null": null,
            "Number": 123,
            "Object": {"a": "b", "c": "d"},
            "String": "Hello World"
        };
        editor.set(json);

        // get json
        var json = editor.get();
    </script>
</body>
</html>
```

- css를 설정해주세요.
- js를 설정해주세요.
- const EDITOR = new JSONEditor(document.getElementById('jsoneditor'), {});

더 자세한 API를 확인하려면

https://github.com/josdejong/jsoneditor/blob/master/docs/api.md 를 참고해주세요.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
