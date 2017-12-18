# PHP INTRO

#### PHP를 학습해봅시다.

Moon's Coding - 2011.11.08

<hr>

#### 01. install

##### Mac install

MacOS에는 기본적으로 아파치(apache)와 php가 설치되어 있음.
활성화만 해주고 필요에 따라 설정해 줘야 한다.

```linux

  # 아파치 설치 및 버전 확인
  apachectl -v

  # php 설치 및 버전 확인
  php -v

  # 아파치 서버 실행
  sudo apachectl start

```

웹 브라우저에 **"localhost" or "ip주소"** 를 입력해주면 It works!라는 웹페이지가 동작
기본 DocumentRoot폴더는 /Library/WebServer/Documents이며
이 위치에 있는 **"index.html.en"** 이 동작


```linux

  # 기본 DocumentRoot 폴더
  cd /Library/WebServer/Documents

  # [ 방법 1 ] httpd.conf 설정 파일 열기
  vi /private/etc/apache2/httpd.conf

  ===[File] httpd.conf===
    ~중략~

    # 이 부분을 수정
    DocumentRoot "/Library/WebServer/Documents"
    <Directory "/Library/WebServer/Documents">

    ~중략~
  ===[File] httpd.conf===

  # [ 방법 2 ] httpd-userdir.conf 수정
  vi /private/etc/apache2/extra/httpd-userdir.conf

  ===[File] httpd-userdir.conf===
    ~중략~

    # (line.3) 해당 모듈들의 httpd.conf 내부 주석 제거
    # Required module: mod_authz_core, mod_authz_host, mod_userdir

    ~중략~

    # (line.16) 주석제거
    Include /private/etc/apache2/users/*.conf

    ~중략~
  ===[File] httpd-userdir.conf===

  ===[File] httpd.conf===
    (~중략~)

    # (line.상단) 처리되있음
    LoadModule authz_host_module libexec/apache2/mod_authz_host.so
    (~중략~)

    # (line.상단) 처리되있음
    LoadModule authz_core_module libexec/apache2/mod_authz_core.so
    (~중략~)

    # (line.173) 주석제거
    LoadModule userdir_module libexec/apache2/mod_userdir.so
    (~중략~)

    # (line.180) 주석제거 php 연동
    LoadModule php7_module libexec/apache2/libphp7.so
    (~중략~)

    # (line.512) 주석제거
    Include /private/etc/apache2/extra/httpd-userdir.conf

    (~중략~)
  ===[File] httpd.conf===

  # user.conf 생성
  cd /private/etc/apache2/httpd.conf
  cp Guest.conf UserName.conf
  vi UserName.conf

  ===[File] UserName.conf===

  # /Users/이름변경/Sites/
  <Directory "/Users/UserName/Sites/">
          Options Indexes MultiViews
          AllowOverride None
          Require all granted
  </Directory>

  ===[File] UserName.conf===

```

/사용자/UserName/ 에 **Sites** 폴더 생성

/사용자/UserName/Sites 에 **test.php** 파일 생성

test.php
```php
  <?php
    phpinfo();
  ?>
```

##### linux install

```

```

#### 02. GUI tool

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 :**
