
<div class="pull-right">  업데이트 :: 2018.08.07 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [오토와이어링](#오토와이어링)
* [타입으로 오토와이어링](#타입으로-오토와이어링)
* [이름으로 오토와이어링](#이름으로-오토와이어링)
* [컬렉션이나 맵으로 오토와이어링](#컬렉션이나-맵으로-오토와이어링)

<!-- /code_chunk_output -->

### 오토와이어링

자바기반 설저방식이나 XML기반 설정방식에서 명시적으로 Bean을 선언하는 것과 다르게

DI 컨테이너에 빈을 자동으로 주입하는 방식

### 타입으로 오토와이어링

- @Autowired 애너테이션은 타입으로 오토와이어링 하는 방식
- 의존성주입이 반드시 성공한다는 가정
  - DI 컨테이너 안에서 찾지 못하면 'NoSuchBeanDefinitionException' 에외발생
  - 'required' 속성을 false 처리하면 필수조건이 완화 ( java.util.Optional 속성도 가능 )

required 사용

```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired(required = false)
  PasswordEncoder PasswordEncoder;
}
```

Optional 사용

```java
@Autowired
Optional<PasswordEncoder> passwordEncoder;

public void createUser(User user, String rawPassword) {
  String encodedPassword = passwordEncoder.map(x -> x.encode(rawPassword)).orElse(rawPassword);
}
```

두 개의 PasswordEncoder를 자바기반 설정방식으로 정의

```java
@Configuaration
@Component
public class AppConfig {
  @Bean
  PasswordEncoder sha256PasswordEncoder() {
    return new Sha256PasswordEncoder();
  }

  @Bean
  PasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
```

- 다음과 같은 예제는 @Autowired 만으로 빈을 구분하지 못함
- @Qualifier 애너테이션으로 이름을 명시해 줘야함

@Qualifier로 이름을 명시하는 사용하는 방식

```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  @Qualifier("sha256PasswordEncoder")
  PasswordEncoder passwordEncoder;
}
```

@Primary를 사용해 기본빈을 설정하는 방식

```java
@Configuaration
@Component
public class AppConfig {
  @Bean
  PasswordEncoder sha256PasswordEncoder() {
    return new Sha256PasswordEncoder();
  }

  @Bean
  @Primary
  PasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
```

특정이름이 아닌 포괄적인 목적에 맞춰 @Qualifier 이름을 설정한 예

```java
@Configuaration
@Component
public class AppConfig {
  @Bean(name = "lightweight")
  PasswordEncoder sha256PasswordEncoder() {
    return new Sha256PasswordEncoder();
  }

  @Bean
  @Primary
  PasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
```

```java
@Component
public class UserServiceImpl implements UserService {
  @Autowired
  @Qualifier("lightweight")
  PasswordEncoder passwordEncoder;
}
```

- 특정이름을 지정한것은 DI의 목적에 위배
- 포괄적인 특징으로 이름을 설정해야함

@Qualifier 역할을 할 @Lightweight 애너테이션을 구현

```java
@Target({ElementType.FIELD, ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Qualifier
public @interface Lightweight {}
```

```java
@Configuaration
@ComponentScan
public class AppConfig {
  @Bean
  @Lightweight
  PasswordEncoder sha256PasswordEncoder() {
    return new Sha256PasswordEncoder();
  }

  @Bean
  @Primary
  PasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
```

```java
@Autowired
@Lightweight
PasswordEncoder passwordEncoder;
```

- 다음과 같이 구현 정보가 직접 노출되는 애너테이션 이름은 피하고 포괄적인 이름을 설정하는 것이 좋음

### 이름으로 오토와이어링

빈의 이름이 필드명이나 프로퍼티명과 일치할 경우 빈 이름으로 필드 인젝션을 하는 방법

```java
@Component
public class UserServiceImpl implements UserService {
  @Resource(name="sha256PasswordEncoder")
  PasswordEncoder passwordEncoder;
}
```

- @Resource 애너테이션의 name 속성은 생략이 가능
- 필드 인젝션을 하는 경우 필드 이름과 같은 이름의 빈이 선택

@Resource 애너테이션으로 필드 인젝션하는 상황 ( 필드이름과 일치 )

```java
@Component
public class UserServiceImpl implements UserService {
  @Resource
  PasswordEncoder sha256PasswordEncoder;
}
```

@Resource 애너테이션으로 세터 인젝션하는 상황 ( 프로퍼티과 일치 )

```java
@Component
public class UserServiceImpl implements UserService {
  private PasswordEncoder passwordEncoder;

  @Resource
  public void setSha256PasswordEncoder( PasswordEncoder passwordEncoder ) {
    this.passwordEncoder = passwordEncoder;
  }
}
```

- 프로퍼티 이름과 같은 이름의 빈이 선택
- 컨스트럭트 인젝션엔 @Resource 애너테이션을 사용할 수 없음

### 컬렉션이나 맵으로 오토와이어링

빈을 컬렉션이나 맵에 담아서 가져오는 방법

```java
public interface IF<T> {
}

@Component
public class IntIF1 implements IF<Integer> {
}

@Component
public class IntIF2 implements IF<Integer> {
}

@Component
public class StringIF implements IF<String> {
}
```

```java
@Autowired
List<IF> ifList;

@Autowired
Map<String, IF> ifMap;
```

- list : { IntIF1, IntIF2, StringIF }
- map : { intIF1 = IntIF1, intIF2 = IntIF2, stringIF = StringIF }

```java
@Autowired
List<IF<Integer>> ifList;

@Autowired
Map<String, IF<Integer>> ifMap;
```

- list : { IntIF1, IntIF2 }
- map : { intIF1 = IntIF1, intIF2 = IntIF2 }

리스트나 맵으로 빈을 정의하기

```java
@Bean
List<IF> ifList() {
  return Arrays.asList(new IntIF1(), new IntIF2(), new StringIF());
}

@Bean
Map<String, IF> ifMap() {
  Map<String, IF> map = new HashMap<>();
  map.put("intIF1", new IntIF1());
  map.put("intIF2", new IntIF2());
  map.put("stringIF", new StringIF());
  return map;
}
```

```java
@Autowired
@Qualifier("ifList")
List<IF> ifList;

@Autowired
@Qualifier("ifMap")
Map<String, IF> ifMap;
```

- 다음과 같은 방식은 @Autowired 애너테이션을 사용해도 실제로 오토 와이어링 되지 않음

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
