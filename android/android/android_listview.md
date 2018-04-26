# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [List 기본](#list-기본)
		* [01. ListView 내장](#01-listview-내장)
		* [02. ListView Custom](#02-listview-custom)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->


### List 기본

```java
List<User> = arrUser;

arrUser.size();
arrUser.add(user);
arrUser.get(position);
arrUser.addAll(users);
arrUser.clear();
```


### 01. ListView 내장

```xml
<ListView android:id="@+id/left_drawer"
                android:layout_width="240dp"
                android:layout_height="match_parent"
                android:layout_gravity="start"
                android:choiceMode="singleChoice"
                android:background="@color/cardview_dark_background"/>
```

```java
ListView listView = (ListView) findViewById(R.id.left_drawer);

final String[] LIST_MENU = {"LIST1", "LIST2", "LIST3"} ;
mDrawerList.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, LIST_MENU));
```

### 02. ListView Custom

```java

```

### 03.

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
