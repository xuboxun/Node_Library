var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
	res.sendFile(__viewPath + 'index.html');
});

module.exports = router;