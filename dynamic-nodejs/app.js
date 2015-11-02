//Problem: We need a simple way to look at users badge count and Javascript points from a web browser

//Solution: Use node js to perform the profile lookups and serve our templates via HTTP


var http = require('http');
var router = require('./router');

//Create a webserver
http.createServer(function(req, res) {
  router.home(req, res);
  router.user(req, res);
}).listen(1337, '127.0.0.1');
console.log('Server running at localhost:1337');


