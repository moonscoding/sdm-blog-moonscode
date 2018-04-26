# TITLE (UpperCase)
## RecyclerView
<div class="pull-right">  업데이트 :: 2018.04.17 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [TITLE (UpperCase)](#title-uppercase)
	* [RecyclerView](#recyclerview)
		* [01. RecyclerView 생성하기](#01-recyclerview-생성하기)
		* [02. LayoutManager](#02-layoutmanager)
		* [03. ViewHolder](#03-viewholder)
		* [04. Adapter](#04-adapter)
		* [05. ItemDecoration](#05-itemdecoration)
		* [06. ItemAnimtor](#06-itemanimtor)

<!-- /code_chunk_output -->

- Adapter란,
  - 데이터(Model)와 아이템에 대한 View생성
- ViewHolder란,
  - 재활용 View에 대한 모든 서브 뷰를 보유
- LayoutManager란,
  - 아이템의 항목을 배치하는 방법
- ItemDecoration란,
  - 아이템 항목에서 서브뷰에 대한 처리
- ItemAnimation란,
  - 아이템 항목이 추가, 제거되거나 정렬될때 애니메이션 처리

### 01. RecyclerView 생성하기

```java
// [#] LinearLayoutManager, GridLayoutManager 모두 사용가능
LinearLayoutManager mLayoutManager = new GridLayoutManager(getActivity(), Tools.getGridSpanCount(getActivity()));

recyclerView.setLayoutManager(mLayoutManager);

adapter = new Adapter(this.getActivity());

rcContent.setAdapter(adapter);
```

### 02. LayoutManager

LinearLayoutManager – 수평/수직의 스크롤 리스트
GridLayoutManager – 그리드 리스트
StaggeredGridLayoutManage – 높이가 불구칙적인 형태의 그리드 리스트

LayoutManager를 이용해서 다양한 형태를 만들 수 있습니다.

```java
LinearLayoutManager layoutManager = new LinearLayoutManager(context);
layoutManager.setOrientation(LinearLayoutManager.VERTICAL);
layoutManager.scrollToPosition(currPos);
recyclerView.setLayoutManager(layoutManager);
```

### 03. ViewHolder

```java
public final static class ListItemViewHolder extends RecyclerView.ViewHolder {
   TextView label;
   TextView dateTime;

   public ListItemViewHolder(View itemView) {
      super(itemView);
      label = (TextView) itemView.findViewById(R.id.txt_label_item);
      dateTime = (TextView) itemView.findViewById(R.id.txt_date_time);
   }
}
```

이렇게 함으로 한번 생성한 클래스를 통해 서브 클래스(뷰)를 빠르게 다시 액세스 할 수 있다.

### 04. Adapter

ListView에서 Adpater와 동일한 형태의 구조로 해당 아이템의 데이터와 뷰간의 처리를 합니다.

다음과 같은 3가지의 인터페이스를 구현해야 한다.

- public ListItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType)
  - 제네릭 형식의 변수로 ViewHolder를 생성
- public void onBindViewHolder(ListItemViewHolder holder, int position)
  - 만들어진 ViewHolder에 데이터를 넣는 작업, ListView의 getView()와 동일
- public int getItemCount()
  - 데이터의 갯수

```java
public class RecyclerViewDemoAdapter extends RecyclerView.Adapter {

    private List items;

    RecyclerViewDemoAdapter(List modelData) {
        if (modelData == null) {
            throw new IllegalArgumentException(
                  "modelData must not be null");
        }
        this.items = modelData;
    }

    //[#] interface 1
    @Override
    public ListItemViewHolder onCreateViewHolder(
            ViewGroup viewGroup, int viewType) {
        View itemView = LayoutInflater.
                from(viewGroup.getContext()).
                inflate(R.layout.item_demo_01, viewGroup, false);
        return new ListItemViewHolder(itemView, viewType);
    }

    //[#] interface 2
    @Override
    public void onBindViewHolder(
            ListItemViewHolder viewHolder, int position) {
        DemoModel model = items.get(position);
        viewHolder.label.setText(model.label);
        String dateStr = DateUtils.formatDateTime(
                viewHolder.label.getContext(),
                model.dateTime.getTime(),
                DateUtils.FORMAT_ABBREV_ALL);
        viewHolder.dateTime.setText(dateStr);
    }

    //[#] interface 3
    @Override
    public int getItemCount() {
        return items.size();
    }

    // [#] ViewHolder
    public final static class ListItemViewHolder extends RecyclerView.ViewHolder {
        // ViewHolder
    }
}
```

### 05. ItemDecoration

각 아이템 항목별로 오프셋을 추가하거나 아이템을 꾸미는 작업을 하게 된다.

예를 들어 스크롤 시 콘텐츠의 내용에 따라

View의 높이가 달라져 레이아웃의 위치를 이동해야 하는 작업하는 경우 여기에서 처리하면 된다.

- public void onDraw(Canvas c, RecyclerView parent)
- public void onDrawOver(Canvas c, RecyclerView parent)
- public void getItemOffsets(Rect outRect, int itemPosition, RecyclerView parent)

LayoutManager에서 getItemOffsets()의 호출을 통해

아이템의 레이아웃의 크기를 측정 하기 때문에 위의 예시는 getItemOffsets()에서 작업하면된다.

### 06. ItemAnimtor

ListView에서 아이템별 애니메이션을 일으키기 위해 notifyDataSetChanged()를 호출해

모든 아이템 변경이 발생할 때 처리를 하였으나

```java
notifyItemChanged(int position),

notifyItemInserted(int position),

notifyItemRemoved(int position)
```

ItemAnimator를 통해 특정 아이템에 대한 애니메이션을 발생할 수 있다.

> public final void notifyItemChanged(int position)
> public final void notifyItemInserted(int position)
> public final void notifyItemRemoved(int position)


custom Animatro 샘플

```java
RecyclerView.ItemDecoration itemDecoration =
        new DividerItemDecoration(this, DividerItemDecoration.VERTICAL_LIST);
recyclerView.addItemDecoration(itemDecoration);

recyclerView.setItemAnimator(new CustomItemAnimator());


public class CustomItemAnimator extends ItemAnimator {

    public CustomItemAnimator() {
        setAddDuration(300);
        setRemoveDuration(300);
    }

    @Override
    protected boolean prepHolderForAnimateRemove(ViewHolder holder) {
        return true;
    }

    @Override
    protected ViewPropertyAnimatorCompat animateRemoveImpl(ViewHolder holder) {
        return ViewCompat.animate(holder.itemView)
                .rotationX(90)
                .translationY( - (holder.itemView.getMeasuredHeight() / 2));
    }

    @Override
    protected void onRemoveCanceled(ViewHolder holder) {
        ViewCompat.setRotationX(holder.itemView, 0);
        ViewCompat.setTranslationY(holder.itemView, 0);
    }

    @Override
    protected boolean prepHolderForAnimateAdd(ViewHolder holder) {
        ViewCompat.setRotationX(holder.itemView, 90);
        ViewCompat.setTranslationY(holder.itemView, - (holder.itemView.getMeasuredHeight() / 2));
        return true;
    }

    @Override
    protected ViewPropertyAnimatorCompat animateAddImpl(ViewHolder holder) {
        return ViewCompat.animate(holder.itemView)
                .rotationX(0)
                .translationY(0);
    }

    @Override
    protected void onAddCanceled(ViewHolder holder) {
        ViewCompat.setRotationX(holder.itemView, 0);
        ViewCompat.setTranslationY(holder.itemView, 0);
    }
}
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ](http://aroundck.tistory.com/2974)

[링크2 :: ](http://www.kmshack.kr/2014/10/android-recyclerview/)
