# Android Lib를 통한 간단 코드 적용기
## 강력한 모바일 DB RealM 적용기

<div class="pull-right"> 문스코딩 - 2018.02.08 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android Lib를 통한 간단 코드 적용기](#android-lib를-통한-간단-코드-적용기)
	* [강력한 모바일 DB RealM 적용기](#강력한-모바일-db-realm-적용기)
		* [01.](#01)
		* [02. Realm 객체 생성하기](#02-realm-객체-생성하기)
		* [객체 저장](#객체-저장)
		* [03. 데이터에 접근하기](#03-데이터에-접근하기)
		* [04. Transaction block 이용해서 새로운 객체 저장하기](#04-transaction-block-이용해서-새로운-객체-저장하기)
		* [비동기 Transaction 실행하기](#비동기-transaction-실행하기)
		* [모델간의 관계 규정하기](#모델간의-관계-규정하기)
		* [삭제하기](#삭제하기)
		* [RealmResults, change listener](#realmresults-change-listener)
		* [활용 팁](#활용-팁)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01.

Realm은 SQLite를 대체하는 훌륭한 라이브러리입니다.

Realm은 장점은 다음과 같습니다.

- 매우 쉽고 설정이 간단합니다.
- 우리가 사용하는 모델을 데이터 베이스에 확장해서 사용할 수 있습니다.
- 처음부터 모바일을 위해 만들어 졌습니다 .
- 많은 쿼리들이 동기적으로 돌려도 충분히 빠릅니다.
	- 비동기적으로 사용하기를 권하지만 필요하다면 동기적으로 해도 무방합니다 .
- 하나의 앱에 여러 Realm 데이터 베이스를 사용할 수 있습니다.

### 02. Realm 객체 생성하기

RealmObject 상속

```java
public class Taco extends RealmObject {
    private String description;
    private String tag;
    private String imageUrl;
    private boolean favorite;
    //getters and setters
}
```

RealmConfiguration 인스턴스를 받아오고 Realm의 기본 인스턴스를 얻습니다.

```java
// Set-up Realm
// Create a RealmConfiguration
// saves the Realm file in the app's "files" directory.
RealmConfiguration realmConfig =
    new RealmConfiguration.Builder(context).build();
Realm.setDefaultConfiguration(realmConfig);

// Get a Realm instance for this thread
Realm realm = Realm.getDefaultInstance();
```

**새 스레드에서 Realm을 사용할 때마다 새 Realm 인스턴스를 가져와야 합니다.**

### 객체 저장

데이터베이스에 객체를 저장하는 방법은 다음과 같습니다

```java
// Persist your data in a transaction
realm.beginTransaction();

// Persist unmanaged objects
final Taco managedTaco = realm.copyToRealm(unmanagedTaco);

// createObject 를 이용해서 새로운 객체를 DB에 넣습니다.
Taco taco = realm.createObject(Taco.class);
realm.commitTransaction();
```

모든 데이터가 트랜잭션 내에서 처리되도록 해야합니다.
가자 먼저 할 일을 트랙잭션을 시작하는 일입니다 .
Realm이 자동으로 모든 객체를 메모리에서 관리해주므로 ,
Realm에 이를 복사하거나 Realm 데이터 베이스에 객체를 만들수 있습니다.

realm.copyToRealm 을 호출하고 만든객체를 넘김니다.

새로운 타코 객체를 만든다면, Realm에서 인스턴스를 만들 수도 있습니다 .
realm.createObject를 사용해서 해당객체를 만들고
realm.commitTransaction을 호출하면,
정보가 데이터 베이스에 잘 들어가게 됩니다.

### 03. 데이터에 접근하기

```java
// Get a Realm instance for this thread
Realm realm = Realm.getDefaultInstance();

//find all favorite tacos
final RealmResults<Taco> likedTacos =
    realm.where(Taco.class).equalTo("favorite", true).findAll();
```

데이터를 쓰는 다른 방법은 아래와 같습니다.
Realm를 사용하려면 새로운 Realm인스턴스를 가져와야 합니다.

### 04. Transaction block 이용해서 새로운 객체 저장하기

```js
// Get a Realm instance for this thread
Realm realm = Realm.getDefaultInstance();

// Transaction block
realm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm realm) {
        Taco taco = realm.createObject(Taco.class);
        taco.setDescription("Spaghetti Squash on Fresh Corn Tortillas");
        user.setImageUrl("http://tacoimages.com/1.jpg");
    }
});
```

이제 트랜잭션을 실행합니다.
Realm 에서 새 객체를 만들고 description과 이미지를 설정합니다.
이블록이 실행되면 데이터 베이스 내에 저장됩니다.

### 비동기 Transaction 실행하기

```java
// Async - executeTransactionAsync
realm.executeTransactionAsync(new Realm.Transaction() {
        @Override
        public void execute(Realm bgRealm) {
            Taco taco = bgRealm.createObject(Taco.class);
            taco.setDescription("Spaghetti Squash on Fresh Corn Tortillas");
            user.setImageUrl("http://tacoimages.com/1.jpg");
        }
    }, new Realm.Transaction.OnSuccess() {
        @Override
        public void onSuccess() {
            // Transaction was a success.
        }
    }, new Realm.Transaction.OnError() {
        @Override
        public void onError(Throwable error) {
            // Transaction failed and was automatically canceled.
        }
    });
```

다시 실행 블록을 사용해서 executeTransactionAsync를 호출하고 필요한 세터를 설정합니다. 그러면 Realm이 onSuccess와 onError, 두 가지 콜백을 돌려줍니다. 이 시점에서 사용자에게 에러 등의 메시지를 보낼 수 있죠.

### 모델간의 관계 규정하기

2개의 모델 설정
타코와 성분 두 객체가 Realm 을 상속받아야 하며, Realm 이 이들 간의 관계를 정리합니다.

```java
public class Taco extends RealmObject {
    ...
    private List<Ingredient>
    ...
}

public class Ingredient extends RealmObject {
    private String name;
    private URL url;
}
```

```java
RealmResults<Taco> limeTacos = realm.where(Taco.class)
                                    .equalTo("ingredients.name", "Lime")
                                    .findAll();
```

이 코드에서 Realm에게 “라임이라는 성분이 들어가는 모든 타코를 줄래?”하고 물어봤습니다.
그 다음 Reaml이 건네준 Realm results를 limeTacos에 저장했습니다.
그러면 우리가 순회하면서 볼 수 있는 타코의 리스트를 가질 수 있습니다. (이터레이터)
Realm은 전형적인 SQL 관계를 모두 지원합니다. 1:1, 1:다, 다:다 관계가 모두 가능합니다.

### 삭제하기

```java
// All changes to data must happen in a transaction
realm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm realm) {
        // remove single match
        limeTacos.deleteFirstFromRealm();
        //or limeTacos.deleteLastFromRealm();

        // remove a single object
        Taco fishTaco = limeTacos.get(1);
        fishTaco.deleteFromRealm();

        // Delete all matches
        limeTacos.deleteAllFromRealm();
    }
});
```

limeTacos를 가져왔는데 라임이 아니라 라임스톤을 가져왔다고 가정하고
선호 리스트에서 지워봤습니다.

### RealmResults, change listener

```java
limeTacos.addChangeListener(
    new RealmChangeListener<RealmResults<Taco>>() {
        @Override
        public void onChange(RealmResults<Taco> tacosConLimon) {
        //tacosConLimon.size() == limeTacos.size()

        // Query results are updated in real time
        Log.d("LimeTacos", "Now we have" + limeTacos.size() + " tacos");
        }
    }
);
```

limeTacos에 change listener를 달았습니다.
뭔가 추가되거나 리스트 내의 객체가 바뀌면
이 change listener가 불리고 콜백을 받게 됩니다.
콜백의 인자를 tacosConLimon이라고 이름 지었습니다.

다른 Realm의 장점은 객체를 자동으로 업데이트해준다는 것입니다.
limeTacos에 무언가 추가해도 위 코드처럼 같은 RealmResults를 참조하는
두 개의 리스트가 같은 크기임을 확인할 수 있습니다.
이 타코 리스트로 원하는건 뭐든지 할 수 있습니다

### 활용 팁

Realm 사용의 장점과 활용 팁 몇 가지를 공유해 드리겠습니다.
모델에 기본 키 애너테이션으로 ID를 지정했다면,
integer인 ID를 가지고 Realm을 복제하거나 업데이트할 수 있습니다.
즉, 매번 새 객체를 만들지 않고도 메모리 상에 있는 같은 객체를 업데이트할 수 있다는 거죠.

Realm은 Gson과 Retrofit과도 잘 어울립니다.
Realm의 최신 버전을 사용하면 게터와 세터를 커스터마이즈할 수 있습니다.
이전에는 되지 않던 버전이 있었으므로 팁이라고 할 수 있겠습니다.

Realm을 사용하면서 가비지 컬렉션이나 이상한 메모리 경고,
에러 등을 피하기 위해서는 Realm 객체나 RealmResult에
**적용한 change listener를 꼭 지워야 한다는 것입니다**.
**뭔가 참조가 끝난 경우 꼭 change listener를 지우는 것을 잊지 마세요.**

```java
@Override
protected void onDestroy() {

    // Remove the listener.
    realm.removeChangeListener(realmListener);
    //or realm.removeAllChangeListeners();

    // Close the Realm instance.
    realm.close();
    ...
}
```

또한 액티비티, 프래그먼트, 스레드 등의 생명 주기에 따라
**Realm 객체를 닫는 것을 잊지 마세요.**
메모리 유출을 줄이는데 많은 도움이 됩니다.

Realm은 정말 유용한 솔루션을 제공하며,
계속 발전하고 있는 회사로 언젠가 이 문제를 고칠 거라 예상하지만
현재로써는 객체에 스트링 리스트나 원시 타입을 저장할 수 없습니다.
예를 들어 제 타코 객체는 하나의 tag 스트링을 갖는데,
만약 이것이 리스트가 된다면 현재로써는 Realm에 저장할 수 없습니다.
API에서 데이터를 다운받는다면 Gson 어댑터를 받는 것이 좋습니다.
혹은 RealmString 같은 스트링의 새 객체를 만드는 것도 우회책이죠.

만약 Realm에 API에서 가져온 데이터를 저장한다면,
해당 객체를 메모리로부터 Realm으로 복사하고,
Realm 객체에서 이 복사본을 사용한다는 점입니다.
만약 데이터의 크기가 크거나 복잡한 쿼리가 있다면 메인 스레드에서 사용하지 않도록 주의하세요.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
