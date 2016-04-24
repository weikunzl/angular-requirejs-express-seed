/**
 * Created by WLxing on 16/3/28.
 */
//实现MySQL交互
var $sql = require('./sqlMapper/inviteSqlMapping');

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

            var param = req.body;
            var sql = $sql.inviteList;
            var sqlCount = $sql.countInviteList;
            var values = [req.session.user.userid];
            if(param.regDateE&&param.regDateS) {
                values.push(param.regDateS);
                values.push(param.regDateE);
                sql+=' and ( a.regtime between ? and ?) ';
                sqlCount+=' and ( a.regtime between ? and ?) ';
            }
            if(param.searchText&&param.searchText!='') {
                values.push('%'+param.searchText+'%');

                sql+=' and ( b.userName like ? ) ';
                sqlCount+=' and ( b.userName like ? ) ';
            }
            sql += ' limit ?,?';
            values.push((param.pageNumber-1)*param.pageSize)
            values.push(param.pageSize)

            //建立连接,向表里插入数据
            pool.query({sql :sql,values:values,timeout: 60000},function (err,rows) {
                console.log(rows)
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
        })(req,res)

    }
};