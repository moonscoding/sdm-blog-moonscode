# Canvas
## Canvas Width & Height
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Canvas](#canvas)
	* [Canvas Width & Height](#canvas-width-height)
		* [01. width & height](#01-width-height)
		* [02. scrollWidth & scrollHeight](#02-scrollwidth-scrollheight)
		* [03. 동적으로 캔버스 위치 처리하기](#03-동적으로-캔버스-위치-처리하기)
		* [04. 예제](#04-예제)

<!-- /code_chunk_output -->

### 01. width & height

캔버스를 설정할때 보통 태그의 속성으로써 width & height를 설정합니다.

```html
<canvas id="canvas" width="1920" height="1080">
```

- document.getElementById('canvas').width
- document.getElementById('canvas').Height

다음 명령어를 통해 얻어 올 수 있으며, 브라우저 크기와 상관 없는 고정값입니다.

### 02. scrollWidth & scrollHeight

- document.getElementById('canvas').scrollWidth
- document.getElementById('canvas').scrollHeight

다음 속성은 고정된 캔버스 크기가 아닌 브라우저 크기를 말합니다.

### 03. 동적으로 캔버스 위치 처리하기

그래서 동적으로 캔버스 위치를 처리하려면

- width & height
- scrollWidth & scrollHeight

이 두가지 속성을 동시에 잘 이용해줘야 합니다.

현재 scrollWidth & scrollHeight가

실제로 width & height 비율과 비교했을때 어떤 위치인지 처리하는 로직이 필요한 것입니다.

### 04. 예제

==이 부분은 'Canvas'상에서 'Dom'을 처리할때 아주 유용합니다.==

만약 width가 '100px'이고,

실제 브라우저에 잡힌 scrollWidth는 '200px'일때,

캔버스 가로의 1/4 지점을 클릭했더니 '25px'이 나왔습니다.

그래서 'Dom' 객체를 '25px' 위치에 올려줬더니 ? 올바르지 않은 위치입니다.

- 'Dom'은 scrollWidth, scrollHeight에 따른 위치값을 따르고,
- 'Canvas'는 width, height에 따른 위치값을 따르기 때문입니다.

그래서 다음과 같이

> scrollWidth / width 만큼의 비율을 '25px'에 곱해줘야 하는 것입니다.




---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
