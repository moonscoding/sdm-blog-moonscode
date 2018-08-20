# JAVA FX
## GridPane Adapter
<div class="pull-right">  업데이트 :: 2018.07.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [GridPane Adapter](#gridpane-adapter)
		* [GridPane adapter](#gridpane-adapter-1)

<!-- /code_chunk_output -->

### GridPane adapter

GridPane을 이용한 Dynamic Adapter Class (abstract)

상속받아서 "init()" 한 후에 사용할 수 있습니다.

```java
public abstract class GridAdapter<T extends Node> {

    public int column;
    public int row;

    private GridPane origin;
    private T[][] nodes;

    public GridAdapter(GridPane origin, int column, int row) {
        this.origin = origin;
        this.column = column;
        this.row = row;
        nodes = null;
    }

    /* 초기화 */
    public abstract void init();

    /* 모두제거 */
    public void clear() {
        origin.getChildren().clear();
    }

    /* 노드얻기 */
    public T getNodeAt(int column, int row) {
        return nodes[column][row];
    }

    /* 노드수정 */
    public void setNodeAt(T t, int column, int row) {
        nodes[column][row] = t;
        render();
    }

    /* 노드제거 */
    public void removeNode(int column, int row) {
        setNodeAt(null, column, row);
        render();
    }

    /* 업데이트 */
    private void render() {
        List<T> toAdd = new ArrayList<>();
        for (int c = 0; c < column; c++) {
            for (int r = 0; r < row; r++) {
                T t = getNodeAt(column, row);
                if (t != null) {
                    toAdd.add(t);
                    GridPane.setColumnIndex(t, c);
                    GridPane.setRowIndex(t, r);
                }
            }
        }
        origin.getChildren().setAll(toAdd);
    }

    /* Column얻기 */
    public void columnOf(T t) {
        // TODO
    }

    /* Row얻기 */
    public void rowOf(T t) {
        // TODO
    }

    /* Row추가 */
    public void addRow(int rowAdd) {
        // TODO
        render();
    }

    /* Row제거 */
    public void removeRow(int rowRemove) {
        // TODO
        render();
    }

    /* Column추가*/
    public void addColumn(int columnAdd) {
        // TODO
        render();
    }

    /* Column제거 */
    public void removeColumn(int columnRemove) {
        // TODO
        render();
    }

}
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
