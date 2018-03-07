# JS - 어디까지 알고있나요 ?
## closure 이제는 알고 사용하자 !

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS - 어디까지 알고있나요 ?](#js-어디까지-알고있나요)
	* [closure 이제는 알고 사용하자 !](#closure-이제는-알고-사용하자)
		* [클로저란 무엇인가?](#클로저란-무엇인가)
		* [기본적인 closure 예제](#기본적인-closure-예제)
		* [jQuery 클로저 사용 예제](#jquery-클로저-사용-예제)
		* [클로저 규칙과 부수 효과](#클로저-규칙과-부수-효과)
		* [클로저 비꼬기](#클로저-비꼬기)
		* [다음의 오류를 고치는 방법](#다음의-오류를-고치는-방법)

<!-- /code_chunk_output -->


**용어정리**
```
    CLOSURE :: 클로저는 외부함수 (포함하고 있는) 변수에 접근할 수 있는 내부 함수를 일컫음
    외부 함수 :: 클로저 함수가 위치하고 곳에서 감싸고 있는 외부 함수
    내부 함수 :: 클로저 함수의 내부
```

### 클로저란 무엇인가?

사람들이 말하는 클로저
    - 자유 변수를 기억하는 함수
    - 스코프를 기억하는 함수
    - 환경(lexical environment)를 기억하는 함수

즉! 클로저는 외부함수 (포함하고 있는) 변수에 접근할 수 있는 내부 함수를 말합니다.
스코프 체인 (scope chain)으로 표현되기도 함.
클로저는 3가지 스코프 체인을 가집니다.

> 클로저는 자신에 대한 접근 (자신의 블록내에 정의된 변수), 외부 함수의 변수에 대한 접근, 그리고 전역 변수에 대한 접근. 이렇게 3가지로 구분할 수 있음

내부 함수는 외부 함수의 변수뿐만 아니라 파라미터에도 접근할 수 있습니다.
단, 내부 함수는 외부 함수의 args 객체를 호출 할 수 없습니다.
(하지만, 외부 함수의 파라미터는 직접 호출 할 수 있습니다.)

### 기본적인 closure 예제

```js
function showName(firstName, lastName) {
    var nameIntro = "Your name is ";
    // 이 내부 함수는 외부함수의 변수뿐만 아니라 파라미터 까지 사용할 수 있습니다.
    function makeFullName() {
        return nameIntro + firstName + " " + lastName;
    }
    return makeFullName();
}
showName("Michael", "Jackson"); // Your name is Michael Jackson
```

> makeFullName이란 함수는 상위 함수의 nameIntro라는 변수를 기억하고 있습니다.
> 즉, 참조하고 사용하는 것입니다.

클로저는 NodeJS의 비동기, 논-블록킹 아키텍처의 핵심 기능으로 활용됩니다.
클로저는 jQuery에서도 빈번히 사용되며 거의 모든 자바스크립트 코드에서 볼 수 있습니다.

### jQuery 클로저 사용 예제

```js
$(function() {
    var selections = [];
    $(".niners").click(function() {         // 이 클로저는 selections 변수에 접근합니다.
        selections.push(this.prop("name")); // 외부 함수의 selections 변수를 갱신함
    });
});
```

### 클로저 규칙과 부수 효과

클로저는 외부함수가 리턴된 이후에도 외부함수의 변수에 접근할 수 있습니다.
클로저를 사용하면서 가장 헷갈리는 것 중의 하나는
외부함수가 리턴된 이후에도 여전히 내부 함수가 외부함수의 변수에 접근하고 있다는 점
자바스크립트의 함수가 실행되었을 때, 함수는 자신이 생성되었을 때와 동일한 스코프 체인을 사용
그러므로 내부함수를 나중에 호출 할 수 있습니다.

```js
function celebrityName(firstName) {
    var nameIntro = "This is celebrity is ";
    // 이 내부 함수는 외부함수의 변수와 파라미터에 접근할 수 있습니다.
    function lastName(theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}
var mjName = celebrityName("Michael"); // 여기서 celebrityName 외부함수가 리턴됩니다.

// 외부함수가 위에서 리턴된 후에, 클로저(lastName)가 호출됩니다.
// 아직, 클로저는 외부함수의 변수와 파라미터에 접근 가능합니다.
mjName("Jackson"); // This celebrity is Michael Jackson

```

> 클로저는 외부 함순의 변수에 대한 참조를 저장

클로저는 실제로 값을 저장 않음
클로저가 호출되기 전에 외부함수의 변수가 변경되었을 때, 클로저는 더 복잡해짐
아래의 내부(private) 변수예제는

```js
function celebrityID() {
    var celebrityID = 999;
    // 우리는 몇개의 내부 함수를 가진 객체를 리턴할것입니다.
    // 모든 내부함수는 외부변수에 접근할 수 있습니다.
    return {
        getID: function() {
            // 이 내부함수는 갱신된 celebrityID변수를 리턴합니다.
            // 이것은 changeThdID함수가 값을 변경한 이후에도 celebrityID의 현재값을 리턴합니다.
            return celebrityID;
        },
        setID: function(theNewID) {
            // 이 내부함수는 외부함수의 값을 언제든지 변경할 것입니다.
            celebrityID = theNewID;
        }
    }
}
var mjID = celebrityID();   // 이 시점에, celebrityID외부 함수가 리턴됩니다.
mjID.getID();               // 999
mjID.setID(567);            // 외부함수의 변수를 변경합니다.
mjID.getID();               // 567; 변경된 celebrityID변수를 리턴합니다.
```

> 변경된 외부함수를 리턴함 (외부함수의 변수를 내장해서 그대로 가지고 있음)

### 클로저 비꼬기

클로저가 갱신된 외부함수의 변수에 접근함으로
외부함수의 변수가 for문에 의해 변경될 경우 의도치 않은 버그 생길 수 있음

```js
function celebrityIDCreator(theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i=0; i<theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function() {
            return uniqueID + i;
        }
    }
    return theCelebrities;
}
var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

var stalloneID = createIdForActionCelebs[0];

console.log(stalloneID.id());     // 103 !?
```

> 익명의 내부함수가 실행될 시점에 i 값은 3 ! >>> 클로저는 외부 변수에 대해 값이 아닌 참조로 접근하기 때문

### 다음의 오류를 고치는 방법

```js
function celebrityIDCreator(theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i=0; i<theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function(j) {
            // j 파라미터는 호출시 즉시 넘겨받은(IIFE) i의 값이 됩니다.
            return function() {
                // for문이 순환할때마다 현재 i의 값을 넘겨주고, 배열에 저장합니다.
                return uniqueID + j;
            } ()
            // 함수의 마지막에 ()를 추가함으로써 함수를 리턴하는 대신 함수를 즉시 실행하고 그 결과값을 리턴합니다.
        } (i);
        // i 변수를 파라미터로 즉시 함수를 호출합니다.
    }
    return theCelebrities;
}
var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];
var createIdForActionCelebs = celebrityIDCreator(actionCelebs);

var stalloneID = createIdForActionCelebs[0];
console.log(stalloneID.id); // 100

var cruiseID = createIdForActionCelebs[1];
console.log(cruiseID.id); // 101
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](http://chanlee.github.io/2013/12/10/understand-javascript-closure/)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.


**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: 클로저의 기본](http://chanlee.github.io/2013/12/10/understand-javascript-closure/)

[링크2 :: 클로저와 스코스 정리, 읽기 좋은 글](http://meetup.toast.com/posts/86)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
