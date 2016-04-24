/**
 * Created by WLxing on 16/3/28.
 */
//CURD SQL语句
var user = {
    insert : "INSERT INTO cfg_oepre_deduct_user (userid,userName,password) VALUES (?,?,?)",
    getUserByUserNameAndPwd : 'SELECT * FROM cfg_oepre_deduct_user WHERE userid = ? and password = ?',
    updatePwd:"UPDATE cfg_oepre_deduct_user SET password = ? WHERE password = ? and userid = ?",
    getUserByUserId : 'SELECT * FROM cfg_oepre_deduct_user WHERE userid = ? ',
    updateBank:"UPDATE cfg_oepre_deduct_user SET ? WHERE userid = ?",
    checkPayMoney:'SELECT count(*) as total FROM cfg_oepre_deduct_list WHERE refereeid = ? and tyear = ? and tmonth = ? and payflag = 0 ',
    applyPayMoney:'update cfg_oepre_deduct_list set payflag = 1 where refereeid = ? and tyear = ? and tmonth = ?'
};
module.exports = user;