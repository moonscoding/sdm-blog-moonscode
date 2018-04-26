# SoundJS - 내페이지에 음악관리하기
## Mobile 페이지 음악 관리하기
<div class="pull-right"> 문스코딩 - 2018.03.dd </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [SoundJS - 내페이지에 음악관리하기](#soundjs-내페이지에-음악관리하기)
	* [Mobile 페이지 음악 관리하기](#mobile-페이지-음악-관리하기)
		* [01. initializeDefaultPlugins](#01-initializedefaultplugins)
		* [02.  모바일 Detect](#02-모바일-detect)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. initializeDefaultPlugins

```js
// initializeDefaultPlugins가 false를 반환하면이 브라우저에서 사운드를 재생할 수 없습니다.
if (!createjs.Sound.initializeDefaultPlugins()) {return;}
```


### 02.  모바일 Detect

```js
if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {
    document.getElementById("mobile").style.display = "block";
    document.getElementById("content").style.display = "none";
    return;
}
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: soundjs mobile ](https://www.createjs.com/tutorials/Mobile%20Safe%20Approach/index.html)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
