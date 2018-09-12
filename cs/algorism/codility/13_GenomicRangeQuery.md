
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
A DNA sequence can be represented as a string consisting of the letters A, C, G and T, which correspond to the types of successive nucleotides in the sequence. Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form: What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters. There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers. The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the DNA sequence between positions P[K] and Q[K] (inclusive).

For example, consider string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6
The answers to these M = 3 queries are as follows:

The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.
Write a function:

class Solution { public int[] solution(String S, int[] P, int[] Q); }

that, given a non-empty string S consisting of N characters and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M integers specifying the consecutive answers to all queries.

The sequence should be returned as:

a Results structure (in C), or
a vector of integers (in C++), or
a Results record (in Pascal), or
an array of integers (in any other programming language).
For example, given the string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6
the function should return the values [2, 4, 1], as explained above.

Assume that:

N is an integer within the range [1..100,000];
M is an integer within the range [1..50,000];
each element of arrays P, Q is an integer within the range [0..N − 1];
P[K] ≤ Q[K], where 0 ≤ K < M;
string S consists only of upper-case English letters A, C, G, T.
Complexity:

expected worst-case time complexity is O(N+M);
expected worst-case space complexity is O(N) (not counting the storage required for input arguments).
```


### 코드

> 1차 풀이

```java
import java.util.*;

class Solution {
    public int[] solution(String S, int[] P, int[] Q) {

        // S => [A, C, G, T]록 구성된 문자열
        //       1  2  3  4
        // P & Q => M개의 정수
        // K(0 ≤ K <M)는 P[K]와 Q[K]사이의 최소 영향 인자를 찾도록 요구 (P[K] ≤ Q[K])

        // == 예제 ==
        // S = "CAGCCTA"
        // P = [ 2, 5, 0 ]
        // Q = [ 4, 5, 6 ]
        // 1번째 => 2 ~ 4 => GCC(322) => 2
        // 2번째 => 5 ~ 5 => T(4) => 4
        // 0번째 => 0 ~ 6 => CAGCCTA(2132241) => 1
        // return [2, 4, 1]

        // == Exception ==
        if(S == null || S.equals("")) return null;
        if(P.length == 0 || Q.length == 0 || P.length != Q.length) return null;

        int[] textArr = new int[S.length()];
        int[] resultArr = new int[P.length];
        for(int i=0; i<S.length(); i++) {
            switch(S.charAt(i)) {
                case 'A':
                    textArr[i] = 1;
                    break;
                case 'C':
                    textArr[i] = 2;
                    break;
                case 'G':
                    textArr[i] = 3;
                    break;
                case 'T':
                    textArr[i] = 4;
                    break;
            }
        }
        // System.out.println(Arrays.toString(textArr));

        for(int i=0; i<P.length; i++) {
            int min = textArr[P[i]]; // (0 ~ N-1)
            if(P[i] != Q[i] && min != 1) {
                // == 다름 ==
                for(int j=P[i]+1; j<=Q[i]; j++) {
                    if(textArr[j] < min) min = textArr[j];
                    if(min == 1) break;
                }   
                resultArr[i] = min;
            } else {
                // == 같음 (같은인덱스) ==
                resultArr[i] = min;
            }
        }       
        return resultArr;
    }
}
```

### 결과

> 1차 62%

- 성능
  - 요구하는 시간복잡도 O(N+M)
  - almost_all_same_letters (GGGGGG..??..GGGGGG..??..GGGGGG)
  - large_random (large random string, length)
  - extreme_large (all max ranges)

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
