/**
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
            getDeductList:function(data){
                return  $http.post(config.host+'/cfgdeduct/getDeductList',data);
            },
             doUpdatePayMoney:function(data){
                return  $http.post(config.host+'/cfgdeduct/updatePayMoney',data);
            },
             doUpdatePayMoneyNo:function(data){
                return  $http.post(config.host+'/cfgdeduct/updatePayMoneyNo',data);
            },
			
             doUpdatePayMoneyNo1:function(data){
                return  $http.post(config.host+'/cfgdeduct/updatePayMoneyNo1',data);
            }
        }
    }]
})