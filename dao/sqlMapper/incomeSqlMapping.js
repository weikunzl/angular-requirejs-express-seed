/**
 * Created by WLxing on 16/3/28.
 */
//CURD SQL语句
var income = {
    //充值时间/充值金额/货币类型/支付类型/充值状态S
    incomeList : "select  t.userid as userid,t.userName as userName ,p.addtime*1000 as addTime,p.amount as amount" +
    ",p.currency as currency,p.paymentid as paymentId ,p.paystatus as payStatus" +
    " from (select a.userid as userid,b.userName as userName" +
    " from oepre_user_status a, oepre_user b where a.refereeid = ?" +
    " and a.userid = b.userid ) t ,oepre_payment_log p where t.userid = p.userid",
    countIncomeList :"select  count(*) as total" +
    " from (select a.userid as userid,b.userName as userName" +
    " from oepre_user_status a, oepre_user b where a.refereeid = ?" +
    " and a.userid = b.userid ) t ,oepre_payment_log p where t.userid = p.userid"
};
module.exports = income;