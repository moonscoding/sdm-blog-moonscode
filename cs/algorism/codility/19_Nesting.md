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
Stacks and Queues > Nesting
Determine whether a given string of parentheses (single type) is properly nested.
```


### 코드

> 1차 풀이

```java
class Solution {
    public int solution(String S) {
        if(S.equals("")) return 1;
        int stack = 0;
        for(int i=0; i<S.length(); i++) {
            if(S.charAt(i) == '(') {
                stack++;
            } else {
                stack--;
            }
        }
        return (stack == 0) ? 1 : 0;
    }
}
```

> 2차 풀이

```java
class Solution {
    public int solution(String S) {
        if(S.equals("")) return 1;
        int stack = 0;
        for(int i=0; i<S.length(); i++) {
            if(S.charAt(i) == '(') {
                stack++;
            } else {
                stack--;
                if(stack < 0) return 0;
            }
        }
        return (stack == 0) ? 1 : 0;
    }
}
```

### 결과

> 1차 12%

- 정확 : 25%
  - 순서가 바뀐 케이스의 예외처리 => ")("
- 성능 : 0%

> 2차 100%

- 정확 : 100%
- 성능 : 100%

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
