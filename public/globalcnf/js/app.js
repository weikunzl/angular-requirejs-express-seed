define([
		"angular",
		"ui-router",
        "ocLazyLoad",
        "js/common/menu/appMenuDirective",
        'ui.bootstrap',
        'js/config',
       ],function(angular){


    return {
        init :function(modules,routers){
            //console.log(routers)
            var deps =['ui.router','ui.bootstrap','oc.lazyLoad','appMenuDirectiveModule','ngCookies', 'pascalprecht.translate','ui.grid',
        'angular-loading-bar'];
            for(var index in modules){
                deps.push(modules[index].name);
            }

            var mainModule = angular.module('rwmgt',deps).run([ '$rootScope', '$state', '$stateParams','$http',
                function ($rootScope, $state, $stateParams,$http) {
                    $http.get(config.userhost+'/login/getUser').success(function(response){
                        $rootScope.user = response;
                    }).error(function(){
                        location.href = config.host+'/login.html';
                    })
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]).config(['$ocLazyLoadProvider','$stateProvider', '$urlRouterProvider','$translateProvider','$httpProvider', function($ocLazyLoadProvider,$stateProvider, $urlRouterProvider,$translateProvider,$httpProvider) {
                $httpProvider.interceptors.push([function() {
                    return {
                        'response': function(response){
                            if (response.status > 300) {
                                if (response.status == 420) {
                                    location.href = config.host+'/login.html';
                                    return;
                                }

                                return response;
                            }else{
                                return response;
                            }
                        }
                    }
                }]);

                //$translateProvider.preferredLanguage(window.localStorage.lang||'zh_CN');
                //$translateProvider.useStaticFilesLoader({
                //      prefix: config.host+'/js/i18n/',
                //      suffix: '.json'
                //    });
                $ocLazyLoadProvider.config({
                     debug: true
                 });
                $urlRouterProvider.otherwise('/deduct/1');
                //路由配置
                stateConfig(0,routers,$stateProvider)
                function stateConfig(index,configAry,stateProvider){
                    if(index==configAry.length){
                            return;
                    }
                    var item = configAry[index++];
                    stateConfig(index,configAry,stateProvider
                            .state(item.stateId,item.config));    
                    
                }
                
            }]).controller('translateCtrl',function(){});
//            if(!ngGrid.config){
//                ngGrid.config = {i18n : 'zh-cn'};
//            }

        }
    }
})