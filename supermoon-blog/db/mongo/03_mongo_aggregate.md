# MONGO AGGREGATE

#### mongo aggregation 정리.

<div class="pull-right"> 문스코딩 - 2017.12.20 </div>

---

##### [1] 조건걸기 (match)

```

```


##### [1] 그룹 (group)


##### [2] 프로젝트 (project)

```

```

##### [3] 제한 (limit)

```
    db.article.aggregate([
        { $limit : 5 }
    ]);
```

##### [4] 정렬 (sort)

```
    db.users.aggregate([
        { $sort : { age : -1, posts: 1 } }
    ])
```

##### [5] unwind

```
    db.inventory.aggregate( [ { $unwind: "$sizes" } ] )             // $sizes 배열을 각각 객체로 나눔
    db.inventory.aggregate( [ { $unwind: { path: "$sizes" } } ] )   // $sizes 배열을 각각 객체로 나눔
```


---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
