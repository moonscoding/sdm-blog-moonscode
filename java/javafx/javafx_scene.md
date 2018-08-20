# JAVA FX
## Scene
<div class="pull-right">  업데이트 :: 2018.07.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [Scene](#scene)
		* [Scene 이동](#scene-이동)
		* [Scene 간에 데이터 전달](#scene-간에-데이터-전달)
		* [Scene을 싱글톤 전역객체로 관리하기](#scene을-싱글톤-전역객체로-관리하기)

<!-- /code_chunk_output -->

### Scene 이동

```java
public void bandleBtnLogin(ActionEvent event) {
  try {
    Parent login = FXMLoader.load(getClass().getResource("login.fxml"));
    Scene scene = new Scene(login);
    Stage primaryStage = (Stage) ((Node) event.getSource()).getScene().getWindow();
    primaryStage.setScene(scene);
  } catch (Exception e) {
    e.printStackTrace();
  }
}

```

다음은 컨트롤러의 이벤트 처리에서 페이지 이동을 하는 코드입니다.

"setScene()" 메소드를 사용하면 이전 Scene은 Stage에서 제거됩니다.

### Scene 간에 데이터 전달

```java
this.primaryStage.setUserData(shareObject);
this.primaryStage.getUserData();
```

### Scene을 싱글톤 전역객체로 관리하기

```java
public class SceneManager {
    private static SceneManager instance;
    Stage stage;
    Scene scene;
    Share share;

    public SceneManager( Stage stage ) {
        if(SceneManager.instance != null) return;
        SceneManager.instance = this;

        this.stage = stage;
        this.share = new Share();
        this.stage.setUserData(share);
    }

    public static SceneManager getInstance() {
        return instance;
    }

    public Stage getStage() {
        return this.stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public void setTitle( String title ) {
        stage.setTitle(title);
    }

    public void moveScene( String location ) {
        try {
            Parent root = FXMLLoader.load(getClass().getResource(location));
            scene = new Scene(root);
            stage.setScene(scene);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
