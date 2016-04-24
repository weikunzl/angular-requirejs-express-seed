/**
 * Created by wei
 *
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
             getInviteList:function(data){
                 return  $http.post(config.host+'/invite/getInviteList',data);
            }
        }
    }]
})