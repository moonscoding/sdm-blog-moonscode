
<div class="pull-right">  업데이트 :: 2018.08.10 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [입력값검사](#입력값검사)
	* [입력값검사 활성화](#입력값검사-활성화)
	* [입력값검사와 결과의판정](#입력값검사와-결과의판정)
	* [미입력처리](#미입력처리)
	* [입력값검사 규칙지정](#입력값검사-규칙지정)
* [중첩된 자바빈즈의 입력값 검사](#중첩된-자바빈즈의-입력값-검사)
* [입력값검사 규칙추가](#입력값검사-규칙추가)
* [입력값검사규칙을 교체하는 방법](#입력값검사규칙을-교체하는-방법)
* [오류정보표시](#오류정보표시)
* [오류메시지의 재정의](#오류메시지의-재정의)
* [Bean Validation 커스터마이징](#bean-validation-커스터마이징)
* [Spring Validator 이용](#spring-validator-이용)

<!-- /code_chunk_output -->

### 입력값검사

#### 입력값검사 활성화

- @Validated
- @javax.validation.Valid

```java
@ReqestMapping(method=RequestMethod.GET)
public String search(
  @Validated AccountSearchForm form,
  BindingResult result,
  Model model
)
```

- BindingResult에는 요청 데이터의 바인딩 오류와 입력값 검사 오류 정보가 저장

#### 입력값검사와 결과의판정

- BindingResult, 검사결과를 만드는 것은 프레임워크에서 처리
- 오류를 판단하고 그에 맞는 처리를 하는 것은 애플리케이션 측에서 구현

> BindingResult 오류판단메서드

- hasErrors()
  - 오류가 발생한 경우 true
- hasGlobalErrors()
  - 객체레벨의 오류가 발생한 경우 true
- hasFieldErrors()
  - 필드레벨의 오류가 발생한 경우 true
- hasFieldFrrors(String)
  - 인수에서 지정한 필드에서 오류가 발생한 경우 true

```java
@RequestMapping(path="search", method=RequestMethod.GET)
public String search(
  @Validated AccountSearchForm form,
  BindingResult result,
  Model model) {
    if(result.hasErrors()) {
      return "account/searchForm";
    }
    return "account/searchResult";
}
```
- BindingResult를 통해 오류여부판정
- 오류처리방법을 분기해야하야 하는것이 아니라면 단순히 hasErrors()로 에러를 판단하는 것이 일반적

#### 미입력처리

- 값을 입력하지 않은 상태로 HTML폼을 전송하면 스프링 MVC 폼객체에 공백 문자를 설정
- StringTrimmerEditer (PropertyEditor 구현클래스)

> StringTrimmerEditor

```java
@InitBinder
public void initBinder(WebDataBinder binder) {
    binder.registerCustomEditor(String.class, new StringTrimmerEditer(true));
}
```

- 생성자 인수에 true( 공백문자를 null로 변환 )를 지정
- WebDataBinder에 등록

#### 입력값검사 규칙지정

- Bean Validation 표준제약
- 서드파티에서 구현한 제약 (Hibernate Validation)
- 직접구현한 제약 애너테이션

> 필수항목검사

```java
@NotNull
private String name;
```

> 자릿수 (사이즈) 검사

```java
@Size(min=50,max=100)
private String name;
```

> 문자유형검사

```java
@Pattern(regexp="[a-zA-Z0-9]")
private String couponCode;
```
- 정규식은 강력하고 편리
- 입력값검사규칙이 여러곳에 흩어져 버린다는 단점
  - BeanValidation이 제공하는 기존규칙합성으로 해결할 수 있음

> 수치유효성검사

- 폼클래스의 프로퍼티 숫자형(Integer, Long, BigDecimal 등등)으로 정의
- 요청파라미터 값을 폼 클래스의 프로퍼티형으로 변환하는 과정에서 오류가 발생하면 요청 파라미터 값이 부적절하다고 판단
- PropertyEditor & @NumberFormat을 이용하면 변활할때 사용할 포맷을 지정가능

> 수치의범위검사

- value
  - 임계값(최대값 혹은 최소값)을 지정
- inclusive
  - 임계값과 같은 값을 허용치로 볼지 지정,
  - 생략시 true(허용치)로 간주

```java
@Min(1)
@Max(100)
private int quantity;

@Digits(integer=2, fraction=2) // -99.99 ~ 99.99 (0.01단위)
private BigDecimal
```

> 날짜/시간 유효성검사

- @Future : 미래
- @Past : 과거

```java
@Past // 과거일것
@DateTimeFormat(pattern="yyyyMMdd")
private Date dateOfBrith;
```

> 불린값검사

```java
@AssertTrue
private boolean isAgreedTermsOfUse;
```

> 제약애너테이션의 예약속성

- message
  - 제약을 위반시에 오류메시지를 지정
	  - 메시지를 직접 지정하는 방법
	  - 메시지 코드를 지정하는 방법
  - 속성 지정을 생략한 경우에 기본 메시지가 사용
- groups
  - 유효성 검증그룹을 지정
  - 이 속성에 그룹을 표현하는 자바타입( 인터페이스 또는 클래스 )을 지정
  - 생략한 경우에 javax.validation.groups.Default
- payload
  - 제약 애너테이션에 대해 임의의 메타 정보 ( 오류 중요도 등등 )
  - 메타 정보를 나타내는 자바타입을 지정
  - 스프링의 기본 구현에는 오류 정보와 관련된 메타정보를 사용하지 않기 때문에 지정해도 의미 없음

### 중첩된 자바빈즈의 입력값 검사

- @Valid는 검사 규칙을 표현하는 제약 애너테이션이 아닌 검사 대상임을 나타내는 마커 애너테이션

```java
@Valid // 중첩된 자바빈즈도 검사의 대상
private AccountForm account;
```

### 입력값검사 규칙추가

- Bean Valiation & Hibernate Validation이 제공하는 제약 애니테이션 외에 추가로 필요한 경우
	- 기존 규칙을 조합해서 만드는 방법
	- 필요한 유효성 검사기를 직접 구현해서 만드는 방법

> 기존 규칙 조합

```java
@AlphaNumeric // @Pattern이 아닌 독자적 제약 애너테이션
private String couponCode;
```

```java
@Documented
@Constraint(validatedBy={})
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
@Retention(RUNTIME)
@ReportAsSingleViolation
@Pattern(regexp="[a-zA-Z0-9]") // 영숫자일것
public @interface AlphaNumeric {
	String message() default "{com.example.validation.AlphaNumeric.message}";
	Class<?> groups() default {};
	Class<? extends Payload>[] payload() default {};

	@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
	@Retention(RUNTIME)
	@Documented
	public @interface List{
		AlphaNumeric[] value();
	}
}
```

- 기존규칙을 여러개 조합한 애너테이션도 만들 수 있음
	- ex. @Size + @Pattern
- 기존규칙을 조합한 애너테이션을 만들때 @ReportAsSingleViolation을부여하는 것이 일반적
	- message 속성에서 지정한 메시지가 적용
	- 부여하지 않을 경우 기존 규칙에 지정한 메시지 나옴

> 필요한 유효성 검사기 구현

- 두개의 프로퍼티값이 값을 것을 검사하는 입력값검사규칙 만들기

```java
@Documented
@Constraint(validatedBy={EqualsPropertyValuesValidator.calss})
@Target({TYPE, ANNOTATION_TYPE})
@Retention(RUNTIME)
public @interface EqualsPropertyValues {
	String message() default "com.example.validation.EqualsPropertyValues.message";
	Class<?>[] groups() default{};
	Class<? extends Payload> default{};

	String property();
	String comparingProperty();

	@Target({TYPE, ANNOTATION_TYPE})
	@Retention(RUNTIME)
	@Documented
	public @interface List {
		EqualsPropertyValues[] value();
	}
}
```

- @Constraint의 validateBy 속성에 유효성 검사기의 구현 클래스 지정
- 유효성 검사에 필요한 속성을 준비
	- 검사대상 프로퍼티명
	- 비교대상 프로퍼티명

```java
public class EqualsPropertyValuesValidator implements ConstraintValidator<EqualsPropertyValues, Object> {
	private String property;
	private String comparingProperty;
	private String message;

	public void initialize(EqualsPropertyValues constraintAnnotation) {
		this.property = constraintAnnotation.property();
		this.comparingProperty = constraintAnnotation.comparingProperty();
		this.message = constraintAnnotation.message();
	}

	public boolean isValid(Object value, ConstraintValidatorContext context) {
		// 두개의 프로퍼티값을 가져와서 비교
		BeanWrapper beanWrapper = new BeanWrapper(value);
		Object propertyValue = beanWrapper.getPropertyValue(property);
		Object comparingPropertyValue = beanWrapper.getPropertyValue(comparingProperty);
		boolean matched = ObjectUtils.nullSafeEquals(propertyValue, comparingPropertyValue);
		if(matched) {
			return true;
		} else {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(message)
				.addPropertyNode(property)
				.addConstraintViolation();
			return false;
		}
	}
}
```

- ConstraintValidator 인터페이스구현
	- 첫번째 타입 매개변수에 제약 애너테이션
	- 두번째 타입 매개변수에 검사 대상 클래스
- initialize 메소드에 유효성 검사기의 초기화 처리
- isValid 메소드에 검증 처리를 구현
	- 첫번째 인수는 두번째 타입 매개변수에 지정한 검사 대상 클래스

```java
@EqualsPropertyValues(property="password", comparingProperty="reEnteredPassword")
public class AccountForm implements Serializable {
	@NotNull
	@password
	private String password;
	private String reEnteredPassword;
}
```

### 입력값검사규칙을 교체하는 방법

```java
@RequestMapping(method=RequestMethod.POST, params={"confirm", "type=1"})
public String confirmForFreeAccount (
	@Validated(FreeAccount.class) AccountForm form,
	BindingResult result,
	Model model) {

}

@RequestMapping(method=RequestMethod.POST, params={"confirm", "type=2"})
public String confirmForPayAccount(
	@Validate(PayAccount.class) AccountForm form,
	BindingResult result,
	Model model) {

}
```
- 입력화면에서 선택한 계정유형( 요청파라미터의 type값 )에 따라 핸들러 메서드를 준비
- 폼 클래스에 해당하는 인수에 @Validated를 선언

```java
public class AccountSearchForm implements Serializable {
		interface FreeAccount extends Default {}
		interface PayAccount extends Default {}

		@Size(min=1, max=1)
		private String type;

		@Size.List({
			@Size(max=0, groups=FreeAccount.class),
			@Size(min=14, max=16, groups=PayAccount.class)
		})
		private String cardNo;
}
```

- 그룹 인터페이스 생성
	- Bean Validation이 제공하는 Default 인터페이스를 상속
	- 그룹 지정을 하지 않는 검사 규칙을 검사대상에 포함시키고 싶을때 유용
		- type 프로퍼티에 @Size
- 그룹마다 입력값 검사 룰을지정
	- 무료는 카드번호가 없음
	- 유료는 카드가 14~16자리 숫자

### 오류정보표시

- 바인딩 오류나 입력값 검사오류가 발생시에 오류값과 오류메시지를 입력화면에 표시하는 것이 일반적

> 오류값표시

- \<form:form> 이나 \<form:input>등의 요소를 이용해서 자동으로 오류값이 표시

> 항목마다 오류 메시지 표시

```html
이름:<form:input path="name" />
    <form:errors path="name" />
```

- 오류가 발생한 항목 가까이(옆이나 아래등)에 오류 메시지를 표시하려면 \<form:errors> 요소의 path속성에 프로퍼티명을 지정
- path 속성에 프로퍼티명을 지정, 지정한 프로퍼티의 오류만 HTML에 출력

> 모든 오류 메시지를 한번에 표시

```html
<div id="message">
	<form:errors path="*" />
</div>
```
- 준비된 영역에 모든 오류 메시지를 한번에 표시하고 싶을때 \<form:errors>요소의 path속성애 "\*"를 지정
- BindingResult가 가지고 있는 모든 오류 메시지가 HTML로 출력

### 오류메시지의 재정의

- 바인딩 오류나 입력값 검사오류는 서드파티 프로바이더가 구현한 클래스로 제공한 메시지
- Hibernate Validator가 모든 국가의 언어를 지원하진 않음
- 기본 제공되는 영어 메시지도 표현이 너무 간단

> 오류 메시지 재정의 하는 방법

- MessageSource에서 사용하는 프로퍼티 파일에 메시지 정의
- Bean Validation에서 사용하는 프로퍼티 파일에 메시지를 정의
- 제약 애너테이션의 message 속성에 메시지를 정의

> MessageSource에서 사용하는 프로퍼티 파일에 오류 메시지 정의

```
NotNull = 값을 입력해 주세요.
```

- 프로퍼티 키에 메시지 코드, 프로퍼티 값에 메시지를 지정
- 다음은 @NotNull에 대한 오류 메시지가 정의
- 메시지코드는 org.springframework.validation.Message.CodeResolver의 구현클래스에 따라 달라질 수 있음


> DefaultMessageCodesResolver

- 제약 애너테이션의 클래스명 + "." + 폼 객체의 속성명 + "." + 프로퍼티명
- 제약 애너테이션의 클래스명 + "." + 폼 객체의 속성명
- 제약 애너테이션의 클래스명 + "." + 프로퍼티명
- 제약 애너테이션의 클래스명 + "." + 프로퍼티 타입명(FQCN)
- 제약 애너테이션의 클래스명
- 형변환오류(바인딩오류)에 대한 메시지는 "제약 애너테이션의 클래스명" 부분이 typeMismatch로 대체

> 다양한 메시지 코드를 사용해 메시지를 정의한 예

```
#입력값 검사 오류에 대한 메시지를 정의한 예
NotNull.accountForm.name = 계정 등록자의 성을 입력해 주세요.
NotNull.name = 이름을 입력해 주세요.
NotNull.java.lang.String = 문자열을 입력해 주세요.
NotNull = 값을 입력해 주세요.
```

- 오류메시지에 java.text.MessageFormat의 메시지포맷을 사용
- 메시지포맷에 플레이스홀더를 지정, 프로퍼티명과 제약 애너테이션의 속성값들이 들어가게 만들 수 있음

```
Size = {0}은 {2}문자 이상, {1}문자 이하로 입력해 주세요.
```

- {0} - 프로퍼티명(물리명 또는 논리명)
- {1} 이후 - 제약 애너테이션의 속성값(인덱스 위치는 애너테이션 속성명의 알파뱃 순서)
- 인덱스의 위치는 속성의 정의 순서가 아니라 알파벳 순서
	- {0} - 프로퍼티명(물리명 또는 논리명)
	- {1} - max 속성값
	- {2} - min 속성값

> Bean Validation에서 사용하는 프로퍼티 파일에 오류 메시지 정의

- 클래스패스 바로 아래의 ValidationMessages.properties에 메시지정의

```
javax.validation.constraints.NotNull.message = 입력해 주세요.
javax.validation.constraints.Size.message = {0}은 {min}문자 이상, {max}문자 이하로 입력해 주세요.
```

- 프로퍼티 키에 메시지코드
- 프로퍼티 값에 오류메시지
- 기본 메시지코드는 "제약 애너테이션 크래스명 (FQCN) + .message"
- 제약 애너테이션의 속성값으 포함하고 싶다면 포함하고 싶은 위치에 플레이스홀더({제약 애너테이션의 속성명}) 지정
- {0}을 지정하면 프로퍼티명(물리명 또는 논리명)을 표시할수 있음 (스프링의기본제공기능)

```java
@NotNull(message="{validation.errors.required}")
private String name;
```

- 제약 애너테이션의 message 속성에 에러 메시지를 지정


> 제약 애너테이션의 message 속성에 직접 지정

```java
@NotNull(message="입력해 주세요.")
private String name;
```

- 제약 애너테이션의 message 속성에 에러 메시지를 지정

> 프로퍼티의 논리명 정의

- 메시지에 프로퍼티명을 포함할때 {0} 지정
- 기본적으로 프로퍼티의 물리명 사용
- 논리명으로 표시하려면 프로퍼티 파일에 물리명과 논리명을 함께 정의
	- 폼 객체의 속성명 + "." + 프로퍼티명
	- 프로퍼티명

```
accountForm.name = 계정명
name = 이름
```

> EL을 이용한 메시지 정의

- EL (Expression Language)를 사용해 메시지를 동적으로 처리하는 기능이 제공
- EL을 활용하면 기본 메시지를 유현하게 조합

> 예제

- @Size를 이용한 입력값검사에 표시할 메시지
	- @Size(min=10, max=10)
	- @Size(max=10)
	- @Size(min=9, max=32)

```
javax.validation.constraints.Size.message=\
	${ min == max ? min += '문자로 입력해 주세요.' :\
		 min == 0   ? max += '문자 이내로 입력해 주세요.' :\
		              min += '문자 이상 ' += max += '문자 이하로 입력해 주세요.' }
```

### Bean Validation 커스터마이징

- @EnableWebMvc & \<mvc:annotation-driven> 요소 사용시
	- Bean Validation에서 사용하는 java.validation.Validator 인터페이스의 구현클래스가 자동으로 적용
	- 이때 실제 적용 클래스는 org.springframework.beanvalidation.OptionalValidatorFactoryBean
	- OptionalValidatorFactoryBean는 Bean Validation의 사양을 구현한 서드파티와의 어탭터 역할
	- 그래서 실제 위임받아 처리하는 것은 서드파티의 Validator

- Bean Validation 커스터 마이징
	- OptionalValidatorFactoryBean
	- LocalValidatorFactoryBeab

```java
@Configuration
public class WebMvc Config extends WebMvcConfigAdapter {

	@Bean
	OptionalValidatorFactoryBean validator() {
		OptionalValidatorFactoryBean validator = new OptionalValidatorFactoryBean();
		return validator;
	}

	@Override
	public Validator getValidator() {
		return validator();
	}
}
```

- 커스터마이즈할 Validator를 DI 컨테이너에 등록
- getValidator 메서드를 오버라이드
- 커스터마이징한 Validator를 반환, 스프링 MVC가 기본적으로 이용하는 Validator를 교체

```xml
<bean id="validator" class="org.springframework.validation.beanvalidation.OptionalValidatorFactoryBean">
	<!-- 세터 인젝션으로 커스터마이징  -->
</bean>
<mvc:annotation-driven validator="validator" />
```

### Spring Validator 이용

- org.springframework.validation.Validator
- org.springframework.validation.SmartValidator

```java
public interface Validator {
	boolean supports(Class<?> clazz);
	void validate(Object target, Errors errors);
}
```

- supports
	- 인수에 전달된 클래스가 검사대상인지 판단
- validate
	- 인수에 전달된 객체의 상태를 검사

```java
public interface SmartValidator extends Validator {
	void validate(Object target, Errors errors, Object... validationHints);
}
```

- validate
	- 인수로 전달된 객체의 상태를 검사
	- 인수의 validationHints에는 @Validated의 value 속성에 지정한 그룹 인터페이스가 전달

> Spring validator를 이용한 상관관계검사

```java
@Component
public class AccountCreateFormValidator implements Validator {
	@Override
	public boolean supports(Class<?> clazz) {
		return AccountCreateForm.class.isAssignableForm(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		if(errors.hasFieldErrors("type")) {
			return;
		}
		AccountCreateForm form = AccountCreateForm.class.cast(target);
		if("1".equals(form.getType())) {
			// 일반회원
			if(StringUtils.hasLength(form.getCardNo())) {
				errors.rejectValue("cardNo", "Size");
			}
		} else {
			// 프리미엄회원
			if(
				form.getCardNo() == null
				||
				form.getCardNo().length() < 14 || form.getCardNo.length() > 16) {
				errors.rejectValue("cardNo", "Size", new Object[] {14, 16}, null);
			}
		}
	}
}
```

- Validator 인터페이스 구현
- 검사대상 클래스인지 확인, AccountCreateForm 클래스와 이를 상속한 클래스가 검사 대상
- 상관관계에 있는 항목을 검사할 준비, Bean Validation과 같은 다른 Validator에서 오류가 발생했는지 errors 인수로 확인
- 단일 항목에 대한 검사결과확인 - 단일 항목 검사에서 오류가 확인되면 다른 확인은 하지 않은 것으로 구현
- 상관관계에 있는 항목을 검사 - 회원유형에 따라 카드번호 검사방법을 다르게 적용


> Spring Validator를 Spring MVC에 적용한 예

```java
@Autowired
AccountCreateFormValidator accountCreateFormValidator;

@InitBinder
public void initBinder(WebDtaBinder binder) {
	binder.addValidators(accountCreateFormValidator);
}
```

- 작성한 Validator 인젝션
- 작성한 Validator WebDataBinder에 추가

> Spring Validator를 통해 Bean Validation 기능이용

```java
@Autowired
SmartValidator smartValidator;

@RequestMapping(method=RequestMethod.POST, params="confirm")
public String confirm(AccountCreateForm form, BindingResult result, Model model) {
	Class<?> validationGroup = null;

	// validationGroup을 결정하는 로직구현

	validator.validate(form, result, validationGroup);
	if(result.hasErrors()) {
		return "account/form";
	}

	return "account/confirm";
}
```

- Spring Validator 인젝션
- 명시적으로 validate 메서드 호출
- 검사 결과를 확인

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
