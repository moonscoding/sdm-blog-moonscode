# MONGO CRUD

#### 몽고 CRUD

<div class="pull-right"> 문스코딩 - 2017.12.20 </div>

---

##### [1] 조회


OR
```
    db.Collection.find({
            $or: [ { quantity: { $lt: 20 } }, { price: 10 } ]
        })
```

제한 (limit)
```
    db.Collection.find().limit(5)
```

##### [2] 수정

##### [3] 삭제

```

```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
