# Android
## Input 관련 기능 총정리
<div class="pull-right">  업데이트 :: 2018.04.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android](#android)
	* [Input 관련 기능 총정리](#input-관련-기능-총정리)
		* [01. TextView](#01-textview)
			* [xml](#xml)
			* [xml 글자 흐르게 하기](#xml-글자-흐르게-하기)
			* [java set text / get text](#java-set-text-get-text)
		* [02. EditText](#02-edittext)
		* [03. Button](#03-button)
		* [04. RadioButton](#04-radiobutton)
		* [05. CheckBox](#05-checkbox)
			* [xml](#xml-1)
			* [java click listener](#java-click-listener)
			* [java get status / set state](#java-get-status-set-state)
			* [java toggle](#java-toggle)
		* [06. ProgressBar](#06-progressbar)
		* [07. ToggleButton](#07-togglebutton)
		* [08. Switch](#08-switch)
		* [09. DropDown](#09-dropdown)

<!-- /code_chunk_output -->



### 01. TextView

#### xml

```xml
<TextView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/text1"
      android:text="Text1" />
```

- android:textSize="20sp" :: dp, sp 권장사항 => dp는 현재 사용 중인 디바이스에 의해 결정되지만, sp는 시스템 설정(글꼴 크기)에도 영향을 받습니다.
- android:textColor="#FF0000"
- android:singleLine = "true" :: => maxLine = "1" 동작안함
- android:ellipsize="none" :: start, end, middle, none, marquee

[ellipsize 자세히 보기](http://codeman77.tistory.com/54)

#### xml 글자 흐르게 하기

- android:ellipsize="marquee"
- android:marqueeRepeatLimit = "marquee_forever"
- android:focusable = "true" - 포커스가 있어야 흐르는 효과가 생김

#### java set text / get text

```java
TextView textView1 = (TextView) findViewById(R.id.text1) ;
 textView1.setText("Text is changed.") ;
 textView1.getText() ;
```

### 02. EditText



### 03. Button


### 04. RadioButton


### 05. CheckBox

Button > CompoundButton > CheckBox 의 상속을 받는 구조입니다.

안드로이드의 체크박스 사용법을 배워보도록 하겠습니다.

#### xml

```xml
<CheckBox
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:text="Check"
       android:id="@+id/check1"/>
```

- android:checked="true"
- android:scaleX="1"
- android:scaleY="1"

#### java click listener

```java
CheckBox checkBox = (CheckBox) findViewById(R.id.check1) ;
checkBox.setOnClickListener(new CheckBox.OnClickListener() {
    @Override
    public void onClick(View v) {
        // TODO : process the click event.
    }
});
```

#### java get status / set state

```java
CheckBox checkBox = (CheckBox) findViewById(R.id.check1) ;
if (checkBox.isChecked()) {
    // TODO : CheckBox is checked.
} else {
    // TODO : CheckBox is unchecked.
}

checkBox.setCheck(true) ; // "선택됨" 상태로 변경.
```

#### java toggle

```java
CheckBox checkBox = (CheckBox) findViewById(R.id.check1) ;

checkBox.toggle() ; // CheckBox의 선택 상태를 반대로 변경
```

### 06. ProgressBar

### 07. ToggleButton

### 08. Switch

### 09. DropDown


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
