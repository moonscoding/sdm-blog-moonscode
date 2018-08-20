# JAVA FX
## Container
<div class="pull-right">  업데이트 :: 2018.07.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [Container](#container)
		* [종류](#종류)
		* [AnchorPane](#anchorpane)
		* [HBox, VBox](#hbox-vbox)
		* [BorderPane](#borderpane)
		* [FlowPane](#flowpane)
		* [TilePane](#tilepane)
		* [GridPane](#gridpane)
		* [StackPane](#stackpane)

<!-- /code_chunk_output -->

### 종류

- AnchorPane
- BorderPane
- FlowPane
- GridPane
- StackPane
- TilePane
- HBox / VBox

모든 컨테이너는 다음 3가지 속성을 갖습니다.

- preWidth
- preHeight
- <children>

### AnchorPane

좌표를 이용해서 좌상단 기준으로 컨트롤을 배치하는 컨테이너

- layoutX
- layoutY

### HBox, VBox

HBox는 수평으로, VBox는 수직으로 배치하는 컨테이너 입니다.

- alignment :: 컨트롤정렬설정
- spacing :: 컨트롤간격설정
- fillWidth :: 컨트롤 폭 확장여부
- fillHeight :: 컨트롤 높이 확장여부
- <HBox.hgrow>	<Priority fx:constant="ALWAYS"\/></HBox.hgrow> :: HBox의 남은 폭을 채움
- <VBox.vgrow><Priority fx:constant="ALWAYS"\/></VBox.vgrow> :: VBox의 남은 높이를 채움

### BorderPane

주어진 top bottom left right center에 컨트롤을 배치하는 컨테이너

top bottom left right에 컨트롤을 배치하지 않으면 center에 배치된 컨트롤이 확장됩니다.

- \<top>
- \<bottom>
- \<right>
- \<left>
- \<center>

### FlowPane

행으로 컨트롤을 배치하되 공간이 부족하면새로운 행에 배치하는 컨테이너

- hgap :: 컨트롤의 수평간격
- vgap :: 컨트롤의 수직간격

### TilePane

그리드로 컨트롤을 배치하되 고정된 셀 크기를 갖는 컨테이너입니다.

- preTileWidth :: 타일의 폭을 설정
- preTileHeight :: 타일의 높이를 설정

### GridPane

- hgap : 수평 컨트롤 간격
- vgap : 수직 컨트롤 간격
- GridPane.rowIndex :: 컨트롤이 위치하는 행 인덱스 설정
- GridPane.columnIndex :: 컨트롤이 위치하는 열 인덱스 설정
- GridPane.rowSpan :: 행 병합수를 설정
- GridPane.columnSpan :: 열 병합수를 설정
- GridPane.hgrow :: 수평 빈공간 채우기
- GridPane.vgrow :: 수직 빈공간 채우기
- GridPane.halignment :: 컨트롤의 수평정렬을 설정
- GridPane.valignment :: 컨트롤의 수직정렬을 설정

### StackPane

컨트롤을 겹쳐 배치하는 컨테이너





---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
