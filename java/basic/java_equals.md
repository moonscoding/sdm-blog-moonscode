# Java
## "equals()" 제대로 알기
<div class="pull-right">  업데이트 :: 2018.07.25 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Java](#java)
	* ["equals()" 제대로 알기](#equals-제대로-알기)
		* [01. 원시타입과 참조타입의 비교](#01-원시타입과-참조타입의-비교)
		* [02. 배열의 비교](#02-배열의-비교)

<!-- /code_chunk_output -->

### 01. 원시타입과 참조타입의 비교

```java
public static void main(String[] args) {

     // #원시타입과 참조타입의 비교

     // #원시타입비교
     System.out.println(1 == 1); // true
     // ... 이하생략 ...

     // #문자열타입비교 ( 문자열의 equals() 함수는 객체의 깊은 비교를 하도록 Override된 상태 )
     System.out.println("1" == "1"); // true
     System.out.println(new String("1") == "1"); // false
     System.out.println(new String("1") == new String("1")); // false

     System.out.println("1".equals("1")); // true
     System.out.println("1".equals(new String("1"))); // true
     System.out.println(new String("1").equals(new String("1"))); // true

     // #참조타입
     System.out.println(new Object() == new Object()); // false
     System.out.println(new Object().equals(new Object())); // false
 }
```

### 02. 배열의 비교

```java
// # [ Object.equals() (얕은) ] - 주소값만 비교 ( == )
// # [ equals (깊은) ] - 1차배열까지 깊은비교
// # [ deepEquals (깊은) ] - 2차배열이상 까지 깊은비교

// 원시배열
System.out.println("[==(int[]) 주소비교] " + (new int[]{ 1,2 } == new int[]{ 1,2 })); // false
System.out.println("[Object.equals(int[]) 주소비교] " +(new int[]{1, 2}).equals(new int[]{1, 2})); // false
System.out.println("[Arrays.equals(int[]) 값비교] " + Arrays.equals(new int[]{ 1,2 }, new int[]{ 1,2 })); // true
System.out.println("[Arrays.deepEquals(int[][]) 값비교] " + Arrays.deepEquals(new int[][]{{1, 2}}, new int[][]{{1, 2}})); // true

// 문자열배열
System.out.println("[==(String[]) 주소비교] " + (new String[]{"a", "b"} == new String[]{"a", "b"})); // false
System.out.println("[Object.equals(String[]) 값비교] " + (new String[]{"a", "b"}).equals(new String[]{"a", "b"})); // false
System.out.println("[Arrays.equals(String[]) 같은값] " + Arrays.equals(new String[]{"a", "b"}, new String[]{"a", "b"})); // true
System.out.println("[Arrays.deepEquals(String[]) 같은값] " + Arrays.deepEquals(new String[]{"a", "b"}, new String[]{"a", "b"})); // true
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
