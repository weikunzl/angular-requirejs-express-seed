var express = require('express');
var router = express.Router();
var incomeDao = require('../dao/incomeDao');

//用户登录
router.post('/getIncomeList',function (req,res,next) {
  incomeDao.getList(req,res,next);
});

router.post('/',function (req,res,next) {
  if(!req.session.user){
    //res.status(420).send('');

    res.redirect(config.host+'/login.html');
    return;
  }else{
    next();
  }
});
module.exports = router;
