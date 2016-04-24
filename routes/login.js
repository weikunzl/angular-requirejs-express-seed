var express = require('express');
var router = express.Router();
var config = require('../conf/config');
var userDao = require('../dao/userDao');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/doEditPwd', function(req, res, next) {
  //res.sendfile('index', { title: 'Express' });
    var user = req.session.user;
    //check pwd
    userDao.updatePwd(req,res);
    //edit pwd
});
//login
router.post('/doLogin',function (req,res) {
    if(req.session.user){
        if(req.session.user.roleid ==9){
            res.redirect(config.hostcfg+'/index.html');
            return ;
        }
        res.redirect(config.host+'/index.html');
    }else{
        userDao.login(req,res);
    }
     //res.render('login',{title : '用户登录'});
})
router.get('/doLogin',function (req,res) {
    console.log(req.session.user)
    if(req.session.user){
        if(req.session.user.roleid ==9){
            res.redirect(config.hostcfg+'/index.html');
            return ;
        }
        res.redirect(config.host+'/index.html');
    }else{
        res.redirect(config.host+'/login.html');
    }
    //res.render('login',{title : '用户登录'});
})
router.get('/doLogout',function (req,res) {
    console.log(req.session.user)
    req.session.user = null;
    res.redirect(config.host+'/login.html');

    //res.render('login',{title : '用户登录'});
})
router.get('/getUser',function (req,res) {
    if(req.session.user){
        res.send(req.session.user);
    }
    else{
        res.status(420).send('未登录');
    }

    //res.render('login',{title : '用户登录'});
})
//regiest
router.post('/doRegister',function (req,res) {
    if(req.body&&req.body.userName&&req.body.userid&&req.body.password){
        userDao.add(req,res);
    }else{
        res.status(500).send("错误数据")
    }//res.render('login',{title : '用户登录'});
})


module.exports = router;
