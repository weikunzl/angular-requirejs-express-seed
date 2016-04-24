var express = require('express');
var router = express.Router();
var adminDao = require('../dao/adminDao');


router.get('/getWithdrawal',function (req,res,next) {
  adminDao.getWithdrawal(req,res,next);
});

router.post('/updateBank',function (req,res,next) {
  adminDao.updateBank(req,res,next);
});
router.all('/',function (req,res,next) {

  if(!req.session.user||req.session.user.userid !== 'admin'){
    //res.status(420).send('没有权限!');

    res.redirect(config.host+'/login.html');
    return;
  }else{
    next();
  }
});

module.exports = router;
