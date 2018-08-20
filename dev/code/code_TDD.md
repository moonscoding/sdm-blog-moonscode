# Code
## TDD
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Code](#code)
	* [TDD](#tdd)
		* [01. TDD란](#01-tdd란)
		* [02. TDD 자세히 알기](#02-tdd-자세히-알기)
		* [03. TTD의 흐름](#03-ttd의-흐름)
		* [04. TDD 메소드](#04-tdd-메소드)
		* [05. TDD 사용하기](#05-tdd-사용하기)
		* [06. TDD Module](#06-tdd-module)

<!-- /code_chunk_output -->

### 01. TDD란

> "Clean code that works!"

TDD(Test Driven Development)는 이것을 추구하는 가장 현실적인 방법입니다.

"테스트 주도적 개발"이란 뜻의 TDD는 안정적인 코드를 유지하는데 큰 도움을 줍니다.

### 02. TDD 자세히 알기

TDD는 테스트 코드를 먼저 작성하고 그 테스트 코드를 통과하는 실제 코드를 나중에 만듭니다.

즉, 건물을 지을때를 예로 들면, 영역을 잡는 것은 테스트 코드, 실제 벽돌을 올리는 것은 실행 코드라고 생각할 수 있습니다.

그리고 리펙토링은 벽돌을 이쁘게 다시 잡는 것이라고 생각할 수 있습니다.

### 03. TTD의 흐름

Need >>>>> Test >>>(통과)>>> Code >>>(불만족)>>> Refactoring >>>(만족)>>> Test


- 무엇을 테스트 할 것인가
- 실패하는 테스트를 작성합니다
- 테스트를 통과하는 코드를 작성합니다 (가장 간단한 코드)
- 코드를 리팩토링합니다 (테스트코드또한)
- 구현이 될때까지 다음을 반복합니다

### 04. TDD 메소드

"TDD"를 사용하기 위해서 간단한 메소드 몇개가 필요합니다.

```js
function test(test-name, test-callback) {

}

function equals(a, b) {

}

function notEqual(a, b) {

}
```

### 05. TDD 사용하기

"TDD"를 프로세스에 접목 시키기 위해선 일단, 사고의 전환이 필요합니다.

> 명세를 진행하고, 테스트를 진행하고, 테스트를 통과하는 가장 빠른 코드를 개발하고, 리펙토링 후에 다시 테스트 한다.

예를 들어, 자판기가 있다고 했을때,

```
자판기에 필요한 "구현명세"를 합니다.

- 구매하기
- 재고채우기

자판기에 필요한 "테스트명세"를 합니다. (구현 코드를 가지고 처리합니다.)

- 고른 음료수에 맞는 음료수가 나옵니다.
- 재고가 있어야만 음료수가 나옵니다.
- 음료수를 사면 재고가 줄어듭니다.
- 재고를 채우면 음료수가 증가합니다.
```

> 구현명세와 테스트 명세중 어떤 것을 먼저 진행해야하는지는 사실 큰 상관이 없습니다.

그리고 가장 간단한 테스트 코드를 작성합니다. (리펙토링을 할 것이기 때문에 테스트 코드에 신경쓸 필요가 없습니다.)

만약, 테스트가 통과했다면 리펙토링을 시작합니다.

리펙토링을 마친 후, 테스트 코드를 다시 진행합니다.

### 06. TDD Module

- JavaScript
	- Assert
	- Mocha

- Java
	- Junit (https://nesoy.github.io/articles/2017-02/JUnit)

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: https://wikidocs.net/224](https://wikidocs.net/224)

[링크2 :: ]()
