

# LODASH - 틈틈히 정리하기

## lodash의 배열 함수에 대해서 알아봅시다.

<div class="pull-right"> 문스코딩 - 2018.02.07 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [LODASH - 틈틈히 정리하기](#lodash-틈틈히-정리하기)
	* [lodash의 배열 함수에 대해서 알아봅시다.](#lodash의-배열-함수에-대해서-알아봅시다)
		* [01. 단순 조작 배열 함수](#01-단순-조작-배열-함수)
		* [02. 배열 합치고 나누기.](#02-배열-합치고-나누기)
		* [03. 배열 정리하기](#03-배열-정리하기)
		* [04. 공통 요소, 차이 요소에 따른 배열 관리](#04-공통-요소-차이-요소에-따른-배열-관리)
		* [05. 인덱스 관리하기](#05-인덱스-관리하기)
		* [06. 특이 배열 함수](#06-특이-배열-함수)

<!-- /code_chunk_output -->

**용어정리**
```
    1. 단순 조작 배열 함수
    2. 배열 합치고 나누기
    3. 배열 정리하기
    4. 공통 요소, 차이 요소에 따른 배열 관리
    5. 인덱스 관리하기
    6. 특이 배열 함수
```


### 01. 단순 조작 배열 함수

**\_.head(array) => 최상위 배열 요소를 리턴합니다.**

```js
_.head([1, 2, 3]);
// => 1

_.head([]);
// => undefined
```

**\_.drop(array, [n=1]) => arr를 앞에서 부터 뒤의 숫자만큼 제거 합니다.**
**\_.dropRight(array, [n=1]) => arr를 뒤에서 부터 뒤의 숫자만큼 제거 합니다.**

```js
_.drop([1, 2, 3]);
// => [2, 3]

_.drop([1, 2, 3], 2);
// => [3]

_.drop([1, 2, 3], 5);
// => []

_.drop([1, 2, 3], 0);
// => [1, 2, 3]

_.dropRight([1, 2, 3]);
// => [1, 2]

_.dropRight([1, 2, 3], 2);
// => [1]

_.dropRight([1, 2, 3], 5);
// => []

_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```

**\_.initial(array) => 제일 마지막 배열요소를 제거합니다. => _.dropRight와 동일합니다.**

```js
_.initial([1, 2, 3]);
// => [1, 2]

_.dropRight([1, 2, 3]);
// => [1, 2]

_.dropRight([1, 2, 3], 1);
// => [1, 2]
```

<!-- **\_.dropRightWhile(array, [predicate=_.identity]) =>**

```js
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['barney']

// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']

// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ['active', false]);
// => objects for ['barney']

// The `_.property` iteratee shorthand.
_.dropRightWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
``` -->

<!-- **\_.dropWhile(array, [predicate=_.identity]) =>**

```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']

// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']

// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']

// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
``` -->


### 02. 배열 합치고 나누기.

**\_.concat(array, [values]) => 배열과 배열 합치기 (단일 객체는 1개까지 배열로 봅니다.)**

```js
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);
// => [1, 2, 3, [4]]

console.log(array);
// => [1]
```

**\_.chunk(arr, n) => 숫자만큼 자릅니다 (마지막이 남습니다.)**

```js
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```

### 03. 배열 정리하기

**\_.compact(array) => 0, false, "" 등등 빈 값을 제거합니다**

```js
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```

**\_.fill(array, value, [start=0], [end=array.length]) => array를 value로 채웁니다. 뒤에 n에서 m까지 범위를 줄 수 있습니다.**

```js
var array = [1, 2, 3];

_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']

_.fill(Array(3), 2);
// => [2, 2, 2]

_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```

### 04. 공통 요소, 차이 요소에 따른 배열 관리

**\_.intersection([arrays]) => array중에서 뒤에 있는 요소를 모두 배열로 가져옵니다. 가져옵니다.**

```js
_.intersection([2, 1], [2, 3]);
// => [2]
```

**\_.intersectionBy([arrays], [iteratee=_.identity]) => array 요소중에서 조건을 포함해서 뒤에 요소중 일치하는 것을 모두 가져옵니다.**

```js
_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [2.1]

// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
```

**_.intersectionWith([arrays], [comparator]) =>**

```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];

_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]
```

**\_.difference(array, [values]) => array에서 뒤에 매개변수 array에 없는 값을 반환합니다.**

```js
_.difference([2, 1], [2, 3]);
// => [1]
```

**\_.differenceBy(array, [values], [iteratee=_.identity]) => 위와 같이 배열속 다른 내용을 찾는데 조건을 더해서 찾습니다.**

```js
_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2]

// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```

**\_.differenceWith(array, [values], [comparator]) =>**

```js
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];

_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]
```

### 05. 인덱스 관리하기

**\_.indexOf(array, value, [fromIndex=0]) => value의 index를 찾습니다. from을 주면 from부터 찾습니다.**

```js
_.indexOf([1, 2, 1, 2], 2);
// => 1

// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```

**\_.findIndex(array, [predicate=_.identity], [fromIndex=0]) => 앞에서 부터 조건에 맞는 인덱스를 찾습니다.**
**\_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1]) => 뒤에서 부터 조건에 맞는 인텍스를 찾습니다.**

```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0

// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1

// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0

// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2

_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2

// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0

// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2

// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0
```

### 06. 특이 배열 함수

**\_.fromPairs(pairs) => 배열(2차배열)을 JSON 객체 처리 합니다.**

```js
_.fromPairs([['a', 1], ['b', 2]]);
// => { 'a': 1, 'b': 2 }
```

**\_.flatten(array) => 배열을 싱글 레벨로 한단계 떨어뜨립니다.**
**\_.flattenDeep(array) => 배열을 싱글 레벨까지 전부 떨어뜨립니다.**
**\_.flattenDepth(array, [depth=1]) => 배열을 싱글 레벨까지 요청한 만큼 떨어뜨립니다.**

```js
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]

_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]

var array = [1, [2, [3, [4]], 5]];

_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]

_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
