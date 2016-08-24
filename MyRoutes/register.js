var express = require('express');
var fs = require('fs');
var pool = require('../dbConnect.js');
var router = express.Router();

router.get('/',function(req,res) {
	res.sendFile(__viewPath + 'register.html');
});

router.post('/',function(req,res) {
	req.on('data',function(data){
		var input = querystring.parse(data.toString());
		pool.getConnection(function(err,connection) {
			if(err) {
				console.log("error");
			}else{
				console.log('connect success');
				connection.query('insert into user set ?',{
					username : input.username,
					password : input.password,
					sex      : input.sex
				},function(err,result){
					if(err)  {
						console.log("insert error");
					}else{
						console.log("insert success");
					}
					connection.release();
					res.redirect('/login.html');
				})
			}
		})
	})
})

module.exports = router;