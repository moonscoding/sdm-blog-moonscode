# TITLE (제목을 작성해 주세요. 대문자 작성)

#### 부제목을 작성해 주세요.

Moon's Coding - 20yy.mm.dd

<hr>

#### 01. php 설치

```linux

  # homebrew install
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

  # brew version check up
  brew --version

  # php 탭 추가
  brew tap homebrew/php
  brew search php70

  # php 설치 및 확인
  brew install homebrew/php/php70
  php --version

```

#### 02. mysql 설치

https://github.com/helloheesu/SecretlyGreatly/wiki/%EB%A7%A5%EC%97%90%EC%84%9C-mysql-%EC%84%A4%EC%B9%98-%ED%9B%84-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

```linux
  # mariadb crush ("brew unlink mariadb")후 실행
  brew install mysql

  # mysql version checkup
  mysql --version

  # mysql 서버 실행
  mysql.server start

  # mysql 설치 (따라할것 : 링크참조)
  mysql_secure_insallation

  https://github.com/helloheesu/SecretlyGreatly/wiki/%EB%A7%A5%EC%97%90%EC%84%9C-mysql-%EC%84%A4%EC%B9%98-%ED%9B%84-%ED%99%98%EA%B2%BD%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0

  # service 등록
  brew services homebrew/services

  # mysql 실행
  brew services start mysql

  # mysql 종료
  brew services stop mysql

  # mysql 접속
  mysql -u root

```

#### 03. mysql 삭제

https://gist.github.com/vitorbritto/0555879fe4414d18569d

```linux

brew remove mysql
brew cleanup

sudo rm /usr/local/mysql
sudo rm -rf /usr/local/var/mysql
sudo rm -rf /usr/local/mysql*
sudo rm ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*

launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist

subl /etc/hostconfig`
> Remove the line MYSQLCOM=-YES-

rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*

```

#### 03. 컴포저 (compser) 설치

```linux

  # composer install
  brew install homebrew/php/composer

  # composer checkup
  composer --version

  # php 화장 모듈 확인
  php -m | grep 'openssl\|pdo\|mbstring\|tokenizer'

```

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 : **
