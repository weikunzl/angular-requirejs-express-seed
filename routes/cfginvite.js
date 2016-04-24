var express = require('express');
var router = express.Router();
var cfgInviteDao = require('../dao/cfgInviteDao');

//用户登录
router.post('/getInviteList',function (req,res,next) {
  cfgInviteDao.getList(req,res,next);
});
router.post('/getRefereeUsers',function (req,res,next) {
  cfgInviteDao.getRefereeUsers(req,res,next);
});

router.post('/updateRefereeUser',function (req,res,next) {
  cfgInviteDao.updateRefereeUser(req,res,next);
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
