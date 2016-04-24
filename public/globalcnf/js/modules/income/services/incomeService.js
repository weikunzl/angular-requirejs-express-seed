/**
 * Created by wei
 *
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
             getIncomeList:function(data){
                 return  $http.post(config.host+'/income/getIncomeList',data);
             },
             payStatusHash : {
                 0: '未支付',
                 10: '支付完成'
             }
        }
    }]
})