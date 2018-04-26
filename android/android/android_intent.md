# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right"> 2018.03.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [Intent](#intent)
		* [Intent 페이지 전환](#intent-페이지-전환)
		* [Dart & Henson](#dart-henson)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->

### Intent

Intent는 일종의 메세지 객체입니다.

- 명시적 인텐트

시작할 구성 요소를 이름으로 지정합니다.

- 암시적 인텐트

특정 요소의 이름을 대진 않지만, 그 대신 수행할 일반적인 작업을 선언해서 또 다른 앱의 구성요소가 처리하도록 해줍니다.

### Intent 페이지 전환

```java
Intent intent = new Intent(this, NextActivity.class);
		intent.putExtra("HELLO_KEY", "hello");
		intent.putExtra("WORLD_KEY", 99);
		startActivity(intent);
		finish();
```  

```java
Intent intent = getIntent();s
String hello = intent.getStringExtra("HELLO_KEY");
int world = intent.getIntExtra("WORLD_KEY");
```

### Dart & Henson

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
