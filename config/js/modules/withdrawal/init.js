define([
    'angular'
    //控制器

    ,'js/config'
    ,'js/modules/withdrawal/controllers/withdrawalController'
    ,'js/modules/withdrawal/services/withdrawalService'
    ,'angular-clipboard'
    //,'withdrawal/directives/withdrawalDirective'

  //  , 'angular-resource'

], function(angular,config, withdrawalController,withdrawalService){
    'use strict';
    var withdrawalModule = angular.module('rwmgt.withdrawal', ['angular-clipboard']);
//console.log(employeeListCtrl)
    withdrawalModule.controller('withdrawalController', withdrawalController);

    withdrawalModule.service('withdrawalService', withdrawalService);

    return withdrawalModule;
});