
<div class="pull-right">  업데이트 :: 2018.08.15 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [문제](#문제)
* [코드](#코드)
* [결과](#결과)
* [학습](#학습)

<!-- /code_chunk_output -->

### 문제

```
TapeEquilibrium
Minimize the value |(A[0] + ... + A[P-1]) - (A[P] + ... + A[N-1])|.
```


### 코드

> 첫 번째 풀이

```java
import java.util.*;

class Solution {
    public int solution(int[] A) {

        // [주의]
        // 각각 배열은 -1000 ~ 1000

        int sum = 0;
        int[] arrSum = new int[A.length];
        int[] arrDiff = new int[A.length];

        for(int element : A)
            sum += element;

        // == init ==
        arrSum[0] = A[0];
        arrDiff[0] = sum - arrSum[0];

        for(int i=1; i<A.length; i++) {
            arrSum[i] = arrSum[i-1] + A[i];
            arrDiff[i] = Math.abs(arrSum[i] - (sum - arrSum[i]));
        }

        // == test ==
        Arrays.sort(arrDiff);  
        return arrDiff[0];
    }
}
```

> 두 번째 풀이

```java
import java.util.*;

class Solution {
    public int solution(int[] A) {
        // [주의]
        // 각각 배열은 -1000 ~ 1000

        // == Exception ==
        if(A == null || A.length == 0) {
            return 0;
        }

        int sum = 0;
        int[] arrSum = new int[A.length];
        int diff = 0;
        int nowDiff;

        // == sum ==
        for(int element : A)
            sum += element;

        // == init ==
        arrSum[0] = A[0];
        diff = Math.abs(arrSum[0] - (sum-arrSum[0]));

        // == loop ==
        for(int i=1; i<A.length-1; i++) {
            arrSum[i] = arrSum[i-1] + A[i];
            nowDiff = Math.abs( arrSum[i] - (sum - arrSum[i]) );
            if(diff > nowDiff) diff = nowDiff;
        }

        return diff;
    }
}
```


### 결과

> 1차 41%

- 부정확
  - element가 1개거나 2개일때

> 2차 100%

### 학습

예외처리를 정확히
  - 배열이 0개, 1개, 2개일 경우를 주의깊게 확인

배열사용을 신중히


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
