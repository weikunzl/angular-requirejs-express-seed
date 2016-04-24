function $StateProvider(r,e){function t(r){return 0===r.indexOf(".")||0===r.indexOf("^")}function n(r,e){if(r){var a=isString(r),i=a?r:r.name,o=t(i);if(o){if(!e)throw new Error("No reference point given for path '"+i+"'");e=n(e);for(var l=i.split("."),s=0,u=l.length,c=e;u>s;s++)if(""!==l[s]||0!==s){if("^"!==l[s])break;if(!c.parent)throw new Error("Path '"+i+"' not valid for state '"+e.name+"'");c=c.parent}else c=e;l=l.slice(s).join("."),i=c.name+(c.name&&l?".":"")+l}var f=p[i];return!f||!a&&(a||f!==r&&f.self!==r)?void 0:f}}function a(r,e){h[r]||(h[r]=[]),h[r].push(e)}function i(r){for(var e=h[r]||[];e.length;)o(e.shift())}function o(e){e=inherit(e,{self:e,resolve:e.resolve||{},toString:function(){return this.name}});var t=e.name;if(!isString(t)||t.indexOf("@")>=0)throw new Error("State must have a valid name");if(p.hasOwnProperty(t))throw new Error("State '"+t+"' is already defined");var n=-1!==t.indexOf(".")?t.substring(0,t.lastIndexOf(".")):isString(e.parent)?e.parent:isObject(e.parent)&&isString(e.parent.name)?e.parent.name:"";if(n&&!p[n])return a(n,e.self);for(var o in g)isFunction(g[o])&&(e[o]=g[o](e,g.$delegates[o]));return p[t]=e,!e[m]&&e.url&&r.when(e.url,["$match","$stateParams",function(r,t){$.$current.navigable==e&&equalForKeys(r,t)||$.transitionTo(e,r,{inherit:!0,location:!1})}]),i(t),e}function l(r){return r.indexOf("*")>-1}function s(r){for(var e=r.split("."),t=$.$current.name.split("."),n=0,a=e.length;a>n;n++)"*"===e[n]&&(t[n]="*");return"**"===e[0]&&(t=t.slice(indexOf(t,e[1])),t.unshift("**")),"**"===e[e.length-1]&&(t.splice(indexOf(t,e[e.length-2])+1,Number.MAX_VALUE),t.push("**")),e.length!=t.length?!1:t.join("")===e.join("")}function u(r,e){return isString(r)&&!isDefined(e)?g[r]:isFunction(e)&&isString(r)?(g[r]&&!g.$delegates[r]&&(g.$delegates[r]=g[r]),g[r]=e,this):this}function c(r,e){return isObject(r)?e=r:e.name=r,o(e),this}function f(r,e,t,a,i,o,u,c,f){function h(t,n,a,i){var o=r.$broadcast("$stateNotFound",t,n,a);if(o.defaultPrevented)return u.update(),y;if(!o.retry)return null;if(i.$retry)return u.update(),P;var l=$.transition=e.when(o.retry);return l.then(function(){return l!==$.transition?b:(t.options.$retry=!0,$.transitionTo(t.to,t.toParams,t.options))},function(){return y}),u.update(),l}function g(r,n,o,l,s,u){function c(){var n=[];return forEach(r.views,function(e,o){var l=e.resolve&&e.resolve!==r.resolve?e.resolve:{};l.$template=[function(){return t.load(o,{view:e,locals:s.globals,params:f,notify:u.notify})||""}],n.push(i.resolve(l,s.globals,s.resolve,r).then(function(t){if(isFunction(e.controllerProvider)||isArray(e.controllerProvider)){var n=angular.extend({},l,s.globals);t.$$controller=a.invoke(e.controllerProvider,null,n)}else t.$$controller=e.controller;t.$$state=r,t.$$controllerAs=e.controllerAs,s[o]=t}))}),e.all(n).then(function(){return s.globals})}var f=o?n:filterByKeys(r.params.$$keys(),n),v={$stateParams:f};s.resolve=i.resolve(r.resolve,v,s.resolve,r);var d=[s.resolve.then(function(r){s.globals=r})];return l&&d.push(l),e.all(d).then(c).then(function(r){return s})}var b=e.reject(new Error("transition superseded")),w=e.reject(new Error("transition prevented")),y=e.reject(new Error("transition aborted")),P=e.reject(new Error("transition failed"));return d.locals={resolve:null,globals:{$stateParams:{}}},$={params:{},current:d.self,$current:d,transition:null},$.reload=function(r){return $.transitionTo($.current,o,{reload:r||!0,inherit:!1,notify:!0})},$.go=function(r,e,t){return $.transitionTo(r,e,extend({inherit:!0,relative:$.$current},t))},$.transitionTo=function(t,i,l){i=i||{},l=extend({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},l||{});var s,c=$.$current,f=$.params,p=c.path,y=n(t,l.relative),E=i["#"];if(!isDefined(y)){var S={to:t,toParams:i,options:l},x=h(S,c.self,f,l);if(x)return x;if(t=S.to,i=S.toParams,l=S.options,y=n(t,l.relative),!isDefined(y)){if(!l.relative)throw new Error("No such state '"+t+"'");throw new Error("Could not resolve '"+t+"' from state '"+l.relative+"'")}}if(y[m])throw new Error("Cannot transition to abstract state '"+t+"'");if(l.inherit&&(i=inheritParams(o,i||{},$.$current,y)),!y.params.$$validates(i))return P;i=y.params.$$values(i),t=y;var j=t.path,O=0,F=j[O],k=d.locals,D=[];if(l.reload){if(isString(l.reload)||isObject(l.reload)){if(isObject(l.reload)&&!l.reload.name)throw new Error("Invalid reload state object");var K=l.reload===!0?p[0]:n(l.reload);if(l.reload&&!K)throw new Error("No such reload state '"+(isString(l.reload)?l.reload:l.reload.name)+"'");for(;F&&F===p[O]&&F!==K;)k=D[O]=F.locals,O++,F=j[O]}}else for(;F&&F===p[O]&&F.ownParams.$$equals(i,f);)k=D[O]=F.locals,O++,F=j[O];if(v(t,i,c,f,k,l))return E&&(i["#"]=E),$.params=i,copy($.params,o),copy(filterByKeys(t.params.$$keys(),o),t.locals.globals.$stateParams),l.location&&t.navigable&&t.navigable.url&&(u.push(t.navigable.url,i,{$$avoidResync:!0,replace:"replace"===l.location}),u.update(!0)),$.transition=null,e.when($.current);if(i=filterByKeys(t.params.$$keys(),i||{}),E&&(i["#"]=E),l.notify&&r.$broadcast("$stateChangeStart",t.self,i,c.self,f,l).defaultPrevented)return r.$broadcast("$stateChangeCancel",t.self,i,c.self,f),null==$.transition&&u.update(),w;for(var M=e.when(k),C=O;C<j.length;C++,F=j[C])k=D[C]=inherit(k),M=g(F,i,F===t,M,k,l);var q=$.transition=M.then(function(){var e,n,s;if($.transition!==q)return b;for(e=p.length-1;e>=O;e--)s=p[e],s.self.onExit&&a.invoke(s.self.onExit,s.self,s.locals.globals),s.locals=null;for(e=O;e<j.length;e++)n=j[e],n.locals=D[e],n.self.onEnter&&a.invoke(n.self.onEnter,n.self,n.locals.globals);return $.transition!==q?b:($.$current=t,$.current=t.self,$.params=i,copy($.params,o),$.transition=null,l.location&&t.navigable&&u.push(t.navigable.url,t.navigable.locals.globals.$stateParams,{$$avoidResync:!0,replace:"replace"===l.location}),l.notify&&r.$broadcast("$stateChangeSuccess",t.self,i,c.self,f),u.update(!0),$.current)},function(n){return $.transition!==q?b:($.transition=null,s=r.$broadcast("$stateChangeError",t.self,i,c.self,f,n),s.defaultPrevented||u.update(),e.reject(n))});return q},$.is=function(r,e,t){t=extend({relative:$.$current},t||{});var a=n(r,t.relative);if(isDefined(a))return $.$current!==a?!1:e?equalForKeys(a.params.$$values(e),o):!0},$.includes=function(r,e,t){if(t=extend({relative:$.$current},t||{}),isString(r)&&l(r)){if(!s(r))return!1;r=$.$current.name}var a=n(r,t.relative);return isDefined(a)?isDefined($.$current.includes[a.name])?e?equalForKeys(a.params.$$values(e),o,objectKeys(e)):!0:!1:void 0},$.href=function(r,e,t){t=extend({lossy:!0,inherit:!0,absolute:!1,relative:$.$current},t||{});var a=n(r,t.relative);if(!isDefined(a))return null;t.inherit&&(e=inheritParams(o,e||{},$.$current,a));var i=a&&t.lossy?a.navigable:a;return i&&void 0!==i.url&&null!==i.url?u.href(i.url,filterByKeys(a.params.$$keys().concat("#"),e||{}),{absolute:t.absolute}):null},$.get=function(r,e){if(0===arguments.length)return map(objectKeys(p),function(r){return p[r].self});var t=n(r,e||$.$current);return t&&t.self?t.self:null},$}function v(r,e,t,n,a,i){function o(r,e,t){function n(e){return"search"!=r.params[e].location}var a=r.params.$$keys().filter(n),i=pick.apply({},[r.params].concat(a)),o=new $$UMFP.ParamSet(i);return o.$$equals(e,t)}return!i.reload&&r===t&&(a===t.locals||r.self.reloadOnSearch===!1&&o(t,n,e))?!0:void 0}var d,$,p={},h={},m="abstract",g={parent:function(r){if(isDefined(r.parent)&&r.parent)return n(r.parent);var e=/^(.+)\.[^.]+$/.exec(r.name);return e?n(e[1]):d},data:function(r){return r.parent&&r.parent.data&&(r.data=r.self.data=inherit(r.parent.data,r.data)),r.data},url:function(r){var t=r.url,n={params:r.params||{}};if(isString(t))return"^"==t.charAt(0)?e.compile(t.substring(1),n):(r.parent.navigable||d).url.concat(t,n);if(!t||e.isMatcher(t))return t;throw new Error("Invalid url '"+t+"' in state '"+r+"'")},navigable:function(r){return r.url?r:r.parent?r.parent.navigable:null},ownParams:function(r){var e=r.url&&r.url.params||new $$UMFP.ParamSet;return forEach(r.params||{},function(r,t){e[t]||(e[t]=new $$UMFP.Param(t,null,r,"config"))}),e},params:function(r){var e=pick(r.ownParams,r.ownParams.$$keys());return r.parent&&r.parent.params?extend(r.parent.params.$$new(),e):new $$UMFP.ParamSet},views:function(r){var e={};return forEach(isDefined(r.views)?r.views:{"":r},function(t,n){n.indexOf("@")<0&&(n+="@"+r.parent.name),e[n]=t}),e},path:function(r){return r.parent?r.parent.path.concat(r):[]},includes:function(r){var e=r.parent?extend({},r.parent.includes):{};return e[r.name]=!0,e},$delegates:{}};d=o({name:"",url:"^",views:null,"abstract":!0}),d.navigable=null,this.decorator=u,this.state=c,this.$get=f,f.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$urlRouter","$location","$urlMatcherFactory"]}$StateProvider.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"],angular.module("ui.router.state").factory("$stateParams",function(){return{}}).provider("$state",$StateProvider);