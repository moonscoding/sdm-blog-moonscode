# MONGO - NoSQL의 선두

## mongoDB replica set 구성하기.

<div class="pull-right"> 문스코딩 - 2017.12.19 </div>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MONGO - NoSQL의 선두](#mongo-nosql의-선두)
	* [mongoDB replica set 구성하기.](#mongodb-replica-set-구성하기)
		* [01. 기본 성질](#01-기본-성질)
		* [02. 구성](#02-구성)
			* [[1] 이름 설정](#1-이름-설정)
			* [[2] 초기화 하기 [rs.initiate()]](#2-초기화-하기-rsinitiate)
			* [[3] 구성 conf 확인하기 [rs.conf()]](#3-구성-conf-확인하기-rsconf)
			* [[4] 다른 멤버 추가하기 [rs.add()]](#4-다른-멤버-추가하기-rsadd)
			* [[5] 상태 체크하기 [rs.status()]](#5-상태-체크하기-rsstatus)
			* [[6] Secondary에서 읽기허용 [rs.slaveOk()]](#6-secondary에서-읽기허용-rsslaveok)
		* [이슈정리](#이슈정리)
			* [01. OTHER](#01-other)
			* [02. STARTUP2](#02-startup2)
			* [03. SECONDARY 에서 config 바꾸기](#03-secondary-에서-config-바꾸기)

<!-- /code_chunk_output -->


---

### 01. 기본 성질

- 홀수 구성 (election 과정 문제)
- 각 멤버간 네트워킹이 가능하도록 bindIP속성 오픈.
- Secondary에서는 read, write 허용되지 않음 (허용가능)

### 02. 구성

#### [1] 이름 설정

```
    $ mongod --replSet "rs0"
```

#### [2] 초기화 하기 [rs.initiate()]

```
> rs.initiate()
{
        "info2" : "no configuration explicitly specified -- making one",
        "me" : "testvm1:27017",
        "info" : "Config now saved locally.  Should come online in about a minute.",
        "ok" : 1
}
```

#### [3] 구성 conf 확인하기 [rs.conf()]

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

#### [4] 다른 멤버 추가하기 [rs.add()]

```
PRIMARY> rs.add("testvm2:27017")
{ "ok" : 1 }
PRIMARY> rs.add("testvm3:27017")
{ "ok" : 1 }
```

#### [5] 상태 체크하기 [rs.status()]

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

#### [6] Secondary에서 읽기허용 [rs.slaveOk()]

```
SECONDARY> rs.slaveOk()
```


### 이슈정리

#### 01. OTHER

mongo replica set의 상태중 1개로
다른 repliaca set과 연결되지 못하는 것을 의미합니다.

#### 02. STARTUP2

mongo replica set의 상태중 1개로
다른 repliaca set과 연결되지 못해서 금방 꺼지는 상태를 의미합니다.

#### 03. SECONDARY 에서 config 바꾸기

방법이 없습니다. Primary는 reconfig 속성을 이용해서 바꾸줄 수 있지만,
SECONDARY는 불가능하기 때문에
우선적으로 모든 데이터베이스를 덤프 해주고,
--dbpath에 해당하는 디렉토리에가서 관련 로그파일을 모두 지워줍니다.
그 안에 relica set 관련 설정값이 있기 때문입니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](http://minsql.com/others/mongodb-replica-set-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0/)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
