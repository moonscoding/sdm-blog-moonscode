# MONGO - NoSQL의 선두

#### MongoDB를 이용해서 JOIN

<div class="pull-right"> 문스코딩 - 2017.12.27 </div>

---

mongoDB를 이용해서 서로 다른 테이블의 Join을 걸어보자

##### 01. lookup (aggregate)

```
{
    $lookup: {
        from: <collection to join>,                                             # 조인 테이블 명
        localField: <field from the input documents>,                           # 조인할 필드
        foreignField: <field from the documents of the "from" collection>,      # 조인될 필드
        as: <output array field>                                                # 결과 필드
    }
}
```

##### 02. populate

```

```

##### 03. lookup한 조인된 결과 값을 그룹화 하기 (lookup -> group)

```
    방법없음
    -> 조인 데이터 update 후, group화 처리
    -> 작업 종료 후, update 데이터 unset 처리
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
