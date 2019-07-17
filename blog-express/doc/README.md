# 使用express搭建博客
##安装插件

安装`mysql` 、`xss` 插件
```
npm install mysql xss --save 
```

## 登录问题

* 使用 express-session和connect-redis，简单方便
* req.session 保存登录信息， 登录校验做成express中间件


## redis

把 session 的数据转换存到redis中

安装插件
```
npm i redis connect-redis --save
```