
<div class="pull-right">  업데이트 :: 2018.08.19 </div><br>

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
A non-empty array A consisting of N integers is given. The consecutive elements of array A represent consecutive cars on a road.

Array A contains only 0s and/or 1s:

0 represents a car traveling east,
1 represents a car traveling west.
The goal is to count passing cars. We say that a pair of cars (P, Q), where 0 ≤ P < Q < N, is passing when P is traveling to the east and Q is traveling to the west.

For example, consider array A such that:

  A[0] = 0
  A[1] = 1
  A[2] = 0
  A[3] = 1
  A[4] = 1
We have five pairs of passing cars: (0, 1), (0, 3), (0, 4), (2, 3), (2, 4).

Write a function:

class Solution { public int solution(int[] A); }

that, given a non-empty array A of N integers, returns the number of pairs of passing cars.

The function should return −1 if the number of pairs of passing cars exceeds 1,000,000,000.

For example, given:

  A[0] = 0
  A[1] = 1
  A[2] = 0
  A[3] = 1
  A[4] = 1
the function should return 5, as explained above.

Assume that:

N is an integer within the range [1..100,000];
each element of array A is an integer that can have one of the following values: 0, 1.
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(1) (not counting the storage required for input arguments).
```


### 코드

> 1차 풀이

```java
class Solution {
    public int solution(int[] A) {

        // 나올수 있는 인덱스 짝짓기 경우의 수 구하기
        // 0 <= P < Q < N를 만족하는 경우의 수 구하기
        // [0, 1, 0, 1, 1] => (0,1) (0,3) (0,4) (2,3) (2,4) 가능한 경우의 수 5가지
        // * 조건 :: 페어가 1,000,000,000 초과라면 -1 리턴

        // == Exception ==
        if(A.length==0) return 0;

        int pairs = 0;
        for(int i=0; i<A.length; i++) {
            // == P 기준으로 모든 케이스를 만듬 ==    
            if(A[i]==0) {
                for(int j=i+1; j<A.length; j++) {   
                    // == Q라면 ==
                    if(A[j]==1) {
                        pairs++;
                        if(pairs > 1000000000) {
                            return -1;
                        }
                    }
                }
            }   
        }

        return pairs;
    }
}
```

> 2차 풀이

```java
class Solution {
    public int solution(int[] A) {

        // 나올수 있는 인덱스 짝짓기 경우의 수 구하기
        // 0 <= P < Q < N를 만족하는 경우의 수 구하기
        // [0, 1, 0, 1, 1] => (0,1) (0,3) (0,4) (2,3) (2,4) 가능한 경우의 수 5가지
        // * 조건 :: 페어가 1,000,000,000 초과라면 -1 리턴

        // == Exception ==
        if(A.length==0) return 0;

        // 각각의 전체갯수를 알고 있으면 이중반복문을 사용하지 않아도 해결가능
        int sumQ = 0;
        int pairs = 0;

        // == 각각의 전체개수 파악 ==
        for(int a : A)
            if(a == 1) sumQ++;

        for(int i=0; i<A.length; i++) {
            // == P 기준으로 모든 케이스를 만듬 ==    
            if(A[i]==0) {
                pairs += sumQ;
                if(pairs > 1000000000) return -1;
            } else {
                sumQ--;
            }   
        }

        return pairs;
    }
}
```

### 결과

> 1차 50%

- 성능
  - O(N ** 2)

> 2차  100%

### 학습


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
