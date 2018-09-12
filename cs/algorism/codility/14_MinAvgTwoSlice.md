
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
Find the minimal average of any slice containing at least two elements.
```


### 코드

> 1차 풀이

```java
class Solution {
    public int solution(int[] A) {

        // (2 <= N <= 100,000)
        // (-10,000 <= element <= 10,000)
        // (0 <= P < Q < N) => (P, Q) 조각

        // (A[p] + ... + A[Q]) / (Q - P + 1) => 조각의규칙
        // 평균이 최소인 조각의 시작위치를 찾기

        double min = ((double) A[0] + A[1]) / 2;
        int result = 0;
        int P = 0;
        int Q = 0;

        for(int i=0; i<A.length; i++) {
            for(int j=i+1; j<A.length; j++) {
                double avg = getMinRanged(A, i, j);
                if(min > avg) {
                    min = avg;
                    result = i;
                }
            }        
        }

        // 평균이 최소인 조각의 시작위치
        return result;
    }

    public double getMinRanged(int[] A, int P, int Q) {
        int sum = 0;
        for(int i=P; i<=Q; i++) {
            sum += A[i];
        }
        return (double) sum / (double) (Q - P + 1);
    }
}
```

> 2차 풀이

```java
class Solution {
    public int solution(int[] A) {

        // (2 <= N <= 100,000)
        // (-10,000 <= element <= 10,000)
        // (0 <= P < Q < N) => (P, Q) 조각

        // (A[p] + ... + A[Q]) / (Q - P + 1) => 조각의규칙
        // 평균이 최소인 조각의 시작위치를 찾기

        int minP = 0;
        double minStart = ((double) A[0] + A[1]) / 2;
        double minEnd = 10001;

        for(int i=1; i<A.length-1; i++) {
            double minNow = getMaxSum(A, i, i+1);
            if(minEnd > minNow) {
                minEnd = minNow;
                minP = i;
            }                             
        }

        // 평균이 최소인 조각의 시작위치
        return minP;
    }

    // == 범위합 ==
    public double getMinRanged(int[] A, int P, int Q) {
        int sum = 0;
        for(int i=P; i<=Q; i++) sum += A[i];
        return (double) sum / (double) (Q - P + 1);
    }

    // == 최소값구하기 ==
    public double getMaxSum(int[] A, int P, int Q) {
        double min = ((double) A[P] + A[Q]) / 2;
        int pr = Q + 1;
        while(pr < A.length) {
            if(A[pr] <= min) {
                Q = pr;
                pr++;
            } else {
                pr--;
                break;
            }
        }
        return getMinRanged(A, P, Q);
    }
}
```

### 결과

> 1차 50%

- 성능 : 0%
  - medium_random (random, N = ~700)
  - large_ones (numbers from -1 to 1, N = ~100,000)
  - large_random (random, N = ~100,000)
  - extreme_values (all maximal values, N = ~100,000)
  - large_sequence (many seqeneces, N = ~100,000)

> 2차 60%

- 정확도 : 80%
  - medium_range (increasing, decreasing (legth = ~100) and small functional)
- 성능 : 40%

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
