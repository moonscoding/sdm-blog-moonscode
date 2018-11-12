<div class="pull-right"> 업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[구조](#구조)
-	[DataSource](#datasource)
-	[DataSourcce 설정](#datasourcce-설정)
	-	[애플리케이션모듈이 제공하는 데이터소스](#애플리케이션모듈이-제공하는-데이터소스)
	-	[애플리케이션서버가 제공하는 데이터소스](#애플리케이션서버가-제공하는-데이터소스)
	-	[내장형 데이터베이스를 사용하는 데이터 소스](#내장형-데이터베이스를-사용하는-데이터-소스)

<!-- /code_chunk_output -->

### 구조

```
Spring JDBC
    - 트랜잭션 관리자
        - DataSourceTransactionManager
        - JpaTransactionManager
        - JtaTransactionManager
    - 데이터 소스
        - Common DBCP 처럼 애플리케이션 모듈이 제공하는 데이터 소스
        - Java EE 스팩을 준수하는 애플리케이션 서버가 제공하는 데이터 소스
        - 내장형 데이터베이스를 사용하는 데이터 소스
```

### DataSource

-	데이터소스는 애플리케이션이 데이터베이스에 접근하기 위한 추상화된 연결방식
-	커넥션을 제공하는 역할

> 스프링이 제공하는 데이터소스

-	애플리케이션 모듈이 제공하는 데이터소스
-	애플리케이션 서버가 제공하는 데이터소스
-	내장형 데이터베이스르 사용하는 데이터소스

### DataSourcce 설정

> pom.xml 설정

```xml
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-jdbc</artifactId>
</dependency>
```

#### 애플리케이션모듈이 제공하는 데이터소스

```java
@Configuration
@PropertySource("classpath:jdbc.properties")
public class PoolingDataSourceConfig {
  @Bean(destroyMethod="close")
  public DataSource dataSource(
      @Value("${database.driverClassName}") String driverClassName,
      @Value("${database.url}") String url,
      @Value("${database.username}") String username,
      @Value("${database.password}") String password,
      @Value("${cp.maxTotal}") String maxTotal,
      @Value("${cp.maxIdle}") String maxIdle,
      @Value("${cp.minIdle}") String minIdle,
      @Value("${cp.maxWaitMillis}") String maxWaitMillis) {
    BasicDataSource dataSource = new BasicDataSource();
    dataSource.setDriverClassName(driverClassName);
    dataSource.setUrl(url);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    dataSource.setDefaultAutoCommit(false);
    dataSource.setMaxTotal(maxTotal);
    dataSource.setMaxIdle(maxIdle);
    dataSource.setMinIdle(minIdle);
    dataSource.setMaxWaitMillis(maxWaitMillis);
    return dataSource;
  }
}
```

-	Commons DBCP가 제공하는 데이터 소스 객체를 빈으로 정의
-	종료시에 관련 리소스가 해제될 수 있도록 destoryMethod에 'close()' 설정

> 프로퍼티 설정파일

```
database.driverClassName=org.postgresql.Driver
database.url=jdbc:postgresql://localhost/sample
database.username=demo
database.password=pass
cp.maxTotal=96
cp.maxIdle=16
cp.minIdle=0
cp.maxWaitMillis=60000
```

#### 애플리케이션서버가 제공하는 데이터소스

> 데이터소스정의 (자바기반)

```java
@Configuration
public class JndiDataSourceConfig {
  @Bean
  public DataSource dataSource() {
    JndiTemplate jndiTemplate = new JndiTemplate();
    return jndiTemplate.lookup("java.comp/env/jdbc/mydb", DataSource.class);
  }
}
```

-	애플리케이션서버에 있는 리소스를 JNDI를 통해 룩업하기 위해 JndiTemplate 클래스의 인스턴스를 생성
-	lookup 메소드로 JNDI명이 "java.comp/env/jdbc/mydb"인 리소스(데이터소스)를 찾아옴

> 데이터소스정의 ( Xml기반 )

```xml
<beans
  jee관련설정추가>
  <jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/mydb" />
</beans>
```

#### 내장형 데이터베이스를 사용하는 데이터 소스

-	애플리케이션이 가동될때 마다 데이터베이스가 새로 구축
-	DDL(Data Definition Language), 테이블과 같은 기본 구조를 만들기 위함
-	DML(Data Manipulation Language), 초기 데이터를 적재하기 위함

> 데이터소스 정의 ( 자바기반 )

```java
@Configuration
public class DataSourceEmbeddedConfig {
    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .setScriptEncoding("UTF-8")
            .addScript("META-INF/sql/schema.sql", "META-INF/sql/insert-init-data.sql")
            .build();
    }
}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
