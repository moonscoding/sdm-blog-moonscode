# JS - 어디까지 알고있나요 ?
## 나만 몰랐던, Native Function

<div class="pull-right"> 2018.01.24 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS - 어디까지 알고있나요 ?](#js-어디까지-알고있나요)
	* [나만 몰랐던, Native Function](#나만-몰랐던-native-function)
		* [call](#call)
		* [apply](#apply)
		* [bind](#bind)
			* [bind 주의점](#bind-주의점)
		* [func.length](#funclength)
		* [func.name](#funcname)
		* [arguments](#arguments)

<!-- /code_chunk_output -->


**용어정리**
```
    call  :: this와 매개변수를 설정할 수 있는 함수입니다.
    apply :: this와 매개변수(배열)을 설정할 수 있는 함수입니다. (call과 역할은 같습니다.)
    bind  :: this를 1개로 설정하는 함수입니다. (call과 apply가 동작하지 않습니다.)
```

### call

> 함수 내부의 this를 매개변수로 설정해줄 수 있습니다.

```js
fun.call(this, [arg1], [arg2], [...])
```

우리는 함수 내부의 this를 우리가 직접 설정해줄 수 있습니다.

call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정값으로 지정할 수 있습니다.

```js
const bruce = { name : "Bruce" };
const madeline = { name : "Madeline" };

// 이 함수는 어떤 객체도 연결되지 않았지만 this를 사용합니다.
function greet() {
    return `Hello, I'm ${this.name}`
}

greet();                    // Hello, I'm undefined
greet.call(bruce);          // Hello, I'm Bruce
greet.call(madeline);       // Hello, I'm Madeline
```

```js
function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
}

update.call(bruce, 1949, 'singer');         // { name : "Bruce" , brithYear : 1949 , occupation : "singer" }
update.call(madelune, 1942, 'actress')      // { name : "Madeline" , brithYear : 1942 , occupation : "actress" }
```

### apply

> apply는 배열 요소를 함수 매개변수로 사용해야 할 때 유용합니다.

그것을 제외하면 call과 역할은 동일합니다.

```js
fun.apply(thisArg, [argsArray])
```

```js
const arr = [2,3,-5,15,7];
Math.min.apply(null, arr); // -5
Math.max.apply(null, arr); // 15
```

확장 연산자(...) 를 이용해서 다음을 해결할 수도 있습니다.

> 확장연산자(...)은 배열을 풀어서 차례대로 매개변수에 넣어주는 역할을 합니다.

```js
const newBruce = [1940, "martial artist"];

// update.apply(bruce, newBruce),
// update.call(bruce, 1940, "martial artist")
// 둘의 역할은 같습니다.
update.call(bruce, ...newBruce);

Math.min(...arr); // -5
Math.max(...arr); // 15
```

### bind

> bind를 사용하면 함수의 this 값을 영구적으로 바꾸는 역할을 합니다.

update 메소드를 여러번 호출할때 this는 항상 같게 처리할 수 있습니다.

==bind 처리를 하게 되면 call 이나 apply 를 이용해서 this를 바꿀 수 없습니다.==

```js
const updateBruce = update.bind(bruce);

updateBruce(1904, "actor"); // { name : "Bruce", birthYear : 1904, occupation : "actor" }

// bind가 되었기 때문에 this는 변결할 수 없습니다.
updateBruce.call(madeline, 1274, "king"); // { name : "Bruce", birthYear : 1274, occupation : "king" }
```

#### bind 주의점

혹자는 bind는 함수의 동작을 영구적으로 바꾸므로

찾기 어려운 버그의 원인이 될 수도 있다고 말합니다.

bind는 항상 어디에 묶이는지 정확히 파악하고 사용해야합니다.

### func.length

> 특이하게도, function의 length는 매개변수의 갯수를 반환해 줍니다.

```js
function func1() {}
function func2(a, b) {}

console.log(func1.length); // expected output: 0
console.log(func2.length); // expected output: 2
```

### func.name

> function의 key값은 name을 통해서 반환받을 수 있습니다.

```js
var func1 = function() {}

var object = {
  func2: function() {}
}

console.log(func1.name); // expected output: "func1"
console.log(object.func2.name); // expected output: "func2"
```

### arguments

function은 내부에서 매개변수를 배열로 받을 수 있는

arguments라는 기능을 가지고 있지만

해당 기능은 <span style='color:red'>Deprecated</span> 되었습니다.

> 자바스크립트는 Function과 Prototype을 기본으로 동작하는 언어입니다.
> Function은 확실히 숙지해 두는 것이 자바스크립트 개발에 많은 도움이 될 것입니다.

---


**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: MDN - Function 관련 정리 ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
