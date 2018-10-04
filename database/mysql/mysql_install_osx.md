
<div class="pull-right">  업데이트 :: 2018.10.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [01. 설치 (homebrew)](#01-설치-homebrew)
* [02. 설치 (web)](#02-설치-web)
* [03. 임시패스워드변경](#03-임시패스워드변경)

<!-- /code_chunk_output -->

### 01. 설치 (homebrew)

```
mysql 설치 : $ brew install mysql
mysql 시작 : $ mysql.server start
root 비밀번호 설정 : $ mysql_secure_installation
```

### 02. 설치 (web)

- https://dev.mysql.com/downloads/mysql/ 다음 링크에서 MySQL 설치 및 실행

- 다음명령어실행

```
> cd /usr/local/mysql/bin # 버전마다 경로가 다를 수 있음
> ./mysql -u root -p
```

- https://dev.mysql.com/downloads/workbench/ 다음 링크에서 workbench 설치 및 실행

### 03. 임시패스워드변경

```java
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'admin1234';
mysql> flush privileges;
```

- 'admin1234'로 패스워드 변경
- 패스워드 변경후 변경된 패스워드로 MySQL 재실행

---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
