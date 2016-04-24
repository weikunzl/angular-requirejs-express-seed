var express = require('express');
var router = express.Router();
var cfgDeductDao = require('../dao/cfgDeductDao');

//用户登录
router.post('/getDeductList',function (req,res,next) {
  cfgDeductDao.getList(req,res,next);
});

router.post('/updatePayMoneyNo',function (req,res) {
  if(!req.body){
    res.status(500).send("数据错误");
    return;
  }
  cfgDeductDao.updatePayMoney(req,res,3);
});

router.post('/updatePayMoney',function (req,res) {
  if(!req.body){
    res.status(500).send("数据错误");
    return;
  }
  cfgDeductDao.updatePayMoney(req,res,2);
});

router.post('/',function (req,res,next) {
  if(!req.session.user||req.session.user.roleId!=9){
    res.status(420).send('');
    return;
  }else{
    next();
  }
});
module.exports = router;
