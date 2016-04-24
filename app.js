var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var deduct = require('./routes/deduct');
var invite = require('./routes/invite');
var withdrawal = require('./routes/withdrawal');
var income = require('./routes/income');
//var globalmanger = require('./routes/globalmanger');
var cfginvite = require('./routes/cfginvite');
var cfgdeduct = require('./routes/cfgdeduct');
var config = require('./conf/config');
var app = express();
app.use(session({
  secret: '12345',
  name: 'charmmeet',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  cookie: {maxAge: 1800000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true
}));
// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(config.host+'/', routes);
app.use(config.host+'/users', users);
app.use(config.host+'/login', login);
app.use(config.host+'/deduct', deduct);
app.use(config.host+'/invite', invite);
app.use(config.host+'/income', income);
app.use(config.host+'/withdrawal', withdrawal);
//管理界面
//app.use(config.hostcfg+'/globalmanger', globalmanger);
//app.use(config.hostcfg+'/globalmanger', globalmanger);

app.use(config.hostcfg+'/cfgdeduct', cfgdeduct);//提成
app.use(config.hostcfg+'/cfginvite', cfginvite);//人员管理

app.use(config.host+'/share/:userName', function(req,res,next){
  //req.cookie({'user':req.params.userName});
  if(req.params.userName){
    req.cookies.charmmeetRefereeId =req.params.userName;
  }
  res.redirect("/");
});
// catch 404 and forward to error handler
app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  console.log(__dirname)
  //res.redirect(config.host+'/404.html')
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    //res.send('error', {
    //  message: err.message,
    //  error: err
    //});
    res.redirect(config.host+'/500.html')
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

  console.log(err);
  //res.status(err.status || 500);
  //res.send('error', {
  //  message: err.message,
  //  error: {}
  //});
  res.sendfile(path.join(__dirname, '/public/500.html'), {
    title: '错误'
  })
});


process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});
app.use('/toLogin', routes);

module.exports = app;
