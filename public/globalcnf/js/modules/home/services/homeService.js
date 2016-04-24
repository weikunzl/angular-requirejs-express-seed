/**
 * Created by wei
 *
 */
define(function(){
    'use strict';


    return ['$http', function($http){
    	 return {
            test:function(){
                return $http.get("books1.json");
            }
        }
    }]
})