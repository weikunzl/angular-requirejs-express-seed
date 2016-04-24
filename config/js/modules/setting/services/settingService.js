/**
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
             //保存密码
             doSavePwd:function(data){
                return $http.post(config.host+"/login/doEditPwd",data);
            }
        }
    }]
})