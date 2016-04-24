/**
 * Created by WLxing on 16/3/28.
 */
//实现MySQL交互
var mysql = require('mysql');

//使用连接池,提高性能
var pool = require('../conf/pool').init();
var $sql = require('./sqlMapper/withdrawalSqlMapping');

var path = require('path');

module.exports = {
    /**
     *
     * @param param
     *          startTime(long)/1000
     *          endTime(long)/1000
     */
    checkMoneyDeduct : function (param) {
        console.log(1);
        //var id = req.session.user.userid;// 为了拼凑正确的sql语句，这里要转下整数
        //.getConnection(function (err,connection) {
            var sqlObj = {
                sql :$sql.checkMoneyWithdrawal,
                values : [param['startTime'],param['endTime']],
                timeout : 60000
            };
            pool.query(sqlObj,function (err,rows) {
                //console.log(sqlObj);
                if(err){
                    console.error(err);
                    //connection.release();
                    return ;
                }
                if(rows[0].total>0) {
                    (function(sqlObjIn,fn){
                        fn(sqlObjIn);
                    })(sqlObj,module.exports.updateMoneyDeduct);
                } else {
                    console.log("updateMoneyDeduct 没数据");
                    //connection.release();
                }

            })
        //})
    },
    updateMoneyDeduct:function(sqlObj){
        console.log(2);
        sqlObj.sql = $sql.getMoneyWithdrawal;
        pool.query(sqlObj,function (err,rows) {
            if(err){
                console.error(err);
                //connection.release();
                return ;
            }
            if(rows.length>0) {
                (function(sqlObjIn,fn,data){
                    fn(data);
                })(sqlObj,module.exports.saveDeduct,rows);
            } else {
                console.log("updateMoneyDeduct 没数据");
                //connection.release();
            }

        })
    },
    checkPaymentDeduct : function (param) {
        console.log(4);
        //pool.getConnection(function (err,connection) {
            var sqlObj = {
                sql :$sql.checkPaymentWithdrawal,
                values : [param['startTime'],param['endTime']],
                timeout : 60000
            };
            pool.query(sqlObj,function (err,rows) {
                if(err){
                    console.error(err);
                    //connection.release();
                    return ;
                }
                if(rows.length>0) {
                    (function(sqlObjIn,fn){
                        fn(sqlObjIn);
                    })(sqlObj,module.exports.updatePaymentDeduct);
                } else {
                    console.log("updatePaymentDeduct 没数据");
                    //connection.release();
                }

            })
        //})
    },
    updatePaymentDeduct:function(sqlObj){
        console.log(5);
        sqlObj.sql = $sql.getPaymentWithdrawal;
        pool.query(sqlObj,function (err,rows) {
            if(err){
                console.error(err);
                //connection.release();
                return ;
            }
            if(rows.length>0) {
                (function(sqlObjIn,fn,data){
                    fn(data);
                })(sqlObj,module.exports.saveDeduct,rows);

            } else {
                console.log("updatePaymentDeduct 没数据");
                //connection.release();
            }

        })
    },
    //根据列更新
    updateMoneyDeductByIds:function(ids){
        if(!ids||ids.length<1){
            return;
        }
        var values = []
        var sql =$sql.checkMoneyWithdrawalByIds +" ( ";
        for(var i=0; i<ids.length;i++){
            sql += '?'
            values.push(ids[i]);
            if(i!=(ids.length-1)){
                sql += ','
            }
        }
        sql += " ) ";
        var sqlObj = {
            sql : sql,
            values :values,
            timeout : 60000
        };
        pool.query(sqlObj,function (err,rows) {
            if(err){
                console.error(err);
                //connection.release();
                return ;
            }
            if(rows.length>0) {
                (function(sqlObjIn){
                    var values2 = [];
                    var sqlObjT  = sqlObjIn;
                    var sql =$sql.getMoneyWithdrawalByIds1 +" ( ";
                    for(var i=0; i<ids.length;i++){
                        sql += '?'
                        values2.push(ids[i]);
                        if(i!=(ids.length-1)){
                            sql += ','
                        }
                    }
                    sql += " ) "+$sql.getMoneyWithdrawalByIds2;
                    sqlObjT.sql =sql
                    sqlObjT.values = values2;
                    sqlObjT.timeout = 60000;
                    pool.query(sqlObjT,function (err,rowsin) {
                        if(err){
                            console.error(err);
                            //connection.release();
                            return ;
                        }
                        if(rowsin.length>0) {
                            (function(sqlObjIn,fn,data){
                                fn(data);
                            })(sqlObj,module.exports.saveDeduct,rowsin);

                        } else {
                            console.log("updatePaymentDeduct 没数据");
                            //connection.release();
                        }

                    })
                })(sqlObj);
            } else {
                console.log("updateMoneyDeduct 没数据");
                //connection.release();
            }

        })
    },
    //根据列更新
    updatePaymentDeductByIds:function(ids){
        if(!ids||ids.length<1){
            return;
        }
        var values = [];
        var sql =$sql.checkPaymentWithdrawalByIds +" ( ";
        for(var i=0; i<ids.length;i++){
            sql += '?'
            values.push(ids[i]);
            if(i!=(ids.length-1)){
                sql += ','
            }
        }
        sql += " ) ";
        var sqlObj = {
           sql : sql,
            values :ids,
            timeout : 60000
        };
        pool.query(sqlObj,function (err,rows) {
            if(err){
                console.error(err);
                //connection.release();
                return ;
            }
            if(rows.length>0) {
                (function(sqlObjIn){
                    var sqlObjT  = sqlObjIn;
                    var sql =$sql.getPaymentWithdrawalByIds1 +" ( ";
                    for(var i=0; i<ids.length;i++){
                        sql += '?'
                        values.push(ids[i]);
                        if(i!=(ids.length-1)){
                            sql += ','
                        }
                    }
                    sql += " ) "+$sql.getPaymentWithdrawalByIds2;
                    sqlObjT.sql =sql
                    pool.query(sqlObjT,function (err,rowsin) {
                        if(err){
                            console.error(err);
                            //connection.release();
                            return ;
                        }
                        if(rowsin.length>0) {
                            (function(sqlObjIn,fn,data){
                                fn(data);
                            })(sqlObj,module.exports.saveDeduct,rowsin);

                        } else {
                            console.log("updatePaymentDeduct 没数据");
                            //connection.release();
                        }

                    })
                })(sqlObj);
            } else {
                console.log("updateMoneyDeduct 没数据");
                //connection.release();
            }

        })
    },

    //礼物

    checkGiftDeduct : function (param) {
        console.log(4);
        //pool.getConnection(function (err,connection) {
        var sqlObj = {
            sql :$sql.checkGiftWithdrawal,
            values : [param['startTime'],param['endTime']],
            timeout : 60000
        };
        pool.query(sqlObj,function (err,rows) {
            if(err){
                console.error(err);
                //connection.release();
                return ;
            }
            if(rows.length>0) {
                (function(sqlObjIn,fn){
                    fn(sqlObjIn);
                })(sqlObj,module.exports.updateGiftDeduct);
            } else {
                console.log("updatePaymentDeduct 没数据");
                //connection.release();
            }

        })
        //})
    },
    updateGiftDeduct:function(sqlObj){
        sqlObj.sql = $sql.getGiftWithdrawal;
        pool.query(sqlObj,function (err,rows) {
            if(err){
                console.error(err);
                //connection.release();
                return ;
            }
            if(rows.length>0) {
                (function(sqlObjIn,fn,data){
                    fn(data);
                })(sqlObj,module.exports.saveDeduct,rows);

            } else {
                console.log("updatePaymentDeduct 没数据");
                //connection.release();
            }

        })
    },
    //根据列更新
    updateGiftDeductByIds:function(ids){
        if(!ids||ids.length<1){
            return;
        }
        var values = []
        var sql =$sql.checkGiftWithdrawalByIds +" ( ";
        for(var i=0; i<ids.length;i++){
            sql += '?'
            values.push(ids[i]);
            if(i!=(ids.length-1)){
                sql += ','
            }
        }
        sql += " ) ";
        var sqlObj = {
            sql : sql,
            values :values,
            timeout : 60000
        };
        pool.query(sqlObj,function (err,rows) {

            console.log(sql,values)
            if(err){
                console.error(err);
                //connection.release();
                return ;
            }
            if(rows.length>0) {
                (function(sqlObjIn){
                    var values2 = [];
                    var sqlObjT  = sqlObjIn;
                    var sql =$sql.getGiftWithdrawalByIds1 +" ( ";
                    for(var i=0; i<ids.length;i++){
                        sql += '?'
                        values2.push(ids[i]);
                        if(i!=(ids.length-1)){
                            sql += ','
                        }
                    }
                    sql += " ) "+$sql.getGiftWithdrawalByIds2;
                    sqlObjT.sql =sql;
                    sqlObjT.values = values2;
                    sqlObjT.timeout = 60000;
                    pool.query(sqlObjT,function (err,rowsin) {
                        if(err){
                            console.error(err);
                            //connection.release();
                            return ;
                        }
                        if(rowsin.length>0) {
                            (function(sqlObjIn,fn,data){
                                fn(data);
                            })(sqlObj,module.exports.saveDeduct,rowsin);

                        } else {
                            console.log("updatePaymentDeduct 没数据");
                            //connection.release();
                        }

                    })
                })(sqlObj);
            } else {
                console.log("updateMoneyDeduct 没数据");
                //connection.release();
            }

        })
    },
    saveDeduct : function(data){
        console.log(6);
        data.forEach(function(item){
            var sqlUp = {
                sql : $sql.updateWithdrawal,
                values : [item,item.id,item.shoppingType],
                timeout : 60000
            }
            pool.query(sqlUp,function (err,rows) {
                if(err){//更新
                    console.error(err);
                    return;
                }
                if(rows.affectedRows==0){//更新失败
                    var sqlObj = {
                        sql : $sql.insertWithdrawal,
                        values : item,
                        timeout : 60000
                    };
                    pool.query(sqlObj,function (err,rows) {
                        if(err) {
                            //console.log(err,err.errno)
                            if(err.errno == 1062){

                            }else{
                                console.error(err);
                                //connection.release();
                                return;
                            }
                        }
                        //connection.release();
                    })
                }else{
                    //console.log("");
                }
            })

        })
    }
};