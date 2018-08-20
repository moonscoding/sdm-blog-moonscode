# Restful
## Restful Controller를 Render부분에 사용하는 법
<div class="pull-right">  업데이트 :: 2018.05.04 </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Restful](#restful)
	* [Restful Controller를 Render부분에 사용하는 법](#restful-controller를-render부분에-사용하는-법)
		* [01. Route부분](#01-route부분)
		* [02. Controller 부분](#02-controller-부분)

<!-- /code_chunk_output -->

### 01. Route부분

```js
router.route('/user/:name')
    .get(function(req, res) {
      res.send(userController.getUserByName());
    });
    .post(function(req, res) {
      res.send(userController.createUserByName());
    });
```

### 02. Controller 부분

> 여기서 말하고 싶은 것, Restful을 위한 코드를 페이지를 Render하는데도 사용하고 싶을 수도 있습니다.
> 그렇다면 Restful의 Controller는 res.send()를 해야하는 것이 아니라 결과 데이터를 단순히 리턴해주면 됩니다.

- 실제 [req, res]를 모두 사용해야 하는가 ???
- Render에서 사용하려면 [req, res]가 없을 수도 있습니다.

```js
export.modules.getUserByName = function(param1, param2) {

  // Todo data 조회
  return resultData;
}
```

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: ]()

[링크2 :: ]()
