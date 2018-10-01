
<div class="pull-right">  업데이트 :: 2018.10.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Stream Parallel](#stream-parallel)

<!-- /code_chunk_output -->

### Stream Parallel

```java
/**
 *  # [동시성과 병렬성]
 *      동시성 :: 멀티 작업을 위해 멀티 스레드가 번갈아가며 실행하는 성질
 *      병렬성 :: 멀티 작업을 위해 멀티 코어를 이용해서 동시에 실행하는 성질
 *          데이터 병렬성 :: 전체 데이터를 쪼개서 병렬 처리 ( 스트림 )
 *          작업 병렬성 :: 서로 다른 작업을 병렬로 처리 ( 웹서버 )
 *
 * # [포크조인 프레임워크]
 *      - 병렬 스트림을 이용하면 런타임시에 포크조인 프레임워크 동작
 *      - 포크단계 :: 전체 데이터를 서브 데이터로 분리후 병렬처리
 *      - 조인단게 :: 서브 데이터의 결과를 조합해서 최종결과 도출
 *
 * */
public class Doc_Parallel {

    public static void main(String[] args) {
        parallelStream();
        compare();
    }

    /**
     * 병렬로 스트림을 이용해서 커스텀리스트 만들기
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static void parallelStream() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        MaleStudent maleStudent = totalList.parallelStream()
                .filter(s -> s.getZender() == Student.Zender.MALE)
                .collect(MaleStudent::new, MaleStudent::accumulate, MaleStudent::combine);

        maleStudent.getList().stream()
                .forEach(s -> System.out.println(s.getName()));
        System.out.println();
    }

    /**
     * 순차처리 vs 병렬처리
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static void compare() {
        List<Integer> list = Arrays.asList(0,1,2,3,4,5,6,7,8,9);

        // 순차
        long timeSequencial = sequencial(list);

        // 병렬
        long timeParallel = parallel(list);

        System.out.println("[순차] " + timeSequencial);
        System.out.println("[병렬] " + timeParallel);
        System.out.println();
    }

    /**
     * 작업메소드 (작업이 없을때 :: 순차 < 병렬)
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static void work(int value) {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    /**
     * 순차처리
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static long sequencial(List<Integer> list) {
        long start = System.nanoTime();
        list.stream().forEach(a->work(a));
        long end = System.nanoTime();
        long runTime = end - start;
        return runTime;
    }

    /**
     * 병렬처리
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static long parallel(List<Integer> list) {
        long start = System.nanoTime();
        list.stream().parallel().forEach(a->work(a));
        long end = System.nanoTime();
        long runTime = end - start;
        return runTime;
    }

    static class Student implements Comparable<Student> {

        public enum Zender { MALE, FEMALE };
        public enum City { Seoul, Pusan };

        String name;
        int age;
        Zender zender;
        City city;


        public Student(String name, int age, Zender zender, City city) {
            this.name = name;
            this.age = age;
            this.zender = zender;
            this.city = city;
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

        public Zender getZender() {
            return zender;
        }

        public void setZender(Zender zender) {
            this.zender = zender;
        }

        public City getCity() {
            return city;
        }

        public void setCity(City city) {
            this.city = city;
        }

        @Override
        public int compareTo(Student o) {
            return Integer.compare(age, o.getAge());
        }
    }

    static class MaleStudent {
        private List<Student> list; // 요소를 저장할 컬렉션

        public MaleStudent() {
            list = new ArrayList<Student>();
            System.out.println("[" + Thread.currentThread().getName() + "] MaleStudent()");
        }

        /**
         * 요소를 수집하는 메소드
         *
         * */
        public void accumulate(Student student) {
            list.add(student);
            System.out.println("[" + Thread.currentThread().getName() + "] accumulate()");
        }

        /**
         * 두 MaleStudent를 결합하는 메소드 ( 병렬처리시에만 호출 )
         *
         * */
        public void combine(MaleStudent other) {
            list.addAll(other.getList());
            System.out.println("[" + Thread.currentThread().getName() + "] combine()");
        }

        public List<Student> getList() {
            return list;
        }

        public void setList(List<Student> list) {
            this.list = list;
        }
    }
}
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
