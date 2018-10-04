
<div class="pull-right">  업데이트 :: 2018.10.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [변수사용](#변수사용)
	* [변수예제](#변수예제)
	* [LIMIT문 변수사용](#limit문-변수사용)
	* [PREPARE문](#prepare문)

<!-- /code_chunk_output -->

### 변수사용

```sql
SET @변수이름 = 변수값; -- 변수의 선언 및 값 대입
SELECT @변수이름; -- 변수값 출력
```

#### 변수예제

```sql
use sqlDB;

SET @myVar1 = 5;
SET @myVar2 = 3;
SET @myVar3 = 4.25;
SET @myVar4 = '가수이름=>';

SELECT @myVar1;
SELECT @myVar2 + @myVar3;

SELECT @myVar4, Name From userTBL WHERE height > 180;
```

#### LIMIT문 변수사용

```sql
SET @myVar2 = 3;

-- LIMIT은 변수를 사용할 수 없음
SELECT @myVar4, Name From userTBL WHERE height > 180
  LIMIT @myVar2;
```

#### PREPARE문

```sql
SET @myVar2 = 3;

-- PREPARE
PREPARE myQuery
  FROM 'SELECT Name, height FROM userTBL ORDER BY height LIMIT ?';

EXECUTE myQuery USING @myVar2;
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
