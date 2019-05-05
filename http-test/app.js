const http = require('http');
const queryString = require('querystring');


const server = http.createServer( (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = queryString.parse(url.split('?')[1]);

    // 设置返回格式为 json
    res.setHeader('Content-type', 'application/json');

    // 返回的数据
    const resData = {
        method,
        url,
        path,
        query
    };

    // 返回
    if (method === 'GET') {
        res.end(
            JSON.stringify(resData) //规定为json字符串
        );
    }
    if (method === 'POST') {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            resData.postData = postData;
            res.end(
                JSON.stringify(resData)
            );
        });
    }
})
// // get 请求返回数据
// const server = http.createServer ((req, res) => {
//     console.log('method', req.method);
//     const url = req.url;
//     console.log('url', url);
//     req.query = queryString.parse(url.split('?')[1]);
//     console.log('query', req.query);
//     res.end(
//         JSON.stringify(req.query)
//     )
// });

// post请求
// const server = http.createServer( (req, res) => {
//     if (req.method == 'POST') {
//         // req 数据
//         console.log('req content-type: ', req.headers['conent-type']);
//         // 接收数据
//         let postData = '';
//         req.on('data', chunk => {
//             postData += chunk.toString();
//         });
//         req.on('end', () => {
//             console.log('postData:', postData);
//             res.end('hello world');
//         });
//     }
// })
server.listen(8000);
console.log('end');