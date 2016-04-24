/**
 * @license AngularJS v1.5.1
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */

!function(e,r,t){"use strict";function a(e){return null!=e&&""!==e&&"hasOwnProperty"!==e&&i.test("."+e)}function n(e,n){if(!a(n))throw s("badmember",'Dotted member path "@{0}" is invalid.',n);for(var o=n.split("."),i=0,u=o.length;u>i&&r.isDefined(e);i++){var c=o[i];e=null!==e?e[c]:t}return e}function o(e,t){t=t||{},r.forEach(t,function(e,r){delete t[r]});for(var a in e)!e.hasOwnProperty(a)||"$"===a.charAt(0)&&"$"===a.charAt(1)||(t[a]=e[a]);return t}var s=r.$$minErr("$resource"),i=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;r.module("ngResource",["ng"]).provider("$resource",function(){var e=/^https?:\/\/[^\/]*/,a=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$log","$q","$timeout",function(i,u,c,l){function p(e){return f(e,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function f(e,r){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,r?"%20":"+")}function d(e,r){this.template=e,this.defaults=$({},a.defaults,r),this.urlParams={}}function m(e,p,f,y){function w(e,r){var t={};return r=$({},p,r),g(r,function(r,a){b(r)&&(r=r()),t[a]=r&&r.charAt&&"@"==r.charAt(0)?n(e,r.substr(1)):r}),t}function E(e){return e.resource}function P(e){o(e||{},this)}var A=new d(e,y);return f=$({},a.defaults.actions,f),P.prototype.toJSON=function(){var e=$({},this);return delete e.$promise,delete e.$resolved,e},g(f,function(e,n){var p=/^(POST|PUT|PATCH)$/i.test(e.method),f=e.timeout,d=r.isDefined(e.cancellable)?e.cancellable:y&&r.isDefined(y.cancellable)?y.cancellable:a.defaults.cancellable;f&&!r.isNumber(f)&&(u.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."),delete e.timeout,f=null),P[n]=function(a,u,m,y){var R,T,O,x={};switch(arguments.length){case 4:O=y,T=m;case 3:case 2:if(!b(u)){x=a,R=u,T=m;break}if(b(a)){T=a,O=u;break}T=u,O=m;case 1:b(a)?T=a:p?R=a:x=a;break;case 0:break;default:throw s("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var D,q,k=this instanceof P,S=k?R:e.isArray?[]:new P(R),W={},j=e.interceptor&&e.interceptor.response||E,U=e.interceptor&&e.interceptor.responseError||t;g(e,function(e,r){switch(r){default:W[r]=v(e);break;case"params":case"isArray":case"interceptor":case"cancellable":}}),!k&&d&&(D=c.defer(),W.timeout=D.promise,f&&(q=l(D.resolve,f))),p&&(W.data=R),A.setUrlParams(W,$({},w(R,e.params||{}),x),e.url);var C=i(W).then(function(t){var a=t.data;if(a){if(r.isArray(a)!==!!e.isArray)throw s("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",n,e.isArray?"array":"object",r.isArray(a)?"array":"object",W.method,W.url);if(e.isArray)S.length=0,g(a,function(e){"object"==typeof e?S.push(new P(e)):S.push(e)});else{var i=S.$promise;o(a,S),S.$promise=i}}return t.resource=S,t},function(e){return(O||h)(e),c.reject(e)});return C["finally"](function(){S.$resolved=!0,!k&&d&&(S.$cancelRequest=r.noop,l.cancel(q),D=q=W.timeout=null)}),C=C.then(function(e){var r=j(e);return(T||h)(r,e.headers),r},U),k?C:(S.$promise=C,S.$resolved=!1,d&&(S.$cancelRequest=D.resolve),S)},P.prototype["$"+n]=function(e,r,t){b(e)&&(t=r,r=e,e={});var a=P[n].call(this,e,this,r,t);return a.$promise||a}}),P.bind=function(r){return m(e,$({},p,r),f)},P}var h=r.noop,g=r.forEach,$=r.extend,v=r.copy,b=r.isFunction;return d.prototype={setUrlParams:function(t,a,n){var o,i,u=this,c=n||u.template,l="",d=u.urlParams={};g(c.split(/\W/),function(e){if("hasOwnProperty"===e)throw s("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(e)&&e&&new RegExp("(^|[^\\\\]):"+e+"(\\W|$)").test(c)&&(d[e]={isQueryParamValue:new RegExp("\\?.*=:"+e+"(?:\\W|$)").test(c)})}),c=c.replace(/\\:/g,":"),c=c.replace(e,function(e){return l=e,""}),a=a||{},g(u.urlParams,function(e,t){o=a.hasOwnProperty(t)?a[t]:u.defaults[t],r.isDefined(o)&&null!==o?(i=e.isQueryParamValue?f(o,!0):p(o),c=c.replace(new RegExp(":"+t+"(\\W|$)","g"),function(e,r){return i+r})):c=c.replace(new RegExp("(/?):"+t+"(\\W|$)","g"),function(e,r,t){return"/"==t.charAt(0)?t:r+t})}),u.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/"),c=c.replace(/\/\.(?=\w+($|\?))/,"."),t.url=l+c.replace(/\/\\\./,"/."),g(a,function(e,r){u.urlParams[r]||(t.params=t.params||{},t.params[r]=e)})}},m}]})}(window,window.angular);