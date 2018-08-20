# Android
## Dialog
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android](#android)
	* [Dialog](#dialog)
		* [들어가기전에](#들어가기전에)
		* [01. AlertDialog](#01-alertdialog)
			* [java](#java)
		* [02.  Custom Dialog 만들기](#02-custom-dialog-만들기)
			* [xml](#xml)
			* [java](#java-1)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->


### 들어가기전에

Dialog와 AlertDialog의 차이를 알아야 합니다.

이 둘은 Dialog > AlertDialog 과 같은 상속 구조를 같습니다.

지극히 특별한 경우가 아니랄면 AlertDialog로 대부분의 Dialog를 만들 수 있습니다.

### 01. AlertDialog

#### java

```java
public void showDialog() {
   AlertDialog.Builder alert = new AlertDialog.Builder(this);
   alert.setTitle("Title");
   alert.setMessage("Message");

   // Set an EditText view to get user input
   final EditText edtTitle = new EditText(this);
   final EditText edtContents = new EditText(this);
   alert.setView(edtTitle);
   alert.setView(edtContents);
   alert.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
       public void onClick(DialogInterface dialog, int whichButton) {
           // Do something with value!
       }
   });
   alert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
       public void onClick(DialogInterface dialog, int whichButton) {
           // Canceled.
       }
   });
   alert.show();
}
```

- setTitle
- setMessage
- setView
- setPositiveButton
- setNegativeButton

### 02.  Custom Dialog 만들기

#### xml

```

```

#### java

```java
AlertDialog.Builder builder = new AlertDialog.Builder(this);
LayoutInflater inflater = this.getLayoutInflater();

builder.setView(inflater.inflate(R.layout.home_dialog_todo_write, null))
        // Add action buttons
        .setPositiveButton("ok", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int id) {

            }
        })
        .setNegativeButton("cancel", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {

            }
        });
builder.show();
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
