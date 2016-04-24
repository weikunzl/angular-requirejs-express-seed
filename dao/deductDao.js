/**
 * Created by WLxing on 16/3/28.
 */
//实现MySQL交互
var $sql = require('./sqlMapper/deductSqlMapping');

var config = require('../conf/config');
var path = require('path');
//使用连接池,提高性能
var pool = require('../conf/pool').init();

//向前台返回JSON方法的简单封装
var jsonWrite = function (res,ret) {

        res.json(ret);

};

module.exports = {
    getList : function (req,res,next) {

        //console.log(222,req.body);
        ( function(req,res){
            if(!req.session.user){
                res.status(420).send('');
                return;
            }
            //pool.getConnection(function (err,connection) {
            //if(err){
            //    console.log(err);
            //}
            var param = req.body;
            var sql = $sql.deductList;
            var sqlCount = $sql.countDeductList;
            var values = [req.session.user.userid];
            if(param.year) {
                values.push(param.year);
                sql+=' and tyear = ? ';
                sqlCount+=' and tyear = ? ';

            }
            if(param.month){
                values.push(param.month);
                sql+=' and tmonth=?'
                sqlCount+=' and tmonth=?'
            }
            sql += ' limit ?,?';
            values.push((param.pageNumber-1)*param.pageSize)
            values.push(param.pageSize)

            //建立连接,向表里插入数据
            pool.query({sql :sql,values:values,timeout: 60000},function (err,rows) {
                if(err){
                    res.status(500).send(err);
                    //connection.release();
                    return ;
                }
                if(rows.length > 0) {
                    //req.session.user = rows[0];
                    //delete req.session.user.password;
                    var rs = rows;
                    pool.query({sql :sqlCount,values:values,timeout: 60000},function (err,rows2) {
                        if(err){
                            res.status(500).send(err);
                            return;
                        }
                        res.json({data:rs,total:rows2[0].total});
                        //connection.release();
                    })

                } else {
                    res.send({data:[],total:0});
                }
            })
        })(req,res)

    },
    sumPayment:function(req,res,payflag){
        var param = req.body;
        var sql = $sql.sumPayMoney;
        //var sqlCount = $sql.countDeductList;
        var values = [req.session.user.userid,payflag];
        if(param.year) {
            values.push(param.year);
            sql+=' and tyear = ? ';
            //sqlCount+=' and tyear = ? ';

        }
        if(param.month){
            values.push(param.month);
            sql+=' and tmonth=?'
            //sqlCount+=' and tmonth=?'
        }

        //console.log(sql,values);
        //pool.getConnection(function (err,connection) {

        pool.query({sql: sql, values: values, timeout: 60000}, function (err, rows2) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            console.log(rows2[0].totalearn);
            res.send({totalearn:rows2[0].totalearn});
                //connection.release();
            //})
        });
    }
};