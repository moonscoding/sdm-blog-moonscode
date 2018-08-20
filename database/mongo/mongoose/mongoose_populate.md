# Mongoose
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Mongoose](#mongoose)
	* [SUB-TITLE](#sub-title)
		* [01. populate](#01-populate)
		* [02. 주의점](#02-주의점)
			* [2.1 String => ObjectId 처리](#21-string-objectid-처리)
			* [2.2 '내부 Schema'와 '외부 Schema'의 차리](#22-내부-schema와-외부-schema의-차리)

<!-- /code_chunk_output -->

### 01. populate

Mongoose에만 존재하는 함수로써 스키마 간의 Join을 가능하게 합니다.

```js
User.find().populate('friends').exec(function( err, docs ){ /*Do Something */ })
User.find().populate({ path : 'friends'}}).exec(function( err, docs ){ /*Do Something */ })
User.find().populate({ path : 'group', model : 'Group'}}).exec(function( err, docs ){ /*Do Something */ })
User.find().populate({ path : 'group', model : 'Group', select : 'title' }}).exec(function( err, docs ){ /*Do Something */ })
```

### 02. 주의점

#### 2.1 String => ObjectId 처리

Native 자료형 타입 스키마에 ref를 걸면 string이 알아서 objectId로 변환되는데

Mixed 자료형 타입 스키마에 ref를 걸면 string이 알아서 objectId로 변하지 않는점, String으로 그대로 저장되는점

```js
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId(stringObjectId);
```

#### 2.2 '내부 Schema'와 '외부 Schema'의 차리

내부 스키마 조인에서는 '[Schema.Type.ObjectId]'로 타입을 처리하고

populate를 걸면 모두 한번에 가져오는데

외부 스키마 조인에서는 '[Schema.Type.ObjectId]'로 타입을 처리하고

populate을 결면 한번에 가져오지 못합니다. 배열이 아닌 'Schema.Type.ObjectId'는 populate가 가능한데 말입니다.

> 해결책 :: populate({ path : "column", model : "Model" })
> 다음과 같이 Model을 적어서 해당 외부 스키마를 명시하면 배열로 처리된 값도 가져 올 수 있게 됩니다.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
