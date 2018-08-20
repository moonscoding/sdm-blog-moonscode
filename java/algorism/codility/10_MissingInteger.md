
<div class="pull-right">  업데이트 :: 2018.08.19 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [문제](#문제)
* [코드](#코드)
* [결과](#결과)

<!-- /code_chunk_output -->

### 문제

```
This is a demo task.

Write a function:

class Solution { public int solution(int[] A); }

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Assume that:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000..1,000,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N) (not counting the storage required for input arguments).
```


### 코드

> 1차 풀이

```java
import java.util.*;

class Solution {
    public int solution(int[] A) {
        // A에서 없는 가장 작은 양수 정수를 반환
        // - 수가 중복될 수 있음
        // - 음수가 섞여 있음
        // - 음수만 있는 경우
        // [1, 1, 2, 3, 4] -> 5

        Arrays.sort(A);
        int min = 1; // == 나올숫자 ==
        for(int i=0; i<A.length; i++) {
            // == 양수처리 ==
            if(A[i] > 0) {
                // == 나올숫자가 안나왔을때 (종료) ==
                if(A[i] != min)
                    break;
                // == 나올숫자가 나왔을때 (진행) ==
                else {
                    if(i < A.length - 1) {
                        // == 마지막 전 ==
                        if(A[i] != A[i+1]) {
                            min = A[i] + 1;
                        }
                    } else {
                        // == 마지막 차례 ==
                        min = A[i] + 1;
                    }
                }   
            }
            // == 음수 & 0 제외 ==
        }
        return min;
    }
}
```



### 결과

> 1차 100%


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
