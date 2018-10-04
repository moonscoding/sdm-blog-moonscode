
<div class="pull-right">  업데이트 :: 2018.10.02 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [숫자 데이터형식](#숫자-데이터형식)
* [문자 데이터형식](#문자-데이터형식)
* [날짜와시간 데이터형식](#날짜와시간-데이터형식)
* [기타 데이터형식](#기타-데이터형식)

<!-- /code_chunk_output -->

### 숫자 데이터형식

- BIT(N)
  - 1~64 비트
  - N/8 바이트
- TINYINT
  - 정수
  - 1 바이트 ( -128 ~ 127 )
- SMALLINT
  - 정수
  - 2 바이트
- MEDIUMINT
  - 정수
  - 3 바이트
- INT / INTEGER
  - 정수
  - 4 바이트
- BIGINT
  - 정수
  - 8 바이트
- FLOAT
  - 소수점 아래 7자리까지
  - 4 바이트
- DOUBLE / REAL
  - 소수점 아래 15자리까지
  - 8 바이트
- DECIMAL(m, [d]) / NUMERIC(m, [d])
  - 전체 자리수 (m) / 소수점 이하 자리수 (d)
  - 5 ~ 17 바이트

### 문자 데이터형식

- CHAR(n)
  - 고정길이 문자형 ( 속도가 조금 더 빠를수 있음 )
  - 1~255 바이트
- VARCHAR(n)
  - 가변길이 문자형
  - 1~65535
- BINARY(n)
  - 고정길이 이진 데이터값
  - 1~255 바이트
- VARBINARY(n)
  - 1~255 바이트
- TEXT형식
  - TINYTEXT
  - TEXT
  - MEDIUMTEXT
  - LONGTEXT
- BLOB형식
  - TINYBLOB
  - BLOB
  - MEDIUMBLOB
  - LONGBLOB
    - 최대 4기가 크기의 BLOB
- ENUM(값들..)
  - 1 or 2 바이트
- SET(값들..)
  - 1, 2, 3, 4, 6 바이트

### 날짜와시간 데이터형식

- DATE
  - 3 바이트
- TIME
  - 3 바이트
- DATETIME
  - 8 바이트
- TIMESTAMP
  - 4 바이트
- YEAR
  - 1 바이트

```sql
SELECT CAST('2020-10-19 12:35:29.123' AS DATE) AS 'DATE';
SELECT CAST('2020-10-19 12:35:29.123' AS DATE) AS 'TIME';
SELECT CAST('2020-10-19 12:35:29.123' AS DATE) AS 'DATETIME';
```

### 기타 데이터형식

- GEOMETRY
  - N/A 바이트
  - 공간데이터
- JSON
  - 8 바이트
  - JSON 문서저장

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
