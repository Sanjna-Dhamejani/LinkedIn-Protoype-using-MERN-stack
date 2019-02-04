var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'linkedindb-inst.cy8lpmafortb.us-east-2.rds.amazonaws.com',
//    host: 'localhost',
    user: 'root',
    //password: '',
    password: 'admin123',
    database: 'linkedin_database'
//    database: 'linkedin'
})

module.exports = pool;