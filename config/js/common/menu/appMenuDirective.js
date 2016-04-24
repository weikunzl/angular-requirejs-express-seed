
/*global define*/
define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
    .module('appMenuDirectiveModule',[])
    .directive('appMenu', function() {

      var link = function(scope, element, attribs) {
        

      }

      return {
        restrict: 'E',
        scope: {
        },
        replace:true,
        templateUrl: 'js/common/menu/navigation.html',
        link: link,
        controller:['$http','$rootScope','$scope',function($http,$rootScope,$scope){
          $http.get(config.host+'/login/getUser').success(function(response){
            $rootScope.user = response;
            $scope.user = response;
          }).error(function(){
            location.href = '/config/login.html';
          })
        }]
      };
    });
  }
);