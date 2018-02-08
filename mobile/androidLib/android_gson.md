# Android Lib를 통한 간단 코드 적용기

## Gson - Android에서 JSON을 다루는 간편한 방법

<div class="pull-right"> 문스코딩 - 2018.02.06 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android Lib를 통한 간단 코드 적용기](#android-lib를-통한-간단-코드-적용기)
	* [Gson - Android에서 JSON을 다루는 간편한 방법](#gson-android에서-json을-다루는-간편한-방법)
		* [01. Gson](#01-gson)
		* [02. JSON parse & Gson parse](#02-json-parse-gson-parse)
		* [03. null 필드 건너뛰기](#03-null-필드-건너뛰기)
		* [04. 프로퍼티 작성 후 API 이름 넘기기](#04-프로퍼티-작성-후-api-이름-넘기기)
		* [05. date 포멧 커스터마이징](#05-date-포멧-커스터마이징)

<!-- /code_chunk_output -->


**용어정리**
```

```

### 01. Gson

Gson은 JSON과 Java 객체를 상호 변환해주는 라이브러리입니다.
Gson을 사용하는 것의 장점은 클래스에 애너테이션이 필요하지 않다는 것입니다.

```java
class Taco {
    private String description;
    private String imageUrl;
    private String tag;
    //not included in JSON serialization or deserialization
    private transient boolean favorite;
    Taco(String description, String imageUrl, String tag, boolean favorite) {
    ....
    }
}
```

Gson을 사용할 때 프로터피에 transient를 붙이면
JSON을 시리얼라이즈할 때 해당 필드를 건너 뜁니다.

### 02. JSON parse & Gson parse

```java
// Serialize to JSON
Taco breakfastTaco = new Taco("Eggs with syrup on pancake", "imgur.com/123", "breakfast", true);
Gson gson = new Gson();
String json = gson.toJson(breakfastTaco);

// ==> json is {description:"Eggs with syrup on pancake", imageUrl:"imgur.com/123", tag:"breakfast"}

// Deserialize to POJO
Taco yummyTaco = gson.fromJson(json, Taco.class);
// ==> yummyTaco is just like breakfastTaco except for the favorite boolean
```

favorite이 true라는 점이 빠져는데, 이는 favorite을 transient 프로퍼티로 설정했기 때문입니다.

Gson의 장점은 현재 클래스나 슈퍼 클래스의 필드가 기본으로 포함된다는 것입니다.
다차원 배열도 지원하므로 만약 HTTP를 통해 체스를 두려고 해도 Gson을 사용할 수 있습니다.

### 03. null 필드 건너뛰기

```java
//Set properties to null instead of ignoring them
Gson gson = new GsonBuilder().serializeNulls().create();

//Keep whitespace
Gson gson = new GsonBuilder().setPrettyPrinting().create();
```

첫번째 포인트는 null을 시리얼라이즈 하는겁니다.
JSON은 시리얼라이즈 할 때 null을 건너뜁니다.
GsonBuilder 내의 시리얼라이즈된 null을 사용해서 이를 바꿀 수 있습니다.
Gson은 기본적으로 공백을 자동 제거하기 때문에 혹시 공백을 유지 해야하는 경우라면
**setPrettyPrinting** 를 사용하세요 !

### 04. 프로퍼티 작성 후 API 이름 넘기기

```java
public class Taco {
    @SerializedName("serialized_labels")
    private String tag;
}
```

API에서 snake_case 를 사용했다던지 철자가 잘못 됬다던지,
기본 이름을 사용하기 싫을 경우도 있습니다.
이 경우 자신의 프로퍼티를 작성한 후에 애너테이션으로 태그하고 API이름을 넘길 수 있습니다.
이 후 부터는 JSON에서 받아와서 시리얼라이즈된 라벨을 사용하는 대신 태그된 프로퍼티를 호출해서
Java 객체를 사용할 수 있습니다.

### 05. date 포멧 커스터마이징

```java
public String DATE_FORMAT = "yyyy-MM-dd";

GsonBuilder gsonBuilder = new GsonBuilder();
gsonBuilder.setDateFormat(DATE_FORMAT);
Gson gson = gsonBuilder.create();
```

date 포맷을 만들고 Gson을 만들어서 해당 포맷을 넘겨줍니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
