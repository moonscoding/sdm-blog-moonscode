
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
Counting Elements > FrogRiverOne
Find the earliest time when a frog can jump to the other side of a river.
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
