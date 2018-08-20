
<div class="pull-right">  업데이트 :: 2018.01.15 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [var & let](#var-let)
* [const](#const)
* [null & undefined](#null-undefined)

<!-- /code_chunk_output -->


### var & let

ES6 이전에는 아래와 같이 function 단위의 scope만 존재했습니다.
따라서, function 안에 있는 지역변수를 먼저 찾고 이후에 scope chain을 따라 전역변수를 찾는 방식이었습니다.

**ES5 - var**
```js
var name = "global var";

function home() {
    var homevar = "homevar";
    for(var i=0; i<100;i++) {
    }
    console.log(i);
}

home();
```

**ES6 - let**
```js
var name = "global var";

function home() {
  var homevar = "homevar";
  for(let i=0; i<100;i++) {
    console.log(i);
  }
  console.log(i);

  if(true) {
    let myif = "myif";
  }

  console.log(myif);
}

home();
```
let을 사용하게 되면 scope의 범위가 더 지협적으로 변하게 됩니다.
for문 or if문 안에 let 변수를 사용하게 되면
function 단위인 var 와 다르게 for문 or if문 밖에서는 인식할 수 없습니다.
> 변수의 범위가 작아 더 메모리 소모가 적다는 장점

**closure scope 문제 해결 방법**

```js
var list = document.querySelectorAll("li");
for(let i=0; i<list.length; i++) {
    list[i].addEventListener("click", function(){
        console.log(i + "번째 리스트 입니다");
    });
}
```

### const

> const 타입은 변수에 대한 새로운 값 할당이 불가능

```js
function home() {
  const homename = 'my house';
  // homename = "your house";
  console.log(homename);

  const homearray = [1,2,3,4];
  // homearray = ["1", "2"];
  console.log(homearray);

  /*
   하지만 const와 let을 동시에 사용하는 것은 매우 좋지 못한 방법입니다.
   두가지 모두를 사용할 수 있는 경우라면, const를 사용하는 것을 권장합니다.
   만약 변경이 될 수 있는 변수라면, let을 사용합니다.

   var는 사용하지 않는 것이 일종 scope 전략입니다.
  */
}
home();
```

```js
function home() {
  const list = ["apple", "orange", "watermelon"];
  list.push("banana");
  console.log(list);
}

home();
```

> const를 사용하더라도 배열과 오브젝트의 값을 변경하는 것은 가능. (const 값을 재할당하는 코드 형태만 불가능합니다.)


**immutable array**

immutable array는 뒤로가기 앞으로 가기 등 어떤 값을 되돌리고 싶을 때,
그때그떄 저장한 데이터 값을 가져와서 사용하는 array 저장방식

```js
// immutable array를 어떻게 만들지?
// 뒤로가기, 앞으로가기 어떤 값을 되돌리고 싶을때, 그때그때
// 저장한 데이터 값을 가져와서 사용해야할 필요가 생깁니다.

const list = ["apple", "orange", "watermelon"];
list2 = [].concat(list, "banana");
console.log(list, list2);

console.log(list === list2);
```

> const는 재할당은 안되지만 배열, 오브젝트 값을 변경하는 것은 가능

### null & undefined

null은 프로그래머에게 허용된 데이터 타입 (할당된 값의 텅빈값)
undefined는 자바스크립트 자체에서 사용 (할당조차 되지 않은 빈값)

> 프로그래머가 undefined를 사용하는 경우는 아직 값이 주어지지 않은 변수의 동작을 고의로 흉내낼때 사용

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
