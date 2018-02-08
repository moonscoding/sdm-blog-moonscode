# MONGO - NoSQL의 선두

#### mongoDB에서 사용하는 Array 쿼리의 모든 것

<div class="pull-right"> 문스코딩 - 2017.12.27 </div>

---

#### 01. array 요소가 있는지 어떻게 조회할까요 ?

```js

// 예제 1.
db.students.find({
    semester: 1, grades: { $gte: 85 }
}, {
    "grades.$": 1
})

// 예제 2.
db.students.find({
    grades: {
        $elemMatch: {
            mean: { $gt: 70 },
            grade: { $gt:90 }
        }
    }
}, {
    "grades.$": 1
})
```
다음과 같이 조회하면 array의 index 속에 해당 요청 데이터가 있는지 확인할 수 있습니다.


#### 02. array json의 합산은 어떻게 ?

ex.
```
    [
        {
            price : 1
        },
        {
            price : 2
        },
        {
            price : 3
        }
    ]
```

**unwind 이용방법**
```
db.collection.aggregate([
     {
         "$unwind": "$arrPrice"
     },
     {
         "$group": {
             "_id": "$groupField",
             "total": {
                 "$sum": "$arrPrice.price"
             }
         }
     }
])
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
