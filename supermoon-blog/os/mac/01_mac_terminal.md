# MAC TERMINAL CUSTOM

#### 내 MAC OS의 터미널 업데이트 하기

Moon's Coding - 20yy.mm.dd

<hr>

#### 01. on my zsh 설치

```linux
  # [방법1]
  $ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

  # [방법2]
  $ sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

  # [방법3]
  brew update
  brew install zsh

  # zsh checkup
  zsh --version
```

#### 02. iterm 설치

https://www.iterm2.com/ (Download)

#### 03. 환경변수 설정

```linux

  # zsh 환경 설정으로 진입
  vi ~/.zshrc

  # 상단에 기존에 사용하고 있던 bash_profile 환경변수 추가
  # ==================[CUSTOM]====================
  # bash_profile  
  [[ -e ~/.bash_profile ]] && emulate sh -c 'source ~/.bash_profile'
  # ==================[CUSTOM]====================

  # 원하는 테마 선택 ('random'가능)
  ZSH_THEME="random"

```

#### 04. alias 등록하기

```linux

  # zsh 환경 설정으로 진입
  vi ~/.zshrc

  # my alias (최하단)
  alias ns = "npm start"

  # 저장 후에 다음 명령어를 실행해야 alias 사용이 가능함
  source ~/.zshrc  
```

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 : https://nolboo.kim/blog/2015/08/21/oh-my-zsh/**
