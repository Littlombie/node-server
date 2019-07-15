const redis = require('redis');

// 创建客户端  连接端口和host
const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', err=> {
    console.log(err);
});


// 测试
redisClient.set('myname', 'zhangsan2', redis.print); // redis.print 
redisClient.get('myname', (err, val)=> {
    if(err) {
        console.erroe(err);
        return;
    }
    console.log(val);
    
    redisClient.quit();
});

// 运行测试 