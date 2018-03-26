# SoundJS - 내페이지에 음악관리하기
## SoundJS의 사용법을 숙지합니다.
<div class="pull-right"> 문스코딩 - 2018.03.08 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [SoundJS - 내페이지에 음악관리하기](#soundjs-내페이지에-음악관리하기)
	* [SoundJS의 사용법을 숙지합니다.](#soundjs의-사용법을-숙지합니다)
		* [01. SoundJS](#01-soundjs)
		* [02. 적용하기](#02-적용하기)
		* [03. 로딩처리의 한계](#03-로딩처리의-한계)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. SoundJS

soundjs는 canvas 라이브러리인 createjs중 한개입니다.

해당 라이브러리는 음악파일을 로드하고 플레이하는 역할을 합니다.

### 02. 적용하기

soundjs를 이용하기 위해서는 createjs를 import 해야합니다.

```js
createjs.Sound.on("fileload", handleLoadComplete);

// [#] 단일
// createjs.Sound.alternateExtensions = ["mp3"];
// createjs.Sound.registerSound({src:"path/to/sound.ogg", id:"sound"});

// [#] 복수
var audioPath = "assets/";
var sounds = [
    {id:"Music", src:"M-GameBG.ogg"},
    {id:"Thunder", src:"Thunder1.ogg"}
];
createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.registerSounds(sounds, audioPath);   // [#] registerSounds (s를 주의하세요!)

function handleLoadComplete(event) {
	createjs.Sound.play("sound");  // resource의 id값으로 접근합니다.
}
```

### 03. 로딩처리의 한계

SoundJS 에는 다양한 이벤트 핸들러를 구축하는데 한계가 있습니다.

내부 SoundJS 로딩의 의도는 추가 기능없이 매우 간단한 로딩을 제공하는 것이 었습니다.

모든 것이 작동 할 것이라는 가정하에 만들어졌으며, 실패한 경우 자동으로 실패합니다.

보다 복잡한 로딩을 위해서는 PreloadJS를 사용하는 것이 좋습니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
