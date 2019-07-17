const querystring = require('querystring');
const {
    get,
    set
} = require('./src/db/redis');
const {
    access
} = require('./src/utils/log');
const hanleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 获取cookie过期时间
const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);

    console.log('d.toGMTString() is', d.toGMTString());
    return d.toGMTString(); //获取当前时间的gmt格式
}

// session数据
const SESSION_DATA = {};

// 用于处理post data 
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') { //不是post请求
            resolve({})
            return;
        }
        if (req.headers['content-type'] !== 'application/json') { //不是json格式
            resolve({})
            return;
        }

        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 记录access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);

    res.setHeader('Content-type', 'application/json'); // 设置返回格式 JSON
    res.setHeader("Access-Control-Allow-Origin", "*"); // 设置允许跨域    
    res.setHeader("Access-control-Allow-Headers", "xCors"); // 允许请求头中携带 xCors
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS,HEAD,FETCH"); // 设置允许声明的方法访问

    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);

    //解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        const arr = item.split('=');
        const key = arr[0].trim(); //.replace(' ',''); //不知道为什么返回的cookie中键前边有空格 使用.trim() 去掉空格
        const val = arr[1].trim();
        req.cookie[key] = val
    });
    // console.log('req.cookie is', req.cookie);

    // 解析session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
        
    }
    req.session = SESSION_DATA[userId];

    getPostData(req).then(postData => {
        req.body = postData;

        // 处理blog路由

        // const blogData = hanleBlogRouter(req, res);
        // if (blogData) {
        //     res.end(
        //         JSON.stringify(blogData)
        //     );
        //     return;
        // }

        const blogResult = hanleBlogRouter(req, res);
        if (blogResult) { // 如果又返回值 就then 输出
            blogResult.then(blogData => {
                // 生成cookie
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(
                    JSON.stringify(blogData)
                );
            })
            return;
        }




        // 处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                // 生成cookie
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(
                    JSON.stringify(userData)
                );
            })
            return;
        }

        // 未命中路由 返回路由
        res.writeHead(404, {
            'Content-type': 'text/plain'
        });
        res.write('404 Not Found \n');
        res.end();
    });


};

module.exports = serverHandle;

// rocess.env.NODE_ENV