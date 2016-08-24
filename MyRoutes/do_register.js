//do_register

app.post('/do_register.js',function(req,res) {
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
					res.send(result.insertId);
				})
			}
		})
	})
})