define([
    'angular'
    //控制器

    ,'js/config'
    ,'js/modules/invite/controllers/inviteController'
    ,'js/modules/invite/services/inviteService'
    //,'invite/directives/inviteDirective'

  //  , 'angular-resource'

], function(angular,config, inviteController,inviteService){
    'use strict';
    
    var inviteModule = angular.module('rwmgt.invite', ['ui.grid','ui.grid.pagination','ui.grid.selection']);
//console.log(employeeListCtrl)
    inviteModule.controller('inviteController', inviteController);

    inviteModule.service('inviteService', inviteService);
inviteModule.filter('mapDecType', function() {
        
        return function(input) {
            if (!input){
                return '10%';
            } else {
                return parseFloat(input)*100+"%";
            }
        };
    });
    return inviteModule;
});