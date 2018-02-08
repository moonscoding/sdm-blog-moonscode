# DOM 확실하게 알기 !

#### EVENT의 모든 것

<div class="pull-right"> 문스코딩 - 2018.02.05 </div>

---

**용어정리**
```

```

#### 01. CLICK

**javascript - which**
```html
<div onmousedown="WhichButton(event)">Click</div>
```

```js
function WhichButton(event) {
    alert("You pressed button: " + event.which)
}
```

**javascript - buttons**

1 = The left mouse button
2 = The right mouse button
4 = The middle mouse button
8 = The fourth mouse button (typically the "Browser Back" button)
16 = The fifth mouse button (typically the "Browser Forward" button)

```js
function WhichButton(event) {
    alert("You pressed button: " + event.buttons)
}
```

**jQuery로 처리하는 방법**

아무리 좋은 자바스크립트 라이브러리 프레임워크가 나온다고 해도
자바스크립트는 아직 jQuery를 논외로 할 수 없습니다.
너무나 많은 추가적인 레퍼런스가 있기 때문입니다.

```js
$('#element').mousedown(function(event) {
    switch (event.which) {
        case 1:
            alert('Left Mouse button pressed.');
            break;
        case 2:
            alert('Middle Mouse button pressed.');
            break;
        case 3:
            alert('Right Mouse button pressed.');
            break;
        default:
            alert('You have a strange Mouse!');
    }
});
```


#### 02.

#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
