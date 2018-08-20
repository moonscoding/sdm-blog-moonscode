# 자료구조
## MyStack
<div class="pull-right">  업데이트 :: 2018.08.02 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [자료구조](#자료구조)
	* [MyStack](#mystack)
		* [01. 스택](#01-스택)
		* [02. 구현](#02-구현)

<!-- /code_chunk_output -->

### 01. 스택

- LIFO (후입선출)
- 제네릭 사용

### 02. 구현

- push()
- pop()
- peek()
- isEmpty()
- size()

```java

public class MyStack {

    /* Main */
    public static void main(String[] args) {
        Stack<Integer> stack = new Stack(16);
        stack.push(1);
        stack.push(2);
        stack.push(3);
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack.pop());
    }

    /* Stack */
    public static class Stack<T> {

        // == Field ==
        public int capacity;
        public int size;
        public T[] bucket;

        // == Constructor ==
        public Stack(int capacity) {
            this.capacity = capacity;
            this.size = 0;
            this.bucket = (T[]) new Object[capacity];
        }

        // == push ==
        public void push(T t) {
            if(size < capacity) {
                this.bucket[size++] = t;
            }
        }

        // == pop ==
        public T pop() {
            if(size > 0) {
                return this.bucket[--size];
            }
            return null;
        }

        // == peek ==
        public T peek() {
            return this.bucket[size-1];
        }

        // == isEmpty ==
        public boolean isEmpty() {
            return size == 0 ? true : false;
        }

        // == size ==
        public int size() {
            return size;
        }
    }
}

```


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
