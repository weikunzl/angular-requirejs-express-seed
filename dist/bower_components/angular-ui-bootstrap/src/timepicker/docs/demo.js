angular.module("ui.bootstrap.demo").controller("TimepickerDemoCtrl",function(e,t){e.mytime=new Date,e.hstep=1,e.mstep=15,e.options={hstep:[1,2,3],mstep:[1,5,10,15,25,30]},e.ismeridian=!0,e.toggleMode=function(){e.ismeridian=!e.ismeridian},e.update=function(){var t=new Date;t.setHours(14),t.setMinutes(0),e.mytime=t},e.changed=function(){t.log("Time changed to: "+e.mytime)},e.clear=function(){e.mytime=null}});