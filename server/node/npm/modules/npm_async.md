# npm
## async
<div class="pull-right">  업데이트 :: 2018.05.03 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [npm](#npm)
	* [async](#async)
		* [01. async : waterfall](#01-async-waterfall)
		* [02. async : series](#02-async-series)
		* [03. async : parallel](#03-async-parallel)

<!-- /code_chunk_output -->

### 01. async : waterfall

```js
var async = require('async');

async.waterfall([
    function(callback){
       asyncfunctionA(param,callback);
    },
    function(resultA,callback){
       asyncfunctionB(resultA,callback);
    },
    function(resultB,callback){
       asyncfunctionC(resultB,callback);
    }
  ],
  function(err,resultC){
           if(err) errorHandler(err);
                 // handle resultC
  }
);
```

- param1 :: [ func, func, ... ]
- param2 :: func

```js
var async = require('async');
var fs = require('fs');
var src = '/tmp/myfile.txt';
var des = '/tmp2/myfile_async.txt';

async.waterfall([
  function(callback){
     fs.readFile(src,callback);
    },
    function(data,callback){
     fs.writeFile(des,data,callback);
    }
  ],
  function(err){
       if(err) console.log(err);
  }
);
```

waterfall에서는 흐름제어를 이용하는데 유용합니다.

### 02. async : series

```js
var async = require('async');

async.series([
  function(callback){
     callback(null,'resultA');
  },
  function(callback){
     callback(null,'resultB');
  },
  function(callback){
     callback(null,'resultC');
  }
 ],
 function(err,results){
     if(err) console.log(err);
     console.log(results) // ['resultA', 'resultB', 'resultC']

  }
);
```

```js
var async = require('async');

var tasks = [
    function (callback) {
        setTimeout(function () {
            console.log('one');
            callback(null, 'one-1', 'one-2');
        }, 200);
    },
    function (callback) {
        setTimeout(function () {
            console.log('two');
            callback(null, 'two');
        }, 100);
    }
];

async.series(tasks, function (err, results) {
    console.log(results);
    // [ ['one-1', 'one-2'], 'two' ]
});
```

> 다음은 총 0.3초의 시간이 걸립니다.


### 03. async : parallel

```js

```


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: http://bcho.tistory.com/1083 ](http://bcho.tistory.com/1083)

[링크2 :: https://proinlab.com/archives/1811](https://proinlab.com/archives/1811)
