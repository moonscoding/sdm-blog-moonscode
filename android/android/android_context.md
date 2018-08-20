# Android
## Context란 무엇이고 어떻게 관리할까?
<div class="pull-right"> 2018.03.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android](#android)
	* [Context란 무엇이고 어떻게 관리할까?](#context란-무엇이고-어떻게-관리할까)
		* [01. context](#01-context)
			* [안드로이드에서 Context란 무엇일까요 ?](#안드로이드에서-context란-무엇일까요)
		* [02. Activity Context 관리하기](#02-activity-context-관리하기)
			* [java app 이용하기](#java-app-이용하기)
			* [manifest 수정](#manifest-수정)
			* [app 활용하기](#app-활용하기)
		* [03.](#03)
		* [용어정리](#용어정리)

<!-- /code_chunk_output -->



### 01. context

#### 안드로이드에서 Context란 무엇일까요 ?

> “현재 사용되고 있는 어플리케이션(또는 액티비티)에 대한 포괄적인 정보를 지니고 있는 객체”

- Application Context와 Activity Context

Application Context은 application life-cycle에 접목되는 개념이고,

Activity Context은 activity의 life-cycle에 접목되는 개념입니다.

즉 전자는 하나의 애플리케이션이 실행되어 종료될 때까지 동일한 객체인 반면, 후자는 액티비티가 onDestroy() 된 경우 사라질 수 있는 객체입니다.

- View.getContext()

현재 실행되고 있는 View의 context를 return 하는데 보통은 현재 활성화된 activity의 context입니다.

현재 활성화된 activity에 대한 context 참조 시 사용. this를 사용하는 것과 같은 맥락입니다

- this

View.getContext()와 같다.

- ContextWrapper.getBaseContext()

자신의 Context가 아닌 다른 Context를 access하려 할 때 사용한다.

ContextWrapper는 getBaseContext()를 경유해서 Context를 참조할 수 있다.

- Activity.getApplicationContext()

어플리케이션의 Context가 return된다. 현재 activiy의 context 뿐만 아니라

application의 lifeCycle에 해당하는 Context가 사용된다.

즉, 현재 활성화된 액티비티만이 아닌 어플리케이션 전체에 대한 context가 필요한 경우에 사용합니다

### 02. Activity Context 관리하기

#### java app 이용하기

현재 활성화된 context를 관리하는 가장 쉬운 방법입니다.

```java
public class App extends Application {

    private static Context mContext;

    public static Context getContext() {
        return mContext;
    }

    public static void setContext(Context mContext) {
        Ap	p.mContext = mContext;
    }

}
```

#### manifest 수정

```java
<application
        android:icon="..."
        android:label="..."
        android:name="com.example.yourmainpackagename.App" >
                    // class that extends Application ^^^
```

#### app 활용하기

```java
public class B extends Activity {

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sampleactivitylayout);

        App.setContext(this);
                  ...
        }
...
}
```

다음과 같은 방식은 간단하지만 불완전할수도 있습니다.

앱이 재시작되는 경우 App이 가지고 있는 Context가 사라져버리는 경우가 생길 수도 있기 때문입니다.

### 03.

### 용어정리
```

```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
