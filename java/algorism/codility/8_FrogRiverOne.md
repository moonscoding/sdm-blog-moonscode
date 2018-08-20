
<div class="pul~l-right">  업데이트 :: 2018.08.16 </div><br>

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
A small frog wants to get to the other side of a river. The frog is initially located on one bank of the river (position 0) and wants to get to the opposite bank (position X+1). Leaves fall from a tree onto the surface of the river.

You are given an array A consisting of N integers representing the falling leaves. A[K] represents the position where one leaf falls at time K, measured in seconds.

The goal is to find the earliest time when the frog can jump to the other side of the river. The frog can cross only when leaves appear at every position across the river from 1 to X (that is, we want to find the earliest moment when all the positions from 1 to X are covered by leaves). You may assume that the speed of the current in the river is negligibly small, i.e. the leaves do not change their positions once they fall in the river.

For example, you are given integer X = 5 and array A such that:

  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4
In second 6, a leaf falls into position 5. This is the earliest time when leaves appear in every position across the river.

Write a function:

class Solution { public int solution(int X, int[] A); }

that, given a non-empty array A consisting of N integers and integer X, returns the earliest time when the frog can jump to the other side of the river.

If the frog is never able to jump to the other side of the river, the function should return −1.

For example, given X = 5 and array A such that:

  A[0] = 1
  A[1] = 3
  A[2] = 1
  A[3] = 4
  A[4] = 2
  A[5] = 3
  A[6] = 5
  A[7] = 4

the function should return 6, as explained above.

Assume that:

N and X are integers within the range [1..100,000];
each element of array A is an integer within the range [1..X].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(X) (not counting the storage required for input arguments).
```


### 코드

> 첫 번째 풀이

```java
import java.util.*;

class Solution {
    public int solution(int X, int[] A) {

        // == Exception ==
        if(A == null)
            return -1;

        for(int i=0; i<A.length; i++) {
            if(A[i] == X) return i;   
        }

        return -1;
    }
}
```

> 두 번째 풀이

```java
import java.util.*;

class Solution {
    public int solution(int X, int[] A) {

        // 개구리는 한번에 한칸씩 움직을 수 있음
        // X까지의 길이 최초 완성되는 순간이 언제인가 ???

        // == Exception ==
        if(A == null)
            return -1;
        if(X > A.length)
            return -1;

        // == init ==
        int position = 0;
        boolean[] paths = new boolean[A.length];
        for(boolean path : paths) path = false;

        for(int i=0; i<A.length; i++) {
            paths[A[i]-1] = true;

            boolean clear = true;
            for(int j=0; j<X; j++) {
                if(!paths[j]) {
                    clear = false;
                    break;   
                }
            }
            if(clear) return i;   
        }

        return -1;
    }
}
```

> 3차 풀이

```java
import java.util.*;

class Solution {
    public int solution(int X, int[] A) {

        // 개구리는 한번에 한칸씩 움직을 수 있음
        // X까지의 길이 최초 완성되는 순간이 언제인가 ???

        // == Exception ==
        if(A == null)
            return -1;
        if(X > A.length)
            return -1;

        // == init ==
        int min = 0;
        boolean[] paths = new boolean[A.length];
        for(boolean path : paths) path = false;

        for(int i=0; i<A.length; i++) {
            paths[A[i]-1] = true;

            boolean clear = true;
            for(int j=min; j<X; j++) {
                if(!paths[j]) {
                    clear = false;
                    break;   
                }
                min = j+1;
            }
            if(clear) return i;   
        }

        return -1;
    }
}
```


### 결과

> 1차 18%

- 부정확
  - single (single element)
  - extreme_frog (frog never across the river)
  - small_random1 (3 random permutation, X = 50)
  - small_random2 (5 random permutation, X = 60)


> 2차 72%

- 포퍼먼스
  - large_random (10 and 100 random permutation, X = ~10,000)
  - large_permutation (permutation tests)
  - large_lange (arithmetic sequences, X = 30,000)

> 3차 100%

### 학습

- 우선 1부터 목적지까지 순열이 존재하지 않으면 해결할 수 없는 문제
- 순열이 완성됬는지 1부터 비교하지 말고 알고 있는 최대값부터 비교


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
