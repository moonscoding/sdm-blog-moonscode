# ANDROID
## Data Binding Library

<div class="pull-right"> 문스코딩 - 2018.02.21 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [ANDROID](#android)
	* [Data Binding Library](#data-binding-library)
		* [첫 데이터 바인딩 사용하기](#첫-데이터-바인딩-사용하기)
		* [data](#data)
		* [데이터 바인딩 처리하기](#데이터-바인딩-처리하기)
		* [이벤트 처리하기](#이벤트-처리하기)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 첫 데이터 바인딩 사용하기

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
   <data>
       <variable name="user" type="com.example.User"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.firstName}"/>
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.lastName}"/>
   </LinearLayout>
</layout>
```

> data 내에 있는 user 변수는 이 레이아웃 내에서 사용할 수 있는 속성에 대한 설명입니다.

### data

```java
public class User {
   private final String firstName;
   private final String lastName;
   public User(String firstName, String lastName) {
       this.firstName = firstName;
       this.lastName = lastName;
   }
   public String getFirstName() {
       return this.firstName;
   }
   public String getLastName() {
       return this.lastName;
   }
}
```

### 데이터 바인딩 처리하기

기본적으로 해당 레이아웃을 카멜케이스로 표기한 방식으로 작성합니다.
main_activity -> MainActivityBinding 과 같이 처리합니다.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   MainActivityBinding binding = DataBindingUtil.setContentView(this, R.layout.main_activity);
   User user = new User("Test", "User");
   binding.setUser(user);
}
```
> 이렇게 처리하면 이제 "Test User" binding 되어서 나오게 됩니다.

```java
MainActivityBinding binding = MainActivityBinding.inflate(getLayoutInflater());
```

> ListView 어댑터나 RecyclerView 어댑터 내에서 데이터 바인딩 항목을 사용 중인 경우 다음과 같이 처리하는 방법도 있습니다.

```java
ListItemBinding binding = ListItemBinding.inflate(layoutInflater, viewGroup, false);
//or
ListItemBinding binding = DataBindingUtil.inflate(layoutInflater, R.layout.list_item, viewGroup, false);
```

### 이벤트 처리하기

이벤트 처리 방식에는 2가지가 있습니다.
- 메서드 참조 방식
- 리스너 방식

**메서드 참조 방식**

activity에 있는 메서드에 android:onClick을 할당하는 것과
비슷한 방법으로 이벤트를 핸드러 메서드에 직접 바인딩할 수 있습니다.
이 방식은 컴파일시에 처리되므로 컴파일시에 에러가 발생합니다.

```java
public class MyHandlers {
    public void onClickFriend(View view) { ... }
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
   <data>
       <variable name="handlers" type="com.example.Handlers"/>
       <variable name="user" type="com.example.User"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.firstName}"
           android:onClick="@{handlers::onClickFriend}"/>
   </LinearLayout>
</layout>
```

> 식에서 메서드의 서명은 Listener 개게에 있는 메서드의 서명과 정확히 일치해야합니다.

**리스너 방식**

위와 가장 큰 차이점은 이벤트가 트리거 될 때가 아니라
데이터가 바인딩될 때 실제 리스너 구현이 생성된다는 점입니다.
이벤트 발생시 식을 계산하려면 리스너 바인딩 방식을 사용해야 합니다.

```java
public class Presenter {
    public void onSaveClick(Task task){}
}
```

```xml
<?xml version="1.0" encoding="utf-8"?>
  <layout xmlns:android="http://schemas.android.com/apk/res/android">
      <data>
          <variable name="task" type="com.android.example.Task" />
          <variable name="presenter" type="com.android.example.Presenter" />
      </data>
      <LinearLayout android:layout_width="match_parent" android:layout_height="match_parent">
          <Button android:layout_width="wrap_content" android:layout_height="wrap_content"
          android:onClick="@{() -> presenter.onSaveClick(task)}" />
      </LinearLayout>
  </layout>
```
리스너는 식의 루트 요소로만 허용되는 람다식으로 표현됩니다.
식에서 콜백이 사용될 떄 데이터 바인딩이 필요한 리스너를
자동으로 생성하고 이벤트에 등록합니다.

위의 예시에서는 onClick(android.view.View)로 전달되는
view 매개변수를 정의하지 않았습니다.
리스너 바인딩에서는 리스너 매개변수로 두 가지 중에서 선택할 수 있는데,
메서드에 대한 모든 매개변수를 무시하거나 모든 매개변수의 이름을 지정하는 것입니다.
매개변수의 이름을 지정하기로 선택하면 식에 매개변수를 사용할 수 있습니다.
예를 들어, 위의 예시를 다음과 같이 작성할 수 있습니다.

```java
android:onClick="@{(view) -> presenter.onSaveClick(task)}"
```

매개변수 사용시 다음과 같이 처리도 가능합니다.

```java
public class Presenter {
    public void onSaveClick(View view, Task task){}
}
```

```java
android:onClick="@{(theView) -> presenter.onSaveClick(theView, task)}"
```

두 개 이상의 매개변수를 포함한 람다식 사용하기

```java
public class Presenter {
    public void onCompletedChanged(Task task, boolean completed){}
}
```

```xml
<CheckBox android:layout_width="wrap_content" android:layout_height="wrap_content"
      android:onCheckedChanged="@{(cb, isChecked) -> presenter.completeChanged(task, isChecked)}" />
```















---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: android - databinding ](https://developer.android.com/topic/libraries/data-binding/index.html?hl=ko)

[링크2 :: 박상권의 삽질 블로그 - databinding ](http://gun0912.tistory.com/71)

[링크3 :: RealM - 기술블로그](https://academy.realm.io/kr/posts/aw211-android-data-binding-mvp-passive-view-interface/?_ga=2.181838820.2108988985.1519145547-1729386062.1518094211)

Copyright (c) 2017 Copyright Holder All Rights Reserved.
