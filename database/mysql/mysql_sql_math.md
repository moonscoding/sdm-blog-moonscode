
<div class="pull-right">  업데이트 :: 2018.10.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [수학함수](#수학함수)
	* [ABS](#abs)
	* [CEILING, FLOOR, ROUND](#ceiling-floor-round)
	* [CONV](#conv)
	* [DEGREES, RADIANS, PI](#degrees-radians-pi)
	* [MOD](#mod)
	* [POW, SQRT](#pow-sqrt)
	* [RAND](#rand)
	* [SIGN](#sign)
	* [TRUNCATE](#truncate)
	* [ACOS, ASIN, ATAN, ATAN2, SIN, COS, TAN](#acos-asin-atan-atan2-sin-cos-tan)
	* [EXP, LN, LOG, LOG, LOG2, LOG10](#exp-ln-log-log-log2-log10)

<!-- /code_chunk_output -->

### 수학함수

#### ABS

- ABS(숫자)
  - 숫자의 절대값

```sql
SELECT ABS(-100);
```

#### CEILING, FLOOR, ROUND

- 올림, 내림, 반올림

```sql
SELECT CEILING(4.7), FLOOR(4.7), ROUND(4.7);
```

- 5, 4, 5 각각 반환

#### CONV

- CONV(숫자, 원래진수, 변환진수)

```sql
SELECT CONV('AA', 16, 2), CONV(100, 10, 8);
```

#### DEGREES, RADIANS, PI

- DEGREES(숫자)
  - 라디안값을 각도값으로
- RADIANS(숫자)
  - 각도값을 라디안값으로
- PI()

```sql
SELECT DEGREES(PI()), RADIANS(180);
```

- 파이의 각도값인 180, 180의 라디안값이 각각 반환

#### MOD

- MOD(숫자1, 숫자2)
  - 숫자1 % 숫자2
  - 숫자1 MOD 숫자2

```sql
SELECT MOD(157, 10), 157 % 10, 157 MOD 10;
```

- 모두 7 반환

#### POW, SQRT

- POW(숫자1, 숫자2)
- SQRT(숫자)

```sql
SELECT POW(2,3), SQRT(9);
```

- 8, 3 각각 반환

#### RAND

- RAND()
  - 0~1 사이의 실수

```sql
SELECT FLOOR(1 + RAND() * (6));
```

- 1~6 사이의값

#### SIGN

- SIGN(숫자)
  - 숫자가 양수, 0, 음수인지 구함
  - -1, 0, 1중 하나를 반환

```sql
SELECT SIGN(100), SIGN(0), SIGN(-100.123);
```

- 1, 0, -1 각각 반환

#### TRUNCATE

- TRUNCATE(숫자, 정수)
  - 소수점을 기준으로 정수 위치까지 구하고 나머지를 버림

```sql
SELECT TRUNCATE(12345.12345, 2), TRUNCATE(12345.12345, -2);
```

- 12345.12, 12300을 반환

#### ACOS, ASIN, ATAN, ATAN2, SIN, COS, TAN

- 삼각함수 관련함수

#### EXP, LN, LOG, LOG, LOG2, LOG10

- 지수로그 관련함수

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
