var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
	var items = [{title:"文章一"},{title:"文章二"}];
	// res.sendFile(__viewPath + 'index.ejs');
	res.render('index',{
		title:'文章列表',
		items:items 
	})
});

module.exports = router;