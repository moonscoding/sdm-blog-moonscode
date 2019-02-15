<div class="pull-right"> 업데이트 :: 2018.12.30 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Spring Batch ?](#spring-batch)
* [Structure !](#structure)
* [비동기 ?](#비동기)

<!-- /code_chunk_output -->

### Spring Batch ?

> 스프링 배치 애플리케이션 프레임워크

- 처리흐름을 정형화
  - 단순한 형태의 테스트릿(tasklet)방식
    - SQL을 한번 실행, 명령을 실행하는 수준의 단순한 처리
  - 대량의 데이터를 처리하는 청크(chunk)방식
    - 데이터의 수집, 가공, 출력과 같은 처리 흐름을 정형화해서 꼭 필요한 부분만 직접 구현
    - 일정 건수가 됬을때 처리하는 트랜잭션은 스프링 배치가 처리
- 다양한 실행방법을 제공
  - 명령행에서 실행하거나, 서블릿에서 실행하는 등 다양한 형태의 실행 방법 제공
- 다양한 데이터의 형식으로 입출력을 진행
  - 파일, DB, 메시지큐 같은 다양한 데이서 소스의 입출력을 간단히 처리
- 배치 처리를 효율적으로 수행
  - 다중 실행, 병렬 실행, 조건 분기 등의 처리 방식을 설정으로 정의
  - 상황에 맞는 가장 효율적인 처리 방법을 선택
- 잡을 관리
  - 잡이 실행되던 상황을 저장하거나 재시작 가능

### Structure !

- JobLauncher
  - 배치 애플리케이션을 기동하기 위한 인터페이스
  - 모든 배치 애플리케이션은 이 클래스를 통해 실행
  - 배치 애플리케이션에 인수를 전달하는 것도 여기서 처리
  - JobLauncher를 사용자가 직접 사용할 수 도 있지만, 자바 명령으로 CommandLineJobRunner를 실행해 배치처리도 가능
    - CommandLineJobRunner는 JobLauncher를 실행하기 위한 각종 처리를 지원
- Job
  - 배치 애플리케이션에서 일련의 처리 과정을 하나의 단위로 만든 실행 단위
- Step
  - Job을 구성하는 세부 처리 단위
  - 하나의 잡은 N개의 Step으로 구성
  - 하나의 Job 처리를 여러개의 Step으로 분할하면 세부 처리를 재사용하거나 병렬 처리를 적용할 수 있고, 조건 분기에 따른 제어도 가능
  - Step은 Chunk방식이나 Tasklet방식 중 한가지 형태로 실행
    - Chunk방식은 일정량의 데이터를 한번에 몰아서 입력, 가공, 출력하는 방식
    - Tasklet방식은 처리 방법을 자유롭게 기술할 수 있는 방식
- ItemReader / ItemProcessor / ItemWriter
  - Step을 데이터 입력, 가공, 출력의 세 가지 패턴 처리로 분할하기 위한 인터페이스
    - 스프링 배치에서는 Chunk방식을 구현할때 이 세가지 패턴을 활용
    - 개발자는 이 패턴에 맞춰 비즈니스 로직을 분할해서 구현
  - 데이터를 입출력하는 ItemReader / ItemWriter 는 DB나 파일을 자바 객체로 변환한다거나 그 반대 처리
    - 스프링 배치에는 이러한 처리를 위한 기본 구현체가 제공
    - DB나 파일에서 데이터를 입출력하는 일반적인 배치 애플리케이션이라면 기본 구현체 만으로도 대부분의 요구사항을 충족
- JobRepository
  - Job / Step의 상태를 관리
  - 이러한 정보는 스프링 배치가 정의한 테이블 스키마 형태로 DB에 저장

### 비동기 ?

- JobLauncher 의 기본 구현 클래스인 SimpleJobLauncher 는 기본적으로 동기 방식
- 설정 변경을 이용해서 비동기로 사용도 가능
- 배치 작업을 처리하는 클래스는 TaskExecutor 인터페이스를 구현하도록 약속, 이 인터페이스가 동기처리냐 아니냐에 따라 달라짐
- SimpleJobLauncher 에 설정자 메서드로 설정되는 TaskExecutor
  - SyncTaskExecutor 설정하면 동기방식
  - SimpleAsyncTaskExecutor 설정하면 비동기방식

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
