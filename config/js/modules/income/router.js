define(function(){

    'use strict';
    	return {
    		stateId :'income',
            config : {
                    url: '/income',
                    templateUrl: 'js/modules/income/views/income.html',
                    controller: 'incomeController'
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