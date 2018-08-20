
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [SQl to POJO](#sql-to-pojo)
* [RowMapper](#rowmapper)
	* [BeanPropertyRowMapper](#beanpropertyrowmapper)
	* [ResultSetExtractor](#resultsetextractor)
	* [RowCallbackHandler](#rowcallbackhandler)

<!-- /code_chunk_output -->

###  SQl to POJO

- 애플리케이션 개발시, POJO 형태로 만들어 쓰는 경향
- POJO (Plain Old Java Object)
  - 주로 특정 자바 모델이나 기능, 프레임워크 등을 따르지 않은 자바 오브젝트를 지칭하는 말

> 스프링이 제공하는 3가지 인터페이스

- RowMapper
  - JDBC의 ResultSet을 순차적으로 읽으면서 원하는 POJO 형태로 매핑할때 사용
  - ResultSet은 하나의 행을 읽어 하나의 POJO로 변환
- ResultSetExtractor
  - JDBC의 ResultSet을 자유롭게 제어하며 원하는 POJO형태로 매핑할때 사용
  - ResultSet의 여러행 사이를 자유롭게 이동할 수 있음 (RowMapper와의 차이)
- RowCallbackHandler
  - 반환값이 없음
  - ResultSet에서 읽은 데이터를 파일 형태로 출력하거나, 조회된 데이터를 검증하는 용도

### RowMapper

> RowMapper 구현클래스 만들기

```java
public class RoomRowMapper implements RowMapper<Room> {
    @Override
    public Room mapRow(ResultSet resultSet, int rowNum) throws SQLException {
      Room room = new Room();
      room.setRoomId(resultSet.getString("room_id"));
      room.setRoomName(resultSet.getString("room_name"));
      room.setCapacity(resultSet.getInt("capacity"));
      return room;
    }
}
```
- mapRow 메서드를 만들고 그 안에서 ResultSett과 POJO간의 변환이 이뤄지도록 구현
- 메소드의 반환값은 제네릭으로 지정한 타입파라미터 값으로 나오게됨
- RowMapper 구현클래스는 ResultSet의 커서를 제어할 수 없음

> RowMapper 활용 DAO 클래스 만들기

```java
public Room getRoomById(String roomId) {
  String sql = "SELECT room_id, room_name, capacity FROM room WHERE room_id = ?";
  RoomRowMapper rowMapper = new RoomRowMapper();
  return jdbcTemplate.queryForObject(sql, rowMapper, roomId);
}

public List<Room> getAllRoom() {
  String sql = "SELECT room_id, room_name, capacity FROM room";
  RoomRowMapper rowMapper = new RoomRowMapper();
  return jdbcTemplate.query(sql, rowMapper);
}
```

> 람다식 활용 RomMapper 구현클래스

```java
 public List<Room> getAllRoom() {
   String sql = "SELECT room_id, room_name, capacity FROM room";
   return jdbcTemplate.query(sql, (resultSet, rowNum) -> {
     Room room = new Room();
     room.setRoomId(resultSet.getString("room_id"));
     room.setRoomName(resultSet.getString("room_name"));
     room.setCapacity(resultSet.getInt("capacity"));
     return room;
   });
 }
```

#### BeanPropertyRowMapper

- 미리 약속된 매핑 규칙에 따라 질의의 결과 정보를 POJO로 자동 매핑
- 자동매핑을 위해서 자바 리플렉션기능을 사용 (성능저하)
- 성능이 우선이라면 RowMapper를 사용하는 것을 추천

<자동매핑의 규칙과 제약사항 >

- 매핑규칙
  - ResultSet의 칼럼이름과 매핑대상인 타겟클래스의 프로퍼티 이름을 매핑
  - 칼럼이름을 언더스코어 문자로 구분하고
  - 카멜케이스타표기법으로 조합한 것과 타킷클래스의 프로퍼티 이름이 일치하면 칼럼값을 매핑
  - 기본적인 데이터타입을 모두 지원
- 제약사항
  - 매핑될 타겟클래스는 다른 클래스에 포함되지 않은 최상위 클래스
  - 매핑될 타겟클래스는 기본생성자나 인수가 없는 생성자가 있어야함

> BeanPropertyRowMapper 활용 DAO 클래스

```java
public Room getRoomBeanPropertyById(String roomId) {
  String sql = "SELECT room_id, room_name, capacity FROM room WHERE room_id=?";
  RowMapper<Room> rowMapper = new BeanPropertyRowMapper<Room>(Room.class);
  return jdbcTemplate.queryForObject(sql, rowMapper, roomId);
}
```

#### ResultSetExtractor

> ResultSetExtractor 구현클래스

```java
public class RoomListResultSetExtractor implements ResultSetExtractor<List<Room>> {

  @Override
  public List<Room> extractData(ResultSet rs) throws SQLException, DataAccessException {
    Map<String,Room> map = new LinkedHashMap<String,Room>();
    Room room = null;
    while(rs.next()) {
      String roomId = rs.getString("room_id");
      room = map.get(roomId);
      if(room == null) {
        room = new Room();
        room.getRoomId(roomId);
        // setter
        map.put(roomId, room);
      }
      String equipmentId = rs.getString("equipment_id");
      if(equipmentId != null) {
        Equiment equipment = new Equiment();
        // setter
        room.getEquipmentList().add(equipment);
      }
    }
    if(map.size() == 0) {
      throw new EmptyResultDataAccessException(1);
    }
    return new ArrayList<Room>(map.values());
  }
}
```

- extractData 메서드를 만들고 그 안에서 ResultSet과 POJO간의 변환이 이뤄지도록 구현
- extractData 메서드의 반환값은 지정한 타입파라미터값과 같아야함
- 중복키가 있을 수 있기 때문에 Map을 사용

> ResultSetExtractor를 활용한 DAO

```java
public List<Room> getAllRoomWithEquipment() {
  String sql = "SELECT r.room_id, r.room_name, r.capacity, " +
    "e.equipment_id, e.equipment_name, e.equipment_count, e.equipment_remarks " +
    "FROM room r LEFT JOIN equipment e " +
    "ON r.room_id = e.room_id"

  RoomListResultSetExtractor extracter = new RoomListResultSetExtractor();
  return jdbcTemplate(sql, extractor);
}

public Room getRoomWithEquipmentById(String roomId) {
  String sql = "SELECT r.room_id, r.room_name, r.capacity, " +
    "e.equipment_id, e.equipment_name, e.equipment_count, e.equipment_remarks " +
    "FROM room r LEFT JOIN equipment e " +
    "ON r.room_id = e.room_id " +
    "WHERE room_id = ?";

  RoomListResultSetExtractor extractor = new RoomListResultSetExtractor();
  List<Room> rooomList = jdbcTemplate.query(sql, extractor, roomId);
  return roomList.get(0);
}
```

- RowMapper와 ResultSetExtractor의 차이는 ?

#### RowCallbackHandler

- processRow 재정의필요

> RowCallbackHandler 구현

```java


public class RoomRowCallbackHandler implements RowCallbackHandler {
  @Override
  public void processRow(ResultSet rs) throws SQLException {
    try {
      BufferedWriter writer = new BufferedWriter(
        new OutputStreamWriter(new FileOutputStream(File.createTempFile("room_", ".csv")), "UTF-8")
      );
      while(rs.next()) {
        Object[] array = new Object[]{
          rs.getString("room_id"),
          rs.getString("room_name"),
          rs.getInt("capacity")
        };
        String reportRow = StringUtils.arrayToCommaDelimitedString(array);
        writer.write(repoertRow);
        writer.newLine();
      }
    } catch(IOException e) {
        throw new SQLException(e);
    } finally {
        writer.close();
    }
  }
}
```

> RowCallBackHandler 활용 DAO 클래스

```java
public void reportRow() {
  String sql = "SELECT room_id, room_name, capacity FROM room";
  RoomRowCallbackHandler handler = new RoomRowCallbackHandler();
  jdbcTemplate.queryt(sql, handler);
}
```

- csv 파일을 생성하는 메소드를 정의

### 데이터 일괄처리

> 배치처리

대용량 데이터를 처리할때 SQL문을 각각 실행하는 것이 아니라 배치 형태로 모아서 실행하는 방법

- batchUpdate() 메소드를 활용 (JdbcTemplate & NamedParameterJdbcTemplate)

> 저장 프로시저 호출

- 저장 프로시저는 JdbcTemplate의 call 메서드
- 저장 함수는 JdbcTemplate의 execute 메서드
- Proceduce 클래스나 SimpleJdbcCall 클래스를 사용할 수 도 있음

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
