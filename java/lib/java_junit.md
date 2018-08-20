# Java
## Junit
<div class="pull-right">  업데이트 :: 2018.07.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Java](#java)
	* [Junit](#junit)
		* [01. junit](#01-junit)
		* [02. 특징](#02-특징)
		* [03. 대표적 단정문](#03-대표적-단정문)
		* [04. 어노테이션](#04-어노테이션)

<!-- /code_chunk_output -->

### 01. junit

- 단위 테스트 도구
- https://junit.org/junit4/ 다음링크에서 다운로드
- 프로젝트에 의존성모듈 주입

### 02. 특징

- 단위 테스트 Framework (가장많이사용)
- 문자 혹은 GUI 기반
- 단정문으로 테스트 케이스의 수행결과를 판별 (assertEquals(예상값, 실제값))
- 어노테이션으로 간결하게 지원
- 결과는 성공(녹색), 실패(붉은색) 중 하나로 표시

### 03. 대표적 단정문

- assertArrayEquals(a, b) => 배열 a, b가 일치함을 확인
- assertEquals(a, b) => 객체 a, b가 일치함을 확인
- assertSame(a, b) => 객체 a, b가 같은 객체임을 확인
- assertTrue(a) => a가 참인지 확인
- assertNotTrue(a) => a가 거짓임을 확인
- http://junit.sourceforge.net/javadoc/org/junit/Assert.html

### 04. 어노테이션

```java
@Test
public void testSum() {

}
```

다음과 같이 선언된 메소드는 테스트 대상임을 의미합니다.

```java
@Test(timeout=5000)
public void testSum() {

}
```

테스트 메소드가 결과를 반환하는데, 5000밀리 초를 넘긴다면 이 테스트는 실패입니다.

```java
@Test(expected=RuntimeException.class)
public void testSum() {

}
```

테스트 메소드가 RuntimeException를 발생시켜야 성공 그렇지 않으면 실패입니다.

```java
@BeforeClass
public static void setUpBeforeClass() throws Exception {

}

@AfterClass
public static void tearDownAfterClass() throws Exception {

}
```

@BeforeClass, @AfterClass 가 메소드 위에 선언되면

테스트 클래스에서 딱 한 번씩만 수행되도록 지정하는 어노테이션입니다.

```java
@Before
public void setUp() throws Exception {

}

@After
public void tearDown() throws Exception {

}
```

@Before, @After 가 메소드 위에 선언되면

해당 테스트 클래스 안에 메소드들이 테스트 되기 전과 후에 각각 실행됩니다.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
