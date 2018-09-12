
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
Counting Elements > MaxCounters
Calculate the values of counters after applying all alternating operations: increase counter by 1; set value of all counters to current maximum.
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
