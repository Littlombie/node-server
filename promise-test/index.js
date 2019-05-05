const fs = require('fs');
const path = require('path');



// callback 方式获取一个文件的内容
// function getFileContent(filename, callback)  {
//     const fullFileName = path.resolve(__dirname, 'files', filename);
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error (err);
//             return; 
//         }
    
//         callback(
//             JSON.parse(data.toString())
//         );
//     })
// }

// 测试
// getFileContent('a.json', aData => {
//     console.log('a data', aData);
//     getFileContent(aData.next, bData => {
//         console.log('b data', bData);
//         getFileContent(bData.next, cData => {
//             console.log('c data', cData);
//         })
//     })
// })

function gerFullContent (filename) {
    const promise = new Promise ((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', filename);
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject (err);
                return; 
            }
            resolve(
                JSON.parse(data.toString())
            );
        })
    })
    return promise
}

gerFullContent('a.json')
.then (aData => {
    console.log('a data', aData);
    return gerFullContent(aData.next);
})
.then (bData => {
    console.log('b data', bData);
    return gerFullContent(bData.next);
})
.then (cData => {
    console.log('c data', cData);
});