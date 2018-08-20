# 코딜리티
## Perm Missing Elem
<div class="pull-right">  업데이트 :: 2018.06.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [코딜리티](#코딜리티)
	* [Perm Missing Elem](#perm-missing-elem)
		* [01. 코드](#01-코드)
		* [02. 결과](#02-결과)
		* [03. 학습](#03-학습)

<!-- /code_chunk_output -->

### 01. 코드

첫번째풀이

```java
// you can also use imports, for example:
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8

        // N개의 서로다른 정수를 가진 배열 A
        // N+1의 범위에서 오직 1개가 누락, 누락을 찾아라

        int returnNum = 0;

        // 정렬은 어떻게 하는가 ???
        Arrays.sort(A);

        int i=0;
        while(i != A.length) {
            // System.out.println(i+1);
            // System.out.println(A[i]);
            if((i+1) != A[i]) {
                returnNum = A[i] - 1;
                break;     
            }    
            i++;
        }

        // System.out.println(returnNum);
        return returnNum;
    }
}
```

두번째풀이

```java
// you can also use imports, for example:
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {
        // write your code in Java SE 8

        // N개의 서로다른 정수를 가진 배열 A
        // N+1의 범위에서 오직 1개가 누락, 누락을 찾아라

        // TEST code
        // A = new int[]{1,2,3};

        int returnNum = 1;

        // 정렬은 어떻게 하는가 ???
        Arrays.sort(A);

        int i=0;
        boolean flag=false;

        // empty array
        if(A.length == 0) {
            return returnNum;
        }

        while(i != A.length) {
            // System.out.println(i+1);
            // System.out.println(A[i]);
            if((i+1) != A[i]) {
                flag = true;
                returnNum = A[i] - 1;
                break;     
            }    
            i++;
        }

        // last element
        if(!flag) {
            returnNum = A.length + 1;
        }

        // System.out.println(returnNum);
        return returnNum;
    }
}
```

### 02. 결과

50%

- 배열의 예외처리코드 부족합니다. (파라미터에서 배열은 항상 조심할 것)

100%

### 03. 학습

배열을 파라미터로 가질때 문제점 (예외사항)
- empty
- single
- first
- last

정렬알고리즘 어떻게 하는지 학습하기


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
