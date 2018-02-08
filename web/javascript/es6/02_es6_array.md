# JAVASCRIPT ES6 - ARRAY

## ES6 - ARRAY 배열 파헤치기

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVASCRIPT ES6 - ARRAY](#javascript-es6-array)
	* [ES6 - ARRAY 배열 파헤치기](#es6-array-배열-파헤치기)
		* [ES5 - Array 기본 함수 목록](#es5-array-기본-함수-목록)
		* [ES6 - Array](#es6-array)

<!-- /code_chunk_output -->

**용어정리**
```
    every :: 모든 배열이 조건에 만족하는지 확인합니다 (return : true / false)
    some :: 조건에 맞는 특정 배열이 있는지 확인합니다 (return : true / false)
    forEach :: 리턴값없이 배열을 순회합니다.
    map :: 배열의 값을 수정해 리턴할수있게 합니다.
    filter :: 리턴하는 배열을 여부를 판단합니다.
    reduce :: 이전값과 현재값을 비교해서 배열을 처리합니다.
    가짜배열 :: 배열로 이루어졌을 것 같은데, 실제로는 배열이 아닌 경우의 변수들
    Destructuring ::
```

### ES5 - Array 기본 함수 목록


```js
var arr = [1,2,3,4,5];

// # every :: 모든 값이 만족시키는지 알려준다.
const isAllOld = arr.every((val) => {
    return val % 2 != 0;
});
console.log(isAllOld)   // false

// # some :: 특정 값이 만족시키는지 알려준다.
const isSomeOdd = arr.some((val) => {
    return val % 2 != 0;
});
console.log(isSomeOdd); // true

// # forEach :: 리턴값을 받지 못함
arr.forEach((v, i) => {
    console.log(v, i);
})

// # map :: 리턴값을 받을 수 있음
var mapValue = arr.map((x) => {
    return x + 2; // value
});
console.log(mapValue) // [3,4,5,6,7];

// # filter
function isBigEnough(v) {
    return v >= 3; // true or fasle
}
arr.filter(isBigEnough) // [3,4,5]

// # reduce
function add (acc, value) {
    return acc + value;
}
arr.reduce(add, 0); // 1 + 2 + 3 + 4 + 5;

```

**reduce 자세히 보기**

```js
// # 4개의 인자 (이전값, 현재값, index, 배열)
arr.reduce(function(accumulator, currentValue, currentIndex, array) {

});

var a = arr.reduce(function(prev, cur) {
    return prev + cur;
});
console.log(a) // 15
```

### ES6 - Array

**for(let v of arr) 객체값 리턴 vs for(let v in arr) 인덱스 리턴**

```js
var data = [1, 2, undefined, NaN, null, ""];
data.forEach(function(value){
  console.log("value is", value);
});

// natvie 메소드를 확장하여 쓰는 것은 권장하지 않습니다.
// 왜냐하면, 부작용이 발생할 수 있습니다.
Array.prototype.getIndex = function(){};

for(let idx in data) {
  console.log(data[idx]);
}

// 배열 for문을 순회할때는 for..in 방식보다는 for..of 를 쓰면
// 위 사항과 같은 부작용 방지가 가능합니다.
for(let value of data) {
  console.log(value);
}

var str = "hello world!!!!";
for(let value of str) {
  console.log(value);
}
```

**펼침연산자 :: ...arr (spread operator)**

아래 코드는 pre와 newData의 값은 같은 결과가 출력, 동치 여부 비교시에 false가 출력됩니다.
메모리 공간안에 새로운 데이터가 생성되어 완전히 다른 참조를 가짐니다.

```js
// spread operator, 펼침연산자
let pre = ["apple", "orange", 100];
let newData = [...pre];

console.log(pre, newData);

let pre2 = [100, 200, "hello", null];
let newData2 = [0,1,2,3,4, ...pre2, 4];

console.log(newData2);

function sum(a, b, c) {
  return a+b+c;
}

let pre3 = [100, 200, 300];

console.log(sum.apply(null, pre3));     // # 직관적이지 않음 (사용자제)
console.log("result=>", sum(...pre3));  // # 펼침연산자 사용해서 매개변수 넣기
```

**ES6 - 가변적 argument 받기**

arguments라는 값을 이용해서 function의 인자값이 없더라도 인자값을 받아서 처리하는 것이 가능
argument는 가변적인 파라미터가 들어오는 경우에 가끔씩 이용

```js
function addMark() {
  let newData = [];

  for(let i=0; i<arguments.length; i++) {
    newData.push(arguments[i] + "!");
  }

  console.log(newData);
}

addMark(1,2,3,4,5);
```

**가짜배열 Array.from(가짜배열)**

```js
function addMark() {
  let newArray = Array.from(arguments);             // # , 로 만 이루어진 변수 가짜배열 (typeof == object)
  let newData = newArray.map(function(value) {
    return value + "!";
  });

  console.log(newData);
}

addMark(1,2,3,4,5,6,7,8,9);
```


**배열에서의 Destructuring**

Destructuring을 배열에 적용하기 아래와 같은 코드를 통해 배열의 값을 변수에 적당하게 지정

```js
// DestructuringQ
let data = ["crong", "honux", "jk", "jinny"];

// 방법1
let jisu = data[0];
let jung = data[2];

// 방법2
let [jisu,,jung] = data;        
console.log(jisu, jung); // crong jkqs       
```


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](http://12bme.tistory.com/186)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
