# MONGO - NoSQL의 선두

## MongoDB를 이용해서 JOIN

<div class="pull-right"> 문스코딩 - 2017.12.27 </div>

---


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [MONGO - NoSQL의 선두](#mongo-nosql의-선두)
	* [MongoDB를 이용해서 JOIN](#mongodb를-이용해서-join)
		* [01. lookup (aggregate)](#01-lookup-aggregate)
			* [1.1. lookup한 조인된 결과 값을 그룹화 하기 (lookup -> group)](#11-lookup한-조인된-결과-값을-그룹화-하기-lookup-group)
		* [02. populate (Mongoose)](#02-populate-mongoose)

<!-- /code_chunk_output -->

mongoDB를 이용해서 서로 다른 테이블의 Join을 걸어보자

### 01. lookup (aggregate)

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

#### 1.1. lookup한 조인된 결과 값을 그룹화 하기 (lookup -> group)

```
    방법없음
    -> 조인 데이터 update 후, group화 처리
    -> 작업 종료 후, update 데이터 unset 처리
```

### 02. populate (Mongoose)

'Populate'는 'mongoDB'에 정의된 명령어는 아닙니다.

'Mongoose'를 이용할때 사용할 수 있는 명령어로 '$lookup' 명령어를 사용하는 'MongoDB'의 대안이라고 말하고 있습니다.


```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
```

'Story'와 'Person' 스키마가 있고,

'Person'의 'stories' 필드는 'Story'를 타겟으로 가지고 있습니다.

'Story'의 'author'과 'fans' 필드는 'Person'을 타겟으로 가지고 있습니다.

```js
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });
```

> .populate(popul_foreign);

> .populate(popul_foreign, popul_cols);

#### Schema.Types.Mixed 타입에서 populate가 가능한가요 ?


#### lookup과 populate의 다른점은 무엇인가 ?



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
