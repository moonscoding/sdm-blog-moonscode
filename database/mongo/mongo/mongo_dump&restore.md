# MONGO - NoSQL의 선두

## Mongo 백업 및 복원에 관한 모든 것.

<div class="pull-right"> 문스코딩 - 2018.01.02 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MONGO - NoSQL의 선두](#mongo-nosql의-선두)
	* [Mongo 백업 및 복원에 관한 모든 것.](#mongo-백업-및-복원에-관한-모든-것)
		* [01. dump :: 데이터 백업하기](#01-dump-데이터-백업하기)
		* [02. restore :: 데이터 복구하기](#02-restore-데이터-복구하기)

<!-- /code_chunk_output -->


용어정리
```
    dump :: 덤프란 데이터 베이스의 데이터를 추출하는 것을 말합니다.
    restore :: 리스토어란 추출된 데이터를 다시 데이터 베이스에 넣는 것을 말합니다.
```

MongoDB는 mongodump 와 mongorestore라는 명령어를 통해서 데이터를 백업하고 복구합니다.
해당 명령어는 각각의 설치된 mongodb/ 폴더속 bin/ 에 있습니다.


### 01. dump :: 데이터 백업하기

```linux
	$ mongodump --host <hostIP:27017> --db <dbName>
	$ mongodump --h <hostIP:27017> --d <dbName>
```

**collection :: dackup**

원하는 컬렉션만 덤프하기

```linux
	$ mongodump --h <host> --d <database> --collection <collection>
	$ mongodump --h <host> --d <database> --c <collection>
```

**out :: 위치 설정하기**

데이터를 백업할때 원하는 디렉토리에 가서 백업을 해도 되지만,
--out 속성을 사용해서 원하는 디렉토리에 백업파일을 위치시킬수도 있습니다.
--o로 생략도 가능합니다.

```linux
	$ mongodump --h <host> --d <database> --c <collection> --out <path>
	$ mongodump --h <host> --d <database> --c <collection> --o <path>
```

**Local로 옮기는방법**

로컬PC로 옮기는 방법은 여러가지가 있습니다.
대표적으로 window라면 winSCP를 macOS라면 forkLift를 사용하세요.

```linux
	$ mv ./dump ./dackup180212-1045	# 날짜와 시간까지 적어놓으면 나중에 구분이 쉽습니다.
	$ tar -zcvf backup180212-1045.tar.gz backup180212-1045 # 압축해서 옮기세요 ! 옮기는 속도가 빠릅니다.
```

### 02. restore :: 데이터 복구하기

**기본**

```w
    mongorestore --host <hostIP:27017> --drop ./dbpath --db <dbName>
```

**collection**

```
    mongorestore --db <dbName> --collection <colName> <bsonPath>
    mongorestore --db <dbName> --collection <colName> --drop <bsonPath>
```

**batchSize**

> \# batchSize를 사용하는 것 보다 MongoDB tool인 studio 3T를 사용 하는 것을 추천합니다.
> studio 3T의 import를 사용하면 많은 양의 restore도 에러 없이 처리할 수 있습니다 :)

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
