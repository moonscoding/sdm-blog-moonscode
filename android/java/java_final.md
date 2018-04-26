# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. final이란 ?](#01-final이란)
		* [02. final 사용예시](#02-final-사용예시)
		* [03. static final](#03-static-final)
		* [final Parameter](#final-parameter)
		* [final 객체](#final-객체)
		* [final 매소드](#final-매소드)
		* [final 클래스](#final-클래스)
		* [final interface](#final-interface)

<!-- /code_chunk_output -->



### 01. final이란 ?

상수입니다. 네이밍 규칙으로, 모두 대문자로 구성되어야 합니다.

### 02. final 사용예시

수정 불가

```java
public class Solution {
	final int LIMIT = 10;
	void foo(){
		LIMIT = 11; //Error: cannot assign a value to final variable LIMIT
	}
}
```

 생성자 초기화는 가능 (선언만한 상태에서)

```java
public class Solution {
    final int limit;
    public Solution(final int limit) {
        this.limit = limit;	//OK
    }
    ...
}
```

생성자외 초기화는 불가능

```java
public class Solution {
    final int limit;
    public Solution(final int limit) {
      setLimit(limit);
    }
    public void setLimit(final int limit) {
        this.limit = limit; //Error: cannot assign a value to final variable LIMIT
    }
    ...
}

```

### 03. static final

대문자 구성

```java
public class Solution {
    final static int LIMIT = 10;

    public static void main(String[] args) {
        System.out.println(Solution.LIMIT);
    }
}
```

수정 불가

```java
public class Solution {
    final static int LIMIT = 10;

    public static void main(String[] args) {
        System.out.println(Solution.LIMIT);
        Solution.LIMIT = 11; //Error: cannot assign a value to final variable LIMIT
    }
}
```

static 블록내 수정가능

```java
public class Solution {
    final static int LIMIT;

    static {
    	LIMIT = 10;
    }

    public static void main(String[] args) {
        System.out.println(Solution.LIMIT);
    }
}
```

### final Parameter

const 처리와 같음

```java
public class Solution {
    void tryToChagne(final int count, int length) {
        count = 10;	//Error: cannot assign a value to final variable count
        length = 10; //OK
    }
}
```

### final 객체

- 객체자체를 변경하는 것은 불가능
- 객체내부의 요소를 삽입 수정 삭제하는 것은 가능

### final 매소드

오버라이드 할 수 없음

```java
class Parent {
    final void thisIsFinal() {
    }
    void thisIsNotFinal() {
    }
}

public class Solution extends Parent {
    @Override
    void thisIsFinal() {
      //Error: thisIsFinal() in Solution cannot override thisIsFinal() in Parent overridden method is final
    }

    @Override
    void thisIsNotFinal() {	//OK    
    }
}
```

### final 클래스

상속할 수 없음

```java
final class Parent {
}

public class Solution extends Parent { //Error: cannot inherit from final Parent
}
```

### final interface

interface의 변수를 바꾸려는 것은 final 변수를 바꾸려는 시도와 같습니다.

즉 interface의 모든 속성은 final입니다.

```java
interface Solvable {
    int LIMIT = 10;
}

public class Solution implements Solvable {
    void tryToChange(){
        LIMIT = 1; //Error: cannot assign a value to final variable LIMIT
    }
}
```

interface의 메소드는 final을 허용하지 않습니다.

인터페이스 메소드는 무조껀 오버라이드 되야하기 때문...입니다.

```java
interface Solvable {
    public final void hey(); //Error: modifier final not allowed here
}

public class Solution implements Solvable {
    public void hey() {
    }
}
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
