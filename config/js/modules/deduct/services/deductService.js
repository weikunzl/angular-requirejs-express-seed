/**
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
            getDeductList:function(data){
                return  $http.post(config.host+'/deduct/getDeductList',data);
            },
             sumNoPayment:function(data){
                return  $http.post(config.host+'/deduct/sumNoPayment',data);
            },
             sumWaitPayment:function(data){
                return  $http.post(config.host+'/deduct/sumWaitPayment',data);
            }
        }
    }]
})