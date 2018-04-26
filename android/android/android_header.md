# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right"> 2018.03.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. Header 만들기](#01-header-만들기)
			* [Header 이름 바꾸기](#header-이름-바꾸기)
		* [02. Header에 버튼 추가하기](#02-header에-버튼-추가하기)
		* [03. AndroidManifest에서 actionbar 없애기](#03-androidmanifest에서-actionbar-없애기)
		* [04. ActioBar와 Toolbar](#04-actiobar와-toolbar)

<!-- /code_chunk_output -->



### 01. Header 만들기

#### Header 이름 바꾸기

```java
// Native
setTitle("List Activity");
```

### 02. Header에 버튼 추가하기

액션바 설정 xml 중에 showAsAction 설정 부분이 있습니다.

app:showAsAction="always" : 항상 보이게 표시
app:showAsAction="never" : 항상 overflow 에 표시
app:showAsAction="ifRoom" : 액션바에 공간이 있을경우 표시
app:showAsAction="withText" : 액션바에 아이콘과 텍스트 함께 표시

> 'xmlns:yourapp="http://schemas.android.com/apk/res-auto'

다음 부분을 추가해야 사용할 수 있습니다.

```java
<?xml version="1.0" encoding="utf-8"?>
<menu
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:yourapp="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools" tools:context=".activitys.ListActivity"
    >

    <!-- 액션 버튼으로써 나타나는 "서치" 아이템  -->
    <item android:id="@+id/action_plus"
        android:icon="@drawable/ic_launcher_background"
        android:title="@string/action_menu_1"
        yourapp:showAsAction="ifRoom" />

    <!-- 오버플로우 공간 안에 있는 "셋팅" 액션 아이템 -->
    <item android:id="@+id/action_minus"
        android:title="@string/action_menu_1"
        yourapp:showAsAction="never" />

</menu>
```

```java
// [#] 액션을 액션 바에 추가하기
  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
      // Inflate the menu items for use in the action bar
      MenuInflater inflater = getMenuInflater();
      inflater.inflate(R.menu.list_action_menu, menu);
      return super.onCreateOptionsMenu(menu);
  }
```

```js
// [#] 액션 버튼이 동작하게 만들기
  @Override
  public boolean onOptionsItemSelected(MenuItem item) {
      // Handle presses on the action bar items
      switch (item.getItemId()) {
          case R.id.action_plus:
              Toast.makeText(this,"I'm Action Plus !",Toast.LENGTH_SHORT).show();
              return true;
          case R.id.action_minus:
              Toast.makeText(this,"I'm Action Minus !",Toast.LENGTH_SHORT).show();
              return true;
          default:
              return super.onOptionsItemSelected(item);
      }
  }
```

### 03. AndroidManifest에서 actionbar 없애기

```js
<activity
	android:name=".MainActivity"
	android:label="@string/app_name"
	android:theme="@style/AppTheme.NoActionBar">
		<intent-filter>
					<action android:name="android.intent.action.MAIN" />
					<category android:name="android.intent.category.LAUNCHER" />
		</intent-filter>
</activity>
```

기본적으로 ActionBar를 가지고 있습니다.

android:theme="@style/AppTheme.NoActionBar" 다음의 속성으로 ActionBar를 제거해야합니다.

### 04. ActioBar와 Toolbar

```java
@BindView(R.id.toolbar)
Toolbar toolbar;

ActionBar actionBar;

// [#] toolbar setting
private void initToolbar(){
		setSupportActionBar(toolbar);
		actionBar = getSupportActionBar();
		actionBar.setDisplayHomeAsUpEnabled(true);
		actionBar.setHomeButtonEnabled(true);
}
```

- setSupportActionBar
- getSupportActionBar
- setDisplayHomeAsUpEnabled
- setHomeButtonEnabled

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
