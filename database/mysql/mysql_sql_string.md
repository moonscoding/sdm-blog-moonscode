
<div class="pull-right">  업데이트 :: 2018.10.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [문자열함수](#문자열함수)
	* [ASCII <-> CHAR](#ascii-char)
	* [BIT_LENGTH, CHAR_LENGTH, LENGTH](#bit_length-char_length-length)
	* [CONCAT, CONCAT_WS](#concat-concat_ws)
	* [ELT, FIELD, FIND_IN_SET, INSTR, LOCATE](#elt-field-find_in_set-instr-locate)
	* [FORMAT](#format)
	* [BIN, HEX, OCT](#bin-hex-oct)
	* [INSERT](#insert)
	* [LEFT, RIGHT](#left-right)
	* [UCASE, LCASE, UPPER, LOWER](#ucase-lcase-upper-lower)
	* [LPAD, RPAD](#lpad-rpad)
	* [LTRIM, RTRIM, TRIM](#ltrim-rtrim-trim)
	* [REPEAT](#repeat)
	* [REPLACE](#replace)
	* [REVERSE](#reverse)
	* [SPACE](#space)
	* [SUBSTRING, SUBSTRING_INDEX](#substring-substring_index)

<!-- /code_chunk_output -->


### 문자열함수

#### ASCII <-> CHAR

- ASCII(아스키코드)
- CHAR(숫자)

```sql
SELECT ASCII('A'), CHAR(65);
```

- 65와 'A'를 반환

#### BIT_LENGTH, CHAR_LENGTH, LENGTH

- BIT_LENGTH(문자열) :: 비트크기
- CHAR_LENGTH(문자열) :: 문자개수
- LENGTH(문자열) :: 바이트크기

```sql
SELECT BIT_LENGTH('abc'), CHAR_LENGTH('abc'), LENGTH('abc');
SELECT BIT_LENGTH('가나다'), CHAR_LENGTH('가나다'), LENGTH('가나다');
```

- MySQL은 UTF-8 사용
  - 영문은 3byte
  - 한글은 3x3 = 9byte 할당

#### CONCAT, CONCAT_WS

- CONCAT(문자열1, 문자열2, ...)
- CONCAT_WS(문자열1, 문자열2, ...)

```sql
SELECT CONCAT_WS('/', '2020', '10', '01');
```
- '2020/10/01' 반환

#### ELT, FIELD, FIND_IN_SET, INSTR, LOCATE

- ELT(위치, 문자열1, 문자열2, ..)
  - 위치번째에 해다하는 문자열을 반환
- FIELD(찾을문자열, 문자열1, 문자열2, ..)
  - 찾을문자열의 위치를 반환, 없으면 0
- FIND_IN_SET(찾을문자열, 문자열리스트)
  - 문자열리스트가 ','로 구문되고 공백이 없어야함
  - 문자열리스트에서 찾을문자열의 위치를 반환
- INSTR(기준문자열, 부분문자열)
  - 기준문자열에서 부분문자열을 찾아 그 시작위치 반환
- LOCATE(부분문자열, 기준문자열)
  - INSTR과 동일하고 파라미터 순서가 반대

```sql
SELECT
  ELT(2, '하나', '둘', '셋'),
  FIELD('둘', '하나', '둘', '셋')
  FIND_IN_SET('둘', '하나,둘,셋'),
  INSTR('하나둘셋', '둘'),
  LOCATE('둘', '하나둘셋');
```

- 둘, 2, 2, 3, 3 각각 반환

#### FORMAT

- FORMAT(숫자, 소숫점자리수)
  - 숫자를 소수점아래자리수까지 표현
  - 1000단위마다 ','표시처리

```sql
SELECT FORMAT(123456.123456, 4);
```

- 123456.1234 출력

#### BIN, HEX, OCT

- BIN(숫자) :: 2진수
- HEX(숫자) :: 16진수
- OCT(숫자) :: 8진수

```sql
SELECT BIN(31), HEX(31), OCT(31);
```

#### INSERT

- INSERT(기준문자열, 위치, 길이, 삽입문자열)

```sql
SELECT INSERT('abcderfhi', 3, 4, '@@@@');
```

- 'ab@@@@ghi' 출력

#### LEFT, RIGHT

- LEFT(문자열길이)
- RIGHT(문자열길이)

```sql
SELECT LEFT('abcde', 3), RIGHT('abcde', 3);
```

- 'abc', 'cde' 각각 반환

#### UCASE, LCASE, UPPER, LOWER

- UCASE(문자열), UPPER(문자열)
- LCASE(문자열), LOWER(문자열)

#### LPAD, RPAD

- LPAD(문자열, 길이, 채울문자열)
- RPAD(문자열, 길이, 채울문자열)

```sql
SELECT LPAD ('이것이', 5, '##'), RPAD('이것이', 5, '##');
```

- '##이것이', '이것이##' 각각 반환

#### LTRIM, RTRIM, TRIM

- LTRIM(문자열)
- RTRIM(문자열)
- TRIM(문자열)
- TRIM(방향 자를문자열 FROM 문자열)

```sql
SELECT LTRIM('  이것이'), RTRIM('이것이  ');
SELECT TRIM('  이것이  '), TRIM(BOTH 'ㅋ' FROM 'ㅋㅋㅋㅋ이것이ㅋㅋㅋㅋ');
```

- 모두 '이것이'를 반환

#### REPEAT

- REPEAT(문자열, 횟수)

```sql
SELECT REPEAT('이것이', 3);
```

- '이것이이것이이것이' 반환

#### REPLACE

- REPLACE(문자열, 원래문자열, 바꿀문자열)

```sql
SELECT REPLACE('이것이 MySQL이다', '이것이', 'This is');
```

- 'This is MySQL이다' 반환

#### REVERSE

- REVERSE(문자열)

```sql
SELECT REVERSE('MySQL');
```

- 'LQSyM' 반환

#### SPACE

- SPACE(길이)

```sql
SELECT CONCAT('이것이', SPACE(10), 'MySQL이다');
```

- '이것이 (이곳에 공백 10칸) MySQL이다' 반환

#### SUBSTRING, SUBSTRING_INDEX

- SUBSTRING(문자열, 시작위치, 길이)
- SUBSTRING(문자열 FROM 시작위치 FOR 길이)
  - = SUBSTR, MID
- SUBSTRING_INDEX(문자열, 구분자, 횟수)

```sql
SELECT SUBSTRING('이것이MYSQL이다', 3, 2);
```
- '이M' 반환

```sql
SELECT SUBSTRING_INDEX('cafe.naver.com', '.', 2), SUBSTRING_INDEX('cafe.naver.com', '.', -2);
```

- 'cafe.naver', 'naver.com'을 각각 반환

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
