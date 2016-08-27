var mysql = require('mysql');

var pool = mysql.createPool({
    host : 'localhost',
    port : 3306,
    database : 'node',
    user : 'root',
    password : ''
});

module.exports = pool;
