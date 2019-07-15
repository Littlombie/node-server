const http = require('http');
const fs = require('fs');
const path = require('path');

// 直接把files中的内容以stram的方式请求返回出来
var fileStream = path.resolve(__dirname, 'file.txt');
const server = http.createServer((req, res) => {
    if (req.method == 'GET') {
        const readStream = fs.createReadStream(fileStream);
        readStream.pipe(res);
        // console.log(res.toString());
    }
})
server.listen(10005);