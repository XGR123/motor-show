var express = require('express');
var app = express();
var path = require('path');
var router = require('./routers');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
app.use(session({secret: 'Young'}))

router(app);

app.listen(80,function(){
	console.log("服务器已启动！！！")
})

