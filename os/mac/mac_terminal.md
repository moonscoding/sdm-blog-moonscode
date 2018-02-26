# MAC 활용기

## 내 MAC OS의 터미널 업데이트 하기

Moon's Coding - 2017.12.01

<hr>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MAC 활용기](#mac-활용기)
	* [내 MAC OS의 터미널 업데이트 하기](#내-mac-os의-터미널-업데이트-하기)
		* [01. on my zsh 설치](#01-on-my-zsh-설치)
		* [02. iterm 설치](#02-iterm-설치)
		* [03. 환경변수 설정](#03-환경변수-설정)
		* [04. alias 등록하기 (shortcut)](#04-alias-등록하기-shortcut)

<!-- /code_chunk_output -->


### 01. on my zsh 설치

터미널을 사용해도 좋지만, 터미널을 커스텀한 on my zsh 툴을 사용하는 것을 추천합니다.

terminal 보다 더 간편하고 편리한 기능을 많이 지원하기 때문입니다.

```linux
  # [방법1]
  $ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

  # [방법2]
  $ sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

  # [방법3]
  brew update
  brew install zsh

  # zsh checkup
  zsh --version
```

### 02. iterm 설치

https://www.iterm2.com/ (Download)

### 03. 환경변수 설정

```linux

  # zsh 환경 설정으로 진입
  vi ~/.zshrc

  # 상단에 기존에 사용하고 있던 bash_profile 환경변수 추가
  # ==================[CUSTOM]====================
  # bash_profile  
  [[ -e ~/.bash_profile ]] && emulate sh -c 'source ~/.bash_profile'
  # ==================[CUSTOM]====================

  # 원하는 테마 선택 ('random'가능)
  ZSH_THEME="random"

```

### 04. alias 등록하기 (shortcut)

```linux

  # zsh 환경 설정으로 진입
  vi ~/.zshrc

  # my alias (최하단)
  alias ns = "npm start"

  # 저장 후에 다음 명령어를 실행해야 alias 사용이 가능함
  source ~/.zshrc  
```

저는 단축키를 자주 사용하기 때문에

vi ~/.zshrc 와 souce ~/.zshrc 또한 단축키로 지정해서 사용합니다.

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 : https://nolboo.kim/blog/2015/08/21/oh-my-zsh/**
