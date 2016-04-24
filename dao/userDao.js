/**
 * Created by WLxing on 16/3/28.
 */
//实现MySQL交互\

//使用连接池,提高性能
var $sql = require('./sqlMapper/userSqlMapping');

var path = require('path');

var config = require('../conf/config');
var crypto = require('crypto');
//var md5 = crypto.createHash('md5');
var md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}
//向前台返回JSON方法的简单封装
var jsonWrite = function (res,ret) {
    res.json(ret);

};
var pool = require('../conf/pool').init();

module.exports = {
    add : function (req,res) {

        //console.log(222,req.body);
        ( function(req,res){
            //pool.getConnection(function (err,connection) {

                //获取前台页面传过来的参数
                var param = req.body;
                var password = md5(param.password);
                delete param.password;
                //建立连接,向表里插入数据
            pool.query({sql :$sql.insert,values:[param.userid,param.userName,password],timeout: 60000},function (err,result,a,b) {

                //console.log(err,result,a,b,path.join(__dirname, '../public/login.html'))
                if(err){
                    console.log(err)
                    res.status(500).send(err);
                    return;
                }
                //以json形式,把操作结果返回给前台页面

                req.session.user = param;
                res.send(true);
                //释放连接
                //connection.release();
            })
            //})
        })(req,res)

    },
    login : function (req,res) {
        //pool.getConnection(function (err,connection) {
        var param = req.body;
        var password = md5(param.password);
        console.log(password)
        delete param.password;
        pool.query({sql :$sql.getUserByUserNameAndPwd,values:[param.userid,password],timeout: 60000},function (err,rows,result) {

            if(rows.length > 0) {
                req.session.user = rows[0];
                var roleId = req.session.user.roleId;
                delete req.session.user.password;
                delete req.session.user.roleId;//清楚

                if(roleId ==9){
                    res.redirect(config.hostcfg+'/index.html');
                    return ;
                }
                res.redirect(config.host+'/index.html');
            } else {
                res.redirect(config.host+'/login.html?error='+"001")
            }
                //jsonWrite(res,result);
                //connection.release();
            //})
        })
    },
    updatePwd : function (req,res) {
        if(!req.body){
            res.status(500).send("数据为空")
        }
        var newPwd = md5(req.body.newPwd);
        var oldPwd = md5(req.body.oldPwd);
        console.log(newPwd,oldPwd)
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
            //connection.release();
        })
        //})
    },
    queryById : function (req,res) {
        var id = req.session.user.userid;// 为了拼凑正确的sql语句，这里要转下整数
        //pool.getConnection(function (err,connection) {
        pool.query({sql :$sql.getUserByUserId,values:[id],timeout: 60000},function (err,result) {
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
    //修改银行卡号信息
    updateBank : function(req,res){
        var id = req.session.user.userid;// 为了拼凑正确的sql语句，这里要转下整数
        //pool.getConnection(function (err,connection) {
        var sqlObj = {
            sql : $sql.updateBank,
            values : [req.body,id],
            timeout : 60000
        }

        pool.query(sqlObj,function (err,result) {
            if(err){
                console.log(err);
                res.status(500).send(err);
                return ;
            }
            if(result.affectedRows >0) {
                console.log('............'+result);
                res.send(true);
            } else {
                res.status(500).send(result);
            }

            //    connection.release();
            //})
        })
        
    },
    //申请提成
    doApplyPayMoney: function(req,res){
        //pool.getConnection(function (err,connection) {
        var id = req.session.user.userid;// 为了拼凑正确的sql语句，这里要转下整数
        var sqlObj = {
            sql :$sql.checkPayMoney,
            values : [id,req.body.tyear,req.body.tmonth],
            timeout : 60000
        }
        try{
            pool.query(sqlObj,function (err,rows) {
                if(err){
                    console.log(err);
                    res.status(500).send(err);
                    return;
                }
                if(rows[0].total >0) {
                    //有数据为结算
                    (function (sqlObj2, res1) {
                        sqlObj2.sql = $sql.applyPayMoney;
                        pool.query(sqlObj2, function (err2, result2) {
                            if (err2) {
                                console.log(err2);
                                res1.status(500).send(err2);
                                return;
                            }
                            if (result2.affectedRows > 0) {
                                console.log('............' + result2);
                                res1.send('申请成功.客服人员将在48小时内处理.');
                            } else {

                                res1.send('申请失败,联系管理员.');
                                //res1.status(500).send(result2);
                            }
                            //connection1.release();
                        })
                    })(sqlObj, res);
                }
                 else {
                    res.send('该月份没有提成');
                    //connection.release();
                }
            //connection.release();
            })
        }catch(e){
            console.log(e)
        }
        //})

    }
};