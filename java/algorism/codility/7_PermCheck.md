
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
A non-empty array A consisting of N integers is given.

A permutation is a sequence containing each element from 1 to N once, and only once.

For example, array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3
    A[3] = 2

is a permutation, but array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3

is not a permutation, because value 2 is missing.

The goal is to check whether array A is a permutation.

Write a function:

class Solution { public int solution(int[] A); }

that, given an array A, returns 1 if array A is a permutation and 0 if it is not.

For example, given array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3
    A[3] = 2

the function should return 1.

Given array A such that:

    A[0] = 4
    A[1] = 1
    A[2] = 3

the function should return 0.

Assume that:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [1..1,000,000,000].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(N) (not counting the storage required for input arguments).
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
