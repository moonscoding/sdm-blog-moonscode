const A = (function () {
    const _a = new WeakMap();
    const _b = new WeakMap();
    // _a.set(this, "hello A");
    // _b.set(this, "hello B");

    class A {
        constructor() {
            _a.set(this, "world A");
            _b.set(this, "world B");
        }

        getA() {
            return _a.get(this);
        }

        static getB() {
            return _b.get(this);
        }
    }

    return A;
}());

let a = new A();
console.log(a.getA());
console.log(A.getB());
