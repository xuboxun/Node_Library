var express = require('express');
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var pool = require('./dbConnect.js');

//---------------------------------
var app = express();
app.listen(3000);
console.log("listen");
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
//设置页面目录
app.set('views','./Views');

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
