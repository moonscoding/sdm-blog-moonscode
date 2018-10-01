
<div class="pull-right">  업데이트 :: 2018.09.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Stream 개념](#stream-개념)

<!-- /code_chunk_output -->

### Stream 개념

```java
/**
 * #Stream
 *
 * #Stream의 특징
 *  - 람다식으로 요소 처리 코드를 제공
 *  - 내부 반복자를 사용해서 병렬 처리가 쉬움
 *      - 외부반복자 :: 개발자가 코드로 직접 컬렉션의 요소를 반복하는 것
 *      - 내부반복자 :: 컬렉션 내부에서 요소들을 반복하는 것
 *  - 스트림은 중간 처리와 최종처리를 할 수 있음
 *
 */
public class Doc_Stream {

    public static void main(String[] args) {
        stream();
        elementAOfStream();
        elementBOfStream();
        elementCOfStream();
    }

    /**
     * Stream 객체 출력 샘플
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     */
    static public void stream() {
        // <Iterator>에 비해서 <Stream>이 훨씬 단순
        List<String> list = Arrays.asList("elementA","elementB","elementC");
        Stream<String> stream = list.stream();
        stream.forEach(name -> System.out.println(name));
        System.out.println();
    }

    /**
     * <Stream 특징> 람다식 이용
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    static public void elementAOfStream() {
        // 1. 람다식이용
        List<Student> students = Arrays.asList(
                new Student("nameA", 12),
                new Student("nameB", 13),
                new Student("nameC", 14)
        );

        Stream<Student> stream = students.stream();
        stream.forEach(student -> {
            String name = student.getName();
            int age = student.getAge();
            System.out.println(name + " " + age);
        });
        System.out.println();
    }

    /**
     * <Stream 특징> 내부 반복자
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    static public void elementBOfStream() {
        // 2. 내부반복자
        List<String> list = Arrays.asList("elementA","elementB","elementC","elementD","elementE");

        Stream<String> stream = list.stream();
        stream.forEach(Doc_Stream :: print);
        System.out.println();

        Stream<String> parallelStream = list.parallelStream();
        parallelStream.forEach(Doc_Stream :: print);
        System.out.println();
    }

    /**
     * <Stream 특징> 중간처리와 최종처리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void elementCOfStream() {
        List<Student> students = Arrays.asList(
                new Student("nameA", 12),
                new Student("nameB", 13),
                new Student("nameC", 14)
        );

        double avg = students.stream()
                .mapToInt(Student :: getAge)
                .average()
                .getAsDouble();
        System.out.println("[평균] " + avg);
        System.out.println();
    }

    static class Student {
        String name;
        int age;

        public Student(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }

    /**
     * 현재 작업스레드를 출력하는 함수
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * @param str 현재 진행 요소
     * */
    public static void print (String str) {
        System.out.println(str + " " + Thread.currentThread().getName());
    }

}

```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
