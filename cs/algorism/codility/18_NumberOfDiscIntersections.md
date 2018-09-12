<div class="pull-right">  업데이트 :: 2018.08.21 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [문제](#문제)
* [코드](#코드)
* [결과](#결과)

<!-- /code_chunk_output -->

### 문제

```
NumberOfDiscIntersections
Compute the number of intersections in a sequence of discs.
```


### 코드

> 1차 풀이

```java
class Solution {
    public int solution(int[] A) {

        // 디스크에 경계가 있음
        // [1, 5, 2, 1, 4, 0]

        int pairs = 0;  
        for(int i=0; i<A.length-1; i++) {
            // == 자신이 가질 수 있는 최대값을 다른 원의 최소값과 비교 ==
            for(int j=i+1; j<A.length; j++) {
                if((long) i + (long) A[i] >= j - A[j]) {
                    pairs++;
                }
            }
        }

        // 교차 쌍이 10,000,000을 초과하면 함수는 -1을 반환해야합니다.
        return (pairs > 10000000 ? -1 : pairs);
    }
}
```

> 2차 풀이

```java
import java.util.*;
class Solution {
    public int solution(int[] A) {

        // == 최소값 & 최대값 배열 ==
        MyArr[] arr = new MyArr[A.length];
        for(int i=0; i<A.length; i++) {
            arr[i] = new MyArr(
                (long)i - (long)A[i],   // min
                (long)i + (long)A[i]    // max
                );
        }

        // == 최소값 정렬  ==
        Arrays.sort(arr);

        int pairs = 0;  
        for(int i=0; i<arr.length-1; i++) {
            // == 자신이 가질 수 있는 최대값을 다른 원의 최소값과 비교 ==
            for(int j=i+1; j<arr.length; j++) {
                if(arr[i].max >= arr[j].min) {
                    pairs++;
                } else {
                    break;
                }
            }
        }

        // 교차 쌍이 10,000,000을 초과하면 함수는 -1을 반환해야합니다.
        return (pairs > 10000000 ? -1 : pairs);
    }

     public static class MyArr implements Comparable<MyArr> {
        long min;
        long max;

        public MyArr(long min, long max) {
            this.min = min;
            this.max = max;
        }

        @Override
        public int compareTo(MyArr o) {
            if(this.min > o.min) {
                return 1;
            } else if(this.min < o.min) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}
```

### 결과

> 1차 62%

- 정확 : 100%
- 성능 : 25%

> 2차 75%

- 정확 : 100%
- 성능 : 50%

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
