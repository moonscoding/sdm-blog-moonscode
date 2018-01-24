# MONGO AGGREGATE

#### mongo aggregation 정리.

<div class="pull-right"> 문스코딩 - 2017.12.20 </div>

---

##### [1] 조건걸기 (match)

```js

```


##### [1] 그룹 (group)

**전체 그룹**

```js
db.users.aggregate([
    {
		$group : {
		  	_id : null,
            count: { $sum: 1 } // 전체 합산
		}
	}
])
```

**부분 그룹**

```js
db.users.aggregate(
   [
      {
        $group : {
           _id : {
               month: { $month: "$date" },
               day: { $dayOfMonth: "$date" },
               year: { $year: "$date" }
           },
           count: { $sum: 1 } // 전체 합산
        }
      }
   ]
)
```

##### [2] 프로젝트 (project)

```js

```

##### [3] 제한 (limit)

```js
    db.users.aggregate([
        { $limit : 5 }
    ]);
```

##### [4] 정렬 (sort)

```js
    db.users.aggregate([
        { $sort : { age : -1, posts: 1 } }
    ])
```

##### [5] unwind

```js
    db.users.aggregate( [ { $unwind: "$sizes" } ] )             // $sizes 배열을 각각 객체로 나눔
    db.users.aggregate( [ { $unwind: { path: "$sizes" } } ] )   // $sizes 배열을 각각 객체로 나눔
```


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
