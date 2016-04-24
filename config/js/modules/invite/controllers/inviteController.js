/**
 * Created by wei
 *
 */
define(function(){
    'use strict';

    return ['$scope','inviteService','$stateParams','uiGridConstants','i18nService'
        , function($scope,inviteService,$stateParams,uiGridConstants,i18nService){

            i18nService.setCurrentLang('zh-cn');
            //$scope.monthAry = ['已认证','未认证'];
            if(!$stateParams.page){
                $stateParams.page=1
            }
            var paginationOptions = {
                pageNumber: $stateParams.page,
                pageSize: 25,
                sort: null
            };
            $scope.gridOptions = {
                enableSorting: true,
                paginationPageSizes: [25, 50, 75,100],
                paginationPageSize: 25,
                columnDefs: [
                    { name:'别名', field: 'userName' ,enableCellEdit:false},
                    { name:'登录次数', field: 'loginTimes',enableCellEdit:false },
                    { name:'最后登录时间', field: 'lastLoginTime',type:'date',cellFilter:"date:'yyyy-MM-dd HH:mm:ss'",enableCellEdit:false },
                    { name:'注册时间', field: 'regTime',type:'date',cellFilter:"date:'yyyy-MM-dd HH:mm:ss'",enableCellEdit:false}
                ],
                data : [
                ],
                useExternalPagination : true,
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                    $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                        if (sortColumns.length == 0) {
                            paginationOptions.sort = null;
                        } else {
                            paginationOptions.sort = sortColumns[0].sort.direction;
                        }
                        getPage();
                    });
                    gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                        paginationOptions.pageNumber = newPage;
                        paginationOptions.pageSize = pageSize;
                        $stateParams.page = newPage;
                        getPage(paginationOptions);
                    });
                }
            };

            var getPage = function(paramData1) {
                var paramData = paramData1;
                if($scope.regDateE&&$scope.regDateS){
                    paramData.regDateE = $scope.regDateE.getTime()/1000;
                    paramData.regDateS = $scope.regDateS.getTime()/1000;
                }
                if($scope.searchText){
                    paramData.searchText = $scope.searchText;
                }else{
                    paramData.searchText = null;
                }
                inviteService.getInviteList(paramData).success(function (response) {
                    $scope.gridOptions.totalItems = response.total;
                    var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                    if(response.data){
                        $scope.gridOptions.data = response.data;//.slice(firstRow, firstRow + paginationOptions.pageSize);
                    }
                });
            };
            $scope.getPage = function(){
                getPage(paginationOptions);
            }

            $scope.enterPress = function(){

                if(event.keyCode == 13){
                    getPage(paginationOptions);
                }
            }
            getPage(paginationOptions);
    }]
})