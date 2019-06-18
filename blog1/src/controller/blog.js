const {exec} = require('../db/mysql');

const getList = (author, keyword) => {
    // 先返回假数据（格式刷hi正确的）
    // return [
    //     {
    //         id: 1,
    //         title: '标题A',
    //         content: '内容A',
    //         createTime: 1546610491112,
    //         author: '张三'
    //     },
    //     {
    //         id: 2,
    //         title: '标题B',
    //         content: '内容B',
    //         createTime: 1546616611373,
    //         author: '李四'
    //     },
    // ]

    let sql = `select * from blogs where 1=1 `; // 1=1 表示占位 目的是 让where 后边有值后不会导致错误

    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    console.log(sql);
    // 返回的是promise
    return exec(sql)
};

const getDetail = (id) => {
    // 先返回假数据
    // return {
    //     id: 1,
    //     title: '标题A',
    //     content: '内容A',
    //     createTime: 1546610491112,
    //     author: '张三'
    // }
    //根据id查询数据
    const sql = `select * from blogs where id = '${id}'`;
    return exec(sql).then( rows => {
        return rows[0]
    })
} 

const newBlog = (blogData = {}) => {
    // 创建blog blogData是一个博客对象， 包含title content 属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createtime = Date.now();

    const sql = `
    insert into blogs (title, content, author, createtime)
    values ('${title}', '${content}', '${author}', ${createtime})
    `
    return exec(sql).then(insertData => {
        // console.log('insertData is ', insertData);
        return {
            id: insertData.insertId
        }
    });
    // console.log('newBlog blogData', blogData);
    // return {
    //     id: 3, //表示新建博客插入导数据表里面的id
    // }
}

const updateBlog = (id, blogData = {}) => {
    // id为更新博客的id
    // 创建blog blogData是一个博客对象， 包含title content 属性
    console.log('update blog', id, blogData);
    return  true;
}

const delBlog = (id) => {
    // id 就是要删除的id
    return true;
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}