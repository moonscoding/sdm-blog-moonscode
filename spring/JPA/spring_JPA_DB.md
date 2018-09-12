
<div class="pull-right">  업데이트 :: 2018.08.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [CRUD](#crud)
* [JPA의 JPQL을 활용한 테이터 접근](#jpa의-jpql을-활용한-테이터-접근)
* [베타 제어](#베타-제어)

<!-- /code_chunk_output -->

### CRUD

```java
@Service
public class RoomServiceImpl implements RoomService {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional(readOnly = true)
    public Room getRoom(Integer id) {
        Room room = entityManager.find(Room.class, id);
        if(room == null) {
            // 검색대상이 없을때
        }
        return room;
    }

    @Transactional
    public Room createRoom(String roomName, Integer capacity) {
        Room room = new Room();
        room.setRoomName(roomName);
        room.setCapacity(capacity);
        entityManager.persist(room);
        return room;
    }

    @Transactional
    public Room updateRoomName(Integer id, String roomName) {
        Room room = getRoom(id);
        room.setRoomName(roomName);
        return room;
    }

    @Transactional
    public void deleteRoom(Integer id) {
        Room room = getRoom(id);
        entityManager.remove(room);
    }
}
```

### JPA의 JPQL을 활용한 테이터 접근

- JOIN FETCH 절을 사용해 관계 Entity를 읽어오는 퀴리

```java
@Service
public class RoomServiceImpl implements RoomService {

    @PersistenceContext
    EntityManager entityManager;

    // ..

    @Transactional(readOnly = true)
    public List<Room> getRoomsByFetch(String roomName) {
        String jpql = "SELECT DISTINCT r FROM Room r " +
                "LEFT JOIN FETCH r.equipments " +
                "WHERE r.roomName = :roomName";
        TypedQuery<Room> query = entityManager.createQuery(jpql, Room.class);
        query.setParameter("roomName", roomName);
        return query.getResultList();
    }
}
```

- LEFT JOIN FETCH r.equipments
- TypedQuery를 생성
- 쿼리에 매개변수에 바인드

> 데이터베이스 갱신

```java
@Service
public class RoomServiceImpl implements RoomService {

    @PersistenceContext
    EntityManager entityManager;

    // ..

    @Transactional
    public Integer updateCapacityAll(Integer capacity) {
        String jpql = "UPDATE Room r SET r.capacity = :capacity";
        Query query = entityManager.createQuery(jpql);
        query.setParameter("capacity", capacity);
        return query.executeUpdate();
    }
}
```

### 베타 제어

- 낙관적 잠금 (optimistic lock)
- 비관적 잠금 (pessimistic locl)

> 낙관적 작금

```java
@Entity
@Table(name="room")
public class Room implements Serializable {

    // ..

    @Version
    @Column(name = "version")
    private Integer version;

    // ..
}
```

- @Version
  - Entity가 서로 구분되도록 반드시 버저닝 처리
  - 사용가능타입
    - Integer
    - Timestamp
  - 버저닝을 위해 JPA 내부에서 이 프로퍼티가 갱신되기 때문에 애플리케이션이 직접 갱신 금지

```java
@Service
public class RoomServiceImpl implements RoomService {

    @PersistenceContext
    EntityManager entityManager;

    // ..

    @Transactional
    public void updateRoomWithOptimisticLock(Integer id, String roomName, Integer capacity) {
        Room room = entityManager.find(Room.class, id);
        entityManager.lock(room, LockModeType.OPTIMISTIC);
        // 갱신처리 (생략)
        // 낙관적 잠금이 실패시에 트랜잭션이 종료되는 시점에 OptimisticLockException 발생
    }
}
```

- 낙관적 장금 활성화
- EntityManager.lock() 외 EntityManager.find() 인수에 LockModeType을 지정해 락을 활성화할 수 있음
- 퀴리에 대해 락을 활성화 하는 경우 TypedQuery.setLockMode()를 사용
- 활성화하는 쿼리는 데이터를 조회하는 쿼리로 제한
- 다른 트랜잭션에 의해 같은 행에 갱신이 완료된 경우
  - DB에 갱신 정보를 반영하려고 한 시점에서 예상한 버전과 다른 버전이 감지되고 JPA 구현이 OptimisticLockException 발생
- 트랜잭션이 종료될때 낙관적 잠금에 실패한 경우
  - OptimisticLockException을 래핑한 RollbackException이 발생

> 비관적 잠금

```java
@Service
public class RoomServiceImpl implements RoomService {

    @PersistenceContext
    EntityManager entityManager;

    // ..

    @Transactional
    public void updateRoomWithPessimisticLock(Integer id, String roomName, Integer capacity) {
        Room room = entityManager.find(Room.class, id);
        try {
            entityManager.lock(room, LockModeType.PESSIMISTIC_READ);
        } catch (PessimisticLockException e) {
            // 락을 거는 과정에서 실패한 경우
            // ..
        } catch (LockTimeoutException e) {
            // 락을 거는 과정에서 시간이 초과한 경우 ( 트랜잭션 자체는 롤백되지 않음 )
            // ..
        }
        // 갱신처리 (생략)
    }
}
```

- 비관적 잠금을 확보
- EntityManager.find()나 EntityManager.createQuery() 비관적 잠금을 확보
- 비관적 잠금 처리에 실패한 경우
  - PessimisticLockException 발생
- 비관적 잠금 처리에서 타임아웃이 발생한 경우
  - LockTimeoutException이 발생
  - JPA는 예외에 한해 트랙잭션 롤백처리를 하지않기 때문에 예외를 포착한 후 트랜잭션을 계속 이어나감
- 비관적 잠금은 낙관적 잠금과 달리 Entity 버저닝은 불필요하지만, 버저닝하는 옵션도 제공

> 비관적 잠금 종류

- 공유 잠금
 	- LockModeType.PESSIMITIC_READ
	 	- 읽기 잠금을 취득하고 다른 트랜잭션에서 변경하거나 삭제하는 것을 방지
	 	- 잠금된 엔티티가 실제로 변경삭제될때까지는 다른 트랜잭션이 공유잠금을 취득하거나 읽음
- 베타적 잠금
	- LockModeType.PESSIMITIC_WRITE
		- 쓰기 잠금을 취득하고 다른 트랜잭션에서 읽거나 변경, 삭제하는 것을 방지
		- 다른 트랜잭션은 공유 잠금, 베타적 잠금을 취득할 수 없음
- 베타적 잠금 (버전갱신)
	- LockModeType.PESSIMITIC_FORCE_INCREMENT
		- LockModeType.PESSIMITIC_WRIT 와 마찬가지로 쓰기 잠금을 취득
		- 동시에 Entity 버저닝 프로퍼티가 증가


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
