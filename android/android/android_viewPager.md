# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. ViewPager XML](#01-viewpager-xml)
		* [02. FragmentPagerAdapter](#02-fragmentpageradapter)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. ViewPager XML
```xml
<LinearLayout
 xmlns:android="http://schemas.android.com/apk/res/android"
 android:layout_width="match_parent"
 android:layout_height="match_parent">
<android.support.v4.view.ViewPager
 android:id="@+id/viewpager"
 android:layout_width="match_parent"
 android:layout_height="match_parent"/>
</LinearLayout>
```

### 02. FragmentPagerAdapter

페이지 어탭터 선언

```java
public class PagerAdapter extends FragmentPagerAdapter {

    public PagerAdapter(FragmentManager fm) { super(fm); }

    @Override
    public Fragment getItem(int position) {

        // @DES :: 필요에 따라 여기서 프래그먼트를 분기 시킵니다.
        // switch(position) {}

        // 지정된 페이지의 프래그먼트를 인스턴스화하기 위해 getItem이 호출됩니다.
        // laceholderFragment를 반환합니다 (아래의 정적 내부 클래스로 정의 됨).
        return SomeFragment.newInstance(position + 1);
    }

    @Override
    public int getCount() {
        // Show 3 total pages.
        return 3;
    }

}
```

페이지 어탭터 생성

```java
public void onCreateViewPagerAdapter() {
     // 세 가지 각각에 대해 조각을 반환하는 어댑터를 만듭니다.
     // 활동의 기본 섹션.
     pagerAdapter = new PagerAdapter(getSupportFragmentManager());

     // 섹션 어댑터로 ViewPager를 설정하십시오.
     viewPager.setAdapter(pagerAdapter);
 }
```

### 03. View Pager의 2가지 방식

- 데이터를 바인딩하는 방식

- 인스턴스를 올리는 방식
-

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
