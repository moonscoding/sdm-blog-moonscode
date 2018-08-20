# Javascript Library
## Axios
<div class="pull-right">  업데이트 :: 2018.04.dd </div><br>

---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
<!-- code_chunk_output -->

* [Javascript Library](#javascript-library)
	* [Axios](#axios)
		* [01. 준비](#01-준비)
		* [02. 사용 (get)](#02-사용-get)
		* [03. 사용 (post)](#03-사용-post)
		* [04. 동시 요청](#04-동시-요청)
		* [04. 리스트](#04-리스트)

<!-- /code_chunk_output -->

### 01. 준비

```
bower install axios

npm install axios
```

```html
<!-- CDN -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- PUBLIC -->
<script src="/public/bower_components/axios/dist/axios.min.js"></script>    {{!Axios}}
```

### 02. 사용 (get)

query params를 이용한 axios

```js
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

body params를 이용한 axios

```js
// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

await를 이용한 axios

```js
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```



### 03. 사용 (post)

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### 04. 동시 요청

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 두 요청이 완료 된다면
  }));
```


### 04. 리스트

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.options(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

---

**Created by SDM**

==작성자 정보==

e-mail :: jm921106@naver.com

github :: https://github.com/jm921106

==도움을 받은글==

[링크1 :: https://github.com/axios/axios](https://github.com/axios/axios)

[링크2 :: ]()
