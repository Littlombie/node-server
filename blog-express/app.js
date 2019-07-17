var createError = require('http-errors'); //错误页面处理的
var express = require('express');
const fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan'); // 日志记录
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// 引用路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const blogRouter  = require('./routes/blog');
const userRouter  = require('./routes/user');

// 初始化实例
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// 注册方法
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  // 开发 & 测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  console.log('line');
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a' //'a'表示打开文件在文件末尾追加，如果文件不存在，则创建该文件
  });
  app.use(logger('combined', {
    stream: writeStream
  }))
}

app.use(express.json()); // 处理数据请求， 以json返回
app.use(express.urlencoded({ extended: false })); // 兼容其他的请求格式 
app.use(cookieParser()); //解析cookie
// app.use(express.static(path.join(__dirname, 'public')));  // 解析对应的静态文件

const redisClient = require('./db/redis');
const sessionStore = new RedisStore ({
  client: redisClient
});

// 登录验证 配置session
app.use(session({
  secret: 'WJiol#23123_', //s随意密匙 保持 复杂度
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true,// 默认配置
    maxAge: 24 * 60 * 60 * 1000 // 设置超时
  },
  store: sessionStore
}))

// app.use('/', indexRouter); //注册路由 根目录 
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter); 
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
