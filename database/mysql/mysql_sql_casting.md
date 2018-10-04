
<div class="pull-right">  업데이트 :: 2018.10.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [데이터형식 변환함수](#데이터형식-변환함수)
	* [개념](#개념)
	* [예제](#예제)
	* [날짜변환](#날짜변환)
	* [계산예제](#계산예제)
	* [암시적형변환](#암시적형변환)

<!-- /code_chunk_output -->

### 데이터형식 변환함수

#### 개념

```sql
CAST ( expresstion AS 데이터형식 [(길이)])
CONVERT ( expresstion, 데이터형식 [(길이)])
```

#### 예제

```sql
use sqlDB;
SELECT AVG(amount) AS '평균구매개수' FROM buyTBL;
SELECT CAST(AVG(amount) AS SIGNED INTEGER) AS '평균구매개수' FROM buyTBL;
SELECT CONVERT(AVG(amount), SIGNED INTEGER) AS '평균구매개수' FROm buyTBL;
```

#### 날짜변환

```sql
SELECT CAST('2020$12$12' AS DATE);
SELECT CAST('2020/12/12' AS DATE);
SELECT CAST('2020%12%12' AS DATE);
SELECT CAST('2020@12@12' AS DATE);
```

#### 계산예제

```sql
SELECT num, CONCAT(CAST(price AS CHAR(10)), 'X', CAST(amount AS CHAR(4)), '=') AS '단가X수량', price*amount AS '구매액'
	FROM buyTBL;
```

#### 암시적형변환

```sql
SELECT '100' + '200'; -- 300
SELECT CONCAT('100', '200'); -- 100200
SELECT CONCAT(100, '200'); -- 100200
SELECT 1 > '2mega'; -- 0(false) => 정수2로변환
SELECT 3 > '2mega'; -- 1(true) => 정수2로변환
SELECT 0 = 'mega2'; -- 1(true) => 정수0로변환
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
