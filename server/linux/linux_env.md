# LINUX MASTER
## 환경변수를 설정해 봅시다.

<div class="pull-right"> 문스코딩 - 2018.02.21 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [LINUX MASTER](#linux-master)
	* [환경변수를 설정해 봅시다.](#환경변수를-설정해-봅시다)
		* [01. 환경변수 확인하기](#01-환경변수-확인하기)
		* [02. 환경변수 생성 및 수정하기](#02-환경변수-생성-및-수정하기)
		* [03. 사용자 설정 파일](#03-사용자-설정-파일)
		* [04. alias 설정](#04-alias-설정)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. 환경변수 확인하기

```
    $ env
```

> 다음 명령어를 사용하면 현재 서버에서 사용하고 있는 환경변수를 조회할 수 있습니다.

### 02. 환경변수 생성 및 수정하기

```
    $ export num1=100 # 생성
    $ env

    $ export num1=200 # 수정
    $ env
```
> export라는 명령어를 사용해서 환경변수를 추가할 수 있습니다.

### 03. 사용자 설정 파일

- /etc/profile
- /etc/bashrc
- ~/.bash_profile (로그인시 환경 설정 파일)
- ~/.bashrc
- ~/.bash_logout (로그아웃시 환경 설정 파일)

> /etc/profile , /etc/bashrc 는 전체 사용자에게 적용 됩니다.
> ~/.bash_profile , ~/.bashrc , ~/.bash_logout 는 해당 사용자에게 적용됩니다.
> ~/.bash_history 파일은 해당 사용자가 사용한 명령어 기록을 가지고 있습니다.

- 환경설정 파일 인식 순서

> /etc/profile -> ~/.bash_profile -> /etc/bashrc 순으로 처리됩니다.

### 04. alias 설정

```
    $ alias <alias_name>="<command>"

    $ alias la='ls -al'
    $ la
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
