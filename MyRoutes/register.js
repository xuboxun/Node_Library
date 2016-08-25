var express = require('express');
var fs = require('fs');
var querystring = require('querystring');
var pool = require('../dbConnect.js');
var router = express.Router();

router.get('/',function(req,res) {
	// res.sendFile(__viewPath + 'register.html');
	res.render('register');
});

router.post('/',function(req,res) {
	console.log('sa');
	req.on('data',function(data){
		var input = querystring.parse(data.toString());
		console.log(input);
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
						console.log("insert error");
					}else{
						if(result == null || result == "" || result == undefined) {
							flag = "fail";
						}else{
							flag = "success";
						}
					}
					connection.release();
					console.log(flag);
					res.send(flag);
				})
			}
		})
	})
})

module.exports = router;