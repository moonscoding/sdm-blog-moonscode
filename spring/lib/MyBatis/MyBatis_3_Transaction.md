<div class="pull-right"> 업데이트 :: 2018.11.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

-	[Transactions](#transactions)
-	[DataSourceTransactionManager](#datasourcetransactionmanager)
-	[Container Manager Transactions (CMT)](#container-manager-transactions-cmt)
-	[Programmatic Transaction Management](#programmatic-transaction-management)
-	[EX](#ex)

<!-- /code_chunk_output -->

### Transactions

> 마이바티스 스프링 연동모듈을 사용하는 중요한 이유중 또 하나 <br> 마이바티스가 스프링 트랜잭션에 자연스럽게 연동가능 하다는 것

-	스프링 트랜잭션 관리자를 한 번 설정하면, 스프링에서 트랜잭션을 설정할 수 있음
-	@Transaction과 AOP 스타일의 설정을 모두 지원
-	하나의 SqlSession객체가 생성되고 트랜잭션이 동작하는 동안 지속적으로 사용
-	세션은 트랜잭션이 완료되면 적절히 커밋되거나 롤백됨

### DataSourceTransactionManager

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource" />
</bean>
```

```java
@Bean
public PlatformTransactionManager transactionManager() {
    return new DataSourceTransactionManager(dataSource);
}
```

-	사용하는 DataSource는 SqlSessionFactoryBean을 생성할때와 반드시 동일해야함

### Container Manager Transactions (CMT)

-	만약 JEE(Java EE) 컨테이너를 사용, 스프링을 컨테이너 관리 트랜잭션(CMT)에 놓으려 할때
	-	JtaTransactionManager 혹은 그 하위 클래스에 설정

> 네임스페이스를 이용하는 방법

```xml
<tx:jta-transaction-manager />
```

-	마이바티스는 CMT와 함께 설정된 스프링 트랜잭션 리소스처럼 동작
-	스프링은 이미 설정된 트랜잭션을 사용해 SqlSession을 이미 동작중인 트랜잭션에 넣음
-	시작된 트랜잭션이 없고 트랜잭션이 필요한 경우 스프링은 새로운 컨테이너 관리 트랜잭션을 시작

> CMT 사용하지만 스프링 트랜잭션 관리를 원지 않을때 <br> 마이바티스의 ManagedTransactionFactory를 사용하기 위해 SqlSessionFactoryBean을 설정

```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
  <property name="dataSource" ref="dataSource" />
  <property name="transactionFactory">
    <bean class="org.apache.ibatis.transaction.managed.ManagedTransactionFactory" />
  </property>  
</bean>
```

### Programmatic Transaction Management

-	프로그래밍 트랜잭션 관리
	-	마이바티스 SqlSession은 트랜잭션을 제어하는 메서드 제공
	-	하지만 기본적으로 스프링 트랜잭션 밖의 SqlSession 데이터나 매퍼 클래스의 실행은 자동으로 커밋

```java
DefaultTransactionDefinition def = new DefaultTransactionDefinition();
def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

TransactionStatus status = txManager.getTransaction(def);
try {
  userMapper.insertUser(user);
}
catch (MyException ex) {
  txManager.rollback(status);
  throw ex;
}
txManager.commit(status);
```

### EX

-	직접만든 Transaction AOP

```java
@Aspect
@Component
public class TransactionAspect {

    @Autowired
    PlatformTransactionManager txManager;

    Map<String, TransactionStatus> storeOfTransaction; // cache

    public TransactionAspect() {
        storeOfTransaction = new HashMap<String, TransactionStatus>();
    }

    @Before("execution(* *..*Service.transaction*(..))")
    public void startLog(JoinPoint jp) {
        storeOfTransaction.put(jp.toString(), createTransaction(jp.toString()));
    }

    // success
    @AfterReturning("execution(* *..*Service.transaction*(..))")
    public void successLog(JoinPoint jp) {
        txManager.commit(storeOfTransaction.get(jp.toString()));
        storeOfTransaction.remove(jp.toString());
        // System.out.println("commit");
    }

    // fail
    @AfterThrowing("execution(* *..*Service.transaction*(..))")
    public void errorLog(JoinPoint jp) {
        txManager.rollback(storeOfTransaction.get(jp.toString()));
        storeOfTransaction.remove(jp.toString());
        // System.out.println("rollback");
    }

    public TransactionStatus createTransaction(String name) {
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setName(name);
        def.setReadOnly(false);
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        return txManager.getTransaction(def);
    }

}
```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
