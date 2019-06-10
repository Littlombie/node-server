const mysql = require('mysql');

// 创建链接对象
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '25802580',
    port: '3306',
    database: 'myblog'
});

// 开始连接
con.connect();

// 执行sql语句

const sql = 'select * from users;';
con.query(sql, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});

con.end();