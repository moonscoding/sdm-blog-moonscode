```js
axios.get('/foo')
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.status); // http status
      console.log(error.response.data); // message
      console.log(error.response.headers);
    }
  });
```
