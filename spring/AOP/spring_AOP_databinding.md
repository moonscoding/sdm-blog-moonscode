
<div class="pull-right">  업데이트 :: 2018.08.08 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [데이터바인딩과 형변환](#데이터바인딩과-형변환)
* [String 데이터바인딩](#string-데이터바인딩)
* [스프링의 형변환](#스프링의-형변환)
	* [빈을 조작하거나 래핑](#빈을-조작하거나-래핑)
	* [형변환](#형변환)
	* [필드값의 표현형식 포매팅](#필드값의-표현형식-포매팅)
	* [ConversionService](#conversionservice)
	* [포매팅용 애너테이션](#포매팅용-애너테이션)
* [커스터마이징](#커스터마이징)
	* [형변환방식](#형변환방식)
	* [필드포매팅방식](#필드포매팅방식)

<!-- /code_chunk_output -->

### 데이터바인딩과 형변환

- 데이터바인딩 (DataBinding)
  - 자바 객체의 프로퍼티에서 외부에서 입력된 값을 설정하는 과정
- 자바빈즈 (JavaBeans)
  - 데이터바인딩이나 프로퍼티관점에서 다뤄지는 객체

> 요청 파라미터 값을 담기 위한 자바빈즈

```java
public class EmployeeForm {
  private String name;
  private Integer joinedYear;
  // skip
}
```

> 설정자 메서드(setter)를 통한 프로퍼티 설정

```java
EmployeeForm form = new EmployeeForm();
form.setName(request.getParameter("name"));
form.setJoinedYear(Integer.valueOf(request.getParameter("joinedYear"))); // 형변환
```

- getParameter 메서드에서 요청 파라미터 값을 받음
- 그 값을 자바빈즈의 설정자 메서드를 통해 프로퍼티로 지정

### String 데이터바인딩

```java
EmployeeForm form = new EmployeeForm();
ServletRequestDataBinder dataBinder = new ServletRequestDataBinder(form);
dataBinder.bind(request);
```

- ServletRequestDataBinder 클래스 사용
- 매개변수의 갯수의 제약이 없음
- MVC의 데이터 바인딩을 활용하면 이 3줄 마저도 불필요

### 스프링의 형변환

데이터바인딩을 처리시 자바빈즈의 프로퍼티 타입에 맞게 입력된 문자열 값을 형변환해야함

<스프링이 제공하는 3가지 형변환 방식>

- 빈을 조작하거나 래핑
- 형 변환
- 필드값의 표현형식 포매팅

#### 빈을 조작하거나 래핑

- 빈을 래핑하는 BeanWrapper 인터페이스는 개발자가 직접 조작할 일이 적음
- 스프링 내부에서 DataBinder 클래스나 BeanFactory 인터페이스의 구현체를 활용
- 개발자는 BeanWrapper 대신 PropertyEditor 인터페이스의 구현 클래스를 활용해서 형변환
  - 자바빈즈의 프로퍼티를 설정할때 프리미티브타입이나 또는 그외에 다양한 타입도 무리없이 형변환 지원

> 프로퍼티 파일로 기본 설정 값 재정의

```
application.healthCheck = yes
```

> 빈에서 프로퍼티의 기본값 설정

```java
@Component
public class ApplicationProperties {
  @Value("${application.healthCheck:no}")
  private boolean healthCheckEnabled; // true 설정
}
```

- PropertyEditor 지원타입이외에도 다른 타입을 프로퍼티로 설정하고 싶다면 직접 개발해서 추가가능

#### 형변환

- Converter 인터페이스 등의 구현 클래스를 활용해서 형변환
  - PropertyEditor는 변환하기전의 값이 String 타입으로 제한
  - Converter는 String외의 타입에 대해서도 형변환

#### 필드값의 표현형식 포매팅

- Formatter 인터페이스등의 구현 클래스를 활용해 형변환
  - Formatter 는 String과 임의의 클래스를 상호 변환하기 위한 인터페이스
  - 형변환시에 로컬(Local)을 고려한 국제화 기능도 제공
  - 주로 숫자와 날짜와 같이 로컬에 따라 다른 포맷 형태를 가진 클래스와 형변환에서 사용

#### ConversionService

형변환을 하거나 필드값의 표현형식을 포매팅하는 기능은 ConversionService 인터페이스로 제공

다양한 구현클래스중 DefaultFormattingConvertionService 클래스를 사용하는 것이 일반적

> 자바기반으로 ConversionService 등록

```java
@Bean
public ConversionService conversionService() {
  return new DefaultFormattingConvertionService();
}
```

> XML기반으로 ConversionService 등록

```xml
<bean id="conversionService" class="org.springframework.format.support.FormattingConversionServiceFactoryBean" />
```

> 프로퍼티 파일로 기본 설정값 재정의

```
application.dataOfServiceStarting = 2017-05-10
```


> 빈에서 프로퍼티 기본값 설정

```java
@Component
public class ApplicationProperties {

  @Value("${application.dataOfServiceStarting:}")
  private java.time.LocalDate dataOfServiceStarting;

}
```

#### 포매팅용 애너테이션

DefaultFormattingConvertionService 활용시에

형변환이 필요한 곳에 애너테이션을 붙이고 형변환시 적용할 포맷형식을 정할 수 있음

- @DataTimeFormat
- @NumberFormat

> 포맷을 명시적으로 지정

```java
@Component
public class ApplicationProperties {
  @Value("$application.dateOfServiceStarting:")
  @DataTimeFormat(pattern="yyyy/MM/dd") // 포맷명시
  private java.time.LocalDate dateOfServiceStarting;
}
```

### 커스터마이징

#### 형변환방식

> Converter 인터페이스를 사용 String 타입정보를 사용자 정의 클래스 타입으로 형변환

```java
public class EmailValue {
  @Size(max = 256)
  @Email
  private String value;

  public void setValue(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  public String toString() {
    return getValue();
  }
}
```

```java
public class StringToEmailValueConverter implements Converter<String, EmailValue> {
  @Override
  public EmailValue convert(String source) {
    EmailValue email = new EmailValue();
    email.setValue(source);
    return email;
  }
}
```

> 자바기반 사용자정의 Converter 추가

```java
@Bean
public ConversionService conversionService() {
  DefaultFormattingConvertionService conversionService =
    new DefaultFormattingConvertionService();
  // addConverter 메서드의 매개변수로 작성한 Converter를 지정
  conversionService.addConverter(new StringToEmailValueConverter());
  return conversionService;
}
```

> Xml기반 사용자정의 Converter 추가

```xml
<bean id="conversionService" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
  <property name="converter">
    <list>
      <bean class="com.example.demo.StringToEmailValueConverter" />
    </list>
  </property>
</bean>
```

#### 필드포매팅방식

> 자바기반 Formatter 추가

```java
@Bean
public ConversionService conversionService() {
  DefaultFormattingConvertionService conversionService =
    new DefaultFormattingConvertionService();
  DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
  // BASIC_ISO_DATE 형식사용
  registrar.setDateFormatter(DateTimeFormatter.BASIC_ISO_DATE);
  registrar.registerFormatter(conversionService);
  return conversionService;
}
```

> Xml기반 Formatter 추가

```xml
<bean id="conversionService" class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
  <property name="formattingRegistrars">
    <list>
      <bean class="org.springframework.format.datetime.standard.DateTimeFormatterRegistrar">
        <property name="dateFormatter" value="BASIC_ISO_DATE" />
      </bean>
    </list>
  </property>
</bean>
```

- dateOfServiceStarting 프로퍼티에 대해 기본값이 따로 없음
- 프로퍼티 파일에서 설정한 값을 읽도록 처리됨

> 프로퍼티파일 설정 예시

```
application.dateOfServiceStarting = 20180808
```

> 빈에서 프로퍼티의 설정 값을 필드 포매팅을 통해 바인딩

```java
@Component
public class ApplicationProperties {

  @Value("$application.dateOfServiceStarting:")
  private java.time.LocalDate dateOfServiceStarting; // 2018 08 08 로 설정
}

```

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
