const {login} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/resModel');
const {set} = require('../db/redis');


// 获取cookie过期时间
// const getCookieExpires = () => {
//     const d = new Date();
//     d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    
//     console.log('d.toGMTString() is', d.toGMTString());
//     return d.toGMTString(); //获取当前时间的gmt格式
// }

const handleUserRouter = (req, res) => {
    const method = req.method; //get/post

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body;
        // const {username, password} = req.query;
        const result = login(username, password);
        return result.then(data => {

        // console.log('result---------------------------------',data);
            if (data.username) {
                console.log('2222222',req.session);
                // 设置session
                req.session.username = data.username;
                req.session.realname = data.realname;
                console.log('req.session is',req.session);

                // 操作cookie
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);  //登录后所有的页面都生效  ,httpOnly 表示username 只能是 后台修改 前台修改不会生效
                
                // 同步到redis
                set(req.sessionId, req.session);
                
                return new SuccessModel();
            }
            return new ErrorModel('登录失败');
        })
        // if (result) {
        //     return new SuccessModel();
        // } 
        // return new ErrorModel('登录失败');
    }

    // //登录验证测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //             session: req.session
    //         })); 
    //         // return new SuccessModel(); 
    //     }
    //     // return new ErrorModel('尚未登录');
    //     return Promise.resolve(new ErrorModel('尚未登录'));
    // }

}

module.exports = handleUserRouter; 