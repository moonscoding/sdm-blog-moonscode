# MACBOOK 1년차의 OSX 사용기

## 터미널 installer homebrew 사용기

<div class="pull-right"> 문스코딩 - 2017.12.20 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MACBOOK 1년차의 OSX 사용기](#macbook-1년차의-osx-사용기)
	* [터미널 installer homebrew 사용기](#터미널-installer-homebrew-사용기)
		* [01. homebrew 설치 & 제거](#01-homebrew-설치-제거)
		* [02. homebrew [search] 패지키 검색](#02-homebrew-search-패지키-검색)
		* [03. homebrew [info] 패키지 정보 자세히 확인](#03-homebrew-info-패키지-정보-자세히-확인)
		* [04. homebrew [install] 패키지 설치](#04-homebrew-install-패키지-설치)
		* [05. homebrew [unlink & link] 비활성화 및 활설화](#05-homebrew-unlink-link-비활성화-및-활설화)
		* [06. homebrew [update] 업데이트](#06-homebrew-update-업데이트)
		* [07. homebrew [list] 설치 목록 보기](#07-homebrew-list-설치-목록-보기)
		* [08. homebrew [remove] 제거](#08-homebrew-remove-제거)
		* [09. homebrew [--config] 설정](#09-homebrew-config-설정)

<!-- /code_chunk_output -->


### 01. homebrew 설치 & 제거

설치

```
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

    $ brew doctor # 문제 진단
    $ brew update # 브루 업데이트
```

제거

```
    $ cd `brew --prefix`
    $ rm -rf Cellar
    $ brew prune
    $ rm `git ls-files`
    $ rmdir Library/Homebrew Library/Aliases Library/Formula Library/Contributions
    $ rm -rf .git
    $ rm -rf ~/Library/Caches/Homebrew
```

### 02. homebrew [search] 패지키 검색

```
    $ homebrew search package
```

### 03. homebrew [info] 패키지 정보 자세히 확인

```
    $ homebrew info package
```

### 04. homebrew [install] 패키지 설치

```
    $ homebrew install package
```

### 05. homebrew [unlink & link] 비활성화 및 활설화

```
    $ homebrew unlink package
    $ homebrew link package
```

### 06. homebrew [update] 업데이트

```
    $ brew update      # formula를 업데이트
    $ brew upgrade     # 업데이트 패키지를 다시 빌드
```

### 07. homebrew [list] 설치 목록 보기

```
    brew list
```

### 08. homebrew [remove] 제거

```
    $ brew remove package
```

### 09. homebrew [--config] 설정

```
    $ brew --config
```


홈브루 시스템 서비스

```

```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
