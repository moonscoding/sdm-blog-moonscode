
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [의존성주입 종류](#의존성주입-종류)
* [설정자 기반 ( Setter Injection )](#설정자-기반-setter-injection)
* [생성자 기반 ( Constructor Injection )](#생성자-기반-constructor-injection)
* [필드 기반 ( Field Injection )](#필드-기반-field-injection)

<!-- /code_chunk_output -->


### 의존성주입 종류

- 설정자 기반 의존성 주입 방식
- 생성자 기반 의존성 주입 방식
- 필드 기반 의존성 주입 방식

### 설정자 기반 ( Setter Injection )

```java
public class UserServiceImpl implements UserService {
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  public UserServiceImpl() {

  }

  public void setUserRepository(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }
}
```

java기반(bean이용)

```java
@Bean
UserService userService() {
  UserServiceImpl userService = new UserRepositoryImpl();
  userService.setUserRepository(userRepository());
  userService.setPasswordEncoder(passwordEncoder());
}
```

java기반(매게변수)

```java
@Bean
UserService userService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
  UserServiceImpl userService = new UserRepositoryImpl();
  userService.setUserRepository(userRepository);
  userService.setPasswordEncoder(passwordEncoder);
}
```

xml기반

```xml
<bean id="userService" class="com.example.demo.UserService">
  <property name="userRepository" ref="userRepository" />
  <property name="passwordEncoder" ref="passwordEncoder" />
</bean>
```

Annotation기반

```java
@Component
public class UserServiceImpl implements UserService {
  private UserRepository userRepository;
  private PasswordEncoder passwordEncoder;

  @Autowired
  public void setUserRepository(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Autowired
  public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }
}
```

- @Autowired를 달아주면 java기반의 설정방식이나 xml기반의 설정방식이 필요 없음

### 생성자 기반 ( Constructor Injection )

xml 기반 ( 인덱스사용 )

```xml
<bean id="userService" class="com.example.demo.UserServiceImpl">
  <constructor-arg index="0" ref="userRepository" />
  <constructor-arg index="1" ref="passwordEncoder" />
</bean>
```

xml 기반 ( 인수명사용 )
```xml
<bean id="userService" class="com.example.demo.UserServiceImpl">
  <constructor-arg name="userRepository" ref="userRepository" />
  <constructor-arg name="passwordEncoder" ref="passwordEncoder" />
</bean>
```

- 인수명은 매개변수의 순서가 바뀌어도 괜찮다는 장점
- 인수명 정보는 소스코드가 컴파일 되는 과정에서 사라짐
  - @ConstuctorProperties Annotation을 사용하면 인자값을 컴파일 후에도 유지

```java
@ConstructorProperties({"userRepository", "passwordEncoder"})
public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
  // do something...
}
```

- 컨스트럭트 인젝션만이 필드를 final로 선언해서 생성후에 변경되지 않게 만들 수 있음

### 필드 기반 ( Field Injection )

```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  UserRepository userRepository;

  @Autowired
  PasswordEncoder passwordEncoder;
}
```
- DI 컨테이너의 힘을 빌려 의존성을 주입하는 방식
- DI 컨테이너의 사용을 전제해야 한다는 것


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
