# SoundJS - 내페이지에 음악관리하기
## SoundJS의 사용법을 숙지합니다.
<div class="pull-right"> 문스코딩 - 2018.03.08 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [SoundJS - 내페이지에 음악관리하기](#soundjs-내페이지에-음악관리하기)
	* [SoundJS의 사용법을 숙지합니다.](#soundjs의-사용법을-숙지합니다)
		* [01. SoundJS](#01-soundjs)
		* [02.](#02)

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

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
