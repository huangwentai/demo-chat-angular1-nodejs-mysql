

var express = require('express');
var app = express();
var fs = require("fs");


var multer  = require('multer');

var db = require('./db');
client=new db();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.use(express.static('view')); 

app.get('/', function (req, res) {
   res.sendFile(__dirname + "/view/" + "index.html");
})


app.use(require('./register'));
app.use(require('./login'));
app.use(require('./addFriend'));



var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

new require('./socket')(server);