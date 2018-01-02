# MONGO OPERATOR

#### MongoDB 데이터 연산자 정리

<div class="pull-right"> 문스코딩 - 2017.12.26 </div>

---

##### 01. 산술 연산자 ( \$add / \$sum / \$avg / \$abs / \$ceil )

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
##### 02. 논리 연산자 ( \$and / \$or )

###### \$allElementTrue / \$anyElementsTrue

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


##### 03. 배열 연산자

###### \$addToSet

배열 추가 연산자

- group화된 한 필드를 배열로 받고 싶을 때 : group(1, 2, 3) -> [1, 2, 3]
- 이미 있는 배열에 추가적으로 삽입하고 싶을 때 : [1 , 2] <- 3
```
    $group : {
        _id : "gender",                         // # 성별 그룹 처리
        arrAddress : { $addToSet : "address" }  // # 성별 주소 배열 리턴
    }
```

###### \$arrayElemAt

인덱스 결과 리턴 연산자 => array[idx]
```
    { $arrayElemAt: [ <array>, <idx> ] }        // # array[inx]
```


###### \$arrayToObject <?>

```

```


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
