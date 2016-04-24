var express = require('express');
var router = express.Router();
var inviteDao = require('../dao/inviteDao');

//用户登录
router.post('/getInviteList',function (req,res,next) {
  inviteDao.getList(req,res,next);
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
