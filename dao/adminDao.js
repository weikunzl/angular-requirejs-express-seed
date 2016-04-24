/**
 * Created by WLxing on 16/3/28.
 */
//实现MySQL交互
var $sql = require('./sqlMapper/adminSqlMapping');

var path = require('path');
//使用连接池,提高性能
var pool = require('../conf/pool').init();

//向前台返回JSON方法的简单封装
var config = '../conf/config'
module.exports = {

    getWithdrawal : function (req,res,next) {
        if(!req.body){
            res.status(500).send("数据为空")
        }
        var newPwd = md5(req.body.newPwd);
        var oldPwd = md5(req.body.oldPwd);
        //console.log(newPwd,oldPwd)
        //pool.getConnection(function (err,connection) {
        pool.query({sql :$sql.updatePwd,values:[newPwd,oldPwd,req.session.user.userid],timeout: 60000},function (err,result) {
           if(err){
               res.status(500).send(err);
               return;
           }
            //使用页面进行跳转提示
            if(result.affectedRows >0) {
                console.log('............'+result);
                res.send(result);
            } else {
                res.status(500).send('请核对密码');
            }
            //    connection.release();
            //})
        })
    },
    queryById : function (req,res,next) {
        var id = req.session.user.userid;// 为了拼凑正确的sql语句，这里要转下整数
        //pool.getConnection(function (err,connection) {
        //    console.log($sql.getUserByUserId)
            pool.query({sql :$sql.getUserByUserId,values:[id],timeout: 60000},[id],function (err,result) {
            if(err){
                console.log(err)
                res.status(500).send(err);
                return;
            }
            if(result.length>0){
                var person = {
                    realName : result[0].realName,
                    bankInfo : result[0].bankInfo,
                    bankNumber : result[0].bankNumber,
                    phoneNumber : result[0].phoneNumber,
                    bankEmail : result[0].bankEmail
                }
                res.json(person);
            }else{
                res.json({})
            }

            //    connection.release();
            //})
        })
    },
    updateBank : function(req,res,next){
        var id = req.session.user.userid;// 为了拼凑正确的sql语句，这里要转下整数
        //pool.getConnection(function (err,connection) {
            var sqlObj = $sql.updateBank(req.body)
            sqlObj.values.push(id);
            sqlObj.timeout = 60000;
            pool.query(sqlObj,function (err,result) {
                if(result.affectedRows >0) {
                    console.log('............'+result);
                    res.send(true);
                } else {
                    res.status(500).send(result);
                }

                //connection.release();
            })
        //})
        
    }
};