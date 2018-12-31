GIT
===

.gitignore 처리하기
-------------------

<div class="pull-right"> 업데이트 :: 2018.05.29 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[intelliJ 샘플](#intellij-샘플)
-	[위치](#위치)
-	[예제](#예제)
-	[The requested URL returned error: 403](#the-requested-url-returned-error-403)

<!-- /code_chunk_output -->

### intelliJ 샘플

```
/target/
!.mvn/wrapper/maven-wrapper.jar

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/build/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/

### Custom ###
target/*
```

### 위치

'.gitignore' 파일은 '.git' 위치와 같은 경로에 위치하면 됩니다.

### 예제

```
# 주석은 이렇게 사용하세요.

hello/world.js
byebye/*
```

### The requested URL returned error: 403

```
git remote set-url origin <url>
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
