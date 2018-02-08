# HTML INCLUDE

#### 서버없이 HTML을 include하고 싶어요 !

<div class="pull-right"> 문스코딩 - 2018.01.25 </div>

---

**용어정리**
```
    include :: 다른 문서에 내용을 해당 내용에 접목 시키는 것.
```

#### 01. include

반복적인 소스코드를 하나의 공통적인 소스코드로 합쳐 호출하는 방식으로 사용하는 것.

**w3 사용 방법**

```html
<!DOCTYPE html>
<html>
    <script src="https://www.w3schools.com/lib/w3.js"></script>
    <body>
        <div w3-include-html="h1.html"></div>
        <div w3-include-html="content.html"></div>
        <script>w3.includeHTML();</script>
    </body>
</html>
```

**jquery 사용 방법**

```html
<html>
  <head>
    <script src="jquery.js"></script>
    <script>$(function(){ $("#includedContent").load("b.html"); });</script>
  </head>
  <body>
     <div id="includedContent"></div>
  </body>
</html>
```

#### 02. cross origin 문제

여러 방식들이 모두 Cross origin requests are ... 에러가 발생한다.

> file:// or C:/ 의 url은 http://가 아니기 때문에 에러가 발생한다.
> Web Server를 등록해서 처리할 수 있습니다.

#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
