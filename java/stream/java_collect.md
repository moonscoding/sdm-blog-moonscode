
<div class="pull-right">  업데이트 :: 2018.10.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Stream Collect](#stream-collect)

<!-- /code_chunk_output -->

### Stream Collect

```java
public class Doc_Collect {

    public static void main(String[] args) {
        collectToList();
        collectToSet();
        collectToCustom();
    }

    /**
     * <collect> 이용 조건에 맞는 List로 재조합
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     */
    public static void collectToList() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        List<Student> maleList = totalList.stream()
                .filter(s->s.getZender() == Student.Zender.MALE)
                .collect(Collectors.toList());
        maleList.stream()
                .forEach(m -> System.out.println(m.getName()));
        System.out.println();
    }

    /**
     * <collect> 이용 조건에 맞는 Set으로 재조합
     *
     * @date 2018.09.27
     * @author SDM
     * @version 1.0
     * */
    public static void collectToSet() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        Set<Student> femaleSet = totalList.stream()
                .filter(s -> s.getZender() == Student.Zender.FEMALE)
                .collect(Collectors.toCollection(HashSet::new));
        femaleSet.stream()
                .forEach(s -> System.out.println(s.getName()));
        System.out.println();
    }

    /**
     * <collect> 이용 조건에 맞는 Custom 구조로 재조합
     *
     * @date 2018.09.28
     * @author SDM
     * @version 1.0
     * */
    public static void collectToCustom() {
        List<Student> totalList = Arrays.asList(
                new Student("nameA", 10, Student.Zender.MALE, Student.City.Seoul),
                new Student("nameB", 20, Student.Zender.FEMALE, Student.City.Seoul),
                new Student("nameC", 30, Student.Zender.MALE, Student.City.Pusan),
                new Student("nameD", 40, Student.Zender.FEMALE, Student.City.Pusan),
                new Student("nameE", 50, Student.Zender.MALE, Student.City.Pusan)
        );

        MaleStudent maleStudent = totalList.stream()
                .filter(s -> s.getZender() == Student.Zender.MALE)
                .collect(MaleStudent::new, MaleStudent::accumulate, MaleStudent::combine);

        maleStudent.getList().stream()
                .forEach(s -> System.out.println(s.getName()));
        System.out.println();
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
