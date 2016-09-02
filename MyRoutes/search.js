var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var pool = require('../dbConnect.js');

router.get('/',function(req,res) {
	res.render('search')
});
router.post('/search-result',function(req,res) {
	req.on('data',function(data) {
		var input = querystring.parse(data.toString());
		pool.getConnection(function(err,connection) {
			if(err) {
				console.log('connect error');
			}else {
				console.log('connect success');
				var condition = "";
				switch (input.condition) {
					case "1" :
						condition = "bookname";
						break;
					case "2" :
						condition = "type";
						break;
					case "3" :
						condition = "author";
						break;
					case "4" :
						condition = "belong";
						break;
				}
				var sql = "";
				if(condition != "belong") {
					sql = "select book.id,book.bookname,book.author,book.type,book.img,book.status,"+
						  "user.nickname belong from book inner join user on book.belong = user.id where "+
						   condition + " = '" + input.content + "'";
				}else {
					sql = "select book.id,book.bookname,book.author,book.type,book.img,book.status,"+
						  "user.nickname belong from book inner join user on book.belong = user.id where " +
						  "user.username = '" + input.content + "' or user.nickname = '" + input.content + "'";
				}
				console.log(sql);
				connection.query(sql,function(err,result) {
					if(err) {
						console.log('query error');
					} else {
						console.log(result);
						res.render('search-result',{
							books : result
						});
					}
				});
			};
			connection.release();
		});
	});
});

module.exports = router;
