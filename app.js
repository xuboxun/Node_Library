var express = require('express');
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var pool = require('./dbConnect.js');

var app = express();

app.listen(3000,"localhost");

//配置应用程序
//根目录路径
global.__rootPath = __dirname;
//视图目录路径
global.__viewPath = __dirname + "/Views/";

/*
* Routes
*/
//index
var index = require('./MyRoutes/index.js');
app.use('/index.html', index);
app.use('/', index);
//login module
var login = require('./MyRoutes/login.js');
app.use('/login.html', login);
//register module
var register = require('./MyRoutes/register.js');
app.use('/register.html', register);
