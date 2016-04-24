/**
 * Created by WLxing on 16/3/28.
 */
//CURD SQL语句
var deduct = {
    //deductList : "SELECT * FROM CFG_OEPRE_DEDUCT_LIST WHERE refereeId = ? ",
    //countDeductList : "SELECT count(*) as total FROM CFG_OEPRE_DEDUCT_LIST WHERE refereeId = ? "
    deductList : "SELECT aileName as aileName,shoppingCost as shoppingCost,shoppingType as shoppingType,logcontent as logcontent," +
    "shoppingTime*1000 as shoppingTime ,earn as earn ,payflag as payflag" +//提成计算
    " FROM cfg_oepre_deduct_list where  refereeid = ? ",
    countDeductList : "SELECT count(*) as total FROM cfg_oepre_deduct_list WHERE refereeid = ? ",
    sumPayMoney:'SELECT sum(earn) as totalearn FROM cfg_oepre_deduct_list WHERE refereeid = ? and payflag = ? ',

};
module.exports = deduct;