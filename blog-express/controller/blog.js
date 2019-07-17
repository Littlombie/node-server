const {
    exec
} = require('../db/mysql');
const xss = require('xss');

const getList = (author, keyword) => {

    let sql = `select * from blogs where 1=1 `; // 1=1 表示占位 目的是 让where 后边有值后不会导致错误

    if (author) {
        sql += `and author='${author}'`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    // 返回的是promise
    return exec(sql)
};

const getDetail = (id) => {
    //根据id查询数据
    const sql = `select * from blogs where id = '${id}'`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // 创建blog blogData是一个博客对象， 包含title content 属性
    const title = xss(blogData.title);
    console.log('title is', title);
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
}

const updateBlog = (id, blogData = {}) => {
    // id为更新博客的id
    // 创建blog blogData是一个博客对象， 包含title content 属性
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `

    return exec(sql).then(updateData => {
        // console.log('updateData is ', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    // id 就是要删除的id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}