
<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [문제](#문제)
* [코드](#코드)
* [결과](#결과)

<!-- /code_chunk_output -->

### 문제

```
Maximize A[P] * A[Q] * A[R] for any triplet (P, Q, R).
```


### 코드

> 1차 풀이

```java
import java.util.*;
class Solution {
    public int solution(int[] A) {

        // 3개의 요소의 곱이 가장 큰것
        // (-)가 3개일때 => (-)
        // (-)가 2개일때 => (+)
        // (-)가 1개일때 => (-)
        // (-)가 0개일때 => (+)

        Arrays.sort(A);

        if(A[0] * A[1] > A[A.length-2] * A[A.length-1]) {
            return A[0] * A[1] * A[A.length-1];
        } else {
            return A[A.length-3] * A[A.length-2] * A[A.length-1];
        }
    }
}
```

>2차 풀이

```java
import java.util.*;
class Solution {
    public int solution(int[] A) {

        // 3개의 요소의 곱이 가장 큰것
        // (-)가 3개일때 => (-)
        // (-)가 2개일때 => (+)
        // (-)가 1개일때 => (-)
        // (-)가 0개일때 => (+)

        Arrays.sort(A);
        // [ -4, -3, -2, -1, 0, 1, 2, 3, 4 ]

        // == 전방 2개 && 후방 1개 vs 후방 3개 ==
        int caseA = A[0] * A[1] * A[A.length-1];
        int caseB = A[A.length-3] * A[A.length-2] * A[A.length-1];
        return (caseA > caseB) ? caseA : caseB;
    }
}

```

### 결과

> 1차 66%

- 정확 : 50%
- 성능 : 80%

> 2차  100%

- 정확 : 100%
- 성능 : 100%

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
