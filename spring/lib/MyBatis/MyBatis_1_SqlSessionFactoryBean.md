<div class="pull-right"> 업데이트 :: 2018.11.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[Quick Setup](#quick-setup)
-	[SqlSessionFactoryBean](#sqlsessionfactorybean)

<!-- /code_chunk_output -->

### Quick Setup

```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis-spring</artifactId>
  <version>x.x.x</version>
</dependency>
```

-	의존성 추가

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
  <property name="dataSource" ref="dataSource" />
</bean>
```

-	SqlSessionFactory는 DataSource를 필요로 함
	-	DataSource :
		-	자바 애플리케이션에 DataBase를 연동하기 위한 추상화된 객체

```java
public interface UserMapper {
  @Select("SELECT * FROM users WHERE id = #{userId}")
  User getUser(@Param("userId") String userId);
}
```

```xml
<bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
  <property name="mapperInterface" value="org.mybatis.spring.sample.mapper.UserMapper" />
  <property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```

-	Mapper는 반드시 구현체 클래스가 아닌 인터페이스로 정의
-	UserMapper 인터페이스는 MapperFactoryBean을 사용해서 스프링 DI 컨테이너에 추가
	-	MapperFactoryBean :
		-	SqlSession을 생성하고 닫는 작업을 다룸
		-	실행중인 스프링 트랜잭션이 있다면 트랜잭션이 완료되는 시점에 커밋이나 롤벡이 처리

```java
public class FooServiceImpl implements FooService {

  private UserMapper userMapper;

  public void setUserMapper(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  public User doSomeBusinessStuff(String userId) {
    return this.userMapper.getUser(userId);
  }

}
```

-	마이바티스의 데이터 관련 메서드를 호출하는 방법

### SqlSessionFactoryBean

-	마이바티스는 SqlSessionFactory를 SqlSessionFactoryBuilder를 사용해서 생성
-	마이바티스 연동모듈에서는 SqlSessionFactoryBean이 대신 사용

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
  <property name="dataSource" ref="dataSource" />
</bean>
```

```java
SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
SqlSessionFactory sessionFactory = factoryBean.getObject();
```

-	SqlSessionFactoryBean
	-	스프링의 FactoryBean 인터페이스를 구현
	-	스프링이 SqlSessionFactoryBean을 직접 생성하는 것이 아니라 팩토리에서 getObject() 메서드를 호출한 결과를 리턴

> 일반적으로, SqlSessionFactoryBean이나 관련된 SqlSessionFactory를 직접 사용할 필요가 없다. <br> 세션팩토리가 MapperFactoryBean나 SqlSessionDaoSupport를 확장하는 다른 DAO에 주입될것이다.

-	SqlSessionFactory
	-	JDBC의 DataSource의 필수 프로퍼티 필요
	-	설정파일이 마이바티스 설정을 완전히 다룰 필요는 없음
	-	설정파일이 필요한 이유는 마이바티스 XML 파일이 매퍼 클래스와 동일한 클래스패스에 있지 않은 경우
		-	[두가지 옵션]
		-	1. 마이바티스 설정파일에 \<mappers> 섹션을 사용해서 XML 파일의 클래스 패스를 지정
		-	2. 팩토리 빈의 mapperLocations 프로퍼티를 사용

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
  <property name="dataSource" ref="dataSource" />
  <property name="mapperLocations" value="classpath*:sample/config/mappers/**/*.xml" />
</bean>
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com

http://www.mybatis.org/spring/ko/factorybean.html
