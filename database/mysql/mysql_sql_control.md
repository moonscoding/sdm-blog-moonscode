
<div class="pull-right">  업데이트 :: 2018.10.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [제어흐름](#제어흐름)
	* [IF](#if)
	* [IFNULL, NULLIF](#ifnull-nullif)
	* [CASE ~ WHEN ~ ELSE ~ END](#case-~-when-~-else-~-end)

<!-- /code_chunk_output -->

### 제어흐름

#### IF

- IF(식, 참, 거짓)

```sql
SELECT IF(100>200, '참이다', '거짓이다');
```

- '거짓이다' 출력

#### IFNULL, NULLIF

- IFNULL(수식1, 수식2)
  - 수식1이 NULL이면 수식2반환, NULL이 아니면 수식1반환
- NULLIF(수식1, 수식2)
  - 수식1과 수식2가 같으면 NULL 다르면 수식1 반환

```sql
SELECT IFNULL(NULL, '널이군요'), IFNULL(100, '널이군요');
```
- '널이군요', 100 각각 출력

```sql
SELECT NULLIF(100, 100), IFNULL(200, 100);
```

- NULL, 200 각각 출력

#### CASE ~ WHEN ~ ELSE ~ END

```sql
SELECT CASE 10
  WHEN 1 THEN '일'
  WHEN 5 THEN '오'
  WHEN 10 THEN '십'
  ELSE '모름'
END;
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
