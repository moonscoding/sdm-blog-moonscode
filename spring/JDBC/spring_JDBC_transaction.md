
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [트랜잭션](#트랜잭션)
* [트랜잭션 관리자](#트랜잭션-관리자)
	* [PlatformTransactionManager의 구현클래스 종류](#platformtransactionmanager의-구현클래스-종류)
	* [로컬 트랜잭션 이용](#로컬-트랜잭션-이용)
	* [글로컬 트랜잭션 이용](#글로컬-트랜잭션-이용)
* [선언적 트랜잭션](#선언적-트랜잭션)
* [명시적 트랜잭션](#명시적-트랜잭션)
* [트랜잭션 격리수준](#트랜잭션-격리수준)
* [트랜잭션 전파방식](#트랜잭션-전파방식)

<!-- /code_chunk_output -->

### 트랜잭션

- 선언적 방법
- 프로그램적인 방법 (직접 commit&rollback 선언)

### 트랜잭션 관리자

- PlatformTransactionManager 인터페이스
  - 트랜잭션 처리에 필요한 API 제공

#### PlatformTransactionManager의 구현클래스 종류

- DataSourceTransactionManager
  - JDBC 및 마이바티스 등으로 데이터베이스 접근시 이용
- HibernateTransactionManger
  - 하이버네이트를 이용 데이터베이스 접근시 이용
- JpaTransactionManager
  - JPA로 데이터베이트 접근시 이용
- JtaTransactionManager
  - JTA에서 트랜잭션을 관리하는 경우에 이용
- WebLogicJtaTransactionManager
  - 애플리케이션 서버인 웹로직(WebLogic)이 JTA에서 트랜잭션을 관리하는 경우에 이용
- WebSphereUowTransactionManager
  - 애플리케이션 서버인 웹스피어(WebSphere)의 JTA에서 트랜잭션을 관리ㅣ하는 경우에 이용

#### 로컬 트랜잭션 이용

- DataSourceTransactionManager
- 단일 데이터 저장소에 대한 트랜잭션 (일반적으로 자주사용되는 트랜잭션)

> 빈정의 ( XML기반 )

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource" />
</bean>

<!-- @Trasaction 이용하는경우 (이용하지 않으면 필요 없음) -->
<tx:annotation-driven />
```

> 다른 아이디를 사용할 경우

```xml
<bean id="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource" />
</bean>

<!-- @Trasaction 이용하는경우 (이용하지 않으면 필요 없음) -->
<tx:annotation-driven transaction-manager="txManager" />
```

- transactionManager라는 아이디값이 디폴트로 선언되어 있음
- 바꾸려면 명시해줘야함

#### 글로벌 트랜잭션 이용

- 여러 데이터 저장소에 걸쳐 적용되는 트랜잭션
- JTA( Java Transaction API )라는 JavaEE 사양으로 표준화
- 애플리케이션 서버가 JTA의 구현클래스를 제공 (JtaTransactionManager)

> 빈정의 ( Xml기반 )

```xml
<tx:jta-transaction-manager />
```

### 선언적 트랜잭션

- 미리 선언된 룰에 따라 트랜잭션을 제어
- 트랜잭션의 시작과 커밋, 롤백등의 일반적이 처리를 비즈니스 로직안에 기술할 필요 없음

> @Transactional 이용 선언적 트랜잭션

- 빈의 public 메서드에 추가하는 것
- 대상 메서드의 시작 종료에 맞춰 트랜잭션을 시작, 커밋 가능
- 예외발생시 자동으로 롤백처리

> 트랜잭션 제어에 필요한 정보

- value
  - 트랜잭션 관리자의 qualifier를 지정 (기본 생략)
- transactionManager
  - value의 별칭
- propagation
  - 전파방식
- isolation
  - 격리수준
- timeout
  - 트랜잭션 제한시간을 지정 (기본 -1)
- readOnly
  - 읽기전용 플래그를 지정 (기본값 false)
- rollbackFor
  - 여기에 지정한 예외가 발생시 롤백
  - 예외 클래스명을 여러개 나열 가능 (,으로 구분)
- rollbackForClassName
  - 여기에 지정한 예외가 발생시 롤백
  - 예외 클래스명을 여러개 나열 가능 (,으로 구분)
- noRollbackFor
  - 여기에 지정한 예외가 발생해도 트랜잭션을 롤백하지 않음
  - 예외 클래스명을 여러개 나열 가능 (,으로 구분)
- noRollbackForClassName
  - 여기에 지정한 예외가 발생해도 트랜잭션을 롤백하지 않음
  - 예외 클래스명을 여러개 나열 가능 (,으로 구분)

> @Transacstional 설정예시

- @Transactional
  - 기본 트랜잭션 관리자를 기본 설정으로 이용
- @Transactional(readOnly = true, timeout = 60)
  - 기본 트랜잭션 관리자를 읽기 전용 트랜잭션으로 이용, 제한시간은 60초로 변경
- @Transactional("tx1")
  - "tx1" 트랜잭션 관리자를 이용
- @Transactional(value="tx2", propagation=Propagation.REQUIRES_NEW)
  - "tx2" 트랜잭션 관리자를 이용, 전파방식은 REQUIRES_NEW를 이용

> 기본사용법

- 일반적으로 자바 인터페이스로 정의

```java
public interface RoomService {
  Room getRoom(String roomId);
  void insertRoom(Room room);
}
```

- @Transaction은 클래스와 메서드에 부여가능
- 적용되는 범위의 차이

```java
@Transactional
@Service("roomService")
public class RoomServiceImpl implements RoomService {
  @Autowired
  JdbcRoomDao jdbcRoomDao;

  @Transactional(readOnly = true)
  @Override
  public Room getRoom(String roomId) {
    return jdbcRoomDao.getRoomById(roomId);
  }

  @Override
  public void insertRoom(Room room) {
    jdbcRoomDao.insertRoom(room);
    List<Equipment> equipmentList = room.getEquipmentList();
    for(Equipment item : equipmentList) {
      jdbcRoomDao.insertEquipment(item);
    }
  }
}
```

- @Transactional 클래스의 메서드 전체가 트랜잭션 적용 대상이 됨
- @Service 컴포넌트로 등록
- @Transactional(readOnly=true)를 통해 개별적으로 트랜잭션 재정의

> 설정클래스

```java
@Configuration
@EnableTransactionManagement
public class TransactionManagerConfig {
  @Autowired
  DataSource dataSource;

  @Bean
  public PlatformTransactionManager transactionManager() {
    return new DataSourceTransactionManager(dataSource);
  }
}
```


### 명시적 트랜잭션

- 메서드 단위보다 더 작은 단위로 트랜잭션 할때
- PlatformTransactionManager와 TransactionTemplate 두가지 방법

> PlatformTransactionManager

- TransactionDefinition
- TransactionStatus

```java
@Service
public class RoomServiceImpl implements RoomService {
  @Autowired
  PlatformTransactionManager txManager;
  @Autowired
  JdbcRoomDao roomDao;

  @Override
  public void insertRoom(Room room) {
    DefaultTransactionDefinition def = new DefaultTransactionDefinition();
    def.setName("InsertRoomWitEquipmentTx");
    def.setReadOnly(false);
    def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
    TransactionStatus status = txManager.getTransaction(def);
    try {
      roomDao.insertRoom(room);
      List<Equipment> equipmentList = room.getEquipmentList();
      for(Equipment item : equipmentList) {
          roomDao.insertEquipment(item);
      }
    } catch(Exception e) {
      txManager.rollback(status);
      throw new DataAccessException("error occurred by insert room" e) {};
    }
    txManager.commit(status);
  }
}
```

> TransactionTemplate

```java
@Service
public class RoomServiceImpl implements RoomService {
  @Autowired
  TransactionTemplate transactionTemplate;

  @Autowired
  JdbcRoomDao roomDao;

  @Override
  public void insertRoom(final Room room) {
    transactionTemplate.execute(new TransactionCallbackWithoutResult() {
      @Override
      protected void doInTransactionWithoutResult(TransactionStatus status) {
        roomDao.insertRoom(room);
        List<Equipment> equipmentList = room.getEquipmentList();
        for(Equipment item : equipmentList)
          roomDao.insertEquipment(item);
      }
    })
  }
}
```

- 반환값이 있거나 없거나 모두 execute() 실행
  - 반환값있을때 : TransactionCallback 객체를 인수로 가짐 (반환값있음)
  - 반환값없을때 : TransactionCallbackWithoutResult 객체를 인수로 가짐
- doInTransaction 구현 (반환값이 필요한 경우)
- doInTransactionWithoutResult 구현 (반환값이 필요없는 경우)
  - 해당메서드안의 처리내용이 하나의 트랜잭션

> 빈정의

```java
@Configuration
public class AppConfig {

  @Bean
  public TransactionTemplate transactionTemplate(PlatformTransactionManager transactionManager) {
    TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
    transactionTemplate.setIsolationLevel(TransactionDefinition.ISOLATION_READ_COMMITED);
    transactionTemplate.setTimeout(30);
    return transactionTemplate;
  }
}
```


### 트랜잭션 격리수준

- 참조하는 데이터나 변경한 데이터를 다른 트랜잭션으로부터 어떻게 격리할지를 결정
- 격리수준은 여러 트랜잭션의 동시실행과 데이터의 일관성과 관련이 깊음

> 스프링에서 지원하는 격리수준

- DEFAULT
  - 사용하는 DB의 기본격리수준
- READ_UNCOMMITTED
  - 더티리드(Dirty Read), 반복되지않은읽기(Unrepeatable Read), 팬텀읽기(Phantom Read)가 발생
  - 커밋되지 않은 변경데이터를 다른 트랜잭션에서 참조하는 것을 허용
  - 만약 데이터가 롤백된 경우 다음 트랜잭션에서 무효한 데이터를 조회
- READ_COMMITED
  - 더티리드를 방지하지만 반복되지않은읽기, 팬텀읽기는 발생
  - 커밋되지 않은 변경데이터를 댜른 트랜잭션에서 참조하는 것을 방지
- REPEATABLE_READ
  - 더티리드, 반복되지않은읽기는 방지하지만 팬텀읽기는 발생
- SERIALIZABLE
  - 모두방지

### 트랜잭션 전파방식

트랜잭션의 경계에서 트랜잭션에 참여하는 방법을 결정

> 트랜잭션 경계와 전파방식

- 트랜잭션 전파방식을 의식해야하는 경우는 트랜잭션의 경계가 중첩될 때

> 트랜잭션 방식

- REQUIRED
  - 이미 만들어진 트랜잭션이 존재하면, 해당 트랜잭션 관리 범위안에 함계 들어감
  - 존재하지 않으면 새로이 트랜잭션을 생성
- REQUIRED_NEW
  - 반드시 새로운 트랜잭션을 생성
  - 이미 만들어진 트랜잭션이 있다면, 보류상태가 되어 끝나기를 기다림
- MANDATORY
  - 이미 만들어진 트랜잭션 범위안에 들어가며
  - 이미 만들어진 트랜잭션이 없다면 예외가 발생
- NEVER
  - 트랜잭션을 관리하지 않음
  - 이미 만들어진 트랜잭션이 있다면 예외
- NOT_SUPPORTED
  - 트랜잭션을 관리하지 않음
  - 이미 만들어진 트랜잭션이 있다면 이전 트랜잭션이 끝나는 것을 기다림
- SUPPORTS
  - 이미 만들어진 트랜잭션이 있다면 범위에 들어가고
  - 없다면 트랜잭션 관리를 하지 않음
- NESTED
  - REQUIRED와 같이 동작
  - 중첩된 트랜잭션처럼 취급
  - NESTED구간 안에서 롤백이 발생한 경우 구간안의 처리내용은 모두 롤백
  - NESTED구간 밖에서 롤백이 발생한 경우 처리내용은 롤백되지 않음
  - 단, 부모 트랜잭션에서 롤백시 NESTED 구간의 트랜잭션은 모두 롤백

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
