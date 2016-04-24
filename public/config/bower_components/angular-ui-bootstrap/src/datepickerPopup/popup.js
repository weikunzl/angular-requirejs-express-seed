angular.module("ui.bootstrap.datepickerPopup",["ui.bootstrap.datepicker","ui.bootstrap.position"]).value("$datepickerPopupLiteralWarning",!0).constant("uibDatepickerPopupConfig",{altInputFormats:[],appendToBody:!1,clearText:"Clear",closeOnDateSelection:!0,closeText:"Done",currentText:"Today",datepickerPopup:"yyyy-MM-dd",datepickerPopupTemplateUrl:"uib/template/datepickerPopup/popup.html",datepickerTemplateUrl:"uib/template/datepicker/datepicker.html",html5Types:{date:"yyyy-MM-dd","datetime-local":"yyyy-MM-ddTHH:mm:ss.sss",month:"yyyy-MM"},onOpenFocus:!0,showButtonBar:!0,placement:"auto bottom-left"}).controller("UibDatepickerPopupController",["$scope","$element","$attrs","$compile","$log","$parse","$window","$document","$rootScope","$uibPosition","dateFilter","uibDateParser","uibDatepickerPopupConfig","$timeout","uibDatepickerConfig","$datepickerPopupLiteralWarning",function(e,t,a,n,i,o,p,r,l,u,s,c,d,f,m,g){function k(t){var a=c.parse(t,y,e.date);if(isNaN(a))for(var n=0;n<z.length;n++)if(a=c.parse(t,z[n],e.date),!isNaN(a))return a;return a}function D(e){if(angular.isNumber(e)&&(e=new Date(e)),!e)return null;if(angular.isDate(e)&&!isNaN(e))return e;if(angular.isString(e)){var t=k(e);if(!isNaN(t))return c.toTimezone(t,C)}return F.$options&&F.$options.allowInvalid?e:void 0}function $(e,t){var n=e||t;return a.ngRequired||n?(angular.isNumber(n)&&(n=new Date(n)),n?angular.isDate(n)&&!isNaN(n)?!0:angular.isString(n)?!isNaN(k(t)):!1:!0):!0}function h(a){if(e.isOpen||!e.disabled){var n=S[0],i=t[0].contains(a.target),o=void 0!==n.contains&&n.contains(a.target);!e.isOpen||i||o||e.$apply(function(){e.isOpen=!1})}}function O(a){27===a.which&&e.isOpen?(a.preventDefault(),a.stopPropagation(),e.$apply(function(){e.isOpen=!1}),t[0].focus()):40!==a.which||e.isOpen||(a.preventDefault(),a.stopPropagation(),e.$apply(function(){e.isOpen=!0}))}function b(){if(e.isOpen){var n=angular.element(S[0].querySelector(".uib-datepicker-popup")),i=a.popupPlacement?a.popupPlacement:d.placement,o=u.positionElements(t,n,i,w);n.css({top:o.top+"px",left:o.left+"px"}),n.hasClass("uib-position-measure")&&n.removeClass("uib-position-measure")}}var y,v,w,P,T,M,N,x,B,F,U,S,z,C,E=!1,I=[];this.init=function(i){if(F=i,U=i.$options,v=angular.isDefined(a.closeOnDateSelection)?e.$parent.$eval(a.closeOnDateSelection):d.closeOnDateSelection,w=angular.isDefined(a.datepickerAppendToBody)?e.$parent.$eval(a.datepickerAppendToBody):d.appendToBody,P=angular.isDefined(a.onOpenFocus)?e.$parent.$eval(a.onOpenFocus):d.onOpenFocus,T=angular.isDefined(a.datepickerPopupTemplateUrl)?a.datepickerPopupTemplateUrl:d.datepickerPopupTemplateUrl,M=angular.isDefined(a.datepickerTemplateUrl)?a.datepickerTemplateUrl:d.datepickerTemplateUrl,z=angular.isDefined(a.altInputFormats)?e.$parent.$eval(a.altInputFormats):d.altInputFormats,e.showButtonBar=angular.isDefined(a.showButtonBar)?e.$parent.$eval(a.showButtonBar):d.showButtonBar,d.html5Types[a.type]?(y=d.html5Types[a.type],E=!0):(y=a.uibDatepickerPopup||d.datepickerPopup,a.$observe("uibDatepickerPopup",function(e,t){var a=e||d.datepickerPopup;if(a!==y&&(y=a,F.$modelValue=null,!y))throw new Error("uibDatepickerPopup must have a date format specified.")})),!y)throw new Error("uibDatepickerPopup must have a date format specified.");if(E&&a.uibDatepickerPopup)throw new Error("HTML5 date input types do not support custom formats.");N=angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>"),U?(C=U.timezone,e.ngModelOptions=angular.copy(U),e.ngModelOptions.timezone=null,e.ngModelOptions.updateOnDefault===!0&&(e.ngModelOptions.updateOn=e.ngModelOptions.updateOn?e.ngModelOptions.updateOn+" default":"default"),N.attr("ng-model-options","ngModelOptions")):C=null,N.attr({"ng-model":"date","ng-change":"dateSelection(date)","template-url":T}),x=angular.element(N.children()[0]),x.attr("template-url",M),e.datepickerOptions||(e.datepickerOptions={}),E&&"month"===a.type&&(e.datepickerOptions.datepickerMode="month",e.datepickerOptions.minMode="month"),x.attr("datepicker-options","datepickerOptions"),E?F.$formatters.push(function(t){return e.date=c.fromTimezone(t,C),t}):(F.$$parserName="date",F.$validators.date=$,F.$parsers.unshift(D),F.$formatters.push(function(t){return F.$isEmpty(t)?(e.date=t,t):(e.date=c.fromTimezone(t,C),angular.isNumber(e.date)&&(e.date=new Date(e.date)),c.filter(e.date,y))})),F.$viewChangeListeners.push(function(){e.date=k(F.$viewValue)}),t.on("keydown",O),S=n(N)(e),N.remove(),w?r.find("body").append(S):t.after(S),e.$on("$destroy",function(){for(e.isOpen===!0&&(l.$$phase||e.$apply(function(){e.isOpen=!1})),S.remove(),t.off("keydown",O),r.off("click",h),B&&B.off("scroll",b),angular.element(p).off("resize",b);I.length;)I.shift()()})},e.getText=function(t){return e[t+"Text"]||d[t+"Text"]},e.isDisabled=function(t){"today"===t&&(t=c.fromTimezone(new Date,C));var a={};return angular.forEach(["minDate","maxDate"],function(t){null===e.datepickerOptions[t]?a[t]=null:angular.isDate(e.datepickerOptions[t])?a[t]=c.fromTimezone(new Date(e.datepickerOptions[t]),C):(g&&i.warn("Literal date support has been deprecated, please switch to date object usage"),a[t]=new Date(s(e.datepickerOptions[t],"medium")))}),e.datepickerOptions&&a.minDate&&e.compare(t,a.minDate)<0||a.maxDate&&e.compare(t,a.maxDate)>0},e.compare=function(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate())-new Date(t.getFullYear(),t.getMonth(),t.getDate())},e.dateSelection=function(a){angular.isDefined(a)&&(e.date=a);var n=e.date?c.filter(e.date,y):null;t.val(n),F.$setViewValue(n),v&&(e.isOpen=!1,t[0].focus())},e.keydown=function(a){27===a.which&&(a.stopPropagation(),e.isOpen=!1,t[0].focus())},e.select=function(t,a){if(a.stopPropagation(),"today"===t){var n=new Date;angular.isDate(e.date)?(t=new Date(e.date),t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate())):t=new Date(n.setHours(0,0,0,0))}e.dateSelection(t)},e.close=function(a){a.stopPropagation(),e.isOpen=!1,t[0].focus()},e.disabled=angular.isDefined(a.disabled)||!1,a.ngDisabled&&I.push(e.$parent.$watch(o(a.ngDisabled),function(t){e.disabled=t})),e.$watch("isOpen",function(n){n?e.disabled?e.isOpen=!1:f(function(){b(),P&&e.$broadcast("uib:datepicker.focus"),r.on("click",h);var n=a.popupPlacement?a.popupPlacement:d.placement;w||u.parsePlacement(n)[2]?(B=B||angular.element(u.scrollParent(t)),B&&B.on("scroll",b)):B=null,angular.element(p).on("resize",b)},0,!1):(r.off("click",h),B&&B.off("scroll",b),angular.element(p).off("resize",b))}),e.$on("uib:datepicker.mode",function(){f(b,0,!1)})}]).directive("uibDatepickerPopup",function(){return{require:["ngModel","uibDatepickerPopup"],controller:"UibDatepickerPopupController",scope:{datepickerOptions:"=?",isOpen:"=?",currentText:"@",clearText:"@",closeText:"@"},link:function(e,t,a,n){var i=n[0],o=n[1];o.init(i)}}}).directive("uibDatepickerPopupWrap",function(){return{replace:!0,transclude:!0,templateUrl:function(e,t){return t.templateUrl||"uib/template/datepickerPopup/popup.html"}}});