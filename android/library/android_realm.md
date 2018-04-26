# Android Lib를 통한 간단 코드 적용기
## 강력한 모바일 DB RealM 적용기

<div class="pull-right"> 문스코딩 - 2018.02.08 </div>

---


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android Lib를 통한 간단 코드 적용기](#android-lib를-통한-간단-코드-적용기)
	* [강력한 모바일 DB RealM 적용기](#강력한-모바일-db-realm-적용기)
		* [Realm Configure 설정하기](#realm-configure-설정하기)
		* [Realm 모델(Model) 생성하기](#realm-모델model-생성하기)
		* [Realm 저장하기](#realm-저장하기)
		* [Realm 조회하기](#realm-조회하기)
		* [Realm 수정하기](#realm-수정하기)
		* [Realm 삭제하기](#realm-삭제하기)
		* [Realm 갯수 조회하기](#realm-갯수-조회하기)
		* [Transaction Block 이용해서 새로운 객체저장하기](#transaction-block-이용해서-새로운-객체저장하기)
		* [비동기 Transaction 실행하기](#비동기-transaction-실행하기)
		* [모델간의 관계 규정하기](#모델간의-관계-규정하기)
		* [Realm 삭제하기](#realm-삭제하기-1)
		* [RealmResults, RealmChangeListener](#realmresults-realmchangelistener)
		* [활용 팁](#활용-팁)

<!-- /code_chunk_output -->


### Realm Configure 설정하기

```js
public class SplashActivity extends AppCompatActivity {

    RealmConfiguration realmConfiguration;
    RealmMigration migration;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

				// [#] init
        Realm.init(this);
				getRealmConfig();
    }

    // RealmConfigure
    protected RealmConfiguration getRealmConfig() {
        if (realmConfiguration == null) {
           migration = new RealmMigration() {
               @Override
              public void migrate(DynamicRealm realm, long oldVersion, long newVersion) {
                RealmSchema schema = realm.getSchema();
              }
           };
            realmConfiguration = new RealmConfiguration
                    .Builder()
                    .schemaVersion(0)
                    .migration(migration)
                    .deleteRealmIfMigrationNeeded()
                    .build();
        }
        return realmConfiguration;
    }

}

```

간단 처리

```java
RealmConfiguration realmConfig = new RealmConfiguration.Builder(context).build();
Realm.setDefaultConfiguration(realmConfig);

Realm realm = Realm.getDefaultInstance();
```

### Realm 모델(Model) 생성하기

RealmObject 상속

> 생성자를 사용하지 않음, 사용시 에러 발생

```java
public class Taco extends RealmObject {
    private String description;
    private String tag;
    private String imageUrl;
    private boolean favorite;


    // generator [getters and setters]
}
```
> "새 스레드에서 Realm을 사용할 때마다 새 Realm 인스턴스를 가져와야 합니다."

### Realm 저장하기

```java
Realm realm = Realm.getDefaultInstance();
realm.beginTransaction();

// [#] 관리되지 않는 객체 유지 (unmanaged)- 미리 생성된 객체
final Taco managedTaco = realm.copyToRealm(unmanagedTaco);

// [#] 관리되는 객체 유지 (managed)
// Taco user = realm.createObject(Taco.class);
// user.setName("John");
// user.setAge("30");

realm.commitTransaction();
```

### Realm 조회하기

샘플1

```java
Realm realm = Realm.getDefaultInstance();

final RealmResults<Taco> likedTacos = realm
	.where(Taco.class)
	.equalTo("favorite", true)
	.findAll();
```

샘플2

```js
// [#] normal
RealmQuery<User> query = realm.where(User.class);
query.equalTo("name", "John");
query.or().equalTo("name", "Peter");
RealmResults<User> result1 = query.findAll();

// [#] chaining
RealmResults<User> result2 = realm.where(User.class)
                                  .equalTo("name", "John")
                                  .or()
                                  .equalTo("name", "Peter")
                                  .findAll();
```

### Realm 수정하기

```js
final RealmResults<Todo> todos = realm.where(Todo.class)
	 .equalTo("id", id)
	 .findAll();

 final String innerTitle = title;
 realm.executeTransaction(new Realm.Transaction() {
		 @Override
		 public void execute(Realm realm) {
				 todos.get(0).setTitle(innerTitle);
		 }
 });
```

### Realm 삭제하기

```js
final RealmResults<Dog> results = realm.where(Dog.class).findAll();

// 데이터에 대한 모든 변경은 트랜잭션에서 이루어져야 합니다
realm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm realm) {
        // 맞는 데이터 하나를 삭제합니다
        results.deleteFirstFromRealm();
        results.deleteLastFromRealm();

        // 하나의 객체를 삭제합니다
        Dog dog = results.get(5);
        dog.deleteFromRealm();

        // 전체 맞는 데이터를 삭제합니다
        results.deleteAllFromRealm();
    }
});
```

### Realm 갯수 조회하기

```js

```

### Transaction Block 이용해서 새로운 객체저장하기

```js
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

Realm에서 새 객체를 만들고 description과 이미지를 설정합니다.

이블록이 실행되면 데이터 베이스 내에 저장됩니다.

### 비동기 Transaction 실행하기

```java
Realm realm = Realm.getDefaultInstance();

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

다시 실행 블록을 사용해서 executeTransactionAsync를 호출하고 필요한 세터를 설정합니다.

그러면 Realm이 onSuccess와 onError, 두 가지 콜백을 돌려줍니다.

이 시점에서 사용자에게 에러 등의 메시지를 보낼 수 있죠.

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

### Realm 삭제하기

```java
Realm realm = Realm.getDefaultInstance();

// All changes to data must happen in a transaction
realm.executeTransaction(new Realm.Transaction() {
    @Override
    public void execute(Realm realm) {
        // [#] remove single match
        limeTacos.deleteFirstFromRealm();

		// [#] remove single match
		limeTacos.deleteLastFromRealm();

        // [#] remove a single object
        Taco fishTaco = limeTacos.get(1);
        fishTaco.deleteFromRealm();

        // [#] Delete all matches
        limeTacos.deleteAllFromRealm();
    }
});
```

limeTacos를 가져왔는데 라임이 아니라 라임스톤을 가져왔다고 가정하고 선호 리스트에서 지워봤습니다.

### RealmResults, RealmChangeListener

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

limeTacos에 ==change-listener== 를 달았습니다.
뭔가 추가되거나 리스트 내의 객체가 바뀌면 이 change-listener가 불리고 콜백을 받게 됩니다.

콜백의 인자를 tacosConLimon이라고 이름 지었습니다.

다른 Realm의 장점은 객체를 자동으로 업데이트해준다는 것입니다.
limeTacos에 무언가 추가해도 위 코드처럼 같은 RealmResults를 참조하는
두 개의 리스트가 같은 크기임을 확인할 수 있습니다.
이 타코 리스트로 원하는건 뭐든지 할 수 있습니다

### 활용 팁

Realm 사용의 장점과 활용 팁 몇 가지를 공유해 드리겠습니다.

모델에 기본 키 애너테이션으로 ID를 지정했다면,

integer인 ID를 가지고 Realm을 복제하거나 업데이트할 수 있습니다.

> "즉, 매번 새 객체를 만들지 않고도 메모리상에 있는 같은 객체를 업데이트할 수 있다는 거죠."

Realm은 Gson과 Retrofit과도 잘 어울립니다.

Realm의 최신 버전을 사용하면 게터와 세터를 커스터마이즈할 수 있습니다.

이전에는 되지 않던 버전이 있었으므로 팁이라고 할 수 있겠습니다.

Realm을 사용하면서 가비지 컬렉션이나 이상한 메모리 경고,

에러 등을 피하기 위해서는 Realm 객체나 RealmResult에 **적용한 change-listener를 꼭 지워야 한다는 것입니다**

==뭔가 참조가 끝난 경우 꼭 change listener를 지우는 것을 잊지 마세요.==

```java
@Override
protected void onDestroy() {

    // Remove the listener.
    realm.removeChangeListener(realmListener);
    // or realm.removeAllChangeListeners();

    // Close the Realm instance.
    realm.close();
    ...
}
```

또한 액티비티, 프래그먼트, 스레드 등의 생명 주기에 따라 ==Realm 객체를 닫는 것을 잊지 마세요.==

메모리 유출을 줄이는데 많은 도움이 됩니다.

Realm은 정말 유용한 솔루션을 제공하며, 계속 발전하고 있는 회사로 언젠가 이 문제를 고칠 거라 예상하지만

현재로써는 객체에 스트링 리스트나 원시 타입을 저장할 수 없습니다.

예를 들어 제 타코 객체는 하나의 tag 스트링을 갖는데, 만약 이것이 리스트가 된다면 현재로써는 Realm에 저장할 수 없습니다.

API에서 데이터를 다운받는다면 Gson 어댑터를 받는 것이 좋습니다.

혹은 RealmString 같은 스트링의 새 객체를 만드는 것도 우회책이죠.

만약 Realm에 API에서 가져온 데이터를 저장한다면,

해당 객체를 메모리로부터 Realm으로 복사하고,

Realm 객체에서 이 복사본을 사용한다는 점입니다.

만약 데이터의 크기가 크거나 복잡한 쿼리가 있다면 메인 스레드에서 사용하지 않도록 주의하세요.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: http://devstory.ibksplatform.com/2017/11/android-realm-1.html](http://devstory.ibksplatform.com/2017/11/android-realm-1.html)

[링크2 :: http://devstory.ibksplatform.com/2017/11/android-realm-2.html](http://devstory.ibksplatform.com/2017/11/android-realm-2.html)

[링크3 :: realm docs](https://realm.io/kr/docs/java/latest/#deletion)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
