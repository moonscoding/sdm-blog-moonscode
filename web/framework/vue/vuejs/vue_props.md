# Vue
## Props
<div class="pull-right">  업데이트 :: 2018.05.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Vue](#vue)
	* [Props](#props)
		* [01. Props](#01-props)
		* [02. 사용예제](#02-사용예제)
		* [03. 동적 props](#03-동적-props)
		* [04. props로 객체의 모든 속성 전달하기](#04-props로-객체의-모든-속성-전달하기)

<!-- /code_chunk_output -->

### 01. Props

Props로 데이터 전달하기

모든 컴포넌트 인스턴스에는 자체 격리 된 범위 가 있습니다.

즉, 하위 컴포넌트의 템플릿에서 상위 데이터를 직접 참조 할 수 없으며 그렇게 해서는 안됩니다.

데이터는 props 옵션 을 사용하여 하위 컴포넌트로 전달 될 수 있습니다.

### 02. 사용예제

props에서 message를 받을 준비를 합니다.

```js
Vue.component('child', {
  // props 정의
  props: ['message'],
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
  // vm의 this.message로 사용할 수 있습니다.
  template: '<span>{{ message }}</span>'
})
```

다음과 같이 message를 전달합니다.

```html
<child message="안녕하세요!"></child>
```


### 03. 동적 props

> v-bind를 통해서 동적으로 props를 전달할 수 있습니다.

```html
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
```


### 04. props로 객체의 모든 속성 전달하기

객체의 모든 속성을 props로 전달하려면, 인자없이 v-bind를 쓸 수 있습니다. (v-bind:prop-name 대신 v-bind). 예를 들어 todo 객체가 있다면,

```js
todo: {
  text: 'Learn Vue',
  isComplete: false
}
```

```html
<todo-item v-bind="todo"></todo-item>
```

```html
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
```


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: https://kr.vuejs.org/v2/guide/components.html](https://kr.vuejs.org/v2/guide/components.html)

[링크2 :: ]()
