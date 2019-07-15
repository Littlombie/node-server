## 安装（使用脚手架express-generator）

```markdown
// 安装
npm install express-generator -g

//生成项目
express express-test

//安装& 运行

express install & npm start
```

运行后的端口 地址设置位置为：
`/bin/www` 中 有个 `process.env.PORT` 后边为端口

为了避免代码不停需要手动重启， 我们安装一下插件
```
npm install nodemon cross-env --save-dev
```
然后在项目`package.json`中设置 `script`:

```
    "dev": "cross-env NODE_DEV=dev nodemon ./bin/www.js"
```
我们直接运行 `npm run dev`，启动服务

## 初始化代码介绍，处理路由

## 使用中间件



* 终端使用  

```
// 创建文件
mkdir 文件名

// 删除文件 
rm -rf 文件名

// 预览文件
ls 文件名 

```