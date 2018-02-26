# NPM 의 모든것 !

## npm 이슈 저장소 - 같은 에러는 빠르게 !

<div class="pull-right"> 문스코딩 - 2017.12.20</div>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [NPM 의 모든것 !](#npm-의-모든것)
	* [npm 이슈 저장소 - 같은 에러는 빠르게 !](#npm-이슈-저장소-같은-에러는-빠르게)
		* [[3] linux](#3-linux)

<!-- /code_chunk_output -->


---

### [3] linux

1.  tunneling socket could not be established, cause=connect ECONNREFUSED 52.78.156.89:80

```
    >npm config set proxy http://proxyhost:proxyport
    >npm config set https-proxy http://proxyhost:proxyport

    or

    >npm config set proxy null
    >npm config set https-proxy null
```

2. --no-otional 은 무엇인가

**optionalDependencies**

사용을 원하는 모듈이지만, 없거나 설치가 실패해서 npm의 설치 과정이 중단되지 않도로 하려면,
optionalDependencies를 사용합니다.
여기에는 버전을 포함한 패키지 이름 혹은 url을 dependencies와 같은 방식으로 기재합니다.
차이가 있다면 빌드가 실패해서 설치가 중단되지 않고 다른 모듈을 설치하는 것입니다.

```
try {
    var foo = require('foo')
    var fooVersion = require('foo/package.json').version
} catch (er) {
    foo = null
}

if ( notGoodFooVersion(fooVersion) ) {
    foo = null
}

// .. then later in your program ..

if (foo) {
    foo.doFooThings()
}
```


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
