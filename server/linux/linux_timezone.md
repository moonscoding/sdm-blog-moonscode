# LINUX - 배워봅시다.

#### Liinux - timezone에 대해서 학습해 봅시다..

<div class="pull-right"> 문스코딩 - 2018.02.05 </div>

---

**용어정리**
```
    timezone :: 서버의 시간관련 설정값
```

#### 01. timezone 이란

timezone이란 리눅스 서버의 시간을 설정하는 값입니다.
timezone을 설정하지 않으면 Server의 시간과 Clinet 의 시간이 맞지 않아서
올바르지 않은 정보를 가져올 수 도 있습니다.

#### 02. timezone을 설정하는 법

```liuux
    $ mv /etc/localtime /etc/locametime_org
    $ ln -s /usr/share/zoneinfo/Asia/Seoul  /etc/localtime
```

위의 과정을 완료하였다면 localtime이 심볼릭 링크로 Seoul의 Timezone에 연결되어 있기 때문에
한국 표준시로 변경된 것을 확인할 수 있습니다.

추가로 변경하고 싶은 표준시에 대한 파일들은
/usr/share/zoneinfo아래에 지역별로 찾아볼 수 있습니다.

#### 03 timezone 확인하기

timezone을 확인하는 방법은 간단합니다.

```linux
    $ date              # 시간을 확인할 수 있습니다.
    $ timedatectl       # timezone 셋팅값을 확인할 수 있습니다.
    $ timedatectl | grep “Time zone”
    $ cat /etc/timezone
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

[링크1 :: ]()

[링크2 :: ]()


Copyright (c) 2017 Copyright Holder All Rights Reserved.
