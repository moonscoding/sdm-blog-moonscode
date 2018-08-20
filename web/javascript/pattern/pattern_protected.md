
<div class="pull-right">  업데이트 :: 2018.08.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [protected 구현 (생성자의 스트림 이용하기)](#protected-구현-생성자의-스트림-이용하기)

<!-- /code_chunk_output -->

### protected 구현 (생성자의 스트림 이용하기)

생성자의 스트립에 protected를 넣어 주면 ?

최초로 생성자에 접근하면 \_pretected에 객체를 만들어 상위 클래스로 전달합니다.

혹은 최상위 생성자가 \_pretected 객체를 만들어 하위 클래스로 전달합니다.

상위 클래스는 하위에 전달하고 싶은게 있다면

생성자의 첫번째 매게변수로 전달받은 \_protected 의 객체를 이용해 하위에 전달할 수 있습니다.

그렇다면, 이 이론을 어떻게 나이스하게 구현할 수 있을까요.

일단 생각한데로 만들어본 초안입니다.

```js

// 각각의 생성자는 해당 메소드를 이용합니다.
static setProtected(_p, arg) {
    let c = [];
    for(let i=0; i<arg.length; i++) { c.push(arg[i]) }
    if(c[0]) { if(!c[0]._protected) c.unshift({ _protected : true }); }
    else c.unshift({ _protected : true });
    _p.set(this, c[0]);
    return c;
}

(function Parent() {
    const _protected = new WeakMap();
    const _create = Symbol();

    return class {

        // # 1. 기존 생성자는 setProtected 메소드를 이용해 _protected 객체를 초기화하고,
        // # 2. super 매소드를 호출하고
        // # 3. 대체 생성자를 부르는 역할을 할 뿐입니다.
        constructor() {
            let c = setProtected(_protected, arguments)
            this[_create](...c.splice(1));
        }

        // # 해당 클래스는 이렇게 대체 생성자를 갖습니다.
        [_create](a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);

            _protected.get(this).tramsmit = () { console.log("hello world") }
        }

    }
}());

(function Child() {
    const _protected = new WeakMap();
    const create = Symbol();

    return class extends Parent {

        constructor() {
            let c = setProtected(_protected, arguments);    // # 1.
            super(...c);                                    // # 2.
            this[_create](...c.splice(1));                  // # 3.
        }

        [create](a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);

            _protected.get(this).tramsmit();
        }
    }
}())

new Parent(1, 2, 3)
new Child(1, 2, 3)
```

> 공유는 가능하나 메소드 변수를 추가하는데 배우 비생산적입니다.
> 해당 변수가 protected인지 아닌지 비교해가며 생성자 스트립에 태워야 합니다.
> 이 방식은 모든 원칙을 지키지 못합니다.

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
