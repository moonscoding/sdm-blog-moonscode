# JAVASCRIPT - FUNCTION

#### 자바스크립트에서 사용하는 내가 몰랐던 Function 기능.

<div class="pull-right"> 문스코딩 - 2018.01.24 </div>

---

**용어정리**
```
    call :: this를 설정할 수 있는 메서드
    apply ::
    bind ::
```

#### 01. call 메서드

일반적인 방법 이외에도 함수를 어디서, 어떠헤 호출 했느냐와 관계없이 this가 무엇인지 지정할 수 있습니다.
call 메서드는 모든 함수에서 사용할 수 있으며, this를 특정값으로 지정할 수 있습니다.

**call 사용법**
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

#### 02. apply 메서드

apply는 배열 요소를 함수 매개변수로 사용해야 할 때 유용합니다.
apply를 설명할 때 흔히 사용하는 예제는 배열의 min / max 를 구하는 겂니다
js의 내장 함수인 Math.min, Math.max는 매개변수를 받아 그 중 최솟값과 최댓값을 각각 반환합니다.
apply를 사용하면 기존 배열을 이들 함수에 바로 넘길 수 있습니다.

```js
const arr = [2,3,-5,15,7];
Math.min.apply(null, arr); // -5
Math.max.apply(null, arr); // 15
```

**확장연산자 (...) 이용해서 처리하기**

```js
const newBruce = [1940, "martial artist"];

// apply(bruce, newBruce), update.call(bruce, 1940, "martial artist") 와 같음
update.call(bruce, ...newBruce);

Math.min(...arr); // -5
Math.max(...arr); // 15
```

#### 03. bind

bind를 사용하면 함수의 this 값을 영구히 바꿀 수 있습니다.
update 매서드를 이리저리 옮기면서도 호출할 때, this 값은 항상 bruce가 되게끔,
call이나 apply, 다른 bind와 함께 호출하더라도 this값이 bruce가 되도록 하려면 bind를 사용하니다

```js
const updateBruce = update.bind(bruce);

updateBruce(1904, "actor"); // { name : "Bruce", birthYear : 1904, occupation : "actor" }

// madeline은 변하지 않습니다.
updateBruce.call(madeline, 1274, "king"); // { name : "Bruce", birthYear : 1274, occupation : "king" }
```
> bind는 함수의 동작을 영구적으로 바꾸므로 찾기 어려운 버그의 원인이 될 수도 있습니다.
> bind를 사용한 함수는 call이나 apply, 다른 bind와 함께 사용할 수 없는 것이나 마찬가지 입니다.
> bind는 항상 어디에 묶이는지 정확히 파악하고 사용해야합니다.

```js
const updateBruce1949 = update.bind(bruce, 1949);
updateBruce1949("singer, songwriter");  // { name : "Bruce", birthYear : 1274, occupation : "singer, songwriter" }
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
