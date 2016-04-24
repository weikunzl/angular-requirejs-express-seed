define(function(){

    'use strict';
    	return {
    		stateId :'inviteUrl',
            config : {
                    url: '/inviteUrl',
                    templateUrl: 'js/modules/inviteUrl/views/inviteUrl.html',
                    controller: 'inviteUrlController'
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