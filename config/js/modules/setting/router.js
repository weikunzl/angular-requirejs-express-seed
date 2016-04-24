define(function(){

    'use strict';
    	return {
    		stateId :'setting',
            config : {
                    url: '/setting',
                    templateUrl: 'js/modules/setting/views/setting.html',
                    controller: 'settingController'
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