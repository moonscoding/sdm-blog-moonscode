# JAVASCRIPT ES6 - ARRAY

#### ES6 - ARRAY 배열 파헤치기

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

**용어정리**
```
    가짜배열 :: 배열로 이루어졌을 것 같은데, 실제로는 배열이 아닌 경우의 변수들
    Destructuring :: 
```

#### ES6 - Array

**for (let v of arr)**

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

**...arr (spread operator)**

아래 코드는 pre와 newData의 값은 같은 결과가 출력, 동치 여부 비교시에 false가 출력
메모리 공간안에 새로운 데이터가 생성되어 완전히 다른 참조를 가짐

```js
// spread operator, 펼침연산자
let pre = ["apple", "orange", 100];
let newData = [...pre];

console.log(pre, newData);
```



```js
let pre = [100, 200, "hello", null];
let newData = [0,1,2,3,4, ...pre, 4];

console.log(newData);
```



```js
function sum(a, b, c) {
  return a+b+c;
}

let pre = [100, 200, 300];

console.log(sum.apply(null, pre));      // # 직관적이지 않음 (사용자제)
console.log("result=>", sum(...pre));   // #
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
// Destructuring
let Data = ["crong", "honux", "jk", "jinny"];

// 방법1
let jisu = data[0];
let jung = data[2];

// 방법2
let [jisu,,jung] = data;        // crong jk
console.log(jisu, jung);
```












---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](http://12bme.tistory.com/186)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
