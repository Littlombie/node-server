const getList = (author, keyword) => {
    // 先返回假数据（格式刷hi正确的）
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1546616611373,
            author: '李四'
        },
    ]
};

const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: '张三'
    }
} 

const newBlog = (blogData = {}) => {
    // 创建blog blogData是一个博客对象， 包含title content 属性
    console.log('newBlog blogData', blogData);
    return {
        id: 3, //表示新建博客插入导数据表里面的id
    }
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