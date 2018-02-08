# Android Lib를 통한 간단 코드 적용기

## 버터 나이프 - 뷰에 대한 가장 쉬운 접근.

<div class="pull-right"> 문스코딩 - 2018.02.05 </div>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Android Lib를 통한 간단 코드 적용기](#android-lib를-통한-간단-코드-적용기)
	* [버터 나이프 - 뷰에 대한 가장 쉬운 접근.](#버터-나이프-뷰에-대한-가장-쉬운-접근)
		* [01. 여러 뷰들을 관리 - Butter Knife](#01-여러-뷰들을-관리-butter-knife)
			* [액티비티에서 사용하기](#액티비티에서-사용하기)
			* [프래그먼트를 사용할 때 살펴봅시다.](#프래그먼트를-사용할-때-살펴봅시다)
			* [이벤트 리스너](#이벤트-리스너)
			* [자원적용](#자원적용)
			* [뷰의 그룹화](#뷰의-그룹화)
			* [모든 뷰의 프로퍼티 한번에 적용하기](#모든-뷰의-프로퍼티-한번에-적용하기)

<!-- /code_chunk_output -->

**용어정리**
```

```

### 01. 여러 뷰들을 관리 - Butter Knife

Butter Knife는 관용 코드 대신 애너테이션을 쓸 수 있는 라이브러리입니다.
어떤 장점이 있을까요 ? 아마 findViewById를 몇 만번쯤 써오셨을 겁니다.
Butter Knife를 쓰면 이런 작업의 양을 확 줄여줍니다.
특히 런타임 중에 비용이 들지 않는다는 매력적입니다.
Butter Knife가 해주는 일은 컴파일 타임에 일어나므로
사용자들이 앱을 사용할 때 앱이 느려질까봐 걱정할 필요는 없습니다.
뷰를 찾거나 리스너를 연결할 때 등 자원을 찾는 것을 효율적으로 할 수 있게 합니다.

#### 액티비티에서 사용하기

```xml
<TextView android:id="@+id/description">...</TextView>
```

```java
public class MainActivity extends Activity {
    @BindView(R.id.description) TextView description;

    @Override
    protected void onCreate(Bundle bundle) {
        ...
        ButterKnife.bind(this);
        description.setText("Tofu with Cheese on a tortilla");
    }
}
```

description의 ID를 가진 이 TextView를 만들게 됩니다.
메인 액티비티에서는 멤버 변수를 설정하고 이름짓기만 하면 되므로,
description이라고 이름 짓습니다.
BindView 애너테이션을 이용해서 해당 뷰의 ID를 넘깁니다.
그러면 Butter Knife가 이 멤버 변수를
액티비티 전반에 걸쳐 어디에서나 사용할 수 있게 해줍니다.

ButterKnife.bind 메서드가 먼저 호출된 이후라면
언제든지 이 멤버 변수를 사용할 수 있습니다.
ButterKnife.bind 는 어떤 일을 할까요 ?

```java
public void bind(MainActivity activity) {
    activity.description = (android.widget.TextView) activity.findViewById(2130968577);
}
```
Butter Knife는 뷰나 자원을 차아주는 코드를 만들고 프로퍼티로 저장합니다.
이 예제는 액티비티에 프로퍼티를 저장했습니다.
이것이 Butter knife 컴파일 타입에 bind 메서드를 가지고 하는 일입니다.
description을 액티비티의 프로퍼티로 설정하고 우리 대신 findViewById를 불러줍니다.

#### 프래그먼트를 사용할 때 살펴봅시다.

```java
public class TacoFragment extends Fragment {
    @BindView(R.id.tag) EditText tag;
    private Unbinder unbinder;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup group, Bundle bundle) {
        ...
        //Important!
        unbinder = ButterKnife.bind(this, parentView);
        tag.setHint("Add tag. Eg: Tasty!, Want to try")
        return view;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        //sets the views to null
        unbinder.unbind();
    }
}
```

두 개의 인자를 넘기고 unbinder에 레퍼런스를 설정한 것을 볼 수 있습니다.
그 이유는 프래그먼트가 액티비티와는 다른 생명주기를 갖기 떄문입니다.
다시 말해서 만약 프래그먼트가 계속 따라다닌다면,
Butter Knife로 설정해둔 레퍼런스와 뷰에 프래그먼트가 종속되므로
가비지 컬렉션이나 메모리 에러가 발생할 수있기 때문입니다.
반면 예제의 방식대로 만들고 onDestroyView()나 프래그먼트를 닫는 곳에서
unbinder.unbind() 호출한다면 이들 뷰의 래퍼런스들을 null로 만들어 줍니다.
이후 가비지 컬랙션이 발생할 때 릴리즈 됩니다.

#### 이벤트 리스너

```java
@OnClick(R.id.save)
public void saveTaco(Button button) {
    button.setText("Saved!");
}

@OnClick(R.id.reject)
public void reject() {
    Log.d("RejectBtn", "onClick")
}
```

OnClick이라는 이션을 붙인 뒤, 리스너를 붙이고 싶은 뷰의 id를 넘기면 됩니다.
이 예제는 OnClick 리스너를 저장 버튼에 붙였습니다.
제가 한 다른 일은 메서드 안에서 해당 버튼의 레퍼런스를 뷰에 전달한 것입니다.
이로써 이벤트 리스너가 실행될 때 동적으로 해당 버튼을 업데이트 할 수 있습니다.
여기서는 텍스트를 설정했는데, 알파값을 설정하거나 숨기거나 하는 여러가지 다른 일을 할 수 도 있습니다.

#### 자원적용

```java
class MainActivity extends Activity {
    @BindString(R.string.title) String title;
    @BindDrawable(R.drawable.star) Drawable star;
    // int or ColorStateList
    @BindColor(R.color.guac_green) int guacGreen;
    // int (in pixels) or float (for exact value)
    @BindDimen(R.dimen.spacer) Float spacer;
}
```

스트링 파일이 있고 거기서 스트링을 가져온 상황을 가정해 보겠습니다.
해당 파일에서 스트링을 찾고 id를 넘기고 액티비티에 프로퍼티를 설정하기만 하면 됩니다.
drawable, color, dimension에도 마찬가지의 일을 할 수 있습니다.
color나 dimension에서 int등을 가져올 수 있습니다.

#### 뷰의 그룹화

```java
@OnClick({ R.id.save, R.id.reject})
public void actOnTaco(View view) {
    if (view.getId() == R.reject) {
        Toast.makeText(this, "Ew Gross!", LENGTH_SHORT).show();
    }
    else {
        Toast.makeText(this, "Yummy :)", LENGTH_SHORT).show();
    }
    //TODO: implement
    getNextTaco();
}
```
이 경우 save나 reject 버튼중 하나를 누르면 같은 동작이 일어나도록 합니다
OnClick 애너테이션을 붙이고 뷰의 리스트에 넘깁니다.
그 후에 해당 메서드에서 뷰에 래퍼런스를 넘기면, 이들 뷰 ID나 뷰에 접근할 수 있는
다른 프로퍼티에서 원하는 동작을 할 수있습니다.

getNextTaco 메서드가 무엇을 하던 이들 뷰가 OnClick 리스너에 묶이도록 합니다.

#### 모든 뷰의 프로퍼티 한번에 적용하기

```java
@BindViews({R.id.save, R.id.reject})
List<Button> actionButtons;

ButterKnife.apply(actionButtons, View.ALPHA, 0.0f);
```

save와 reject 버튼의 리스트를 만들고
ButterKnife.apply 메서드를 통해 코드에서 버튼들의
알파값을 바꿀 수 있도록 했습니다.
또한 ButterKnife에서 동작을 세밀하게 조정할 수도 있습니다.

```java
ButterKnife.apply(actionButtons, DISABLE);
ButterKnife.apply(actionButtons, ENABLED, false);

static final ButterKnife.Action<View> DISABLE = new ButterKnife.Action<View>() {
    @Override public void apply(View view, int index) {
        view.setEnabled(false);
    }
};
static final ButterKnife.Setter<View, Boolean> ENABLED = new ButterKnife.Setter<View, Boolean>() {
    @Override public void set(View view, Boolean value, int index) {
        view.setEnabled(value);
    }
};
```

ButterKnife.apply 를 호출해서 버튼 리스트를 넘길 수 있고,
apply 메서드를 사용할 때 발생하도록 하고 싶은 일을 넘길 수도 있습니다.
첫 번째 예제는 모든 버튼들의 enabled를 false로 해서 비활성화 했습니다.
두번째 예제는 보다 미세한 조정을 했습니다.
세 번째 인자르 넘겨서 뷰의 프로퍼티를 변경했습니다.
여기서 setEnabled를 했는데, id를 기반으로 컬러값을 넘겨서 변경할 수 도 있습니다.

```java
private void getNextTaco() {
    ButterKnife.apply(actionButtons, DISABLE);
    //TODO: implement
    setTacoImage();
}
```

버튼을 비활성화 해서 사용자들이 두 번 클릭하지 못하게 합니다.

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ](https://academy.realm.io/kr/posts/360andev-chris-guzman-android-libraries-beginner/?w=1)

[링크2 :: ](http://gun0912.tistory.com/2)


Copyright (c) 2017 Copyright Holder All Rights Reserved.
