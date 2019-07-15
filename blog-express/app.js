var createError = require('http-errors'); //错误页面处理的
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 解析cookie
var logger = require('morgan'); // 日志记录

// 引用路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const blogRouter  = require('./routes/blog');
const userRouter  = require('./routes/user');

// 初始化实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// 注册方法
app.use(logger('dev'));
app.use(express.json()); // 处理数据请求， 以json返回
app.use(express.urlencoded({ extended: false })); // 兼容其他的请求格式 
app.use(cookieParser()); //解析cookie
app.use(express.static(path.join(__dirname, 'public')));  // 解析对应的静态文件

app.use('/', indexRouter); //注册路由 根目录 
app.use('/api/blog', blogRouter); 
app.use('/users', usersRouter);
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
