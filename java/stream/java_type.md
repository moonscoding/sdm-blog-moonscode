
<div class="pull-right">  업데이트 :: 2018.09.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Stream 종류](#stream-종류)

<!-- /code_chunk_output -->

### Stream 종류

```java
/**
 * #Stream 종류
 *  - BaseStream
 *      - Stream
 *      - IntStream
 *      - LongStream
 *      - DoubleStream
 * */
public class Doc_TypeOfStream {

    public static final String DIR = System.getProperty("user.dir") + "/src/data/txt/";

    public static void main(String[] args) throws IOException {
        collectionToStream();
        arrayToStream();
        rangeToStream();
        fileToStream();
        readerToStream();
        dirToStream();
    }

    /**
     * Collection To Stream
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void collectionToStream() {
        List<Student> students = Arrays.asList(
                new Student("nameA", 12),
                new Student("nameB", 13),
                new Student("nameC", 14)
        );

        Stream<Student> stream = students.stream();
        stream.forEach(s -> System.out.println(s.getName()));
        System.out.println();
    }

    /**
     * Array To Stream
     *
     * @date 2019.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void arrayToStream() {
        String[] strArray = { "elementA", "elementB", "elementC" };
        Stream<String> strStream = Arrays.stream(strArray);
        strStream.forEach(a -> System.out.println(a));
        System.out.println();

        int[] intArray = {1, 2, 3};
        IntStream intStream = Arrays.stream(intArray);
        intStream.forEach(a -> System.out.println(a));
        System.out.println();
    }

    /**
     * Range To Stream 범위이용 총합구하기
     *
     * @date 2019.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void rangeToStream() {
        IntStream stream = IntStream.rangeClosed(1, 100);
        stream.forEach(a -> sum += a); // 지역변수접근 (X)
        System.out.println("[1~100 합] " + sum);
        System.out.println();
    }
    static int sum = 0;

    /**
     * File To Stream
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void fileToStream() throws IOException {
        Path path = Paths.get(DIR + "tutorial.txt");
        Stream<String> stream = Files.lines(path, Charset.defaultCharset());
        stream.forEach(System.out :: println);
        System.out.println();
    }

    /**
     * Reader to Stream
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void readerToStream() throws IOException {
        Path path = Paths.get(DIR + "tutorial.txt");
        File file = path.toFile();
        FileReader fileReader = new FileReader(file);
        BufferedReader br = new BufferedReader(fileReader);
        Stream<String> stream = br.lines();
        stream.forEach(System.out :: println);
        System.out.println();
    }

    /**
     * Directory to Stream (정렬안됨)
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void dirToStream() throws IOException {
        Path path = Paths.get(DIR);
        Stream<Path> stream = Files.list(path);
        stream.forEach(p-> System.out.println(p.getFileName()));
        System.out.println();
    }

    public static class Student {
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

}
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
