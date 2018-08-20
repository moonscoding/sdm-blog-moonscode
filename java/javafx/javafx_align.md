# JAVA FX
## Align 정렬
<div class="pull-right">  업데이트 :: 2018.07.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [Align 정렬](#align-정렬)
		* [01. Padding & Margin](#01-padding-margin)
			* [Padding](#padding)
			* [Margin](#margin)
		* [02.](#02)
		* [03.](#03)

<!-- /code_chunk_output -->

### 01. Padding & Margin

#### Padding

```java
HBox hbox = new HBox();
hbox.setPadding(new Insets(50));
```

```xml
<HBox>
	<padding>
		<Insets topRightBottomLeft="50" />
	</padding>
</HBox>
```

#### Margin

```java
HBox hbox = new HBox();
Button button = new Button();
hbox.setMargin(button, new Insets(50));
```

```xml
<Button>
	<HBox.margin>
		<Insets topRightBottomLeft="50" />
	</HBox.margin>
</Button>
```


### 02.

### 03.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
