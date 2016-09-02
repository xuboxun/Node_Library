var express = require('express');
var router = express.Router();
var pool = require('../dbConnect.js');

router.get('/',function(req,res) {
	pool.getConnection(function(err,connection) {
		if(err) {
			console.log('connect err');
		}else {
			if(!req.session.user) {
				console.log('not login');
				res.render('myenjoy',{
					login : false
				});
			}else {
				var sql = "select * from book where belong = " + req.session.user.id;
				connection.query(sql,function(err,result) {
					if(err) {

					}else {
						res.render('myenjoy',{
							books : result,
							login : true
						});
					}
				});
			}
		}
		connection.release();
	});
});

module.exports = router;
