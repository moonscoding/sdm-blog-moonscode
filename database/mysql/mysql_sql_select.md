
<div class="pull-right">  업데이트 :: 2018.10.02 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [SELECT .. FROM](#select-from)
* [WHERE](#where)
	* [연산자](#연산자)
	* [BETWEEN .. AND](#between-and)
	* [IN()](#in)
	* [LIKE](#like)
	* [SubQuery](#subquery)
	* [ANY (=SOME)](#any-some)
	* [ALL](#all)
* [ORDER BY](#order-by)
* [DISTINCT](#distinct)
* [LIMIT](#limit)
* [CREATE TABLE .. SELECT](#create-table-select)
* [GROUP BY .. HAVING](#group-by-having)
	* [기본형식](#기본형식)
	* [집계합수](#집계합수)
	* [AS](#as)
	* [SUM](#sum)
	* [AVG](#avg)
	* [MIN / MAX](#min-max)
	* [COUNT](#count)
	* [HAVING](#having)
* [ROLLUP](#rollup)

<!-- /code_chunk_output -->

### SELECT .. FROM

```sql
SELECT first_name, last_name, gender FROM employees;
```

### WHERE

####  연산자

- 산술연산자
  - =, >, <, >=, <=
- 논리연산자
  - AND, OR, NOT

```sql
SELECT userID, Name FROM userTBL WHERE brithYear >= 1970 AND height >= 182;
```

```sql
SELECT userID, Name FROM userTBL WHERE brithYear >= 1970 OR height >= 182;
```

#### BETWEEN .. AND

```sql
SELECT Name, height FROM userTBL WHERE height >= 180 AND height <=183;

SELECT Name, height FROM userTBL WHERE height BETWEEN 180 AND 183;
```

#### IN()

```sql
SELECT Name, height FROM userTBL WHERE addr='경남' OR addr='전남' OR addr='경북';

SELECT Name, height FROM userTBL WHERE IN('경남', '경북', '전남');
```

#### LIKE

- 문자열검색을 위해서 사용

```sql
-- '김' 으로 시작하는 이름
SELECT Name, height FROM userTBL
  WHERE name LIKE '김%';

-- 아무거나 한글자가 앞에오고 '종신' 으로 끝나는 이름
SELECT Name, height FROM userTBL
  WHERE name LIKE '_종신';

-- 아무거나 한글자가 앞에오고 '용' 으로 시작하는 이름
SELECT Name, height FROM userTBL
  WHERE name LIKE '_용%';
```

#### SubQuery

```sql
-- '177'의 키보다 큰 사람을 조회
SELECT name, height FROM userTBL WHERE height > 177;

-- '김경호'의 키보다 큰 사람을 조회
SELECT name, heigth FROM userTBL
  WHERE height > (SELECT height FROM userTBL WHERE name = '김경호');
```

- 만약 하위쿼리가 2개 이상의 반환값을 준다면 오류가 발생

#### ANY (=SOME)

```sql
SELECT name, height FROM userTBL
  WHERE height >= ANY(SELECT height FROM userTBL WHERE name ='김경호')
```

- 복수개의 반환값중 어떤것이든 조건에 부합한다면 조회

#### ALL

```sql
SELECT name, height FROM userTBL
  WHERE height >= ALL(SELECT height FROM userTBL WHERE name ='김경호')
```

- 복수개의 반환값중 모든 조건에 부합한다면 조회

### ORDER BY

```sql
-- 오름차순 (기본)
SELECT name, mDate FROM userTBL ORDER BY mDate;

-- 내림차순
SELECT name, mDate FROM userTBL ORDER BY mDate DESC;

-- 내림차순(키), 오름차순(이름)
SELECT name, height FROM userTBL ORDER BY height DESC, name ASC;
```

- 정렬은 성능을 상당히 떨어뜨릴 소지가 있음, 필요한 경우에만 사용


### DISTINCT

- 중복제거

```sql
SELECT addr FROM userTBL;

SELECT addr FROM userTBL ORDER BY addr;

-- 중복제거
SELECT DISTINCT addr FROM userTBL;
```

### LIMIT

- 출력개수제한
  - LIMIT 개수 (처음부터)
  - LIMIT 시작, 개수
  - LIMIT 개수 OFFSET 시작

```sql
SELECT emp_no, hire_date FROM employees
  ORDER BY hire_date ASC
  LIMIT 5;
```

```sql
SELECT emp_no, hire_date FROM employees
  ORDER BY hire_date ASC
  LIMIT 0, 5; -- LIMIT 5 OFFSET 0;
```

### CREATE TABLE .. SELECT

- 테이블을 복사

```sql
CREATE TABLE buyTBL2 (SELECT * FROM buyTBL);
SELECT * FROM buyTBL2;
```

```sql
CREATE TABLE buyTBL3 (SELECT userID, prodName FROM buyTBL);
SELECT * FROM buyTBL3;
```

### GROUP BY .. HAVING

#### 기본형식

```sql
SELECT select_expr
  [FROM table_references]
  [WHERE where_condition]
  [GROUP BY {col_name| expr | position}]
  [HAVING where_condition]
  [ORDER BY {col_name | expr | position}]
```

#### 집계합수

- AVG() :: 평균
- MIN() :: 최소
- MAX() :: 최대
- COUNT() :: 개수
- COUNT(DISTINCT) :: 개수(중복불가)
- STDEV() :: 표준편차
- VAR_SAMP() :: 분산

#### AS

```sql
SELECT userID AS '사용자아이디', SUM(amount) AS '총 구매개수' FROM buyTBL
  GROUP BY userID;
```

#### SUM

```sql
SELECT userID, SUM(amount) FROM buyTBL
  GROUP BY userID;

SELECT userID, SUM(amount * price) FROM buyTBL
  GROUP BY userID;
```

#### AVG

```sql
-- 전체 평균
SELECT AVG(amount) AS '평균구매개수' FROM buyTBL;

-- 구매자별 평균
SELECT userID, AVG(amount) AS '평균구매개수' FROM buyTBL
  GROUP BY userID;
```

#### MIN / MAX

```sql
-- 전체에서 최대/최소를 구함 (X)
SELECT name, MAX(height), MIN(height) FROM userTBL;

-- 이름으로 그룹지어 최대/최소를 구함 (X)
SELECT nam , MAX(height), MIN(height) FROM userTBL
  GROUP BY name;

-- 최대/최소를 조건으로 구함 (O)
SELECT name, height FROM userTBL
  WHERE height = (SELECT MAX(height) FROM userTBL)
  OR height = (SELECT MIN(height) FROM userTBL);
```

#### COUNT

```sql
SELECT COUNT(*) FROM userTBL;

SELECT COUNT(mobile1) AS '휴대폰이 있는 사용자' FROM userTBL;
```

#### HAVING

```sql
SELECT userID, SUM(price * amount) FROM buyTBL
  GROUP BY userID;
```

- 총구매액이 1,000이상인 사람들에게만 사은품을 증정하고 싶을때

```sql
-- Error - 집계함수는 WHERE절에 사용할 수 없음
SELECT userID, SUM(price * amount) FROM buyTBL
  WHERE SUM(price * amount) > 1000
  GROUP BY userID;

-- HAVING 사용
SELECT userID, SUM(price * amount) FROM buyTBL
  GROUP BY userID
  HAVING SUM(price * amount) > 1000;

-- ORDER BY 사용
SELECT userID, SUM(price * amount) FROM buyTBL
  GROUP BY userID
  HAVING SUM(price * amount) > 1000
  ORDER BY SUM(price * amount);
```

### ROLLUP

- 총합 또는 중간합계가 필요할때,
  - 'GROUP BY'와 함께 'WITH ROLLUP' 구문사용

```sql
-- num
SELECT num, groupName, SUM(price * amount) AS '비용'
  FROM buyTBL
  GROUP BY groupName, num WITH ROLLUP;

-- num
SELECT groupName, SUM(price * amount) AS '비용'
  FROM buyTBL
  GROUP BY groupName WITH ROLLUP;
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
