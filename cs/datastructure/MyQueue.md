# 자료구조
## MyQueue - RingBuffer
<div class="pull-right">  업데이트 :: 2018.08.02 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [자료구조](#자료구조)
	* [MyQueue - RingBuffer](#myqueue-ringbuffer)
		* [01. 큐](#01-큐)
		* [02. 구현](#02-구현)

<!-- /code_chunk_output -->

### 01. 큐

- FIFO (선입선출)
- 배열은 비효율적 => 링버퍼나 리스트를 사용해야함

### 02. 구현

- add()
- remove()
- peek()
- isEmpty()

```java
public class MyQueue {

    /* Main */
    public static void main(String[] args) {
        Queue<Integer> queue = new Queue(16);
        queue.add(1);
        queue.add(2);
        queue.add(3);
        System.out.println(queue.remove());
        System.out.println(queue.remove());
        System.out.println(queue.remove());
        System.out.println(queue.remove());
    }

    /* Queue - RingBuffer구현 */
    public static class Queue<T> {

        // == Field ==
        public int capacity;
        public int pointerFront;
        public int pointerBack;
        public int size;
        public T[] bucket;

        // == Constructor ==
        public Queue(int capacity) {
            this.capacity = capacity;
            this.pointerBack = 0;
            this.pointerFront = 0;
            this.size = 0;
            this.bucket = (T[]) new Object[capacity]; // * 제네릭객체 생성방법
        }

        // == add ==
        public void add(T t) {
            if(size < capacity) {
                this.bucket[pointerFront++] = t;
                size++;
                if(pointerFront >= capacity) pointerFront = 0;
            }
        }

        // == remove ==
        public T remove() {
            if(size > 0) {
                size--;
                T rtn = this.bucket[pointerBack++];
                if(pointerBack >= capacity) pointerBack = 0;
                return rtn;
            }
            return null;
        }

        // == peek ==
        public T peek() {
            if(size > 0) {
                return this.bucket[pointerBack];
            }
            return null;
        }

        // == isEmpty ==
        public boolean isEmpty() {
            return size == 0 ? true : false;
        }
    }
}

```


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
