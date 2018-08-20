
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
A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

For example, consider array A such that:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3

We can split this tape in four places:

P = 1, difference = |3 − 10| = 7
P = 2, difference = |4 − 9| = 5
P = 3, difference = |6 − 7| = 1
P = 4, difference = |10 − 3| = 7
Write a function:

class Solution { public int solution(int[] A); }

that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

For example, given:

  A[0] = 3
  A[1] = 1
  A[2] = 2
  A[3] = 4
  A[4] = 3

the function should return 1, as explained above.

Assume that:

N is an integer within the range [2..100,000];
each element of array A is an integer within the range [−1,000..1,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N) (not counting the storage required for input arguments).
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
