
<div class="pull-right">  업데이트 :: 2018.10.01 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [계정설정](#계정설정)
* [계정관리](#계정관리)
* [샘플데이터](#샘플데이터)

<!-- /code_chunk_output -->

### 계정설정

```
> mysql -u root -p;
> enter password:

mysql> use mysql;
mysql> update USER set authentication_string=password('1234') where user='root';
mysql> flush privileges;
mysql> alter user 'root'@'localhost' identified by '1234';
mysql> exit;
```

### 계정관리

```

```

### 샘플데이터

```
> cd ~/Downloads/MySQl/dump
> mysql -u root -p
> enter password :
mysql> source employees.sql;
mysql> show database;
```


---

**Created by MoonsCoding**

e-mail :: jm921106@gmail.com
