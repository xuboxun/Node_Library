var express = require('express');
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var pool = require('./dbConnect.js');
var partials = require('express-partials');
var session = require('express-session');
var cookieParser = require('cookie-parser');

//---------------------------------
var app = express();
app.listen(3000);
console.log('listen');
//----------------------------------

/*
* 配置应用程序
*/
//根目录路径
global.__rootPath = __dirname;
//视图目录路径
global.__viewPath = __dirname + "/Views/";
//页面请求样式或脚本时，在Public下搜索
var path = require('path');
app.use(express.static(path.join(__dirname, 'Public')));
//模板引擎
app.set('view engine','ejs');
//模板继承
app.use(partials());
//设置页面目录
app.set('views','./Views');
//session & cookie
app.use(cookieParser());
app.use(session({
	resave: true, // don't save session if unmodified
  	saveUninitialized: false, // don't create session until something stored
	secret: 'node'
}));

/*
* 路由规则
*/
//index
var index = require('./MyRoutes/index.js');
app.use('/index', index);
app.use('/', index);
//login module
var login = require('./MyRoutes/login.js');
app.use('/login', login);
//register module
var register = require('./MyRoutes/register.js');
app.use('/register', register);
//search module
var search = require('./MyRoutes/search.js');
app.use('/search', search);
//books module
var books = require('./MyRoutes/books.js');
app.use('/books', books);
//chat module
var chat = require('./MyRoutes/chat.js');
app.use('/chat', chat);
//myenjoy module
var myenjoy = require('./MyRoutes/myenjoy.js');
app.use('/myenjoy', myenjoy);
//myborrow module
var myborrow = require('./MyRoutes/myborrow.js');
app.use('/myborrow', myborrow);
//person module
var person = require('./MyRoutes/person.js');
app.use('/person', person);