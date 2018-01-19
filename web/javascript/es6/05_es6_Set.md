ㅁ# JAVASCRIPT ES6 SET

#### ES6 - SET은 무엇인가 ?

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

**용어정리**
```
    SET :: Set은 유일한 값을 가지는 집합 (Array를 개선한 구조)
    WeakSet :: 참조를 가지고 있는 객체만 저장 가능한 Set 타입, 객체는 더이상 참조하지 않으면 GC에 의해서 제거, 이러한 참조에 대한 모니터링 가능
    add() ::
    delete() ::
    size ::

```


#### 01. SET

셋은 중복을 허용하지 않는 데이터 집합입니다.

```js
let roles = new Set();

roles.add("User");  // Set ["User"]
roles.add("Admin"); // Set ["User", "Admin"]
roles.size;         // 2

roles.add("User");  // nothing
roles.size;         // 2

roles.delete("Admin"); // true => Set ["User"]
roles.delete("Admin"); // false
```

#### 02. WeakSET

위크셋은 객체만 포함할 수 있으며, 이 객체들은 가비지 콜렉션의 대상이 됩니다.
WeakMap과 마찬가지로 이터러블이 아닙니다. 위크셋의 용도는 아주 적습니다.


```js
let ws = new WeakSet();

let arr = [1, 2, 3, 4];
let arr2 = [5, 6, 7, 8];
let obj = { arr, arr2 };

ws.add(arr);    // obj 가능
ws.add(arr2);   // obj 가능
ws.add(obj);    // obj 가능

arr = null;     // GC 적용

console.log(ws);
console.log(ws.has(arr), ws.has(arr2)); // false, true
console.log(ws.has(obj))                // true (GC의 영향 안받음)
```


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
