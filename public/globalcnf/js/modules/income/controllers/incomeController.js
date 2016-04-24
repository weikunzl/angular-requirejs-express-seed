/**
 * 收入
 */
define(function(){
    'use strict';

    return ['$scope','incomeService','$stateParams','uiGridConstants','i18nService'
        , function($scope,incomeService,$stateParams,uiGridConstants,i18nService){
            i18nService.setCurrentLang('zh-cn');
            $scope.paymentStateAry = incomeService.payStatusHash;
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
                    //充值时间/充值金额/货币类型/支付类型/充值状态
                    //addtime as addTime,p.amount as amount" +
                    //",p.currency as currency,p.paymentid as paymentId ,p.paystatus as payStatus
                    { name:'别名', field: 'userName' ,enableCellEdit:false},
                    { name:'充值时间', field: 'addTime',type:'date',cellFilter:"date:'yyyy-MM-dd HH:mm:ss'",enableCellEdit:false },
                    { name:'充值金额', field: 'amount',type:'currency',enableCellEdit:false },
                    { name:'货币类型', field: 'currency',enableCellEdit:false},
                    { name:'支付类型', field: 'paymentId',enableCellEdit:false},
                    { name:'充值状态', field: 'payStatus',cellFilter:'mapPayStatus',enableCellEdit:false}
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
                if($scope.payStateSelect){
                    paramData.paymentState = $scope.payStateSelect
                    //console.log($scope.payStateSelect)
                }
                incomeService.getIncomeList(paramData).success(function (response) {
                    $scope.gridOptions.totalItems = response.total;
                    var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
                    $scope.gridOptions.data = response.data.slice(firstRow, firstRow + paginationOptions.pageSize);
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