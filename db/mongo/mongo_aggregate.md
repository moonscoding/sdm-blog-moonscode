# MONGO - NoSQL의 선두
## aggregation 어디까지 알고 있나요 ?

<div class="pull-right"> 문스코딩 - 2017.12.20 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MONGO - NoSQL의 선두](#mongo-nosql의-선두)
	* [aggregation 어디까지 알고 있나요 ?](#aggregation-어디까지-알고-있나요)
		* [match (조회조건)](#match-조회조건)
		* [group (그룹화)](#group-그룹화)
			* [전체 그룹](#전체-그룹)
			* [부분 그룹](#부분-그룹)
			* [\$group & \$push 그룹 데이터 배열 만들기](#group-push-그룹-데이터-배열-만들기)
			* [\$group & \$max / \$min 그룹 데이터 최대 최소값 구하기](#group-max-min-그룹-데이터-최대-최소값-구하기)
		* [unwind (배열 해제)](#unwind-배열-해제)
		* [project (프로젝트)](#project-프로젝트)
		* [limit (갯수 제한)](#limit-갯수-제한)
		* [sort (정렬)](#sort-정렬)
		* [out (DB collection에 출력)](#out-db-collection에-출력)

<!-- /code_chunk_output -->

### match (조회조건)

@ match 조건 걸 때 key 값에 "" 사용하지 마세요 ! (studio 3T에서 안되더라구요)

### group (그룹화)

#### 전체 그룹

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

#### 부분 그룹

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
           count: { $sum: 1 }, // 전체 합산
           sum  : { $sum: "$count" }
        }
      }
   ]
)
```

#### \$group & \$push 그룹 데이터 배열 만들기

```js
db.users.aggregate([
    {
		$group : {
		  	_id : null,
			arrElement : {
				$push:  "$element"
			}
		},
	}
])
```

#### \$group & \$max / \$min 그룹 데이터 최대 최소값 구하기

```js
db.users.aggregate([
    {
		$group : {
		  	_id : null,
			thisIsMax : {
				$max : "$value"
			}
		},
	}
])
```

> Date type도 Max처리가 되나요 ?

### unwind (배열 해제)

group화를 통해 배열을 만들었다면, unwind를 통해 배열을 해제할 수 있습니다.

```js
    db.users.aggregate( [ { $unwind: "$sizes" } ] )             // $sizes 배열을 각각 객체로 나눕니다.
    db.users.aggregate( [ { $unwind: { path: "$sizes" } } ] )   // $sizes 배열을 각각 객체로 나눕니다.
```

### project (프로젝트)

aggregate를 통해 자유자재로 설정한 DB값을 project를 통해 원하는 대로 출력할 수 있습니다.

```js
    db.collection.aggregate([
        {
            $project : {
                _id : 0,                // [case01] 사용하지 않을 데이터는 비활성화 합니다.
                existData : 1,          // [case02] 사용할 데이터는 아래로 흘러가도록 활성화 합니다.
                updateData : { ... }    // [case03] 수정하고 싶은 데이터는 다음과 같이 로직을 추가해야 합니다.
            }
        }
    ])
```

### limit (갯수 제한)

```js
    db.users.aggregate([
        { $limit : 5 }
    ]);
```

### sort (정렬)

```js
    db.users.aggregate([
        { $sort : { age : -1, posts: 1 } }
    ])
```

### out (DB collection에 출력)

조회한 쿼리를 원하는 collection에 삽입합니다.

@ DB collection을 교체할 수 있기 때문에 조심해서 사용해야 합니다.

```js
db.collection.aggregate(
    [
        { "$unwind": "$symptoms" },
        { "$out": "collection" }
    ]
)
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
