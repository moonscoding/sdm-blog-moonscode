<div class="pull-right"> 업데이트 :: 2018.08.22 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[데이터베이스 테스트](#데이터베이스-테스트)
	-	[테스트 데이터소스 설정](#테스트-데이터소스-설정)
	-	[테스트 데이터 적재](#테스트-데이터-적재)
	-	[테스트 트랜잭션 제어](#테스트-트랜잭션-제어)
	-	[테스트 데이터 검증](#테스트-데이터-검증)

<!-- /code_chunk_output -->

### 데이터베이스 테스트

-	테스트 데이터소스 설정
-	테스트 데이터 적재
-	테스트 케이스용 트랜잭션 제어
-	데이터 검증

#### 테스트 데이터소스 설정

-	일반적인 웹 애플리케이션에서는 애플리케이션 서버에서 관리하는 데이터 소스를 JNDI를 통해 가져옴
	-	JNDI : 디렉터리 서비스에서 제공하는 데이터 및 객체를 발견하고 참고하기 위한 자바 API다.
-	JUnit을 실행할때 그대로 이용시에 오류 발생

> 일반적으로 사용하는 데이터소의

```java
@Bean
public DataSource dataSource() throws NamingException {
  JndiTemplate jndiTemplate = new JndiTemplate();
  return jndiTemplate.lookup("jdbc/dataSource", DataSource.class);
}
```

-	테스트용 데이터 소스를 정의하고 JUnit을 실행할 때 사용할 데이터 소스를 교체해야함

> 테스트용 데이터소스

```java
@Configuration
public class TestConfig {
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .setScriptEncoding("UTF-8")
                .addScript("schema.sql")
                .build();
    }       
}
```

> classpath:schema.sql

```SQL
CREATE TABLE account {
  id CHAR(3) PRIMARY KEY,
  name VARCHAR(128)
}
```

> @ContextConfiguration 빈정의

```java
@ContextConfiguration(classes={AppConfig.class, TestConfig.class})
public class AccountRepositoryTest {

}
```

-	테스트용 빈 정의 파일의 내용이 앞에 정의된 빈의 정보를 덮어쓰게 됨

#### 테스트 데이터 적재

-	@SQL
	-	테스트케이스의 메소드를 호출하기전에 임의의 SQL 실행
	-	SQL이 실행되는 타이밍을 테스트 케이스의 메서드가 종료된 후로 바꿀 수 있음
	-	@Sql 동작을 세밀하게 커스텀하고 싶다면 config 속성에 @SqlConfig를 지정
	-	클래스레벨과 메서드레벨에 모두 사용가능

```java
@ContextConfiguration(classes={AppConfig.class, TestConfig.class})
@Sql("/account-delete.sql")
public class AccountRepositoryTest {
    @Autowired
    AccountRepository accountRepository;

    @Test
    public void testCreate() {
        Account account = new Account();
        account.setId("001");
        account.setName("홍길동");
        accountRepository.create(account);
        // 생략
    }

    @Test
    @Sql({"account-delete.sql", "/account-insert-data.sql"})
    public void testFindOne() {
        Account acccount = accountRepository.findOne("001");
        // 생략
    }
}
```

> classpath:account-delete.sql

```SQL
DELETE FROM account;
```

> classpath:account-insert.sql

```SQL
INSERT INTO account(id, name) VALUES ('001', '이순신');
INSERT INTO account(id, name) VALUES ('002', '김유신');
```

-	SQL 파일을 지정하지 않고 생략한 경우 명명규칙을 만족하는 SQL 파일 사용
	-	AccountRepository.sql
-	@Sql지정 테스트케이스의 메서드명이 testFindOne() 인 경우
	-	AccountRepositoryTest.testFindOne.sql

#### 테스트 트랜잭션 제어

-	테스트 데이터적재에 사용하는 트랜잭션과 테스트 대상에서 데이터처리에 사용하는 트랜잭션은 서로 영향을 주지 않음
	-	테스트 데이터를 적재하기 위한 SQL이 실행되면 일단 한 번 커밋처리
	-	이 후 테스트 케이스에서 데이터를 처리하는 메서드가 호출
	-	이 때 대상이 되는 빈이 트랜잭션 관리대상이라면 실행한 메서드가 정상적으로 종료될 때 테스트한 SQL 커밋
-	테스트를 하기 전에 적재돼 있어야 할 레코드가 삭제되 있거나 레코드의 상태가 바뀌어 있지 안게 해야함
	-	같은 데이터베이스를 여러 테스트 환경에서 공유할 때 JUnit을 실행중에 또 다른 테스트에서 데이터를 변경할 수 있음
	-	JUnit으로 테스트하기 우한 테스트 전용 데이터베이스를 별도로 준비
	-	스프링 테스트가 제공하는 테스트용 트랜잭션 기능을 활용

> 트랜잭션 경계의 이동

-	테스트를 실행하기 전에 전의 상태로 복원하는 방법
	-	테스트 데이터의 적재와 테스트 자체를 같은 트랜잭션 내에서 실행
	-	테스트가 끝나면 그 트랜잭션을 롤백하는 것
-	스프링 테스트에서 JUnit 실행시 트랜잭션의 경계를 테스트 케이스의 메서드 실행 전으로 이동시키는 매커니즘 제공
	-	@Sql에서 지정한 SQL 파일의 실행과 테스트를 같은 트랜잭션 안에서 처리가능
	-	테스트 케이스가 종료되면 그 트랜잭션을 롤백 가능
-	@Transactional
	-	하위에 있는 모든 테스트 케이스 메서드의 트랜잭션 경계를 이동

> 트랜잭션 경계를 테스트 케이스의 메서드 실행 전으로 이동

```java
@Test
@Transactional // 메서드레벨에지정
public void testCreate() {

}
```

-	테스트 대상의 트랜잭션의 전파방식이 REQUIRES_NEW(항상 새 트랜잭션을 생성한 후 실행)인 경우
	-	트랜잭션 경계를 테스트 케이스의 메서드 실행으로 이동해도 같은 트랜잭션에서 실행 되지 않음
	-	일부 트랜잭션 전파방식이 REQUIRES_NEW로 돼 있는 처리에서 해당 부분의 내용은 트랜잭션 경계 이동과 상관없이 커밋ㄴ

> 트랜잭션 경계에서 롤백과 커밋의 제어

-	@Transactional
	-	트랜잭션의 경계를 테스트 케이스의 메서드 실행 전으로 이동
	-	기본적으로 테스트가 종료될때 그 트랜잭션이 롤백
-	@Commit
	-	트랜잭션을 커밋해야하는 경우
	-	하위의 모든 테스트 케이스 메서드에서 트랜잭션이 커밋

> 테스트 케이스의 메서드가 종료된 후에 트랜잭션을 커밋

```java
@Transactional
@Commit
public class AccountRepositoryTest {

}
```

```java
@Transactional
@Commit
public class AccountRepositoryTest {
    @Test
    @Rollbacck
    public void testCreate() {

    }
}
```

> 영속성 컨텍스트 플러시

-	영속성 컨텍스트를 명시적으로 플러시(flush)하는 방법으로 SQL 실행
	-	트랜잭션 경계를 테스트 케이스의 메서드 실행 전으로 이동한 상태에서 JPA or 하이버네이트로 동작
	-	JPA or 하이버네이트
	-	Entity에 대한 갱신처리를 영속성 컨텍스트라고 하는 인메모리 영역에 쌓음
	-	트랜잭션을 커밋할때 SQL을 실행하는 방식으로 동작
	-	트랜잭션 경계를 테스트 케이스의 메서드 실행 전으로 이동한 상황에서 기본적으로 트랜잭션이 롤백
	-	SQL이 미쳐 실행되지 못하고 테스트가 끝날 가능성

> JPA를 이용할 때 플러시

```java
@Autowired
EntityManager entityManager;

@Test
@Transactional
public void testCreate() {
  // ...
  accountRepository.create(account);
  entityManager.flush();
  // ...
}
```

-	EntityManager 인젝션
-	assert 실행전에 EntityManager flush() 호출해서 SQL을 명시적으로 샐행

> 마이바티스를 이용할때 플러시

```java
@Autowired
SqlSession sqlSession;

@Test
@Transactional
public void testCreate() {
  // ..
  accountRepository.create(account);
  sqlSession.flushStatements();
  // ...
}
```

-	SqlSession 인젝션
-	assert 실행전에 SqlSession의 flushStatements() 호출해서 SQL을 명시적으로 실행ㄴ

#### 테스트 데이터 검증

-	데이터가 제대로 반영됬는지 데이터 값을 검증
-	JdbcTemplate을 사용해 DB 레코드를 가져와 그 레코드가 기대값과 일치하는지 확인

```java
@Configuration
public class TestConfig {
  // ..
  @Bean
  public JdbcTemplate jdbcTemplateForAssertion(DataSource dataSource) {
      return new JdbcTemplate(dataSource);
  }
}
```

```java
@Autowired
@Qualifier("jdbcTemplateForAssertion")
JdbcTemplate jdbcTemplate;

@Test
public void testCreate() {
  Account account = new Account();
  account.setId("001");
  account.setName("홍길동");
  accountRepository.create(account);

  Map<String, Object> createAccount = jdbcTemplate
          .queryForMap("SELECT id, name FROM account WHERE id = '001'");

  // == 검증 ==
  assertThat(createAccount.get("id"), is("001"));
  assertThat(createAccount.get("name"), is("홍길동"));
}
```

-	@Transactional 사용해서 트랜잭션 경계를 테스트 케이스의 실행 전으로 이동한 경우
	-	JdbcTemplate에서 사용하는 DataSource와 테스트 대상 컴포넌트에서 사용하는 DataSource를 같게 설정
	-	만약 다르면, JDBC 연결이 공유되지 않아 JdbcTemplate을 통해 가져온 레코드에 처리결과가 반영안됨

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
