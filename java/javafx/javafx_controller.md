# JAVA FX
## Controller
<div class="pull-right">  업데이트 :: 2018.07.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [Controller](#controller)
		* [Controller](#controller-1)
		* [Initializable과 Initialize()](#initializable과-initialize)
		* [Controller에서 Stage접근](#controller에서-stage접근)
			* [메인클래스에서 전달](#메인클래스에서-전달)
			* [컨테이너 또는 컨트롤로부터 얻는 방법](#컨테이너-또는-컨트롤로부터-얻는-방법)

<!-- /code_chunk_output -->

### Controller

컨트롤러란 컨테이너에 할당된 로직을 담당하는 클래스입니다.

### Initializable과 Initialize()

컨트롤러는 "Initializable" 인터페이스를 구현해야합니다.

그리고 다음 인터페이스는 "Initialize()" 메소드재정의를 강제합니다.

"Initialize()"는 primaryStage가 생성되기전 각각의 컨트롤들을 초기화하는 부분입니다.

### Controller에서 Stage접근

#### 메인클래스에서 전달

```java
FXMLoader loader = new FXMLoader(getClass().getResource("root.fxml"));
RootController controller loader.getController();
controller.setPrimaryStage(primaryStage);
```

```java
public class RootController implement Initializable {
  private Stage primaryStage;
  public void setPrimaryStage(Stage primaryStage) {
    this.primaryStage = primaryStage;
  }
}
```

#### 컨테이너 또는 컨트롤로부터 얻는 방법

```java
Stage primaryStage = (Stage) 컨트롤.getScene().getWindow();
```

> 주의할 점은 다음 코드는 Initialize() 메소드 안에서 사용할 수 없습니다.
> 아직 primaryStage가 생성되지 않았기 때문입니다.

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
