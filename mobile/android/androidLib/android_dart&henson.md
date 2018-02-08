# Android Lib를 통한 간단 코드 적용기
## 간편한 이동 Dart !

<div class="pull-right"> 문스코딩 - 2018.02.08 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android Lib를 통한 간단 코드 적용기](#android-lib를-통한-간단-코드-적용기)
	* [간편한 이동 Dart !](#간편한-이동-dart)
		* [기존 인텐트 처리 방식](#기존-인텐트-처리-방식)
		* [Dart](#dart)
		* [Henson](#henson)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 기존 인텐트 처리 방식

인텐트 엑스트라를 객체에 프로퍼티로 주입할 수 있게 해주므로 새 액티비티를 시작하고
이들 엑스트라 인텐트에 실어서 보낸 작업을 한다면 Dart로 쉽게 해결할 수 있습니다.

```java
intent.putExtra(EXTRA_TACO_DESCRIPTION, "Seasoned Lentils with Green Chile on Naan");
//TacoDetailActivity
tacoDescription = getIntent().getExtras().getString(EXTRA_TACO_DESCRIPTION);
```

 intent.putExtra, key, value, getIntent, getExtras, getString 같은 것을 키에 넣어 보내는 것도 상당히 소모적인 작업입니다. 종종 담았던 곳으로 다시 돌아가서 어떤 key에 담았는지, 변수인지 상수인지 살펴봐야만 하죠

### Dart

인텐트로 부터 엑스트라를 가져오는 코드입니다.

```java
public class TacoDetailActivity extends Activity {
    //Required. Exception thrown if missing
    @InjectExtra boolean favorite;
    @InjectExtra String description
    //default value if left null
    @Nullable @InjectExtra String tag = "taco";
    //Ingredient implements Parcelable
    @Nullable @InjectExtra Ingredient withIngredient;

    @Override
    public void onCreate(Bundle bundle) {
        super.onCreate(bundle);
        Dart.inject(this);
        //TODO use member variables
        ...
    }
}
```

favorite, description, tag, ingredient, 네 가지 엑스트라가 있습니다.
액티비티의 이들 프로퍼티를 InjectExtra라고 애너테이트 했는데
그냥 그대로 둔다면 액티비티가 시작할때 인텐트 안에서 null이 됩니다.
당연히 예외가 발생합니다
boolean인 favorite와 string인 description인 엑스트라 액티비티와 함께
액티비티가 실행되야 합니다.
이런 액스트라 옵셔널 필드로만들고 싶다면, **Nullable 애너테이션** 을 붙이면 됩니다 .

> 이렇게 해주면 깜박하고 엑스트라를 실어 보내지 않아도 앱이 죽지 않습니다.

> 또한, 깜박할 경우를 대비해 taco란 값을 기본값으로 줄 수 도 있습니다.

### Henson

Dart 인젝트를 사용하면 우리가 정의한 대로 맴버 변수를 사용할 수 있습니다 .
이런 엑스트라를 인텐트에 어떻게 설정할까요 ?

```java
Generate intent builders with Henson
//Start intent for TacoDetailActivity
Intent intent = Henson.with(context)
    .gotoTacoDetailActivity()
    .favorite(true)
    .description("Seasoned Lentils with Green Chile on Naan")
    .ingredient(new Ingredient())
    .build();
// tag is null or defaults to "taco"
startActivity(intent);
```

Henson은 자동으로 이 인젝트 엑스트라 애너테이션을 가진 모든 액티비티를 찾아서
자동으로 만들어낸 빈 메서드로 보내줍니다.

tag를 넣지 않은걸 눈치 채셨나요? tag를 nullable인 주입 엑스트라로 설정하면 null이 될 겁니다. 그러나 앞서 기본 값을 설정했으므로 그에 맞게 taco라는 값이 액티비티를 시작할 때 들어가겠죠.

아무 엑스트라도 주입하지 않은채 Henson을 사용하고 싶으면 어떻게 할까요? 액티비티를 **\@HensonNavigable** 라고 애너테이트하기만 하면 됩니다.

ProGuard를 사용하는 분은 아래와 같은 법칙을 적용하라는 것입니다.

```
grep 'TODO: implement'
=> 0 results
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: Realm - Docs android librarys ](https://academy.realm.io/kr/posts/360andev-chris-guzman-android-libraries-beginner/)

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
