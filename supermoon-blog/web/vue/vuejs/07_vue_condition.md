# VUE - 조건

#### VUE의 조건 렌더링 처리방법.

Moon's Coding - 2017.11.08

<hr>

#### 01. v-if / v-else 기본

```html
  <!-- v-if -->
  <h1 v-if="ok">Yes</h1>

  <!-- v-else -->
  <h1 v-if="ok">Yes</h1>
  <h1 v-else>No</h1>

  <!-- v-else-if -->
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else-if="type === 'C'">C</div>
  <div v-else>D</div>

```

#### 02. \<template>에서 v-if 조건부 그룹 만들기

v-if는 하나의 엘리먼트만 조건부 렌더딩을 처리함.
동시에 여러개의 엘리먼트를 처리하기 위해서 \<template>태그를 사용함.

```html
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
```

#### 03. key를 이용 재사용 처리

```html

  <!-- key없어 엘리먼트 재사용 됨 -->
  <template v-if="loginType === 'username'">
    <label>사용자 이름</label>
    <input placeholder="사용자 이름을 입력하세요">
  </template>
  <template v-else>
    <label>이메일</label>
    <input placeholder="이메일 주소를 입력하세요">
  </template>

  <!-- key를 이용한 재사용 방지 처리 -->
  <template v-if="loginType === 'username'">
    <label>사용자 이름</label>
    <input placeholder="사용자 이름을 입력하세요" key="username-input">
  </template>
  <template v-else>
    <label>이메일</label>
    <input placeholder="이메일 주소를 입력하세요" key="email-input">
  </template>

```

#### 04. 간단하게 사용할 수 있는 v-show

v-else 와 이용할 수 없음 <br>
\<template>지원 안함

```html
  <!-- v-show  -->
  <h1 v-show="ok">안녕하세요!</h1>
```

#### 05.v-if와 v-show 비교

v-if는 진짜 조건부 렌더링. <br>
초기 렌더링에서 처리되지 않으면 처음으로 참이될때까지 렌더링하지 않음 <br>
**v-if : 토글 처리 시에 요구 리소스 높음.**

v-show는 css기반으로 초기 조건에 관계 없이 엘리먼트가 렌더 되있는 상태 <br>
**v-show : 초기 렌더 리소스 높음.**




<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 : https://kr.vuejs.org/v2/guide/conditional.html**
