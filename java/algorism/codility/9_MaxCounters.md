
<div class="pull-right">  업데이트 :: 2018.08.17 </div><br>

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
You are given N counters, initially set to 0, and you have two possible operations on them:

increase(X) − counter X is increased by 1,
max counter − all counters are set to the maximum value of any counter.
A non-empty array A of M integers is given. This array represents consecutive operations:

if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
if A[K] = N + 1 then operation K is max counter.
For example, given integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the values of the counters after each consecutive operation will be:

    (0, 0, 1, 0, 0)
    (0, 0, 1, 1, 0)
    (0, 0, 1, 2, 0)
    (2, 2, 2, 2, 2)
    (3, 2, 2, 2, 2)
    (3, 2, 2, 3, 2)
    (3, 2, 2, 4, 2)
The goal is to calculate the value of every counter after all operations.

Write a function:

class Solution { public int[] solution(int N, int[] A); }

that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers representing the values of the counters.

The sequence should be returned as:

a structure Results (in C), or
a vector of integers (in C++), or
a record Results (in Pascal), or
an array of integers (in any other programming language).
For example, given:

    A[0] = 3
    A[1] = 4
    A[2] = 4
    A[3] = 6
    A[4] = 1
    A[5] = 4
    A[6] = 4
the function should return [3, 2, 2, 4, 2], as explained above.

Assume that:

N and M are integers within the range [1..100,000];
each element of array A is an integer within the range [1..N + 1].
Complexity:

expected worst-case time complexity is O(N+M);
expected worst-case space complexity is O(N) (not counting the storage required for input arguments).
```


### 코드

> 1차 풀이

```java
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int[] solution(int N, int[] A) {

        // 만약 A[K]가 1과 N사이면 A[K] 카운터가 1씩 증가
        // 만약 A[K]가 N이상이면 모든 카운터가 최대값인 카운터로 설정

        int max = 0;
        int[] result = new int[N];
        for(int counter : result) counter = 0;

        for(int element : A) {
            if(1 <= element && element <= N) {
                result[element-1] += 1;
                if(result[element-1] > max) max = result[element-1];
            } else {
                for(int i=0; i<result.length; i++) {
                    result[i] = max;
                }
            }
        }

        return result;
    }
}
```



### 결과

> 1차 77%

- 성능
  - large_random2 (large random test, 10000 max_counter operations)
  - extreme_large (all max_counter operations)



### 학습

- 아직 성능 최적화 방법 확인 하지 못함


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
