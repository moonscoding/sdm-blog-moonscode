
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [데이터 접근관련 예외](#데이터-접근관련-예외)
* [데이터 접근관련 예외처리](#데이터-접근관련-예외처리)

<!-- /code_chunk_output -->

### 데이터 접근관련 예외

> DataAccessException을 부모 클래스로 하는 데이터 접근 예외 계층구조

```
RuntimeException
-> DataAccessException   
-> 01. DataIntegrityViolationException      -> 1.1 DuplicationKeyException
-> 02. PessimisticLockingFailureException   -> 2.1 DeadlockLoserDataAccessException
                                            -> 2.2 CannotAcquireLockException
-> 03. DataRetrievalFailureException
```

> 비검사 예외를 활용한 DataAccessException

- 비검사 예외
  - try~catch & throws에 의해 예외처리가 강제되지 않음
  - 예외처리 생략가능

> 구현을 은폐한 데이터 접근 예외

- 제품별로 정의된 서로 다른 예외클래스를 데이터 접근방법
- 특정제품에 종속되지 않는 공통적인 예외클래스로 변환하는 기능

> Oracle의 오류코드를 추상화한 예제

- BadSqlGrammarException
- InvaildResultSetAccessException
- DuplicationKeyException
- DataIntegrityViolationException
- DataAccessResourceFailureException
- CannotAcquireLockException
- CannotSerializeTransactionException
- DeadlockLoserDataAccessException

### 데이터 접근관련 예외처리

```java
public Room getRoomForUpdate(String roomId) {
  Room room = null;
  try {
    room = roomDao.getRoomForUpdate(roomId);
  } catch(DataRetrievalFailureException e) {
    throw new NotFoundRoomIdException("roomId=" + roomId, e);
  }
  return room;
}
```

- DataRetrievalFailureException는 스프링이 추상화한 예외
- 헤당 애플리케이션에서 정의한 예외로 바꿔서 호출

### 데이터 접근관련 예외 변환규칙 커스터마이징

- 데이버베이스의 오류코드와 데이터접근예외에 관한 내용은 sql-error-codes.xml을 사용
- 해당내용을 재정의하면 커스터마이징할 수 있음


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
