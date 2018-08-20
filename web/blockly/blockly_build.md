# Blockly
## Blockly build를 분석해봅시다.
<div class="pull-right">  업데이트 :: 2018.04.26 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Blockly](#blockly)
	* [Blockly build를 분석해봅시다.](#blockly-build를-분석해봅시다)
		* [01. Blockly 구조](#01-blockly-구조)
		* [02. Build.py](#02-buildpy)
		* [03. compressed를 분리해봅시다.](#03-compressed를-분리해봅시다)

<!-- /code_chunk_output -->

다음 문서는 Blockly Core 파일중 빌드를 담당하는 build.py에 대해 분석한 글입니다.


### 01. Blockly 구조

![](https://imgur.com/E9BsBl6.png)

Blockly는 다음과 같은 구조를 가지고 있습니다.

**google/blockly** 안에 buildy.py 파일을 가지고 전체 코어파일들이 compressed가 되는 구조입니다.

**google/closure-library** 가 없다면 build에 실패하니 참고하세요.

### 02. Build.py

> python2 build.py

명령어를 실행하면 compressed가 진행됩니다.

알 수 없는 에러가 발생하는데 원인 불명입니다. compressed를 진행하는데 문제는 없습니다.

![](https://imgur.com/M9Z9SWD.png)

### 03. compressed를 분리해봅시다.

Blockly Build.py를 진행하면 총 10개의 compressed & uncompressed 파일이 추출됩니다.

- blockly_compressed.js
- blockly_uncompressed.js
- blockly_accessible_compressed.js
- blockly_accessible_uncompressed.js
- blocks_compressed.js
- javascript_compressed.js
- python_compressed.js
- php_compressed.js
- lua_compressed.js
- dart_compressed.js

모든 파일을 한번에 처리하려면 빌드 시간이 상당히 오래 걸리므로 빌드를 나눠서 진행하겠습니다.

Blockly가 업데이트 되면서 코드 내용이 수정될 수 있습니다.

```py
class Gen_compressed(threading.Thread):
  """Generate a JavaScript file that contains all of Blockly's core and all
  required parts of Closure, compiled together.
  Uses the Closure Compiler's online API.
  Runs in a separate thread.
  """
  def __init__(self, search_paths, bundles):
    threading.Thread.__init__(self)
    self.search_paths = search_paths
    self.bundles = bundles

  def run(self):
    if ('core' in self.bundles):
      self.gen_core()

    if ('accessible' in self.bundles):
      self.gen_accessible()

    if ('core' in self.bundles or 'accessible' in self.bundles):
      self.gen_blocks()

    if ('generators' in self.bundles):
      self.gen_generator("javascript")
      self.gen_generator("python")
      self.gen_generator("php")
      self.gen_generator("lua")
      self.gen_generator("dart")

```

Gen_compressed 클래스 내부에 run이라는 메서드를 살펴 보겠습니다.

run 메소드는 타입에 따라 compressd 를 진행하는 곳으로,

필요에 따라 원치않는 compressed를 주석 처리해주면 간편하게 처리할 수 있습니다.

```
build.py
build_blockly.py
build_blocks.py
build_accessible.py
build_generators.py
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106
