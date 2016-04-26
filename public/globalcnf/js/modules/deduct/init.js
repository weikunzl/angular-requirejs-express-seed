define([
    'angular'
    //控制器

    ,'js/config'
    ,'js/modules/deduct/controllers/deductController'
    ,'js/modules/deduct/services/deductService'
    //,'deduct/directives/deductDirective'

  //  , 'angular-resource'

], function(angular,config, deductController,deductService){
    'use strict';

    var deductModule = angular.module('rwmgt.deduct', ['ui.grid','ui.grid.pagination','ui.grid.selection']);
//console.log(employeeListCtrl)
    deductModule.controller('deductController', deductController);

    deductModule.service('deductService', deductService);

    //filter
    deductModule.filter('mapShoppingType', function() {
        var shoppingTypeHash = {
            1: '充值',
            2: '升级',
            3:'充值',
            4:'礼物'
        };

        return function(input) {
            if (!input){
                return '';
            } else {
                return shoppingTypeHash[input];
            }
        };
    });
    deductModule.filter('mapPayflag', function() {
        var shoppingTypeHash = {
            0: '未提现',
            1: '等待确认',
            2: '已支付',
            3:'拒绝支付'
        };

        return function(input) {
            if (!input&&input!==0){
                return '';
            } else {
                return shoppingTypeHash[input];
            }
        };
    });
    return deductModule;
});