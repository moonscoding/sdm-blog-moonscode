
<div class="pull-right">  업데이트 :: 2018.10.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [SQL의 분류](#sql의-분류)
	* [DML ( Data Manipulation Language )](#dml-data-manipulation-language)
	* [DDL ( Data Definition Language )](#ddl-data-definition-language)
	* [DCL ( Data Control Language )](#dcl-data-control-language)
* [USE](#use)
* [SHOW](#show)

<!-- /code_chunk_output -->

### SQL의 분류

#### DML ( Data Manipulation Language )

- 데이터 조작 언어
- SELECT, INSERT, UPDATE, DELETE, TRANSACTION 등등

#### DDL ( Data Definition Language )

- 데이터 정의 언어
- 데이터베이스, 테이블, 뷰, 인덱스 등의 데이터베이스의 개체를 처리
- CREATE, DROP, ALTER 등등
- DDL은 트랜잭션을 발생시키지 않음 ( ROLLBACK, COMMIT 따위가 없음 )

#### DCL ( Data Control Language )

- 데이터 제어 언어
- 사용자에게 권한을 부여하거나 빼앗을때 주로 사용
- GRANT, REVOKE, DENY 등등

### USE

```sql
use databaseName; # 사용 DB 선택
```

### SHOW

```sql
show databases; # 전체 DB 확인

show tables; # 전체 테이블 확인
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
