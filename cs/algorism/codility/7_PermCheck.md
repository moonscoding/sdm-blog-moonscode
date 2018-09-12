
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
Counting Elements > PermCheck
Check whether array A is a permutation.
```


### 코드

> 첫 번째 풀이

```java
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {

        // [배열의 순열을 파악하는 문제]        
        // A의 길이 1~10000000000 (충분히큰수)
        // N의 크기 1~10000000000 (층븐히큰수)
        // => 배열이 반드시 1부터 시작하나 ? 아니라고 가정

        // == Exception ==
        if(A == null || A.length == 1) {
            return 1;
        }

        Arrays.sort(A);
        for(int i=1; i<A.length; i++) {
            if(A[i] != A[i-1] + 1) {
                return 0;
            }
        }

        return 1;
    }
}
```

> 두 번째 풀이

```java
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {
    public int solution(int[] A) {

        // [배열의 순열을 파악하는 문제]        
        // A의 길이 1~10000000000 (충분히큰수)
        // N의 크기 1~10000000000 (층븐히큰수)
        // => 배열이 반드시 1부터 시작

        // == Exception ==
        if(A == null)
            return 0;

        Arrays.sort(A);
        if(A[0] != 1)
            return 0;

        for(int i=1; i<A.length; i++) {
            if(A[i] != A[i-1] + 1) {
                return 0;
            }
        }

        return 1;
    }
}
```


### 결과

> 1차 66%

- 부정확
  - extreme_min_max (single element with minimal/maximal value)
  - single (single element)
  - double (two elements)
  - permutations_of_ranges (permutations of sets like [2..100] for which the anwsers should be false)
- 배열이 반드시 1부터 시작해야하는 것을 간과

> 2차 100%

### 학습

없음


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
