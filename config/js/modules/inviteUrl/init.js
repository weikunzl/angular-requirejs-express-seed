define([
    'angular'
    //控制器

    ,'js/config'
    ,'js/modules/inviteUrl/controllers/inviteUrlController'
    ,'js/modules/inviteUrl/services/inviteUrlService'
    //,'inviteUrl/directives/inviteUrlDirective'

  //  , 'angular-resource'

], function(angular,config, inviteUrlController,inviteUrlService){
    'use strict';
    
    var inviteUrlModule = angular.module('rwmgt.inviteUrl', []);
//console.log(employeeListCtrl)
    inviteUrlModule.controller('inviteUrlController', inviteUrlController);

    inviteUrlModule.service('inviteUrlService', inviteUrlService);

    return inviteUrlModule;
});