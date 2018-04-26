# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. menu](#01-menu)
		* [02. fragment](#02-fragment)
		* [03. searView](#03-searview)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. menu

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <!-- SEARCH - always -->
    <item android:id="@+id/action_search"
        android:title="Search"
        android:icon="@drawable/icon_search_black"
        app:actionViewClass="android.support.v7.widget.SearchView"
        app:showAsAction="always"  />

    <!-- REFRESH - always -->
    <item android:id="@+id/action_refresh"
        android:title="Refresh"
        android:icon="@drawable/icon_refresh_black"
        app:showAsAction="always"  />

    <!-- LIST 처리 - never >>> -->
    <item
        android:id="@+id/action_rate"
        android:orderInCategory="100"
        android:title="Rate"
        app:showAsAction="never" />
    <item
        android:id="@+id/action_about"
        android:orderInCategory="100"
        android:title="About"
        app:showAsAction="never" />
    <item
        android:id="@+id/action_etc"
        android:orderInCategory="100"
        android:title="Etc"
        app:showAsAction="never" />
    <!-- LIST 처리 - never <<< -->

</menu>

```

### 02. fragment

프래그먼트에서 액티비티의 ActionBar속성을 사용하고 싶다면 다음을 추가해 주세요.

```java
@Override
public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    View view = inflater.inflate(R.layout.fragment_todo_list, container, false);

    // [#] activity menu를 사용하고 싶다면
    setHasOptionsMenu(true);

    return view;
}
```

### 03. searView

### 용어정리
```

```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
