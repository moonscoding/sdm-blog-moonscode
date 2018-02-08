# MONGO - NoSQL의 선두

#### MongoDb - 언제나 처음보는거 같은 Date 다루기

<div class="pull-right"> 문스코딩 - 2018.02.dd </div>

---

**용어정리**
```
    ISO date format :: 국제 표준 날짜 형식
```

#### 01. Date format 확인하기

##### ISO data format 이란 ?

국제 표준 날짜 형식으로 숫자로 날짜를 표현할때 모호함이 없도록 하기 위한 표준 방식입니다.
예를 들어서 북미에서 보통 월을 날짜 앞에 습니다. 그러나 유럽인은 월 앞에 날짜를 사용합니다. 그리고 숫자를 구분하는 구분자도 나라마다 모두 다릅니다.
그렇기 때문에 ISO 8601은 나라에 무관하게 날짜 표기 형식의 표준 방식을 제공했습니다.

##### 한국 시간

##### UTC time

#### 02. 날짜 쿼리 사용

12월 24일 00시 부터 12월 26일 00시 까지 (26일 제외)하는 쿼리를 만들어 봅시다.

```js
db.mycollection.find({ "dt" : {"$gte": new Date("2014-12-24T00:00:00.000Z"),"$lte": new Date("2014-12-26T00:00:00.000Z"))} })

db.mycollection.find({ "dt" : {"$gte": ISODate("2014-12-24T00:00:00.000Z"),"$lte": ISODate("2014-12-26T00:00:00.000Z"))} })
```

> 주의할 점은 날짜가 실제 한국 시간이 아닌 UTC time이라는 점입니다.

#### 03. objectId를 이용해서 날짜별 조회

필드가 날짜로 이루어 지지 않았을 때,
 \_id find를 기본값인 ObjectIds 로 사용한 경우는 또 다른 쿼리 방법이 있습니다.

만약 지난주에 생성된 모든 document를 조회한다고 했을 시에,

```js
> lastweek = (new Date(2014, 9, 1)).getTime()/1000
1412089200
> hexSecs = lastweek.toString(16)
542ac570
> minId = ObjectId(hexSecs+"0000000000000000")
ObjectId("542ac5700000000000000000")
> db.stuff.find({"_id" : {"$gt" : minId}})
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ISODate format 이란 무엇인가요 ? ](http://www.terms.co.kr/ISOdateformat.htm)

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
