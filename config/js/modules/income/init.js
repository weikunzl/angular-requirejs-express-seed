define([
    'angular'
    //控制器

    ,'js/config'
    ,'js/modules/income/controllers/incomeController'
    ,'js/modules/income/services/incomeService'
    //,'income/directives/incomeDirective'

  //  , 'angular-resource'

], function(angular,config, incomeController,incomeService){
    'use strict';
    
    var incomeModule = angular.module('rwmgt.income', []);
//console.log(employeeListCtrl)
    incomeModule.filter('mapPayStatus', ['incomeService',function(incomeService) {

        var payStatusHash = incomeService.payStatusHash
        return function(input) {
            if (!input&&input!==0){
                return '';
            } else {
                return payStatusHash[input];
            }
        };
    }]);
    incomeModule.controller('incomeController', incomeController);

    incomeModule.service('incomeService', incomeService);

    return incomeModule;
});