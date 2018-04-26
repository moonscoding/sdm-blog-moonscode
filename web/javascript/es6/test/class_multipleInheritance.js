class A {

    constructor(a) {
        console.log("a : " + a)
    }
}

class B extends A {

    constructor(a){
        super(a);
        console.log("b : " + a)
    }
}

new B("input");

class C extends B(A) {

    constructor(a) {
        super(a);
        console.log("c : " + a)
    }
}

new C("input");
