
// # 싱글톤 테스트

const Singleton = (function() {

    let instance = null;

    class Singleton {
        constructor() {

            if(!instance) {
                instance = this;
            }

            instance.hello = "world";

            return instance;
        }
    }

    return Singleton
}())

let singleton = new Singleton();
let singleton2 = new Singleton();

singleton.hello = "change"
console.log(singleton.hello, singleton2.hello)
