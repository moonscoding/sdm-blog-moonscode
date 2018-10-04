
<div class="pull-right">  업데이트 :: 2018.10.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [날짜시간함수](#날짜시간함수)
	* [ADDDATE, SUBDATE](#adddate-subdate)
	* [ADDTIME, SUBTIME](#addtime-subtime)
	* [CURDATE, CURTIME, NOW, SYSDATE](#curdate-curtime-now-sysdate)
	* [YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, MICROSECOND](#year-month-day-hour-minute-second-microsecond)
	* [DATE, TIME](#date-time)
	* [DATEDIFF, TIMEDIFF](#datediff-timediff)
	* [DAYOFWEEK, MONTHNAME, DAYOFYEAR](#dayofweek-monthname-dayofyear)
	* [LAST_DAY](#last_day)
	* [MAKEDATE, MAKETIME](#makedate-maketime)
	* [PERIOD_ADD, PERIOD_DIFF](#period_add-period_diff)
	* [QUARTER](#quarter)
	* [TIME_TO_SEC](#time_to_sec)

<!-- /code_chunk_output -->

### 날짜시간함수

#### ADDDATE, SUBDATE

- ADDDATE(날짜, 차이)
  - = DATE_ADD()
- SUBDATE(날짜, 차이)
  - = DATE_SUB()

```sql
SELECT ADDDATE('2020-01-01', INTERVAL 31 DAY), ADDDATE('2020-01-01'), INTERVAL 1 MONTH);
SELECT SUBDATE('2020-01-01', INTERVAL 31 DAY), SUBDATE ('2020-01-01', INTERVAL 1 MONTH);
```

#### ADDTIME, SUBTIME

- ADDTIME(날짜/시간, 시간)
- SUBTIME(날짜/시간, 시간)

```sql
SELECT ADDTIME('2020-01-01' 23:59:59, '1:1:1'), ADDTIME('15:00:00', '2:10:10');
SELECT SUBTIME('2020-01-01' 23:59:59, "1:1:1"),
SUBTIME('15:00:00', '2:10:10');
```

#### CURDATE, CURTIME, NOW, SYSDATE

- CURDATE()
  - '연-월-일'
- CURTIME()
  - '시:분:초'
- NOW()
  - '연-월-일 시:분:초'
- SYSDATE()
  - '연-월-일 시:분:초'

#### YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, MICROSECOND

- YEAR(날짜)
- MONTH(날짜)
- DAY(날짜)
- HOUR(시간)
- MINUTE(시간)
- SECOND(시간)
- MICROSECOND(시간)

```sql
SELECT YEAR(CURDATE()), MONTH(CCURDATE()), DAYOFMONTH(CURDATE());
SELECT HOUR(CURTIME()), MINUTE(CURTIME()), SECOND(CURRENT_TIME), MICROSECOND(CURRENT_TIME);
```

#### DATE, TIME

- DATE()
- TIME()

```sql
SELECT DATE(NOW()), TIME(NOW());
```

#### DATEDIFF, TIMEDIFF

- DATEDIFF(날짜1, 날짜2)
  - '날짜1 - 날짜2'의 일수
- TIMEDIFF(날짜1 또는 시간1, 날짜2 또는 시간2)
  - '시간1 - 시간2'의 결과

```sql
SELECT DATEDIFF('2020-01-01', NOW()), TIMEDIFF('23:23:59', '12:11:10');
```

#### DAYOFWEEK, MONTHNAME, DAYOFYEAR

- DAYOFWEEK(날짜)
  - 현재요일
- MONTHNAME()
  - 월이름
- DAYOFYEAR(날짜)
  - 1년중 몇일이 지났는지

```sql
SELECT DAYOFWEEK(CURDATE()), MONTHNAME(CURDATE()), DAYOFYEAR(CURDATE());
```

#### LAST_DAY
- LAST_DAY(날짜)
  - 주어진 날짜의 마지막 날짜를 구함

```sql
SELECT LAST_DAY('2020-02-01');
```

- '2020-02-29' 반환

#### MAKEDATE, MAKETIME

- MAKEDATE(연도, 정수)
  - 연도에서 정수만큼 지난 날짜를 구함
- MAKETIME(시, 분, 초)
  - 시분초를 이용해서 '시:분:초'의 TIME 형식 만듬

```sql
SELECT MAKEDATE(2020, 32);
SELECT MAKETIME(12, 11, 10);
```

- '2020-02-01'과 '12:11:10' 반환

#### PERIOD_ADD, PERIOD_DIFF

- PERIOD_ADD(연월, 개월수)
  - 연월에서 개월만큼의 개월이 지난 연월
- PERIOD_DIFF(연월1, 연월2)
  - '연월1 - 연월2'의 개월수

```sql
SELECT PERIOD_ADD(202001, 11), PERIOD_DIFF(202001, 201812);
```
- 2020년 12월과 13개월 반환

#### QUARTER

- QUARTER(날짜)
  - 날짜가 4중기에서 몇 분기인지

```sql
SELECT QUARTE('2020-07-07');
```

- 3분기를 반환

#### TIME_TO_SEC
- TIME_TO_SEC(시간)
  - 시간을 초단위로 반환

```sql
SELECT TIME_TO_SEC('12:11:10');
```
- 43870초 반환

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
