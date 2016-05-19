/**
 * Created by WLxing on 16/3/28.
 */
//CURD SQL语句
var invite = {
    inviteList : "select a.refereeid as refereeid ,a.userid as userid,b.userName as userName,a.regtime*1000 as regTime" +
    ",a.logintime*1000 as lastLoginTime,a.logintimes as loginTimes,a.deductpc as deductpc " +
    " from oepre_user_status a, oepre_user b where" +
    " a.userid = b.userid  ",
    countInviteList :"select count(a.userid)" +
    " from oepre_user_status a, oepre_user b where " +
    " a.userid = b.userid  ",

    reInviteList : "select * " +
    " from cfg_oepre_deduct_user where" +
    " (roleId is null or roleId != 9 )",
    countReInviteList :"select count(userid)" +
    " from cfg_oepre_deduct_user where " +
    " (roleId is null or roleId != 9 )",
    updateRefereeUser :"update " +
    " oepre_user_status set refereeid = ?, deductpc = ? where userid in "
};
module.exports = invite;