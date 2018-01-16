ㅁ# JAVASCRIPT ES6 SET

#### ES6 - SET은 무엇인가 ?

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

**용어정리**
```
    SET :: Set은 유일한 값을 가지는 집합 (Array를 개선한 구조)
    WeakSet :: 참조를 가지고 있는 객체만 저장 가능한 Set 타입, 객체는 더이상 참조하지 않으면 GC에 의해서 제거, 이러한 참조에 대한 모니터링 가능
    MAP :: KEY/VALUE로 이루어져 있음 (Object를 개선한 구조)
```

#### ES6 - SET

```js
let mySet = new Set();
console.log(toString.call(mySet));

// set: 중복없이 유일한 값을 저장하려고 할때. 이미 존재하는지 체크할 때 유용.

mySet.add("crong");
mySet.add("hary");
mySet.add("crong");

console.log(mySet.has("crong"));
mySet.delete("crong");

mySet.forEach(function(v){
  console.log(v);
});
```

**WeakSet**

```js
let arr = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
let obj = {arr, arr2};
let ws = new WeakSet();

ws.add(arr);
ws.add(arr2);
ws.add(obj);

arr = null;

console.log(ws);
console.log(ws.has(arr), ws.has(arr2));
```

#### ES6 - MAP

**객체의 단점**

- 프로토타입 체인 때문에 의도하지 않은 연결 발생
- 객체 안에 연결된 키와 값이 몇 개나 되는 지 쉽게 알아낼 수 없음
- 키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값과 연결 할 수 없음
- 객체는 프로퍼티 순서를 전혀 보장 않함

```js
const u1 = { name : 'name1' }
const u2 = { name : 'name2' }
const u3 = { name : 'name3' }
const u4 = { name : 'name4' }

const userRoles = new Map();
userRoles.set(u1, "User");
userRoles.set(u2, "User");
userRoles.set(u3, "Admin");

// userRoles
//     .set(u1, "User");
//     .set(u2, "User");
//     .set(u3, "Admin");

// const userRoles = new Map([
//     [u1, "User"],
//     [u2, "User"],
//     [u3, "Admin"]
// ])

userRoles.get(u2);  // "User"

userRoles.has(u1);  // true
userRoles.get(u1);  // "User"
userRoles.has(u4);  // false
userRoles.get(u4);  // undefined

userRoles.set(u1, "Admin");

userRoles.size;     // 3
```


```js
let wm = new WeakMap();
let myfun = function() {};

// 이 함수가 얼마나 실행됐는지를 알려고 할때.
wm.set(myfun, 0);

console.log(wm);

let count = 0;
for(let i=0; i<10; i++) {
  count = wm.get(myfun); //get value
  count++;
  wm.set(myfun, count);
}

console.log(wm.get(myfun));
myfun = null;
console.log(wm.has(myfun));
```

```js
// WeakMap 활용

function Area(height, width) {
  this.height = height;
  this.width = width;
}

Area.prototype.getArea = function() {
  return this.height * this.width;
}

let myarea = new Area(10, 20);
console.log(myarea.getArea());
console.log(myarea.height);


// WeakMap을 이용하면, 인스턴스관리를 효율적으로 할 수 있습니다.
// GC 대상이 되는 저장소를 따로 만들 수 있습니다.

const wm = new WeakMap();

function Area(height, width) {
  // 해당 객체에 대한 추가 변수를 만들어준다 (private하게..)
  wm.set(this, {height, width});
}

Area.prototype.getArea = function() {
  const {height, width} = wm.get(this);
  return height * width;
}

let myarea = new Area(10, 20);
console.log(myarea.getArea());

console.log(wm.has(myarea));

myarea = null;

console.log(wm.has(myarea));
```









---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
