# ANDROID PATTENR - DEPENDENCY

#### Dependency 패턴이란 무엇인고 ?

<div class="pull-right"> 문스코딩 - 2018.01.29 </div>

---

**용어정리**
```
    Dependency Injection :: 구성요소간의 의존 관계가 소스코드 내부가 아닌 외부의 설정 파일 등을 통해 정의되는 것을 말합니다.
```

#### 01. Dependency Injection

- 구성요소간의 의존 관계가 소스코드 내부가 아닌 외부의 설정 파일 등을 통해 정의 되는 것을 말합니다.
- 필요한 모든 것은 이미 존재하기 때문에 가져다 사용하기만 하면 됩니다.
- Dependency Injection은 새로운 객체를 생성할 때 필요한 객체를 제공합니다.
- Android에서는 네트워크 클라이언트, 이미지 로더, SharedPreferences와 같이 앱의 다양한 지점에서 동일한 객체에 접근 해야 할 때에 사용하면 좋습니다.
- Dagger2는 Android에서 가장 많이 쓰이는 Dependency Injection 프레임워크입니다.
- @Module 클래스는 어노테이션을 달고 @Provides 메소드는 어노테이션를 사용하여 주입할 수 있습니다.

```java
@Module
public class AppModule {
    @Provides
    SharedPreferences provideSharedPreferences(Application app) {
        return app.getSharedPreferences("setting", Context.MODE_PRIVATE);
    }
}
```
> 위의 @Module은 필요한 객체를 생성하고 초기화합니다.
> @Component 인터페이스를 생성하여 모듈과 주입할 클래스를 선언합니다.
> java @Component(modules = AppModule.class) interface AppComponent {  ... }

#### 02.

#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: 안드로이드 디자인 패턴에 대해서... ](http://chuumong.github.io/android/2017/01/16/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4)

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
