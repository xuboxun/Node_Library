var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var pool = require('../dbConnect.js');

//login.html
router.get('/',function(req,res) {
	// res.sendFile(__viewPath + 'login.html')
	res.render('login');
});

//do_login
router.post('/',function(req,res) {
	req.on('data',function(data) {
		var input = JSON.parse(data.toString());
		pool.getConnection(function(err,connection) {
			if(err) {
				console.log('connect error');
			}else {
				console.log('connect success');
				var query = 'select id from user where username="'+input.username+'" and password="'+input.password+'"';
				connection.query(query,function(err,result){
					var flag = "";
					if(err) {
						console.log("err");
						flag = "fail";
					}else{
						console.log(result);
						if(result == null || result == "" ||result == undefined) {
							// res.redirect('./login.html');
							flag = "fail";
						}else{
							// res.redirect('./index.html');
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