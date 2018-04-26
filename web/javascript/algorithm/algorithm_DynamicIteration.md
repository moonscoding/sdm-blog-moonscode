# JS, 나만의 알고리즘
## 동적 반복문 (Dynamic loop) 추가하기
<div class="pull-right"> 2018.03.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS, 나만의 알고리즘](#js-나만의-알고리즘)
	* [동적 반복문 (Dynamic loop) 추가하기](#동적-반복문-dynamic-loop-추가하기)
		* [동적 반복문 (상황설명)](#동적-반복문-상황설명)
		* [정적 반복문 처리](#정적-반복문-처리)
		* [동적 반복문 추가 (방법1 - 전체갯수와 영역을 이용하기)](#동적-반복문-추가-방법1-전체갯수와-영역을-이용하기)
		* [동적 반복문 추가 (방법2 - 트리구조 반복문, Callback이용하기)](#동적-반복문-추가-방법2-트리구조-반복문-callback이용하기)

<!-- /code_chunk_output -->



### 동적 반복문 (상황설명)

> N * N * N 의 Loop를 만들 수 있는가 ?

만약 동적인 속성이 여러개를 가지는 객체가 있다고 해봅시다.

```
자동차라는 객체가 색상, 크기, 줄무늬이런 3가지 속성을 가지고 있습니다.

색상은 [Red, Green, Blue] 일 수 있고,

크기는 [소형, 중형, 대형] 일 수 있고,

줄무늬는 [None, Stripe, Dot] 이렇게 있습니다.
```

각각의 모든 속성을 섞으면 3 X 3 X 3 총 27가지의 타입의 자동차를 만들 수 있습니다.

그럼 이런 속성과 및 속성의 내용들이 동적일때 모든 케이스를 반환하는 반복문을 만들 수 있을까요 ?

### 정적 반복문 처리

정적으로 풀어낸다면 다음과 같이 풀어낼 수 있을 겁니다.

```js
let arrA = ['a1', 'a2', 'a3'];
let arrB = ['b1', 'b2', 'b3'];
let arrC = ['c1', 'c2', 'c3'];

arrA.forEach((va, ia) => {
  arrB.forEach((vb, ib) => {
    arrC.forEach((vc, ic) => {

    });
  });
});
```

### 동적 반복문 추가 (방법1 - 전체갯수와 영역을 이용하기)

동적으로 반복문을 추가한다면 어떨까요

```js

// 다음 객체가 동적으로 처리될 배열의 목록입니다.
let dummy = {
  arrA : ['a1', 'a2'],
  arrB : ['b1', 'b2'],
  arrC : ['c1', 'c2']
}

// 전체 (N x N x N) 의 갯수입니다.
function getAllCount(dummy) {
    let all = 1;
    Object.keys(dummy).forEach((a, i) => {
      all *= dummy[a].length
    });
    return all;
}

/*
  2 * 2 * 2 갯수의 배열이 있다고 가정하겠습니다.

  나올 수 있는 전체 갯수인 8개만큼

  배열을 돌고 안의 내용을 채워주겠습니다.

    1 2 3 4 5 6 7 8
  \ - - - -\- - - - \ 2분할 (a속성)
  \ - -\- -\- -\- - \ 4분할 (b속성)
  \ -\-\-\-\-\-\-\- \ 8분할 (c속성)

  다음과 같이 인덱스마다 알맞은 속성을 처리해주면 됩니다.

  영역 (space) : 속성이 유지되는 구간, 즉 'a속성'의 영역은 '2개'입니다.
  위치 (locationInSpace) : 'i % space', 영영에서의 위치를 말합니다.
  인덱스 (index) : 구해진 위치에서 들어가야할 속성의 인덱스

*/
function cSpace(i) {
  let obj = {};
  let space = getAllCount(dummy);
  Object.keys(dummy).forEach((a) => {
      let locationInSpace, index;
      locationInSpace = i % space;
      space           = space / dummy[a].length;
      index           = Math.floor(locationInSpace / space);

      obj[a]= dummy[a][index];
  });
  return obj;
}

let cResult = {};
for(let i=0; i<getAllCount(dummy); i++) {
  cResult['item' + (i+1)] = cSpace(i)
}
```

### 동적 반복문 추가 (방법2 - 트리구조 반복문, Callback이용하기)

트리구조를 이용한 반복문을 이용해

동적 반복문을 생성해 보도록 하겠습니다.

이 패턴에서 중요한 것은 재귀함수를 이용해서 반복문을 만든다는 것입니다.

```js

// 다음 객체가 동적으로 처리될 배열의 목록입니다.
let dummy = {
  arrA : ['a1', 'a2'],
  arrB : ['b1', 'b2'],
  arrC : ['c1', 'c2']
}

/*
  [트리구조 반복문]

  배열(1) 반복
  배열(2) 반복                배열(2) 반복
  배열(3) 반복  배열(3) 반복    배열(3) 반복    배열(3) 반복
*/
loopSquare(dummy, 0, {}, (rtn) => {
  console.log(rtn)
});

/*
  동적 반복문을 처리하는 재귀함수

  ip1 :: dummy {json}
  ip2 :: index {num}
  ip3 :: rtn {obj}
  ip4 :: cb {func}

  op  :: rtn {obj}
*/
function loopSquare(dummy, index, rtn, cb) {
  if(Object.keys(dummy).length > index) {
    dummy[Object.keys(dummy)[index]].forEach((v, i) => {
      rtn[Object.keys(dummy)[index]] = v;
      loopSquare(dummy, index+1, rtn, cb);
    });
  } else {
    cb(rtn);
  }
}

```

> 다음과 같은 방식은 전체 갯수만큼의 callback을 가지게 됩니다.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
