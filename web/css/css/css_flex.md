# CSS
## Flex
<div class="pull-right">  업데이트 :: 2018.05.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [CSS](#css)
	* [Flex](#flex)
		* [01. Flex](#01-flex)
		* [02. Flex Container](#02-flex-container)
		* [03. Flex Item](#03-flex-item)
		* [04. Flex 속성](#04-flex-속성)
			* [flex (flex-grow)](#flex-flex-grow)
			* [flex-direction](#flex-direction)
			* [flex-wrap](#flex-wrap)
			* [flex-flow](#flex-flow)
			* [flex-basis](#flex-basis)
			* [flex-shrink](#flex-shrink)
			* [align-items & justify-content](#align-items-justify-content)
		* [05. 실사용 예제](#05-실사용-예제)

<!-- /code_chunk_output -->



### 01. Flex

기존에 우리가 사용하던 레이아웃 기법은 display, float, position으로써

컬럼 레이아웃을 표현하는데 한계가 있고 구현 방법이 복잡한 문제가 있었는데요.

flexible(신축성 있는, 유연한) 박스 모델의 장점을 한 마디로 표현하면

> “복잡한 계산 없이 박스의 크기와 순서를 유연하게 배치할 수 있다.” 라고 정리할 수 있습니다.

### 02. Flex Container

flex container는 flex item의 면적, 방향, 정렬을 결정하는 컨테이너입니다.

flex container 요소에 display 속성의 값으로 inline-flex를 선언하면 인라인 수준의 flex container를 생성하고,

flex 값을 선언하면 블럭 수준의 flex container를 생성합니다.

### 03. Flex Item

flex item은 컨테이너 내부에 형성된 free space(남거나 모자라는 공간, margin과 유사한 개념이지만 margin은 아님)를

팽창지수 또는 수축지수 값에 따라 형제들이 서로 나누어 갖습니다.

flex container에 inline-flex 또는 flex 값을 선언하면 자식 요소들은 자동으로 flex item이 됩니다.

기본 스타일

```css
(
  flex-grow:0;
  flex-shrink:1;
  flex-basis:auto;
  flex-direction:row;
  flex-wrap:nowrap;
  )
```
개발자가 변경할 수 있습니다


### 04. Flex 속성

#### flex (flex-grow)

android로 따지면 weight의 개념입니다.

```css
#main div {
    -webkit-flex: 1; /* Safari 6.1+ */
    -ms-flex: 1; /* IE 10 */
    flex: 1;
}
```

#### flex-direction

```css
#main {
    display: -webkit-flex; /* Safari */
    -webkit-flex-direction: row-reverse; /* Safari 6.1+ */
    display: flex;
    flex-direction: row-reverse;
}
```

- row
- row-reverse
- column
- column-reverse
- initial :: 	Sets this property to its default value. Read about initial
- inherit :: 	Inherits this property from its parent element. Read about inherit

> tip1 :: column-reverse를 사용하는 이유 => overflow-y가 flex-end에선 사용되지 않음 그래서 다음으로 처리

#### flex-wrap

```css
div {
    display: -webkit-flex; /* Safari */
    -webkit-flex-wrap: wrap; /* Safari 6.1+ */
    display: flex;   
    flex-wrap: wrap;
}
```

- nowrap
- wrap
- wrap-reverse
- initial
- inherit

#### flex-flow

```
flex-flow: flex-direction flex-wrap|initial|inherit;
```

```css
div {
    display: -webkit-flex; /* Safari */
    -webkit-flex-flow: row-reverse wrap; /* Safari 6.1+ */
    display: flex;
    flex-flow: row-reverse wrap;
}
```


#### flex-basis

길이로 flex 설정하기

```css
div:nth-of-type(2) {
  -webkit-flex-basis: 100px; /* Safari 6.1+ */
  flex-basis: 100px;
}
```

#### flex-shrink

나머지 요소보다 3배 작게 처리

```css
/* Safari 6.1+ */
div:nth-of-type(2) {
    -webkit-flex-shrink: 3;
}

/* Standard syntax */
div:nth-of-type(2) {
    flex-shrink: 3;
}
```

#### align-items & justify-content

두 속성의 차이를 비교해봅시다.

https://css-tricks.com/almanac/properties/a/align-items/ 이곳참조

https://www.w3schools.com/cssref/playit.asp?filename=playcss_justify-content&preval=flex-start 이곳참조

> tip1 :: 'flex-end'가 'overflow-y'를 막습니다. 주의하세요. 'reverse'를 사용하세요 !

### 05. 실사용 예제

http://ko.learnlayout.com/flexbox.html 참조

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: http://naradesign.net/wp/2017/04/20/2363/](http://naradesign.net/wp/2017/04/20/2363/)

[링크2 :: ]()
