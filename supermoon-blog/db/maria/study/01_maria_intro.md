# MARIA INTRO

#### MARIA DB 구축하기

Moon's Coding - 20yy.mm.dd

<hr>

#### 01. install 하기

MAC install

- 통합개발환경인 엑스코드(Xcode) 선 설치.
- 엑스코드(Xcode) 설치후에 홈브루(Homebrew)를 이용 : 홈브루, 오픈소스 패키지 관리 도구

```linux

  # 홈브루 설치
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  # 홈브루 업데이트
  brew update

  # 홈브루 이용 마리아 DB 설치
  brew install mariadb

  # 기본 관리 명령어
  mysql.server status # 상태확인
  mysql.server stop   # 정지
  mysql.server start  # 시작

  # 서버 부팅후 자동실행 방법 (mysql.server stop 명령어가 통하지 않음)
  ln -sfv /usr/local/opt/mariadb/*.plist ~/Library/LaunchAgents

  # 수동 실행 , 수동 종료 방법
  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mariadb.plist   # 실행하기
  launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.mariadb.plist # 종료하기

  # 데이터 베이스 접속 방법
  mysql         # 기본 접속
  mysql -uroot  # 루트 접속

```

Linux (centos) install

```linux

```

#### 02. GUI Tool

01. Data Grip (https://www.jetbrains.com/datagrip/)

```
  특징 :
```

02. Sequel Pro (http://www.sequelpro.com)

```
  특징 :
```

03. HeidiSql (https://www.heidisql.com)

```
  특징 :
```

04. DBeaver (https://dbeaver.jkiss.org/)

```
  특징 :
```

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 : https://cpuu.postype.com/post/24270(MacOS install 방법)**
