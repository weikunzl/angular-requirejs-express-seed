/**
 * Created by WLxing on 16/3/28.
 */
//实现MySQL交互
var $sql = require('./sqlMapper/cfgDeductSqlMapping');

var path = require('path');
//使用连接池,提高性能
var pool = require('../conf/pool').init();

//向前台返回JSON方法的简单封装
var jsonWrite = function (res,ret) {

        res.json(ret);

};

module.exports = {
    getList : function (req,res,next) {


        var param = req.body;
        var sql = $sql.deductList;
        var sqlCount = $sql.countDeductList;
        var values = [];
        //if(param.refereeid){
        //    values.push(param.refereeid);
        //    sql+=' and refereeid = ? ';
        //    sqlCount+=' and refereeid = ? ';
        //}

        if(param.searchText&&param.searchText!='') {
            values.push('%'+param.searchText+'%');

            sql+=' and ( aileName like ? ) ';
            sqlCount+=' and ( aileName like ?) ';
        }
        if(param.refereeid&&param.refereeid!=''){
            values.push('%'+param.refereeid+'%');

            sql+=' and ( refereeid like ? )';
            sqlCount+=' and refereeid like ? ';
        }
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
                    //pool.release();
                })

            } else {
                res.send({data:[],total:0});
            }
            //释放连接
            //connection.release();
        });
                //

    },
    updatePayMoney : function (req,res,payflag) {

        //获取前台页面传过来的参数
        var param = req.body;
        if(!param||param.length==0){
            res.status(500).send("数据错误.");
            return ;
        }
        var values = [payflag];
        var values2 = [];
        var sql = $sql.updateRefereeUser+"(";
        var sql2 = $sql.sumPayMoney+"(";

        for(var i=0; i<param.length;i++){
            sql += '?';
            sql2 += '?';
            values.push(param[i]);
            values2.push(param[i]);
            if(i!=(param.length-1)){
                sql += ',';
                sql2 += ','
            }
        }
        sql += ')';
        sql2 += ')';

        //xian
        //建立连接,向表里插入数据
        pool.query({sql :sql,values:values,timeout: 60000},function (err,result) {

            //console.log(err,result,a,b,path.join(__dirname, '../public/login.html'))
            if(err){
                console.log(err)
                res.status(500).send(err);
                return;
            }
            //以json形式,把操作结果返回给前台页面

            //释放连接
            //connection.release();
            //查询
            (function(res1,sqlS,data){
                pool.query({sql :sqlS,values:data,timeout: 60000},function(err,rows){
                    if(err){
                        console.log(err)
                        res.status(500).send(err);
                        return;
                    }
                    res1.send("合计金额:"+rows[0].totalearn);
                })
            })(res,sql2,values2);
        })

        //})

    }
};