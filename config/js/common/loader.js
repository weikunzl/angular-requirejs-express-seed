
define(function(){
    'use strict';

    //处理要加载的模块的配置文件地址
    var loadModules = function(directorys){
        var deps = [];

        for(var key in directorys){
            deps.push('js/modules/' +directorys[key] + '/init');
        }

        return deps;
    };

   var loadRouteRules = function(directorys){
       var deps = [];

       for(var key in directorys){
           deps.push('js/modules/' +directorys[key] + '/router');
       }

       return deps;
   };

    return {
        loadModules: loadModules
       , loadRouteRules: loadRouteRules
    };
});