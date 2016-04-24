/**
 * Created by wei
 *
 */
define(function(){
    'use strict';

    return ['$scope','settingService'
        , function($scope,settingService){

            $scope.doSavePwd = function(){
                if( $scope.data.newPwd!=$scope.newPwd2){
                    alert("密码不一致")
                    return ;
                }
                settingService.doSavePwd( $scope.data).success(function(response){
                    alert("修改成功");
                    $scope.data = {};
                    $scope.newPwd2 = null;
                }).error(function(response,status){
                    alert(response);
                });
            }
        	

    }]
})