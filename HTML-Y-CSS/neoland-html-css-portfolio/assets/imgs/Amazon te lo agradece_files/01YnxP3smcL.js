(function(a){var b=window.AmazonUIPageJS||window.P,f=b._namespace||b.attributeErrors,c=f?f("CheckoutThankYouCommonAsset",""):b;c.guardFatal?c.guardFatal(a)(c,window):c.execute(function(){a(c,window)})})(function(a,b,f){a.register("count-event",function(){return{fire:function(c){b.ue&&b.ue.count&&b.ue.count(c,1)}}});"use strict";a.register("window-wrapper",function(c){return{getLocation:function(){return b.location},getLocationSearch:function(){return b.location.search},getLocationOrigin:function(){return b.location.origin},
getLocationPathname:function(){return b.location.pathname}}});"use strict";a.register("logger",function(){return{log:function(c,a){var d=b.ueLogError;"function"===typeof d&&d({message:c,logLevel:a})}}});"use strict";a.register("query-param",function(){return{getQueryParamValue:function(c,b){c=c.split("\x26");for(var d=0;d<c.length;d++){var a=c[d].split("\x3d");if(a[0]===b)return a[1]}}}});"use strict";a.when("A","count-event","window-wrapper","query-param").register("url-rewrite",function(c,b,a,h){function g(){if(a.getLocation()&&
a.getLocationSearch()){var k=a.getLocationSearch().substring(1),e=h.getQueryParamValue(k,"purchaseId");if(e===f)b.fire("checkout:typ:url-rewrite:noPurchaseId");else{var g=h.getQueryParamValue(k,"getForSPC"),l="1"===c.$('meta[name\x3d"isInternalUser"]').attr("content");if(!g||!l)return e="purchaseId\x3d"+e+"\x26ref_\x3dchk_typ_browserRefresh\x26isRefresh\x3d1","1"===h.getQueryParamValue(k,"downloadPayNowQRcode")&&(e+="\x26downloadPayNowQRcode\x3d1"),a.getLocationOrigin()+a.getLocationPathname()+"?"+
e}}else b.fire("checkout:typ:url-rewrite:noSearch")}(function(){var a=g();a&&history&&history.replaceState&&(b.fire("checkout:typ:url-rewrite:successful"),history.replaceState({},"",a))})();return{getUrlToRewrite:g}})});