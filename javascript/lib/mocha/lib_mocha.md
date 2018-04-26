# JavaScript Library
## Test Module FrameWork, Mocha
<div class="pull-right">  업데이트 :: 2018.04.18s </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JavaScript Library](#javascript-library)
	* [Test Module FrameWork, Mocha](#test-module-framework-mocha)
		* [01. Mocha](#01-mocha)
		* [02. Mocha - BDD vs TDD](#02-mocha-bdd-vs-tdd)
		* [03. Mocha 시작하기](#03-mocha-시작하기)
		* [04. 모카 인터페이스](#04-모카-인터페이스)
		* [04. 여러 모듈 동시 감지](#04-여러-모듈-동시-감지)
		* [assertion library](#assertion-library)

<!-- /code_chunk_output -->



### 01. Mocha

모카는 Node.js와 브라우저에서 실행되는 기능이 풍부한 자바 스크립트 테스트 프레임 워크로, 비동기 테스트를 간단하고 재미있게 만듭니다.

 모카 테스트는 순차적으로 실행되므로 유연하고 정확한보고가 가능하고 알 수없는 예외를 올바른 테스트 케이스에 매핑 할 수 있습니다.

### 02. Mocha - BDD vs TDD

BDD(Behaviour-Driven Development)와 TDD(Test-Driven Development)는 애자일 소프트웨어 개발 방법론에서 가장 널리 쓰이는 것들이다.

사실 xDD(X-Driven Development)라고 해서 수많은 X가 있긴 하지만

이들 중 거의 대부분은 TDD를 기반으로 한다. 그렇다면 BDD와 TDD는 어떤 차이가 있을까?

 BDD와 TDD는 거의 차이가 없다.

 차이가 있다면 TDD는 테스트 자체에 집중하여 개발하는 반면, BDD는 비즈니스 요구사항에 집중하여 테스트 케이스를 개발한다는 것이다

### 03. Mocha 시작하기

```linux
$ npm install mocha
$ mkdir test
$ $EDITOR test/test.js # or open with your favorite editor
```

```linux
$ ./node_modules/mocha/bin/mocha
```

```js
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
```

**default**

모카는 기본적으로 해당 디렉토리의

test 디렉토리를 찾게 되고 해당 디렉토리가 없다면 test.js를 찾게 됩니다.

특정 파일을 테스트 하고 싶다면 임의로 지정해주면 됩니다.

> mocha custom/

> mocha custom_test.js

### 04. 비동기 

### 04. 모카 인터페이스

> BDD

```js
describe('BDD style', function() {
  before(function() {
    // excuted before test suite
  });

  after(function() {
    // excuted after test suite
  });

  beforeEach(function() {
    // excuted before every test
  });

  afterEach(function() {
    // excuted after every test
  });

  describe('#example', function() {
    it('this is a test.', function() {
      // write test logic
    });
  });
});
```

describe()와 it()으로 테스트슈트와 유닛테스트를 작성하고

각 슈트와 테스트 전에 실행할 작업을 before(), after(), beforeEach(), afterEach()로 작성합니다.

> TDD

```js
suite('TDD Style', function() {
  suiteSetup(function() {
    // excuted before test suite
  });

  suiteTeardown(function() {
    // excuted after test suite
  });

  setup(function() {
    // excuted before every test
  });

  teardown(function() {
    // excuted before every test
  });

  suite('#example', function() {
    test('this is a test', function() {
      // write test logic
    });
  });
});
```


TDD 스타일에서는 suite()와 test()로 작성하며

각 슈트와 테스트전/후에 실행할 작업은 suiteSetup(), suiteTeardown(), setup(), teardown()을 사용합니다.

suiteSetup(), suiteTeardown()는 문서화도 안되어 있네요

BDD 스타일이 기본이므로 다른 인터페이스를 사용하려면 뒤에서 설명하는 테스트 실행시 옵션으로 인터페이스를 지정해 주어야 합니다.

### 04. 여러 모듈 동시 감지

```js
it('double done', function(done) {
  // Calling `done()` twice is an error
  setImmediate(done);
  setImmediate(done);
});
```

### assertion library

```

```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ](https://blog.outsider.ne.kr/770)

[링크2 :: 감성프로그래밍](http://programmingsummaries.tistory.com/383)

[링크2 :: ](https://blog.aliencube.org/ko/2014/04/02/differences-between-bdd-and-tdd/)
