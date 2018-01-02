# MONGO REPLICA SET

#### mongoDB replica set 구성하기.

<div class="pull-right"> 문스코딩 - 2017.12.19 </div>

---

## 01. 기본 성질

- 홀수 구성 (election 과정 문제)
- 각 멤버간 네트워킹이 가능하도록 bindIP속성 오픈.
- Secondary에서는 read, write 허용되지 않음 (허용가능)

## 02. 구성

[1] 이름 설정

```
    $ mongod --replSet "rs0"
```

[2] 초기화 하기 [rs.initiate()]

```
> rs.initiate()
{
        "info2" : "no configuration explicitly specified -- making one",
        "me" : "testvm1:27017",
        "info" : "Config now saved locally.  Should come online in about a minute.",
        "ok" : 1
}
```

[3] 구성 conf 확인하기 [rs.conf()]

```
PRIMARY> rs.conf()
{
    "_id" : "rs0",
    "version" : 1,
    "members" : [
            {
                    "_id" : 0,
                    "host" : "testvm1:27017"
            }
    ]
}

```

[4] 다른 멤버 추가하기 [rs.add()]

```
PRIMARY> rs.add("testvm2:27017")
{ "ok" : 1 }
PRIMARY> rs.add("testvm3:27017")
{ "ok" : 1 }
```

[5] 상태 체크하기 [rs.status()]

```
PRIMARY> rs.status()
{
        "set" : "rs0",
        "date" : ISODate("2015-03-27T18:08:25Z"),
        "myState" : 1,
        "members" : [
                {
                        "_id" : 0,
                        "name" : "testvm1:27017",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 1173,
                        "optime" : Timestamp(1427479681, 1),
                        "optimeDate" : ISODate("2015-03-27T18:08:01Z"),
                        "electionTime" : Timestamp(1427478890, 1),
                        "electionDate" : ISODate("2015-03-27T17:54:50Z"),
                        "self" : true
                },
                {  replica set 02 ... 생략 },
                {  replica set 03 ... 생략 }
        ],
        "ok" : 1
}
```

[6] Secondary에서 읽기허용 [rs.slaveOk()]

```
SECONDARY> rs.slaveOk()
```


##### # 이슈정리

###### 01. OTHER



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](http://minsql.com/others/mongodb-replica-set-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0/)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
