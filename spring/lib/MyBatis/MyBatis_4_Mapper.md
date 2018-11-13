\`<div class="pull-right"> 업데이트 :: 2018.11.13 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[Mapper Injection](#mapper-injection)
-	[Mapper 등록](#mapper-등록)
-	[Mapper 검색](#mapper-검색)

<!-- /code_chunk_output -->

### Mapper Injection

-	데이터접근객체인 DAO를 만드는 것보다 직접 "SqlSessionTemplate" 혹은 "SqlSessionDaoSupport를" 사용
-	마이바티스 스프링연동모듈은 다른 빈에 직접 주입할 수 있는 스레드 안전한 매퍼를 생성가능

```xml
<bean id="fooService" class="org.mybatis.spring.sample.mapper.FooServiceImpl">
  <property name="userMapper" ref="userMapper" />
</bean>
```

```java
public class FooServiceImpl implements FooService {

  private UserMapper userMapper; // injection

  public void setUserMapper(UserMapper userMapper) { // injection
    this.userMapper = userMapper;
  }

  public User doSomeBusinessStuff(String userId) {
    return this.userMapper.getUser(userId);
  }

}
```

### Mapper 등록

-	mapper 등록 2가지 방법
	-	xml 설정사용
		-	mapper는 xml 설정파일에 MapperFactoryBean을 두는 것으로 스프링에 등록
	-	java 설정사용
		-	스프링의 Java Config 기능을 사용하면 SqlSessionTemplate에서 직접 매퍼를 얻음

> xml 설정

```XML
<bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
  <property name="mapperInterface" value="org.mybatis.spring.sample.mapper.UserMapper" />
  <property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```

> java 설정

```java
@Bean
public SqlSessionFactory sqlSessionFactory() throws Exception {
  SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
  sqlSessionFactory.setDataSource(dataSource());
  return (SqlSessionFactory) sqlSessionFactory.getObject();
}

@Bean
public UserMapper userMapper() throws Exception {
  SqlSessionTemplate sessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
  return sessionTemplate.getMapper(UserMapper.class);
}
```

### Mapper 검색

-	\<mybatis:scan/> 엘리먼트 사용
-	@MapperScan 어노테이션 사용
-	스프링 xml 파일을 사용해서 MapperScannerConfigurer 등록

> \<mybatis:scan/>

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:mybatis="http://mybatis.org/schema/mybatis-spring"
  xsi:schemaLocation="
  http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
  http://mybatis.org/schema/mybatis-spring http://mybatis.org/schema/mybatis-spring.xsd">

  <mybatis:scan base-package="org.mybatis.spring.sample.mapper" />

</beans>
```

-	\<mybatis:scan/>은 스프링에서 제공하는 \<context:component-scan/> 와 유사한 방법으로 매퍼 검색
	-	base-package 속성은 매퍼 인터페이스 파일이 있는 가장 상위 패키지를 지정
	-	자동으로 주입할 수 있는 MapperFactoryBean을 생성, SqlSessionFactory 혹은 SqlSessionTemplate을 명시하지 않음
		-	한개 이상의 DataSource를 이용한다면 자동주입이 생각처럼 동작하지 않음
		-	factory-ref 혹은 template-ref를 이용해서 처리할 수 있음

> @MapperScan

```java
@Configuration
@MapperScan("org.mybatis.spring.sample.mapper")
public class AppConfig {

  @Bean
  public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder().addScript("schema.sql").build()
  }

  @Bean
  public SqlSessionFactory sqlSessionFactory() throws Exception {
    SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
    sessionFactory.setDataSource(dataSource());
    return sessionFactory.getObject();
  }
}
```

-	\<mybatis:scan/>과 동일하게 동작
-	markerInterface 혹은 annotationClass 프로퍼티를 사용해서 마커 인터페이스와 애노테이션 클래스를 명시

> MapperScannerConfigurer

```xml

<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
  <property name="basePackage" value="org.mybatis.spring.sample.mapper" />
</bean>
```

-	평범한 빈처럼 xml 애플리케이션 컨텍스트에 포함된 BeanDefinitionRegistryPostProcessor

```xml
<property name="sqlSessionFactoryBeanName" value="sqlSessionFactory" />
```

-	sqlSessionFactory 혹은 SqlSessionTemplate을 지정할 필요가 있다면 빈참조가 아닌 빈이름이 필요
	-	value : 프로퍼티 빈 이름을 지정
	-	ref : 빈 참조를 지정하기 때문에 value 프로퍼티 사용

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com\`
