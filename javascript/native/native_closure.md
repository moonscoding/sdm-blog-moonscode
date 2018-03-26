# JS - 어디까지 알고있나요 ?
## 알지만 몰랐던, 클로저(Closure)!
<div class="pull-right"> 2018.01.15  </div><br><hr>

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS - 어디까지 알고있나요 ?](#js-어디까지-알고있나요)
	* [알지만 몰랐던, 클로저(Closure)!](#알지만-몰랐던-클로저closure)
		* [클로저란?](#클로저란)
		* [클로저의 스코프체인](#클로저의-스코프체인)
		* [클로저 예제](#클로저-예제)
		* [클로저 예제 (jQuery)](#클로저-예제-jquery)
		* [클로저 규칙](#클로저-규칙)
			* [기억한다 == 외부 Scope 참조는 계속됩니다.](#기억한다-외부-scope-참조는-계속됩니다)
			* [기억한다 == 외부 Scope 참조, 값을 저장하는게 아닙니다.](#기억한다-외부-scope-참조-값을-저장하는게-아닙니다)
		* [클로저 예상버그](#클로저-예상버그)

<!-- /code_chunk_output -->


**용어정리**
```
외부 함수 :: 클로저 위치하고 있는곳에서 클로저를 감싸고 있는 함수를 의미
내부 함수 :: 클로저 함수 내부를 의미
CLOSURE :: 클로저는 외부함수 (포함하고 있는) 변수에 접근할 수 있는 내부 함수를 말합니다.
```

### 클로저란?

클로저는 대부분의 자바스크립트 개발자가 사용하고 있지만, 정확하게 의미를 말하기가 어려운 부분이기도 합니다.

자바스크립트가 원래 그냥 그렇게 생겨먹었구나라고 생각할 수 있는 부분이라 그렇습니다.

하지만 클로저는 이해하는 것은 자바스크립트 개발에 매우 중요한 부분이기 때문에 클로저를 자세히 살펴보도록 하겠습니다.

사람들은 보통 클로저를 다음과 같이 말합니다.

- 자유 변수를 기억하는 함수
- 스코프를 기억하는 함수
- 환경(lexical environment)를 기억하는 함수

> 클로저는 외부함수(내부함수 감싸고 있는)내 스코프 변수에 접근할 수 있는 또한, 그것을 기억하고 있는 내부 함수를 말합니다.

말이 어려우니 예제가 도움이 될 것입니다.

### 클로저의 스코프체인

클로저는 3가지 스코프 체인 (scope chain)을 가집니다.

- 클로저는 자신에 대한 접근 (자신의 블록내에 정의된 변수)
- 외부 함수의 변수에 대한 접근
- 전역 변수에 대한 접근

이렇게 3가지로 구분할 수 있습니다.

다음 예제로 조금더 정확히 살펴보도록 하겠습니다.

```js
// 전역영역

function external(arg1) {
	// 외부함수 영역 & 외부함수의 매개변수

	function internal(arg2) {
		// 내부함수 영역
	}
}
```

내부 함수는 외부 함수의 변수뿐만 아니라 파라미터에도 접근할 수 있습니다.

### 클로저 예제

다음 예제로 클로저를 이해해 보도록 하겠습니다.

```js
function showName(firstName, lastName) {
    var nameIntro = "Your name is ";
    // 아래함수(내부함수)를 클로저라고 부르며,
    // 클로저는 외부함수의 변수와 매개변수까지 접근할 수 있습니다.
    function makeFullName() {
        return nameIntro + firstName + " " + lastName;
    }
    return makeFullName();
}
showName("Michael", "Jackson"); // Your name is Michael Jackson
```

> 클로저는 NodeJS의 비동기, 논-블록킹 아키텍처의 핵심 기능으로 활용됩니다.

[nodeJS 살펴보기]()

### 클로저 예제 (jQuery)

다음 예제로 클로저가 jQuery에서 어떻게 사용되는지 살펴보도록 하겠습니다.

```js
$(function() {
    var selections = [];

    // 아래함수가 클로저이며,
    // 다음 클로저는 selections 변수에 접근할 수 있고 또한 기억하고 있습니다.
    $(".niners").click(function() {         
        selections.push(this.prop("name"));
    });
});
```

> 변수에 접근할 수 있다는 것외에 기억하고 있다는 것은 무엇을 의미할까요 ?

다음을 통해 더 자세히 살펴보도록 하겠습니다.

### 클로저 규칙

#### 기억한다 == 외부 Scope 참조는 계속됩니다.

앞서 말했듯이, 클로저는 외부함수의 스코프영역에 접근할 수 있을 뿐만 아니라,

> '그것들을 기억하고 있습니다.'

그렇기 때문에 외부함수가 종료된 후에도 내부함수는 외부함수를 계속 참조하고 있다는 점이 중요합니다.

그래서 다음의 성질을 이용해서 ==데이터의 캡슐화 및 정보은닉== 에도 사용합니다.

```js
function celebrityName(firstName) {
    var nameIntro = "This is celebrity is ";
    // 이 내부 함수는 외부함수의 변수와 파라미터에 접근할 수 있습니다.
    function lastName(theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}

// mjName에 클로저를 리턴받습니다.
var mjName = celebrityName("Michael");

// 클로저를 호출시키면 외부함수의 영역을 참조하고 있는 것을 확인할 수 있습니다.
mjName("Jackson"); // This celebrity is Michael Jackson
```

#### 기억한다 == 외부 Scope 참조, 값을 저장하는게 아닙니다.

클로저는 실제로 값을 저장하지 않습니다.

클로저가 호출되기 전에 외부함수의 변수가 변경되었을 때, 그 이유를 알 수 있습니다.

```js
function celebrityID() {
    var celebrityID = 999;
    return {
        getID: function() {
            // 외부변수를 참조합니다.
            return celebrityID;
        },
        setID: function(theNewID) {
            // 외부 변수를 변경합니다.
            celebrityID = theNewID;
        }
    }
}
var mjID = celebrityID();   // 이 시점에, celebrityID외부 함수가 리턴됩니다.
mjID.getID();               // 999
mjID.setID(567);            // 외부함수의 변수를 변경합니다.
mjID.getID();               // 567;
```

이 예제를 통해서 클로저가 값을 ==저장하고 있는지 vs 참조하고 있는지== 확인할 수 있습니다.

다음 예제를 보면 클로저는 확실히 값을 참조하고 있습니다.

### 클로저 예상버그

다음은 개발자가 흔히 발생시킬 수 있는 오류입니다.

이 오류는 위에서 말했듯 값을 참조하기 때문에 발생하는 오류 입니다.

엄밀히 말하면 클로저의 원리이지 오류는 아닌 것입니다.

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
console.log(stalloneID.id()); // 103
```

우리는 마지막 호출값이 '100'이길 기대할 것입니다.

하지만 값은 '103'이 나오게 됩니다.

이 값은 저장하는 게 아니라 값을 참조하기 때문에 일어나는 예입니다.

값을 저장했다면 우리가 기대하는 '100' 이라는 정답이 나오겠지만,

값을 참조하기 때문에 호출당시 i 값인 '3'을 참조해 103이라는 값이 나오게 되는 것입니다.

사실은 버그가 아니죠. 자바스크립트가 원래 이렇게 동작하니까요.

> 클로저가 실행될때 i는 이미 3이라는 값이 되있습니다. 그러니 다음에 값을 가져오는게 당연합니다.

```js
function celebrityIDCreator(theCelebrities) {
    var i;
    var uniqueID = 100;
    for (i=0; i<theCelebrities.length; i++) {
        theCelebrities[i]["id"] = function(j) {
            return function() {
                return uniqueID + j;
            }();
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

다음과 같이 함수를 즉시 호출해 버리면 (참조가 아닌 저장) 다음문제를 해결할 수 있습니다.

하지만 리턴받은 함수는 클로저라고 할 수 없습니다.

외부함수의 값을 참조하는 것이 아니라, 이미 값을 저장해 버렸기 때문입니다.

> 클로저, 이해하고 나면 자바스크립트의 완벽한 도구가 될 것입니다.

---


**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: 클로저의 기본](http://chanlee.github.io/2013/12/10/understand-javascript-closure/)

[링크2 :: 클로저와 스코스 정리, 읽기 좋은 글](http://meetup.toast.com/posts/86)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
