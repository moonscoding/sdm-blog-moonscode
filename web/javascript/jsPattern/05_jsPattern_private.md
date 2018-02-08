# JAVASCRIPT PATTERN - PRIVATE

#### Web - Front 자바스크립트 비공개 변수 어디까지 처리해야할까요 ?

<div class="pull-right"> 문스코딩 - 2018.01.dd </div>

---

**용어정리**
```

```

#### 01. 객체의 범위

객체 맴버 구분하기

![](./img/01_jsPattern_privateRange.png)

- 비공개 맴버
    - 앞에 '\_'를 붙여서 비공개 속성을 구분합니다.

- 인스턴스 맴버

- 프로토타입 맴버

- 생성자 맴버

#### 02. 비공개 private 어디까지 처리해야 할까 ?

자바스크립트를 이용해서 프론트를 개발하다 보니 문득 IIFE 패턴을 이용한 비공개 처리를 어디까지 해야할까... 의문이 들었습니다.

결론은 가상 상단의 노출되는 Property만 비공개처리하면 내부 클래스의 Property는 확인할 수 없습니다.

물론 소스를 직접 디버그 하며 확인해서 처리한다면야 처리할 수 있지만,

난독화가 되기 때문에 그것 또한 쉬운 일은 아닙니다.

그렇기 때문에 비공개 Property를 처리할때는 가장 상단의 노출 Property만 비공개로 처리하면

내부 Proprty는 비공개로 하지 않아도 확인할 수 없습니다.

#### 02. 변수 private

**방법 1 :: IIFE**

```js

```

**방법 2 :: ES7**

```js

```

#### 03. 함수 private가 가능한가요 ?

한 클래스에서 사용은 하지만 외부로 노출하고 싶지 않은 함수가 있습니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: 자바스크립트 private 규칙 ](http://huns.me/development/516)

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
