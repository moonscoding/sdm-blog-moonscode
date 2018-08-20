# Gradle
## Build Tool
<div class="pull-right">  업데이트 :: 2018.05.29 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Gradle](#gradle)
	* [Build Tool](#build-tool)
		* [01. Gradle 어디에 쓰는 물건인고...](#01-gradle-어디에-쓰는-물건인고)
		* [02. Gradle 초기화](#02-gradle-초기화)
		* [03.](#03)

<!-- /code_chunk_output -->

### 01. Gradle 어디에 쓰는 물건인고...

### 02. Gradle 초기화

> gradle init

```
project/
    gradlew
    gradlew.bat
    gradle/wrapper/
        gradle-wrapper.jar
        gradle-wrapper.properties
    build.gradle
    settings.gradle
```

 - Gradle Wrapper
   - Gradle Wrapper는 이미 존재하는 프로젝트를 새로운 환경에서 설치할 때 별도의 설치나 설정과정없이 곧 바로 빌드 할 수 있게 하기 위함
 - gradlew
   - 유닉스용 실행 스크립트

> gradle build

> ./gradlew build

- gradlew.bat
  - 윈도우용 실행 배치 스크립트
- gradle/wrapper/gradle-wrapper.jar
  - wrapper파일
- build.gradle
  - 의존성이나 플러그인 설정등을 위한 스크립트 파일
- settings.gradle
  - 프로젝트를의 구성 정보를 기록하는 파일

### 03.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
