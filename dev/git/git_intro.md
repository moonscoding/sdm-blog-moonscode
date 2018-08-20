# GIT
## 명령어 위주 정리 & 개념은 문서로 정리

<div class="pull-right"> 문스코딩 - 2018.02.20 </div>

---


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [GIT](#git)
	* [명령어 위주 정리 & 개념은 문서로 정리](#명령어-위주-정리-개념은-문서로-정리)
		* [설치방법 (install)](#설치방법-install)
		* [Git 프로젝트 가져오기](#git-프로젝트-가져오기)
		* [Git ID/PW 등록하기](#git-idpw-등록하기)
		* [명령어 (basic)](#명령어-basic)
		* [명령어 (branch)](#명령어-branch)

<!-- /code_chunk_output -->


### 설치방법 (install)

- 01. osX

http://sourceforge.net/projects/git-osx-installer/

MacPorts 사용방법
```
$ sudo port install git-core +svn +doc +bash_completion +gitweb
```

- 02. linux

```
  yum install git-core
```

### Git 프로젝트 가져오기

프로젝트 복사해서 가져오기

```
git clone <원격 서버 주소>
```

현재 프로젝트 올리기

```
git init
git remote add origin <원격 서버 주소>

git config credential.username <유저아이디> # 만약다른아이디로 로그인증이라면
```

### Git ID/PW 등록하기

- /etc/gitconfig :: 시스템의 모든 사용자와 모든 저장소에 적용되는 설정입니다. ( git config --system 으로 읽고쓸수 있습니다 . )
- ~/.gitconfig :: 특정 사용자에게만 적용되는 설정입니다.
- .git/config :: 이 파일은 Git 디렉토리에 있고 특정 저장소에만 적용됩니다.

아이디 / 패스워드 등록

```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

설정확인

```
$ git config --list
```


### 명령어 (basic)

- add

git add
git add .
git add /dir/

- commit

git commit -m "message in here"

- push

git push origin master

- pull

git pull origin master


### 명령어 (branch)

- branch

git branch
git branch bName

- checkout

git checkout branch_name

- pull & push

git push origin branch_name
git pull origin branch_name

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
