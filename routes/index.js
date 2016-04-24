var express = require('express');
var router = express.Router();

/* GET home page. */

//
//var config = require('../conf/config');
//
//
//router.all('/',function (req,res) {
//    console.log(1111111111111111)
//    if(!req.session.user){
//        res.redirect(config.host+'/login.html');
//        return ;
//    }
//    if(req.session.user){
//        if(req.session.user.roleid ==9){
//            res.redirect(config.hostcfg+'/index.html');
//            return ;
//        }
//        res.redirect(config.host+'/index.html');
//    }
//    //res.render('login',{title : '用户登录'});
//})
module.exports = router;
