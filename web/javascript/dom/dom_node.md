# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. 상위 감싸기](#01-상위-감싸기)
		* [02.](#02)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. 상위 감싸기

```html
<div id="parentNode">
  <div id="childNode"></div>
</div>
```

상위 감싸는 예제

- 여기서 궁금한점
	- 노드 객체가 자동으로 이동된다는 것

```js
var wrap = function (toWrap, wrapper) {
    wrapper = wrapper || document.createElement('div');
    toWrap.parentNode.appendChild(wrapper);
    return wrapper.appendChild(toWrap);
};
```

### 02.

### 03.

### 용어정리
```

```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
