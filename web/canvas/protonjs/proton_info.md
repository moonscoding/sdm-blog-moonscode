# 분자단위 애니메이션, Proton
## particle canvas lib, PROTON !

<div class="pull-right"> 문스코딩 - 2018.01.31 </div>

---
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [분자단위 애니메이션, Proton](#분자단위-애니메이션-proton)
	* [particle canvas lib, PROTON !](#particle-canvas-lib-proton)
			* [01. Proton](#01-proton)
			* [02. 사용방법](#02-사용방법)
			* [03. Proton 프로퍼티](#03-proton-프로퍼티)
			* [04. Proton 종류 및 설명](#04-proton-종류-및-설명)

<!-- /code_chunk_output -->


**용어정리**
```
    Proton ::
```

#### 01. Proton

Web 캔버스 게임게임을 제작하다보니 다양한 캔버스 라이브러리가 필요했습니다.
이번에 소개할 라이브러리는 분자 단위 캔버스 애니메이션을 처리하는 Proton입니다.

[Proton github](https://github.com/a-jie/Proton)

```linux
    npm install
    npm run build
    npm start           # localhost:3001
```

Proton 소스를 받아 설치하면 상세하게 여러 예제들을 정리해 놓았습니다.
이번에는 예제들을 통해서 Proton을 프로젝트에 적용하는 방법에 대해서 이야기 해보겠습니다.

#### 02. 사용방법

Proton의 사용방법은 간단합니다.

```html
<script type="text/javascript" src="js/proton.min.js"></script>
```

```js

// Proton 객체와 Emitter 객체를 생성합니다.
var proton = new Proton();
var emitter = new Proton.Emitter();

//set Rate
emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), 0.1);

//add Initialize
emitter.addInitialize(new Proton.Radius(1, 12));
emitter.addInitialize(new Proton.Life(2, 4));
emitter.addInitialize(new Proton.Velocity(3, Proton.getSpan(0, 360), 'polar'));

//add Behaviour
emitter.addBehaviour(new Proton.Color('ff0000', 'random'));
emitter.addBehaviour(new Proton.Alpha(1, 0));

//set emitter position
emitter.p.x = canvas.width / 2;
emitter.p.y = canvas.height / 2;
emitter.emit(5);

// Emitter 객체 삽입
proton.addEmitter(emitter);

// Renderer 생성 및 Proton 객체에 삽입
var renderer = new Proton.CanvasRenderer(canvas);
proton.addRenderer(renderer);

//use Euler integration calculation is more accurate (default false)
Proton.USE_CLOCK = false or true;
```

#### 03. Proton 프로퍼티

Proton에선 간단하게 3개의 속성만 알고 있으면 됩니다.

1. proton 객체
2. emitter 객체
3. renderer 객체

#### 04. Proton 종류 및 설명

- behaviour
    - attraction
    - collision
    - color
    - custom
    - force
    - gravitywell
    - randomDirft
    - repulsion
    - rotate
- emitter
    -

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
