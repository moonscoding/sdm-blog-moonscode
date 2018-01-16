# JAVASCRIPT ES6 - ITERATOR

#### ES6 - ITERATOR 파헤치기

<div class="pull-right"> 문스코딩 - 20178.01.16 </div>

---

**용어정리**
```
Iterator (반복기) :: "지금 어디 있는지" 파악할 수 있는 일종의 책갈피와 비슷한 개념
Iterable (반복가능) :: 이터레이터를 사용할 수 있는 지 여부
```

#### 01. Iterator

- 이터레이터는 각각 독립적 , 새로운 이터레이터를 생성할때마다 새로이 시작

**이터레이터 사용해보기**
```js
// # 기본
const book = [ 'hello', 'world', 'goodbye', 'world'];
const it = book.values();
it.next(); // { value : "hello", done : false }
it.next(); // { value : "world", done : false }
it.next(); // { value : "goodbye", done : false }
it.next(); // { value : "hello", done : false }
it.next(); // { value : undefined, done : true }
it.next(); // { value : undefined, done : true }
```

**for-of구문은 어떻게 index 없이 실행할 수 있을까 ? 바로 이터레이터 때문**
```js
// # while을 이용해 for-of 문 처럼 사용해보기
const it = book.values();
let current = it.next();
while(!current.done) {
    console.log(current.value);
    current = it.next();
}
```

**독립적인 이터레이터 여러개 사용해보기**
```js
const it1 = book.values();
const it2 = book.values();

// 따로따로 읽기
it1.next();
it1.next();
it2.next();
it1.next();
```

#### 02. Iterable (반복가능)

**내장 Iterable**

String, Array, TypedArray, Map, Set 은 모두 내장 반복가능 객체 (Symbol.interator 메서드를 가지고 있음)

**사용자 정의 Iterable (이터레이션 프로토콜을 이용, 이터러블 하게 만들기)**

```js
class Log {
    constructor() {
        this.message = [];
    }

    add(message)  {
        this.message.push({message, timestamp : Date.now() });
    }

    // 이터러블하게 만들기
    [Symbol.iterator]() {
        return this.message.values();
    }
}

const log = new Log();
log.add('hello');
log.add('world');
log.add('goodbye');
log.add('world');

for(let entry of log) {
        console.log('${entry.message} @ ${entry.timestamp}')
}
```

```js
var myInterable = {}
meIterable[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
};
[...myInterable] // [1,2,3]
```

**이터레이터 직접 만들기**
```js
class Log {
    // ...

    [Symbol.interator]() {
        let i = 0;
        const messages = this.messages;
        return {
            next() {
                if(i >= messages.length)
                    return {value : undefined, done : true};
                return {value : messages[i++], done : false};
            }
        }
    }
}
```

**Iterable 을 기대하는 구문**

```js
for(let value of ["a", "b", "c"]){
    console.log(value)
}
// "a"
// "b"
// "c"

[..."abc"] // ["a", "b", "c"]

function* gen(){
  yield* ["a", "b", "c"]
}

gen().next() // { value:"a", done:false }

[a, b, c] = new Set(["a", "b", "c"])
a // "a"
```

**이터레이터 실사용 예제**

```js
// # Iterator(반복기) 의 기본
function makeIterator(array) {
    var nextIndex = 0;

    return {
        next: function() {
            return nextIndex < array.length ?
                { value : array[nextIndex++] , done : false} :
                { done : true }
        }
    }
}

var it = makeIterator(['hey', 'ho']);
console.log(it.next().value); // 'hey'
console.log(it.next().value); // 'ho'
console.log(it.next().done);  // 'true'
```



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Iterators_and_Generators)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
