
<div class="pull-right">  업데이트 :: 2018.08.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JPA 표준 CRUD](#jpa-표준-crud)
* [JPQL 활용 데이터 접근](#jpql-활용-데이터-접근)
	* [@Query를 사용하는 방법](#query를-사용하는-방법)
	* [메서드명으로 쿼리 생성하는 방법](#메서드명으로-쿼리-생성하는-방법)
* [베타제어](#베타제어)
* [페이지처리](#페이지처리)
* [Repository 커스텀 메서드 추가](#repository-커스텀-메서드-추가)
* [감사정보의 부여](#감사정보의-부여)

<!-- /code_chunk_output -->

### JPA 표준 CRUD

- 스프링 데이터 JPA에서 구현은 JPA로만 했을때와 차이가 없음
  - 스프링 데이터 JPA를 사용하는 경우에도 Entity 상태를 항상 의식
  - EntityManager가 Repository로 대체되는 것과 그에 따라 조작하는 메서드명이 변경되는 것이 차이
  - 쿼리를 기술했던 것을 Entity의 목록 취득등이 Repository 메서드를 하나로 취득할 수 있게 되어 코드의 가독성이 높아짐

```java
@Service
public class RoomServiceImpl implements RoomService {

    @PersistenceContext
    RoomRepository roomRepository;

    @Transactional(readOnly = true)
    public Room getRoom(Integer id) {
        Room room = roomRepository.findOne(id);
        if(room == null) {
            // 검색대상이 없을때
        }
        return room;
    }

    @Transactional(readOnly = true)
    public List<Room> getRoomAll() {
        return roomRepository.findAll(new Sort(Sort.Direction.ASC, "roomId"));
    }

    @Transactional
    public Room createRoom(String roomName, Integer capacity) {
        Room room = new Room();
        room.setRoomName(roomName);
        room.setCapacity(capacity);
        return roomRepository.save(room);
    }

    @Transactional
    public Room updateRoomName(Integer id, String roomName) {
        Room room = getRoom(id);
        room.setRoomName(roomName);
        return room;
    }

    @Transactional
    public void deleteRoom(Integer id) {
        roomRepository.delete(id);
    }
}
```

### JPQL 활용 데이터 접근

- 스프링 데이터 JPA를 사용하면 퀴리를 실행할때 메서드를 구현하는 것과 같이 코드로 구현하지 않아도됨
- 쿼리를 애너테이션이나 메서드명 혹은 인수명의 형태로 선언적으로 기술

#### @Query를 사용하는 방법

```java
@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    @Query("SELECT r FROM Room r WHERE r.roomName = :roomName")
    List<Room> findByRoomName(@Param("roomName") String roomName);

    @Query("UPDATE Room r SET capacity = :capacity")
    Integer updateCapacityAll(@Param("capacity") Integer capacity);
}
```

- @Query
  - nativeQuery 속성을 true로 지정해서 Native Query(SQL)을 실행 할 수 있음

#### 메서드명으로 쿼리 생성하는 방법

```java
@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findByRoomNmaeAndCapacity(String roomName, Integer capacity);
}
```

-  메서드명의 접두사가 find ... By, read ... By, query ... By, count ... By, get ... By 중 한가지일 경우
  - 메서드명으로 부터 SELECT문의 JPQL을 생성하는 대상이 됨
  - By부분 이후에는 SELECT문의 조건(WHERE) 에 지정하고자 하는 Entity 프로퍼티를 지정
  - 조건부분에는 And / Or 을 사용해서 여서 프로퍼티를 지정할 수있음
  - JPQL 매개변수는 인수의 순서대로 바인드

> 규칙

- DISTINCT
  - ... 부분에 DISTINCT 절을 위해 Distinct를 삽입할 수 있음
    - findDistinctRoomByEquipmentEquipmentName(String equipmentName)
- And, Or, Between, LessThan, GreaterThan, Like
  - By이후에 And / Or 외에 Between, LessThan, GreaterThan, Like 등을 사용할 수 있음
    - findByCapacitBetween(Integer capacityFrom, Integer capacityTo)
- IgnoreCase / AllIgnoreCase
  - 프로퍼티가 문자열인 경우 Entity 속성명 바로 뒤에 IgnoreCase 또는 메서드 이름끝에 AllIgnoreCase를 붙일 수 있음
    - findByRoomNameIgnoreCaseAndCapacity()
- OrderBy<프로퍼티명>
  - OrderBy<프로퍼티명> Asc 또는 OrderBy<프로퍼티명> Desc를 통해 순서를 지정
    - findByRoomNameAndCapacityOrderByRoomNameAsc()
- '\_'로 명시적 구분하기
  - 중첩된 프로퍼티명의 경계를 '\_'로 명시적으로 구분가능
    - 다음 두 예제는 같은 의미
      - findByRoomRoomName(String roomName)
      - findByRoom_RoomName(String roomName)

> 스프링 데이터 JPA를 이용해서 쿼리를 실행하는 방법

- Named Quert 읽어들이기
- 서드파티 QueryDSL 사용하기
- Specification 인터페이스 구현하는 CriteriaQuery 작성하기

### 베타제어

- JPA는 EntityManager에서 배타제어용 API제공
- 베타 제어 여부를 Repository의 쿼리메서드에 @Lock을 지정해서 선언

> @Lock

- 베타제어여부를 위해 Repository의 쿼리메서드에 지정
- value 속성에는 JPA의 LockModeType을 그대로 지정가능
- 비관적잠금뿐 아니라 낙관적잠금에 의한 @Version 프로퍼티의 증가도 LockModeType.OPTIMISTIC을 지정해 구현가능

```java
@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    List<Room> findAll();
}
```

### 페이지처리

- 퀴리에 취득하는 데이터의 시작위치나 건수, 정렬조건을 지정해야하나 스프링 데이터 JPA에는 해당 쿼리에 자동으로 추가하는 기능을 제공
- 이 기능을 사용하려면 사용중인 Repository가 PagingAndSortingRepository를 상속

```java
@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query("SELECT r FROM Room r WHERE r.roomName = :roomName")
    Page<Room> findByRoomName(@Param("roomName") String roomName, Pageable pageable);
}
```

- 쿼리메서드 매개변수에 Pageable 타입의 매개변수를 추가해야 페이지처리를 지원

```java
@Service
public class RoomServiceImplRepository implements RoomService {

  // ..

  @@Transactional
  public List<Room> searchRoomByNameAsc(String roomName, int page, int size) {
      Sort sort = new Sort(Sort.Direction.ASC, "roomName");
      Pageable pageable = new PageRequest(page, size, sort);
      Page<Room> rooms = roomRepository.findByRoomName(roomName, pageable);
      return rooms.getContent();
  }
}
```

- 취득결과의 정렬규칙을 지정하기 위해 Sort정의
- 여기서는 roomName 프로퍼티를 오름차순으로 가져오도록 지정
- 가져오고 싶은 데이터의 페이지번호, 페이지당건수. 정렬규칙을 지정해 Pageable을 작성
- 스프링 데이터 JPA는 Pageable 객체로부터 쿼리조건부분을 생성
- Pageable 객체를 지정해서 쿼리메서드를 호출 Page<T> 타입으로 목록 가져옴
- Page<T>에는 목록이 List타입으로 저장돼 있으며 다음과 같은 페이지처리에 필요한 정보가 담겨져 있음
  - 현재 페이지번호
  - 전체 페이지수
  - 페이지당 건수
- 결과의 목록만 필요한 경우 Page<T>.getContent()를 이용해서 List<T> 타입으로 취득가능
- 실제로 웹애플리케이션에서 다른 페이지정보가 필요함으로 Page 객체를 사용하는 것이 일반적ㄴ

```java
@Configuration
@SpringDataWebConfiguration
public class WebMvcConfig extends WebMvcConfigurerAdapter {
}
```

### Repository 커스텀 메서드 추가

- 동적으로 쿼리내용을 변경하는 것과 같이 프로그램적인 처리가 필요한 경우
  - Repository 인터페이스의 쿼리메서드를 추가하는 것만으로 대응 불가
  - 쿼리메서드에 커스텀 메서드의 구현을 연결하기 위한 수단 제공

```java
@Repository
public interface RoomRepositoryCustom extends JpaRepository<Room, Integer> {
    List<Room> findByCriteria(RoomCriteria criteria);
}
```

- 커스텀 Repository 클래스의 인터페이스 작성
- POJO를 이용한 인터페이스도 상관없음
- 인터페이스명에 제약은 없지만 관례상 'Repository인터페이스명 + Custom'으로 처리

```java
@Repository
public class RoomRepositoryImpl implements RoomRepositoryCustom {

  // ..

  @Override
  public List<Room> findByCriteria(RoomCriteria criteria) {
      return null;
  }
}
```

- 클래스명에 제약이 있음
  - 'Repository인터페이스명 + Impl'으로 처리
- 커스텀 메서드는 JPA 조작을 EntityManager에 직접할 필요가 있기 때문에 EntityManager에 접근할 수 있도록 주입
- 커스텀 메소드를 구현

```java
@Repository
public interface RoomRepository extends JpaRepository<Room, Integer>, RoomRepositoryCustom {

}
```

### 감사정보의 부여

- 정보보안에 규제로 감사정보를 추가해서 기록하라는 요구사항이 있을때

```java
@Entity
@Table(name="room")
@EntityListeners(AuditingEntityListener.class)
public class Room implements Serializable {

  @CreatedBy
  @Column(name = "created_by")
  private String createdBy;

  @CreatedDate
  @Column(name = "created_date")
  private LocalTime createdDate;

  @LastModifiedBy
  @Column(name = "last_modified_by")
  private String lastModifiedBy;

  @LastModifiedDate
  @Column(name = "last_modified_date")
  private LocalTime lastModifiedDate;

  // ..
}
```

- 스프링 데이터가 제공하는 감사기록용 EventListener 등록
- @CreateBy
  - 데이터 작성자정보를 저장하는 프로퍼티
  - 타입은 임의지만 AuditorAware로 취급하는 타입과 맞출필요
- @CreatedDate
  - 데이터 작성일시를 저장하는 프로퍼티
  - 타입으로 LocalTime
- @LastModifiedBy
  - 데이터의 마지막 갱신자 정보
- @LastModifiedDate
  - 마지막 갱신 일지를 저장하는 프로퍼티

> AuditorAware 구현

```java
public class UserAuditorAware implements AuditorAware<String> {

    @Value("#{ systemProperties['user.name']")
    private String userName;

    @Override
    public String getCurrentAuditor() {
        return userName;
    }
}
```

> 빈정의

```java
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories("example.domain.repository")
@EnableJpaAuditing // AuditorAware 타입의 빈을 검출
public class JpaConfig {
  // ..

  @Bean
  public AuditorAware<String> auditorAware() {
      return new UserAuditorAware();
  }
}
```



```java
public class SpringSecurityAuditorAware implements AuditorAware<User> {

    @Override
    public User getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        return ((UserDetails) authentication.getPrincipal()).getUser();
    }
}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
