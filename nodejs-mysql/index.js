const mysql = require('mysql');

// 创建连接对象
const con = mysql.createConnection({
    host: 'localhost', // 域
    user: 'root', //MySQL 用户名
    password: '25802580', // MySQL 密码
    port: '3306', // 端口
    database: 'myblog' // 数据库名称
});

// 开始连接
con.connect();

// 执行sql语句

// const sql = 'select * from users;';  //查询
// const sql = `update users set realname="李四2" where username='lisi';`; // 更新
const sql =  "insert into users(username, `password`, realname) values('wangwu', '123', '王五');" // 插入用户

// 使用con.query 查询
con.query(sql, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});

con.end();