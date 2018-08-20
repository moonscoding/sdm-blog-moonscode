# 코딜리티
## Binary Gap
<div class="pull-right">  업데이트 :: 2018.06.09 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [코딜리티](#코딜리티)
	* [Binary Gap](#binary-gap)
		* [01. 코드](#01-코드)
		* [02. 결과](#02-결과)
		* [04. 학습](#04-학습)

<!-- /code_chunk_output -->

### 01. 코드

```java
// you can also use imports, for example:
// import java.util.*;

// you can write to stdout for debugging purposes, e.g.
// System.out.println("this is a debug message");

import java.util.*;

class Solution {
    public int solution(int N) {
        // write your code in Java SE 8

        // 필드 선언
        int originN = N;
        List<Integer> arrBinaryN;
        int gapCountN = 0;


        // # 1. N을 2진수(binaryN)로 변환하라
        arrBinaryN = this.getBinary(originN);
        // System.out.println(arrBinaryN);

        // # 2. binaryN에서 2진수갭을 찾아라
        gapCountN = this.getBinaryGap(arrBinaryN);
        // System.out.println(gapCountN);

        // # 3. 결괄를 리턴해라
        return gapCountN;

    }

    // # 2진수를 구하는 함수
    // # 역정렬이 필요하지만 현재 문제에선 필요하지 않음
    public List<Integer> getBinary(int originN) {
        int targetN = originN;
        List<Integer> arrBinaryN = new ArrayList<Integer>();
        int nowBinary = 0;
        int nextBinary = 0;
        while(targetN != 0) {
            nowBinary = targetN % 2;
            targetN = targetN / 2;
            arrBinaryN.add(nowBinary);
        }
        return arrBinaryN;   
    }

    // # 2진갭을 구하는 함수
    public int getBinaryGap(List<Integer> arrBinaryN) {
        int maxGapCount = 0 ;
        int nowGapCount = 0 ;
        int step = 0; // 시작지점 1 => 1 , 종료지점 1 => 2
        for(int i=0; i<arrBinaryN.size(); i++) {
            // System.out.println(arrBinaryN.get(i));
            if(arrBinaryN.get(i) == 0) {
                if(step == 1) {
                    nowGapCount++;
                }   
            }
            if(arrBinaryN.get(i) == 1) {
                if(step == 0) {
                    step = 1;
                }
                if(step == 1) {
                    maxGapCount = (maxGapCount >= nowGapCount) ? maxGapCount : nowGapCount;
                    nowGapCount = 0;
                    step = 1;
                }
            }
        }
        return maxGapCount;
    }
}

```

### 02. 결과

100%

### 04. 학습

>  이진수만들기
  - '/ 2'를 통해서 뒤에서 부터 이진수를 얻을 수 있다는점
  - '/ 8', '/ 10'을 통해서 팔진수 십진수도 얻을 수 있다는 점

> 이진갭얻기
  - 반복과 마크를 통해서 중간 이진갭 갯수를 얻는 방식으로 풀이
  - 첫번째로 1이 나오면 마크 => 다음 1이 나오면 이진갭정리후 다시 마크

> 동적배열에 대해서 학습필요
- 미리 선언하는 방법 (이진갭처리시 마지막종료지점을 얻기가 어려움)
```
int []arrInt = new int[32]
```
- 이진갭 얻는 다른 방법도 찾아볼것

> 공간복잡도와 시간복잡도가 무엇인지...

- 시간복잡도 (time complexity) : 알고리즘을 실행하여 종료할때까지 필요한 시간
- 공간복잡도 (space complexity) : 알고리즘을 실행하여 종료할때까지 필요한 기억장치의 크기

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106
