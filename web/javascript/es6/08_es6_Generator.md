# JAVASCRIPT ES6 - GENERATOR

#### ES6 - Generator 생성기 파헤치기.

<div class="pull-right"> 문스코딩 - 20178.01.15 </div>

---

**용어정리**
```
    Generator (생성기) :: 제너레이터란 이터레이터를 사용해 자신의 실행을 제어하는 함수
```


#### 01. Generator (생성기)

- 일반적인 함수는 매개변수를 받고 값을 반환, 호출자는 매개변수 외에는 함수의 실행을 제어방법이 없음
- [Generator STEP01] 함수의 실행을 개별적 단계로 나눔
- [Generator STEP02] 실행중인 함수와 통신
- arrow function 사용 안됨
- function* 구문으로 제너레이터를 표현

> 제너레이터는 언제든 호출자에게 제어권을 넘김 (yield) 할 수 있음
> 제너레이터는 호출한 즉시 실행되지는 않음, 대신 이터레이터를 반환하고 이터레이터의 next() 메서드를 호출함에 따라 실행

함수가 **하나 이상의 yield 식** 을 포함 하고 **function\* 구문** 을 사용하면 생성기가 됨

**기본 제너레이터 확인하기**

```js
function* rainbow() { // *는 제너레이터 문법
    yield 'red';
    yield 'orange';
    yield 'yellow';
    yield 'green';
    yield 'blue';
    yield 'indigo';
    yield 'violet';
}

// 제너레이터 호출하기
const it = rainbow();
it.next(); // {value : 'red', done : false}
it.next(); // {value : 'orange', done : false}
it.next(); // {value : 'yellow', done : false}
it.next(); // {value : 'green', done : false}
it.next(); // {value : 'blue', done : false}
it.next(); // {value : 'indigo', done : false}
it.next(); // {value : 'violet', done : false}
it.next(); // {value : undefined, done : true}

// for-of 구문 사용하기
for(let color of raindow()) {
    console.log(color)
}
```

**무한반복 제너레이터**
```js
function* idMaker() {
    var index = 0;
    while(true)
        yield index++;
}

var gen = inMaker();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
```

**yield 표현식을과 양방향 통신**

```js
function* interrogate() {                                       // const it = interrogate();
    const name = yield "What is your name";                     // it.next()
    const color = yield "What is your favorite color"           // it.next('moon')
    return '${name}s favorite color is ${color}';               // it.next('red')
}

const it = interrogate();
it.next();              // { value : "what is your name", done : false}
it.next('Moon');        // { value : "what is your favorite color", done : false}
it.next('Red');         // { value : "moon's favorite color is red !", done : true}
```

**제너테이터와 return**

> yield문은 설령 제너레이터의 마지막 문이더라도 제너레이터를 끝내지 않음
제너레이터에서 return 문을 사용하면 그 위치와 관계없이 done은 true가 되고
value 프로퍼티는 return 값이 반환

```js
function* abc() {
    yield 'a';
    yield 'b';
    return 'c';
}
const it = abc();
it.next(); // {value : "a", done : false}
it.next(); // {value : "b", done : false}
it.next(); // {value : "c", done : true}        // 이터레이터 였다면 다음 next에서 done : true
```

**제너테이터와 return (for-of구문에서 사용하기)**
```js
for(let l of abc()) {
    console.log(l)      // 'c'는 출력되지 않음
}
```


#### 02. 고급 생성기

생성기는 요청에 따라 그 산출된 (yielded, yield 식으로 산출된) 값을 계산하고, 계산하기 비싼 수열 또는
위에 설명한 대로 무한 수열이라도 효율적으로 나타내게 함

next() 메서드는 또한 생성기의 내부에 상태를 수정하는데 쓸 수 있음
next() 에 전달되는 값은 생성기가 중단된 마지막 yield 식의 결과로 처리

**수열을 재시작하기위해 next(x)를 사용하는 생성기**

```js
function* fibonacci(){
  var fn1 = 0;
  var fn2 = 1;
  while (true){
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;      // 초기화 로직
    if (reset){
        fn1 = 0;
        fn2 = 1;
    }
  }
}

var sequence = fibonacci();
console.log(sequence.next().value);     // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
console.log(sequence.next().value);     // 3
console.log(sequence.next().value);     // 5
console.log(sequence.next().value);     // 8
console.log(sequence.next(true).value); // 0 [재시작]
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
```

**throw() 메서드** 를 호출하여 발생해야할 예외값을 전달하여 예외를 발생하도록 생성기를 강제 생성
이 예외는 생성기의 현재 중단되 문맥에서 발생, 마치 현재 중단된 yield가 throw value 문 대신인 것처럼

발생한 예외 처리 도중 yield를 만나지 않은 경우, 그 뒤 예외는 throw() 호출을 통해 위로 전하며
next()의 후속 호출 결과 done 속성은 ture 처리





---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
