const env = process.env.NODE_DEV; //环境参数


let MYSQL_CONF;
// 测试环境的MySQL配置
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost', // 域
        user: 'root', //MySQL 用户名
        password: '25802580', // MySQL 密码
        port: '3306', // 端口
        database: 'myblog' // 数据库名称
    }
}

// 生产环境的MySQL配置
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost', 
        user: 'root', 
        password: '25802580', 
        port: '3306', 
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}