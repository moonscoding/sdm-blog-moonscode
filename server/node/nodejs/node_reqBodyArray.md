# NodeJS
## Req 데이터로 Array를 보낼 수 있나요 ?
<div class="pull-right">  업데이트 :: 2018.05.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [NodeJS](#nodejs)
	* [Req 데이터로 Array를 보낼 수 있나요 ?](#req-데이터로-array를-보낼-수-있나요)
		* [01. req.body에 array가 있을때](#01-reqbody에-array가-있을때)
		* [02. Mongoose 스키마 처리](#02-mongoose-스키마-처리)
		* [03.](#03)

<!-- /code_chunk_output -->

### 01. req.body에 array가 있을때

다음은 req.body로 arr가 왔을때 입니다.

다음 데이터는 배열 자체가 String으로 처리됬기 때문에 배열로 변환하는 과정이 필요합니다.

```js
console.log(req.body.arr) // => "[1,2]"

JSON.parse(req.body.arr) // => [1,2]
```
다음과 같은 기본 자료형 array가 왔을 때는 'JSON.parse'로 처리할 수 있습니다.

```js
console.log(req.body.arr) // => "[{'a':'b'}]"

new Array(req.body.arr);
```

하지만 넘어온 배열이 'Json Array'일 경우, 'new Array'를 사용해서 데이터를 처리해야합니다.

### 02. Mongoose 스키마 처리

그럼 다음에 해야할 이야기는 req.body의 필드가 'array'로 넘어 왔다는 것은

스키마에 넣어야할 데이터가 'array'라는 것인데, 이것이 바람직한가 입니다.

> 만약 "Dummy"라는 스키마에 "storys"라는 필드가 있고 다음 필드에 들어가는 내용은 다음과 같습니다.

```js
storys = [
  {
    page : 1
    title : "title",
    subTitle : "subTitle",
    contents : "contents"
  },
  ...
]
```

만약 이 부분을 다음과 같이 처리하지 않으려면,

storys에 들어가는 내용을 하나의 스키마 ('Story')로 정리하고

타입을 다음과 같이 [Schema.Types.ObjectId], ID의 배열로 처리해주는 방법이 있습니다.

```js
storys = [
  objectID
]
```

### 03.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106
