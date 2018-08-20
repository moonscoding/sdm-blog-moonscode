# JAVA FX
## TableView Adapter
<div class="pull-right">  업데이트 :: 2018.07.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA FX](#java-fx)
	* [TableView Adapter](#tableview-adapter)
		* [TableView adapter](#tableview-adapter-1)

<!-- /code_chunk_output -->

### TableView adapter

TableView을 이용한 Dynamic Adapter Class (abstract)

```java
public abstract class TableAdapter<T> {

    List<T> tableList = new ArrayList<>();
    TableView origin;
    ObservableList list;

    /* 생성자 */
    public TableAdapter(TableView origin) {
        this.origin = origin;
    }

    /* 초기화 */
    public void init(String[] colums) {
        list = FXCollections.observableArrayList();
        for (int i = 0; i < origin.getColumns().size(); i++) {
            TableColumn tc = (TableColumn) origin.getColumns().get(i);
            tc.setCellValueFactory(new PropertyValueFactory(colums[i]));
             tc.setStyle("-fx-alignment:CENTER;");
        }
        origin.setItems(list);
    }

    /* 모두제거 */
    public void clear() {
        tableList.clear();
        render();
    }

    /* 객체얻기 */
    public T get(int index) {
        if(index < 0 || index >= tableList.size()) return null;
        return tableList.get(index);
    }

    /* 객체추가 */
    public void add(T t) {
        tableList.add(t);
        render();
    }

    /* 객체수정 */
    public void set(int index, T t) {
        if(index < 0 || index >= tableList.size()) return;
        tableList.set(index, t);
        render();
    }

    /* 객체제거 */
    public void remove(int index) {
        if(index < 0 || index >= tableList.size()) return;
        tableList.remove(index);
        render();
    }

    /* 업데이트 */
    private void render() {
        list = FXCollections.observableArrayList(tableList);
        origin.setItems(list);
    }

}
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
