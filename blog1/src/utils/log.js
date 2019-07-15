const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n'); // 关键代码
}

//  生成write stream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
    const wtiteStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    });
    return wtiteStream;
}


// 写访问日志
const accessWriteStream = createWriteStream('access.log');
const errWriteStream = createWriteStream('error.log')
const eventWriteStream = createWriteStream('error.log')

function access(log) {
    writeLog(accessWriteStream, log);
}
function error(log) {
    writeLog(errWriteStream, log)
}
function events(log) {
    writeLog(eventWriteStream, log);
}
module.exports = {
    access,
    error,
    events
}