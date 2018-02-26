# ANDROID - 배워봅시다.
## Base Activity는 어떻게 작성하는가 ?

<div class="pull-right"> 문스코딩 - 2018.02.20 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [ANDROID - 배워봅시다.](#android-배워봅시다)
	* [Base Activity는 어떻게 작성하는가 ?](#base-activity는-어떻게-작성하는가)
		* [01. Base Activity 에 대해서 알아봅시다.](#01-base-activity-에-대해서-알아봅시다)
		* [02. ex](#02-ex)
		* [02. BaseActivity의 문제점](#02-baseactivity의-문제점)
		* [03. 결론](#03-결론)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. Base Activity 에 대해서 알아봅시다.

BaseActivity는 모든 Activity의 부모 클래스입니다.
Application의 모든 Activity가 BaseActivity를 상속받습니다.
그 이후는 **일괄처리** 때문입니다.
코드는 일정한 규칙에 따라 일괄적으로 적용되야 할때가 있습니다.
그런 규칙이 없이 원할때마다 선언해서 코드를 작성하면,
정작 필요할때 효율적으로 코드를 관리할 수 없습니다.
따라서 우리는 BaseActivity에 공통적으로 사용하는
전역변수를 선언하고 사용하겠습니다.

### 02. ex

```java
public class BaseActivity extends AppCompatActivity {
    public String s = "가나다라마";
}

public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView text = (TextView)findViewById(R.id.text);
        text.setText(s);    // s를 바로 사용할 수 있다.
    }
}
```

> 공통적인 속성인 s를 선언하지 않고 바로 사용할 수 있습니다.

### 02. BaseActivity의 문제점

[다중상속의 문제](https://www.androidpub.com/index.php?mid=devfree&document_srl=2431162)

### 03. 결론

위와 같은 문제점이 있기 때문에
BaseActivity는 코드의 간결성이 있지만
잘 판단해서 사용해야 합니다.



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()

Copyright (c) 2017 Copyright Holder All Rights Reserved.
