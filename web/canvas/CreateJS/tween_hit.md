# 다채로운 캔버스 효과, TweenJS
## 충돌의 모든것

Moon's Coding - 2017.11.02

<hr>


<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [다채로운 캔버스 효과, TweenJS](#다채로운-캔버스-효과-tweenjs)
	* [충돌의 모든것](#충돌의-모든것)
			* [01. hitTest](#01-hittest)
			* [02. globalToLocal](#02-globaltolocal)
			* [03. localToLocal](#03-localtolocal)
			* [04. localToGlobal](#04-localtoglobal)

<!-- /code_chunk_output -->


CreateJS의 충돌

- hitTest
- localToGlobal
- globalToLocal
- localToLocal

4가지 함수를 이용해서 다양한 충돌 이벤트를 만들어 낸다.

#### 01. hitTest

hitTest란, 요청하는 좌표가 해당 객체의 위에 오버랩 되는지 판단하는 메소드입니다.

```javascript
  myDisplayObject.hitTest(localX, localY);
```

\* Container내부 객체의 hitTest를 처리할때 주의 <br>
(Container는 이동하지 말고 내부의 Child를 이동)

#### 02. globalToLocal

#### 03. localToLocal

#### 04. localToGlobal

<hr>

**created by SuperMoon**

**출처 : https://github.com/jm921106**
