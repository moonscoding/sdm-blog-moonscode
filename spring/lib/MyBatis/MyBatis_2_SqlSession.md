<div class="pull-right"> 업데이트 :: 2018.11.13 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[SqlSession](#sqlsession)
-	[SqlSessionTemplate](#sqlsessiontemplate)
-	[SqlSessionDaoSupport](#sqlsessiondaosupport)

<!-- /code_chunk_output -->

### SqlSession

-	마이바티스는 SqlSession 생성을 위해 SqlSessionFactory를 사용
	-	세션을 한번 생성하면 매핑구문을 실행하거나 커밋 또는 롤백을 하기 위해 세션을 사용
	-	마지막으로 더 이상 필요하지 않은 상태가 되면 세션을 닫음

> 마이바티스 스프링 연동 모듈

```xml
<dependency>
  <groupId>org.mybatis</groupId>
  <artifactId>mybatis-spring</artifactId>
  <version>x.x.x</version>
</dependency>
```

-	SqlSessionFactory를 직접 사용하지 않음
-	설정에 따라 자동으로 커밋 혹은 롤백을 수행하고 닫혀지는, 스레드에 안전한 SqlSession 개체가 스프링 빈에 주입

### SqlSessionTemplate

-	스프링 연동모듈의 핵심
-	SqlSession을 구현하고 코드에서 SqlSession을 대체하는 역할을 합니다.
-	스레드에 안전하고 여러개의 DAO나 매퍼에서 공유가능

```xml
<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
  <constructor-arg index="0" ref="sqlSessionFactory" />
</bean>
```

-	SqlSessionTemplate은 생성자인자로 SqlSessionFactory를 사용해서 생성가능

```xml
<bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
  <constructor-arg index="0" ref="sqlSessionFactory" />
  <constructor-arg index="1" value="BATCH" />
</bean>
```

-	SqlSessionTemplate은 인자로 ExecutorType을 가지는 생성자를 가짐
-	스프링 설정 XML을 다음처럼 설정해서 배치 형태의 SqlSession을 만들 수도 있음
	-	DAO 코드를 다음과 같이 작성햇다면 모든 구문은 배치형태로 실행

```java
public class UserDaoImpl implements UserDao {

  private SqlSession sqlSession; // sqlSessionTemplate injection

  public void setSqlSession(SqlSession sqlSession) {
    this.sqlSession = sqlSession;
  }

  public User getUser(String userId) {
    return (User) sqlSession.selectOne("org.mybatis.spring.sample.mapper.UserMapper.getUser", userId);
  }

}
```

```xml
<bean id="userDao" class="org.mybatis.spring.sample.dao.UserDaoImpl">
  <property name="sqlSession" ref="sqlSession" />
</bean>
```

-	DAO빈에 sqlSessionTemplate을 직접 주입 - 다음과 같이 SqlSession(sqlSessionTemplate) 프로퍼티를 설정

```java
public void insertUsers(User[] users) {
   for (User user : users) {
     sqlSession.insert("org.mybatis.spring.sample.mapper.UserMapper.insertUser", user);
   }
 }
```

-	SqlSessionFactory의 디폴트 형태가 아닌 다른 형태로 메서드를 실행해야 할때만 사용할 필요
-	다른 실행자(executor) 타입을 사용할 때
	-	이미 시작된 트랜잭션을 사용하지 못함
	-	SqlSessionTemplate의 메서드를 구분된 트랜잭션이나 트랜잭션 외부에서 호출하는지 확실히 해야함

### SqlSessionDaoSupport

-	SqlSession이 제공하는 추상클래스
	-	getSqlSession() :
		-	SQL을 처리하는 마이바티스 메서드를 호출하기 위해 사용할 SqlSessionTemplate을 얻음
	-	대게 MapperFactoryBean은 추가적인 코드가 필요없기에 이 클래스 선호
		-	하지만, DAO에서 마이바티스가 필요하지 않고, 구현된 클래스가 필요하지 않을때만 유용

> SqlSessionDaoSupport는 SqlSessionFactory & SqlSessionTemplate 프로퍼티를 셋팅해야함

```java
public class UserDaoImpl extends SqlSessionDaoSupport implements UserDao {
  public User getUser(String userId) {
    return (User) getSqlSession().selectOne("org.mybatis.spring.sample.mapper.UserMapper.getUser", userId);
  }
}
```

```xml
<bean id="userMapper" class="org.mybatis.spring.sample.mapper.UserDaoImpl">
  <property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
