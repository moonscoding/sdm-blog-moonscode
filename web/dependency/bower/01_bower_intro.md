# BOWER

#### Bower 학습순서

Moon's Coding - 20yy.mm.dd

<hr>

#### 01. Bower란,

Web Front 컴포넌트 의존성 관리 도구

#### 02. Bower 명령어

```linux

  # bower 명령어 전역 설정
  $ npm install -g bower

  # bower component 설치
  $ bower install jquery
  $ bower install jquery#1.9.1

  # bower.json 저장 설치
  $ bower install jquery --save
  $ bower install jquery --save-dev

  # bower component 삭제
  $ bower uninstall jquery

  # bower list checkup
  $ bower list # bower ls

  # 컴포넌트 존재 여부 검색
  $ bower search d3   # 모두 검색
  $ bower lookup d3   # 일치 검색

  # 버전 확인
  $ bower info d3   

```

#### 03. bower.jso

```linux

  # bower.json 생성
  $ bower init

```

- name : (필수) 패키지 명
- version : 버전 정보
- main : 패키지의 엔드포인트
- ignore : 패지키를 설치할 때 bower가 무시할 파일 목록
- dependencies : 프로덕션에서 사용할 패키지 의존성 정보
- devDependencies : 개발용 패키지 의존성 정보

```json
{
  "dependencies": {
    "jquery": "~2.0.0"
  },
  "devDependencies": {
    "qunit": "~1.11.0"
  }
}
```

#### 04. .bowerrc

bower에 전체적으로 적용할 설정을 사용자의 홈디렉토리에

.bowerrc 파일을 만들어서 지정할 수 있다.

.bowerrc파일은 다음과 같은 JSON 형식이다.

```json
{
  "directory": "bower_components",
  "endpoint": "https://bower.mycompany.com",
  "json": "bower.json",
  "searchpath": [
    "https://bower.herokuapp.com"
  ],
  "shorthand_resolver": "git://example.com/{{{ organization }}}/{{{ package }}}.git"
}
```
- directory : 컴포넌트를 설치할 기본 디렉토리
- endpoint : 커스텀 등록 엔드 포인트
- json : 의존성을 처리할 때, 사용할 기본 JSON 파일
- searchpath : 추가적으로 검색할 읽기 전용 Bower 저장소
- shorthand_resolver : 간단하게 지정할 패키지명의 템플릿

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 : https://bower.io/**
