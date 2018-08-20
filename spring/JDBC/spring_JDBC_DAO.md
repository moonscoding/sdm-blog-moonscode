
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [개요](#개요)
* [JdbcTemplate](#jdbctemplate)
	* [사용법](#사용법)
	* [메서드](#메서드)
* [JdbcTemplate 사용법](#jdbctemplate-사용법)
* [NamedParameterJdbcTemplate 사용법](#namedparameterjdbctemplate-사용법)
* [SqlParameterSource 사용법](#sqlparametersource-사용법)
* [CRUD 예시](#crud-예시)

<!-- /code_chunk_output -->

### 개요

- 커넥션의 연결과 종료
- SQL문의 실행
- SQL문의 실행결과 행에 대한 반복처리
- 예외처리

> 개발자가해야할부분

- SQL문 정의
- 파라미터 설정
- ResultSet에서 결과를 가져온 후에, 각 레코드별로 필요한 처리

###  JdbcTemplate

#### 사용법

- JdbcTemplate
  - ? 문자를 플레이스홀더로 사용
- NamedParameterJdbcTemplate
  - 파라미터 이름을 사용할 수 있음

> JdbcTemplate 활용한 데이터 조회

```java
@Autowired
JdbcTemplate jdbcTemplate;

public String findUserName(String userId) {
  String sql = "SELECT user_name FROM user WHERE user_id = ?";
  return jdbcTemplate.queryForObject(sql, String.class, userId);
}
```

> JdbcTemplate 활용 ( 자바기반 )

```java
@Configuration
public class AppConfig {
  @Bean
  public JdbcTemplate jdbcTemplate (Database database) {
    return new JdbcTemplate(database);
  }
}
```

#### 메서드

- queryForObject
  - 하나의 결과 레코드 중에서 하나의 칼럼 값을 가져올 때 사용
  - RomMapper와 함께 사용하면 레코드 정보를 객체에 매핑
- queryForMap
  - 하나의 결과 레코드 정보를 Map 형태로 매핑할 수 있음
- queryForList
  - 여러개의 결과 레코드를 다룸
  - List의 한 요소가 한 레코드
  - 한 레코드 정보는 queryForObject, queryForMap과 같음
- query
  - ResultSetExtractor.RowCallbackHandler와 함께 조회할 때 사용
- update
  - 데이터를 변경하는 SQL
  - INSERT, DELETE, UPDATE 시에 사용

### JdbcTemplate 사용법

> DAO(Data Access Object) 클래스 구현

```java
@Component
public class JdbcRoomDao {
  @Autowired
  JdbcTemplate jdbcTemplate;

  public int findMaxCapacity() {
    String sql = "SELECT MAX(capacity) FROM room";
    return jdbcTemplate.queryForObject(sql, Integer.class);
  }
}
```

> 스프링 JDBC 설정

```xml
<beans>
  <import resource="classpath:datasource-embedded.xml" />
  <context:component-scan base-package="com.example" />
  <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource" />
  </bean>
</beans>
```

> DAO 클래스 동작확인

```java
public static void main(String[] args) {
  ApplicationContext context = new ClassPathXmlApplicationContext("JdbcTemplateConfig.xml");
  JdbcTemplate dao = context.getBean("jdbcTemplate", JdbcTemplate.class);
  int maxCapacity = dao.findMaxCapacity();
  System.out.println(maxCapacity);
}
```

### NamedParameterJdbcTemplate 사용법

> NamedParameterJdbcTemplate을 이용한 DAO 클래스

```java
@Component
public class JdbcRoomNameDao {
  @Autowired
  NamedParameterJdbcTemplate namedParameterJdbcTemplate;

  public String findRoomNamedById(String roomId) {
    String sql = "SELECT room_name FROM room WHERE room_id = :roomId"; // :바인드변수명
    Map<String, Object> params  = new HashMap<String, Object>();
    params.put("roomId", roomId);
    return namedParameterJdbcTemplate.queryForObject(sql, params, String.class);
  }
}
```

- 메서드에 바인드변수의 이름을 키로 사용하는 Map활용

### SqlParameterSource 사용법

- SqlParameterSource 인터페이스의 구현 클래스를 인수로 받음
- Map을 사용할 때보다 파라미터 설정이 비교적 쉬움

> MapSqlParameterSource

```java
MapSqlParameterSource map = new MapSqlParameterSource()
  .addValue("roomId", "A001")
  .addValue("roomName", "회의실")
  .addValue("capacity", 10);
```

- addValue 메서드로 파라미터 값을 설정

> BeanPropertySqlParameterSource

```java
Room room = new Room("A001", "회의실", 10);
BeanPropertySqlParameterSource map = new BeanPropertySqlParameterSource(room);
```

- SQL문의 파라미터 값을 설정할때, 빈객체를 사용

### CRUD 예시

> DAO 클래스로 1건을 조회하는 구현

```java
public Room getRoomById(String roomId) {
  String sql = "SELECT room_id, room_name, capacity FROM room WHERE room_id = ?";
  Map<String, Object> result = jdbcTemplate.queryForMap(sql, roomId);
  Room room = new Room();
  room.setRoomId((String) result.get("room_id"));
  room.setRoomName((String) result.get("room_name"));
  room.setRoomCapacity((Integer) result.get("room_capacity"));
  return room;
}
```

> DAO 클래스에서 여러건 조회를 구현

```java
public List<Room> getAllRoom() {
    String sql = "SELECT room_id, room_name, capacity FROM room";
    List<Map<String, Object>> resultList = jdbcTemplate.queryForList(sql);
    List<Room> roomList = new ArrayList<Room>();
    for(Man<String, Object> result : resultList) {
      Room room = new Room();
      room.setRoomId((String) result.get("room_id"));
      room.setRoomName((String) result.get("room_name"));
      room.setRoomCapacity((Integer) result.get("room_capacity"));
      roomList.add(room);
    }
    return roomList;
}
```

> 조회결과 레코드값이 0건일 경우

- 조회결과가 0건이 나오면 queryForList 메서드의 항목의 갯수가 0개인 빈 List를 반환
- 그 밖에 경우는 EmptyResultDataAccessException 예외를 발생

> 테이블 내용을 변경하는 경우

- 등록, 수정, 삭제 상관없이 update 메서드를 사용
- 조회한 데이터가 0건이면 EmptyResultDataAccessException 예외가 발생
  - 데이터 변경할때는 변경대상이 0건인 경우도 예외를 발생하지 않음
  - 성공여부는 반환값으로 판단


> DAO 클래스에서 데이터 변경을 구현한 예

```java
@Autowired
JdbcTemplate jdbcTemplate;

public int insertRoom(Room room) {
  String sql = "INSERT INTO room(room_id, room_name, capacity) VALUES(?, ?, ?)";
  return jdbcTemplate.update(sql, room.getRoomById(), room.getRoomName(), room.getCapacity());
}

public int updateRoomById(Room room) {
  String sql = "UPDATE room SET room_name=?, capacity=? WHERE room_id=?";
  return jdbcTemplate.update(sql, room.getRoomName(), room.getCapacity(), room.getRoomById());
}

public int deleteRoomById(String roomId) {
  String sql = "DELETE FROM room WHERE room_id=?";
  return jdbcTemplate.update(sql, roomId);
}
```












---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
