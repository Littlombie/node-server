const loginCheck = (username, password) => {
    // 先使用假数据
    if (username === 'zhangsan' && password === '111') {
        return true;
    } 
    return false;
    
}

module.exports = {
    loginCheck
};