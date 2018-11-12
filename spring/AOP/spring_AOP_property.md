
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [프로퍼티](#프로퍼티)
* [빈정의시 프로퍼티](#빈정의시-프로퍼티)
* [빈구현시 프로퍼티](#빈구현시-프로퍼티)

<!-- /code_chunk_output -->

### 프로퍼티

> 각종 설정값이 소스코드 안에 기재된 예제

```java
@Bean(destroyMethod="close")
DataSource dataSource() {
  BasicDataSource dataSource = new BasicDataSource();
  dataSource.setDriverClassName("org.postgresql.Driver");
  dataSource.setUrl("jdbc:postgresql://localhost:5432/demo");
  dataSource.setUsername("demo");
  dataSource.setPassword("pass");
  dataSource.setDefaultAutoCommit(false);
  return dataSource;
}
```

- 향후 데이터 접속 대상이 바뀔때마다 빈을 다시 정의해야함
- 스프링은 설정정보를 효율적으로 다룰 수 있는 메커니즘 제공

### 빈정의시 프로퍼티

```java
@Bean(destroyMethod="close")
DataSource dataSource(@Value("${datasource.driver-class-name}") String driverClassName,
                      @Value("${datasource.url}") String url,
                      @Value("${datasource.username}") String username,
                      @Value("${datasource.password}") String password) {
  BasicDataSource dataSource = new BasicDataSource();
  dataSource dataSource = new BasicDataSource();
  dataSource.setDriverClassName(driverClassName);
  dataSource.setUrl(url);
  dataSource.setUsername(username);
  dataSource.setPassword(password);
  dataSource.setDefaultAutoCommit(false);
  return dataSource;
}
```

```xml
<bean id="realDataSource" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close" >
  <property name="driveClassName" value="${datasource.driver-class-name}" />
  <property name="url" value="${datasource.url}" />
  <property name="username" value="${datasource.username}" />
  <property name="password" value="${datasource.password}" />
  <property name="defaultAutoCommit" value="false" />
</bean>
```

> 프로퍼티 파일정의 예제

```
datasource.driver-class-name=org.postgresql.Driver
datasource.url=jdbc:postgresql://localhost:5432/demo
datasource.useranme=demo
datasource.password=pass
```

> 프로퍼티 파일위치지정 ( 자바기반 )

```java
@Configuration
@PropertySource("classpath:application.properties")
public class AppConfig {

}
```

> 프로퍼티 파일위치지저 ( Xml기반 )

```xml
<beans>
  <context:property-placeholder location="classpath:application.properties" />
</beans>
```

- .properties 로 끝나는 파일은 일괄적으로 처리된 프로퍼티를 담고 있는 파일
- 그외에 JVM 시스템 프로퍼티 , 환경변수 설정값 등등 프로퍼티처럼 다룰 수 있음
- 만약 중복된 프로퍼티가 있다면 우선순쉬가 적용됨
  - JVM 시스템 프로퍼티
  - 환경변수
  - 프로퍼티파일
- 기본값 "${프로퍼티키:기본값}"

> 프로퍼티기본값 설정

```java
<bean id="realDataSource" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close" >
  <property name="driveClassName" value="${datasource.driver-class-name:defaultDriveClassName}" />
  <property name="url" value="${datasource.url:defaultUrl}" />
  <property name="username" value="${datasource.username:defaultUserName}" />
  <property name="password" value="${datasource.password:defaultPassword}" />
  <property name="defaultAutoCommit" value="false" />
</bean>
```

### 빈구현시 프로퍼티

> 빈구현 소스코드에서 @Value를 통해 프로퍼티값 주입

```java
@Component
public class Authenticator {
  @Value("${failureCountToLock:5}")
  int failureCountToLock;

  // 인증처리
  public void authenticate(String username, String password) {
    if(failCount >= failureCountToLock)
      // 잠금
  }
}
```

> @Value를 통해 프로퍼티값 주입 (자바기반)

```java
@Configuration
public class AppConfig {
  @Value("${datasource.driver-class-name}")
  String driverClassName;
  @Value("${datasource.url}")
  String url;
  @Value("${datasource.username}")
  String username;
  @Value("${datasource.password}")
  String password;

  @Bean(destroyMethod="close")
  DataSource dataSource() {
    BasicDataSource dataSource = new BasicDataSource();
    dataSource dataSource = new BasicDataSource();
    dataSource.setDriverClassName(driverClassName);
    dataSource.setUrl(url);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    dataSource.setDefaultAutoCommit(false);
    return dataSource
  }
}
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
