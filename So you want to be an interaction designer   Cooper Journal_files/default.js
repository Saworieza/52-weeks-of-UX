var requirejs,require,define;(function(undef){var main,req,makeMap,handlers,defined={},waiting={},config={},defining={},hasOwn=Object.prototype.hasOwnProperty,aps=[].slice;function hasProp(obj,prop){return hasOwn.call(obj,prop);}
function normalize(name,baseName){var nameParts,nameSegment,mapValue,foundMap,foundI,foundStarMap,starI,i,j,part,baseParts=baseName&&baseName.split("/"),map=config.map,starMap=(map&&map['*'])||{};if(name&&name.charAt(0)==="."){if(baseName){baseParts=baseParts.slice(0,baseParts.length-1);name=baseParts.concat(name.split("/"));for(i=0;i<name.length;i+=1){part=name[i];if(part==="."){name.splice(i,1);i-=1;}else if(part===".."){if(i===1&&(name[2]==='..'||name[0]==='..')){break;}else if(i>0){name.splice(i-1,2);i-=2;}}}
name=name.join("/");}else if(name.indexOf('./')===0){name=name.substring(2);}}
if((baseParts||starMap)&&map){nameParts=name.split('/');for(i=nameParts.length;i>0;i-=1){nameSegment=nameParts.slice(0,i).join("/");if(baseParts){for(j=baseParts.length;j>0;j-=1){mapValue=map[baseParts.slice(0,j).join('/')];if(mapValue){mapValue=mapValue[nameSegment];if(mapValue){foundMap=mapValue;foundI=i;break;}}}}
if(foundMap){break;}
if(!foundStarMap&&starMap&&starMap[nameSegment]){foundStarMap=starMap[nameSegment];starI=i;}}
if(!foundMap&&foundStarMap){foundMap=foundStarMap;foundI=starI;}
if(foundMap){nameParts.splice(0,foundI,foundMap);name=nameParts.join('/');}}
return name;}
function makeRequire(relName,forceSync){return function(){return req.apply(undef,aps.call(arguments,0).concat([relName,forceSync]));};}
function makeNormalize(relName){return function(name){return normalize(name,relName);};}
function makeLoad(depName){return function(value){defined[depName]=value;};}
function callDep(name){if(hasProp(waiting,name)){var args=waiting[name];delete waiting[name];defining[name]=true;main.apply(undef,args);}
if(!hasProp(defined,name)&&!hasProp(defining,name)){throw new Error('No '+name);}
return defined[name];}
function splitPrefix(name){var prefix,index=name?name.indexOf('!'):-1;if(index>-1){prefix=name.substring(0,index);name=name.substring(index+1,name.length);}
return[prefix,name];}
makeMap=function(name,relName){var plugin,parts=splitPrefix(name),prefix=parts[0];name=parts[1];if(prefix){prefix=normalize(prefix,relName);plugin=callDep(prefix);}
if(prefix){if(plugin&&plugin.normalize){name=plugin.normalize(name,makeNormalize(relName));}else{name=normalize(name,relName);}}else{name=normalize(name,relName);parts=splitPrefix(name);prefix=parts[0];name=parts[1];if(prefix){plugin=callDep(prefix);}}
return{f:prefix?prefix+'!'+name:name,n:name,pr:prefix,p:plugin};};function makeConfig(name){return function(){return(config&&config.config&&config.config[name])||{};};}
handlers={require:function(name){return makeRequire(name);},exports:function(name){var e=defined[name];if(typeof e!=='undefined'){return e;}else{return(defined[name]={});}},module:function(name){return{id:name,uri:'',exports:defined[name],config:makeConfig(name)};}};main=function(name,deps,callback,relName){var cjsModule,depName,ret,map,i,args=[],usingExports;relName=relName||name;if(typeof callback==='function'){deps=!deps.length&&callback.length?['require','exports','module']:deps;for(i=0;i<deps.length;i+=1){map=makeMap(deps[i],relName);depName=map.f;if(depName==="require"){args[i]=handlers.require(name);}else if(depName==="exports"){args[i]=handlers.exports(name);usingExports=true;}else if(depName==="module"){cjsModule=args[i]=handlers.module(name);}else if(hasProp(defined,depName)||hasProp(waiting,depName)||hasProp(defining,depName)){args[i]=callDep(depName);}else if(map.p){map.p.load(map.n,makeRequire(relName,true),makeLoad(depName),{});args[i]=defined[depName];}else{throw new Error(name+' missing '+depName);}}
ret=callback.apply(defined[name],args);if(name){if(cjsModule&&cjsModule.exports!==undef&&cjsModule.exports!==defined[name]){defined[name]=cjsModule.exports;}else if(ret!==undef||!usingExports){defined[name]=ret;}}}else if(name){defined[name]=callback;}};requirejs=require=req=function(deps,callback,relName,forceSync,alt){if(typeof deps==="string"){if(handlers[deps]){return handlers[deps](callback);}
return callDep(makeMap(deps,callback).f);}else if(!deps.splice){config=deps;if(callback.splice){deps=callback;callback=relName;relName=null;}else{deps=undef;}}
callback=callback||function(){};if(typeof relName==='function'){relName=forceSync;forceSync=alt;}
if(forceSync){main(undef,deps,callback,relName);}else{setTimeout(function(){main(undef,deps,callback,relName);},4);}
return req;};req.config=function(cfg){config=cfg;if(config.deps){req(config.deps,config.callback);}
return req;};define=function(name,deps,callback){if(!deps.splice){callback=deps;deps=[];}
if(!hasProp(defined,name)&&!hasProp(waiting,name)){waiting[name]=[name,deps,callback];}};define.amd={jQuery:true};}());require(['common']);define.amd.jQuery=true
define("common",['jquery','lodash','logging','respond','classes','images','backgrounds','notches','navigation'],function($,_,logging,respond,images,backgrounds,notches,navigation)
{var $html=$('html')
_.forEach(['small','large'],function(size)
{respond.on(size,function(){$html.addClass(size)}).on(size+'-off',function(){$html.removeClass(size)})})
$(function()
{$('body').css('visibility','visible')
if(window.location.hash.indexOf('#')<0)
{window.scrollTo(0,1)}})
return{$:$,_:_,respond:respond,images:images,backgrounds:backgrounds,notches:notches,navigation:navigation}});(function(window,undefined){var
rootjQuery,readyList,document=window.document,location=window.location,navigator=window.navigator,_jQuery=window.jQuery,_$=window.$,core_push=Array.prototype.push,core_slice=Array.prototype.slice,core_indexOf=Array.prototype.indexOf,core_toString=Object.prototype.toString,core_hasOwn=Object.prototype.hasOwnProperty,core_trim=String.prototype.trim,jQuery=function(selector,context){return new jQuery.fn.init(selector,context,rootjQuery);},core_pnum=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,core_rnotwhite=/\S/,core_rspace=/\s+/,rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,rquickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,rvalidchars=/^[\],:{}\s]*$/,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rvalidescape=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,rvalidtokens=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,rmsPrefix=/^-ms-/,rdashAlpha=/-([\da-z])/gi,fcamelCase=function(all,letter){return(letter+"").toUpperCase();},DOMContentLoaded=function(){if(document.addEventListener){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);jQuery.ready();}else if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);jQuery.ready();}},class2type={};jQuery.fn=jQuery.prototype={constructor:jQuery,init:function(selector,context,rootjQuery){var match,elem,ret,doc;if(!selector){return this;}
if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this;}
if(typeof selector==="string"){if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){match=[null,selector,null];}else{match=rquickExpr.exec(selector);}
if(match&&(match[1]||!context)){if(match[1]){context=context instanceof jQuery?context[0]:context;doc=(context&&context.nodeType?context.ownerDocument||context:document);selector=jQuery.parseHTML(match[1],doc,true);if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){this.attr.call(selector,context,true);}
return jQuery.merge(this,selector);}else{elem=document.getElementById(match[2]);if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector);}
this.length=1;this[0]=elem;}
this.context=document;this.selector=selector;return this;}}else if(!context||context.jquery){return(context||rootjQuery).find(selector);}else{return this.constructor(context).find(selector);}}else if(jQuery.isFunction(selector)){return rootjQuery.ready(selector);}
if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}
return jQuery.makeArray(selector,this);},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length;},toArray:function(){return core_slice.call(this);},get:function(num){return num==null?this.toArray():(num<0?this[this.length+num]:this[num]);},pushStack:function(elems,name,selector){var ret=jQuery.merge(this.constructor(),elems);ret.prevObject=this;ret.context=this.context;if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector;}else if(name){ret.selector=this.selector+"."+name+"("+selector+")";}
return ret;},each:function(callback,args){return jQuery.each(this,callback,args);},ready:function(fn){jQuery.ready.promise().done(fn);return this;},eq:function(i){i=+i;return i===-1?this.slice(i):this.slice(i,i+1);},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},slice:function(){return this.pushStack(core_slice.apply(this,arguments),"slice",core_slice.call(arguments).join(","));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},end:function(){return this.prevObject||this.constructor(null);},push:core_push,sort:[].sort,splice:[].splice};jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!=="object"&&!jQuery.isFunction(target)){target={};}
if(length===i){target=this;--i;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue;}
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[];}else{clone=src&&jQuery.isPlainObject(src)?src:{};}
target[name]=jQuery.extend(deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}
return target;};jQuery.extend({noConflict:function(deep){if(window.$===jQuery){window.$=_$;}
if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}
return jQuery;},isReady:false,readyWait:1,holdReady:function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}},ready:function(wait){if(wait===true?--jQuery.readyWait:jQuery.isReady){return;}
if(!document.body){return setTimeout(jQuery.ready,1);}
jQuery.isReady=true;if(wait!==true&&--jQuery.readyWait>0){return;}
readyList.resolveWith(document,[jQuery]);if(jQuery.fn.trigger){jQuery(document).trigger("ready").off("ready");}},isFunction:function(obj){return jQuery.type(obj)==="function";},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array";},isWindow:function(obj){return obj!=null&&obj==obj.window;},isNumeric:function(obj){return!isNaN(parseFloat(obj))&&isFinite(obj);},type:function(obj){return obj==null?String(obj):class2type[core_toString.call(obj)]||"object";},isPlainObject:function(obj){if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false;}
try{if(obj.constructor&&!core_hasOwn.call(obj,"constructor")&&!core_hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;}}catch(e){return false;}
var key;for(key in obj){}
return key===undefined||core_hasOwn.call(obj,key);},isEmptyObject:function(obj){var name;for(name in obj){return false;}
return true;},error:function(msg){throw new Error(msg);},parseHTML:function(data,context,scripts){var parsed;if(!data||typeof data!=="string"){return null;}
if(typeof context==="boolean"){scripts=context;context=0;}
context=context||document;if((parsed=rsingleTag.exec(data))){return[context.createElement(parsed[1])];}
parsed=jQuery.buildFragment([data],context,scripts?null:[]);return jQuery.merge([],(parsed.cacheable?jQuery.clone(parsed.fragment):parsed.fragment).childNodes);},parseJSON:function(data){if(!data||typeof data!=="string"){return null;}
data=jQuery.trim(data);if(window.JSON&&window.JSON.parse){return window.JSON.parse(data);}
if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return(new Function("return "+data))();}
jQuery.error("Invalid JSON: "+data);},parseXML:function(data){var xml,tmp;if(!data||typeof data!=="string"){return null;}
try{if(window.DOMParser){tmp=new DOMParser();xml=tmp.parseFromString(data,"text/xml");}else{xml=new ActiveXObject("Microsoft.XMLDOM");xml.async="false";xml.loadXML(data);}}catch(e){xml=undefined;}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}
return xml;},noop:function(){},globalEval:function(data){if(data&&core_rnotwhite.test(data)){(window.execScript||function(data){window["eval"].call(window,data);})(data);}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();},each:function(obj,callback,args){var name,i=0,length=obj.length,isObj=length===undefined||jQuery.isFunction(obj);if(args){if(isObj){for(name in obj){if(callback.apply(obj[name],args)===false){break;}}}else{for(;i<length;){if(callback.apply(obj[i++],args)===false){break;}}}}else{if(isObj){for(name in obj){if(callback.call(obj[name],name,obj[name])===false){break;}}}else{for(;i<length;){if(callback.call(obj[i],i,obj[i++])===false){break;}}}}
return obj;},trim:core_trim&&!core_trim.call("\uFEFF\xA0")?function(text){return text==null?"":core_trim.call(text);}:function(text){return text==null?"":(text+"").replace(rtrim,"");},makeArray:function(arr,results){var type,ret=results||[];if(arr!=null){type=jQuery.type(arr);if(arr.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(arr)){core_push.call(ret,arr);}else{jQuery.merge(ret,arr);}}
return ret;},inArray:function(elem,arr,i){var len;if(arr){if(core_indexOf){return core_indexOf.call(arr,elem,i);}
len=arr.length;i=i?i<0?Math.max(0,len+i):i:0;for(;i<len;i++){if(i in arr&&arr[i]===elem){return i;}}}
return-1;},merge:function(first,second){var l=second.length,i=first.length,j=0;if(typeof l==="number"){for(;j<l;j++){first[i++]=second[j];}}else{while(second[j]!==undefined){first[i++]=second[j++];}}
first.length=i;return first;},grep:function(elems,callback,inv){var retVal,ret=[],i=0,length=elems.length;inv=!!inv;for(;i<length;i++){retVal=!!callback(elems[i],i);if(inv!==retVal){ret.push(elems[i]);}}
return ret;},map:function(elems,callback,arg){var value,key,ret=[],i=0,length=elems.length,isArray=elems instanceof jQuery||length!==undefined&&typeof length==="number"&&((length>0&&elems[0]&&elems[length-1])||length===0||jQuery.isArray(elems));if(isArray){for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value;}}}else{for(key in elems){value=callback(elems[key],key,arg);if(value!=null){ret[ret.length]=value;}}}
return ret.concat.apply([],ret);},guid:1,proxy:function(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}
if(!jQuery.isFunction(fn)){return undefined;}
args=core_slice.call(arguments,2);proxy=function(){return fn.apply(context,args.concat(core_slice.call(arguments)));};proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;},access:function(elems,fn,key,value,chainable,emptyGet,pass){var exec,bulk=key==null,i=0,length=elems.length;if(key&&typeof key==="object"){for(i in key){jQuery.access(elems,fn,i,key[i],1,emptyGet,value);}
chainable=1;}else if(value!==undefined){exec=pass===undefined&&jQuery.isFunction(value);if(bulk){if(exec){exec=fn;fn=function(elem,key,value){return exec.call(jQuery(elem),value);};}else{fn.call(elems,value);fn=null;}}
if(fn){for(;i<length;i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);}}
chainable=1;}
return chainable?elems:bulk?fn.call(elems):length?fn(elems[0],key):emptyGet;},now:function(){return(new Date()).getTime();}});jQuery.ready.promise=function(obj){if(!readyList){readyList=jQuery.Deferred();if(document.readyState==="complete"){setTimeout(jQuery.ready,1);}else if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);window.addEventListener("load",jQuery.ready,false);}else{document.attachEvent("onreadystatechange",DOMContentLoaded);window.attachEvent("onload",jQuery.ready);var top=false;try{top=window.frameElement==null&&document.documentElement;}catch(e){}
if(top&&top.doScroll){(function doScrollCheck(){if(!jQuery.isReady){try{top.doScroll("left");}catch(e){return setTimeout(doScrollCheck,50);}
jQuery.ready();}})();}}}
return readyList.promise(obj);};jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});rootjQuery=jQuery(document);var optionsCache={};function createOptions(options){var object=optionsCache[options]={};jQuery.each(options.split(core_rspace),function(_,flag){object[flag]=true;});return object;}
jQuery.Callbacks=function(options){options=typeof options==="string"?(optionsCache[options]||createOptions(options)):jQuery.extend({},options);var
memory,fired,firing,firingStart,firingLength,firingIndex,list=[],stack=!options.once&&[],fire=function(data){memory=options.memory&&data;fired=true;firingIndex=firingStart||0;firingStart=0;firingLength=list.length;firing=true;for(;list&&firingIndex<firingLength;firingIndex++){if(list[firingIndex].apply(data[0],data[1])===false&&options.stopOnFalse){memory=false;break;}}
firing=false;if(list){if(stack){if(stack.length){fire(stack.shift());}}else if(memory){list=[];}else{self.disable();}}},self={add:function(){if(list){var start=list.length;(function add(args){jQuery.each(args,function(_,arg){var type=jQuery.type(arg);if(type==="function"&&(!options.unique||!self.has(arg))){list.push(arg);}else if(arg&&arg.length&&type!=="string"){add(arg);}});})(arguments);if(firing){firingLength=list.length;}else if(memory){firingStart=start;fire(memory);}}
return this;},remove:function(){if(list){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);if(firing){if(index<=firingLength){firingLength--;}
if(index<=firingIndex){firingIndex--;}}}});}
return this;},has:function(fn){return jQuery.inArray(fn,list)>-1;},empty:function(){list=[];return this;},disable:function(){list=stack=memory=undefined;return this;},disabled:function(){return!list;},lock:function(){stack=undefined;if(!memory){self.disable();}
return this;},locked:function(){return!stack;},fireWith:function(context,args){args=args||[];args=[context,args.slice?args.slice():args];if(list&&(!fired||stack)){if(firing){stack.push(args);}else{fire(args);}}
return this;},fire:function(){self.fireWith(this,arguments);return this;},fired:function(){return!!fired;}};return self;};jQuery.extend({Deferred:function(func){var tuples=[["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],state="pending",promise={state:function(){return state;},always:function(){deferred.done(arguments).fail(arguments);return this;},then:function(){var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var action=tuple[0],fn=fns[i];deferred[tuple[1]](jQuery.isFunction(fn)?function(){var returned=fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);}else{newDefer[action+"With"](this===deferred?newDefer:this,[returned]);}}:newDefer[action]);});fns=null;}).promise();},promise:function(obj){return obj!=null?jQuery.extend(obj,promise):promise;}},deferred={};promise.pipe=promise.then;jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3];promise[tuple[1]]=list.add;if(stateString){list.add(function(){state=stateString;},tuples[i^1][2].disable,tuples[2][2].lock);}
deferred[tuple[0]]=list.fire;deferred[tuple[0]+"With"]=list.fireWith;});promise.promise(deferred);if(func){func.call(deferred,deferred);}
return deferred;},when:function(subordinate){var i=0,resolveValues=core_slice.call(arguments),length=resolveValues.length,remaining=length!==1||(subordinate&&jQuery.isFunction(subordinate.promise))?length:0,deferred=remaining===1?subordinate:jQuery.Deferred(),updateFunc=function(i,contexts,values){return function(value){contexts[i]=this;values[i]=arguments.length>1?core_slice.call(arguments):value;if(values===progressValues){deferred.notifyWith(contexts,values);}else if(!(--remaining)){deferred.resolveWith(contexts,values);}};},progressValues,progressContexts,resolveContexts;if(length>1){progressValues=new Array(length);progressContexts=new Array(length);resolveContexts=new Array(length);for(;i<length;i++){if(resolveValues[i]&&jQuery.isFunction(resolveValues[i].promise)){resolveValues[i].promise().done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject).progress(updateFunc(i,progressContexts,progressValues));}else{--remaining;}}}
if(!remaining){deferred.resolveWith(resolveContexts,resolveValues);}
return deferred.promise();}});jQuery.support=(function(){var support,all,a,select,opt,input,fragment,eventName,i,isSupported,clickFn,div=document.createElement("div");div.setAttribute("className","t");div.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";all=div.getElementsByTagName("*");a=div.getElementsByTagName("a")[0];a.style.cssText="top:1px;float:left;opacity:.5";if(!all||!all.length){return{};}
select=document.createElement("select");opt=select.appendChild(document.createElement("option"));input=div.getElementsByTagName("input")[0];support={leadingWhitespace:(div.firstChild.nodeType===3),tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/top/.test(a.getAttribute("style")),hrefNormalized:(a.getAttribute("href")==="/a"),opacity:/^0.5/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:(input.value==="on"),optSelected:opt.selected,getSetAttribute:div.className!=="t",enctype:!!document.createElement("form").enctype,html5Clone:document.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>",boxModel:(document.compatMode==="CSS1Compat"),submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true,boxSizingReliable:true,pixelPosition:false};input.checked=true;support.noCloneChecked=input.cloneNode(true).checked;select.disabled=true;support.optDisabled=!opt.disabled;try{delete div.test;}catch(e){support.deleteExpando=false;}
if(!div.addEventListener&&div.attachEvent&&div.fireEvent){div.attachEvent("onclick",clickFn=function(){support.noCloneEvent=false;});div.cloneNode(true).fireEvent("onclick");div.detachEvent("onclick",clickFn);}
input=document.createElement("input");input.value="t";input.setAttribute("type","radio");support.radioValue=input.value==="t";input.setAttribute("checked","checked");input.setAttribute("name","t");div.appendChild(input);fragment=document.createDocumentFragment();fragment.appendChild(div.lastChild);support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;support.appendChecked=input.checked;fragment.removeChild(input);fragment.appendChild(div);if(div.attachEvent){for(i in{submit:true,change:true,focusin:true}){eventName="on"+i;isSupported=(eventName in div);if(!isSupported){div.setAttribute(eventName,"return;");isSupported=(typeof div[eventName]==="function");}
support[i+"Bubbles"]=isSupported;}}
jQuery(function(){var container,div,tds,marginDiv,divReset="padding:0;margin:0;border:0;display:block;overflow:hidden;",body=document.getElementsByTagName("body")[0];if(!body){return;}
container=document.createElement("div");container.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";body.insertBefore(container,body.firstChild);div=document.createElement("div");container.appendChild(div);div.innerHTML="<table><tr><td></td><td>t</td></tr></table>";tds=div.getElementsByTagName("td");tds[0].style.cssText="padding:0;margin:0;border:0;display:none";isSupported=(tds[0].offsetHeight===0);tds[0].style.display="";tds[1].style.display="none";support.reliableHiddenOffsets=isSupported&&(tds[0].offsetHeight===0);div.innerHTML="";div.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";support.boxSizing=(div.offsetWidth===4);support.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==1);if(window.getComputedStyle){support.pixelPosition=(window.getComputedStyle(div,null)||{}).top!=="1%";support.boxSizingReliable=(window.getComputedStyle(div,null)||{width:"4px"}).width==="4px";marginDiv=document.createElement("div");marginDiv.style.cssText=div.style.cssText=divReset;marginDiv.style.marginRight=marginDiv.style.width="0";div.style.width="1px";div.appendChild(marginDiv);support.reliableMarginRight=!parseFloat((window.getComputedStyle(marginDiv,null)||{}).marginRight);}
if(typeof div.style.zoom!=="undefined"){div.innerHTML="";div.style.cssText=divReset+"width:1px;padding:1px;display:inline;zoom:1";support.inlineBlockNeedsLayout=(div.offsetWidth===3);div.style.display="block";div.style.overflow="visible";div.innerHTML="<div></div>";div.firstChild.style.width="5px";support.shrinkWrapBlocks=(div.offsetWidth!==3);container.style.zoom=1;}
body.removeChild(container);container=div=tds=marginDiv=null;});fragment.removeChild(div);all=a=select=opt=input=fragment=div=null;return support;})();var rbrace=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,rmultiDash=/([A-Z])/g;jQuery.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(jQuery.fn.jquery+Math.random()).replace(/\D/g,""),noData:{"embed":true,"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000","applet":true},hasData:function(elem){elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];return!!elem&&!isEmptyDataObject(elem);},data:function(elem,name,data,pvt){if(!jQuery.acceptData(elem)){return;}
var thisCache,ret,internalKey=jQuery.expando,getByName=typeof name==="string",isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[internalKey]:elem[internalKey]&&internalKey;if((!id||!cache[id]||(!pvt&&!cache[id].data))&&getByName&&data===undefined){return;}
if(!id){if(isNode){elem[internalKey]=id=jQuery.deletedIds.pop()||jQuery.guid++;}else{id=internalKey;}}
if(!cache[id]){cache[id]={};if(!isNode){cache[id].toJSON=jQuery.noop;}}
if(typeof name==="object"||typeof name==="function"){if(pvt){cache[id]=jQuery.extend(cache[id],name);}else{cache[id].data=jQuery.extend(cache[id].data,name);}}
thisCache=cache[id];if(!pvt){if(!thisCache.data){thisCache.data={};}
thisCache=thisCache.data;}
if(data!==undefined){thisCache[jQuery.camelCase(name)]=data;}
if(getByName){ret=thisCache[name];if(ret==null){ret=thisCache[jQuery.camelCase(name)];}}else{ret=thisCache;}
return ret;},removeData:function(elem,name,pvt){if(!jQuery.acceptData(elem)){return;}
var thisCache,i,l,isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[jQuery.expando]:jQuery.expando;if(!cache[id]){return;}
if(name){thisCache=pvt?cache[id]:cache[id].data;if(thisCache){if(!jQuery.isArray(name)){if(name in thisCache){name=[name];}else{name=jQuery.camelCase(name);if(name in thisCache){name=[name];}else{name=name.split(" ");}}}
for(i=0,l=name.length;i<l;i++){delete thisCache[name[i]];}
if(!(pvt?isEmptyDataObject:jQuery.isEmptyObject)(thisCache)){return;}}}
if(!pvt){delete cache[id].data;if(!isEmptyDataObject(cache[id])){return;}}
if(isNode){jQuery.cleanData([elem],true);}else if(jQuery.support.deleteExpando||cache!=cache.window){delete cache[id];}else{cache[id]=null;}},_data:function(elem,name,data){return jQuery.data(elem,name,data,true);},acceptData:function(elem){var noData=elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()];return!noData||noData!==true&&elem.getAttribute("classid")===noData;}});jQuery.fn.extend({data:function(key,value){var parts,part,attr,name,l,elem=this[0],i=0,data=null;if(key===undefined){if(this.length){data=jQuery.data(elem);if(elem.nodeType===1&&!jQuery._data(elem,"parsedAttrs")){attr=elem.attributes;for(l=attr.length;i<l;i++){name=attr[i].name;if(!name.indexOf("data-")){name=jQuery.camelCase(name.substring(5));dataAttr(elem,name,data[name]);}}
jQuery._data(elem,"parsedAttrs",true);}}
return data;}
if(typeof key==="object"){return this.each(function(){jQuery.data(this,key);});}
parts=key.split(".",2);parts[1]=parts[1]?"."+parts[1]:"";part=parts[1]+"!";return jQuery.access(this,function(value){if(value===undefined){data=this.triggerHandler("getData"+part,[parts[0]]);if(data===undefined&&elem){data=jQuery.data(elem,key);data=dataAttr(elem,key,data);}
return data===undefined&&parts[1]?this.data(parts[0]):data;}
parts[1]=value;this.each(function(){var self=jQuery(this);self.triggerHandler("setData"+part,parts);jQuery.data(this,key,value);self.triggerHandler("changeData"+part,parts);});},null,value,arguments.length>1,null,false);},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});}});function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){var name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:+data+""===data?+data:rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e){}
jQuery.data(elem,key,data);}else{data=undefined;}}
return data;}
function isEmptyDataObject(obj){var name;for(name in obj){if(name==="data"&&jQuery.isEmptyObject(obj[name])){continue;}
if(name!=="toJSON"){return false;}}
return true;}
jQuery.extend({queue:function(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=jQuery._data(elem,type);if(data){if(!queue||jQuery.isArray(data)){queue=jQuery._data(elem,type,jQuery.makeArray(data));}else{queue.push(data);}}
return queue||[];}},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function(){jQuery.dequeue(elem,type);};if(fn==="inprogress"){fn=queue.shift();startLength--;}
if(fn){if(type==="fx"){queue.unshift("inprogress");}
delete hooks.stop;fn.call(elem,next,hooks);}
if(!startLength&&hooks){hooks.empty.fire();}},_queueHooks:function(elem,type){var key=type+"queueHooks";return jQuery._data(elem,key)||jQuery._data(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){jQuery.removeData(elem,type+"queue",true);jQuery.removeData(elem,key,true);})});}});jQuery.fn.extend({queue:function(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}
if(arguments.length<setter){return jQuery.queue(this[0],type);}
return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type);});},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=setTimeout(next,time);hooks.stop=function(){clearTimeout(timeout);};});},clearQueue:function(type){return this.queue(type||"fx",[]);},promise:function(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function(){if(!(--count)){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}
type=type||"fx";while(i--){tmp=jQuery._data(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}
resolve();return defer.promise(obj);}});var nodeHook,boolHook,fixSpecified,rclass=/[\t\r\n]/g,rreturn=/\r/g,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea|)$/i,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,getSetAttribute=jQuery.support.getSetAttribute;jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name);});},prop:function(name,value){return jQuery.access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function(name){name=jQuery.propFix[name]||name;return this.each(function(){try{this[name]=undefined;delete this[name];}catch(e){}});},addClass:function(value){var classNames,i,l,elem,setClass,c,cl;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className));});}
if(value&&typeof value==="string"){classNames=value.split(core_rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1){if(!elem.className&&classNames.length===1){elem.className=value;}else{setClass=" "+elem.className+" ";for(c=0,cl=classNames.length;c<cl;c++){if(setClass.indexOf(" "+classNames[c]+" ")<0){setClass+=classNames[c]+" ";}}
elem.className=jQuery.trim(setClass);}}}}
return this;},removeClass:function(value){var removes,className,elem,c,cl,i,l;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className));});}
if((value&&typeof value==="string")||value===undefined){removes=(value||"").split(core_rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1&&elem.className){className=(" "+elem.className+" ").replace(rclass," ");for(c=0,cl=removes.length;c<cl;c++){while(className.indexOf(" "+removes[c]+" ")>=0){className=className.replace(" "+removes[c]+" "," ");}}
elem.className=value?jQuery.trim(className):"";}}}
return this;},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal);});}
return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(core_rspace);while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);self[state?"addClass":"removeClass"](className);}}else if(type==="undefined"||type==="boolean"){if(this.className){jQuery._data(this,"__className__",this.className);}
this.className=this.className||value===false?"":jQuery._data(this,"__className__")||"";}});},hasClass:function(selector){var className=" "+selector+" ",i=0,l=this.length;for(;i<l;i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>=0){return true;}}
return false;},val:function(value){var hooks,ret,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}
ret=elem.value;return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret;}
return;}
isFunction=jQuery.isFunction(value);return this.each(function(i){var val,self=jQuery(this);if(this.nodeType!==1){return;}
if(isFunction){val=value.call(this,i,self.val());}else{val=value;}
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}
hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function(elem){var val=elem.attributes.value;return!val||val.specified?elem.value:elem.text;}},select:{get:function(elem){var value,i,max,option,index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";if(index<0){return null;}
i=one?index:0;max=one?index+1:options.length;for(;i<max;i++){option=options[i];if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();if(one){return value;}
values.push(value);}}
if(one&&!values.length&&options.length){return jQuery(options[index]).val();}
return values;},set:function(elem,value){var values=jQuery.makeArray(value);jQuery(elem).find("option").each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0;});if(!values.length){elem.selectedIndex=-1;}
return values;}}},attrFn:{},attr:function(elem,name,value,pass){var ret,hooks,notxml,nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return;}
if(pass&&jQuery.isFunction(jQuery.fn[name])){return jQuery(elem)[name](value);}
if(typeof elem.getAttribute==="undefined"){return jQuery.prop(elem,name,value);}
notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){name=name.toLowerCase();hooks=jQuery.attrHooks[name]||(rboolean.test(name)?boolHook:nodeHook);}
if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return;}else if(hooks&&"set"in hooks&&notxml&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{elem.setAttribute(name,value+"");return value;}}else if(hooks&&"get"in hooks&&notxml&&(ret=hooks.get(elem,name))!==null){return ret;}else{ret=elem.getAttribute(name);return ret===null?undefined:ret;}},removeAttr:function(elem,value){var propName,attrNames,name,isBool,i=0;if(value&&elem.nodeType===1){attrNames=value.split(core_rspace);for(;i<attrNames.length;i++){name=attrNames[i];if(name){propName=jQuery.propFix[name]||name;isBool=rboolean.test(name);if(!isBool){jQuery.attr(elem,name,"");}
elem.removeAttribute(getSetAttribute?name:propName);if(isBool&&propName in elem){elem[propName]=false;}}}}},attrHooks:{type:{set:function(elem,value){if(rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed");}else if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}
return value;}}},value:{get:function(elem,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.get(elem,name);}
return name in elem?elem.value:null;},set:function(elem,value,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.set(elem,value,name);}
elem.value=value;}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(elem,name,value){var ret,hooks,notxml,nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return;}
notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}
if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{return(elem[name]=value);}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}else{return elem[name];}}},propHooks:{tabIndex:{get:function(elem){var attributeNode=elem.getAttributeNode("tabindex");return attributeNode&&attributeNode.specified?parseInt(attributeNode.value,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined;}}}});boolHook={get:function(elem,name){var attrNode,property=jQuery.prop(elem,name);return property===true||typeof property!=="boolean"&&(attrNode=elem.getAttributeNode(name))&&attrNode.nodeValue!==false?name.toLowerCase():undefined;},set:function(elem,value,name){var propName;if(value===false){jQuery.removeAttr(elem,name);}else{propName=jQuery.propFix[name]||name;if(propName in elem){elem[propName]=true;}
elem.setAttribute(name,name.toLowerCase());}
return name;}};if(!getSetAttribute){fixSpecified={name:true,id:true,coords:true};nodeHook=jQuery.valHooks.button={get:function(elem,name){var ret;ret=elem.getAttributeNode(name);return ret&&(fixSpecified[name]?ret.value!=="":ret.specified)?ret.value:undefined;},set:function(elem,value,name){var ret=elem.getAttributeNode(name);if(!ret){ret=document.createAttribute(name);elem.setAttributeNode(ret);}
return(ret.value=value+"");}};jQuery.each(["width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{set:function(elem,value){if(value===""){elem.setAttribute(name,"auto");return value;}}});});jQuery.attrHooks.contenteditable={get:nodeHook.get,set:function(elem,value,name){if(value===""){value="false";}
nodeHook.set(elem,value,name);}};}
if(!jQuery.support.hrefNormalized){jQuery.each(["href","src","width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{get:function(elem){var ret=elem.getAttribute(name,2);return ret===null?undefined:ret;}});});}
if(!jQuery.support.style){jQuery.attrHooks.style={get:function(elem){return elem.style.cssText.toLowerCase()||undefined;},set:function(elem,value){return(elem.style.cssText=value+"");}};}
if(!jQuery.support.optSelected){jQuery.propHooks.selected=jQuery.extend(jQuery.propHooks.selected,{get:function(elem){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}
return null;}});}
if(!jQuery.support.enctype){jQuery.propFix.enctype="encoding";}
if(!jQuery.support.checkOn){jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={get:function(elem){return elem.getAttribute("value")===null?"on":elem.value;}};});}
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]=jQuery.extend(jQuery.valHooks[this],{set:function(elem,value){if(jQuery.isArray(value)){return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0);}}});});var rformElems=/^(?:textarea|input|select)$/i,rtypenamespace=/^([^\.]*|)(?:\.(.+)|)$/,rhoverHack=/(?:^|\s)hover(\.\S+|)\b/,rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|contextmenu)|click/,rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,hoverHack=function(events){return jQuery.event.special.hover?events:events.replace(rhoverHack,"mouseenter$1 mouseleave$1");};jQuery.event={add:function(elem,types,handler,data,selector){var elemData,eventHandle,events,t,tns,type,namespaces,handleObj,handleObjIn,handlers,special;if(elem.nodeType===3||elem.nodeType===8||!types||!handler||!(elemData=jQuery._data(elem))){return;}
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;}
if(!handler.guid){handler.guid=jQuery.guid++;}
events=elemData.events;if(!events){elemData.events=events={};}
eventHandle=elemData.handle;if(!eventHandle){elemData.handle=eventHandle=function(e){return typeof jQuery!=="undefined"&&(!e||jQuery.event.triggered!==e.type)?jQuery.event.dispatch.apply(eventHandle.elem,arguments):undefined;};eventHandle.elem=elem;}
types=jQuery.trim(hoverHack(types)).split(" ");for(t=0;t<types.length;t++){tns=rtypenamespace.exec(types[t])||[];type=tns[1];namespaces=(tns[2]||"").split(".").sort();special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;special=jQuery.event.special[type]||{};handleObj=jQuery.extend({type:type,origType:tns[1],data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);handlers=events[type];if(!handlers){handlers=events[type]=[];handlers.delegateCount=0;if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false);}else if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle);}}}
if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else{handlers.push(handleObj);}
jQuery.event.global[type]=true;}
elem=null;},global:{},remove:function(elem,types,handler,selector,mappedTypes){var t,tns,type,origType,namespaces,origCount,j,events,special,eventType,handleObj,elemData=jQuery.hasData(elem)&&jQuery._data(elem);if(!elemData||!(events=elemData.events)){return;}
types=jQuery.trim(hoverHack(types||"")).split(" ");for(t=0;t<types.length;t++){tns=rtypenamespace.exec(types[t])||[];type=origType=tns[1];namespaces=tns[2];if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}
continue;}
special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;eventType=events[type]||[];origCount=eventType.length;namespaces=namespaces?new RegExp("(^|\\.)"+namespaces.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(j=0;j<eventType.length;j++){handleObj=eventType[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!namespaces||namespaces.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){eventType.splice(j--,1);if(handleObj.selector){eventType.delegateCount--;}
if(special.remove){special.remove.call(elem,handleObj);}}}
if(eventType.length===0&&origCount!==eventType.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}
delete events[type];}}
if(jQuery.isEmptyObject(events)){delete elemData.handle;jQuery.removeData(elem,"events",true);}},customEvent:{"getData":true,"setData":true,"changeData":true},trigger:function(event,data,elem,onlyHandlers){if(elem&&(elem.nodeType===3||elem.nodeType===8)){return;}
var cache,exclusive,i,cur,old,ontype,special,handle,eventPath,bubbleType,type=event.type||event,namespaces=[];if(rfocusMorph.test(type+jQuery.event.triggered)){return;}
if(type.indexOf("!")>=0){type=type.slice(0,-1);exclusive=true;}
if(type.indexOf(".")>=0){namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}
if((!elem||jQuery.event.customEvent[type])&&!jQuery.event.global[type]){return;}
event=typeof event==="object"?event[jQuery.expando]?event:new jQuery.Event(type,event):new jQuery.Event(type);event.type=type;event.isTrigger=true;event.exclusive=exclusive;event.namespace=namespaces.join(".");event.namespace_re=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;ontype=type.indexOf(":")<0?"on"+type:"";if(!elem){cache=jQuery.cache;for(i in cache){if(cache[i].events&&cache[i].events[type]){jQuery.event.trigger(event,data,cache[i].handle.elem,true);}}
return;}
event.result=undefined;if(!event.target){event.target=elem;}
data=data!=null?jQuery.makeArray(data):[];data.unshift(event);special=jQuery.event.special[type]||{};if(special.trigger&&special.trigger.apply(elem,data)===false){return;}
eventPath=[[elem,special.bindType||type]];if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;cur=rfocusMorph.test(bubbleType+type)?elem:elem.parentNode;for(old=elem;cur;cur=cur.parentNode){eventPath.push([cur,bubbleType]);old=cur;}
if(old===(elem.ownerDocument||document)){eventPath.push([old.defaultView||old.parentWindow||window,bubbleType]);}}
for(i=0;i<eventPath.length&&!event.isPropagationStopped();i++){cur=eventPath[i][0];event.type=eventPath[i][1];handle=(jQuery._data(cur,"events")||{})[event.type]&&jQuery._data(cur,"handle");if(handle){handle.apply(cur,data);}
handle=ontype&&cur[ontype];if(handle&&jQuery.acceptData(cur)&&handle.apply&&handle.apply(cur,data)===false){event.preventDefault();}}
event.type=type;if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(elem.ownerDocument,data)===false)&&!(type==="click"&&jQuery.nodeName(elem,"a"))&&jQuery.acceptData(elem)){if(ontype&&elem[type]&&((type!=="focus"&&type!=="blur")||event.target.offsetWidth!==0)&&!jQuery.isWindow(elem)){old=elem[ontype];if(old){elem[ontype]=null;}
jQuery.event.triggered=type;elem[type]();jQuery.event.triggered=undefined;if(old){elem[ontype]=old;}}}}
return event.result;},dispatch:function(event){event=jQuery.event.fix(event||window.event);var i,j,cur,ret,selMatch,matched,matches,handleObj,sel,related,handlers=((jQuery._data(this,"events")||{})[event.type]||[]),delegateCount=handlers.delegateCount,args=core_slice.call(arguments),run_all=!event.exclusive&&!event.namespace,special=jQuery.event.special[event.type]||{},handlerQueue=[];args[0]=event;event.delegateTarget=this;if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;}
if(delegateCount&&!(event.button&&event.type==="click")){for(cur=event.target;cur!=this;cur=cur.parentNode||this){if(cur.disabled!==true||event.type!=="click"){selMatch={};matches=[];for(i=0;i<delegateCount;i++){handleObj=handlers[i];sel=handleObj.selector;if(selMatch[sel]===undefined){selMatch[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>=0:jQuery.find(sel,this,null,[cur]).length;}
if(selMatch[sel]){matches.push(handleObj);}}
if(matches.length){handlerQueue.push({elem:cur,matches:matches});}}}}
if(handlers.length>delegateCount){handlerQueue.push({elem:this,matches:handlers.slice(delegateCount)});}
for(i=0;i<handlerQueue.length&&!event.isPropagationStopped();i++){matched=handlerQueue[i];event.currentTarget=matched.elem;for(j=0;j<matched.matches.length&&!event.isImmediatePropagationStopped();j++){handleObj=matched.matches[j];if(run_all||(!event.namespace&&!handleObj.namespace)||event.namespace_re&&event.namespace_re.test(handleObj.namespace)){event.data=handleObj.data;event.handleObj=handleObj;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){event.result=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}}}}
if(special.postDispatch){special.postDispatch.call(this,event);}
return event.result;},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(event,original){if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode;}
return event;}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(event,original){var eventDoc,doc,body,button=original.button,fromElement=original.fromElement;if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);}
if(!event.relatedTarget&&fromElement){event.relatedTarget=fromElement===event.target?original.toElement:fromElement;}
if(!event.which&&button!==undefined){event.which=(button&1?1:(button&2?3:(button&4?2:0)));}
return event;}},fix:function(event){if(event[jQuery.expando]){return event;}
var i,prop,originalEvent=event,fixHook=jQuery.event.fixHooks[event.type]||{},copy=fixHook.props?this.props.concat(fixHook.props):this.props;event=jQuery.Event(originalEvent);for(i=copy.length;i;){prop=copy[--i];event[prop]=originalEvent[prop];}
if(!event.target){event.target=originalEvent.srcElement||document;}
if(event.target.nodeType===3){event.target=event.target.parentNode;}
event.metaKey=!!event.metaKey;return fixHook.filter?fixHook.filter(event,originalEvent):event;},special:{load:{noBubble:true},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(data,namespaces,eventHandle){if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle;}},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null;}}}},simulate:function(type,elem,event,bubble){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true,originalEvent:{}});if(bubble){jQuery.event.trigger(e,null,elem);}else{jQuery.event.dispatch.call(elem,e);}
if(e.isDefaultPrevented()){event.preventDefault();}}};jQuery.event.handle=jQuery.event.dispatch;jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false);}}:function(elem,type,handle){var name="on"+type;if(elem.detachEvent){if(typeof elem[name]==="undefined"){elem[name]=null;}
elem.detachEvent(name,handle);}};jQuery.Event=function(src,props){if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}
if(src&&src.type){this.originalEvent=src;this.type=src.type;this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse;}else{this.type=src;}
if(props){jQuery.extend(this,props);}
this.timeStamp=src&&src.timeStamp||jQuery.now();this[jQuery.expando]=true;};function returnFalse(){return false;}
function returnTrue(){return true;}
jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.stopPropagation){e.stopPropagation();}
e.cancelBubble=true;},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation();},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj,selector=handleObj.selector;if(!related||(related!==target&&!jQuery.contains(target,related))){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}
return ret;}};});if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(){if(jQuery.nodeName(this,"form")){return false;}
jQuery.event.add(this,"click._submit keypress._submit",function(e){var elem=e.target,form=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.form:undefined;if(form&&!jQuery._data(form,"_submit_attached")){jQuery.event.add(form,"submit._submit",function(event){event._submit_bubble=true;});jQuery._data(form,"_submit_attached",true);}});},postDispatch:function(event){if(event._submit_bubble){delete event._submit_bubble;if(this.parentNode&&!event.isTrigger){jQuery.event.simulate("submit",this.parentNode,event,true);}}},teardown:function(){if(jQuery.nodeName(this,"form")){return false;}
jQuery.event.remove(this,"._submit");}};}
if(!jQuery.support.changeBubbles){jQuery.event.special.change={setup:function(){if(rformElems.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){jQuery.event.add(this,"propertychange._change",function(event){if(event.originalEvent.propertyName==="checked"){this._just_changed=true;}});jQuery.event.add(this,"click._change",function(event){if(this._just_changed&&!event.isTrigger){this._just_changed=false;}
jQuery.event.simulate("change",this,event,true);});}
return false;}
jQuery.event.add(this,"beforeactivate._change",function(e){var elem=e.target;if(rformElems.test(elem.nodeName)&&!jQuery._data(elem,"_change_attached")){jQuery.event.add(elem,"change._change",function(event){if(this.parentNode&&!event.isSimulated&&!event.isTrigger){jQuery.event.simulate("change",this.parentNode,event,true);}});jQuery._data(elem,"_change_attached",true);}});},handle:function(event){var elem=event.target;if(this!==elem||event.isSimulated||event.isTrigger||(elem.type!=="radio"&&elem.type!=="checkbox")){return event.handleObj.handler.apply(this,arguments);}},teardown:function(){jQuery.event.remove(this,"._change");return!rformElems.test(this.nodeName);}};}
if(!jQuery.support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){var attaches=0,handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true);};jQuery.event.special[fix]={setup:function(){if(attaches++===0){document.addEventListener(orig,handler,true);}},teardown:function(){if(--attaches===0){document.removeEventListener(orig,handler,true);}}};});}
jQuery.fn.extend({on:function(types,selector,data,fn,one){var origFn,type;if(typeof types==="object"){if(typeof selector!=="string"){data=data||selector;selector=undefined;}
for(type in types){this.on(type,selector,data,types[type],one);}
return this;}
if(data==null&&fn==null){fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){fn=data;data=undefined;}else{fn=data;data=selector;selector=undefined;}}
if(fn===false){fn=returnFalse;}else if(!fn){return this;}
if(one===1){origFn=fn;fn=function(event){jQuery().off(event);return origFn.apply(this,arguments);};fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}
return this.each(function(){jQuery.event.add(this,types,fn,data,selector);});},one:function(types,selector,data,fn){return this.on(types,selector,data,fn,1);},off:function(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}
if(typeof types==="object"){for(type in types){this.off(type,selector,types[type]);}
return this;}
if(selector===false||typeof selector==="function"){fn=selector;selector=undefined;}
if(fn===false){fn=returnFalse;}
return this.each(function(){jQuery.event.remove(this,types,fn,selector);});},bind:function(types,data,fn){return this.on(types,null,data,fn);},unbind:function(types,fn){return this.off(types,null,fn);},live:function(types,data,fn){jQuery(this.context).on(types,this.selector,data,fn);return this;},die:function(types,fn){jQuery(this.context).off(types,this.selector||"**",fn);return this;},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function(selector,types,fn){return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){if(this[0]){return jQuery.event.trigger(type,data,this[0],true);}},toggle:function(fn){var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function(event){var lastToggle=(jQuery._data(this,"lastToggle"+fn.guid)||0)%i;jQuery._data(this,"lastToggle"+fn.guid,lastToggle+1);event.preventDefault();return args[lastToggle].apply(this,arguments)||false;};toggler.guid=guid;while(i<args.length){args[i++].guid=guid;}
return this.click(toggler);},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;data=null;}
return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};if(rkeyEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.keyHooks;}
if(rmouseEvent.test(name)){jQuery.event.fixHooks[name]=jQuery.event.mouseHooks;}});(function(window,undefined){var cachedruns,assertGetIdNotName,Expr,getText,isXML,contains,compile,sortOrder,hasDuplicate,outermostContext,baseHasDuplicate=true,strundefined="undefined",expando=("sizcache"+Math.random()).replace(".",""),Token=String,document=window.document,docElem=document.documentElement,dirruns=0,done=0,pop=[].pop,push=[].push,slice=[].slice,indexOf=[].indexOf||function(elem){var i=0,len=this.length;for(;i<len;i++){if(this[i]===elem){return i;}}
return-1;},markFunction=function(fn,value){fn[expando]=value==null||value;return fn;},createCache=function(){var cache={},keys=[];return markFunction(function(key,value){if(keys.push(key)>Expr.cacheLength){delete cache[keys.shift()];}
return(cache[key]=value);},cache);},classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),whitespace="[\\x20\\t\\r\\n\\f]",characterEncoding="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",identifier=characterEncoding.replace("w","w#"),operators="([*^$|!~]?=)",attributes="\\["+whitespace+"*("+characterEncoding+")"+whitespace+"*(?:"+operators+whitespace+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+identifier+")|)|)"+whitespace+"*\\]",pseudos=":("+characterEncoding+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+attributes+")|[^:]|\\\\.)*|.*))\\)|)",pos=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)",rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([\\x20\\t\\r\\n\\f>+~])"+whitespace+"*"),rpseudo=new RegExp(pseudos),rquickExpr=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,rnot=/^:not/,rsibling=/[\x20\t\r\n\f]*[+~]/,rendsWithNot=/:not\($/,rheader=/h\d/i,rinputs=/input|select|textarea|button/i,rbackslash=/\\(?!\\)/g,matchExpr={"ID":new RegExp("^#("+characterEncoding+")"),"CLASS":new RegExp("^\\.("+characterEncoding+")"),"NAME":new RegExp("^\\[name=['\"]?("+characterEncoding+")['\"]?\\]"),"TAG":new RegExp("^("+characterEncoding.replace("w","w*")+")"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"POS":new RegExp(pos,"i"),"CHILD":new RegExp("^:(only|nth|first|last)-child(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"needsContext":new RegExp("^"+whitespace+"*[>+~]|"+pos,"i")},assert=function(fn){var div=document.createElement("div");try{return fn(div);}catch(e){return false;}finally{div=null;}},assertTagNameNoComments=assert(function(div){div.appendChild(document.createComment(""));return!div.getElementsByTagName("*").length;}),assertHrefNotNormalized=assert(function(div){div.innerHTML="<a href='#'></a>";return div.firstChild&&typeof div.firstChild.getAttribute!==strundefined&&div.firstChild.getAttribute("href")==="#";}),assertAttributes=assert(function(div){div.innerHTML="<select></select>";var type=typeof div.lastChild.getAttribute("multiple");return type!=="boolean"&&type!=="string";}),assertUsableClassName=assert(function(div){div.innerHTML="<div class='hidden e'></div><div class='hidden'></div>";if(!div.getElementsByClassName||!div.getElementsByClassName("e").length){return false;}
div.lastChild.className="e";return div.getElementsByClassName("e").length===2;}),assertUsableName=assert(function(div){div.id=expando+0;div.innerHTML="<a name='"+expando+"'></a><div name='"+expando+"'></div>";docElem.insertBefore(div,docElem.firstChild);var pass=document.getElementsByName&&document.getElementsByName(expando).length===2+
document.getElementsByName(expando+0).length;assertGetIdNotName=!document.getElementById(expando);docElem.removeChild(div);return pass;});try{slice.call(docElem.childNodes,0)[0].nodeType;}catch(e){slice=function(i){var elem,results=[];for(;(elem=this[i]);i++){results.push(elem);}
return results;};}
function Sizzle(selector,context,results,seed){results=results||[];context=context||document;var match,elem,xml,m,nodeType=context.nodeType;if(!selector||typeof selector!=="string"){return results;}
if(nodeType!==1&&nodeType!==9){return[];}
xml=isXML(context);if(!xml&&!seed){if((match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){elem=context.getElementById(m);if(elem&&elem.parentNode){if(elem.id===m){results.push(elem);return results;}}else{return results;}}else{if(context.ownerDocument&&(elem=context.ownerDocument.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}}else if(match[2]){push.apply(results,slice.call(context.getElementsByTagName(selector),0));return results;}else if((m=match[3])&&assertUsableClassName&&context.getElementsByClassName){push.apply(results,slice.call(context.getElementsByClassName(m),0));return results;}}}
return select(selector.replace(rtrim,"$1"),context,results,seed,xml);}
Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){return Sizzle(expr,null,null,[elem]).length>0;};function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}
function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}
function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j]);}}});});}
getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(nodeType){if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent;}else{for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}}else{for(;(node=elem[i]);i++){ret+=getText(node);}}
return ret;};isXML=Sizzle.isXML=function(elem){var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};contains=Sizzle.contains=docElem.contains?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&adown.contains&&adown.contains(bup));}:docElem.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16);}:function(a,b){while((b=b.parentNode)){if(b===a){return true;}}
return false;};Sizzle.attr=function(elem,name){var val,xml=isXML(elem);if(!xml){name=name.toLowerCase();}
if((val=Expr.attrHandle[name])){return val(elem);}
if(xml||assertAttributes){return elem.getAttribute(name);}
val=elem.getAttributeNode(name);return val?typeof elem[name]==="boolean"?elem[name]?name:null:val.specified?val.value:null:null;};Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:assertHrefNotNormalized?{}:{"href":function(elem){return elem.getAttribute("href",2);},"type":function(elem){return elem.getAttribute("type");}},find:{"ID":assertGetIdNotName?function(id,context,xml){if(typeof context.getElementById!==strundefined&&!xml){var m=context.getElementById(id);return m&&m.parentNode?[m]:[];}}:function(id,context,xml){if(typeof context.getElementById!==strundefined&&!xml){var m=context.getElementById(id);return m?m.id===id||typeof m.getAttributeNode!==strundefined&&m.getAttributeNode("id").value===id?[m]:undefined:[];}},"TAG":assertTagNameNoComments?function(tag,context){if(typeof context.getElementsByTagName!==strundefined){return context.getElementsByTagName(tag);}}:function(tag,context){var results=context.getElementsByTagName(tag);if(tag==="*"){var elem,tmp=[],i=0;for(;(elem=results[i]);i++){if(elem.nodeType===1){tmp.push(elem);}}
return tmp;}
return results;},"NAME":assertUsableName&&function(tag,context){if(typeof context.getElementsByName!==strundefined){return context.getElementsByName(name);}},"CLASS":assertUsableClassName&&function(className,context,xml){if(typeof context.getElementsByClassName!==strundefined&&!xml){return context.getElementsByClassName(className);}}},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function(match){match[1]=match[1].replace(rbackslash,"");match[3]=(match[4]||match[5]||"").replace(rbackslash,"");if(match[2]==="~="){match[3]=" "+match[3]+" ";}
return match.slice(0,4);},"CHILD":function(match){match[1]=match[1].toLowerCase();if(match[1]==="nth"){if(!match[2]){Sizzle.error(match[0]);}
match[3]=+(match[3]?match[4]+(match[5]||1):2*(match[2]==="even"||match[2]==="odd"));match[4]=+((match[6]+match[7])||match[2]==="odd");}else if(match[2]){Sizzle.error(match[0]);}
return match;},"PSEUDO":function(match){var unquoted,excess;if(matchExpr["CHILD"].test(match[0])){return null;}
if(match[3]){match[2]=match[3];}else if((unquoted=match[4])){if(rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){unquoted=unquoted.slice(0,excess);match[0]=match[0].slice(0,excess);}
match[2]=unquoted;}
return match.slice(0,3);}},filter:{"ID":assertGetIdNotName?function(id){id=id.replace(rbackslash,"");return function(elem){return elem.getAttribute("id")===id;};}:function(id){id=id.replace(rbackslash,"");return function(elem){var node=typeof elem.getAttributeNode!==strundefined&&elem.getAttributeNode("id");return node&&node.value===id;};},"TAG":function(nodeName){if(nodeName==="*"){return function(){return true;};}
nodeName=nodeName.replace(rbackslash,"").toLowerCase();return function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function(className){var pattern=classCache[expando][className];if(!pattern){pattern=classCache(className,new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"));}
return function(elem){return pattern.test(elem.className||(typeof elem.getAttribute!==strundefined&&elem.getAttribute("class"))||"");};},"ATTR":function(name,operator,check){return function(elem,context){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}
if(!operator){return true;}
result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.substr(result.length-check.length)===check:operator==="~="?(" "+result+" ").indexOf(check)>-1:operator==="|="?result===check||result.substr(0,check.length+1)===check+"-":false;};},"CHILD":function(type,argument,first,last){if(type==="nth"){return function(elem){var node,diff,parent=elem.parentNode;if(first===1&&last===0){return true;}
if(parent){diff=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){diff++;if(elem===node){break;}}}}
diff-=last;return diff===first||(diff%first===0&&diff/first>=0);};}
return function(elem){var node=elem;switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false;}}
if(type==="first"){return true;}
node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false;}}
return true;}};},"PSEUDO":function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);if(fn[expando]){return fn(argument);}
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf.call(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}
return fn;}},pseudos:{"not":markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results);return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}),"enabled":function(elem){return elem.disabled===false;},"disabled":function(elem){return elem.disabled===true;},"checked":function(elem){var nodeName=elem.nodeName.toLowerCase();return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected);},"selected":function(elem){if(elem.parentNode){elem.parentNode.selectedIndex;}
return elem.selected===true;},"parent":function(elem){return!Expr.pseudos["empty"](elem);},"empty":function(elem){var nodeType;elem=elem.firstChild;while(elem){if(elem.nodeName>"@"||(nodeType=elem.nodeType)===3||nodeType===4){return false;}
elem=elem.nextSibling;}
return true;},"header":function(elem){return rheader.test(elem.nodeName);},"text":function(elem){var type,attr;return elem.nodeName.toLowerCase()==="input"&&(type=elem.type)==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()===type);},"radio":createInputPseudo("radio"),"checkbox":createInputPseudo("checkbox"),"file":createInputPseudo("file"),"password":createInputPseudo("password"),"image":createInputPseudo("image"),"submit":createButtonPseudo("submit"),"reset":createButtonPseudo("reset"),"button":function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"input":function(elem){return rinputs.test(elem.nodeName);},"focus":function(elem){var doc=elem.ownerDocument;return elem===doc.activeElement&&(!doc.hasFocus||doc.hasFocus())&&!!(elem.type||elem.href);},"active":function(elem){return elem===elem.ownerDocument.activeElement;},"first":createPositionalPseudo(function(matchIndexes,length,argument){return[0];}),"last":createPositionalPseudo(function(matchIndexes,length,argument){return[length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length,argument){for(var i=0;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length,argument){for(var i=1;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){for(var i=argument<0?argument+length:argument;--i>=0;){matchIndexes.push(i);}
return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){for(var i=argument<0?argument+length:argument;++i<length;){matchIndexes.push(i);}
return matchIndexes;})}};function siblingCheck(a,b,ret){if(a===b){return ret;}
var cur=a.nextSibling;while(cur){if(cur===b){return-1;}
cur=cur.nextSibling;}
return 1;}
sortOrder=docElem.compareDocumentPosition?function(a,b){if(a===b){hasDuplicate=true;return 0;}
return(!a.compareDocumentPosition||!b.compareDocumentPosition?a.compareDocumentPosition:a.compareDocumentPosition(b)&4)?-1:1;}:function(a,b){if(a===b){hasDuplicate=true;return 0;}else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex;}
var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;if(aup===bup){return siblingCheck(a,b);}else if(!aup){return-1;}else if(!bup){return 1;}
while(cur){ap.unshift(cur);cur=cur.parentNode;}
cur=bup;while(cur){bp.unshift(cur);cur=cur.parentNode;}
al=ap.length;bl=bp.length;for(var i=0;i<al&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i]);}}
return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1);};[0,0].sort(sortOrder);baseHasDuplicate=!hasDuplicate;Sizzle.uniqueSort=function(results){var elem,i=1;hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(;(elem=results[i]);i++){if(elem===results[i-1]){results.splice(i--,1);}}}
return results;};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};function tokenize(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[expando][selector];if(cached){return parseOnly?0:cached.slice(0);}
soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length);}
groups.push(tokens=[]);}
matched=false;if((match=rcombinators.exec(soFar))){tokens.push(matched=new Token(match.shift()));soFar=soFar.slice(matched.length);matched.type=match[0].replace(rtrim," ");}
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match,document,true)))){tokens.push(matched=new Token(match.shift()));soFar=soFar.slice(matched.length);matched.type=type;matched.matches=match;}}
if(!matched){break;}}
return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0);}
function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&combinator.dir==="parentNode",doneName=done++;return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(checkNonElements||elem.nodeType===1){return matcher(elem,context,xml);}}}:function(elem,context,xml){if(!xml){var cache,dirkey=dirruns+" "+doneName+" ",cachedkey=dirkey+cachedruns;while((elem=elem[dir])){if(checkNonElements||elem.nodeType===1){if((cache=elem[expando])===cachedkey){return elem.sizset;}else if(typeof cache==="string"&&cache.indexOf(dirkey)===0){if(elem.sizset){return elem;}}else{elem[expando]=cachedkey;if(matcher(elem,context,xml)){elem.sizset=true;return elem;}
elem.sizset=false;}}}}else{while((elem=elem[dir])){if(checkNonElements||elem.nodeType===1){if(matcher(elem,context,xml)){return elem;}}}}};}
function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}
return true;}:matchers[0];}
function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}
return newUnmatched;}
function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}
if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}
return markFunction(function(seed,results,context,xml){if(seed&&postFinder){return;}
var i,elem,postFilterIn,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[],seed),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;if(matcher){matcher(matcherIn,matcherOut,context,xml);}
if(postFilter){postFilterIn=condense(matcherOut,postMap);postFilter(postFilterIn,[],context,xml);i=postFilterIn.length;while(i--){if((elem=postFilterIn[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}
if(seed){i=preFilter&&matcherOut.length;while(i--){if((elem=matcherOut[i])){seed[preMap[i]]=!(results[preMap[i]]=elem);}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}
function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf.call(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){return(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));}];for(;i<len;i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);if(matcher[expando]){j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}
return setMatcher(i>1&&elementMatcher(matchers),i>1&&tokens.slice(0,i-1).join("").replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&tokens.join(""));}
matchers.push(matcher);}}
return elementMatcher(matchers);}
function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,expandContext){var elem,j,matcher,setMatched=[],matchedCount=0,i="0",unmatched=seed&&[],outermost=expandContext!=null,contextBackup=outermostContext,elems=seed||byElement&&Expr.find["TAG"]("*",expandContext&&context.parentNode||context),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.E);if(outermost){outermostContext=context!==document&&context;cachedruns=superMatcher.el;}
for(;(elem=elems[i])!=null;i++){if(byElement&&elem){for(j=0;(matcher=elementMatchers[j]);j++){if(matcher(elem,context,xml)){results.push(elem);break;}}
if(outermost){dirruns=dirrunsUnique;cachedruns=++superMatcher.el;}}
if(bySet){if((elem=!matcher&&elem)){matchedCount--;}
if(seed){unmatched.push(elem);}}}
matchedCount+=i;if(bySet&&i!==matchedCount){for(j=0;(matcher=setMatchers[j]);j++){matcher(unmatched,setMatched,context,xml);}
if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}
setMatched=condense(setMatched);}
push.apply(results,setMatched);if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results);}}
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}
return unmatched;};superMatcher.el=0;return bySet?markFunction(superMatcher):superMatcher;}
compile=Sizzle.compile=function(selector,group){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[expando][selector];if(!cached){if(!group){group=tokenize(selector);}
i=group.length;while(i--){cached=matcherFromTokens(group[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));}
return cached;};function multipleContexts(selector,contexts,results,seed){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results,seed);}
return results;}
function select(selector,context,results,seed,xml){var i,tokens,token,type,find,match=tokenize(selector),j=match.length;if(!seed){if(match.length===1){tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&context.nodeType===9&&!xml&&Expr.relative[tokens[1].type]){context=Expr.find["ID"](token.matches[0].replace(rbackslash,""),context,xml)[0];if(!context){return results;}
selector=selector.slice(tokens.shift().length);}
for(i=matchExpr["POS"].test(selector)?-1:tokens.length-1;i>=0;i--){token=tokens[i];if(Expr.relative[(type=token.type)]){break;}
if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(rbackslash,""),rsibling.test(tokens[0].type)&&context.parentNode||context,xml))){tokens.splice(i,1);selector=seed.length&&tokens.join("");if(!selector){push.apply(results,slice.call(seed,0));return results;}
break;}}}}}
compile(selector,match)(seed,context,xml,results,rsibling.test(selector));return results;}
if(document.querySelectorAll){(function(){var disconnectedMatch,oldSelect=select,rescape=/'|\\/g,rattributeQuotes=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,rbuggyQSA=[":focus"],rbuggyMatches=[":active",":focus"],matches=docElem.matchesSelector||docElem.mozMatchesSelector||docElem.webkitMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector;assert(function(div){div.innerHTML="<select><option selected=''></option></select>";if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)");}
if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}});assert(function(div){div.innerHTML="<p test=''></p>";if(div.querySelectorAll("[test^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:\"\"|'')");}
div.innerHTML="<input type='hidden'/>";if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled");}});rbuggyQSA=new RegExp(rbuggyQSA.join("|"));select=function(selector,context,results,seed,xml){if(!seed&&!xml&&(!rbuggyQSA||!rbuggyQSA.test(selector))){var groups,i,old=true,nid=expando,newContext=context,newSelector=context.nodeType===9&&selector;if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){groups=tokenize(selector);if((old=context.getAttribute("id"))){nid=old.replace(rescape,"\\$&");}else{context.setAttribute("id",nid);}
nid="[id='"+nid+"'] ";i=groups.length;while(i--){groups[i]=nid+groups[i].join("");}
newContext=rsibling.test(selector)&&context.parentNode||context;newSelector=groups.join(",");}
if(newSelector){try{push.apply(results,slice.call(newContext.querySelectorAll(newSelector),0));return results;}catch(qsaError){}finally{if(!old){context.removeAttribute("id");}}}}
return oldSelect(selector,context,results,seed,xml);};if(matches){assert(function(div){disconnectedMatch=matches.call(div,"div");try{matches.call(div,"[test!='']:sizzle");rbuggyMatches.push("!=",pseudos);}catch(e){}});rbuggyMatches=new RegExp(rbuggyMatches.join("|"));Sizzle.matchesSelector=function(elem,expr){expr=expr.replace(rattributeQuotes,"='$1']");if(!isXML(elem)&&!rbuggyMatches.test(expr)&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);if(ret||disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}
return Sizzle(expr,null,null,[elem]).length>0;};}})();}
Expr.pseudos["nth"]=Expr.pseudos["eq"];function setFilters(){}
Expr.filters=setFilters.prototype=Expr.pseudos;Expr.setFilters=new setFilters();Sizzle.attr=jQuery.attr;jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;})(window);var runtil=/Until$/,rparentsprev=/^(?:parents|prev(?:Until|All))/,isSimple=/^.[^:#\[\.,]*$/,rneedsContext=jQuery.expr.match.needsContext,guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({find:function(selector){var i,l,length,n,r,ret,self=this;if(typeof selector!=="string"){return jQuery(selector).filter(function(){for(i=0,l=self.length;i<l;i++){if(jQuery.contains(self[i],this)){return true;}}});}
ret=this.pushStack("","find",selector);for(i=0,l=this.length;i<l;i++){length=ret.length;jQuery.find(selector,this[i],ret);if(i>0){for(n=length;n<ret.length;n++){for(r=0;r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);break;}}}}}
return ret;},has:function(target){var i,targets=jQuery(target,this),len=targets.length;return this.filter(function(){for(i=0;i<len;i++){if(jQuery.contains(this,targets[i])){return true;}}});},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector);},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector);},is:function(selector){return!!selector&&(typeof selector==="string"?rneedsContext.test(selector)?jQuery(selector,this.context).index(this[0])>=0:jQuery.filter(selector,this).length>0:this.filter(selector).length>0);},closest:function(selectors,context){var cur,i=0,l=this.length,ret=[],pos=rneedsContext.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;for(;i<l;i++){cur=this[i];while(cur&&cur.ownerDocument&&cur!==context&&cur.nodeType!==11){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);break;}
cur=cur.parentNode;}}
ret=ret.length>1?jQuery.unique(ret):ret;return this.pushStack(ret,"closest",selectors);},index:function(elem){if(!elem){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1;}
if(typeof elem==="string"){return jQuery.inArray(this[0],jQuery(elem));}
return jQuery.inArray(elem.jquery?elem[0]:elem,this);},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context):jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),all=jQuery.merge(this.get(),set);return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all));},addBack:function(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});jQuery.fn.andSelf=jQuery.fn.addBack;function isDisconnected(node){return!node||!node.parentNode||node.parentNode.nodeType===11;}
function sibling(cur,dir){do{cur=cur[dir];}while(cur&&cur.nodeType!==1);return cur;}
jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(elem){return jQuery.dir(elem,"parentNode");},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until);},next:function(elem){return sibling(elem,"nextSibling");},prev:function(elem){return sibling(elem,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until);},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until);},siblings:function(elem){return jQuery.sibling((elem.parentNode||{}).firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);if(!runtil.test(name)){selector=until;}
if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret);}
ret=this.length>1&&!guaranteedUnique[name]?jQuery.unique(ret):ret;if(this.length>1&&rparentsprev.test(name)){ret=ret.reverse();}
return this.pushStack(ret,name,core_slice.call(arguments).join(","));};});jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")";}
return elems.length===1?jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:jQuery.find.matches(expr,elems);},dir:function(elem,dir,until){var matched=[],cur=elem[dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur);}
cur=cur[dir];}
return matched;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n);}}
return r;}});function winnow(elements,qualifier,keep){qualifier=qualifier||0;if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);return retVal===keep;});}else if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep;});}else if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1;});if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep);}else{qualifier=jQuery.filter(qualifier,filtered);}}
return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep;});}
function createSafeFragment(document){var list=nodeNames.split("|"),safeFrag=document.createDocumentFragment();if(safeFrag.createElement){while(list.length){safeFrag.createElement(list.pop());}}
return safeFrag;}
var nodeNames="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|"+"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",rinlinejQuery=/ jQuery\d+="(?:null|\d+)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style|link)/i,rnocache=/<(?:script|object|embed|option|style)/i,rnoshimcache=new RegExp("<(?:"+nodeNames+")[\\s/>]","i"),rcheckableType=/^(?:checkbox|radio)$/,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/\/(java|ecma)script/i,rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},safeFragment=createSafeFragment(document),fragmentDiv=safeFragment.appendChild(document.createElement("div"));wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"X<div>","</div>"];}
jQuery.fn.extend({text:function(value){return jQuery.access(this,function(value){return value===undefined?jQuery.text(this):this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(value));},null,value,arguments.length);},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}
if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}
wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild;}
return elem;}).append(this);}
return this;},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}
return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html);});},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1||this.nodeType===11){this.appendChild(elem);}});},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1||this.nodeType===11){this.insertBefore(elem,this.firstChild);}});},before:function(){if(!isDisconnected(this[0])){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this);});}
if(arguments.length){var set=jQuery.clean(arguments);return this.pushStack(jQuery.merge(set,this),"before",this.selector);}},after:function(){if(!isDisconnected(this[0])){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});}
if(arguments.length){var set=jQuery.clean(arguments);return this.pushStack(jQuery.merge(this,set),"after",this.selector);}},remove:function(selector,keepData){var elem,i=0;for(;(elem=this[i])!=null;i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));jQuery.cleanData([elem]);}
if(elem.parentNode){elem.parentNode.removeChild(elem);}}}
return this;},empty:function(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));}
while(elem.firstChild){elem.removeChild(elem.firstChild);}}
return this;},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function(value){return jQuery.access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined){return elem.nodeType===1?elem.innerHTML.replace(rinlinejQuery,""):undefined;}
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&(jQuery.support.htmlSerialize||!rnoshimcache.test(value))&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");try{for(;i<l;i++){elem=this[i]||{};if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));elem.innerHTML=value;}}
elem=0;}catch(e){}}
if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function(value){if(!isDisconnected(this[0])){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();self.replaceWith(value.call(this,i,old));});}
if(typeof value!=="string"){value=jQuery(value).detach();}
return this.each(function(){var next=this.nextSibling,parent=this.parentNode;jQuery(this).remove();if(next){jQuery(next).before(value);}else{jQuery(parent).append(value);}});}
return this.length?this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value):this;},detach:function(selector){return this.remove(selector,true);},domManip:function(args,table,callback){args=[].concat.apply([],args);var results,first,fragment,iNoClone,i=0,value=args[0],scripts=[],l=this.length;if(!jQuery.support.checkClone&&l>1&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback);});}
if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);args[0]=value.call(this,i,table?self.html():undefined);self.domManip(args,table,callback);});}
if(this[0]){results=jQuery.buildFragment(args,this,scripts);fragment=results.fragment;first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;}
if(first){table=table&&jQuery.nodeName(first,"tr");for(iNoClone=results.cacheable||l-1;i<l;i++){callback.call(table&&jQuery.nodeName(this[i],"table")?findOrAppend(this[i],"tbody"):this[i],i===iNoClone?fragment:jQuery.clone(fragment,true,true));}}
fragment=first=null;if(scripts.length){jQuery.each(scripts,function(i,elem){if(elem.src){if(jQuery.ajax){jQuery.ajax({url:elem.src,type:"GET",dataType:"script",async:false,global:false,"throws":true});}else{jQuery.error("no ajax");}}else{jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,""));}
if(elem.parentNode){elem.parentNode.removeChild(elem);}});}}
return this;}});function findOrAppend(elem,tag){return elem.getElementsByTagName(tag)[0]||elem.appendChild(elem.ownerDocument.createElement(tag));}
function cloneCopyEvent(src,dest){if(dest.nodeType!==1||!jQuery.hasData(src)){return;}
var type,i,l,oldData=jQuery._data(src),curData=jQuery._data(dest,oldData),events=oldData.events;if(events){delete curData.handle;curData.events={};for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}
if(curData.data){curData.data=jQuery.extend({},curData.data);}}
function cloneFixAttributes(src,dest){var nodeName;if(dest.nodeType!==1){return;}
if(dest.clearAttributes){dest.clearAttributes();}
if(dest.mergeAttributes){dest.mergeAttributes(src);}
nodeName=dest.nodeName.toLowerCase();if(nodeName==="object"){if(dest.parentNode){dest.outerHTML=src.outerHTML;}
if(jQuery.support.html5Clone&&(src.innerHTML&&!jQuery.trim(dest.innerHTML))){dest.innerHTML=src.innerHTML;}}else if(nodeName==="input"&&rcheckableType.test(src.type)){dest.defaultChecked=dest.checked=src.checked;if(dest.value!==src.value){dest.value=src.value;}}else if(nodeName==="option"){dest.selected=src.defaultSelected;}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}else if(nodeName==="script"&&dest.text!==src.text){dest.text=src.text;}
dest.removeAttribute(jQuery.expando);}
jQuery.buildFragment=function(args,context,scripts){var fragment,cacheable,cachehit,first=args[0];context=context||document;context=!context.nodeType&&context[0]||context;context=context.ownerDocument||context;if(args.length===1&&typeof first==="string"&&first.length<512&&context===document&&first.charAt(0)==="<"&&!rnocache.test(first)&&(jQuery.support.checkClone||!rchecked.test(first))&&(jQuery.support.html5Clone||!rnoshimcache.test(first))){cacheable=true;fragment=jQuery.fragments[first];cachehit=fragment!==undefined;}
if(!fragment){fragment=context.createDocumentFragment();jQuery.clean(args,context,fragment,scripts);if(cacheable){jQuery.fragments[first]=cachehit&&fragment;}}
return{fragment:fragment,cacheable:cacheable};};jQuery.fragments={};jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,i=0,ret=[],insert=jQuery(selector),l=insert.length,parent=this.length===1&&this[0].parentNode;if((parent==null||parent&&parent.nodeType===11&&parent.childNodes.length===1)&&l===1){insert[original](this[0]);return this;}else{for(;i<l;i++){elems=(i>0?this.clone(true):this).get();jQuery(insert[i])[original](elems);ret=ret.concat(elems);}
return this.pushStack(ret,name,insert.selector);}};});function getAll(elem){if(typeof elem.getElementsByTagName!=="undefined"){return elem.getElementsByTagName("*");}else if(typeof elem.querySelectorAll!=="undefined"){return elem.querySelectorAll("*");}else{return[];}}
function fixDefaultChecked(elem){if(rcheckableType.test(elem.type)){elem.defaultChecked=elem.checked;}}
jQuery.extend({clone:function(elem,dataAndEvents,deepDataAndEvents){var srcElements,destElements,i,clone;if(jQuery.support.html5Clone||jQuery.isXMLDoc(elem)||!rnoshimcache.test("<"+elem.nodeName+">")){clone=elem.cloneNode(true);}else{fragmentDiv.innerHTML=elem.outerHTML;fragmentDiv.removeChild(clone=fragmentDiv.firstChild);}
if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){cloneFixAttributes(elem,clone);srcElements=getAll(elem);destElements=getAll(clone);for(i=0;srcElements[i];++i){if(destElements[i]){cloneFixAttributes(srcElements[i],destElements[i]);}}}
if(dataAndEvents){cloneCopyEvent(elem,clone);if(deepDataAndEvents){srcElements=getAll(elem);destElements=getAll(clone);for(i=0;srcElements[i];++i){cloneCopyEvent(srcElements[i],destElements[i]);}}}
srcElements=destElements=null;return clone;},clean:function(elems,context,fragment,scripts){var i,j,elem,tag,wrap,depth,div,hasBody,tbody,len,handleScript,jsTags,safe=context===document&&safeFragment,ret=[];if(!context||typeof context.createDocumentFragment==="undefined"){context=document;}
for(i=0;(elem=elems[i])!=null;i++){if(typeof elem==="number"){elem+="";}
if(!elem){continue;}
if(typeof elem==="string"){if(!rhtml.test(elem)){elem=context.createTextNode(elem);}else{safe=safe||createSafeFragment(context);div=context.createElement("div");safe.appendChild(div);elem=elem.replace(rxhtmlTag,"<$1></$2>");tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;depth=wrap[0];div.innerHTML=wrap[1]+elem+wrap[2];while(depth--){div=div.lastChild;}
if(!jQuery.support.tbody){hasBody=rtbody.test(elem);tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];for(j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j]);}}}
if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild);}
elem=div.childNodes;div.parentNode.removeChild(div);}}
if(elem.nodeType){ret.push(elem);}else{jQuery.merge(ret,elem);}}
if(div){elem=div=safe=null;}
if(!jQuery.support.appendChecked){for(i=0;(elem=ret[i])!=null;i++){if(jQuery.nodeName(elem,"input")){fixDefaultChecked(elem);}else if(typeof elem.getElementsByTagName!=="undefined"){jQuery.grep(elem.getElementsByTagName("input"),fixDefaultChecked);}}}
if(fragment){handleScript=function(elem){if(!elem.type||rscriptType.test(elem.type)){return scripts?scripts.push(elem.parentNode?elem.parentNode.removeChild(elem):elem):fragment.appendChild(elem);}};for(i=0;(elem=ret[i])!=null;i++){if(!(jQuery.nodeName(elem,"script")&&handleScript(elem))){fragment.appendChild(elem);if(typeof elem.getElementsByTagName!=="undefined"){jsTags=jQuery.grep(jQuery.merge([],elem.getElementsByTagName("script")),handleScript);ret.splice.apply(ret,[i+1,0].concat(jsTags));i+=jsTags.length;}}}}
return ret;},cleanData:function(elems,acceptData){var data,id,elem,type,i=0,internalKey=jQuery.expando,cache=jQuery.cache,deleteExpando=jQuery.support.deleteExpando,special=jQuery.event.special;for(;(elem=elems[i])!=null;i++){if(acceptData||jQuery.acceptData(elem)){id=elem[internalKey];data=id&&cache[id];if(data){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type);}else{jQuery.removeEvent(elem,type,data.handle);}}}
if(cache[id]){delete cache[id];if(deleteExpando){delete elem[internalKey];}else if(elem.removeAttribute){elem.removeAttribute(internalKey);}else{elem[internalKey]=null;}
jQuery.deletedIds.push(id);}}}}}});(function(){var matched,browser;jQuery.uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};};matched=jQuery.uaMatch(navigator.userAgent);browser={};if(matched.browser){browser[matched.browser]=true;browser.version=matched.version;}
if(browser.chrome){browser.webkit=true;}else if(browser.webkit){browser.safari=true;}
jQuery.browser=browser;jQuery.sub=function(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context);}
jQuery.extend(true,jQuerySub,this);jQuerySub.superclass=this;jQuerySub.fn=jQuerySub.prototype=this();jQuerySub.fn.constructor=jQuerySub;jQuerySub.sub=this.sub;jQuerySub.fn.init=function init(selector,context){if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){context=jQuerySub(context);}
return jQuery.fn.init.call(this,selector,context,rootjQuerySub);};jQuerySub.fn.init.prototype=jQuerySub.fn;var rootjQuerySub=jQuerySub(document);return jQuerySub;};})();var curCSS,iframe,iframeDoc,ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rposition=/^(top|right|bottom|left)$/,rdisplayswap=/^(none|table(?!-c[ea]).+)/,rmargin=/^margin/,rnumsplit=new RegExp("^("+core_pnum+")(.*)$","i"),rnumnonpx=new RegExp("^("+core_pnum+")(?!px)[a-z%]+$","i"),rrelNum=new RegExp("^([-+])=("+core_pnum+")","i"),elemdisplay={},cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:0,fontWeight:400},cssExpand=["Top","Right","Bottom","Left"],cssPrefixes=["Webkit","O","Moz","ms"],eventsToggle=jQuery.fn.toggle;function vendorPropName(style,name){if(name in style){return name;}
var capName=name.charAt(0).toUpperCase()+name.slice(1),origName=name,i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in style){return name;}}
return origName;}
function isHidden(elem,el){elem=el||elem;return jQuery.css(elem,"display")==="none"||!jQuery.contains(elem.ownerDocument,elem);}
function showHide(elements,show){var elem,display,values=[],index=0,length=elements.length;for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}
values[index]=jQuery._data(elem,"olddisplay");if(show){if(!values[index]&&elem.style.display==="none"){elem.style.display="";}
if(elem.style.display===""&&isHidden(elem)){values[index]=jQuery._data(elem,"olddisplay",css_defaultDisplay(elem.nodeName));}}else{display=curCSS(elem,"display");if(!values[index]&&display!=="none"){jQuery._data(elem,"olddisplay",display);}}}
for(index=0;index<length;index++){elem=elements[index];if(!elem.style){continue;}
if(!show||elem.style.display==="none"||elem.style.display===""){elem.style.display=show?values[index]||"":"none";}}
return elements;}
jQuery.fn.extend({css:function(name,value){return jQuery.access(this,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);},show:function(){return showHide(this,true);},hide:function(){return showHide(this);},toggle:function(state,fn2){var bool=typeof state==="boolean";if(jQuery.isFunction(state)&&jQuery.isFunction(fn2)){return eventsToggle.apply(this,arguments);}
return this.each(function(){if(bool?state:isHidden(this)){jQuery(this).show();}else{jQuery(this).hide();}});}});jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}},cssNumber:{"fillOpacity":true,"fontWeight":true,"lineHeight":true,"opacity":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}
var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(style,origName));hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];if(value!==undefined){type=typeof value;if(type==="string"&&(ret=rrelNum.exec(value))){value=(ret[1]+1)*ret[2]+parseFloat(jQuery.css(elem,name));type="number";}
if(value==null||type==="number"&&isNaN(value)){return;}
if(type==="number"&&!jQuery.cssNumber[origName]){value+="px";}
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value,extra))!==undefined){try{style[name]=value;}catch(e){}}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}
return style[name];}},css:function(elem,name,numeric,extra){var val,num,hooks,origName=jQuery.camelCase(name);name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(elem.style,origName));hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];if(hooks&&"get"in hooks){val=hooks.get(elem,true,extra);}
if(val===undefined){val=curCSS(elem,name);}
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];}
if(numeric||extra!==undefined){num=parseFloat(val);return numeric||jQuery.isNumeric(num)?num||0:val;}
return val;},swap:function(elem,options,callback){var ret,name,old={};for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}
ret=callback.call(elem);for(name in options){elem.style[name]=old[name];}
return ret;}});if(window.getComputedStyle){curCSS=function(elem,name){var ret,width,minWidth,maxWidth,computed=window.getComputedStyle(elem,null),style=elem.style;if(computed){ret=computed[name];if(ret===""&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name);}
if(rnumnonpx.test(ret)&&rmargin.test(name)){width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth;style.minWidth=style.maxWidth=style.width=ret;ret=computed.width;style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}
return ret;};}else if(document.documentElement.currentStyle){curCSS=function(elem,name){var left,rsLeft,ret=elem.currentStyle&&elem.currentStyle[name],style=elem.style;if(ret==null&&style&&style[name]){ret=style[name];}
if(rnumnonpx.test(ret)&&!rposition.test(name)){left=style.left;rsLeft=elem.runtimeStyle&&elem.runtimeStyle.left;if(rsLeft){elem.runtimeStyle.left=elem.currentStyle.left;}
style.left=name==="fontSize"?"1em":ret;ret=style.pixelLeft+"px";style.left=left;if(rsLeft){elem.runtimeStyle.left=rsLeft;}}
return ret===""?"auto":ret;};}
function setPositiveNumber(elem,value,subtract){var matches=rnumsplit.exec(value);return matches?Math.max(0,matches[1]-(subtract||0))+(matches[2]||"px"):value;}
function augmentWidthOrHeight(elem,name,extra,isBorderBox){var i=extra===(isBorderBox?"border":"content")?4:name==="width"?1:0,val=0;for(;i<4;i+=2){if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true);}
if(isBorderBox){if(extra==="content"){val-=parseFloat(curCSS(elem,"padding"+cssExpand[i]))||0;}
if(extra!=="margin"){val-=parseFloat(curCSS(elem,"border"+cssExpand[i]+"Width"))||0;}}else{val+=parseFloat(curCSS(elem,"padding"+cssExpand[i]))||0;if(extra!=="padding"){val+=parseFloat(curCSS(elem,"border"+cssExpand[i]+"Width"))||0;}}}
return val;}
function getWidthOrHeight(elem,name,extra){var val=name==="width"?elem.offsetWidth:elem.offsetHeight,valueIsBorderBox=true,isBorderBox=jQuery.support.boxSizing&&jQuery.css(elem,"boxSizing")==="border-box";if(val<=0||val==null){val=curCSS(elem,name);if(val<0||val==null){val=elem.style[name];}
if(rnumnonpx.test(val)){return val;}
valueIsBorderBox=isBorderBox&&(jQuery.support.boxSizingReliable||val===elem.style[name]);val=parseFloat(val)||0;}
return(val+
augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox))+"px";}
function css_defaultDisplay(nodeName){if(elemdisplay[nodeName]){return elemdisplay[nodeName];}
var elem=jQuery("<"+nodeName+">").appendTo(document.body),display=elem.css("display");elem.remove();if(display==="none"||display===""){iframe=document.body.appendChild(iframe||jQuery.extend(document.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!iframeDoc||!iframe.createElement){iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;iframeDoc.write("<!doctype html><html><body>");iframeDoc.close();}
elem=iframeDoc.body.appendChild(iframeDoc.createElement(nodeName));display=curCSS(elem,"display");document.body.removeChild(iframe);}
elemdisplay[nodeName]=display;return display;}
jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){if(computed){if(elem.offsetWidth===0&&rdisplayswap.test(curCSS(elem,"display"))){return jQuery.swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra);});}else{return getWidthOrHeight(elem,name,extra);}}},set:function(elem,value,extra){return setPositiveNumber(elem,value,extra?augmentWidthOrHeight(elem,name,extra,jQuery.support.boxSizing&&jQuery.css(elem,"boxSizing")==="border-box"):0);}};});if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":computed?"1":"";},set:function(elem,value){var style=elem.style,currentStyle=elem.currentStyle,opacity=jQuery.isNumeric(value)?"alpha(opacity="+value*100+")":"",filter=currentStyle&&currentStyle.filter||style.filter||"";style.zoom=1;if(value>=1&&jQuery.trim(filter.replace(ralpha,""))===""&&style.removeAttribute){style.removeAttribute("filter");if(currentStyle&&!currentStyle.filter){return;}}
style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):filter+" "+opacity;}};}
jQuery(function(){if(!jQuery.support.reliableMarginRight){jQuery.cssHooks.marginRight={get:function(elem,computed){return jQuery.swap(elem,{"display":"inline-block"},function(){if(computed){return curCSS(elem,"marginRight");}});}};}
if(!jQuery.support.pixelPosition&&jQuery.fn.position){jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]={get:function(elem,computed){if(computed){var ret=curCSS(elem,prop);return rnumnonpx.test(ret)?jQuery(elem).position()[prop]+"px":ret;}}};});}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){return(elem.offsetWidth===0&&elem.offsetHeight===0)||(!jQuery.support.reliableHiddenOffsets&&((elem.style&&elem.style.display)||curCSS(elem,"display"))==="none");};jQuery.expr.filters.visible=function(elem){return!jQuery.expr.filters.hidden(elem);};}
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function(value){var i,parts=typeof value==="string"?value.split(" "):[value],expanded={};for(i=0;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}
return expanded;}};if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rselectTextarea=/^(?:select|textarea)/i;jQuery.fn.extend({serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});jQuery.param=function(a,traditional){var prefix,s=[],add=function(key,value){value=jQuery.isFunction(value)?value():(value==null?"":value);s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);};if(traditional===undefined){traditional=jQuery.ajaxSettings&&jQuery.ajaxSettings.traditional;}
if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){jQuery.each(a,function(){add(this.name,this.value);});}else{for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}}
return s.join("&").replace(r20,"+");};function buildParams(prefix,obj,traditional,add){var name;if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v);}else{buildParams(prefix+"["+(typeof v==="object"?i:"")+"]",v,traditional,add);}});}else if(!traditional&&jQuery.type(obj)==="object"){for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{add(prefix,obj);}}
var
ajaxLocParts,ajaxLocation,rhash=/#.*$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rquery=/\?/,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rts=/([?&])_=[^&]*/,rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,_load=jQuery.fn.load,prefilters={},transports={},allTypes=["*/"]+["*"];try{ajaxLocation=location.href;}catch(e){ajaxLocation=document.createElement("a");ajaxLocation.href="";ajaxLocation=ajaxLocation.href;}
ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}
var dataType,list,placeBefore,dataTypes=dataTypeExpression.toLowerCase().split(core_rspace),i=0,length=dataTypes.length;if(jQuery.isFunction(func)){for(;i<length;i++){dataType=dataTypes[i];placeBefore=/^\+/.test(dataType);if(placeBefore){dataType=dataType.substr(1)||"*";}
list=structure[dataType]=structure[dataType]||[];list[placeBefore?"unshift":"push"](func);}}};}
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,dataType,inspected){dataType=dataType||options.dataTypes[0];inspected=inspected||{};inspected[dataType]=true;var selection,list=structure[dataType],i=0,length=list?list.length:0,executeOnly=(structure===prefilters);for(;i<length&&(executeOnly||!selection);i++){selection=list[i](options,originalOptions,jqXHR);if(typeof selection==="string"){if(!executeOnly||inspected[selection]){selection=undefined;}else{options.dataTypes.unshift(selection);selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,selection,inspected);}}}
if((executeOnly||!selection)&&!inspected["*"]){selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,"*",inspected);}
return selection;}
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:(deep||(deep={})))[key]=src[key];}}
if(deep){jQuery.extend(true,target,deep);}}
jQuery.fn.load=function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments);}
if(!this.length){return this;}
var selector,type,response,self=this,off=url.indexOf(" ");if(off>=0){selector=url.slice(off,url.length);url=url.slice(0,off);}
if(jQuery.isFunction(params)){callback=params;params=undefined;}else if(params&&typeof params==="object"){type="POST";}
jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(jqXHR,status){if(callback){self.each(callback,response||[jqXHR.responseText,status,jqXHR]);}}}).done(function(responseText){response=arguments;self.html(selector?jQuery("<div>").append(responseText.replace(rscript,"")).find(selector):responseText);});return this;};jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.on(o,f);};});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;}
return jQuery.ajax({type:method,url:url,data:data,success:callback,dataType:type});};});jQuery.extend({getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},ajaxSetup:function(target,settings){if(settings){ajaxExtend(target,jQuery.ajaxSettings);}else{settings=target;target=jQuery.ajaxSettings;}
ajaxExtend(target,settings);return target;},ajaxSettings:{url:ajaxLocation,isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":allTypes},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":window.String,"text html":true,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){if(typeof url==="object"){options=url;url=undefined;}
options=options||{};var
ifModifiedKey,responseHeadersString,responseHeaders,transport,timeoutTimer,parts,fireGlobals,i,s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=callbackContext!==s&&(callbackContext.nodeType||callbackContext instanceof jQuery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),statusCode=s.statusCode||{},requestHeaders={},requestHeadersNames={},state=0,strAbort="canceled",jqXHR={readyState:0,setRequestHeader:function(name,value){if(!state){var lname=name.toLowerCase();name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;requestHeaders[name]=value;}
return this;},getAllResponseHeaders:function(){return state===2?responseHeadersString:null;},getResponseHeader:function(key){var match;if(state===2){if(!responseHeaders){responseHeaders={};while((match=rheaders.exec(responseHeadersString))){responseHeaders[match[1].toLowerCase()]=match[2];}}
match=responseHeaders[key.toLowerCase()];}
return match===undefined?null:match;},overrideMimeType:function(type){if(!state){s.mimeType=type;}
return this;},abort:function(statusText){statusText=statusText||strAbort;if(transport){transport.abort(statusText);}
done(0,statusText);return this;}};function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;if(state===2){return;}
state=2;if(timeoutTimer){clearTimeout(timeoutTimer);}
transport=undefined;responseHeadersString=headers||"";jqXHR.readyState=status>0?4:0;if(responses){response=ajaxHandleResponses(s,jqXHR,responses);}
if(status>=200&&status<300||status===304){if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[ifModifiedKey]=modified;}
modified=jqXHR.getResponseHeader("Etag");if(modified){jQuery.etag[ifModifiedKey]=modified;}}
if(status===304){statusText="notmodified";isSuccess=true;}else{isSuccess=ajaxConvert(s,response);statusText=isSuccess.state;success=isSuccess.data;error=isSuccess.error;isSuccess=!error;}}else{error=statusText;if(!statusText||status){statusText="error";if(status<0){status=0;}}}
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+"";if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}
jqXHR.statusCode(statusCode);statusCode=undefined;if(fireGlobals){globalEventContext.trigger("ajax"+(isSuccess?"Success":"Error"),[jqXHR,s,isSuccess?success:error]);}
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);if(!(--jQuery.active)){jQuery.event.trigger("ajaxStop");}}}
deferred.promise(jqXHR);jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail;jqXHR.complete=completeDeferred.add;jqXHR.statusCode=function(map){if(map){var tmp;if(state<2){for(tmp in map){statusCode[tmp]=[statusCode[tmp],map[tmp]];}}else{tmp=map[jqXHR.status];jqXHR.always(tmp);}}
return this;};s.url=((url||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().split(core_rspace);if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase())||false;s.crossDomain=parts&&(parts.join(":")+(parts[3]?"":parts[1]==="http:"?80:443))!==(ajaxLocParts.join(":")+(ajaxLocParts[3]?"":ajaxLocParts[1]==="http:"?80:443));}
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);if(state===2){return jqXHR;}
fireGlobals=s.global;s.type=s.type.toUpperCase();s.hasContent=!rnoContent.test(s.type);if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}
if(!s.hasContent){if(s.data){s.url+=(rquery.test(s.url)?"&":"?")+s.data;delete s.data;}
ifModifiedKey=s.url;if(s.cache===false){var ts=jQuery.now(),ret=s.url.replace(rts,"$1_="+ts);s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"");}}
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}
if(s.ifModified){ifModifiedKey=ifModifiedKey||s.url;if(jQuery.lastModified[ifModifiedKey]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[ifModifiedKey]);}
if(jQuery.etag[ifModifiedKey]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[ifModifiedKey]);}}
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){return jqXHR.abort();}
strAbort="abort";for(i in{success:1,error:1,complete:1}){jqXHR[i](s[i]);}
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}
if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}
try{state=1;transport.send(requestHeaders,done);}catch(e){if(state<2){done(-1,e);}else{throw e;}}}
return jqXHR;},active:0,lastModified:{},etag:{}});function ajaxHandleResponses(s,jqXHR,responses){var ct,type,finalDataType,firstDataType,contents=s.contents,dataTypes=s.dataTypes,responseFields=s.responseFields;for(type in responseFields){if(type in responses){jqXHR[responseFields[type]]=responses[type];}}
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("content-type");}}
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}
if(!firstDataType){firstDataType=type;}}
finalDataType=finalDataType||firstDataType;}
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}
return responses[finalDataType];}}
function ajaxConvert(s,response){var conv,conv2,current,tmp,dataTypes=s.dataTypes.slice(),prev=dataTypes[0],converters={},i=0;if(s.dataFilter){response=s.dataFilter(response,s.dataType);}
if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}
for(;(current=dataTypes[++i]);){if(current!=="*"){if(prev!=="*"&&prev!==current){conv=converters[prev+" "+current]||converters["* "+current];if(!conv){for(conv2 in converters){tmp=conv2.split(" ");if(tmp[1]===current){conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){if(conv===true){conv=converters[conv2];}else if(converters[conv2]!==true){current=tmp[0];dataTypes.splice(i--,0,current);}
break;}}}}
if(conv!==true){if(conv&&s["throws"]){response=conv(response);}else{try{response=conv(response);}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}
prev=current;}}
return{state:"success",data:response};}
var oldCallbacks=[],rquestion=/\?/,rjsonp=/(=)\?(?=&|$)|\?\?/,nonce=jQuery.now();jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var callback=oldCallbacks.pop()||(jQuery.expando+"_"+(nonce++));this[callback]=true;return callback;}});jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,data=s.data,url=s.url,hasCallback=s.jsonp!==false,replaceInUrl=hasCallback&&rjsonp.test(url),replaceInData=hasCallback&&!replaceInUrl&&typeof data==="string"&&!(s.contentType||"").indexOf("application/x-www-form-urlencoded")&&rjsonp.test(data);if(s.dataTypes[0]==="jsonp"||replaceInUrl||replaceInData){callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;overwritten=window[callbackName];if(replaceInUrl){s.url=url.replace(rjsonp,"$1"+callbackName);}else if(replaceInData){s.data=data.replace(rjsonp,"$1"+callbackName);}else if(hasCallback){s.url+=(rquestion.test(url)?"&":"?")+s.jsonp+"="+callbackName;}
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}
return responseContainer[0];};s.dataTypes[0]="json";window[callbackName]=function(){responseContainer=arguments;};jqXHR.always(function(){window[callbackName]=overwritten;if(s[callbackName]){s.jsonpCallback=originalSettings.jsonpCallback;oldCallbacks.push(callbackName);}
if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0]);}
responseContainer=overwritten=undefined;});return"script";}});jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(text){jQuery.globalEval(text);return text;}}});jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}
if(s.crossDomain){s.type="GET";s.global=false;}});jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;return{send:function(_,callback){script=document.createElement("script");script.async="async";if(s.scriptCharset){script.charset=s.scriptCharset;}
script.src=s.url;script.onload=script.onreadystatechange=function(_,isAbort){if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script);}
script=undefined;if(!isAbort){callback(200,"success");}}};head.insertBefore(script,head.firstChild);},abort:function(){if(script){script.onload(0,1);}}};}});var xhrCallbacks,xhrOnUnloadAbort=window.ActiveXObject?function(){for(var key in xhrCallbacks){xhrCallbacks[key](0,1);}}:false,xhrId=0;function createStandardXHR(){try{return new window.XMLHttpRequest();}catch(e){}}
function createActiveXHR(){try{return new window.ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}
jQuery.ajaxSettings.xhr=window.ActiveXObject?function(){return!this.isLocal&&createStandardXHR()||createActiveXHR();}:createStandardXHR;(function(xhr){jQuery.extend(jQuery.support,{ajax:!!xhr,cors:!!xhr&&("withCredentials"in xhr)});})(jQuery.ajaxSettings.xhr());if(jQuery.support.ajax){jQuery.ajaxTransport(function(s){if(!s.crossDomain||jQuery.support.cors){var callback;return{send:function(headers,complete){var handle,i,xhr=s.xhr();if(s.username){xhr.open(s.type,s.url,s.async,s.username,s.password);}else{xhr.open(s.type,s.url,s.async);}
if(s.xhrFields){for(i in s.xhrFields){xhr[i]=s.xhrFields[i];}}
if(s.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(s.mimeType);}
if(!s.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}
try{for(i in headers){xhr.setRequestHeader(i,headers[i]);}}catch(_){}
xhr.send((s.hasContent&&s.data)||null);callback=function(_,isAbort){var status,statusText,responseHeaders,responses,xml;try{if(callback&&(isAbort||xhr.readyState===4)){callback=undefined;if(handle){xhr.onreadystatechange=jQuery.noop;if(xhrOnUnloadAbort){delete xhrCallbacks[handle];}}
if(isAbort){if(xhr.readyState!==4){xhr.abort();}}else{status=xhr.status;responseHeaders=xhr.getAllResponseHeaders();responses={};xml=xhr.responseXML;if(xml&&xml.documentElement){responses.xml=xml;}
try{responses.text=xhr.responseText;}catch(_){}
try{statusText=xhr.statusText;}catch(e){statusText="";}
if(!status&&s.isLocal&&!s.crossDomain){status=responses.text?200:404;}else if(status===1223){status=204;}}}}catch(firefoxAccessException){if(!isAbort){complete(-1,firefoxAccessException);}}
if(responses){complete(status,statusText,responses,responseHeaders);}};if(!s.async){callback();}else if(xhr.readyState===4){setTimeout(callback,0);}else{handle=++xhrId;if(xhrOnUnloadAbort){if(!xhrCallbacks){xhrCallbacks={};jQuery(window).unload(xhrOnUnloadAbort);}
xhrCallbacks[handle]=callback;}
xhr.onreadystatechange=callback;}},abort:function(){if(callback){callback(0,1);}}};}});}
var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=new RegExp("^(?:([-+])=|)("+core_pnum+")([a-z%]*)$","i"),rrun=/queueHooks$/,animationPrefilters=[defaultPrefilter],tweeners={"*":[function(prop,value){var end,unit,tween=this.createTween(prop,value),parts=rfxnum.exec(value),target=tween.cur(),start=+target||0,scale=1,maxIterations=20;if(parts){end=+parts[2];unit=parts[3]||(jQuery.cssNumber[prop]?"":"px");if(unit!=="px"&&start){start=jQuery.css(tween.elem,prop,true)||end||1;do{scale=scale||".5";start=start/scale;jQuery.style(tween.elem,prop,start+unit);}while(scale!==(scale=tween.cur()/target)&&scale!==1&&--maxIterations);}
tween.unit=unit;tween.start=start;tween.end=parts[1]?start+(parts[1]+1)*end:end;}
return tween;}]};function createFxNow(){setTimeout(function(){fxNow=undefined;},0);return(fxNow=jQuery.now());}
function createTweens(animation,props){jQuery.each(props,function(prop,value){var collection=(tweeners[prop]||[]).concat(tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if(collection[index].call(animation,prop,value)){return;}}});}
function Animation(elem,properties,options){var result,index=0,tweenerIndex=0,length=animationPrefilters.length,deferred=jQuery.Deferred().always(function(){delete tick.elem;}),tick=function(){var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),percent=1-(remaining/animation.duration||0),index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}
deferred.notifyWith(elem,[animation,percent,remaining]);if(percent<1&&length){return remaining;}else{deferred.resolveWith(elem,[animation]);return false;}},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{}},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function(prop,end,easing){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function(gotoEnd){var index=0,length=gotoEnd?animation.tweens.length:0;for(;index<length;index++){animation.tweens[index].run(1);}
if(gotoEnd){deferred.resolveWith(elem,[animation,gotoEnd]);}else{deferred.rejectWith(elem,[animation,gotoEnd]);}
return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=animationPrefilters[index].call(animation,elem,props,animation.opts);if(result){return result;}}
createTweens(animation,props);if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}
jQuery.fx.timer(jQuery.extend(tick,{anim:animation,queue:animation.opts.queue,elem:elem}));return animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);}
function propFilter(props,specialEasing){var index,name,easing,value,hooks;for(index in props){name=jQuery.camelCase(index);easing=specialEasing[name];value=props[index];if(jQuery.isArray(value)){easing=value[1];value=props[index]=value[0];}
if(index!==name){props[name]=value;delete props[index];}
hooks=jQuery.cssHooks[name];if(hooks&&"expand"in hooks){value=hooks.expand(value);delete props[name];for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else{specialEasing[name]=easing;}}}
jQuery.Animation=jQuery.extend(Animation,{tweener:function(props,callback){if(jQuery.isFunction(props)){callback=props;props=["*"];}else{props=props.split(" ");}
var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];tweeners[prop]=tweeners[prop]||[];tweeners[prop].unshift(callback);}},prefilter:function(callback,prepend){if(prepend){animationPrefilters.unshift(callback);}else{animationPrefilters.push(callback);}}});function defaultPrefilter(elem,props,opts){var index,prop,value,length,dataShow,tween,hooks,oldfire,anim=this,style=elem.style,orig={},handled=[],hidden=elem.nodeType&&isHidden(elem);if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}
hooks.unqueued++;anim.always(function(){anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});}
if(elem.nodeType===1&&("height"in props||"width"in props)){opts.overflow=[style.overflow,style.overflowX,style.overflowY];if(jQuery.css(elem,"display")==="inline"&&jQuery.css(elem,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout||css_defaultDisplay(elem.nodeName)==="inline"){style.display="inline-block";}else{style.zoom=1;}}}
if(opts.overflow){style.overflow="hidden";if(!jQuery.support.shrinkWrapBlocks){anim.done(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});}}
for(index in props){value=props[index];if(rfxtypes.exec(value)){delete props[index];if(value===(hidden?"hide":"show")){continue;}
handled.push(index);}}
length=handled.length;if(length){dataShow=jQuery._data(elem,"fxshow")||jQuery._data(elem,"fxshow",{});if(hidden){jQuery(elem).show();}else{anim.done(function(){jQuery(elem).hide();});}
anim.done(function(){var prop;jQuery.removeData(elem,"fxshow",true);for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});for(index=0;index<length;index++){prop=handled[index];tween=anim.createTween(prop,hidden?dataShow[prop]:0);orig[prop]=dataShow[prop]||jQuery.style(elem,prop);if(!(prop in dataShow)){dataShow[prop]=tween.start;if(hidden){tween.end=tween.start;tween.start=prop==="width"||prop==="height"?1:0;}}}}}
function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}
jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||"swing";this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else{this.pos=eased=percent;}
this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}
if(hooks&&hooks.set){hooks.set(this);}else{Tween.propHooks._default.set(this);}
return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function(tween){var result;if(tween.elem[tween.prop]!=null&&(!tween.elem.style||tween.elem.style[tween.prop]==null)){return tween.elem[tween.prop];}
result=jQuery.css(tween.elem,tween.prop,false,"");return!result||result==="auto"?0:result;},set:function(tween){if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.style&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else{tween.elem[tween.prop]=tween.now;}}}};Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"||(!i&&jQuery.isFunction(speed)&&jQuery.isFunction(easing))?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};});jQuery.fn.extend({fadeTo:function(speed,to,easing,callback){return this.filter(isHidden).css("opacity",0).show().end().animate({opacity:to},speed,easing,callback);},animate:function(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function(){var anim=Animation(this,jQuery.extend({},prop),optall);if(empty){anim.stop(true);}};return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function(type,clearQueue,gotoEnd){var stopQueue=function(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}
if(clearQueue&&type!==false){this.queue(type||"fx",[]);}
return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=jQuery._data(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}
for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}}
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});}});function genFx(type,includeWidth){var which,attrs={height:type},i=0;includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}
if(includeWidth){attrs.opacity=attrs.width=type;}
return attrs;}
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.speed=function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;if(opt.queue==null||opt.queue===true){opt.queue="fx";}
opt.old=opt.complete;opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this);}
if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.easing={linear:function(p){return p;},swing:function(p){return 0.5-Math.cos(p*Math.PI)/2;}};jQuery.timers=[];jQuery.fx=Tween.prototype.init;jQuery.fx.tick=function(){var timer,timers=jQuery.timers,i=0;for(;i<timers.length;i++){timer=timers[i];if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}
if(!timers.length){jQuery.fx.stop();}};jQuery.fx.timer=function(timer){if(timer()&&jQuery.timers.push(timer)&&!timerId){timerId=setInterval(jQuery.fx.tick,jQuery.fx.interval);}};jQuery.fx.interval=13;jQuery.fx.stop=function(){clearInterval(timerId);timerId=null;};jQuery.fx.speeds={slow:600,fast:200,_default:400};jQuery.fx.step={};if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};}
var rroot=/^(?:body|html)$/i;jQuery.fn.offset=function(options){if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
var docElem,body,win,clientTop,clientLeft,scrollTop,scrollLeft,box={top:0,left:0},elem=this[0],doc=elem&&elem.ownerDocument;if(!doc){return;}
if((body=doc.body)===elem){return jQuery.offset.bodyOffset(elem);}
docElem=doc.documentElement;if(!jQuery.contains(docElem,elem)){return box;}
if(typeof elem.getBoundingClientRect!=="undefined"){box=elem.getBoundingClientRect();}
win=getWindow(doc);clientTop=docElem.clientTop||body.clientTop||0;clientLeft=docElem.clientLeft||body.clientLeft||0;scrollTop=win.pageYOffset||docElem.scrollTop;scrollLeft=win.pageXOffset||docElem.scrollLeft;return{top:box.top+scrollTop-clientTop,left:box.left+scrollLeft-clientLeft};};jQuery.offset={bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;if(jQuery.support.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;left+=parseFloat(jQuery.css(body,"marginLeft"))||0;}
return{top:top,left:left};},setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");if(position==="static"){elem.style.position="relative";}
var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}
if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset);}
if(options.top!=null){props.top=(options.top-curOffset.top)+curTop;}
if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft;}
if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({position:function(){if(!this[0]){return;}
var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent;}
return offsetParent||document.body;});}});jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top=/Y/.test(prop);jQuery.fn[method]=function(val){return jQuery.access(this,function(elem,method,val){var win=getWindow(elem);if(val===undefined){return win?(prop in win)?win[prop]:win.document.documentElement[method]:elem[method];}
if(win){win.scrollTo(!top?val:jQuery(win).scrollLeft(),top?val:jQuery(win).scrollTop());}else{elem[method]=val;}},method,val,arguments.length,null);};});function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false;}
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return jQuery.access(this,function(elem,type,value){var doc;if(jQuery.isWindow(elem)){return elem.document.documentElement["client"+name];}
if(elem.nodeType===9){doc=elem.documentElement;return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}
return value===undefined?jQuery.css(elem,type,value,extra):jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable,null);};});});window.jQuery=window.$=jQuery;if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return jQuery;});}})(window);;;(function(window,undefined){var freeExports=typeof exports=='object'&&exports;var freeGlobal=typeof global=='object'&&global;if(freeGlobal.global===freeGlobal){window=freeGlobal;}
var arrayRef=[],objectRef={};var idCounter=0;var indicatorObject={};var largeArraySize=30;var oldDash=window._;var reComplexDelimiter=/[-?+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/;var reEscapedHtml=/&(?:amp|lt|gt|quot|#x27);/g;var reEmptyStringLeading=/\b__p \+= '';/g,reEmptyStringMiddle=/\b(__p \+=) '' \+/g,reEmptyStringTrailing=/(__e\(.*?\)|\b__t\)) \+\n'';/g;var reFlags=/\w*$/;var reInsertVariable=/(?:__e|__t = )\(\s*(?![\d\s"']|this\.)/g;var reNative=RegExp('^'+
(objectRef.valueOf+'').replace(/[.*+?^=!:${}()|[\]\/\\]/g,'\\$&').replace(/valueOf|for [^\]]+/g,'.+?')+'$');var reNoMatch=/($^)/;var reUnescapedHtml=/[&<>"']/g;var reUnescapedString=/['\n\r\t\u2028\u2029\\]/g;var shadowed=['constructor','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','toLocaleString','toString','valueOf'];var templateCounter=0;var ceil=Math.ceil,concat=arrayRef.concat,floor=Math.floor,getPrototypeOf=reNative.test(getPrototypeOf=Object.getPrototypeOf)&&getPrototypeOf,hasOwnProperty=objectRef.hasOwnProperty,push=arrayRef.push,propertyIsEnumerable=objectRef.propertyIsEnumerable,slice=arrayRef.slice,toString=objectRef.toString;var nativeBind=reNative.test(nativeBind=slice.bind)&&nativeBind,nativeIsArray=reNative.test(nativeIsArray=Array.isArray)&&nativeIsArray,nativeIsFinite=window.isFinite,nativeIsNaN=window.isNaN,nativeKeys=reNative.test(nativeKeys=Object.keys)&&nativeKeys,nativeMax=Math.max,nativeMin=Math.min,nativeRandom=Math.random;var argsClass='[object Arguments]',arrayClass='[object Array]',boolClass='[object Boolean]',dateClass='[object Date]',funcClass='[object Function]',numberClass='[object Number]',objectClass='[object Object]',regexpClass='[object RegExp]',stringClass='[object String]';var hasDontEnumBug;var iteratesOwnLast;var hasObjectSpliceBug=(hasObjectSpliceBug={'0':1,'length':1},arrayRef.splice.call(hasObjectSpliceBug,0,1),hasObjectSpliceBug[0]);var noArgsEnum=true;(function(){var props=[];function ctor(){this.x=1;}
ctor.prototype={'valueOf':1,'y':1};for(var prop in new ctor){props.push(prop);}
for(prop in arguments){noArgsEnum=!prop;}
hasDontEnumBug=!/valueOf/.test(props);iteratesOwnLast=props[0]!='x';}(1));var noArgsClass=!isArguments(arguments);var noArraySliceOnStrings=slice.call('x')[0]!='x';var noCharByIndex=('x'[0]+Object('x')[0])!='xx';try{var noNodeClass=({'toString':0}+'',toString.call(window.document||0)==objectClass);}catch(e){}
var isBindFast=nativeBind&&/\n|Opera/.test(nativeBind+toString.call(window.opera));var isKeysFast=nativeKeys&&/^.+$|true/.test(nativeKeys+!!window.attachEvent);try{var useSourceURL=(Function('//@')(),!window.attachEvent);}catch(e){}
var cloneableClasses={};cloneableClasses[argsClass]=cloneableClasses[funcClass]=false;cloneableClasses[arrayClass]=cloneableClasses[boolClass]=cloneableClasses[dateClass]=cloneableClasses[numberClass]=cloneableClasses[objectClass]=cloneableClasses[regexpClass]=cloneableClasses[stringClass]=true;var objectTypes={'boolean':false,'function':true,'object':true,'number':false,'string':false,'undefined':false};var stringEscapes={'\\':'\\',"'":"'",'\n':'n','\r':'r','\t':'t','\u2028':'u2028','\u2029':'u2029'};function lodash(value){if(value&&value.__wrapped__){return value;}
if(!(this instanceof lodash)){return new lodash(value);}
this.__wrapped__=value;}
lodash.templateSettings={'escape':/<%-([\s\S]+?)%>/g,'evaluate':/<%([\s\S]+?)%>/g,'interpolate':/<%=([\s\S]+?)%>/g,'variable':''};var iteratorTemplate=template('<% if (obj.useStrict) { %>\'use strict\';\n<% } %>'+'var index, value, iteratee = <%= firstArg %>, '+'result = <%= firstArg %>;\n'+'if (!<%= firstArg %>) return result;\n'+'<%= top %>;\n'+'<% if (arrayLoop) { %>'+'var length = iteratee.length; index = -1;\n'+'if (typeof length == \'number\') {'+'  <% if (noCharByIndex) { %>\n'+'  if (toString.call(iteratee) == stringClass) {\n'+'    iteratee = iteratee.split(\'\')\n'+'  }'+'  <% } %>\n'+'  while (++index < length) {\n'+'    value = iteratee[index];\n'+'    <%= arrayLoop %>\n'+'  }\n'+'}\n'+'else {'+'  <%  } else if (noArgsEnum) { %>\n'+'  var length = iteratee.length; index = -1;\n'+'  if (length && isArguments(iteratee)) {\n'+'    while (++index < length) {\n'+'      value = iteratee[index += \'\'];\n'+'      <%= objectLoop %>\n'+'    }\n'+'  } else {'+'  <% } %>'+'  <% if (!hasDontEnumBug) { %>\n'+'  var skipProto = typeof iteratee == \'function\' && \n'+'    propertyIsEnumerable.call(iteratee, \'prototype\');\n'+'  <% } %>'+'  <% if (isKeysFast && useHas) { %>\n'+'  var ownIndex = -1,\n'+'      ownProps = objectTypes[typeof iteratee] ? nativeKeys(iteratee) : [],\n'+'      length = ownProps.length;\n\n'+'  while (++ownIndex < length) {\n'+'    index = ownProps[ownIndex];\n'+'    <% if (!hasDontEnumBug) { %>if (!(skipProto && index == \'prototype\')) {\n  <% } %>'+'    value = iteratee[index];\n'+'    <%= objectLoop %>\n'+'    <% if (!hasDontEnumBug) { %>}\n<% } %>'+'  }'+'  <% } else { %>\n'+'  for (index in iteratee) {<%'+'    if (!hasDontEnumBug || useHas) { %>\n    if (<%'+'      if (!hasDontEnumBug) { %>!(skipProto && index == \'prototype\')<% }'+'      if (!hasDontEnumBug && useHas) { %> && <% }'+'      if (useHas) { %>hasOwnProperty.call(iteratee, index)<% }'+'    %>) {'+'    <% } %>\n'+'    value = iteratee[index];\n'+'    <%= objectLoop %>;'+'    <% if (!hasDontEnumBug || useHas) { %>\n    }<% } %>\n'+'  }'+'  <% } %>'+'  <% if (hasDontEnumBug) { %>\n\n'+'  var ctor = iteratee.constructor;\n'+'    <% for (var k = 0; k < 7; k++) { %>\n'+'  index = \'<%= shadowed[k] %>\';\n'+'  if (<%'+'      if (shadowed[k] == \'constructor\') {'+'        %>!(ctor && ctor.prototype === iteratee) && <%'+'      } %>hasOwnProperty.call(iteratee, index)) {\n'+'    value = iteratee[index];\n'+'    <%= objectLoop %>\n'+'  }'+'    <% } %>'+'  <% } %>'+'  <% if (arrayLoop || noArgsEnum) { %>\n}<% } %>\n'+'<%= bottom %>;\n'+'return result');var forEachIteratorOptions={'args':'collection, callback, thisArg','top':'callback = createCallback(callback, thisArg)','arrayLoop':'if (callback(value, index, collection) === false) return result','objectLoop':'if (callback(value, index, collection) === false) return result'};var extendIteratorOptions={'useHas':false,'args':'object','top':'for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {\n'+'  if (iteratee = arguments[argsIndex]) {','objectLoop':'result[index] = value','bottom':'  }\n}'};var forOwnIteratorOptions={'arrayLoop':null};function cachedContains(array,fromIndex,largeSize){fromIndex||(fromIndex=0);var length=array.length,isLarge=(length-fromIndex)>=(largeSize||largeArraySize),cache=isLarge?{}:array;if(isLarge){var index=fromIndex-1;while(++index<length){var key=array[index]+'';(hasOwnProperty.call(cache,key)?cache[key]:(cache[key]=[])).push(array[index]);}}
return function(value){if(isLarge){var key=value+'';return hasOwnProperty.call(cache,key)&&indexOf(cache[key],value)>-1;}
return indexOf(cache,value,fromIndex)>-1;}}
function compareAscending(a,b){var ai=a.index,bi=b.index;a=a.criteria;b=b.criteria;if(a!==b){if(a>b||a===undefined){return 1;}
if(a<b||b===undefined){return-1;}}
return ai<bi?-1:1;}
function createBound(func,thisArg,partialArgs){var isFunc=isFunction(func),isPartial=!partialArgs,methodName=func;if(isPartial){partialArgs=thisArg;}
function bound(){var args=arguments,thisBinding=isPartial?this:thisArg;if(!isFunc){func=thisArg[methodName];}
if(partialArgs.length){args=args.length?partialArgs.concat(slice.call(args)):partialArgs;}
if(this instanceof bound){noop.prototype=func.prototype;thisBinding=new noop;var result=func.apply(thisBinding,args);return result&&objectTypes[typeof result]?result:thisBinding}
return func.apply(thisBinding,args);}
return bound;}
function createCallback(func,thisArg){if(!func){return identity;}
if(typeof func!='function'){return function(object){return object[func];};}
if(thisArg!==undefined){return function(value,index,object){return func.call(thisArg,value,index,object);};}
return func;}
function createIterator(){var data={'arrayLoop':'','bottom':'','hasDontEnumBug':hasDontEnumBug,'isKeysFast':isKeysFast,'objectLoop':'','noArgsEnum':noArgsEnum,'noCharByIndex':noCharByIndex,'shadowed':shadowed,'top':'','useHas':true};for(var object,index=0;object=arguments[index];index++){for(var key in object){data[key]=object[key];}}
var args=data.args;data.firstArg=/^[^,]+/.exec(args)[0];var factory=Function('createCallback, hasOwnProperty, isArguments, objectTypes, nativeKeys, '+'propertyIsEnumerable, stringClass, toString','return function('+args+') {\n'+iteratorTemplate(data)+'\n}');return factory(createCallback,hasOwnProperty,isArguments,objectTypes,nativeKeys,propertyIsEnumerable,stringClass,toString);}
function escapeStringChar(match){return'\\'+stringEscapes[match];}
function escapeHtmlChar(match){return htmlEscapes[match];}
function noop(){}
function unescapeHtmlChar(match){return htmlUnescapes[match];}
function isArguments(value){return toString.call(value)==argsClass;}
if(noArgsClass){isArguments=function(value){return value?hasOwnProperty.call(value,'callee'):false;};}
var forIn=createIterator(forEachIteratorOptions,forOwnIteratorOptions,{'useHas':false});var forOwn=createIterator(forEachIteratorOptions,forOwnIteratorOptions);function shimIsPlainObject(value){var result=false;if(!(value&&typeof value=='object')||isArguments(value)){return result;}
var ctor=value.constructor;if((!noNodeClass||!(typeof value.toString!='function'&&typeof(value+'')=='string'))&&(!isFunction(ctor)||ctor instanceof ctor)){if(iteratesOwnLast){forIn(value,function(value,key,object){result=!hasOwnProperty.call(object,key);return false;});return result===false;}
forIn(value,function(value,key){result=key;});return result===false||hasOwnProperty.call(value,result);}
return result;}
function shimKeys(object){var result=[];forOwn(object,function(value,key){result.push(key);});return result;}
var htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'};var htmlUnescapes=invert(htmlEscapes);function clone(value,deep,guard,stackA,stackB){if(value==null){return value;}
if(guard){deep=false;}
var isObj=objectTypes[typeof value];if(isObj){var className=toString.call(value);if(!cloneableClasses[className]||(noArgsClass&&isArguments(value))){return value;}
var isArr=className==arrayClass;isObj=isArr||(className==objectClass?isPlainObject(value):isObj);}
if(!isObj||!deep){return isObj?(isArr?slice.call(value):extend({},value)):value;}
var ctor=value.constructor;switch(className){case boolClass:case dateClass:return new ctor(+value);case numberClass:case stringClass:return new ctor(value);case regexpClass:return ctor(value.source,reFlags.exec(value));}
stackA||(stackA=[]);stackB||(stackB=[]);var length=stackA.length;while(length--){if(stackA[length]==value){return stackB[length];}}
var result=isArr?ctor(value.length):{};stackA.push(value);stackB.push(result);(isArr?forEach:forOwn)(value,function(objValue,key){result[key]=clone(objValue,deep,null,stackA,stackB);});return result;}
var defaults=createIterator(extendIteratorOptions,{'objectLoop':'if (result[index] == null) '+extendIteratorOptions.objectLoop});var extend=createIterator(extendIteratorOptions);function functions(object){var result=[];forIn(object,function(value,key){if(isFunction(value)){result.push(key);}});return result.sort();}
function has(object,property){return object?hasOwnProperty.call(object,property):false;}
function invert(object){var result={};forOwn(object,function(value,key){result[value]=key;});return result;}
var isArray=nativeIsArray||function(value){return toString.call(value)==arrayClass;};function isBoolean(value){return value===true||value===false||toString.call(value)==boolClass;}
function isDate(value){return toString.call(value)==dateClass;}
function isElement(value){return value?value.nodeType===1:false;}
function isEmpty(value){var result=true;if(!value){return result;}
var className=toString.call(value),length=value.length;if((className==arrayClass||className==stringClass||className==argsClass||(noArgsClass&&isArguments(value)))||(className==objectClass&&typeof length=='number'&&isFunction(value.splice))){return!length;}
forOwn(value,function(){return(result=false);});return result;}
function isEqual(a,b,stackA,stackB){if(a===b){return a!==0||(1/a==1/b);}
if(a==null||b==null){return a===b;}
var className=toString.call(a);if(className!=toString.call(b)){return false;}
switch(className){case boolClass:case dateClass:return+a==+b;case numberClass:return a!=+a?b!=+b:(a==0?(1/a==1/b):a==+b);case regexpClass:case stringClass:return a==b+'';}
var isArr=className==arrayClass||className==argsClass;if(noArgsClass&&!isArr&&(isArr=isArguments(a))&&!isArguments(b)){return false;}
if(!isArr){if(a.__wrapped__||b.__wrapped__){return isEqual(a.__wrapped__||a,b.__wrapped__||b);}
if(className!=objectClass||(noNodeClass&&((typeof a.toString!='function'&&typeof(a+'')=='string')||(typeof b.toString!='function'&&typeof(b+'')=='string')))){return false;}
var ctorA=a.constructor,ctorB=b.constructor;if(ctorA!=ctorB&&!(isFunction(ctorA)&&ctorA instanceof ctorA&&isFunction(ctorB)&&ctorB instanceof ctorB)){return false;}}
stackA||(stackA=[]);stackB||(stackB=[]);var length=stackA.length;while(length--){if(stackA[length]==a){return stackB[length]==b;}}
var index=-1,result=true,size=0;stackA.push(a);stackB.push(b);if(isArr){size=a.length;result=size==b.length;if(result){while(size--){if(!(result=isEqual(a[size],b[size],stackA,stackB))){break;}}}
return result;}
for(var key in a){if(hasOwnProperty.call(a,key)){size++;if(!(hasOwnProperty.call(b,key)&&isEqual(a[key],b[key],stackA,stackB))){return false;}}}
for(key in b){if(hasOwnProperty.call(b,key)&&!(size--)){return false;}}
if(hasDontEnumBug){while(++index<7){key=shadowed[index];if(hasOwnProperty.call(a,key)&&!(hasOwnProperty.call(b,key)&&isEqual(a[key],b[key],stackA,stackB))){return false;}}}
return true;}
function isFinite(value){return nativeIsFinite(value)&&!nativeIsNaN(parseFloat(value));}
function isFunction(value){return typeof value=='function';}
if(isFunction(/x/)){isFunction=function(value){return toString.call(value)==funcClass;};}
function isObject(value){return value?objectTypes[typeof value]:false;}
function isNaN(value){return toString.call(value)==numberClass&&value!=+value}
function isNull(value){return value===null;}
function isNumber(value){return toString.call(value)==numberClass;}
var isPlainObject=!getPrototypeOf?shimIsPlainObject:function(value){if(!(value&&typeof value=='object')){return false;}
var valueOf=value.valueOf,objProto=typeof valueOf=='function'&&(objProto=getPrototypeOf(valueOf))&&getPrototypeOf(objProto);return objProto?value==objProto||(getPrototypeOf(value)==objProto&&!isArguments(value)):shimIsPlainObject(value);};function isRegExp(value){return toString.call(value)==regexpClass;}
function isString(value){return toString.call(value)==stringClass;}
function isUndefined(value){return value===undefined;}
var keys=!nativeKeys?shimKeys:function(object){var type=typeof object;if(type=='function'&&propertyIsEnumerable.call(object,'prototype')){return shimKeys(object);}
return object&&objectTypes[type]?nativeKeys(object):[];};function merge(object,source,indicator){var args=arguments,index=0,length=2,stackA=args[3],stackB=args[4];if(indicator!==indicatorObject){stackA=[];stackB=[];length=args.length;}
while(++index<length){forOwn(args[index],function(source,key){var found,isArr,value;if(source&&((isArr=isArray(source))||isPlainObject(source))){var stackLength=stackA.length;while(stackLength--){found=stackA[stackLength]==source;if(found){break;}}
if(found){object[key]=stackB[stackLength];}
else{stackA.push(source);stackB.push(value=(value=object[key],isArr)?(isArray(value)?value:[]):(isPlainObject(value)?value:{}));object[key]=merge(value,source,indicatorObject,stackA,stackB);}}else if(source!=null){object[key]=source;}});}
return object;}
function omit(object,callback,thisArg){var isFunc=typeof callback=='function',result={};if(isFunc){callback=createCallback(callback,thisArg);}else{var props=concat.apply(arrayRef,arguments);}
forIn(object,function(value,key,object){if(isFunc?!callback(value,key,object):indexOf(props,key,1)<0){result[key]=value;}});return result;}
function pairs(object){var result=[];forOwn(object,function(value,key){result.push([key,value]);});return result;}
function pick(object,callback,thisArg){var result={};if(typeof callback!='function'){var index=0,props=concat.apply(arrayRef,arguments),length=props.length;while(++index<length){var key=props[index];if(key in object){result[key]=object[key];}}}else{callback=createCallback(callback,thisArg);forIn(object,function(value,key,object){if(callback(value,key,object)){result[key]=value;}});}
return result;}
function values(object){var result=[];forOwn(object,function(value){result.push(value);});return result;}
function contains(collection,target){var length=collection?collection.length:0;if(typeof length=='number'){return(toString.call(collection)==stringClass?collection.indexOf(target):indexOf(collection,target))>-1;}
return some(collection,function(value){return value===target;});}
function countBy(collection,callback,thisArg){var result={};callback=createCallback(callback,thisArg);forEach(collection,function(value,key,collection){key=callback(value,key,collection);(hasOwnProperty.call(result,key)?result[key]++:result[key]=1);});return result;}
function every(collection,callback,thisArg){var result=true;callback=createCallback(callback,thisArg);forEach(collection,function(value,index,collection){return(result=!!callback(value,index,collection));});return result;}
function filter(collection,callback,thisArg){var result=[];callback=createCallback(callback,thisArg);forEach(collection,function(value,index,collection){if(callback(value,index,collection)){result.push(value);}});return result;}
function find(collection,callback,thisArg){var result;callback=createCallback(callback,thisArg);some(collection,function(value,index,collection){return callback(value,index,collection)&&(result=value,true);});return result;}
var forEach=createIterator(forEachIteratorOptions);function groupBy(collection,callback,thisArg){var result={};callback=createCallback(callback,thisArg);forEach(collection,function(value,key,collection){key=callback(value,key,collection);(hasOwnProperty.call(result,key)?result[key]:result[key]=[]).push(value);});return result;}
function invoke(collection,methodName){var args=slice.call(arguments,2),isFunc=typeof methodName=='function',result=[];forEach(collection,function(value){result.push((isFunc?methodName:value[methodName]).apply(value,args));});return result;}
function map(collection,callback,thisArg){var index=-1,length=collection?collection.length:0,result=Array(typeof length=='number'?length:0);callback=createCallback(callback,thisArg);if(isArray(collection)){while(++index<length){result[index]=callback(collection[index],index,collection);}}else{forEach(collection,function(value,key,collection){result[++index]=callback(value,key,collection);});}
return result;}
function max(collection,callback,thisArg){var computed=-Infinity,index=-1,length=collection?collection.length:0,result=computed;if(callback||typeof length!='number'){callback=createCallback(callback,thisArg);forEach(collection,function(value,index,collection){var current=callback(value,index,collection);if(current>computed){computed=current;result=value;}});}else{while(++index<length){if(collection[index]>result){result=collection[index];}}}
return result;}
function min(collection,callback,thisArg){var computed=Infinity,index=-1,length=collection?collection.length:0,result=computed;if(callback||typeof length!='number'){callback=createCallback(callback,thisArg);forEach(collection,function(value,index,collection){var current=callback(value,index,collection);if(current<computed){computed=current;result=value;}});}else{while(++index<length){if(collection[index]<result){result=collection[index];}}}
return result;}
function pluck(collection,property){var result=[];forEach(collection,function(value){result.push(value[property]);});return result;}
function reduce(collection,callback,accumulator,thisArg){var noaccum=arguments.length<3;callback=createCallback(callback,thisArg);forEach(collection,function(value,index,collection){accumulator=noaccum?(noaccum=false,value):callback(accumulator,value,index,collection)});return accumulator;}
function reduceRight(collection,callback,accumulator,thisArg){var iteratee=collection,length=collection?collection.length:0,noaccum=arguments.length<3;if(typeof length!='number'){var props=keys(collection);length=props.length;}else if(noCharByIndex&&toString.call(collection)==stringClass){iteratee=collection.split('');}
forEach(collection,function(value,index,collection){index=props?props[--length]:--length;accumulator=noaccum?(noaccum=false,iteratee[index]):callback.call(thisArg,accumulator,iteratee[index],index,collection);});return accumulator;}
function reject(collection,callback,thisArg){callback=createCallback(callback,thisArg);return filter(collection,function(value,index,collection){return!callback(value,index,collection);});}
function shuffle(collection){var index=-1,result=Array(collection?collection.length:0);forEach(collection,function(value){var rand=floor(nativeRandom()*(++index+1));result[index]=result[rand];result[rand]=value;});return result;}
function size(collection){var length=collection?collection.length:0;return typeof length=='number'?length:keys(collection).length;}
function some(collection,callback,thisArg){var result;callback=createCallback(callback,thisArg);forEach(collection,function(value,index,collection){return!(result=callback(value,index,collection));});return!!result;}
function sortBy(collection,callback,thisArg){var result=[];callback=createCallback(callback,thisArg);forEach(collection,function(value,index,collection){result.push({'criteria':callback(value,index,collection),'index':index,'value':value});});var length=result.length;result.sort(compareAscending);while(length--){result[length]=result[length].value;}
return result;}
function toArray(collection){if(collection&&typeof collection.length=='number'){return(noArraySliceOnStrings?toString.call(collection)==stringClass:typeof collection=='string')?collection.split(''):slice.call(collection);}
return values(collection);}
function where(collection,properties){var props=[];forIn(properties,function(value,prop){props.push(prop);});return filter(collection,function(object){var length=props.length;while(length--){var result=object[props[length]]===properties[props[length]];if(!result){break;}}
return!!result;});}
function compact(array){var index=-1,length=array?array.length:0,result=[];while(++index<length){var value=array[index];if(value){result.push(value);}}
return result;}
function difference(array){var index=-1,length=array?array.length:0,flattened=concat.apply(arrayRef,arguments),contains=cachedContains(flattened,length),result=[];while(++index<length){var value=array[index];if(!contains(value)){result.push(value);}}
return result;}
function first(array,n,guard){if(array){return(n==null||guard)?array[0]:slice.call(array,0,n);}}
function flatten(array,shallow){var index=-1,length=array?array.length:0,result=[];while(++index<length){var value=array[index];if(isArray(value)){push.apply(result,shallow?value:flatten(value));}else{result.push(value);}}
return result;}
function indexOf(array,value,fromIndex){var index=-1,length=array?array.length:0;if(typeof fromIndex=='number'){index=(fromIndex<0?nativeMax(0,length+fromIndex):fromIndex||0)-1;}else if(fromIndex){index=sortedIndex(array,value);return array[index]===value?index:-1;}
while(++index<length){if(array[index]===value){return index;}}
return-1;}
function initial(array,n,guard){return array?slice.call(array,0,-((n==null||guard)?1:n)):[];}
function intersection(array){var args=arguments,argsLength=args.length,cache={},result=[];forEach(array,function(value){if(indexOf(result,value)<0){var length=argsLength;while(--length){if(!(cache[length]||(cache[length]=cachedContains(args[length])))(value)){return;}}
result.push(value);}});return result;}
function last(array,n,guard){if(array){var length=array.length;return(n==null||guard)?array[length-1]:slice.call(array,-n||length);}}
function lastIndexOf(array,value,fromIndex){var index=array?array.length:0;if(typeof fromIndex=='number'){index=(fromIndex<0?nativeMax(0,index+fromIndex):nativeMin(fromIndex,index-1))+1;}
while(index--){if(array[index]===value){return index;}}
return-1;}
function object(keys,values){var index=-1,length=keys?keys.length:0,result={};while(++index<length){var key=keys[index];if(values){result[key]=values[index];}else{result[key[0]]=key[1];}}
return result;}
function range(start,end,step){start=+start||0;step=+step||1;if(end==null){end=start;start=0;}
var index=-1,length=nativeMax(0,ceil((end-start)/step)),result=Array(length);while(++index<length){result[index]=start;start+=step;}
return result;}
function rest(array,n,guard){return array?slice.call(array,(n==null||guard)?1:n):[];}
function sortedIndex(array,value,callback,thisArg){var low=0,high=array?array.length:low;callback=callback?createCallback(callback,thisArg):identity;value=callback(value);while(low<high){var mid=(low+high)>>>1;callback(array[mid])<value?low=mid+1:high=mid;}
return low;}
function union(){return uniq(concat.apply(arrayRef,arguments));}
function uniq(array,isSorted,callback,thisArg){var index=-1,length=array?array.length:0,result=[],seen=result;if(typeof isSorted=='function'){thisArg=callback;callback=isSorted;isSorted=false;}
if(callback){seen=[];callback=createCallback(callback,thisArg);}
while(++index<length){var value=array[index],computed=callback?callback(value,index,array):value;if(isSorted?!index||seen[seen.length-1]!==computed:indexOf(seen,computed)<0){if(callback){seen.push(computed);}
result.push(value);}}
return result;}
function without(array){var index=-1,length=array?array.length:0,contains=cachedContains(arguments,1,20),result=[];while(++index<length){var value=array[index];if(!contains(value)){result.push(value);}}
return result;}
function zip(array){var index=-1,length=array?max(pluck(arguments,'length')):0,result=Array(length);while(++index<length){result[index]=pluck(arguments,index);}
return result;}
function after(n,func){if(n<1){return func();}
return function(){if(--n<1){return func.apply(this,arguments);}};}
function bind(func,thisArg){return isBindFast||(nativeBind&&arguments.length>2)?nativeBind.call.apply(nativeBind,arguments):createBound(func,thisArg,slice.call(arguments,2));}
function bindAll(object){var funcs=arguments,index=funcs.length>1?0:(funcs=functions(object),-1),length=funcs.length;while(++index<length){var key=funcs[index];object[key]=bind(object[key],object);}
return object;}
function compose(){var funcs=arguments;return function(){var args=arguments,length=funcs.length;while(length--){args=[funcs[length].apply(this,args)];}
return args[0];};}
function debounce(func,wait,immediate){var args,result,thisArg,timeoutId;function delayed(){timeoutId=null;if(!immediate){result=func.apply(thisArg,args);}}
return function(){var isImmediate=immediate&&!timeoutId;args=arguments;thisArg=this;clearTimeout(timeoutId);timeoutId=setTimeout(delayed,wait);if(isImmediate){result=func.apply(thisArg,args);}
return result;};}
function delay(func,wait){var args=slice.call(arguments,2);return setTimeout(function(){func.apply(undefined,args);},wait);}
function defer(func){var args=slice.call(arguments,1);return setTimeout(function(){func.apply(undefined,args);},1);}
function lateBind(object,methodName){return createBound(methodName,object,slice.call(arguments,2));}
function memoize(func,resolver){var cache={};return function(){var key=resolver?resolver.apply(this,arguments):arguments[0];return hasOwnProperty.call(cache,key)?cache[key]:(cache[key]=func.apply(this,arguments));};}
function once(func){var result,ran=false;return function(){if(ran){return result;}
ran=true;result=func.apply(this,arguments);func=null;return result;};}
function partial(func){return createBound(func,slice.call(arguments,1));}
function throttle(func,wait){var args,result,thisArg,timeoutId,lastCalled=0;function trailingCall(){lastCalled=new Date;timeoutId=null;result=func.apply(thisArg,args);}
return function(){var now=new Date,remaining=wait-(now-lastCalled);args=arguments;thisArg=this;if(remaining<=0){clearTimeout(timeoutId);lastCalled=now;result=func.apply(thisArg,args);}
else if(!timeoutId){timeoutId=setTimeout(trailingCall,remaining);}
return result;};}
function wrap(value,wrapper){return function(){var args=[value];push.apply(args,arguments);return wrapper.apply(this,args);};}
function escape(string){return string==null?'':(string+'').replace(reUnescapedHtml,escapeHtmlChar);}
function identity(value){return value;}
function mixin(object){forEach(functions(object),function(methodName){var func=lodash[methodName]=object[methodName];lodash.prototype[methodName]=function(){var args=[this.__wrapped__];push.apply(args,arguments);var result=func.apply(lodash,args);if(this.__chain__){result=new lodash(result);result.__chain__=true;}
return result;};});}
function noConflict(){window._=oldDash;return this;}
function random(min,max){if(min==null&&max==null){max=1;}
min=+min||0;if(max==null){max=min;min=0;}
return min+floor(nativeRandom()*((+max||0)-min+1));}
function result(object,property){var value=object?object[property]:null;return isFunction(value)?object[property]():value;}
function template(text,data,options){text||(text='');options||(options={});var isEvaluating,result,index=0,settings=lodash.templateSettings,source="__p += '",variable=options.variable||settings.variable,hasVariable=variable;var reDelimiters=RegExp((options.escape||settings.escape||reNoMatch).source+'|'+
(options.interpolate||settings.interpolate||reNoMatch).source+'|'+
(options.evaluate||settings.evaluate||reNoMatch).source+'|$','g');text.replace(reDelimiters,function(match,escapeValue,interpolateValue,evaluateValue,offset){source+=text.slice(index,offset).replace(reUnescapedString,escapeStringChar);source+=escapeValue?"' +\n__e("+escapeValue+") +\n'":evaluateValue?"';\n"+evaluateValue+";\n__p += '":interpolateValue?"' +\n((__t = ("+interpolateValue+")) == null ? '' : __t) +\n'":'';isEvaluating||(isEvaluating=evaluateValue||reComplexDelimiter.test(escapeValue||interpolateValue));index=offset+match.length;});source+="';\n";if(!hasVariable){variable='obj';if(isEvaluating){source='with ('+variable+') {\n'+source+'\n}\n';}
else{var reDoubleVariable=RegExp('(\\(\\s*)'+variable+'\\.'+variable+'\\b','g');source=source.replace(reInsertVariable,'$&'+variable+'.').replace(reDoubleVariable,'$1__d');}}
source=(isEvaluating?source.replace(reEmptyStringLeading,''):source).replace(reEmptyStringMiddle,'$1').replace(reEmptyStringTrailing,'$1;');source='function('+variable+') {\n'+
(hasVariable?'':variable+' || ('+variable+' = {});\n')+'var __t, __p = \'\', __e = _.escape'+
(isEvaluating?', __j = Array.prototype.join;\n'+'function print() { __p += __j.call(arguments, \'\') }\n':(hasVariable?'':', __d = '+variable+'.'+variable+' || '+variable)+';\n')+
source+'return __p\n}';var sourceURL=useSourceURL?'\n//@ sourceURL='+(options.sourceURL||'/lodash/template/source['+(templateCounter++)+']'):'';try{result=Function('_','return '+source+sourceURL)(lodash);}catch(e){e.source=source;throw e;}
if(data){return result(data);}
result.source=source;return result;}
function times(n,callback,thisArg){n=+n||0;var index=-1,result=Array(n);while(++index<n){result[index]=callback.call(thisArg,index);}
return result;}
function unescape(string){return string==null?'':(string+'').replace(reEscapedHtml,unescapeHtmlChar);}
function uniqueId(prefix){var id=idCounter++;return prefix?prefix+id:id;}
function chain(value){value=new lodash(value);value.__chain__=true;return value;}
function tap(value,interceptor){interceptor(value);return value;}
function wrapperChain(){this.__chain__=true;return this;}
function wrapperValue(){return this.__wrapped__;}
lodash.VERSION='0.9.1';lodash.after=after;lodash.bind=bind;lodash.bindAll=bindAll;lodash.chain=chain;lodash.clone=clone;lodash.compact=compact;lodash.compose=compose;lodash.contains=contains;lodash.countBy=countBy;lodash.debounce=debounce;lodash.defaults=defaults;lodash.defer=defer;lodash.delay=delay;lodash.difference=difference;lodash.escape=escape;lodash.every=every;lodash.extend=extend;lodash.filter=filter;lodash.find=find;lodash.first=first;lodash.flatten=flatten;lodash.forEach=forEach;lodash.forIn=forIn;lodash.forOwn=forOwn;lodash.functions=functions;lodash.groupBy=groupBy;lodash.has=has;lodash.identity=identity;lodash.indexOf=indexOf;lodash.initial=initial;lodash.intersection=intersection;lodash.invert=invert;lodash.invoke=invoke;lodash.isArguments=isArguments;lodash.isArray=isArray;lodash.isBoolean=isBoolean;lodash.isDate=isDate;lodash.isElement=isElement;lodash.isEmpty=isEmpty;lodash.isEqual=isEqual;lodash.isFinite=isFinite;lodash.isFunction=isFunction;lodash.isNaN=isNaN;lodash.isNull=isNull;lodash.isNumber=isNumber;lodash.isObject=isObject;lodash.isPlainObject=isPlainObject;lodash.isRegExp=isRegExp;lodash.isString=isString;lodash.isUndefined=isUndefined;lodash.keys=keys;lodash.last=last;lodash.lastIndexOf=lastIndexOf;lodash.lateBind=lateBind;lodash.map=map;lodash.max=max;lodash.memoize=memoize;lodash.merge=merge;lodash.min=min;lodash.mixin=mixin;lodash.noConflict=noConflict;lodash.object=object;lodash.omit=omit;lodash.once=once;lodash.pairs=pairs;lodash.partial=partial;lodash.pick=pick;lodash.pluck=pluck;lodash.random=random;lodash.range=range;lodash.reduce=reduce;lodash.reduceRight=reduceRight;lodash.reject=reject;lodash.rest=rest;lodash.result=result;lodash.shuffle=shuffle;lodash.size=size;lodash.some=some;lodash.sortBy=sortBy;lodash.sortedIndex=sortedIndex;lodash.tap=tap;lodash.template=template;lodash.throttle=throttle;lodash.times=times;lodash.toArray=toArray;lodash.unescape=unescape;lodash.union=union;lodash.uniq=uniq;lodash.uniqueId=uniqueId;lodash.values=values;lodash.where=where;lodash.without=without;lodash.wrap=wrap;lodash.zip=zip;lodash.all=every;lodash.any=some;lodash.collect=map;lodash.detect=find;lodash.drop=rest;lodash.each=forEach;lodash.foldl=reduce;lodash.foldr=reduceRight;lodash.head=first;lodash.include=contains;lodash.inject=reduce;lodash.methods=functions;lodash.select=filter;lodash.tail=rest;lodash.take=first;lodash.unique=uniq;lodash._iteratorTemplate=iteratorTemplate;mixin(lodash);lodash.prototype.chain=wrapperChain;lodash.prototype.value=wrapperValue;forEach(['pop','push','reverse','shift','sort','splice','unshift'],function(methodName){var func=arrayRef[methodName];lodash.prototype[methodName]=function(){var value=this.__wrapped__;func.apply(value,arguments);if(hasObjectSpliceBug&&value.length===0){delete value[0];}
if(this.__chain__){value=new lodash(value);value.__chain__=true;}
return value;};});forEach(['concat','join','slice'],function(methodName){var func=arrayRef[methodName];lodash.prototype[methodName]=function(){var value=this.__wrapped__,result=func.apply(value,arguments);if(this.__chain__){result=new lodash(result);result.__chain__=true;}
return result;};});if(typeof define=='function'&&typeof define.amd=='object'&&define.amd){window._=lodash;define("lodash",function(){return lodash;});}
else if(freeExports){if(typeof module=='object'&&module&&module.exports==freeExports){(module.exports=lodash)._=lodash;}
else{freeExports._=lodash;}}
else{window._=lodash;}}(this));;define("logging",['jquery','jquery.cookie','external'],function($)
{$(function()
{if(typeof CUSTOM_PAGE_LOGGING=="undefined"||!CUSTOM_PAGE_LOGGING)
{_gaq.push(['_trackPageview']);}
var emails=['business@cooper.com','cooperu@cooper.com','acooper@cooper.com']
for(var i=0;i<emails.length;i++)
{var email=emails[i]
$('a[href="mailto:'+email+'"]').click(function(e)
{_gaq.push(['_trackPageview','/emails/click/'+email])})}
twttr.ready(function(twttr)
{twttr.events.bind('tweet',function(intent_event)
{if(intent_event)
{_gaq.push(['_trackSocial','twitter','tweet',null])}})})
window.fbAsyncInit=function()
{FB.Event.subscribe('edge.create',function(target_url)
{_gaq.push(['_trackSocial','facebook','like',target_url])})
FB.Event.subscribe('edge.remove',function(target_url)
{_gaq.push(['_trackSocial','facebook','unlike',target_url])})
FB.Event.subscribe('message.send',function(target_url)
{_gaq.push(['_trackSocial','facebook','share',target_url])})}
window.LinkedInShare=function()
{console.log('linkedin share')
_gaq.push(['_trackSocial','linkedin','share']);}
$('a[data-profile]').click(function(e)
{var type=$(this).data('profile')
if(type)
{_gaq.push(['_trackPageview','/profiles/click/'+type])}})
$('a.rss').click(function(e)
{_gaq.push(['_trackPageview','/journal/rss.xml'])})
var demo_data=$.cookie('demo')
if(demo_data)
{if(demo_data)
{var values=demo_data.split('/'),keys=['title','company','industry','age','klout_influence']
for(var i=0;i<values.length&&i<5;i++)
{var value='unknown'
if(values[i])
{value=decodeURIComponent(values[i])}
_gaq.push(['_setCustomVar',i+1,keys[i],value,1])}
$.removeCookie('demo')}}
var pattern=new RegExp('eventbrite.com/?$','i')
$('a[href]').each(function()
{var $link=$(this)
if(pattern.exec($link.attr('href')))
{$link.attr('target','_blank')
$link.click(function(e)
{_gaq.push(['_trackEvent','Eventbrite','Link click',$link.attr('href')])})}})})});define("jquery.cookie",['jquery'],function($)
{var pluses=/\+/g;function raw(s){return s;}
function decoded(s){return decodeURIComponent(s.replace(pluses,' '));}
var config=$.cookie=function(key,value,options){if(value!==undefined){options=$.extend({},config.defaults,options);if(value===null){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=config.json?JSON.stringify(value):String(value);return(document.cookie=[encodeURIComponent(key),'=',config.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var decode=config.raw?raw:decoded;var cookies=document.cookie.split('; ');for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');if(decode(parts.shift())===key){var cookie=decode(parts.join('='));return config.json?JSON.parse(cookie):cookie;}}
return null;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)!==null){$.cookie(key,null,options);return true;}
return false;};});define("external",['jquery'],function()
{$(function()
{window._gaq=typeof _gaq=="undefined"?[]:_gaq;_gaq.push(['_setAccount','UA-1828481-1']);var _qevents=_qevents||[];_qevents.push({qacct:"p-t-wp3EyRQSkQR"});var external_scripts=['apis.google.com/js/plusone.js','connect.facebook.net/en_US/all.js#xfbml=1&appId=173188206099579','platform.linkedin.com/in.js',['www.google-analytics.com/ga.js','ssl.google-analytics.com/ga.js'],['edge.quantserve.com/quant.js','secure.quantserve.com/quant.js']]
var is_secure=document.location.protocol=='https:'
for(var i=0;i<external_scripts.length;i++)
{var script_src=external_scripts[i],script_elem=document.createElement('script')
if(is_secure)
{script_elem.src='https://'+(script_src.constructor==Array?script_src[1]:script_src)}
else
{script_elem.src='http://'+(script_src.constructor==Array?script_src[0]:script_src)}
script_elem.async=true
script_elem.type='text/javascript'
document.getElementsByTagName('body')[0].appendChild(script_elem);}
window.twttr=(function(d,s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}});}(document,"script","twitter-wjs"));})});if(!window.matchMedia)
{window.matchMedia=window.matchMedia||(function(doc,undefined){"use strict";var bool,docElem=doc.documentElement,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement("body"),div=doc.createElement("div");div.id="mq-test-1";div.style.cssText="position:absolute;top:-100em";fakeBody.style.background="none";fakeBody.appendChild(div);return function(q){div.innerHTML="&shy;<style media=\""+q+"\"> #mq-test-1 { width: 42px; }</style>";docElem.insertBefore(fakeBody,refNode);bool=div.offsetWidth===42;docElem.removeChild(fakeBody);return{matches:bool,media:q};};}(document));}
define("respond",['lodash','jquery','eventhub'],function(_,$,EventHub)
{"use strict"
var respond={event_hub:new EventHub(),on:function(name,callback)
{if(name=='ready')
{this.event_hub.one(name,callback)}
else
{this.event_hub.late(name,callback)}
return this},off:function(name,callback)
{this.event_hub.off(name,callback)
return this},one:function(name,callback)
{this.event_hub.one(name,callback)
return this},fire:function()
{this.event_hub.fire.apply(this.event_hub,arguments)
return this},breaks:{small:'(max-width: 600px)',large:'(min-width: 601px)'},set_break:function(name,rule)
{this.breaks[name]=rule
this.check()},get_span:function(n)
{if(typeof window['inner'+n]!="undefined")
{return window['inner'+n]}
if(document.documentElement&&typeof document.documentElement['client'+n]!="undefined")
{return document.documentElement['client'+n]}
if(document.body&&typeof document.body['client'+n]!="undefined")
{return document.body['client'+n]}
return undefined},get_width:function()
{return respond.get_span('Width')},get_height:function()
{return respond.get_span('Height')},get_orientation:function()
{return respond.width<respond.height?"portrait":"landscape"},get_matches:function()
{if($.browser.msie&&$.browser.version.substr(0,1)=='8')
{return respond.get_width_matches()}
var matches=[]
_.forOwn(respond.breaks,function(b,name)
{if(typeof b=="function")
{if(b())
{matches.push(name)}}
else if(window.matchMedia(b).matches)
{matches.push(name)}})
return matches},get_width_matches:function()
{var matches=[],pattern=/(min|max)-width:\s+?(\d+)/gi
for(var name in respond.breaks)
{var width_matches=respond.breaks[name].match(pattern)
if(width_matches.length>0)
{var is_match=true
_.forEach(width_matches,function(m)
{var parts=m.split(':'),bound=parts[0].substr(0,3),amount=parseInt(parts[1])
if(bound=='min')
{if(respond.width<amount)
{is_match=false
return false}}
else if(respond.width>amount)
{is_match=false
return false}})
if(is_match)
{matches.push(name)}}}
return matches},check:function()
{var width=respond.get_width(),height=respond.get_height(),events=[]
_.forEach(['width','height'],function(n)
{var val=respond['get_'+n]()
if(val!=respond[n])
{respond[n]=val
events.push(n)}})
var orientation=respond.get_orientation()
if(orientation!=respond.orientation)
{respond.orientation=orientation
events.push('orientation')
events.push(respond.orientation)}
var matches=respond.get_matches(),new_matches=[],unmatches=[]
_.forEach(matches,function(m)
{if(!_.contains(respond.matches,m))
{new_matches.push(m)}})
_.forEach(respond.matches,function(m)
{if(!_.contains(matches,m))
{unmatches.push(m)}})
respond.matches=matches
events=events.concat(_.map(unmatches,function(m)
{return m+'-off'}),new_matches)
_.forEach(events,respond.fire,respond)}}
$.extend($.mobile,{ajaxEnabled:false,hashListeningEnabled:false,linkBindingEnabled:false,pushStateEnabled:false})
$.extend(respond,{pixel_ratio:window.devicePixelRatio?window.devicePixelRatio:1.0,touch:('ontouchstart'in document.documentElement),})
respond.check()
respond.ready=true
if(respond.touch)
{respond.fire('touch')}
respond.fire('pixel-ratio-'+parseInt(respond.pixel_ratio))
$(window).bind('resize',_.bind(respond.check,respond))
return respond});define("eventhub",['lodash'],function(_)
{var EventHub=function()
{this._listeners={}
this._one={}
this._late={}
this._all=[]}
EventHub.prototype={on:function(name,callback)
{this._call_registration_function(this._on_single,name,callback)
return this},_on_single:function(name,callback)
{if(!name)
{return this}
if(typeof this._listeners[name]=="undefined")
{this._listeners[name]=[]}
if(_.indexOf(this._listeners[name],callback)===-1)
{this._listeners[name].push(callback)}},off:function(name,callback)
{this._call_registration_function(this._off_single,name,callback)
return this},_off_single:function(name,callback)
{if(typeof this._listeners[name]=="undefined")
{return}
var i=_.indexOf(this._listeners[name],callback)
if(i!==-1)
{this._listeners[name].splice(i,1)}},one:function(name,callback)
{this._call_registration_function(this._one_single,name,callback)
return this},_one_single:function(name,callback)
{if(typeof this._one[name]!="undefined"&&this._one[name].args!="undefined")
{callback.apply(undefined,this._one[name].args)}
else
{if(typeof this._one[name]=="undefined")
{this._one[name]={listeners:[]}}
if(_.indexOf(this._one[name].listeners,callback)===-1)
{this._one[name].listeners.push(callback)}}},late:function(name,callback)
{this._call_registration_function(this._late_single,name,callback)
return this},_late_single:function(name,callback)
{if(!name)
{return}
if(typeof this._late[name]=="undefined")
{this.on(name,callback)}
else if(this._late[name].args)
{callback.apply(undefined,this._late[name].args)
this.on(name,callback)}
else
{this._late[name].listeners.push(callback)}},_call_registration_function:function(fn,name,callback)
{var bound=_.bind(fn,this)
_.forEach(name.split(/\s+/),function(n)
{bound(n,callback)})},all:function(callback)
{this._all.push(callback)
return this},fire:function()
{var name=arguments[0]
var args=Array.prototype.slice.call(arguments,1)
if(typeof this._one[name]=="undefined")
{this._one[name]={args:args}}
if(typeof this._one[name].listeners!="undefined")
{_.forEach(this._one[name].listeners,function(listener)
{listener.apply(undefined,args)})
delete this._one[name].listeners}
if(typeof this._listeners[name]!="undefined")
{_.forEach(this._listeners[name],function(listener)
{listener.apply(undefined,args)})}
if(typeof this._late[name]=="undefined")
{this._late[name]={args:args,listeners:[]}}
if(typeof this._late[name].listeners!="undefined")
{var me=this
_.forEach(this._late[name].listeners,function(listener)
{listener.apply(undefined,args)
me.on(name,listener)})
this._late[name].listeners=[]}
if(this._all.length>0)
{args.unshift(name)
_.forEach(this._all,function(listener)
{listener.apply(undefined,args)})}
return this}}
EventHub.mixin=function(object)
{object._eventhub=new EventHub()
for(var n in object._eventhub)
{if(typeof object._eventhub[n]=="function")
{object[n]=_.bind(object._eventhub[n],object._eventhub)}}}
return EventHub});define("classes",['lodash','respond'],function(_,respond)
{var turn_on=function(size)
{$('[data-class-'+size+']').each(function()
{var $elm=$(this)
$elm.addClass($elm.data('class-'+size))})}
var turn_off=function(size)
{$('[data-class-'+size+']').each(function()
{var $elm=$(this)
$elm.removeClass($elm.data('class-'+size))})}
respond.on('small',_.bind(turn_on,null,'small')).on('small-off',_.bind(turn_off,null,'small')).on('large',_.bind(turn_on,null,'large')).on('large-off',_.bind(turn_off,null,'large'))});define("images",['lodash','jquery','respond'],function(_,$,respond)
{var sizes=['small','large']
$(function()
{var $images=$('.image')
$images.each(function()
{var $image=$(this),sizes_matched=[]
_.forEach(sizes,function(size)
{var $source=$image.find('.'+size+',.'+size+'-2x')
if($source.length>0)
{sizes_matched.push(size)
$source.addClass('only-'+size)}})
var $fallback=$image.find('.default')
if($fallback.length>0&&sizes_matched.length>0)
{$fallback.addClass(_.map(sizes_matched,function(size)
{return'hide-'+size}).join(' '))}})
var get_source=function($image,size,only_new)
{var $source
if(respond.pixel_ratio>=2)
{$source=$image.find('.'+size+'-2x')}
if(!$source||$source.length==0)
{$source=$image.find('.'+size)}
if($source.length==0)
{$source=$image.find('.default')
if($source.length==0)
{return}
if(only_new&&$source.find('img').length>0)
{return}}
return $source}
var adjust_size=function($source)
{var $elm=$source.is('.free')?$source:$source.parents('.free')
if($elm.length>0)
{$elm.css({width:$source.attr('width'),height:$source.attr('height')})}}
var load_size=function(size)
{$images.each(function()
{var $image=$(this),$source=get_source($image,size,true)
if(!$source)
{return}
var src=$source.data('src')
if(src)
{$source.append($('<img src="'+src+'" onerror="this.style.display=\'none\'" />').attr({alt:$source.data('alt'),width:$source.attr('width'),height:$source.attr('height')}))}})}
var update_size=function(size)
{$images.each(function()
{var $image=$(this),$source=get_source($image,size)
if($source)
{adjust_size($source)}})}
_.forEach(sizes,function(s)
{respond.one(s,_.bind(load_size,undefined,s))
respond.on(s,_.bind(update_size,undefined,s))})})
$(function()
{var $containers=$('.with-background-image')
var update_background=function(size)
{$containers.each(function()
{var $container=$(this)
var attr='background-'+size
var double_suffix=''
if(respond.pixel_ratio>=2)
{double_suffix='-double'}
var source=$container.data(attr+double_suffix)
if(!source)
{source=$container.data('background-default'+double_suffix)
if(!source)
{source=$container.data('background-default')}}
if(source)
{$container.css('background-image','url('+source+')')}
else
{$container.css('background-image','none')}})}
_.forEach(sizes,function(s)
{respond.on(s,_.bind(update_background,undefined,s))})})});define("backgrounds",['lodash','jquery','respond'],function(_,$,respond)
{var patterns={'background':/(background-[^\s]+|arrow-[^\s]+|arrow)/g,'arrow':/(arrow-[^\s]+|arrow)/g}
$(function()
{var elements={small:[],large:[]},sizes=_.keys(elements)
_.forOwn(patterns,function(pattern,key)
{$(_.map(sizes,function(size)
{return'.'+key+'-only-'+size}).join(',')).each(function()
{var $elm=$(this),matches=[],match,size
while(match=pattern.exec($elm.prop('className')))
{if(match[0].match(/-only/))
{size=match[0].split('-')[2]}
else
{matches.push(match[0])}}
if(matches.length>0)
{var classes=matches.join(' ')
elements[size].push({$elm:$elm,classes:classes})
$elm.removeClass(classes)}})})
_.forOwn(elements,function(size,size_name)
{if(size.length>0)
{respond.on(size_name,function()
{_.forEach(size,function(s)
{s.$elm.addClass(s.classes)})}).on(size_name+'-off',function()
{_.forEach(size,function(s)
{s.$elm.removeClass(s.classes)})})}})})
$(function()
{$('.background-gradient').each(function()
{var $elm=$(this)
var start=$elm.data('background-gradient-start'),end=$elm.data('background-gradient-end')
if(!start||!end)
{return}
var prefix=null
if($.browser.webkit)
{prefix='-webkit-'}
else if($.browser.mozilla)
{prefix='-moz-'}
else if($.browser.opera)
{prefix='-o-'}
else if($.browser.msie&&$.browser.version>=10)
{prefix='-ms-'}
if($.browser.msie&&$.browser.version<10)
{this.style.filter='progid:DXImageTransform.Microsoft.gradient( startColorstr="'+start+'", endColorstr="'+end+'",GradientType=0 )'}
else if(prefix!==null)
{this.style.backgroundImage=prefix+'linear-gradient(top, '+start+' 0%, '+end+' 100%)'}
else
{this.style.background=end}})})
$('.placeholder').each(function()
{var $elm=$(this)
$elm.height($elm.attr('height'))})});define("notches",['jquery'],function()
{if($('html').is('.lt-ie9'))
{return}
$.fn.notch=function()
{return this.each(function()
{var $elm=$(this)
if(!$elm.is('.notch'))
{return}
var $mask=$('<div class="notch-container">'+'<div class="notch-outer">'+'<div class="background"><div></div><div></div></div>'+'<div class="notch-mask"><div class="inner"><div></div><div></div></div></div>'+'</div>'+'</div>')
var classes=$elm.prop('className').split(' ')
for(var i=0;i<classes.length;i++)
{if(classes[i].match(/^background-/))
{$mask.addClass(classes[i].split('-')[1])
break}}
if($elm.is('.notch-top'))
{$elm.prepend($mask)}
else
{$elm.append($mask)}})}
$(function()
{$('.notch').notch()})});define("navigation",['jquery','respond','jquery.touch'],function($,respond)
{respond.set_break('mininav','(max-width: 601px)')
$(function()
{var $header=$('header.navigation'),$toggle=$header.find('.menu-toggle'),$nav=$header.find('nav'),$current=$header.find('.current')
respond.one('mininav',function()
{$toggle.click(function(e)
{e.preventDefault()
if($header.is('.open'))
{$header.animate({top:0},function()
{$header.removeClass('open')})}
else
{var nav_height=$nav.outerHeight()
$header.addClass('open')
$header.animate({top:nav_height})}})}).on('mininav-off',function()
{$header.removeClass('open').css('top',0)})
$header.find('.current').html($nav.find('.selected').text())})});(function(root,doc,factory){if(typeof define==="function"&&define.amd){define("jquery.touch",["jquery"],function($){factory($,root,doc);return $.mobile;});}else{factory(root.jQuery,root,doc);}}(this,document,function(jQuery,window,document,undefined){(function($,undefined){var support={touch:"ontouchend"in document};$.mobile=$.mobile||{};$.mobile.support=$.mobile.support||{};$.extend($.support,support);$.extend($.mobile.support,support);}(jQuery));(function($,window,document,undefined){var dataPropertyName="virtualMouseBindings",touchTargetPropertyName="virtualTouchID",virtualEventNames="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),touchEventProps="clientX clientY pageX pageY screenX screenY".split(" "),mouseHookProps=$.event.mouseHooks?$.event.mouseHooks.props:[],mouseEventProps=$.event.props.concat(mouseHookProps),activeDocHandlers={},resetTimerID=0,startX=0,startY=0,didScroll=false,clickBlockList=[],blockMouseTriggers=false,blockTouchTriggers=false,eventCaptureSupported="addEventListener"in document,$document=$(document),nextTouchID=1,lastTouchID=0,threshold;$.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};function getNativeEvent(event){while(event&&typeof event.originalEvent!=="undefined"){event=event.originalEvent;}
return event;}
function createVirtualEvent(event,eventType){var t=event.type,oe,props,ne,prop,ct,touch,i,j,len;event=$.Event(event);event.type=eventType;oe=event.originalEvent;props=$.event.props;if(t.search(/^(mouse|click)/)>-1){props=mouseEventProps;}
if(oe){for(i=props.length,prop;i;){prop=props[--i];event[prop]=oe[prop];}}
if(t.search(/mouse(down|up)|click/)>-1&&!event.which){event.which=1;}
if(t.search(/^touch/)!==-1){ne=getNativeEvent(oe);t=ne.touches;ct=ne.changedTouches;touch=(t&&t.length)?t[0]:((ct&&ct.length)?ct[0]:undefined);if(touch){for(j=0,len=touchEventProps.length;j<len;j++){prop=touchEventProps[j];event[prop]=touch[prop];}}}
return event;}
function getVirtualBindingFlags(element){var flags={},b,k;while(element){b=$.data(element,dataPropertyName);for(k in b){if(b[k]){flags[k]=flags.hasVirtualBinding=true;}}
element=element.parentNode;}
return flags;}
function getClosestElementWithVirtualBinding(element,eventType){var b;while(element){b=$.data(element,dataPropertyName);if(b&&(!eventType||b[eventType])){return element;}
element=element.parentNode;}
return null;}
function enableTouchBindings(){blockTouchTriggers=false;}
function disableTouchBindings(){blockTouchTriggers=true;}
function enableMouseBindings(){lastTouchID=0;clickBlockList.length=0;blockMouseTriggers=false;disableTouchBindings();}
function disableMouseBindings(){enableTouchBindings();}
function startResetTimer(){clearResetTimer();resetTimerID=setTimeout(function(){resetTimerID=0;enableMouseBindings();},$.vmouse.resetTimerDuration);}
function clearResetTimer(){if(resetTimerID){clearTimeout(resetTimerID);resetTimerID=0;}}
function triggerVirtualEvent(eventType,event,flags){var ve;if((flags&&flags[eventType])||(!flags&&getClosestElementWithVirtualBinding(event.target,eventType))){ve=createVirtualEvent(event,eventType);$(event.target).trigger(ve);}
return ve;}
function mouseEventCallback(event){var touchID=$.data(event.target,touchTargetPropertyName);if(!blockMouseTriggers&&(!lastTouchID||lastTouchID!==touchID)){var ve=triggerVirtualEvent("v"+event.type,event);if(ve){if(ve.isDefaultPrevented()){event.preventDefault();}
if(ve.isPropagationStopped()){event.stopPropagation();}
if(ve.isImmediatePropagationStopped()){event.stopImmediatePropagation();}}}}
function handleTouchStart(event){var touches=getNativeEvent(event).touches,target,flags;if(touches&&touches.length===1){target=event.target;flags=getVirtualBindingFlags(target);if(flags.hasVirtualBinding){lastTouchID=nextTouchID++;$.data(target,touchTargetPropertyName,lastTouchID);clearResetTimer();disableMouseBindings();didScroll=false;var t=getNativeEvent(event).touches[0];startX=t.pageX;startY=t.pageY;triggerVirtualEvent("vmouseover",event,flags);triggerVirtualEvent("vmousedown",event,flags);}}}
function handleScroll(event){if(blockTouchTriggers){return;}
if(!didScroll){triggerVirtualEvent("vmousecancel",event,getVirtualBindingFlags(event.target));}
didScroll=true;startResetTimer();}
function handleTouchMove(event){if(blockTouchTriggers){return;}
var t=getNativeEvent(event).touches[0],didCancel=didScroll,moveThreshold=$.vmouse.moveDistanceThreshold,flags=getVirtualBindingFlags(event.target);didScroll=didScroll||(Math.abs(t.pageX-startX)>moveThreshold||Math.abs(t.pageY-startY)>moveThreshold);if(didScroll&&!didCancel){triggerVirtualEvent("vmousecancel",event,flags);}
triggerVirtualEvent("vmousemove",event,flags);startResetTimer();}
function handleTouchEnd(event){if(blockTouchTriggers){return;}
disableTouchBindings();var flags=getVirtualBindingFlags(event.target),t;triggerVirtualEvent("vmouseup",event,flags);if(!didScroll){var ve=triggerVirtualEvent("vclick",event,flags);if(ve&&ve.isDefaultPrevented()){t=getNativeEvent(event).changedTouches[0];clickBlockList.push({touchID:lastTouchID,x:t.clientX,y:t.clientY});blockMouseTriggers=true;}}
triggerVirtualEvent("vmouseout",event,flags);didScroll=false;startResetTimer();}
function hasVirtualBindings(ele){var bindings=$.data(ele,dataPropertyName),k;if(bindings){for(k in bindings){if(bindings[k]){return true;}}}
return false;}
function dummyMouseHandler(){}
function getSpecialEventObject(eventType){var realType=eventType.substr(1);return{setup:function(data,namespace){if(!hasVirtualBindings(this)){$.data(this,dataPropertyName,{});}
var bindings=$.data(this,dataPropertyName);bindings[eventType]=true;activeDocHandlers[eventType]=(activeDocHandlers[eventType]||0)+1;if(activeDocHandlers[eventType]===1){$document.bind(realType,mouseEventCallback);}
$(this).bind(realType,dummyMouseHandler);if(eventCaptureSupported){activeDocHandlers["touchstart"]=(activeDocHandlers["touchstart"]||0)+1;if(activeDocHandlers["touchstart"]===1){$document.bind("touchstart",handleTouchStart).bind("touchend",handleTouchEnd).bind("touchmove",handleTouchMove).bind("scroll",handleScroll);}}},teardown:function(data,namespace){--activeDocHandlers[eventType];if(!activeDocHandlers[eventType]){$document.unbind(realType,mouseEventCallback);}
if(eventCaptureSupported){--activeDocHandlers["touchstart"];if(!activeDocHandlers["touchstart"]){$document.unbind("touchstart",handleTouchStart).unbind("touchmove",handleTouchMove).unbind("touchend",handleTouchEnd).unbind("scroll",handleScroll);}}
var $this=$(this),bindings=$.data(this,dataPropertyName);if(bindings){bindings[eventType]=false;}
$this.unbind(realType,dummyMouseHandler);if(!hasVirtualBindings(this)){$this.removeData(dataPropertyName);}}};}
for(var i=0;i<virtualEventNames.length;i++){$.event.special[virtualEventNames[i]]=getSpecialEventObject(virtualEventNames[i]);}
if(eventCaptureSupported){document.addEventListener("click",function(e){var cnt=clickBlockList.length,target=e.target,x,y,ele,i,o,touchID;if(cnt){x=e.clientX;y=e.clientY;threshold=$.vmouse.clickDistanceThreshold;ele=target;while(ele){for(i=0;i<cnt;i++){o=clickBlockList[i];touchID=0;if((ele===target&&Math.abs(o.x-x)<threshold&&Math.abs(o.y-y)<threshold)||$.data(ele,touchTargetPropertyName)===o.touchID){e.preventDefault();e.stopPropagation();return;}}
ele=ele.parentNode;}}},true);}})(jQuery,window,document);(function($,window,undefined){$.each(("touchstart touchmove touchend "+"tap taphold "+"swipe swipeleft swiperight "+"scrollstart scrollstop").split(" "),function(i,name){$.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name);};if($.attrFn){$.attrFn[name]=true;}});var supportTouch=$.mobile.support.touch,scrollEvent="touchmove scroll",touchStartEvent=supportTouch?"touchstart":"mousedown",touchStopEvent=supportTouch?"touchend":"mouseup",touchMoveEvent=supportTouch?"touchmove":"mousemove";function triggerCustomEvent(obj,eventType,event){var originalType=event.type;event.type=eventType;$.event.handle.call(obj,event);event.type=originalType;}
$.event.special.scrollstart={enabled:true,setup:function(){var thisObject=this,$this=$(thisObject),scrolling,timer;function trigger(event,state){scrolling=state;triggerCustomEvent(thisObject,scrolling?"scrollstart":"scrollstop",event);}
$this.bind(scrollEvent,function(event){if(!$.event.special.scrollstart.enabled){return;}
if(!scrolling){trigger(event,true);}
clearTimeout(timer);timer=setTimeout(function(){trigger(event,false);},50);});}};$.event.special.tap={tapholdThreshold:750,setup:function(){var thisObject=this,$this=$(thisObject);$this.bind("vmousedown",function(event){if(event.which&&event.which!==1){return false;}
var origTarget=event.target,origEvent=event.originalEvent,timer;function clearTapTimer(){clearTimeout(timer);}
function clearTapHandlers(){clearTapTimer();$this.unbind("vclick",clickHandler).unbind("vmouseup",clearTapTimer);$(document).unbind("vmousecancel",clearTapHandlers);}
function clickHandler(event){clearTapHandlers();if(origTarget===event.target){triggerCustomEvent(thisObject,"tap",event);}}
$this.bind("vmouseup",clearTapTimer).bind("vclick",clickHandler);$(document).bind("vmousecancel",clearTapHandlers);timer=setTimeout(function(){triggerCustomEvent(thisObject,"taphold",$.Event("taphold",{target:origTarget}));},$.event.special.tap.tapholdThreshold);});}};$.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1000,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var thisObject=this,$this=$(thisObject);$this.bind(touchStartEvent,function(event){var data=event.originalEvent.touches?event.originalEvent.touches[0]:event,start={time:(new Date()).getTime(),coords:[data.pageX,data.pageY],origin:$(event.target)},stop;function moveHandler(event){if(!start){return;}
var data=event.originalEvent.touches?event.originalEvent.touches[0]:event;stop={time:(new Date()).getTime(),coords:[data.pageX,data.pageY]};if(Math.abs(start.coords[0]-stop.coords[0])>$.event.special.swipe.scrollSupressionThreshold){event.preventDefault();}}
$this.bind(touchMoveEvent,moveHandler).one(touchStopEvent,function(event){$this.unbind(touchMoveEvent,moveHandler);if(start&&stop){if(stop.time-start.time<$.event.special.swipe.durationThreshold&&Math.abs(start.coords[0]-stop.coords[0])>$.event.special.swipe.horizontalDistanceThreshold&&Math.abs(start.coords[1]-stop.coords[1])<$.event.special.swipe.verticalDistanceThreshold){start.origin.trigger("swipe").trigger(start.coords[0]>stop.coords[0]?"swipeleft":"swiperight");}}
start=stop=undefined;});});}};$.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe",swiperight:"swipe"},function(event,sourceEvent){$.event.special[event]={setup:function(){$(this).bind(sourceEvent,$.noop);}};});})(jQuery,this);}));