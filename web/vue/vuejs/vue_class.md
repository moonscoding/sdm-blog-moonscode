# VUE 시작하세요 !

#### vue의 class 바인딩에 대해서 배워봅시다.

<div class="pull-right"> 문스코딩 - 2018.02.05 </div>

---

**용어정리**
```

```

#### 01. HTML 클래스 바인딩하기

```html
<div v-bind:class="{ active: isActive }"></div>
```

> v-bind:class 를 이용해서 class를 바인딩할 수 있습니다.
> active라는 클래스의 상태가 isActive라는 bool 값에 의해서 결정됩니다.

```html
<!-- 클래스 바인딩 -->
<div class="static" v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

<!-- 결과 -->
<div class="static active"></div>
```

> 공통적용 클래스는 앞서 미리 설정해 줍니다. 여러 클래스를 동시에 바인딩 할 수도 있습니다.

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

#### 02. 계산된 속성 바인딩하기

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

#### 03. 배열 구문

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

```html
<!-- 결과 -->
<div class="active text-danger"></div>
```
> 배열에 연결된 클래스 값이 자동으로 바인딩됩니다. 이런 경우는 클래스명을 자바스크립트에서 처리해줘야합니다.

#### 04. 삼항 연산자

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

> 항상 errorClass를 적용하고(default), isActive라는 bool 값에 의해 activeClass와 null을 토글합니다.

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

> 기본값으로 errorClass를 주고 앞서 성공일때만 active를 주어 처리합니다.

#### 04. 컴포넌트와 함께 사용하는 방법













---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
