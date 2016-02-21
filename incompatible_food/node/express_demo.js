var PORT = 8333;
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello world');
})

app.get("/foodName", function(req, res) {
    console.log(req.query);
    console.log(req.query.foodName);
    var ret = ["a", "b", "c", "d", "e", "f", "g"];
    res.jsonp({s: ret});
})

var server = app.listen(PORT, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
})