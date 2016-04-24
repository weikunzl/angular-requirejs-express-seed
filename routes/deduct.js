var express = require('express');
var router = express.Router();
var deductDao = require('../dao/deductDao');

//用户登录
router.post('/getDeductList',function (req,res,next) {
  deductDao.getList(req,res,next);
});

router.post('/sumNoPayment',function (req,res,next) {
  deductDao.sumPayment(req,res,0);
});

router.post('/sumWaitPayment',function (req,res,next) {
  deductDao.sumPayment(req,res,1);
});

router.post('/',function (req,res,next) {
  if(!req.session.user){
    res.status(420).send('');
    return;
  }else{
    next();
  }
});
module.exports = router;
