define([
    'angular'
    //控制器

    ,'js/config'
    ,'js/modules/setting/controllers/settingController'
    ,'js/modules/setting/services/settingService'
    //,'setting/directives/settingDirective'

  //  , 'angular-resource'

], function(angular,config, settingController,settingService){
    'use strict';
    
    var settingModule = angular.module('rwmgt.setting', []);
//console.log(employeeListCtrl)
    settingModule.controller('settingController', settingController);

    settingModule.service('settingService', settingService);

    return settingModule;
});