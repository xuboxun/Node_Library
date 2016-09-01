var express = require('express');
var router = express.Router();
var pool = require('../dbConnect.js');

router.get('/',function(req,res) {
	pool.getConnection(function(err,connection) {
		if(err) {
			console.log('connect error');
		}else {
			var sql = "select book.id,book.bookname,book.author,book.type,book.img,book.status,"+
					  "user.nickname belong from book inner join user on book.belong = user.id" +
					  " order by book.id desc";
			console.log(sql);
			connection.query(sql,function(err,result) {
				if(err) {
					console.log('query error');
				}else {
					console.log(result);
					res.render('books',{
						books : result
					});
				}
			});
		}
		connection.release();
	});
});

module.exports = router;
