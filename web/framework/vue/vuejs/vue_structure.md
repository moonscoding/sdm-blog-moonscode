# Vue
## Vue 구조
<div class="pull-right">  업데이트 :: 2018.04.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Vue](#vue)
	* [Vue 구조](#vue-구조)
		* [01. Vue 구조](#01-vue-구조)
			* [반응형에 대해 깊이 알아보기](#반응형에-대해-깊이-알아보기)
		* [02. Vue Getter / Setter](#02-vue-getter-setter)
		* [03. Vue Watcher](#03-vue-watcher)
		* [04. Vue Property](#04-vue-property)
		* [05. Vue Acync적 동작](#05-vue-acync적-동작)

<!-- /code_chunk_output -->



### 01. Vue 구조

#### 반응형에 대해 깊이 알아보기

![](https://imgur.com/Y66kggg.png)

Vue의 특징중 눈에 잘 띄지 않는 반응형 시스템이 있습니다.

모델은 단순한 JavaScript 객체입니다. 수정하면 화면이 갱신됩니다.

스테이트 관리를 간단하고 직관적으로 만들어주지만 공통점을 제거하기 위해 어떻게 작동하는지 이해하는 것도 중요합니다

### 02. Vue Getter / Setter

getter / setter 는 사용자에게는 보이지 않으나 속성에 액세스 하거나 수정할 때,

Vue가 종속성 추적 및 변경 알림을 수행할 수 있습니다.

한가지 주의 사항은 변환된 데이터 객체가 기록될 때 브라우저가 getter / setter 형식을 다르게 처리하므로

친숙한 인터페이스를 사용하기 위해 vue-devtools를 설치하는 것이 좋습니다.

### 03. Vue Watcher

> Watcher :: Property Setter에 대해서 감시하는 속성 (Watcher를 개발하려면 Setter와 연관지어 개발)

모든 컴포넌트 인스턴스에는 해당 watcher 인스턴스가 있으며,

이 인스턴스는 컴포넌트가 종속적으로 렌더링되는 동안 “수정”된 모든 속성을 기록합니다.

나중에 종속적인 setter가 트리거 되면 watcher에 알리고 컴포넌트가 다시 렌더링 됩니다.
<br><br>

> 주의점, Vue는 인스턴스가 만들어 질때 이외에 속성을 추가하는 것을 허용하지 않습니다.

최신 JavaScript의 한계 (그리고 Object.observe의 포기)로 인해 Vue는 속성의 추가 제거를 감지할 수 없습니다.

Vue는 인스턴스 초기화 중에 getter / setter 변환 프로세스를 수행하기 때문에 data 객체에 속성이 있어야 Vue가 이를 변환하고 응답할 수 있습니다.

```js
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 은 이제 반응적입니다.

vm.b = 2
// `vm.b` 은 이제 반응적이지 않습니다.

Vue.set(vm.someObject, 'b', 2);
// `vm.b` 는 반응적입니다.
```

> 그러나, Vue.set(object, key, value) 메소드를 사용하여 중첩 된 객체에 반응성 속성을 추가 할 수 있습니다.

```js
this.$set(this.someObject, 'b', 2);
// Vm.$set 인스턴스 메소드를 사용할 수도 있습니다. 이 메소드는 전역 Vue.set 에 대한 별칭입니다.
```

### 04. Vue Property

```js
var vm = new Vue({
  data: {
    // 빈 값으로 메시지를 선언 합니다.
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 나중에 `message`를 설정합니다.
vm.message = 'Hello!'
```

data 옵션에message를 선언하지 않으면 Vue는 렌더 함수가 존재하지 않는 속성에 접근하려고 한다는 경고를합니다.

### 05. Vue Acync적 동작

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: Vue Docs ](https://kr.vuejs.org/v2/guide/reactivity.html)

[링크2 :: ]()
