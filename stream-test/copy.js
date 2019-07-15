// 通过stream实现复制文件的功能

const fs = require('fs');
const path = require('path');

// 两个文件
var fileName1 = path.resolve(__dirname, 'file.txt');
var fileName2 = path.resolve(__dirname, 'file2.txt');

// 读取文件
var readStream = fs.createReadStream(fileName1);
// 写入文件
var writeStream = fs.createWriteStream(fileName2);
// 执行拷贝，通过pipe
readStream.pipe(writeStream);

// 监听显示每次读取的内容
readStream.on('data', chunk => {
    console.log(chunk.toString());
})

// 读取数据完成，即拷贝完成
readStream.on('end', () => {
    console.log('拷贝完成');
})