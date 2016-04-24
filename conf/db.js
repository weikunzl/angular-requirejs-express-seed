/**
 * Created by WLxing on 16/3/28.
 */
//MySQL数据库连接配置

var mysql = require('mysql');
var $conf = require('./config');

var $util = require('../util/util');
exports.createMysqlPool= module.exports.createMysqlPool = function(){
    return mysql.createPool($util.extend({connectionLimit : 10},$conf.mysql));
}