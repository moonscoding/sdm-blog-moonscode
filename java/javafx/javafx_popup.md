# Java FX
## Popup
<div class="pull-right">  업데이트 :: 2018.07.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Java FX](#java-fx)
	* [Popup](#popup)
		* [Popup](#popup-1)
		* [생성방법](#생성방법)
		* [Tooptip](#tooptip)
		* [Dialog](#dialog)

<!-- /code_chunk_output -->

### Popup

팝업은 투명한 컨테이너를 제공하는 모달리스 다이얼로그입니다.

따라서 소유자 윈도우는 계속 사용될 수 있습니다.

팝업에는 다음과 같은 형식이 있습니다.
- tooltip
- notification
- drop down boxes

### 생성방법

```java
Popup popup = new Popup();
popup.getContent().add(FXMLoader.load(getClass().getResource("popup.fxml")));
```

```java
popup.show(primaryStage);
popup.show(primaryStage, anchorX, anchorY);
```

다른 윈도우에 포커르가 가면 자동으로 닫히게 하는 메소드

```java
popup.setAutoHide(true);
```

### Tooptip

```xml
<HBox xmlns="http://javafx.com/javafx"
      xmlns:fx="http://javafx.com/fxml"
      alignment="CENTER"
      style="-fx-background-color: black; -fx-background-radius: 20;">
    <padding>
        <Insets topRightBottomLeft="10"/>
    </padding>
    <children>
        <ImageView id="imgMessage" fitWidth="30" preserveRatio="true">
            <image>
                <Image url="/res/tooltip.png"/>
            </image>
        </ImageView>
        <Label id="lbMessage" style="-fx-text-fill: white;" text="메세지가 왔습니다.">
            <HBox.margin>
                <Insets left="5" right="5"/>
            </HBox.margin>
        </Label>
    </children>
</HBox>
```

```java
public void showTooptip(String message) {
    try {
        Popup popup = new Popup();
        Parent parent = FXMLLoader.load(getClass().getResource("../views/modules/tooltip.fxml"));
        parent.setOnMouseClicked(event -> popup.hide());

        // == 텍스트 ==
        Label lbMessage = (Label) parent.lookup("#lbMessage");
        lbMessage.setText(message);

        popup.getContent().add(parent);
        popup.setAutoHide(true);
        System.out.println(primaryStage);
        popup.show(primaryStage);
    } catch (IOException e) {
        // TODO 에러
    }
}
```

### Dialog

다이얼로그는 하나의 새로운 Stage를 올리는 것과 같습니다.

- DECORATED :: 일반적인 윈도우 시타일 배경이 흰색 제물줄에 장식
- UNDECORATED :: 배경이 흰색, 제목줄 없음
- TRANSPARENT :: 배경이 투명, 제목줄 없음
- UNIFIED :: DECORATED와 동일하나, 내용물의 경계선이 없음
- UTILITY :: 배경이 흰색, 제목줄에 타이틀 종료 버튼만 있음

```xml
<AnchorPane xmlns="http://javafx.com/javafx"
            xmlns:fx="http://javafx.com/fxml"
            prefHeight="150.0" prefWidth="400.0">
    <children>
        <ImageView fitWidth="50" fitHeight="50" layoutX="15" layoutY="15" preserveRatio="true">
            <image>
                <Image url="/res/tooltip.png" />
            </image>
        </ImageView>
        <Button id="btnOK" layoutX="336" layoutY="104" text="확인" />
        <Label id="lbMessage" layoutX="87" layoutY="33" prefHeight="15" prefWidth="290" />
    </children>
</AnchorPane>
```

```java
public void showDialog(String message) {
    try {
        Stage dialog = new Stage(StageStyle.UTILITY);
        dialog.initModality(Modality.WINDOW_MODAL);
        dialog.initOwner(primaryStage);
        dialog.setTitle("확인"); // dialog title

        Parent parent = FXMLLoader.load(getClass().getResource("../views/modules/dialog.fxml"));
        Label lbMessage = (Label) parent.lookup("#lbMessage");
        lbMessage.setText(message);

        Button btnOK = (Button) parent.lookup("#btnOK");
        btnOK.setOnAction(event -> dialog.close());
        Scene scene = new Scene(parent);
        dialog.setScene(scene);
        dialog.setResizable(false);
        dialog.show();
    } catch (IOException e) {
        // TODO 에러
    }
}
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
