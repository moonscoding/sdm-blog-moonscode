
<div class="pull-right">  업데이트 :: 2018.10.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Stream Group](#stream-group)

<!-- /code_chunk_output -->

### Stream Group

```java
public class Doc_Group {

    public static void main(String[] args) {
        groupingByZender();
        groupingByCity();
        groupingByZenderAndAverage();
        groupingByZenderAndCombine();
    }

    /**
     * <group> 요소를 성별로 그룹화 처리하기
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static void groupingByZender() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        Map<Student.Zender, List<Student>> mapByZender = totalList.stream()
                .collect(Collectors.groupingBy(Student :: getZender));

        System.out.println("[남학생]");
        mapByZender.get(Student.Zender.MALE).stream()
                .forEach(s-> System.out.println(s.getName()));
        System.out.println();

        System.out.println("[여학생]");
        mapByZender.get(Student.Zender.FEMALE).stream()
                .forEach(s-> System.out.println(s.getName()));
        System.out.println();
    }

    /**
     * <group> 요소를 도시로 그룹화 처리하기
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static void groupingByCity() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        Map<Student.City, List<String>> mapByCity = totalList.stream()
                .collect(
                        Collectors.groupingBy(
                                Student::getCity,
                                Collectors.mapping(Student::getName, Collectors.toList())
                        )
                );

        System.out.println("[서울]");
        mapByCity.get(Student.City.Seoul).stream()
                .forEach(s-> System.out.println(s));
        System.out.println();

        System.out.println("[부산]");
        mapByCity.get(Student.City.Pusan).stream()
                .forEach(s-> System.out.println(s));
        System.out.println();
    }

    /**
     * <group> 요소를 성별로 그룹화한 후에 평균처리하기
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static void groupingByZenderAndAverage() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        Map<Student.Zender, Double> mapByZender = totalList.stream()
                .collect(
                        Collectors.groupingBy(
                                Student::getZender,
                                Collectors.averagingDouble(Student::getAge)
                        )
                );
        System.out.println("[남학생평균점수] " + mapByZender.get(Student.Zender.MALE));
        System.out.println("[여학생평균점수] " + mapByZender.get(Student.Zender.FEMALE));
        System.out.println();
    }

    /**
     * <group> 요소를 성별로 그룹화한 후에 조합하기
     *
     * @date 2018.10.01
     * @author SDM
     * @version 1.0
     * */
    public static void groupingByZenderAndCombine() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        Map<Student.Zender, String> mapByZender = totalList.stream()
                .collect(
                        Collectors.groupingBy(
                                Student::getZender,
                                Collectors.mapping(
                                        Student::getName,
                                        Collectors.joining(",")
                                )
                        )
                );
        System.out.println("[남학생전체이름] " + mapByZender.get(Student.Zender.MALE));
        System.out.println("[남학생전체이름] " + mapByZender.get(Student.Zender.FEMALE));
        System.out.println();
    }

    static class Student implements Comparable<Student> {

        public enum Zender { MALE, FEMALE }
        public enum City { Seoul, Pusan }

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
        private List<Doc_Collect.Student> list; // 요소를 저장할 컬렉션

        public MaleStudent() {
            list = new ArrayList<Doc_Collect.Student>();
            System.out.println("[" + Thread.currentThread().getName() + "] MaleStudent()");
        }

        /**
         * 요소를 수집하는 메소드
         *
         * */
        public void accumulate(Doc_Collect.Student student) {
            list.add(student);
            System.out.println("[" + Thread.currentThread().getName() + "] accumulate()");
        }

        /**
         * 두 MaleStudent를 결합하는 메소드 ( 병렬처리시에만 호출 )
         *
         * */
        public void combine(Doc_Collect.MaleStudent other) {
            list.addAll(other.getList());
            System.out.println("[" + Thread.currentThread().getName() + "] combine()");
        }

        public List<Doc_Collect.Student> getList() {
            return list;
        }

        public void setList(List<Doc_Collect.Student> list) {
            this.list = list;
        }
    }
}

```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
