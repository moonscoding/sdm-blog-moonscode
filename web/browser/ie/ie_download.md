# Internet Explorer

## 필요악, IE

<div class="pull-right"> 문스코딩 - 2018.02.06 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Internet Explorer](#internet-explorer)
	* [필요악, IE](#필요악-ie)
		* [01. IE 지원](#01-ie-지원)
		* [02. VM](#02-vm)
		* [03. IE 개발자 도구에서 설정하는 방법](#03-ie-개발자-도구에서-설정하는-방법)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. IE 지원

explorer 8 :: xp ~ vista
explorer 9 :: vista ~ 7
explorer 10 :: 7 ~

기본적으로 호환성을 반영하기 시작한 버전은 IE 10부터 입니다.
대부분의 프레임워크 라이브러리도 IE 10 버전부터 지원하고 있는 경우가 많습니다.
모든 버전을 완벽히 지원하는 웹 애플리케이션이 가장 좋다고 할 수 있지만,
상황에 따라 빠른 개발 속도를 지원하기 위해서
사용량이 적은 하위 호환 버전을 지원하지 않는 것도
전략저으로 좋은 방법이 될 수 있습니다.

### 02. VM

ms에서는 하위 IE 버전을 테스트 할 수 있는 VM을 제공하고 있습니다.

[ms-vm link](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)

운영체제에 따른 가상 머신을 제공하고 있기 때문에 다양한 운영체제에서 IE를 테스트 할 수 있습니다.

### 03. IE 개발자 도구에서 설정하는 방법

IE 버전에서 개발자 도구를 이용해 하위 버전을 선택해서 reload 할 수 있습니다.

아직 정확하게 확인 되지 않았으나 몇몇 문제점으로 보아 완벽한 호환은 아니라구 할 수 없어 보입니다.

일단 프로트에서는 IE 하위 버전으로 나오는지 모르겠으나,

서버에서는 IE 하위 버전으로 페이지를 로드 시켜도 header값에선 인식하지 못합니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
