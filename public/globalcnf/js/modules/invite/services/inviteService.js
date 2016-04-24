/**
 * Created by wei
 *
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
             getInviteList:function(data){
                 return  $http.post(config.host+'/cfginvite/getInviteList',data);
            },
             doGetRefereeUsers:function(data){
                 return  $http.post(config.host+'/cfginvite/getRefereeUsers',data);
            },
             doUpdateRefereeUser:function(data){
                 return  $http.post(config.host+'/cfginvite/updateRefereeUser',data);
            }
        }
    }]
});