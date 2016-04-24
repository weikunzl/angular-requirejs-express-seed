/**
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
             doGetUserBankInfo:function(){
                return $http.get(config.host+"/withdrawal/doGetUserBankInfo");
            },
             doUpdateUser:function(data){
                 return $http.post(config.host+"/withdrawal/doUpdateUser",data);
             },
             applyPayMoney:function(data){
                 return $http.post(config.host+"/withdrawal/doApplyPayMoney",data);
             }
        }
    }]
})