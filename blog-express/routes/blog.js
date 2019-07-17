var express = require('express');
var router = express.Router();

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

// 查看博客列表接口
router.get('/list', (req, res, next) => {

    let author = req.query.author || '';
    const keyword = req.query.keyeord || '';

    if (req.query.isadmin) {
        // 管理员界面
        if (req.session.username == null) {
            // 未登录
            res.json(
                new ErrorModel('未登录')
            )
            return;
        }
        // 强制查询自己的博客
        author = req.session.username;
    }

    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(
            new SuccessModel(listData)
        )
    })
});

// 查看博客详情接口
router.get('/detail', (req, res, next) => {
    const id = req.query.id;
    const result = getDetail(id);
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        );
    })
});

// 创建博客接口
router.post('/new', loginCheck, (req, res, next) => {
    const author = req.session.username;
    req.body.author = author;
    const result = newBlog(req.body);
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        );
    });
});

// 更新博客接口
router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body);
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            );
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            );
        }
    })
})

// 删除博客接口
router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username;
    const result = delBlog(req.query.id, author);
    return result.then(val => {
        console.log('val is',val);
        if (val) {
            res.json(
                new SuccessModel()
            );
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            );
        }
    })
})
module.exports = router;