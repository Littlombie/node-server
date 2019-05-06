const querystring = require('querystring');
const hanleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 用于处理post data 
const getPostData = (req) => {
    const promise = new Promise ((resolve, reject) => {
        if (req.method !== 'POST') { //不是post请求
            resolve({})
            return;
        }
        if (req.headers['Content-type'] !== 'application/json') { //不是json格式
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
            resolve (
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {

    res.setHeader('Content-type', 'application/json'); // 设置返回格式 JSON
    res.setHeader("Access-Control-Allow-Origin", "*");  // 设置允许跨域    
    res.setHeader("Access-control-Allow-Headers", "xCors");    // 允许请求头中携带 xCors
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS,HEAD,FETCH"); // 设置允许声明的方法访问

    // 获取 path
    const url = req.url;
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);

    getPostData(req).then(postData => {
        req.body = postData;

        // 处理blog路由
        const blogData = hanleBlogRouter(req, res);
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            );
            return;
        }
        // 处理user路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            );
            return;
        }
        
        // 未命中路由 返回路由
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found \n');
        res.end();
    });

    
};

module.exports = serverHandle;

// rocess.env.NODE_ENV
