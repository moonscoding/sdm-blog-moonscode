# MONGO - NoSQL의 선두

## MongoDB 데이터 연산자 정리

<div class="pull-right"> 문스코딩 - 2017.12.26 </div>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MONGO - NoSQL의 선두](#mongo-nosql의-선두)
	* [MongoDB 데이터 연산자 정리](#mongodb-데이터-연산자-정리)
		* [01. 산술 연산자 ( \$add / \$sum / \$avg / \$abs / \$ceil )](#01-산술-연산자-add-sum-avg-abs-ceil)
		* [02. 논리 연산자 ( \$and / \$or )](#02-논리-연산자-and-or)
			* [\$allElementTrue / \$anyElementsTrue](#allelementtrue-anyelementstrue)
		* [03. 배열 연산자](#03-배열-연산자)
			* [\$addToSet](#addtoset)
			* [\$arrayElemAt](#arrayelemat)
			* [\$arrayToObject <?>](#arraytoobject)
		* [04. \$ne vs \$nin](#04-ne-vs-nin)
			* [\$ne (NOT EQUAL)](#ne-not-equal)
			* [\$nin (NOT IN)](#nin-not-in)

<!-- /code_chunk_output -->

---

### 01. 산술 연산자 ( \$add / \$sum / \$avg / \$abs / \$ceil )

산술 연산자 종합
```
    # 합산
    { $add : ["num1", "num2"] }

    # 합산
    { $sum : ["num1", "num2"] }

    # 평균
    { $avg : ["num1", "num2"] }

    # 절대값
    { $abs : "num1" }

    # 올림
    { $ceil : "num1" }
```
### 02. 논리 연산자 ( \$and / \$or )

#### \$allElementTrue / \$anyElementsTrue

모든 상태 True 확인 연산자
```
    # $responses 는 배열
    $project: {
         responses: 1,                                          // # 트루 결과 리턴 (arr)
         isAllTrue: { $allElementsTrue: [ "$responses" ] },     // # 모든 불린 트루 ?
         _id: 0
```

하나 상태 True 확인 연산자
```
    # $responses 는 배열
    $project: {
         responses: 1,                                          // # 트루 결과 리턴 (arr)
         isAnyTrue: { $anyElementsTrue: [ "$responses" ] },     // # 하나 라도 불린 트루 ?
         _id: 0
    }
```


### 03. 배열 연산자

#### \$addToSet

배열 추가 연산자

- group화된 한 필드를 배열로 받고 싶을 때 : group(1, 2, 3) -> [1, 2, 3]
- 이미 있는 배열에 추가적으로 삽입하고 싶을 때 : [1 , 2] <- 3
```
    $group : {
        _id : "gender",                         // # 성별 그룹 처리
        arrAddress : { $addToSet : "address" }  // # 성별 주소 배열 리턴
    }
```

#### \$arrayElemAt

인덱스 결과 리턴 연산자 => array[idx]
```
    { $arrayElemAt: [ <array>, <idx> ] }        // # array[inx]
```


#### \$arrayToObject <?>

### 04. \$ne vs \$nin

#### \$ne (NOT EQUAL)

만약 단일값을 비교하기위해서라면 'NOT EQUAL' 연산자를 사용합니다.

```
db.myCollection.find({'blocked.user': {$ne: 11}});
```

#### \$nin (NOT IN)

제외할 데이터가 여러개라면 'NOT IN' 연산자를 사용해야합니다.

```
db.myCollection.find({'blocked.user': {$nin: [11, 12, 13]}});
```


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
