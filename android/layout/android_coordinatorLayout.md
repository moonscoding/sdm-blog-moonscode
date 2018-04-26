# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. coordinatorLayout](#01-coordinatorlayout)
		* [02. coordinatorLayout 예제](#02-coordinatorlayout-예제)
		* [03. BottomSheet Behavior](#03-bottomsheet-behavior)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. coordinatorLayout

머트리얼 디자인 가이드 라인중 스크롤시 다양한 반응을 위한 테크닉인 Behavior라는 개념이 도입 되었습니다.

기본적으로 액션바를 확장하여 스크롤시 액션바를 줄여들게 하도록 AppBarLayout의 ScrollingViewBehavior와

스크롤시 하단으로 숨기게 하기위해 BottomSheetBehavior를 서포트라이브러리에서 제공하고 있습니다.

Behavior를 사용하기 위해서는 CoordinatorLayout을 통해서 사용되는데,

CoordinatorLayout은 자식뷰의 스크롤의 변화 상태를 다른 자식뷰들에게 전달 해주는 역할을 합니다.

좀더 쉽게 말해 NestedScrollView나 RecyclerView등에 스크롤의 상태를 판단하여 정의된 반응을 하기위한 View에 Behavior를 등록하면 됩니다.

### 02. coordinatorLayout 예제

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    <android.support.design.widget.AppBarLayout
        android:id="@+id/app_bar"
        android:layout_width="match_parent"
        android:layout_height="@dimen/app_bar_height"
        android:fitsSystemWindows="true"
        android:theme="@style/AppTheme.AppBarOverlay">
        <android.support.design.widget.CollapsingToolbarLayout
            android:id="@+id/toolbar_layout"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:fitsSystemWindows="true"
            app:contentScrim="?attr/colorPrimary"
            app:layout_scrollFlags="scroll|exitUntilCollapsed">
            <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                app:layout_collapseMode="pin"
                app:popupTheme="@style/AppTheme.PopupOverlay" />
        </android.support.design.widget.CollapsingToolbarLayout>
    </android.support.design.widget.AppBarLayout>

    <android.support.v4.widget.NestedScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="android.support.design.widget.AppBarLayout$ScrollingViewBehavior">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="@dimen/text_margin"
            android:text="@string/large_text" />

    </android.support.v4.widget.NestedScrollView>
</android.support.design.widget.CoordinatorLayout>
```

### 03. BottomSheet Behavior

AppCompat V23.2에서 머트리얼 디자인 가이드 중 BottomSheet를 구현한  위젯이 추가 되었다.

기존의 CoordinatorLayout에 하나의 행동 방법으로 BottomSheet가 구현되었다.

또한 독립적으로 사용하기 위해 BottomSheetFragmentDialog를 이용하여 다이얼로그형태로도 사용가능하다.

CoordinatorLayout의 Bottom Sheet Behavior를 어떻게 사용하는지 알아보자.

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
