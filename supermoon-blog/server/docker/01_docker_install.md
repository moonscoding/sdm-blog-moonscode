# DOCKER INSTALL

#### docker를 install 해봅시다.

<div class="pull-right"> 문스코딩 - 2018.01.09 </div>

---

#### 01. install

**utuntu**
```
    $ sudo wget -q0- https://get.docker.io/ | sh
    $ sudo apt-get update
    $ sudo ln -sf \
        /usr/bin/docker.io /usr/local/bin/docker
```

**centos**
```
$ sudo yum remove docker \
                  docker-common \
                  docker-selinux \
                  docker-engine
```

```
$ sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
```

```
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```

```
$ sudo yum-config-manager --enable docker-ce-edge
```

```
$ sudo yum-config-manager --enable docker-ce-test
```

```
$ sudo yum-config-manager --disable docker-ce-edge
```

```
$ sudo yum install docker-ce
```

```
$ yum list docker-ce --showduplicates | sort -r
```

```
$ sudo yum install <FULLY-QUALIFIED-PACKAGE-NAME>
```

```
$ sudo systemctl start docker
```

```
$ sudo docker run hello-world   
```

---

**Created by SuperMoon**

**출처 : [SuperMoon's Git Blog](https://github.com/jm921106)**

**참조 : [링크1]()**

Copyright (c) 2017 Copyright Holder All Rights Reserved.
