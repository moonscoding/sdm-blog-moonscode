# MONGO - NoSQL의 선두

#### MongoDb - comparison 비교 연산자 !

<div class="pull-right"> 문스코딩 - 2018.02.dd </div>

---

**용어정리**
```

```

#### 01. $eq

$eq는 field가 같은 값을 같는지 확인하는 변수 입니다.

```js
{ <field>: { $eq: <value> } }
```

> 그냥 find랑 다른 점은 무엇인가요 ? : 없습니다.

아래 두 코드는 같은 코드 입니다.
```js
db.inventory.find( { "item.name": { $eq: "ab" } } )
db.inventory.find( { "item.name": "ab" } )
```

#### 02. \$gt / \$gte / \$lt / \$lte

다음 연산자들은 비교급 연산자입니다.

**$gt :: 보다 크다**

```js
db.inventory.find( { qty: { $gt: 20 } } )
```

**$gte :: 같거나 보다 크다**

```js
db.inventory.find( { qty: { $gte: 20 } } )
```

**$lt :: 보다 작다**
```js
db.inventory.find( { qty: { $lt: 20 } } )
```

**$lte :: 같거나 보다 작다**
```js
db.inventory.find( { qty: { $lte: 20 } } )
```

#### 03. \$in / \$nin

다음은 배열을 매개변수로 받는 비교 연산자입니다.
\$in은 배열안에 있는 모든 값을 참조하는 비교 연산자입니다.
\$nin은 배열안에 있는 배열은 모두 참조하지 않는 비교 연산자입니다.

**$in :: 해당 배열안에 있으면 참조**

```js
db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
```

```js
db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )
```

#### 04. \$ne

다음 연산자는 파라미터가 아닌 것을 반환하는 비교 연산자입니다.

```js
db.inventory.find( { qty: { $ne: 20 } } )
```



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
