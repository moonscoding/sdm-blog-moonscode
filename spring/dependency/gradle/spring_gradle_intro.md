# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.06.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [시작하기전에](#시작하기전에)
			* [maven vs gradle](#maven-vs-gradle)
			* [maven](#maven)
			* [Gradle(Groovy기반)](#gradlegroovy기반)
		* [01. Install](#01-install)
		* [02. 실행방법](#02-실행방법)
		* [03.](#03)

<!-- /code_chunk_output -->

### 시작하기전에

#### maven vs gradle
maven과 gradle 모두 프로젝트를 build해주는 툴이며, 그외에 다양한 기능을 가지고 있습니다.

#### maven
- 매우 경직돼있어, maven이 기본지원하지 않는 빌드과정을 추가해야할 경우 어렵습니다.
- 프로젝트 구성/빌드 툴로써 프로젝트 구성은 정적인 설정 정보이고 빌드는 동적인 행위입니다.
  - 정적인 데이터를 저장하는데 적합한 xml로 그 내용을 기술하게 함으로써 동적인 행위인 빌드에 어려움을 줍니다.
- 멀티 프로젝트 구성을 상속구조로 한점
  - 상속 구조는 공통 설정을 여러 프로젝트가 공유할 때 비어있는(Abstract) 프로젝트를 만들어서 거기에다 공통 설정을 넣고 그걸 상속하게 해야한다.

#### Gradle(Groovy기반)
- 구성주입방식 (설정주입방식 - Configuration Injection) ::
- gradle groovy DSL로 작성하며 설정정보는 변에 값을 넣는 형태로, 동적인 빌드는 groovy 스크립트로 gradle용 플로그인을 호출하거나 직접 작성합니다.


### 01. Install

```
  brew tap caskroom/cask  # update homebrew
  brew install brew-cask  # update homebrew
  brew cask install java  # install java
  brew install gradle     # install gradle
```

```
  gradle -v
```

```
  gradle init
```

### 02. 실행방법

```
  gradle tasks    # 사용가능 명령어 확인하기
  gradle build    # 빌드 하기
  gradle run      # 실행하기
  gradle bootRun  # 실행하기 ( boot 환경 )
```

### 03.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 ::http://egloos.zum.com/kwon37xi/v/4747016 ](http://egloos.zum.com/kwon37xi/v/4747016)

[링크2 :: gradle 사용자 가이드 번역 ](http://kwonnam.pe.kr/wiki/gradle)
