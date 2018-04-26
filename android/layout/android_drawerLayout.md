# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. DayoutLayout이란,](#01-dayoutlayout이란)
		* [02. 레이아웃 구성](#02-레이아웃-구성)
		* [03. 메뉴 구성](#03-메뉴-구성)
		* [04. 프레그먼트 생성](#04-프레그먼트-생성)
		* [05. 액비티비구성](#05-액비티비구성)
		* [06. 속성](#06-속성)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. DayoutLayout이란,

왼쪽으로 부터 메뉴 화면이 나오는 레이아웃을 말합니다.

다음과 같이 꼭 ActionBar에만 붙여야 하는 것은 아닙니다.

DrawerLayout을 직접적으로 코드에서 설정하는 방법도 있습니다.
```java
DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
if (!drawer.isDrawerOpen(Gravity.LEFT)) {
    drawer.openDrawer(Gravity.LEFT) ;
}
```

### 02. 레이아웃 구성

```xml
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <android.support.v4.widget.DrawerLayout
        android:id="@+id/drawerLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent" >
        <!-- Main -->
          <FrameLayout
              android:id="@+id/content_frame"
              android:layout_width="match_parent"
              android:layout_height="match_parent" />
          <!-- Drawer -->
          <ListView android:id="@+id/left_drawer"
              android:layout_width="240dp"
              android:layout_height="match_parent"
              android:layout_gravity="start"
              android:choiceMode="singleChoice"
              android:divider="@android:color/transparent"
              android:dividerHeight="0dp"
              android:background="#111"/>

    </android.support.v4.widget.DrawerLayout>
</LinearLayout>
```

### 03. 메뉴 구성

```xml
<menu
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" >

    <item
        android:id="@+id/menu1"
        android:orderInCategory="100"
        android:showAsAction="always"
        android:icon="@android:drawable/ic_menu_gallery"
        android:title="menu1"/>

    <item
        android:id="@+id/menu2"
        android:orderInCategory="200"
        android:showAsAction="never"
        android:title="menu2"/>

    <item
        android:id="@+id/menu3"
        android:orderInCategory="300"
        android:showAsAction="never"
        android:title="menu3"/>
</menu>
```

### 04. 프레그먼트 생성

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="10dp" >

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello Setting Fragment!" />

</LinearLayout>
```

```java
public class HomeFragment extends Fragment {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        return view;
    }
}
```

### 05. 액비티비구성

```java

```


### 06. 속성

```js
mDrawerLayout.isDrawerOpen(GravityCompat.START); // [#] return boolean
mDrawerLayout.closeDrawer(GravityCompat.START); // [#] close drawer
```



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
