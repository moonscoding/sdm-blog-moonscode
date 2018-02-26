# NVM INSTALL & DELETE

## nvm 으로 노드 버전 관리하기

<div class="pull-right"> 문스코딩 - 2017.12.21 </div>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [NVM INSTALL & DELETE](#nvm-install-delete)
	* [nvm 으로 노드 버전 관리하기](#nvm-으로-노드-버전-관리하기)
		* [[1] linux](#1-linux)
			* [설치](#설치)
			* [사용](#사용)
			* [삭제](#삭제)
		* [[2] macos](#2-macos)
			* [설치](#설치-1)
			* [사용 (Linux와 같음)](#사용-linux와-같음)
			* [삭제](#삭제-1)

<!-- /code_chunk_output -->


---


### [1] linux

#### 설치

```linux
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.3/install.sh | bash # 최신 stable 버전으로 설치해주세요.
```

설치를 확인합니다.
```
$ source ~/.bash_profile
$ nvm --version
```
nvm은 설치되면 경로는 보통 ~/.nvm 에 설치됩니다.

#### 사용

```linux
$ nvm list-remote # 설치가능한 node list 확인하기

$ nvm install v10.n.n # node 설치

$ nvm list # 설치된 list 확인하기

$ nvm use v10.n.n # 설치된 node 사용하기
```

#### 삭제

### [2] macos

#### 설치

nvm 설치하기

```
$ sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

$ vi ~/.bash_profile
```

~/.bash_profile 작성하기
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

재시작
```
source ~/.bash_profile
```

설치 확인
```
nvm ls
```

#### 사용 (Linux와 같음)

```linux
$ nvm list-remote # 설치가능한 node list 확인하기

$ nvm install v10.n.n # node 설치

$ nvm list # 설치된 list 확인하기

$ nvm use v10.n.n # 설치된 node 사용하기
```

#### 삭제

nvm 을 사용하고 있는 .bash_profile , .bashrc 등을 확인해서 nvm 설치 경로를 찾습니다.

설치경로로 이동 후
```
    rm -rf ~/.nvm
    rm -rf ~/.npm
    rm -rf ~/.bower
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
