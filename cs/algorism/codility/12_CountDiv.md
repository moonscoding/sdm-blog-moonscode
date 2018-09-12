
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
Write a function:

class Solution { public int solution(int A, int B, int K); }

that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K, i.e.:

{ i : A ≤ i ≤ B, i mod K = 0 }

For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.

Assume that:

A and B are integers within the range [0..2,000,000,000];
K is an integer within the range [1..2,000,000,000];
A ≤ B.
Complexity:

expected worst-case time complexity is O(1);
expected worst-case space complexity is O(1).
```


### 코드

> 1차 풀이

```java
class Solution {
    public int solution(int A, int B, int K) {
        // A <= i <= B, i mod K = 0 (K로 나눈 나머지가 0)
        int result = 0;
        for(int i=A; i<=B; i++) {
            if(i % K == 0) {
                result++;   
            }
        }
        return result;
    }
}
```

> 2차 풀이

```java
class Solution {
    public int solution(int A, int B, int K) {
        // 0 <= A & B & K <= 20억
        // A <= i <= B, i mod K = 0 (K로 나눈 나머지가 0)

        // == 반복문을 사용하지 않고 알아낼 수 있는 방법 ??? ==

        // A = 6, B = 11, K = 2
        // [6, 8, 10]

        // == A & B를 계산할 수 있게 앞으로 당기기 ==
        // B = B - (K * (A/K)); => 5
        // A %= K; => 0
        // [0, 2, 4]

        // == 일반화시키기 ==
        // == 앞의 A범위는 첫번째 몫 아래기때문에 관련이 없음 ==
        // (B + 1) / K

        B = B - (K * ((int)A/K));
        return (B + 1) / K;
    }
}
```

> 3차 풀이

```java
class Solution {
    public int solution(int A, int B, int K) {
        // 0 <= A & B & K <= 20억
        // A <= i <= B, i mod K = 0 (K로 나눈 나머지가 0)

        // == 반복문을 사용하지 않고 알아낼 수 있는 방법 ??? ==

        // == 짝수 ==

        // A = 6, B = 11, K = 2
        // [6, 7, 8, 9, 10, 11] -> [6, 8, 10]
        // [0, 1, 2, 3, 4, 5] -> [0, 2, 4]

        // A = 6, B = 12, K = 4
        // [6, 7, 8, 9, 10, 11, 12] -> [8, 12]
        // [2, 3, 4, 5, 6, 7, 8] -> 4, 8

        // == 홀수 ==

        // A = 6, B = 11, K = 3
        // [6, 7, 8, 9, 10, 11] -> [6, 9]
        // [0, 1, 2, 3, 4, 5] -> [0, 3]

        // A = 6, B = 12, K = 3
        // [6, 7, 8, 9, 10, 11, 12] -> [6, 9, 12]
        // [0, 1, 2, 3, 4, 5, 6] -> [0, 3, 6]

        // == A & B를 Q를 뺀값만큼 앞으로 당기기 ==

        int result = 0;
        int Q = A - (A % K); // A에서 A를 K로 나눈 나머지만큼을 뺀값
        int moveA = A - Q; // 0 // 2
        int moveB = B - Q; // 5 // 8

        if(moveA == 0) {
            // == 시작지점이 포함된다는 뜻 ==    
            result++;
        }

        if(B != 0 && moveB == 0) {
            // == A == B 이면서 Q로 나누어 떨어지는 값 ==    
            return 1;
        }

        result += (moveB / K);
        return result;
    }
}
```

### 결과

> 1차 50%

- 성능
  - big_values (A = 100, B=123M+, K=2)

> 2차 37%

- 정확도
  - minimal(A = B in {0,1}, K = 11)
  - extreme_ifempty(A = 10, B = 10, K in {5,7,20})
  - extreme_endpoints(verify handling of range endpoints, multiple runs)

> 3차 100%

### 학습

- 반복문을 최소화하기
- 충분한 예제로 일반화 검증하기

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
