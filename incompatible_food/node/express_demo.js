var PORT = 8333;
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello world');
})

app.get("/foodName", function(req, res) {
    var strings = ["rad", "bla", "ska"]
    var n = Math.floor(Math.random() * strings.length)
	console.log("req.wd:" + res.jsonp(obj));

    res.send(strings[n])
})

var server = app.listen(PORT, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
})