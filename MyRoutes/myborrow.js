var express = require('express');
var router = express.Router();
var pool = require('../dbConnect.js');

router.get('/',function(req,res) {
	pool.getConnection(function(err,connection) {
		if(err) {

		}else {
			if(!req.session.user) {
				console.log('not login');
				res.render('myborrow',{
					login : false
				});
			}else {
				var sql = "select book.id bookid,book.bookname,book.author,book.type,book.img,book.status,"+
						  "user.nickname belong,borrow.userid borrowuser,borrow.outime,borrow.backtime,"+
						  "borrow.isback from borrow inner join user on borrow.userid = user.id "+
						  "inner join book on book.id = borrow.bookid"+
						  " where borrow.userid = " + req.session.user.id;
				connection.query(sql,function(err,result) {
					if(err) {

					}else {
						res.render('myborrow',{
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
