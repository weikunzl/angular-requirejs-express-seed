define(function(){

    'use strict';
    	return {
    		stateId :'deduct',
            config : {
                    url: '/deduct/:page',
                    templateUrl: 'js/modules/deduct/views/deduct.html',
                    controller: 'deductController'
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