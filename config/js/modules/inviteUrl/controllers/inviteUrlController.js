/**
 * Created by wei
 *
 */
define(function(){
    'use strict';

    return ['$scope','$rootScope','clipboard','$http'
        , function($scope,$rootScope,clipboard,$http){
            if(!$rootScope.user){
                //重新验证
                $http.get('/login/getUser').success(function(response){
                    $rootScope.user = response;
                    $scope.user = response;
                    $scope.shareUrl = 'http://charmmeet.com/config/share/'+$rootScope.user.userid;
                }).error(function(){
                    location.href = '/config/login.html';
                })
            }else{
                $scope.user = $rootScope.user;
                $scope.shareUrl = 'http://charmmeet.com/config/share/'+$rootScope.user.userid;
            }

        	$scope.doCoypUrl = function(err){

                if(!err){
                    clipboard.copyText($scope.shareUrl);

                    alert("已经复制到粘贴板!你可以使用Ctrl+V 贴到需要的地方去了哦!");

                }else{

                    alert("您的浏览器不支持此复制功能，请选中相应内容并使用Ctrl+C进行复制!");

                }

            }

    }]
})