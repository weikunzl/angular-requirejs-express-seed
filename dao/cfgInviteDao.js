/**
 * Created by WLxing on 16/3/28.
 */
//实现MySQL交互
var pool = require('../conf/pool').init();
var $sql = require('./sqlMapper/cfgInviteSqlMapping');
var withdrawalDao = require('./withdrawalDao');

var path = require('path');
//使用连接池,提高性能

//向前台返回JSON方法的简单封装
var jsonWrite = function (res,ret) {

        res.json(ret);

};

module.exports = {
    getList : function (req,res,next) {

        if(!req.session.user){
            res.status(420).send('');
            return;
        }
        var param = req.body;
        var sql = $sql.inviteList;
        var sqlCount = $sql.countInviteList;
        var values = [];
        if(param.regDateE&&param.regDateS) {
            values.push(param.regDateS);
            values.push(param.regDateE);
            sql+=' and ( a.regtime between ? and ?) ';
            sqlCount+=' and ( a.regtime between ? and ?) ';
        }
        if(param.searchText&&param.searchText!='') {
            values.push('%'+param.searchText+'%');

            sql+=' and ( b.userName like ? ) ';
            sqlCount+=' and ( b.userName like ?) ';
        }
        if(param.refereeid&&param.refereeid!=''){
            values.push('%'+param.refereeid+'%');

            sql+=' and ( a.refereeid like ? )';
            sqlCount+=' and a.refereeid like ? ';
        }
        sql += ' limit ?,?';
        values.push((param.pageNumber-1)*param.pageSize)
        values.push(param.pageSize)

            //建立连接,向表里插入数据
        pool.query({sql :sql,values:values,timeout: 60000},function (err,rows) {
            if(err){
                res.send({date:[],total:0});
                //connection.release();
                return ;
            }
            if(rows.length > 0) {
                //req.session.user = rows[0];
                //delete req.session.user.password;
                var rs = rows;
                pool.query({sql :sqlCount,values:values,timeout: 60000},function (err,rows2) {
                    console.log(values,rows2[0])
                    res.json({data:rs,total:rows2[0].total});
                    //connection.release();
                })

            } else {
                res.send({data:[],total:0});
            }
            //释放连接
            //connection.release();
        })


    },
    getRefereeUsers : function (req,res,next) {

        //console.log(222,req.body);
        if (!req.session.user) {
            res.status(420).send('');
            return;
        }
        //pool.getConnection(function (err, connection) {
        //    if (err) {
        //        console.log(err);
        //    }
        var param = req.body;
        var sql = $sql.reInviteList;
        var sqlCount = $sql.countReInviteList;
        var values = [];
        if (param.userName && param.userName != '') {
            values.push('%' + param.userName + '%');

            sql += ' and ( userName like ? ) ';
            sqlCount += ' and ( userName like ?) ';
        }
        if (param.userid && param.userid != '') {
            values.push('%' + param.userid + '%');
            sql += ' and ( userid like ? )  ';
            sqlCount += ' and ( userid like ? )  ';
        }
        sql += ' limit 0,20';
        console.log(sql,values)
        //values.push((param.pageNumber-1)*param.pageSize)
        //values.push(param.pageSize)

        //建立连接,向表里插入数据
        pool.query({sql: sql, values: values, timeout: 60000}, function (err, rows) {
            //console.log(rows)
            if (err) {
                res.send({date: [], total: 0});
                //connection.release();
                return;
            }
            if (rows.length > 0) {
                //req.session.user = rows[0];
                //delete req.session.user.password;
                var rs = rows;
                //connection.query({sql :sqlCount,values:values,timeout: 60000},function (err,rows2) {
                //    console.log(values,rows2[0])
                //    res.json({data:rs,total:rows2[0].total});
                //    connection.release();
                //})
                res.json(rows);
            } else {
                res.send({data: [], total: 0});
            }
            //释放连接
            //connection.release();
        });
    },
    updateRefereeUser : function (req,res) {
        //获取前台页面传过来的参数
        var param = req.body;
        if(!param||!param.id||!param.ids||param.ids.length==0){

            res.status(500).send("数据错误.");
            return ;
        }
        var values = [param.id];
        var sql = $sql.updateRefereeUser+"(";
        for(var i=0; i<param.ids.length;i++){
            sql += '?'
            values.push(param.ids[i]);
            if(i!=(param.ids.length-1)){
                sql += ','
            }
        }
        sql += ')';
        //建立连接,向表里插入数据
        pool.query({sql :sql,values:values,timeout: 60000},function (err,result,a,b) {

            //console.log(err,result,a,b,path.join(__dirname, '../public/login.html'))
            if(err){
                console.log(err)
                res.status(500).send(err);
                return;
            }
            //以json形式,把操作结果返回给前台页面

            //释放连接
            //connection.release();
            res.send(true);


            withdrawalDao.updateMoneyDeductByIds(param.ids);

            withdrawalDao.updatePaymentDeductByIds(param.ids);
            withdrawalDao.updateGiftDeductByIds(param.ids);
        })

        //})

    }
};