
console.log('hello server');

var http = require('http');
http.createServer(function (req, res) {
    console.log('hello req')
    console.log(req.headers.referer)
    console.log(req)
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
}).listen(1234);

// var express = require('express');
// var app = express();
//
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
//
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });
