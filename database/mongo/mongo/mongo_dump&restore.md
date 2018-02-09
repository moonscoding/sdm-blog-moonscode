# MONGO - NoSQL의 선두

## Mongo 백업 및 복원에 관한 모든 것.

<div class="pull-right"> 문스코딩 - 2018.01.02 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MONGO - NoSQL의 선두](#mongo-nosql의-선두)
	* [Mongo 백업 및 복원에 관한 모든 것.](#mongo-백업-및-복원에-관한-모든-것)
		* [01. dump](#01-dump)
		* [02. restore](#02-restore)

<!-- /code_chunk_output -->


용어정리
```
    dump :: 덤프란 데이터 베이스의 데이터를 추출하는 것을 말합니다.
    restore :: 리스토어란 추출된 데이터를 다시 데이터 베이스에 넣는 것을 말합니다.
```

### 01. dump

```
    mongodump --host <hostIP:27017> --db <dbName>
```

### 02. restore

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

데이터 베이스의 크기가 커지다 보면,

```
    insertion error: EOF
```

다음과 같은 에러가 나기 시작합니다.
데이터양이 많어 에러가 나는 경우 경우 batchSize를 통해서 처리할 수 있습니다.
batchSize는 배치하는 크기를 설정합니다.
또한, 사용하는 서버의 인스턴스를 키워주면 다음과 같은 에러가 나지 않습니다.

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
