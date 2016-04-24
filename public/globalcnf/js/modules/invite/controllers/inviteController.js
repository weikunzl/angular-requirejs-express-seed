/**
 * Created by wei
 *
 */
define(function(){
    'use strict';

    return ['$scope','inviteService','$stateParams','uiGridConstants','i18nService','$uibModal'
        , function($scope,inviteService,$stateParams,uiGridConstants,i18nService,$uibModal){
            $scope.openSelectType = {key:1,text:"客户姓名"};
            $scope.openSelectTypeRe = {key:1,text:"姓名"};
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
                enableRowSelection : true,
                multiSelect : true,
                enableSelectAll : true,rowSelection: true,
                columnDefs: [
                    { name:'推广人id', field: 'refereeid' ,enableCellEdit:false},
                    { name:'客户名', field: 'userName' ,enableCellEdit:false},
                    { name:'登录次数', field: 'loginTimes',enableCellEdit:false },
                    { name:'最后登录时间', field: 'lastLoginTime',type:'date',cellFilter:"date:'yyyy-MM-dd HH:mm:ss'",enableCellEdit:false },
                    { name:'注册时间', field: 'regTime',type:'date',cellFilter:"date:'yyyy-MM-dd HH:mm:ss'",enableCellEdit:false},
                    //{ name:'提成比例', field: 'deductpc' ,defaultValue:0.1},
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
                var paramData = paramData1||paginationOptions;
                if($scope.regDateE&&$scope.regDateS){
                    paramData.regDateE = $scope.regDateE.getTime()/1000;
                    paramData.regDateS = $scope.regDateS.getTime()/1000;
                }
                if($scope.openSelectType.key==2){//推广人id
                    paramData.searchText = null;
                    paramData.refereeid = $scope.searchText;
                }else{
                    paramData.refereeid = null;
                    paramData.searchText = $scope.searchText;
                }
                inviteService.getInviteList(paramData).success(function (response) {
                    $scope.gridOptions.totalItems = response.total;
                    //var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                    if(response.data){
                        $scope.gridOptions.data = response.data;
                    }
                });
            };
            var getIds = function(rows){
                $scope.tmpSelection = [];
                if(!rows){
                    return
                }
                for(var row in rows){
                    $scope.tmpSelection.push(rows[row].userid);
                }
            }
            $scope.modalUserList = [];
            $scope.openRpdateRefereeModal = function(){
                var selection = $scope.gridApi.selection.getSelectedRows($scope.gridApi);
                if(!selection||selection.length==0){
                    alert('至少选择一条数据.');
                    return;
                }
                getIds(selection);

                if($scope.modalUserList.length==0){
                    inviteService.doGetRefereeUsers().success(function(response){
                        $scope.modalUserList = response;
                    });
                }

                $scope.modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'js/modules/invite/views/bank_modal.html',
                    //size: size,
                    scope: $scope
                });

                $scope.modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };
            $scope.ok = function () {
                $scope.selectReferee($scope.selectedReferee);
            };

            $scope.cancel = function () {
                $scope.tmpSelection = null;
                $scope.modalInstance.dismiss('cancel');
            };

            $scope.getPage = function(){
                getPage(paginationOptions);
            };

            $scope.getPageRe = function(){
                var paramDataRe ={};
                if($scope.openSelectTypeRe.key==2){//推广人id
                    paramDataRe.userName = null;
                    paramDataRe.userid = $scope.searchTextRe;
                }else{
                    paramDataRe.userid = null;
                    paramDataRe.userName = $scope.searchTextRe;
                }
                inviteService.doGetRefereeUsers(paramDataRe).success(function(response){
                    $scope.modalUserList = response;
                });
            };

            $scope.selectReferee = function(item){
                inviteService.doUpdateRefereeUser({id :item.userid,ids:$scope.tmpSelection}).success(function(response){
                    $scope.getPage();
                    $scope.modalInstance.close();
                })
            };
            $scope.enterPress = function($event){

                if($event.keyCode == 13){
                    getPage(paginationOptions);
                }
            };
            $scope.enterPressRe = function($event){

                if($event.keyCode == 13){
                    getPageRe();
                }
            };
            getPage(paginationOptions);

            $scope.clickStyle = function(item){
                $scope.selectedReferee=item;
            }
    }]
});