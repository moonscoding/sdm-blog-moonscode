# JS ES6 - 필수입니다.
## es6 - promise를 이용해서 callback 지옥 탈출하기

<div class="pull-right"> 문스코딩 - 2018.01.d24 </div>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JS ES6 - 필수입니다.](#js-es6-필수입니다)
	* [es6 - promise를 이용해서 callback 지옥 탈출하기](#es6-promise를-이용해서-callback-지옥-탈출하기)
		* [01. 비동기적 프로그래밍](#01-비동기적-프로그래밍)
		* [02. callback](#02-callback)
		* [03. 프라미스](#03-프라미스)
			* [프라미스 만들고 사용하기](#프라미스-만들고-사용하기)
			* [reject하기 :: 13을 만나면 에러 발생하기](#reject하기-13을-만나면-에러-발생하기)
			* [이벤트](#이벤트)
			* [프라미스 파기 문제](#프라미스-파기-문제)
			* [프라미스 체인](#프라미스-체인)
			* [결정되지 않은 프라미스 방지하기](#결정되지-않은-프라미스-방지하기)

<!-- /code_chunk_output -->


---

**용어정리**
```
    비동기 프로그래밍 ::
    callback ::
    promise ::
```

### 01. 비동기적 프로그래밍

js는 단일 스레드, 비동기적 프로그래밍 언어입니다.

비동기적 테크닉을 사용해야 하는 경우
- 사용자 입력
- ajax 호출을 비롯한 네트워크 요청
- 파일을 읽고 쓰는 등의 파일 시스템 작업
- 의도적으로 시간 지연을 사용하는 기능 (알람...)

### 02. callback

**01. setTimeout**

**02. setInterval / clearInterval**

**03. 오류 우선 콜백**
노드가 인기를 얻어가던 시기에 오류 우선 콜백의 개념이 생겼습니다.
콜백을 사용하면 예외처리가 어려워지므로 콜백과 관련된 에러를 처리할 방법의 표준으로
첫 번째 매게변수에 에러 객체를 쓰자는 것입니다.
에러가 null 이나 undefined 이면 에러가 없는 것입니다.

```js
const fs = require('fs');
const fname = "may_or_may_not_exitst.txt";
fs.readFile(fname, function(err, data) {
    if(err) return console.error('error')
    console.log(data)
});
```

**04. 콜백 지옥 문제**

### 03. 프라미스

프라미스는 콜백의 단점을 해결하려는 시도 속에서 만들어졌습니다.
프라미스는 간혹 번거롭게 느껴질 수 있지만, 일반적으로 안전하고 관리하기 쉬운 코드를 만들 수 있게 해줍니다.
프라미스도 콜백을 이용합니다. 단 콜백이 예측 가능한 패턴으로 사용할 수 있게 해주며
프라미스 없이 콜백만 사용했을 때 나타날 수 있는 엉뚱한 현상이나 찾기 힘든 버그를 상당수 해결합니다.

> 프라미스 기반 비동기적 함수를 호출하면 그 함수는 Promise 인스턴스를 반환합니다.
> 프라미스는 성공 (fulfilled)하거나 실패(rejected)하거나 단 두가지뿐입니다.
> 프라미스가 성공하거나 실패하면 그 프라미스는 결정됐다(settled)고 합니다.

#### 프라미스 만들고 사용하기

```js
// # 만들기
function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for(let i=seconds; i>=0; i--) {
            setTimeout(function() {
                if(i>0)
                    console.log(i + '...');
                else
                    resolve(console.log("GO!"));
            }, (seconds - i) * 1000);
        }
    })
}

// # 호출 방법1
countdown(5).then(
    function() {
        console.log('successfully')
    },
    function(err) {
        console.log('err :' + err)
    }
);

// # 호출 방법2
const p = countdown(5);
p.then(function() {
    console.log('successfully')
});
p.catch(function(err) {
    console.log('err :' + err)
})
```

#### reject하기 :: 13을 만나면 에러 발생하기

```js
function countdown(seconds) {
    return new Promise(function(resolve, reject) {
        for(let i=seconds; i>=0; i--) {
            setTimeout(function() {
                // 에러 처리
                if(i===13) return reject(new Error("OMG"));

                // 반복 or 해결
                if(i>0)
                    console.log(i + '...');
                else
                    resolve(console.log("GO!"));
            }, (seconds - i) * 1000);
        }
    })
}
```

> 13을 선택했을때 reject가 발생했는데도 계속 남은 숫자가 진행되는 것을 알 수 있습니다.
> resolve나 reject는 함수를 멈추지 않고 그저 프라미스의 상태를 관리할 뿐입니다.

#### 이벤트

이벤트는 발생을 담당하는 개체(emitter)에서 이벤트가 일어났음을 알립니다.
필요한 이벤트는 모두 주시(listen)할 수 있습니다.

```js
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor (seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }

    go() {
        const countdown = this;
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                setTimeout(function() {
                    // 임의 에러
                    if(countdown.superstitious && i === 13)
                        return reject(new Error('OMG'));

                    // tick 이벤트를 발생 시키고, 필요하다면 프로그램의 다른 부분에서 이 이벤트를 주시할 수 있습니다.
                    countdown.emit('tick', i);

                    if(i===0)
                        resolve();
                }, ((countdown.seconds-1) * 1000));
            }
        })
    }
}

const c = new Countdown(5);

c.on('tick', function(i) {
    if(i>0) console.log(i + "...");
});

c.go()
    .then(function() {
        console.log('successfully')
    })
    .catch(function(err)) {
        console.log('err :' err)
    })
```

#### 프라미스 파기 문제

```js
const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
    constructor (seconds, superstitious) {
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious;
    }

    go() {
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function(resolve, reject) {
            for(let i=countdown.seconds; i>=0; i--) {
                timeoutIds.push(setTimeout(function() {
                    if(countdown.superstitious && i === 13) {
                        // 대기중인 타임아웃을 모두 취소합니다.
                        timeoutIds.forEach(clearTimeout);
                        return reject(new Error('OMG'));
                    }
                    countdown.emit('tick', i);
                    if(i===0) resolve();
                }, ((countdown.seconds-1) * 1000)));

            }
        })
    }
}
```

#### 프라미스 체인

프라미스에는 체인으로 연결할 수 있다는 장점이 있습니다.
즉, 프라미스가 완료되면 다른 프라미스를 반환하는 함수를 즉시 호출 할수 있습니다.

```js
function launch() {
    return new Promise(function(resolve, reject) {
        console.log('Lift off!');
        setTimeout(function() {
            resolve('In orbit !')
        } 2 * 1000);
    })
}

const c = new Countdown(5)
    .on('tick', i => console.log(i+"..."));

c.go()
    .then(launch)
    .then(function(msg) {
        console.log(msg)
    })
    .catch(function(err)) {
        console.log('err :' err)
    })
```

> 모든 단계에서 catch를 둘 필요는 없음 체인 어디에서든 에러가 생기면 체인 전체가 멈추고 catch 핸들러가 동작하게 됩니다.

#### 결정되지 않은 프라미스 방지하기

프라미스는 비동기적 코드를 단순화 하고 콜백이 두 번 이상 실행되는 문제를 방지합니다.
하지만 resolve나 reject를 호출하는 걸 잊어서 프라미스가 결정되지 않는 문제까지 자동으로 해결하진 못합니다.
에러가 일어나지 않으므로 이런 실수는 찾기가 매우 어렵습니다.
복잡한 시스템에서 결정되지 않은 프라미스는 그냥 잊혀질수도 있죠.

결정되지 않는 프라미스를 방지하는 한 가지 방법은 프라미스에 타임아웃을 거는 겁니다.

```js
// # 문제 샘플
function launch() {
    return new Promise(function(resolve, reject) {
        if(Math.random() < 0.5) return; //  반절 확률로 문제 발생
        console.log("Lift off!")
        setTimeout(function() {
            resolve("In orbit!")
        }, 2*1000)
    })
}

// # 정답 샘플
function addTimeout(fn, timeout) {
    if(timeout === undefined) timeout = 1000; // timeout default
    return function(...args) {
        return new Promise(function(resolve, reject) {
                const tid = setTimeout(reject, timeout, new Error("promise timed out"));
                fn(...args)
                    .then(function(...args){
                        clearTimeout(tid);
                        resolve(...args);
                    })
                    .catch(function(...args) {
                        clearTimeout(tid);
                        reject(...args);
                    })
        })
    }
}
```

> 프라미스를 반환하는 어떤 함수에든 타임아웃을 걸 수 있습니다.

예상시간 10초 -> 타임아웃 11초

```js
c.go()
    .then(addTimeout(launch, 11 * 1000))
    .then(function(msg) {
        console.log(msg)
    })
    .catch(function(err) {
        console.log('err : ' + err)
    })
```

**return new Promise(function(resolve, reject) {}) VS return Promise.resolve()**

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
