
var express = require("express");
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
	res.sendFile(__dirname + "/public/index.html");
});

app.all('*', function(req, res){
	res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(port);

console.log(' => App is running on Port:' + port + ' ... ');