# TITLE (UpperCase)
## 안드로이드 Navigation View 처리하기
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [안드로이드 Navigation View 처리하기](#안드로이드-navigation-view-처리하기)
		* [01. XML 만들기](#01-xml-만들기)
		* [02. app:menu](#02-appmenu)
		* [03. app:headerLayout](#03-appheaderlayout)

<!-- /code_chunk_output -->



### 01. XML 만들기

DrawerLayout과 같이 동작합니다.

```xml
<!-- NAV -->
<android.support.v4.widget.DrawerLayout>

	<!-- Main -->
	<LinearLayout></LinearLayout>

	<!-- Side -->
	<android.support.design.widget.NavigationView
			android:id="@+id/nav_view"
			android:layout_width="wrap_content"
			android:layout_height="match_parent"
			android:layout_gravity="start"
			android:fitsSystemWindows="false"
			android:background="@color/material_blue_grey_800"
			android:scrollbars="none"
			app:headerLayout="@layout/nav_header"
			app:itemTextAppearance="@style/TextAppearance.AppCompat.Medium"
			app:menu="@menu/menu_drawer"
			app:itemIconTint="@color/material_grey_600"
			app:itemTextColor="@color/material_grey_300"
			app:theme="@style/DrawerStyle"/>
</android.support.v4.widget.DrawerLayout>
```
- android:background
- app:menu
- app:headerLayout

### 02. app:menu

이 부분은 navigation view의 메뉴에 해당하는 부분입니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<menu
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:yourapp="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".views.HomeActivity"
    >

    <item
        android:id="@+id/menu1"
        android:orderInCategory="100"
        android:icon="@android:drawable/ic_menu_gallery"
        yourapp:showAsAction="always"
        android:title="menu1"/>

    <item
        android:id="@+id/menu2"
        android:orderInCategory="200"
        yourapp:showAsAction="never"
        android:title="menu2"/>

    <item
        android:id="@+id/menu3"
        android:orderInCategory="300"
        yourapp:showAsAction="never"
        android:title="menu3"/>

</menu>
```

### 03. app:headerLayout

이 부분은 navigation view에서 header에 해당하는 layout입니다.

app:headerLayout 속성으로 추가할 수 있습니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="140dp"
    android:orientation="vertical"
    android:background="@color/material_blue_grey_800"
    android:theme="@style/ThemeOverlay.AppCompat.Dark">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:gravity="center"
        android:paddingTop="16dp"
        android:orientation="vertical">
        <ImageView
            android:layout_width="80dp"
            android:layout_height="80dp"
            android:tint="@color/colorPrimary"
            android:src="@drawable/ic_menu_share"/>
    </LinearLayout>
</RelativeLayout>
```



---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
