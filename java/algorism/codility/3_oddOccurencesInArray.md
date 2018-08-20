# 코딜리티
## Odd Ocuurence In Array
<div class="pull-right">  업데이트 :: 2018.06.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [코딜리티](#코딜리티)
	* [Odd Ocuurence In Array](#odd-ocuurence-in-array)
		* [01. 코드](#01-코드)
		* [02. 결과](#02-결과)
		* [03. 학습](#03-학습)

<!-- /code_chunk_output -->

### 01. 코드

```java
/ you can also use imports, for example:
import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

class Solution {

    // # 중복되지 않는 하나의 값을 찾아라 !
    public int solution(int[] A) {
        // write your code in Java SE 8

        // # 정상요소는 총 2번 나오게 되고
        // # 비정상요소(찾는것)은 총 1번 나오게 된다.

        // # 첫번째로 나오면 확인배열에 값을 채우고
        // # 두번째로 나오게 되면 확인배열에서 다시 값을 지운다.

        // # 배열에 유지되어 있는건 비정상요소

        // field
        int[] arrTarget = A;
        List<Integer> arrStorage = new ArrayList<Integer>();

        for(int target : arrTarget) {
            // System.out.println(arrStorage.indexOf(target));
            int targetIndex = arrStorage.indexOf(target);
            if(targetIndex != -1) {
                // 제거
                arrStorage.remove(targetIndex);           
            }
            else {
                // 추가
                arrStorage.add(target);
            }
        }

        return arrStorage.get(0);
    }
}
```

### 02. 결과

66%

- 정답은 맞았으나, 다음과 같은 문제점이 발견되었습니다 : 시간 초과 오류.

> 문제에서 놓진점 :: N is an odd integer within the range [1..1,000,000]
- 배얄의 길이를 간과했습니다. (시간복잡도문제)

### 03. 학습

일단 정적 배열과 동적 배열중 어떤것을 사용하는게 좋은지에 대해서 고민을 많이 했습니다.

초반에는 제한된 배열을 선언해서 (주어진배열/2의 올림) 저장공간을 만들려 했으나,

코드복잡도가 증가해 가독성이 떨어질까 우려가 됬습니다.

그래서 List<Interger>를 사용하였고 정답은 맞았으나 포퍼먼스 측면에서 성과를 내지 못하였습니다.




---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
