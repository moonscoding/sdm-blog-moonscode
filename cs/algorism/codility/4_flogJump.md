# 코딜리티
## Odd Ocuurence In Array
<div class="pull-right">  업데이트 :: 2018.06.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [코딜리티](#코딜리티)
	* [Odd Ocuurence In Array](#odd-ocuurence-in-array)
		* [01. 코드](#01-코드)
		* [02. 결과](#02-결과)
		* [03. 학습](#03-학습)

<!-- /code_chunk_output -->

### 01. 코드

```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int X, int Y, int D) {
        // write your code in Java SE 8

        // 개구리가 x에서 y보다 크거나 같은 위치로 가고 싶어함
        // 개구리는 항상 고정된 D를 점프

        int distance = Y - X;

        // System.out.println(distance);
        // System.out.println(D);
        // System.out.println((double)distance / (double)D);
        // System.out.println(Math.ceil((double)distance / (double)D));
        // System.out.println((int) Math.ceil((double)distance / (double)D));
        return (int) Math.ceil((double)distance / (double)D);
    }
}
```

### 02. 결과

100%

### 03. 학습

없음




---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
