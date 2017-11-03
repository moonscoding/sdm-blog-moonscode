# VUE - INTRO

#### Simple Web Framework VUE JS 시작하기.

Moon's Coding - 2017.11.02

<hr>

#### 1. Vue 소개

가장 심플한 Web Framework Vue JS를 배워보자.

https://kr.vuejs.org/v2/guide/index.html 공식 홈페이지에 한국어정리가 굉장히 심플하게 되있는 편

#### 2. Vue 설치

개발용과 배포용 스크립트를 따로 지원하고 있음

1. CDN 설치 방법 (가장 최신 버전 지원)
```html
  <script src="https://unpkg.com/vue"></script>
```

2. Install 설치 방법 (안정적 운용 가능)
```linux
  $ npm install vue     # [case1]
  $  bower install vue  # [case2]
```

#### 3. CLI

CLI란 간단한 명령어로 프로젝트 스캐폴딩을 생성, 실행, 빌드 할 수 있고,

구성 요소를 선벽적으로 추가 할 수 있는 [cmd-line-interface].

```lunux

  $ npm install --global vue-cli    # vue-cli 설치

  $ vue init webpack my-project     # "webpack" 템플릿을 이용해서 새 프로젝트 생성

  $ cd my-project                   # 의존성을 설치하고 실행하세요!

  $ npm install

  $ npm run dev
```

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조 : https://vuejs.org/**
