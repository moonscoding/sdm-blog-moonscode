# TITLE (UpperCase)
## SUB-TITLE
<div class="pull-right">  업데이트 :: 2018.04.05 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [SUB-TITLE](#sub-title)
		* [01. Fragment](#01-fragment)
		* [02. View 연결시키기](#02-view-연결시키기)
		* [03. FragmentManager](#03-fragmentmanager)

<!-- /code_chunk_output -->



### 01. Fragment

프레그먼트란 액티비티 위에 올려지는 또 하나의 화면의 개념입니다.

```java
import android.app.Fragment;

public class MainFragment extends Fragment{

}
```

### 02. View 연결시키기

```java
public class MainFragment extends Fragment{

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.mainfragment,null);
        return  view;
    }
}
```

### 03. FragmentManager

```java
FragmentManager fragmentManager = getSupportFragmentManager();
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
fragmentTransaction.replace(R.id.frame_content, fragment); // [#] fragment가 들어갈 layout id
fragmentTransaction.commit();
```

### 04. Fragment에 토스트 띄우기

```java

```


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
