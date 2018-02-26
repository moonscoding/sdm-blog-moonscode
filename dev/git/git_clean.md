# GIT 알고 사용합니다.
## 추적당하지 않는 file 모두 삭제하기

<div class="pull-right"> 문스코딩 - 2018.02.20 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [GIT 알고 사용합니다.](#git-알고-사용합니다)
	* [추적당하지 않는 file 모두 삭제하기](#추적당하지-않는-file-모두-삭제하기)
		* [01. git clean](#01-git-clean)
		* [02. 주의 !](#02-주의)

<!-- /code_chunk_output -->

**용어정리**
```
    clean ::
    -f ::
    -fd ::
    --dry-run ::
```

### 01. git clean

```
$ git status

$ git clean -f

$ git status
```

> git clean -f 를 사용하면 추적하지 않는 모든 파일을 지울수 있습니다.
> dir까지 모두 지우길 원하면 git clean -fd 옵션을 사용하면 됩니다.

### 02. 주의 !

추적하지 않는 파일을 모두 지우는 것이기 떄문에
실수하면 작업중인 파일(아직 커밋되지 않은)을 모두 지울 수 있습니다.

> git clean -fd --dry-run 옵션을 사용하면 지워질 파일을 미리 확인할 수 있습니다.


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
