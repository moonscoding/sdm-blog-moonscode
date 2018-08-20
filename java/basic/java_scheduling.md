
# JAVA
## Scheduling
<div class="pull-right">  업데이트 :: 2018.08.03 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [JAVA](#java)
	* [Scheduling](#scheduling)
		* [Thread이용방법](#thread이용방법)
		* [Timer & TimeTask](#timer-timetask)
		* [ScheduledExecutorService](#scheduledexecutorservice)
		* [Timer는 스레드가 기다리는 걸까 ?](#timer는-스레드가-기다리는-걸까)

<!-- /code_chunk_output -->



### Thread이용방법

```java
Thread.sleep(1000);
```

- 다음방법은 간단하지만 프로그램의 성능을 저하 할 수 있음
- 메인스레드라면 스레드가 잡여 후속 작업을 수행하지 못함

```java
Thread t = new Thread() {
  public void run() {
    Thread.sleep(1000);
  }
};
```

- 다음방법은 워크스레드를 사용해서 프로그램이 멈추진 않음
- 하지만 해당 워커스레드는 다음작업이 오기전까지 기다려야함

### Timer & TimeTask

- 태스크를 시작할때 취소할때를 통제
- 처음 시작할때 타이밍을 원하는데로 할수있음
- 다음 코드는 비동기로 동작 ("async test"가 먼저 출력)

```java
TimerTask task = new TimerTask() {
  @Override
  public void run() {
    System.out.println("hello world?");
  }
};

Timer timer = new Timer();
long delay = 0;
timer.scheduleAtFixedRate(task, delay, 1000);

System.out.println("async test");
```

### ScheduledExecutorService

- Timer는 싱글스레드로 동작하지만 스레드풀로 실행
- 처음실행시 딜레이를 제공하며 매우 유연
- 타임 인터벌을 제공하기 위해 멋진 conversions를 제공
- 보다 정확한 타임 인터벌의 태스크 수행

```java
Runable runable = new Runnable() {
  public void run() {
    System.out.println("hello world?");
  }
};
ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
service.scheduleAtFixedRate(runnable, 0 , 1 , TimeUnit.SECONDS)
```

### Timer는 스레드가 기다리는 걸까 ?

Thread에 Timer를 걸어 놓으면,

- 타이머가 다 되는 순간에 와서 작업을 하는 걸까 ?
- 가만히 스레드가 끝나기를 기다리는 걸까 ?

```java
for (int i = 0; i < 100; i++) {
	Thread task = new Thread() {
		@Override
		public void run() {
			try {
				Thread.sleep(10000);
				System.out.println("hello world A?");
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	};
	task.start();
}
System.out.println("async test");
```

> 테스트결과 스레드가 기다리지 않고 비동기로 처리하는 것으로 확인

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com || jm921106@gmail.com

github :: https://github.com/moonscoding
