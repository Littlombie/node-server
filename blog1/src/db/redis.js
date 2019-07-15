const redis = require('redis');
const {
    REDIS_CONF
} = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', err => {
    console.error(err);
});

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print); // redis.print 
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get('name', (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            // recolve(val);
            // 如果返回的值为空，那就输出空
            if (val == null) {
                resolve(null);
                return
            }
            // 如果是json， 返回json对象，不是就直接返回
            try {
                JSON.parse(val);
            } catch (ex) {
                resolve(val);
            }

            // redisClient.quit();
        })
    })
    return promise;
}


module.exports = {
    set,
    get
}