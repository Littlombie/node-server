
// 标准的输如输出
// process.stdin.pipe(process.stdout);


const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        req.pipe(res)
    }
})

server.listen(10005);
