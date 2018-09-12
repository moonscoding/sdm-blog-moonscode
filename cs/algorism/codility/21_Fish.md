<div class="pull-right">  업데이트 :: 2018.08.23 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [문제](#문제)
* [코드](#코드)
* [결과](#결과)

<!-- /code_chunk_output -->

### 문제

```
Stacks and Queues > Fish

```


### 코드

> 1차 풀이 (임시)

```java
import java.util.*;
class Solution {
    public int solution(int[] A, int[] B) {
        // 잡아먹기전에 잡아먹을 대상이 잡아먹을게 있는지 체크

        Stack<Integer> stack = new Stack<Integer>();
        stack.push(0);
        int n = A.length;
        int result = n;

        for(int i=1; i<n-1; i++) {
            int size = stack.size();
            do {
                size--;
                int comparer = stack.pop(); // 비교대상의 인덱스
                System.out.println(comparer);
                if(B[i] != B[comparer]) {
                    if(A[i] < A[comparer]) {
                        // 앞이잡아먹음
                        result--;

                        stack.push(comparer);
                    } else {
                        // 뒤가잡아먹음
                        result--;
                    }
                }
            } while(size != 0);
            stack.push(i);
        }
        return result;
    }
}
```

### 결과

> 1차 100%

- 정확 : 100%
- 성능 : 100%

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
