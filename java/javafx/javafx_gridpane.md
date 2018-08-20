# JAVA FX
## GridPane - DataBinding처리
<div class="pull-right">  업데이트 :: 2018.07.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [GridPane - DataBinding처리](#gridpane-databinding처리)
		* [01. GridPane Binding](#01-gridpane-binding)
		* [02. 사용](#02-사용)

<!-- /code_chunk_output -->

### GridPane Binding

예제코드를 살펴보겠습니다.

동적으로 바인딩된 GridPane을 사용하기 위해 자동 업데이트 해주는 클래스입니다.

```java
public class DynamicGrid {

    GridPane gridPane;
    Stone[][] board;
    int column;
    int row;

    /* 생성자 */
    public DynamicGrid(GridPane gridPane, int column, int row) {
        this.gridPane = gridPane;
        this.column = column;
        this.row = row;
        init();
    }

    /* 초기화 */
    void init() {
        board = new Stone[column][row];
        for (int c = 0; c < column; c++) {
            for (int r = 0; r < row; r++) {
              // TODO something
              String str = String.format("(%d,%d)", c, r);
              setLabelAt(new Label(str), c, r);
            }
        }
        render();
    }

    /* 특정위치에 라벨을 추가합니다. */
    private Label getLabelAt(int x, int y) {
        return board[x][y];
    }

    /* 특정위치에 라벨을 추가합니다. */
    private void setLabelAt(Label label, int x, int y) {
        board[x][y] = label;
        render();
    }

    /* 보드를 정리합니다. */
    void clear() {
         gridPane.getChildren().clear();
    }

    /* 수정사항이 있다면 전체 업데이트 합니다. */
    private void render() {
        clear();
        List<Label> listLable = new ArrayList<>();
        for (int c = 0; c < column; c++) {
            for (int r = 0; r < row; r++) {
                Label label = getStoneAt(c, r);
                listStone.add(label);
                GridPane.setColumnIndex(label, c);
                GridPane.setRowIndex(label, r);
            }
        }
        gridPane.getChildren().setAll(listLable); // (add all at once for better performance)
    }

}
```

### 예제

```java
GridPane gridPane = new GridPane();
int column = 5;
int row = 5;
DynamicGrid dg = new DynamicGrid(gridPane, column, row);

dg.setLabelAt(new Label("new label"), 2, 2);
```


### 클릭리스너

```java
private void addGridEvent() {
    gridPane.getChildren().forEach(item -> {
        item.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent event) {
                if (event.getClickCount() == 2) {
                    System.out.println("doubleClick");
                }
                if (event.isPrimaryButtonDown()) {
                    System.out.println("PrimaryKey event");
                }

            }
        });

    });
}
```


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
