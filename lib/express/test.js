const express = require('./like-express.js');

// 本次 http 请求的实例
const app = express();

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url);
    next();
})

app.use((req, res, next) => {
    // 假设在处理cookie
    req.cookie = {
        userId: 'abc123'
    }
    next();
})

app.use('/api', (req, res, next) => {
    console.log('处理api路由...');
    next();
})

app.get('/api', (req, res, next) => {
    console.log('get api路由...');
    next();
})

// 模拟登录验证
function loginCheck(req, res, next) {
    setTimeout( () =>{
        console.log('模拟登录成功');
        next();
    })
}
app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie 路由');

    res.json({
        error: 0,
        data: req.cookie
    })
})


app.listen(8899, () => {
    console.log('server is running on port 8899');
});