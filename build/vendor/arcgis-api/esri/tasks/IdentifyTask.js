//>>built
define("esri/tasks/IdentifyTask","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../request ../geometry/normalizeUtils ./Task ./IdentifyResult".split(" "),function(a,d,g,l,m,n,p,q,r){a=a(q,{declaredClass:"esri.tasks.IdentifyTask",_eventMap:{complete:["results"]},constructor:function(k,a){this._url.path+="/identify";this._handler=d.hitch(this,this._handler);this.gdbVersion=a&&a.gdbVersion;this.registerConnectEvents()},__msigns:[{n:"execute",c:3,a:[{i:0,p:["geometry"]}],e:2}],
_handler:function(a,d,e,c,b){try{var f=[];g.forEach(a.results,function(a,k){f[k]=new r(a)});this._successHandler([f],"onComplete",e,b)}catch(h){this._errorHandler(h,c,b)}},execute:function(a,g,e,c){var b=c.assembly;a=this._encode(d.mixin({},this._url.query,{f:"json"},a.toJson(b&&b[0])));var f=this._handler,h=this._errorHandler;this.gdbVersion&&(a.gdbVersion=this.gdbVersion);return n({url:this._url.path,content:a,callbackParamName:"callback",load:function(a,b){f(a,b,g,e,c.dfd)},error:function(a){h(a,
e,c.dfd)}})},onComplete:function(){}});p._createWrappers(a);l("extend-esri")&&d.setObject("tasks.IdentifyTask",a,m);return a});