# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. dialog 내장](#01-dialog-내장)
		* [02. dialog 커스텀](#02-dialog-커스텀)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. dialog 내장

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

### 02. dialog 커스텀

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
