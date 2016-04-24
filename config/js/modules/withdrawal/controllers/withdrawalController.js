/**
 */
define(function(){
    'use strict';

    return ['$scope','$uibModal','withdrawalService'
        , function($scope,$uibModal,withdrawalService){

            $scope.monthAry = [1,2,3,4,5,6,7,8,9,10,11,12];
            $scope.monthSelect = $scope.monthAry[(new Date().getMonth()-1)];
            $scope.yearAry = [];
            var tYear = new Date().getYear()+1900;
            $scope.yearAry.push(tYear);
            for(var nYear = tYear-1;nYear>2013;nYear-- ){
                $scope.yearAry.push(nYear);
            }
            $scope.yearSelect = $scope.yearAry[0];
            $scope.freshPerson = function (){
                withdrawalService.doGetUserBankInfo().success(function(response){
                    $scope.person = response;
                })
            }
            $scope.freshPerson();
            $scope.open = function(){
                $scope.tmpPerson = angular.copy($scope.person);
                $scope.modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'js/modules/withdrawal/views/bank_modal.html',
                    //size: size,
                    scope: $scope
                });

                $scope.modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            }
            $scope.ok = function () {
                withdrawalService.doUpdateUser($scope.tmpPerson).success(function(response){
                    $scope.person = angular.copy($scope.tmpPerson);
                    $scope.freshPerson();
                    $scope.modalInstance.close();
                })
            };

            $scope.cancel = function () {
                $scope.tmpPerson = null;
                $scope.modalInstance.dismiss('cancel');
            };


            $scope.applyPayMoney = function(){

                if(!$scope.monthSelect||!$scope.yearSelect){
                    alert("请填写结算时间");
                    return ;
                }
                withdrawalService.applyPayMoney({
                    tyear :$scope.yearSelect,
                    tmonth : $scope.monthSelect
                }).success(function(response){
                    alert(response);
                    //$scope.person = angular.copy($scope.tmpPerson);
                    //$scope.freshPerson();
                    //$scope.modalInstance.close();
                })
            }
    }]
})