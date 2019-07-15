const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');

// 读取文件内容
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.eooro(err);
//         return;
//     }
//     // data 是二进制类型，需要转换为字符串
//     console.log(data.toString());
// })

// 写入文件
// const content = '这是写入的内容\n';
// const opt = {
//     flag: 'a' //表示追加到原先内容后边， 覆盖为'w'
// }

// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log('文件写入成功');
// })

// 判断文件是否存在
fs.exists(fileName, (exist) => {
    console.log('exist', exist);  //exist 为true表示存在
})