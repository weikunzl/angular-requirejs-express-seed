define(["angular","js/config","js/modules/income/controllers/incomeController","js/modules/income/services/incomeService"],function(e,r,n,o){"use strict";var c=e.module("rwmgt.income",[]);return c.filter("mapPayStatus",["incomeService",function(e){var r=e.payStatusHash;return function(e){return e||0===e?r[e]:""}}]),c.controller("incomeController",n),c.service("incomeService",o),c});