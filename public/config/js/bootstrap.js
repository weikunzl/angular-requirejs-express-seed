define(['require',
    'angular',
    'js/config',
   // 'js/app',
    'js/common/loader',
   'js/common/menu/appMenuDirective',
    'ui-grid'
    // 'router'
],function(require,angular,config,loader){
    'use strict';
    var deps = ['domReady!','js/app',
        'angular-cookies',
        'angular-translate',
        'angular-translate-loader-static-files',
        'ui-grid',
    ].concat(loader.loadModules(config.modules));
    var depsAll = deps.concat(loader.loadRouteRules(config.modules));
    require(depsAll,function(document,app){
        var modules = [];

        for(var index = 6; index < deps.length; index++){
            modules.push(arguments[index]);
        }
        var routers = [];
        for(var index2=deps.length;index2<depsAll.length;index2++){
            routers.push(arguments[index2]);
        }
        app.init(modules,routers);
        angular.bootstrap(document,['rwmgt']);
        //$('html').addClass('ng-app:rwmgt');
    });
});