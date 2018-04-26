# BOWER REGIST

####  Bower 등록하기

Moon's Coding - 20yy.mm.dd

<hr>

#### 01. bower.json 생성

```linux

  # bower.josn 생성
  $ bower init

```

**sample bowr.json**

```json
{
  "name" : "example",
  "version" : "0,0,0",
  "authors" : [
    "LogiCong <logicong.gmail.com>"
  ],
  "license" : "MIT",
  "ignore" : [
    "**/*",
    "node_modules",
    "test"
  ]
}
```

#### 02. 등록하기

```linux
  bower register <컴포넌트이름> <git저장소주소>
```

#### 03. bower 컴포넌트 갱신

bower 저장소에 다시 올리는 것이 아니라, github 저장소를 관리해주면 됨

위에서 말한 것 처럼 github에서 바로 추출하기 때문에 배포파일과 배포하지 않을 파일을 관리 해주어야 한다.

이는 bower.json의 ignore 필드에 배열로 bower가 배포하지 않을 파일을 추가해주어야 한다.

#### 04. bower package 빌드 솔루션

1. minify
2. uglify
3. ignore 파일 정리

<hr>

**Created by SuperMoon**

**출처 : https://github.com/jm921106**

**참조1 :**
