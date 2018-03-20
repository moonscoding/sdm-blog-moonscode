# JS ES6 - 필수입니다.
## ES6 - OBJECT 파헤치기

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS ES6 - 필수입니다.](#js-es6-필수입니다)
	* [ES6 - OBJECT 파헤치기](#es6-object-파헤치기)
			* [ES6 - OBJECT](#es6-object)

<!-- /code_chunk_output -->


**용어정리**
```
    Destructuring ::
```




#### ES6 - OBJECT

```js
onst name = "cron";
const age = 33;

const obj = {
  name : name,
  age : age
}

console.log(obj);
```




```js
function getObj() {

  const name = "crong";

  const getName = function() {
    return name;
  }

  const setName = function(newName) {
    name = newName;
  }

  return {
    getName : getName,
    setName : setName
  }
}

var obj = getObj();
console.log(obj);
```



**key-value 매칭없이 값 넣기**

```js
const data = {
  name,
  getName() {

  },
  age
}
```




**객체에서의 Destructuring**

```js
let obj = {
  name    : "crong",
  address : "Korea",
  age     : 10
}

let {name, age} = obj;          // let name <- obj.name, age <- obj.age
console.log(name, age);         // crong 10

let {name:myName, age:myAge} = obj; // let myName <- obj.name, myAge <- obj.age
console.log(myName, myAge);         // crong 10
```

**객체에서의 Destructuring2**

```js
var news = [
  {
    title : "sbs",
    imgurl : "http://static.naver.net/image/001.jpg",
    newslist : [
      "[가보니] 가상 경주도 즐기고, 내 손으로 자동차도 만들고",
      "리캡차가 사라진다",
      "갤럭시S8 출시? 갤노트7 처리 계획부터 밝혀야",
      "블로코-삼성SDS, 블록체인 사업 '맞손",
      "[블록체인 돌아보기] 퍼블릭 블록체인의 한계와 프라이빗 블록체인"
    ]
  },
  {
    title : "mbc",
    imgurl : "http://static.naver.net/image/002.jpg",
    newslist : [
      "Lorem ipsum dolor sit amet, consectetur adipisicin",
      "ipsum dolor sit amet, consectetur adipisicin",
      "dolor sit amet, consectetur adipisicin",
      "amet, consectetur adipisicin"
    ]
  }
];

let [,mbc] = news;      // let mbc <- 2번째 객체
console.log(mbc);       // { title : 'mbc' , ... }

let {title, imgurl} = mbc;  // let title <- mbc.title , let imgUrl <- mbc.imgurl
console.log(title, imgurl);

let [, {title, imgurl}] = news; // let title <- , let imgurl <-
console.log(imgurl);

```


**Destructuring을 이용한 JSON parser**


```js
// # 2번째 객체에서 newslist얻기
function getNewsList([,{newslist}]) {
  console.log(newslist);
}

getNewsList(news);
```


```js
// # 객체의 target key 얻기
document.querySelector("div").addEventListener("click", function({target}){
  console.log(target.innerText);
});
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
