a# MOBGO DB 기본

#### MONGO DB의 기본

<div class="pull-right"> 문스코딩 - 2017.12.19 </div>

---

## 01. 설치

### 01. mac

01. Tar 이용한 설치 방법.

장단점
- 설치 삭제 용이
- 버전 관리 불편

```
    tar -zxvf mongodb-osx-ssl-x86_64-3.6.0.tgz
```

02. homebrew를 사용해 설치 방법.

장단점
- 버전 관리 편함
- 설치 위치 파악 어려움
- 꼬일 가능성이 있음

[1] homebrew 설치

    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

[2] mongo db 확인 후 설치

    $ brew info mongodb
    $ brew install mongodb

[3] 추가 설정

서비스 설치

    $ brew tap homebrew/services    // 서비스 설치
    $ brew services start mongodb   // 서비스 실행
    $ brew services list            // 서비스 리스트 확인

버전 확인

    $ mongod --version

### 02. window

.exe 설치

### 03. linux

[1] yum 이용

    sudo vi /etc/yum.repos.d/mongodb-org.repo

[2] mongodb-org.repo 파일내용 (버전 3.4)

> [mongodb-org-**3.4**]
> name=MongoDB Repository
> baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/**3.4**/x86_64/
> gpgcheck=1
> enabled=1
> gpgkey=https://www.mongodb.org/static/pgp/server-**3.4**.asc

[3] yum repolist 확인

    yum repolist

[4] yum install

    sudo yum install mongodb-org
    sudo yum remove mongodb-org

there are two Is this ok [y/N]: prompts. The first one permits the installation of the MongoDB packages and the second one imports a GPG key. The publisher of MongoDB signs their software and yum uses a key to confirm the integrity of the downloaded packages. At each prompt, type Y and then press the ENTER key.

[5] mongo 서버 실행

    sudo systemctl start mongod

    sudo systemctl reload mongod

    sudo systemctl stop mongod

서버 실행 파일 처리

    sudo vi /lib/systemd/system/mongod.service

```

[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target
Documentation=https://docs.mongodb.org/manual

[Service]
User=mongod
Group=mongod
Environment="OPTIONS=-f /etc/mongod.conf"                   # 환경변수 경로 처리
ExecStart=/usr/bin/mongod $OPTIONS                          #
ExecStartPre=/usr/bin/mkdir -p /var/run/mongodb             #
ExecStartPre=/usr/bin/chown mongod:mongod /var/run/mongodb  #
ExecStartPre=/usr/bin/chmod 0755 /var/run/mongodb           #
PermissionsStartOnly=true                                   #
PIDFile=/var/run/mongodb/mongod.pid
# file size
LimitFSIZE=infinity
# cpu time
LimitCPU=infinity
# virtual memory size
LimitAS=infinity
# open files
LimitNOFILE=64000
# processes/threads
LimitNPROC=64000
# locked memory
LimitMEMLOCK=infinity
# total threads (user+kernel)
TasksMax=infinity
TasksAccounting=false
# Recommended limits for for mongod as specified in
# http://docs.mongodb.org/manual/reference/ulimit/#recommended-settings

[Install]
WantedBy=multi-user.target
```

Mongo 환경 변수 파일 처리

    sudo vi /etc/mongod.conf

```

# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# where to write logging data.
systemLog:
  destination: file                     #
  logAppend: true                       #
  path: /var/log/mongodb/mongod.log     # 로그 경로

# Where and how to store data.
storage:
  dbPath: /var/lib/mongo                # 저장 경로
  journal:l
    enabled: true
#  engine:
#  mmapv1:
#  wiredTiger:

# how the process runs
processManagement:
  fork: true                                # fork and run in background
  pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile
  timeZoneInfo: /usr/share/zoneinfo         # timezone 설정

# network interfaces
net:
    # 포트 기본 : 27017
    port: 27017        
    # 접근을 허용하는 특정 IP
    # default 127.0.0.1
    # all open 0.0.0.0
    bindIp: 127.0.0.1, 127.0.0.1

#security:

#operationProfiling:

# ReplicaSet 설정
replication:
    replSetName: 'rs'                    # ReplicaSet 이름 설정
   # oplogSizeMB: <int>                   #
   # secondaryIndexPrefetch: <string>     #
   # enableMajorityReadConcern: <boolean> ## Deprecated in 3.6

#sharding:

## Enterprise-Only Options

#auditLog:

#snmp:

```

[6] 로그 확인

    sudo tail /var/log/mongodb/mongod.log

[7] mongo shell 실행

    mongo

[8] 설치된 파일 위치 검색

    rpm -qal | grep mongo


## 02. 버전 관리

01. mac

homebrew를 이용한 버전관리

## 03. 삭제

01. mac

homebrew 삭제 처리

02. window

.exe uninstall

03. linux (yum 삭제)

```
    sudo service stop mongod
    sudo yum erase $(rpm -qa | grep mongodb-org)
    sudo rm -r /var/log/mongodb
    sudo rm -r /var/lib/mongo
```



---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1](https://docs.mongodb.com/manual/reference/configuration-options/)**

**참조 : [링크2 : 몽고디비 버전별 다운로드 센터](https://www.mongodb.org/dl/osx)**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
