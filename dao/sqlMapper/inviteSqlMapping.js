/**
 * Created by WLxing on 16/3/28.
 */
//CURD SQL语句
var invite = {
    inviteList : "select a.userid as userid,b.userName as userName,a.regtime*1000 as regTime" +
    ",a.logintime*1000 as lastLoginTime,a.logintimes as loginTimes" +
    " from oepre_user_status a, oepre_user b where a.refereeid = ?" +
    " and a.userid = b.userid  ",
    countInviteList :"select count(a.userid)" +
    " from oepre_user_status a, oepre_user b where a.refereeid = ?" +
    " and a.userid = b.userid  "
};
module.exports = invite;