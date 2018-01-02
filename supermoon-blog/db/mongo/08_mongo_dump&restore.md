# MONGO DUMP & RESTORE

#### Mongo 백업 및 복원에 관한 모든 것.

<div class="pull-right"> 문스코딩 - 2018.01.02 </div>

---

#### 01. dump

```
    mongodump --host <hostIP:27017> --db <dbName>
```

#### 02. restore

**기본**

```
    mongorestore --host <hostIP:27017> --drop ./dbpath --db <dbName>
```

**collection**

```
    mongorestore --db <dbName> --collection <colName> <bsonPath>
    mongorestore --db <dbName> --collection <colName> --drop <bsonPath>
```

**batchSize**

데이터양이 많어 에러가 나는 경우 경우 batchSize를 통해서 처리할 수 있음 (배치하는 속도처리)

```
    mongorestore --host <hostIP:27017> --drop ./dbpath --db <dbName> --batchSize=100
    mongorestore --host <hostIP:27017> --drop ./dbpath --db <dbName> --batchSize=50
    mongorestore --host <hostIP:27017> --drop ./dbpath --db <dbName> --batchSize=10
    mongorestore --host <hostIP:27017> --drop ./dbpath --db <dbName> --batchSize=1
```



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
