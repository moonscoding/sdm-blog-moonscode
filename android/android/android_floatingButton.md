# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. Floating 버튼](#01-floating-버튼)
		* [02.](#02)
		* [02.](#02-1)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. Floating 버튼

공중에 떠있는 듯한 그림자 효과 UI

애니메이션적 특징

xml 속성인 fabSize를 이용하여 크기를 정할 수 있고, 크기를 정하지 않을시 default 사이즈로 셋팅이 된다.

이미지뷰(ImageView) 위젯을 상속 받았기 때문에 이미지뷰 와 똑같이 이미지를 셋팅할 수 있고,

버튼의 색상은 theme 색깔인 colorAccent 기준으로 정해진다. 만약 코드로 바꾸고 싶다면,

setBackgroundTintList( 컬러값 ) 으로 바꿀 수 있다.

### 02.

> CoordinatorLayout이랑 같이 사용해야 한다는 점이다 (중요)

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">

    <FrameLayout
        android:id="@+id/frameLayout"
        android:background="#ffff0000"
        android:layout_width="match_parent"
        android:layout_height="300dp"/>

    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        android:src="@android:drawable/ic_dialog_email" />

</android.support.design.widget.CoordinatorLayout>

```



### 02.

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
