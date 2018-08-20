# GIT
## 특이 명령어 정리
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [GIT](#git)
	* [특이 명령어 정리](#특이-명령어-정리)
		* [01. 명령어 정리 (잘몰랐던 명령어 정리)](#01-명령어-정리-잘몰랐던-명령어-정리)

<!-- /code_chunk_output -->

### 01. 명령어 정리 (잘몰랐던 명령어 정리)

- git checkout --theirs package-lock.json
  - 해당 파일만 뒤로 돌리기

- git cherry-pick hash_code
  - 해당 커밋 받아오기

- git clean -f
	- 추적하지 않는 모든 파일을 지울 수 있습니다. (주의! 작업중인 파일(아직 커밋되지 않은)을 모두 지울 수 있습니다.)

- git clean -fd
	- 추적하기 않는 모든 파일 & 폴더를 지울 수 있습니다. (주의! 작업중인 파일(아직 커밋되지 않은)을 모두 지울 수 있습니다.)

- git clean -fd --dry-run
	- 지워질 파일을 미리 확인할 수 있습니다.


---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
