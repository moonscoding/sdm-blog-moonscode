# CreateJS 활용일지
## CreateJS 내부에서 dom 활용하기
<div class="pull-right">  업데이트 :: 2018.04.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [CreateJS 활용일지](#createjs-활용일지)
	* [CreateJS 내부에서 dom 활용하기](#createjs-내부에서-dom-활용하기)
		* [01. Dom 추가하기](#01-dom-추가하기)
		* [02. Canvas와 Dom 위치 설정하기](#02-canvas와-dom-위치-설정하기)
		* [03. 실제 사용 예제](#03-실제-사용-예제)
			* [canvas-wrapper 만들기](#canvas-wrapper-만들기)
			* [canvas-dom-object 만들기](#canvas-dom-object-만들기)

<!-- /code_chunk_output -->



### 01. Dom 추가하기

createjs에 dom을 추가하는 기능을 살펴보겠습니다.

createjs는 canvas 위에 dom을 추가하는 기능을 제공합니다.

```js
var container = new createjs.Container();
var dom = new createjs.DOMElement("foo");
container.addChild(dom)
```

다음과 같이 createjs에서 제공하는 명령어를 사용하면 됩니다.

dom을 직접넣는 것이 아니라 ID값만 넣어주면 됩니다.

> new createjs.DOMElement(id)

### 02. Canvas와 Dom 위치 설정하기

Canvas에 Dom을 추가할때 Dom의 위치는 Canvas위에 오버랩 되어 있어야 합니다.

다음은 createjs에서 제공하고 있는 예제를 요약한 것입니다.

여기서 중요한 부분은 다음과 같습니다.

- z-index :: 캔버스 위에 올라가야하기때문에 z-index 우선순위가 더 높아야 합니다.
- postion :: 캔버스와 겹쳐 올라가야하기 때문에 positon 'absolute'가 되야합니다.
- visibility :: 캔버스 위에서 보여야 하기 때문에 'hidden' 으로 처리합니다.

```html
<div>
	<div id="foo"
		 style="z-index: 1; position: absolute; background-color: #111; color:#FFF; width:260px; height:260px; padding: 10px; visibility: hidden;">
		<b>Hello! I'm an HTML div.</b>
	</div>
	<canvas id="canvas" width="960" height="300"></canvas>
</div>
```

> visibility hidden은 따로 처리해주지 않아도 createjs.DOMElement 메소드를 이용하면 자동으로 visible 처리됩니다.

### 03. 실제 사용 예제

#### canvas-wrapper 만들기

캔버스에 작업중에 필요에 따라 계속 html에 Dom을 구성해주는 일은 상당히 불편하고 가독성이 떨어질 것입니다.

그래서 code 속에서 dom 객체를 추가할 수 있도록 관리해줘야합니다.

canvas 속에 dom 구조를 추가하는 예제를 보겠습니다.

```js
const CANVAS_DOM = document.getElementById("canvas");
const STAGE = new createjs.Stage(CANVAS_DOM); // # Stage

// Canvas Wrapper 처리
const CANVAS_WRAPPER = document.createElement('div');
CANVAS_WRAPPER.setAttribute("id", "canvas-wrapper");
CANVAS_WRAPPER.style.display = "inline-block";
CANVAS.parentNode.appendChild(CANVAS_WRAPPER);
CANVAS_WRAPPER.appendChild(CANVAS_DOM);
```

```html
<div id="canvas-wrapper" style="display:inline-block;">  
	<canvas id="canvas" width="960" height="300"></canvas>
</div>
```

#### canvas-dom-object 만들기

```js
function appendCanvasDom(canvasWrapper, domId, w, h, z, p) {

  // [#] CANVAS_DOM
  const CANVAS_DOM = document.createElement('div');
  CANVAS_DOM.setAttribute("id", domId);
  CANVAS_DOM.style.position = "absolute";
  CANVAS_DOM.style['z-index'] = z;
  CANVAS_DOM.style.width = w + "px";
  CANVAS_DOM.style.height = h + "px";
  CANVAS_DOM.style.padding = p + "px";

  canvasWrapper.appendChild(CANVAS_DOM);

  return CANVAS_DOM;
}

const DOM_ID = 'createjs-dom-object';
appendCanvasDom(CANVAS_WRAPPER, DOM_ID, 100, 100, 1, 10);
var createjsDomObject = new createjs.DOMElement(DOM_ID);
```

- appendCanvasDom 메소드를 사용하면 캔버스 위치에 (0,0) 위치에 DOM을 추가할수 있습니다.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106
