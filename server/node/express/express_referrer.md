# EXPRESS GOOD !
## 철자에 주의하세요. referrer !

<div class="pull-right"> 문스코딩 - 2018.02.21 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [EXPRESS GOOD !](#express-good)
	* [철자에 주의하세요. referrer !](#철자에-주의하세요-referrer)
		* [01. referrer 란](#01-referrer-란)
		* [02. nodejs 에서 referrer 확인](#02-nodejs-에서-referrer-확인)
		* [03. 이슈](#03-이슈)

<!-- /code_chunk_output -->

**용어정리**
```
	Referer :: 실제로 referrer 라는 단어의 철자 오류입니다.
```

### 01. referrer 란

인터넷 상에 흔적을 말합니다.
만약 a 페이지에서 b 페이지로 왔을때, referrer 값을 보게된다면,
서버 개발자는 a 페이지에서 유입됬다는 것을 확인할 수 있습니다.
다만, referrer 값은 수정도 가능하기 때문에 맹신해서는 안됩니다.

- no-referrer
- no-referrer-when-downgrade (default)
- origin
- origin-when-creoss-origin
- same-origin
- strict-origin
- strict-origin-when-cross-origin
- unsafe-url

### 02. nodejs 에서 referrer 확인

```js
console.log(req.headers.referrer)
```

> 다음 명령어를 통해 referrer 값을 참조할 수 있습니다.

### 03. 이슈

referer가 정확하게 참조하지 않는 문제가 발생했습니다.

localhost에서 > localhost의 다른 페이지로 이동시에는
referer가 나오지만,
google이나 naver에서 > localhost로 이동할 때는
referrer가 나오지 않는 문제가 있었습니다.

> [해결책] 찾는중...

referrer 정보를 프론트에서 수집하려 할때는 2가지 방법이 있습니다.

- document.referrer

> document.referrer 방식은 노드에서 사용하는 referer와 동일하게
> 동일 도메인 내에 back page 정보는 기록하지만,
> 다른 도메인 내에 back page 정보는 기록하지 않습니다.

- window.history

> window.history는 back page로 이동할 수 있게 하는 함수를 제공하지만,
> 보안 및 개인 정보 보호를 위해 세션의 URL에 대한 엑세스는 허용하지 않습니다.

즉 ! 지금까지 확인한 결과 같은 도메인 내에 back page 확인은 가능하지만,
다른 도메인에서의 접근 back page는 확인할 수 없다는게 결론입니다.

그래서 외부 접근인지 확인할 때, referer를 담을 URL를 따로 생성해서
처리하는 방식을 선택할 수 밖에 없습니다.

일단 결론은 그렇습니다.


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ](https://medium.com/@nikjohn/express-js-node-js-extract-path-from-request-object-529ceef2c7e5)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
