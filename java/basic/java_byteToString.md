
<div class="pull-right">  업데이트 :: 2018.08.06 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [01. byte array to string](#01-byte-array-to-string)
* [02. string to byte array](#02-string-to-byte-array)
* [03. string to char array](#03-string-to-char-array)

<!-- /code_chunk_output -->

### 01. byte array to string

바이트단위의 패킷을 전송하고 싶을때

```java
byte[] bytes = new byte[]{ 1, 2 };
String data = new String(data, "UTF-8");
```

data는 2바이트의 크기를 가진 유니코드 스트링

### 02. string to byte array

```java
String data = getRequest(); // 데이터를 수신했다가정
byte[] bytes = data.getBytes();
```

유니코드를 다시 바이트배열(1바이트)로 변환해서 사용

### 03. string to char array

```java
String data = getRequest(); // 데이터를 수신했다가정
char[] chars = data.toCharArray();
```

유니코드배열(2바이트)로 변환해서 사용

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
