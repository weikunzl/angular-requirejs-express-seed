/**
 * Created by WLxing on 16/3/28.
 */
//CURD SQL语句
var withdrawal = {
    //deductList : "SELECT * FROM CFG_OEPRE_DEDUCT_LIST WHERE refereeId = ? ",
    //countDeductList : "SELECT count(*) as total FROM CFG_OEPRE_DEDUCT_LIST WHERE refereeId = ? "
    //检查时间段内是否有记录生成.
    //升级类
    checkMoneyWithdrawal : "select count(*) as total from oepre_user_money where  actiontype = 1 and (optime between ? and ? ) ",
    getMoneyWithdrawal : "SELECT b.refereeid as refereeid ,a.userName as aileName,a.actionid as id ,a.amount as shoppingCost " +
    " ,a.actiontype as shoppingType,a.logcontent as logcontent, a.tyear as tyear,a.tmonth as tmonth"
    +"   ,  a.optime as shoppingTime ,ifnull(b.deductpc,0.1)*a.amount as earn "
    +" from ( "
    +" select t1.*,t2.userName  FROM (select i.* from oepre_user_money i where i.actiontype = 1 and (i.optime between ? and ?)  ) t1 ,oepre_user t2  where t1.userid = t2.userid) a , "
    +" oepre_user_status b  WHERE b.refereeid is not null and a.userid = b.userid ",
    //充值类
    checkPaymentWithdrawal : "select count(*) as total from oepre_payment_log where (addtime between ? and ? )  and paystatus=10 ",
    getPaymentWithdrawal : "SELECT b.refereeid as refereeid ,a.userName as aileName,a.paynum as id ,a.amount as shoppingCost,3 as shoppingType," //充值类型
    +" a.currency as logcontent, FROM_UNIXTIME(  a.addtime , '%Y' ) as tyear,FROM_UNIXTIME(  a.addtime , '%m' )  as tmonth"
    +"     ,a.addtime as shoppingTime ,ifnull(b.deductpc,0.1)*a.amount as earn "
    +" from ( "
    +" select t1.*,t2.userName  FROM (select i.* from oepre_payment_log i where (i.addtime between ? and ? ) and i.paystatus=10 ) t1 ,oepre_user t2  where t1.userid = t2.userid) a , "
    +" oepre_user_status b  WHERE b.refereeid is not null and a.userid = b.userid ",
    //礼物类
    checkGiftWithdrawal : "select count(*) as total from oepre_gift_record where flag = 1 and points >0 and (sendtimeline between ? and ? )",
    getGiftWithdrawal : "SELECT b.refereeid as refereeid ,a.userName as aileName,a.recordid as id ,a.shoppingCost as shoppingCost,2 as shoppingType," //充值类型
    +" a.giftid as logcontent, FROM_UNIXTIME(  a.shoppingTime , '%Y' ) as tyear,FROM_UNIXTIME(  a.shoppingTime , '%m' )  as tmonth"
    +"     ,a.shoppingTime as shoppingTime ,ifnull(b.deductpc,0.1)*a.shoppingCost as earn "
    +" from ( "
    +" select t1.*,t2.userName  FROM (select i.recordid as recordid, i.points as shoppingCost,i.touserid as userid,i.sendtimeline as shoppingTime,i.giftid as giftid from oepre_gift_record i " +
    "where i.flag = 1 and i.points >0 and (i.sendtimeline between ? and ? )) t1 ,oepre_user t2  where t1.userid = t2.userid) a , "
    +" oepre_user_status b  WHERE b.refereeid is not null and a.userid = b.userid ",
    //insertWithdrawal
    //    : "INSERT INTO cfg_oepre_deduct_list (id,aileName,earn,paycontent,payflag,refereeId,shoppingCost,shoppingTime,shoppingType,tyear,tmonth)" +
    //" VALUES (:id,:aileName,:earn,:paycontent,:payflag,:refereeId,:shoppingCost,:shoppingTime,:shoppingType,:tyear,:tmonth)"
    insertWithdrawal:"INSERT INTO cfg_oepre_deduct_list SET ? ",
    updateWithdrawal:"UPDATE cfg_oepre_deduct_list SET ? where id = ? and shoppingType = ? ",

    checkMoneyWithdrawalByIds : "select count(*) as total from oepre_user_money where actiontype = 1 and userid  in ",
    getMoneyWithdrawalByIds1 : "SELECT b.refereeid as refereeid ,a.userName as aileName,a.actionid as id ,a.amount as shoppingCost " +
    " ,a.actiontype as shoppingType,a.logcontent as logcontent, a.tyear as tyear,a.tmonth as tmonth"
    +"   ,  a.optime as shoppingTime ,ifnull(b.deductpc,0.1)*a.amount as earn "
    +" from ( "
    +" select t1.*,t2.userName  FROM (select i.* from oepre_user_money i where i.actiontype = 1 and  i.userid in " ,
    getMoneyWithdrawalByIds2 :" ) t1 ,oepre_user t2  where t1.userid = t2.userid) a , "
    +" oepre_user_status b  WHERE b.refereeid is not null and a.userid = b.userid ",
    checkPaymentWithdrawalByIds : "select count(*) as total from oepre_payment_log where paystatus=10 and userid in",
    getPaymentWithdrawalByIds1 : "SELECT b.refereeid as refereeid ,a.userName as aileName,a.paynum as id ,a.amount as shoppingCost,3 as shoppingType," //充值类型
    +" a.currency as logcontent, FROM_UNIXTIME(  a.addtime , '%Y' ) as tyear,FROM_UNIXTIME(  a.addtime , '%m' )  as tmonth"
    +"     ,a.addtime as shoppingTime ,ifnull(b.deductpc,0.1)*a.amount as earn "
    +" from ( "
    +" select t1.*,t2.userName  FROM (select i.* from oepre_payment_log i where i.userid in " ,
    getPaymentWithdrawalByIds2:" and i.paystatus=10 ) t1 ,oepre_user t2  where t1.userid = t2.userid) a , "
    +" oepre_user_status b  WHERE b.refereeid is not null and a.userid = b.userid ",
    //礼物
    checkGiftWithdrawalByIds : "select count(*) as total from oepre_gift_record where  flag = 1 and points >0 and touserid in ",
    getGiftWithdrawalByIds1 : "SELECT b.refereeid as refereeid ,a.userName as aileName,a.recordid as id ,a.shoppingCost as shoppingCost,2 as shoppingType," //充值类型
    +" a.giftid as logcontent, FROM_UNIXTIME(  a.shoppingTime , '%Y' ) as tyear,FROM_UNIXTIME(  a.shoppingTime , '%m' )  as tmonth"
    +"     ,a.shoppingTime as shoppingTime ,ifnull(b.deductpc,0.1)*a.shoppingCost as earn "
    +" from ( "
    +" select t1.*,t2.userName  FROM " +
    "(select i.recordid as recordid ,i.points as shoppingCost,i.touserid as userid,i.sendtimeline as shoppingTime,i.giftid as giftid from oepre_gift_record i " +
    " where i.flag = 1 and i.points >0 and i.touserid in " ,
    getGiftWithdrawalByIds2 :" ) t1 ,oepre_user t2  where t1.userid = t2.userid) a , "
    +" oepre_user_status b  WHERE b.refereeid is not null and a.userid = b.userid "
};
module.exports = withdrawal;