# DOM 확실하게 알기 !

#### Dom의 Life Cycle (생명주기)

<div class="pull-right"> 문스코딩 - 2018.02.06 </div>

---

**용어정리**
```

```

#### 01. Dom의 생명주기

html 작업을 하다보면 데이터의 생명주기에 따라 실행 순서가 다릅니다.

JavaScript는 보이는 대로 실행됩니다.
일반적으로 브라우저는 \<script> 태그를 보고
즉시 스크립트를 다운로드 및 실행한 다음 다음 단계를 계속 진행합니다.

> 그래서 일반적으로 스크립트 태크는 하단에 두는 것이 좋습니다.
> Html 돔이 모두 생성된 후에 스크립트가 처리되야 하기 때문입니다.

```html

<!DOCTYPE html>
<html>
    <head>
        <!-- 1 순위 -->
    </head>
    <body>
        <!-- 2 순위 -->
    </body>
    <!-- 3 순위 -->
</html>

```

#### 02. Firefox

Firefox부터는 스크립트가 백그라운드에서 다운로드되고 나머지 페이지는 랜더링됩니다.
스크립트가 document, write 또는 유사한 것을 사용하는 지금의 특별한 경우에는
Firebox가 필요한 만큼 백업하ㅗ 다시 그립니다.

#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: stackoverflow - javascript dom life cycle ](https://stackoverflow.com/questions/1307929/javascript-dom-load-events-execution-sequence-and-document-ready)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
