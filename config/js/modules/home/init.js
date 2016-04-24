define([
    'angular'
    //控制器

    ,'js/config'
    ,'js/modules/home/controllers/homeController'
    ,'js/modules/home/services/homeService'
    //,'home/directives/homeDirective'

  //  , 'angular-resource'

], function(angular,config, homeController,homeService){
    'use strict';
    
    var homeModule = angular.module('rwmgt.home', []);
//console.log(employeeListCtrl)
    homeModule.controller('homeController', homeController);

    homeModule.service('homeService', homeService);

    return homeModule;
});