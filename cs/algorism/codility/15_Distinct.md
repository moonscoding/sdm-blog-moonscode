
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
Compute number of distinct values in an array.
```


### 코드

> 1차 풀이

```java
import java.util.*;
class Solution {
    public int solution(int[] A) {

        // 중복제거
        Set<Integer> set = new HashSet<Integer>();

        for(int a : A) {
            set.add(a);
        }

        return set.size();
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
