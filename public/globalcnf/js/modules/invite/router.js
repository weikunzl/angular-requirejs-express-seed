define(function(){

    'use strict';
    	return {
    		stateId :'invite',
            config : {
                    url: '/invite',
                    templateUrl: 'js/modules/invite/views/invite.html',
                    controller: 'inviteController'
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