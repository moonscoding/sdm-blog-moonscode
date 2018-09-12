
<div class="pull-right">  업데이트 :: 2018.08.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [ORM & JPA](#orm-jpa)
* [Enittiy](#enittiy)
* [EntityManager](#entitymanager)
* [Entity 상태](#entity-상태)
* [연관관계](#연관관계)
* [JPQL](#jpql)

<!-- /code_chunk_output -->

### ORM & JPA

> ORM

 - 관계형 DB에 데이터를 읽고 쓰는 처리를 객체에 데이터를 읽고 쓰는 방식으로 구현하는 기술

> OOS로 제공되는 주요 JPA

- EclipseLink
  - JPA 참조구현체, GlassFish에서 사용
- Hibernate ORM
  - JPA 기반이 된 하이버네이트의 JPA 구현, JBoss/WildFly에서 사용
- Apache OpenJPA
  - 아파치 소프트웨어 재단에서 개발한 JPA 구현, Apache TomEE에서 사용
- DateNucleus
  - Google AppEngine에서 사용

> JDBC와 JPA 비교

```java
public Room getRoomById(String roomId) {
  String sql = "SELECT room_id, room_name, capacity FROM room WHERE room_id = ? ";
  RowMapper<Room> rowMapper = new BeanPropertyRowMapper<Room>(Room.class);
  return getJdbcTemplate().queryForObject(sql, rowMapper, roomId);
}
```

```java
@PersistenceContext
EntityManager entityManager;

public Room getRoomById(String roomId) {
  return entityManager.find(Room.class, roomId);
}
```

- JPA 사용경우
  - JDBC에서 필요했던 SQL이 없어지고, DB 칼럼과 자바 객체와의 매핑이 감춰짐

### Enittiy

- Entity
  - DB에서 영속적으로 저장된 데이터를 자바 객체로 매핑
  - 메모리 상에 자바 객체의 인스턴스 형태로 존재
  - EntityManager에 의해 DB 데이터와 동기화
  - JPA가 제공하는 애너메이션 사용

> Entity 구현 예제

```java
@Entity
@Table(name="room")
public class Room implements Serializable {
    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private Integer roomId;

    @Column(name="room_name")
    private String roomName;

    @Column(name = "capacity")
    private Integer capacity;
}
```

- @Entity
- @Table
  - 테이블명을 지정
  - 생략한 경우 클래스명을 대문자로 한 이름의 테이블에 매핑 (ROOM)
- Serializable
  - 필요없지만 확장성을 고려
- @Id
  - 기본키임을 나타냄
- @EmbeddedId
  - 기본키가 복합키인 경우
- @GeneratedValue
  - 기본키 생성을 JPA에게 위임
  - strategy 속성에 GeneationType을 지정해서 생성방법을 지정
    - 기본값은 GenerationType.AUTO, DB의 최적키 생성방법이 자동으로 선택
- @Column
  - 매핑되는 컬럼명을 지정
  - 생략한 경우 프로퍼티명을 대문자로 한 이름의 칼럼에 매핑 (ROOMID)

### EntityManager

- DB와 동기화를 담당
- 영속성 컨텍스트(Persistence Context)라는 Entity를 관리하기 위한 영역
- DB의 데이터에 접근시에 반드시 EntityManager를 통해 영속성 컨텍스트의 Entity를 취득하거나 새로운 것을 등록해야함
- Entitymanager가 Entity 변경을 추적할 수 있어 적절한 타이밍에 DB와 동기화

> API

- <T> T find(java.lang.Class<T> entityClass, java.lang.Object primary Key)
  - 기본키를 지정해서 Entity를 검색하고 반환
  - 영속성 컨텍스트에 해당하는 Entity가 존재하지 않는 경우 DB SQL을 발행해 해당 데이터를 취득하고 Entity를 생성해서 반환
- void persist(java.lang.Object entity)
  - 애플리케이션에서 생성한 인스턴스를 Entity로 영속성 컨텍스트에서 관리
  - SQL(INSERT)이 즉시 발행되지 않고 영속성 컨텍스트에 축적
- <T> T merge(T entity)
  - 영속성 컨텍스트에서 관리되고 있지만 분리 상태가 된 Entity를 영속성 컨텍스트에서 다시 관리
  - 관리상태의 경우 차이점을 추적할 수 없기 때문에 DB에 반영하기 위한 SQL(UPDATE)이 즉시 발행되지 않고 영속성 컨텍스트에 축적
- void remove(java.lang.Object entity)
  - Entity 영속성 컨텍스트 및 DB 에서 삭제
  - SQL(DELETE)이 즉시 발행되지 않고 영속성 컨텍스트에 축적
- void flush()
  - 영속성 컨텍스트에 축적된 모든 Entity의 변경정보를 DB에 강제적으로 동기화
  - 일반적으로 DB에 반영하는 작업은 트랜잭션을 커맷할 때 하지만 커밋 이전에 반영할 필요가 있는 경우에 사용
- void refresh(java.lang.Object entity)
  - Entity의 상태를 DB의 데이터로 강제 변경
  - DB에 반영되지 않은 Entity에 대해 변경된 사항은 덮어씀
- <T> TypedQuery<T> createQuery(java.lang.String sqlString, java.lang.Class<T> resultClass)
  - 기본키 이외의 것으로 DB를 접근하는 경우 JPA용 쿼리를 실행해 Entity를 취득하거나 변경
  - 퀴리를 작성하기 위한 API중 하나로 비슷한 API가 여러개있음
- void detach(java.lang.Object entity)
  - Entity를 영속성 컨텍스트에서 삭제하고 분리상태로 만듬
  - 이 Entity에 대해 변경된 모든 사항은 merge() 실행하지 않는한 DB에 반영불가
- void clear()
  - 영속성 컨텍스트에서 관리되는 모든 Entity를 분리상태로 만듬
- boolean contains(java.lang.Object entity)
  - Entity가 영속성 컨텍스트에서 관리되는지 반환

> 개념

- 영속성 컨텍스트가 캐시역할
- EntityManager에 대한 작업이 수행되어도 즉시 DB에 반영되지 않음
- 트랜잭션이나 커밋되어 종료되거나 애플리케이션이 강제적으로 flush()를 호출한 타이밍에 영속성 컨텍스트에 축적된 Entity 사항이 반영

### Entity 상태

- new 상태
  - 새로운 Entity 인스턴스 생성, 영속성 컨텍스트에 등록되지 않은 상태
  - Entity는 단지 자바 객체이며 EntityManager와 상관관계가 없음
- 관리 상태
  - 영속성 컨텍스트에 Entity가 등록된 상태
  - EntityManager에 의해 DB의 동기화가 활성화
- 분리 상태
  - 관리 상태였던 Entity가 영속성 컨텍스트에서 분리된 상태
  - new 상태과 같이 DB에 동기화 되지 않지만 관리 상태로 되돌릴 수단 제공
- 삭제 상태
  - DB에서 삭제 예정인 상태
  - EntityManagerRK DB의 데이터를 삭제하고 종료될 때까지 지속

### 연관관계

> 관계

- 단방향 일대일
- 양방향 일대일
- 단방향 일대다
- 단방향 다대일
- 양방향 일대다/다대일9
- 단방향 다대다
- 양방향 다대다

> 다대일 관계

```java
@Entity
@Table(name="equipment")
public class Equipment implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "equipment_id")
    private Integer equipmentId;

    @Column(name = "equipment_name")
    private String equipmentName;

    @ManyToOne
    @Column(name = "room_id")
    private Room room;

    @Column(name = "equipment_count")
    private Integer equipmentCount;

    @Column(name = "equipment_remarks")
    private String equipmentRemarks;

    // ..
}
```

> 일대다 관계

```java
@Entity
@Table(name="room")
public class Room implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "room_id")
    private Integer roomId;

    @Column(name="room_name")
    private String roomName;

    @Column(name = "capacity")
    private Integer capacity;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Equipment> equipments;

    // ..
}
```


- @OneToMany
  - mappedBy - 관계를 맺고 있는 프로퍼티명
  - cascade - 자신에 대한 조작 관련 Entity에 전파

> 연관관계가 있는 Entity 가져오기

```java
@PersistenceContext
EntityManager entityManager;

@Transactional(readOnly = true)
public List<Equipment> getEquipmentsInRoom(Integer roomId) {
    Room room = entityManager.find(Room.class, roomId);
    return room.getEquipments();
}

@Transactional(readOnly = true)
public Room getRoomOfEquipment(Integer equipmentId) {
    Equipment equipment = entityManager.find(Equipment.class, equipmentId);
    return equipment.getRoom();
}
```

> 페치 방법의 지정

```java
@OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
private List<Equipment> equipment;
```

- SQL을 실행해서 데이터를 가져오는 과정을 JPA에서 패치
- @OneToOne, @ManyToOne은 Eager 패치를 사용, 그 밖에는 Lazy 페치를 사용

### JPQL

- Java Persisence Query Language
- JPA는 기본키를 지정해 DB를 조작하는 방법 외에 기본키를 사용하지 않는 처리 방법을 제공

> 퀴리기술방법

- JPQL(Java Persistence Query Language)
  - SQL처럼 JPA의 독자적인 쿼리 언어를 사용, Entity를 가져오거나 값을 변경
  - Entity나 Entity의 컬렉션, 그리고 Entity의 프롶티명으로 표현한다는 점이 다름
- Criteria Query (JPA 2.0에서 추가)
  - JPQL과 개념은 비슷하나 좀 더 객체지향적으로 기술
  - JPQL은 문자열로 기술 타입검사를 컴파일 시점에 할 수 없어 타입 불일치 같은 오류가 잠재적으로 발생
  - 문자열이 아니라 Builder 패턴의 CriteriaQuery 객체를 이용해 자바코드처럼 퀴리를 기술
    - 컴파일 시점에 타입 검사를 할 수 있어 쿼리 작성 과정에서 발생하는 실수를 방지
- Native Query
  - SQL 직접기술해서 Entity를 취득하거나 갱신하는 방법
  - 성능등 다양한 이유로 데이터베이스 제품에 의존적인 최적화된 기능일 필요할 때 사용

```java
@PersistenceContext
EntityManager entityManager;

@Transactional(readOnly = true)
public List<Room> getRoomsByName(String roomName) {
    String jpql = "SELECT r FROM Room r WHERE r.roomName = :roomName";
    TypedQuery<Room> query = entityManager.createQuery(jpql, Room.class);
    query.setParameter("roomName", roomName);
    return query.getResultList();
}
```

- room 테이블의 모든 레코프를 Entity로 읽어 들이기 위한 JPQL을 기술
- SQL로 대체하면 테이블 이름을 사용하게 되는데 JPQL에서 이것들을 Entity명이나 그것의 프로퍼티명을 대체
- EntityManager에서 제공되는 API를 사용해서 문자열의 JPQL의 TypedQuery로 컴파일
- JPQL에 설정한 바인드 변수(':변수명'형식)에 바인드 값을 설정

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
