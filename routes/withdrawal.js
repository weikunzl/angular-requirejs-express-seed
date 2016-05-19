var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');

//用户登录
router.get('/doGetUserBankInfo',function (req,res,next) {
  if(!req.session.user){
    res.status(420).send('用户未登录.');
    return;
  }else{
    next();
  }
},function (req,res) {
  userDao.queryById(req,res,next);
});

router.post('/doUpdateUser',function (req,res,next) {
  if(!req.session.user){
    res.status(420).send('用户未登录.');
    return;
  }else{
    next();
  }
},function (req,res,next) {
  userDao.updateBank(req,res,next);
});

router.post('/doApplyPayMoney',function (req,res,next) {
  if(!req.session.user){
    res.status(420).send('用户未登录.');
    return;
  }else{
    next();
  }
},function (req,res) {
  if(!req.body||!req.body.tyear||!req.body.tmonth){
    res.status(500).send("数据错误");
    return;
  }
  userDao.doApplyPayMoney(req,res,next);
});
router.all('/',function (req,res,next) {
  if(!req.session.user){
    res.status(420).send('用户未登录.');
    return;
  }else{
    next();
  }
});

module.exports = router;

var withdrawalDao = require('../dao/withdrawalDao');
//数据处理


//运行时计算提成 数据处理
var later = require('later');
later.date.localTime();


//传入起始时间
/**
 * 从两张表内分别跑数据 [分别定时]
 *
 * 1. oepre_user_money
 * 记录查询时间
 * timeMoneyTemp
 *  先查询时间段内 是否有数据
 *
 *  更新时间段内数据数据
 *
 * 2. oepre_payment_log
 *
 * timePaymentTemp
 *  先查询时间段内 是否有数据
 *
 *  更新时间段内数据数据
 */
var paymentTimeTemp = 0;//起始时间
var moneyTimeTemp = 0;//起始时间
var gifTimeTemp = 0;//起始时间
var sched = later.parse.recur().every(1).hour(),
    t = later.setInterval(function() {
      try{
        var moneyNowTimeTemp =  parseInt(new Date().getTime()/1000);
        withdrawalDao.checkMoneyDeduct({startTime:moneyTimeTemp,endTime: moneyNowTimeTemp});
      }catch(e){
        t.clear();
        console.log(e,"Clear!!!!!");
      }
      //moneyTimeTemp = moneyNowTimeTemp;
    }, sched),
    //t1 = later.setInterval(function() {
    //  try{
    //    var paymentNowTimeTemp =  parseInt(new Date().getTime()/1000);
    //    withdrawalDao.checkPaymentDeduct({startTime:paymentTimeTemp,endTime: paymentNowTimeTemp});
    //  }catch(e){
    //    t1.clear();
    //    console.log(e,"Clear!!!!!");
    //  }
    //  //paymentTimeTemp = paymentNowTimeTemp;
    //}, sched),
    t2 = later.setInterval(function() {
      try{
        var giftNowTimeTemp =  parseInt(new Date().getTime()/1000);
        withdrawalDao.checkGiftDeduct({startTime:gifTimeTemp,endTime: giftNowTimeTemp});
      }catch(e){
        t2.clear();
        console.log(e,"Clear!!!!!");
      }
      //paymentTimeTemp = paymentNowTimeTemp;
    }, sched);

//新上线项目跑数据使用
//withdrawalDao.checkPaymentDeduct({startTime:paymentTimeTemp,endTime: paymentNowTimeTemp});
//withdrawalDao.checkMoneyDeduct({startTime:moneyTimeTemp,endTime: moneyNowTimeTemp});
//
