# JAVA FX
## TableView
<div class="pull-right">  업데이트 :: 2018.07.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [TableView](#tableview)
		* [01. View](#01-view)
		* [02. Model](#02-model)
		* [03. 연동](#03-연동)
		* [이벤트리스너](#이벤트리스너)
			* [클릭](#클릭)
			* [변경](#변경)

<!-- /code_chunk_output -->

### 01. View

먼저 TableView를 생성

```xml
<TableView fx:id="tableRoom">
    <columns>
        <TableColumn prefWidth="100" text="이름" />
        <TableColumn prefWidth="100" text="과목" />
        <TableColumn prefWidth="100" text="점수" />
    </columns>
</TableView>
```

### 02. Model

TableView에 들어갈 모델

"SimpleStringProperty" 타입의 필드를 생성

"Getter & Setter" 생성시 주의

```java
public class Node {
    private SimpleStringProperty name;
    private SimpleStringProperty subject;
    private SimpleStringProperty grade;

    public Node(String name, String subject, String grade) {
        this.name = new SimpleStringProperty(name);
        this.subject = new SimpleStringProperty(subject);
        this.grade = new SimpleStringProperty(grade);
    }
    public String getName() {
        return name.get();
    }
    public void setName(String name) {
        this.name.set(name);
    }
    public String getSubject() {
        return subject.get();
    }
    public void setSubject(String subject) {
        this.subject.set(subject);
    }
    public String getGrade() {
        return grade.get();
    }
    public void setGrade(String grade) {
        this.grade.set(grade);
    }
}

```

### 03. 연동

```java
@FXML TableView tableView;

// ~~~

ObservableList roomList = FXCollections.observableArrayList(
  new Node("김씨", "국어", "80"),
  new Node("박씨", "영어", "90"),
  new Node("최씨", "수학", "70")
);
for (int i = 0; i < tableView.getColumns().size(); i++) {
  javafx.scene.control.TableColumn tc = tableRoom.getColumns().get(i);
  // "name", "subject", "grade" 모델의 각각의 필드명이 들어가야함
  tc.setCellValueFactory(new PropertyValueFactory(Define.STANDBY_TABLE_COLUMNS[i]));
  tc.setStyle("-fx-alignment:CENTER;");
}
tableView.setItems(roomList);
tableView.getSelectionModel().selectionModeProperty().addListener(
  new ChangeListener<SelectionMode>() {
      @Override
      public void changed(ObservableValue<? extends SelectionMode> observable, SelectionMode oldValue, SelectionMode newValue) {

      }
  }
);
```

### 이벤트리스너

#### 클릭

"getClickCount()"을 통해서 클릭/더블클릭을 바꿀 수 있습니다.

```java
table.setRowFactory( tv -> {
    TableRow<MyType> row = new TableRow<>();
    row.setOnMouseClicked(event -> {
        if (event.getClickCount() == 2 && (! row.isEmpty()) ) {
            MyType rowData = row.getItem();
            System.out.println(rowData);
        }
    });
    return row ;
});
```

#### 변경

```java
tableRoom.getSelectionModel().selectedItemProperty().addListener(
                new ChangeListener<Room>() {
                    @Override
                    public void changed(ObservableValue<? extends Room> observable, Room oldValue, Room newValue) {

										}
                }
        );
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
