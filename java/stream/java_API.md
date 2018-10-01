
<div class="pull-right">  업데이트 :: 2018.09.27 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Stream API](#stream-api)

<!-- /code_chunk_output -->

### Stream API

```java
package docs.stream;

import java.util.*;
import java.util.stream.IntStream;

/**
 * # Stream PipeLine
 *
 * #리덕션
 *  - 대량의 데이터를 가공해서 축소
 *  - 필터링/매핑/정렬/그룹핑등 중간과정이 필요
 *
 * # 스트림 파이브라인
 *  - 리덕션을 스트림에서 처리
 *
 * # API - 중간처리
 *  필터링
 *      - distinct() :: 중복제거
 *      - filter() :: 매개값으로 주어진 Predicate가 true를 리턴하는 요소만 필터링
 *  매핑
 *      - flatMapXXX() :: 요소를 대체하는 복수개의 요소들로 구성된 새로운 스트림 리턴
 *      - flatMap()
 *      - flatMapToDouble()
 *      - flatMapToInt()
 *      - flatMapToLong()
 *      - mapXXX() :: 새로운 스트림을 리턴
 *      - map()
 *      - mapToDouble()
 *      - mapToInt()
 *      - mapToLong()
 *      - mapToObj()
 *      - asXXXStream() :: :: IntStream int 또는 LongStream long 요소를 double 요소로 타입 변환해 DoubleStream을 생성
 *      - asDoubleStream()
 *      - asLongStream()
 *      - boxed() :: :: int, long, double 요소를 Integer, Long, Double 요소로 박싱해서 Stream 합니다.
 *  정렬
 *      - sorted()
 *  루핑
 *      - peek() :: 중간처리단계에서 전체요소를 푸링하며 추가적인 작업을 하기위해사용
 *
 * # API - 최종처리
 *  매칭
 *      - allMatch() => boolean :: 모든 요소들이 매개값으로 주어진 predicate 조건을 만족하는지
 *      - anyMatch() => boolean :: 최소한 한개의 요소가 매개값으로 주거진 precicate 조건을 만족하는지
 *      - nonMatch() => boolean :: 모두 predicate 조건에 만족하지 않는지
 *  집계
 *      - count() => long
 *      - findFirst() => OptionalXXX
 *      - max() => OptionalXXX
 *      - max(Comparator<T>) => OptionalXXX
 *      - min() => OptionalXXX
 *      - min(Comparator<T>) => OptionalXXX
 *      - average() => OptionalXXX
 *      - reduce() => OptionalXXX
 *      - sum() => int, long, double
 *  루핑
 *      - forEach() => void :: 최종처리단계 루핑
 *  수집
 *      - collect() => R
 *
 * */
public class Doc_PipeLine {

    public static void main(String[] args) {
        sampleOfPipeLine();
        filter();
        flatMap();
        flatMapToInt();
        mapToInt();
        asDoubleStream();
        boxed();
        sortOfNumber();
        sortOfObject();
        peek();
        allMatch();
        anyMatch();
        noneMatch();
        optional();
        orEles();
        ifPresent();
        reduce();
    }

    /**
     * <Stream> 파이프라인을 이용해서 남성 평균 나이 구하기
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void sampleOfPipeLine() {
        List<Student> list = Arrays.asList(
                new Student("nameA", Student.MALE, 30),
                new Student("nameB", Student.FEMALE, 40),
                new Student("nameC", Student.MALE, 50),
                new Student("nameD", Student.FEMALE, 60),
                new Student("nameE", Student.MALE, 70)
        );

        double avgOfAge = list.stream()
                .filter(m -> m.getZender() == Student.MALE)
                .mapToInt(Student::getAge)
                .average()
                .getAsDouble();

        System.out.println("[남성평균나이] " + avgOfAge);
        System.out.println();
    }

    /**
     * 스트림 필터를 이용한 예제
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void filter() {
        List<String> list = Arrays.asList("nameA", "nameB", "nameC", "nameC", "nameD", "nameE");
        list.stream()
                .distinct()
                .forEach(n -> System.out.println(n));
        System.out.println();

        list.stream()
                .filter(n -> n.startsWith("nameC"))
                .forEach(n -> System.out.println(n));
        System.out.println();

        list.stream()
                .distinct()
                .filter(n -> n.startsWith("nameC"))
                .forEach(n -> System.out.println(n));
        System.out.println();
    }

    /**
     * <flatMap> 이용한 문자열 분리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void flatMap() {
        List<String> inputListA = Arrays.asList("java8 lambda", "stream mapping");
        inputListA.stream()
                .flatMap(data -> Arrays.stream(data.split(" ")))
                .forEach(word -> System.out.println(word));
        System.out.println();
    }

    /**
     * <flatMapToInt> 이용한 문자열 인트처리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void flatMapToInt() {
        List<String> inputListB = Arrays.asList("10, 20, 30", "40, 50, 60");
        inputListB.stream()
                .flatMapToInt(data -> {
                    String[] strArr = data.split(",");
                    int[] intArr = new int[strArr.length];
                    for(int i=0; i<strArr.length; i++) {
                        intArr[i] = Integer.parseInt(strArr[i].trim());
                    }
                    return Arrays.stream(intArr);
                })
                .forEach(number -> System.out.println(number));
        System.out.println();
    }

    /**
     * <mapToInt> 이용 객체의 숫자처리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void mapToInt() {
        List<Student> list = Arrays.asList(
                new Student("nameA", Student.MALE, 30),
                new Student("nameB", Student.FEMALE, 40),
                new Student("nameC", Student.MALE, 50),
                new Student("nameD", Student.FEMALE, 60),
                new Student("nameE", Student.MALE, 70)
        );

        list.stream()
                .mapToInt(Student::getAge)
                .forEach(age -> System.out.println(age));
        System.out.println();
    }

    /**
     * <asDoubleStream> 이용 int stream -> double stream 처리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void asDoubleStream() {
        int[] intArray = {1,2,3,4,5};
        IntStream intStream = Arrays.stream(intArray);
        intStream
                .asDoubleStream()
                .forEach(d -> System.out.println(d));
        System.out.println();
    }

    /**
     * <boxed> 이용 Wrapper 처리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void boxed() {
        int[] intArray = {1,2,3,4,5};
        IntStream intStream = Arrays.stream(intArray);
        intStream
                .boxed() // int -> Integer
                .forEach(obj -> System.out.println(obj.intValue()));
        System.out.println();
    }

    /**
     * <sorted> 이용 숫자 스트림 정렬
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void sortOfNumber() {
        IntStream intStream = Arrays.stream(new int[] {5,4,3,2,1});
        intStream
                .sorted()
                .forEach(n -> System.out.println(n));
        System.out.println();
    }

    /**
     * <sorted> 이용 객체 스트림 정렬
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void sortOfObject() {
        List<Student> list = Arrays.asList(
                new Student("nameA", Student.MALE, 50),
                new Student("nameB", Student.FEMALE, 40),
                new Student("nameC", Student.MALE, 30),
                new Student("nameD", Student.FEMALE, 20),
                new Student("nameE", Student.MALE, 10)
        );
        list.stream()
                .sorted()
                .forEach(s -> System.out.println(s.getAge()));
        System.out.println();
    }

    /**
     * <peek> 이용한 중간 결과 확인 (최종단계에서 동작하지 않음)
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void peek() {
        int[] arr = new int[] {1,2,3,4,5};
        Arrays.stream(arr)
                .filter(a -> a%2 == 0)
                .peek(n -> System.out.println(n)); // 동작 (X)
        System.out.println();

        int total = Arrays.stream(arr)
                .filter(a -> a%2 == 0)
                .peek(n -> System.out.println(n)) // 동작 (O)
                .sum();
        System.out.println("[총합] " + total);
        System.out.println();
    }

    /**
     * <allMatch> 이용 2의 배수가 스트림내에 모두 일치하는지 확인
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void allMatch() {
       int[] arr = { 2, 4, 6 };
       boolean result = Arrays.stream(arr)
                .allMatch(a -> a%2 == 0);
        System.out.println("[allMatch %2] " + result);
        System.out.println();
    }

    /**
     * <anyMatch> 이용 3의 배수가 스트림내에 1개라도 있는지 확인
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void anyMatch() {
        int[] arr = { 2, 4, 6 };
        boolean result = Arrays.stream(arr)
                .anyMatch(a -> a%3 == 0);
        System.out.println("[anyMatch %3] " + result);
        System.out.println();
    }

    /**
     * <noneMatch> 이용 3의 배수가 스트림내에 없는지 확인
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void noneMatch() {
        int[] arr = { 2, 4, 6 };
        boolean result = Arrays.stream(arr)
                .noneMatch(a -> a%3 == 0);
        System.out.println("[noneMatch %3] " + result);
        System.out.println();
    }

    /**
     * <optional> 이용한 평균 구하기
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void optional() {
        List<Integer> list = new ArrayList<>();

        // Exception ! NoSuchElementException
        /*
        double avg = list.stream()
                .mapToInt(Integer::intValue)
                .average()
                .getAsDouble();
        */

        OptionalDouble optional = list.stream()
                .mapToInt(Integer::intValue)
                .average();
        if(optional.isPresent()) {
            System.out.println("[평균] " + optional.getAsDouble());
        } else {
            System.out.println("[평균] 0.0");
        }
        System.out.println();
    }

    /**
     * <orEles> 이용한 예외처리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void orEles() {
        List<Integer> list = new ArrayList<>();
        double avg = list.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);
        System.out.println("[평균] " + avg);
        System.out.println();
    }

    /**
     * <ifPresent> 이용 올바른 값이 존재시에만 처리하기
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void ifPresent() throws NoSuchElementException {
        List<Integer> list = new ArrayList<>();
        list.stream()
                .mapToInt(Integer::intValue)
                .average()
                .ifPresent(a -> System.out.println("[평균] " + a));
        System.out.println();
    }

    /**
     * <reduce> 이용 스트림 누적 계산처리
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void reduce() {
        List<Student> list = Arrays.asList(
                new Student("nameA", Student.MALE, 30),
                new Student("nameB", Student.FEMALE, 40),
                new Student("nameC", Student.MALE, 50)
        );

        int sumA = list.stream()
                .mapToInt(Student::getAge)
                .sum();

        int sumB = list.stream()
                .map(Student::getAge)
                .reduce((a, b) -> a+b)
                .get();

        int sumC = list.stream()
                .map(Student::getAge)
                .reduce(0, (a,b) -> a+b);

        System.out.println("[총합] " + sumA);
        System.out.println("[총합] " + sumB);
        System.out.println("[총합] " + sumC);
    }

    static class Student implements Comparable<Student> {

        public static int MALE = 0;
        public static int FEMALE = 1;

        String name;
        int zender;
        int age;

        public Student(String name, int zender, int age) {
            this.name = name;
            this.zender = zender;
            this.age = age;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getZender() {
            return zender;
        }

        public void setZender(int zender) {
            this.zender = zender;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }

        @Override
        public int compareTo(Student o) {
            return Integer.compare(age, o.getAge());
        }
    }
}

```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
