
<div class="pull-right">  업데이트 :: 2018.10.02 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [INSERT](#insert)
* [INSERT INTO .. SELECT](#insert-into-select)
* [AUTO_INCREMENT](#auto_increment)
* [UPDATE](#update)
* [DELETE FROM](#delete-from)

<!-- /code_chunk_output -->

### INSERT

```sql
INSERT [into] 테이블[(열1, 열2, ...)] VALUES (값1, 값2, ...)
```

- 테이블 이름 다음에 나오는 열은 생략이 가능
- 입력순서에 값순서를 맞춰야함

```sql
INSERT INTO testTBL(id, userName) VALUES (2, '지성');

INSERT INTO testTBL (userName, age, id) VALUES('지성', 26, 3);
```

- 여러개의 값을 한번에 넣고 싶을때

```sql
INSERT INTO testTBL VALUES (값1, 값2, ...), (값1, 값2, ...), (값1, 값2, ...);
```

### INSERT INTO .. SELECT

- 대량의 데이터를 삽입할때

```sql
INSERT INTO testTBL (열1, 열2, ..)
  SELECT;
```

```sql
CREATE TABLE testTBL (id int, Fname varchar(50), Lname varchar(50));

INSERT INTO testTBL
  SELECT emp_no, first_name, last_name
    FROM employees.employees;
```

### AUTO_INCREMENT

- 다음과 같이 'AUTO_INCREMENT'가 지정되어 있다면 해당열은 자동으로 입력

```sql
CREATE TABLE testTBL(
  id int AUTO_INCREMENT PRIMARY KEY,
  userName char(3),
  age int
);
INSERT INTO testTBL VALUES (NULL, '지성', 25);
INSERT INTO testTBL VALUES (NULL, '흥민', 25);
SELECT * FROM testTBL;
```

- 현재 마지막 아이디를 조회하고 싶을 때

```sql
SELECT_LAST_INSERT_ID();
```

- 입력되는 아이디 위치를 변경하고 싶을 때

```sql
-- 시작 아이디를 100으로 변경
ALTER TABLE testTBL AUTO_INCREMENT=100;
INSERT INTO testTBL VALUES(NULL, '찬미', 23);
SELECT * FROM testTBL;
```

- 증가값을 변경하고 싶을때
  - @@auto_increment_increment

```sql
CREATE TABLE testTBL(
  id int AUTO_INCREMENT PRIMARY KEY,
  userName char(3),
  age int
);
ALTER TABLE testTBl AUTO_INCREMENT=1000;
SET @@auto_increment_increment=3;
INSERT INTO testTBL VALUES(NULL, '찬미', 23);
SELECT * FROM testTBL;
```

### UPDATE

```sql
UPDATE testTBL
  SET 열1 = 값1, 열2 = 값2, ..
  WHERE 조건;
```

- WHERE절이 생략된다면 전체행 변경

```sql
UPDATE testTBL
  SET Lname = '없음'
  WHERE Fname = 'Kyichi';

UPDATE buyTBL
  SET price = price * 1.5;
```

### DELETE FROM

```sql
DELETE FROM testTBL WHERE 조건;
```

```sql
DELETE FROM testTBL WHERE Fname = 'Aamer';

DELETE FROM testTBL WHERE Fname = 'Aamer'
  LIMIT 5;
```
---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
