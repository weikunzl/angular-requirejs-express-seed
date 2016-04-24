define(function(){

    'use strict';
    	return {
    		stateId :'home',
            config : {
                    url: '/home',
                    templateUrl: 'js/modules/home/views/home.html',
                    controller: 'homeController'
                    //  resolve: {
                    //     loadPlugin: function ($ocLazyLoad) {
                    //         return $ocLazyLoad.load([
                    //             {
                    //                 name: 'test',
                    //                 files: []
                    //             }
                    //         ]);
                    //     }
                    // }
                }
    	};
})