# 코딜리티
## Cyclic Rotation
<div class="pull-right">  업데이트 :: 2018.06.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [코딜리티](#코딜리티)
	* [Cyclic Rotation](#cyclic-rotation)
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

    public int[] solution(int[] A, int K) {
        // write your code in Java SE 8

        // field
        int[] arrTarget = A;
        int rotateCount = K;

        // # 1.
        for(int i=0; i<rotateCount; i++) {
            arrTarget = this.rotateArray(arrTarget);   
        }

        return arrTarget;
    }

    public int[] rotateArray(int[] arr) {

        int[] arrTarget = arr;
        int[] newTarget = new int[arrTarget.length];

        newTarget[0] = arrTarget[arrTarget.length-1];
        for(int i=0; i<arrTarget.length-1; i++) {
            newTarget[i+1] = arrTarget[i];
        }

        return newTarget;
    }
}
```

### 02. 결과

87%

- 입력 ([], 1)의 경우 솔루션이 예기치 않게 종료되었습니다.

### 03. 학습

- 정적인 배열을 사용할때는 new int[]를 사용할 것

- 예외처리를 항상 신경쓸것
  - 매개변수가 배열일 경우에는 [] 케이스를 주의할 것


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
