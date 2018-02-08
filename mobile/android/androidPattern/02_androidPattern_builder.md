# ANDROID PATTERN - BUILDER

#### 안드로이드 BUILDR 패턴은 무엇인가요 ?

<div class="pull-right"> 문스코딩 - 2018.01.29 </div>

---

**용어정리**
```
    Builder ::
```

#### 01. Builder 패턴

- 복잡한 인스턴스를 조립하여 만드는 구조
- 생성자에 파라미터가 많은 클래스인 경우 빌더 패턴을 사용하여 가독성을 높일 수 있음
- Android에서는 NotificationCompat.Builder와 같은 클래스를 사용할 때 Builder 패턴이 나타남

```java
Notification notification =new NotificationCompat.Builder(this)
                                      .setSmallIcon(R.drawable.ic_notification)
                                      .setContentIntent(pendingIntent)
                                      .setTicker(message)
                                      .build();
```

**AlertDialog.Buildr 에서도 Builder 패턴 등장**
```java
new AlertDialog.Builder(this)
    .setTitle("Builder Dialog")
    .setMessage("Builder Dialog Message")
    .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
        @Override public void onClick(DialogInterface dialog, int which) {
        }
    })
    .setPositiveButton("OK", new DialogInterface.OnClickListener() {
        @Override public void onClick(DialogInterface dialog, int which) {
        }
    })
    .show();
```

> Builder 패턴은 단계적으로 진행되며 사용자에게 중요한 부분들을 지정할 수 있습니다.

#### 02.



#### 03.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: 안드로이드 디자인 패턴에 대해서...](http://chuumong.github.io/android/2017/01/16/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4)

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
