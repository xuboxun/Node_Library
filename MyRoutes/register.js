var express = require('express');
var querystring = require('querystring');
var pool = require('../dbConnect.js');
var router = express.Router();

//注册页面
router.get('/',function(req,res) {
	// res.sendFile(__viewPath + 'register.html');
	res.render('register');
});

//查询用户名是否存在 find_username
router.post('/find_username',function(req,res) {
	console.log("find_user");
	req.on('data',function(data) {
		var username = data.toString();
		console.log(username);
		pool.getConnection(function(err,connection) {
			if(err) {
				console.log("connect mysql error");
			}else {
				var sql = 'select id from user where username = "' + username +'"';
				connection.query(sql,function(err,result) {
					if(err) {
						console.log(err);
					}else {
						//用户名未注册
						if(result.length == 0){
							res.send("yes");
						}else{
							res.send("no");
						}
					}
				})
			}
			connection.release();
		})
	})
})

//执行注册操作 do_register
router.post('/do_register',function(req,res) {
	req.on('data',function(data){
		var input = JSON.parse(data.toString());
		pool.getConnection(function(err,connection) {
			if(err) {
				console.log("error");
			}else{
				console.log('connect success');
				connection.query('insert into user set ?',{
					username : input.username,
					password : input.password,
					email    : input.email,
					major    : input.major
				},function(err,result){
					var flag = "";
					if(err)  {
						flag = "fail";
						console.log("insert error");
					}else{
						if(result == null || result == "" || result == undefined) {
							flag = "fail";
						}else{
							flag = "success";
						}
					}
					connection.release();
					res.send(flag);
				})
			}
		})
	})
})

module.exports = router;