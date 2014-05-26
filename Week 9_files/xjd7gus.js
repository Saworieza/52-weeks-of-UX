var Typekit=(function(h){var A={ua:function(H){if(H){for(var I=0;I<this.enabledMatchers.length;I++){var K=this.enabledMatchers[I][1];if(K.call(null,H)){var J=this.enabledMatchers[I][0];return{fonts:(!!J),format:J}}}return{fonts:false}}},enabledMatchers:[],enable:function(J){this.enabledMatchers=[];for(var H=0;H<this.matchers.length;H++){var K=this.matchers[H];for(var I=0;I<J.length;I++){if(K[0]==J[I]){this.enabledMatchers.push([K[1],K[2]]);break}}}},matchers:[],add:function(I,J,H){this.matchers.push([J,I,H])}};var m={};A.add("d","ff36",function(J){var I=J.match(/rv:(\d+\.\d+)\.(\d+).*Gecko\//);if(I){var H=parseFloat(I[1]);var K=parseInt(I[2]);if(H>=1.9&&K>1){return true}else{return false}}});A.add("a","ff35",function(I){var H=I.match(/rv:1\.9\.1.*Gecko\//);if(I.match(/rv:1.9.1b[123]{1}/)){return false}if(H){return true}else{return false}});m.isMobileOSX=function(I){var H=I.match(/OS.(\d)_(\d)/);if(H){if(H[1]=="3"){return parseInt(H[2])>0}else{if(parseInt(H[1])>3){return true}}}return false};A.add("f","iphone",function(H){if(!H.match(/(iPhone|iPod)/)){return false}return m.isMobileOSX(H)});A.add("f","ipad",function(H){if(!H.match(/iPad/)){return false}return m.isMobileOSX(H)});m.isSafari=function(J){if(J.match(/Chrome/)){return false}if(J.match(/(iPhone|iPad|iPod)/)){return false}if(J.match(/webOS/)){return false}if(J.match(/Android/)){return false}var I=J.match(/AppleWebKit\/(\d+\.\d+)/);if(I){var H=I[1];return parseFloat(H)>=525.13}};m.isChrome=function(J){var I;if(J.match(/Chrome/)){I=J.match(/Chrome\/(\d+\.\d+)\.(\d+)\.(\d+)/);if(I){var H=parseFloat(I[1]);var K=parseInt(I[2]);var L=parseInt(I[3]);if(H>4){return true}else{if(H==4&&K>249){return true}else{if(H==4&&K==249&&L>=4){return true}else{return false}}}}}};A.add("b","chromewin",function(H){if(!H.match(/Windows/)){return false}return m.isChrome(H)});A.add("a","safari",m.isSafari);A.add("a","chrome",m.isChrome);A.add("c","ie",function(J){var I=J.match(/MSIE\s(\d+\.\d+)/);if(I){var H=I[1];return parseFloat(H)>=6}});var c=(function(){var I=document.defaultView||{};var K=false;var M=false;var L=[];function H(){if(!K){K=true;for(var N=0;N<L.length;N++){L[N].call(null)}}}function J(){if(M){return}M=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);H()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);H()}});if(document.documentElement.doScroll&&window==window.top){(function(){if(K){return}try{document.documentElement.doScroll("left")}catch(O){setTimeout(arguments.callee,0);return}H()})()}}}if(window.onload){var N=window.onload;window.onload=function(){N();H()}}else{window.onload=H}}return{ready:function(N){J();if(K){N()}else{L.push(N)}},insertInto:function(O,P){var N=document.getElementsByTagName(O)[0];if(N&&N.lastChild){N.insertBefore(P,N.lastChild);return true}else{return false}},createStyleElement:function(N){var O=document.createElement("style");O.setAttribute("type","text/css");if(O.styleSheet){O.styleSheet.cssText=N}else{O.appendChild(document.createTextNode(N))}return O},createCssLink:function(O){var N=document.createElement("link");N.setAttribute("rel","stylesheet");N.setAttribute("type","text/css");N.setAttribute("href",O);return N},css:function(O,P){if(I.getComputedStyle){var N=I.getComputedStyle(O,null);return N?N.getPropertyValue(P):null}else{if(O.currentStyle){return O.currentStyle[P]}}},loadScript:function(R,Q){var P=document.getElementsByTagName("head")[0];if(P){var O=document.createElement("script");O.src=R;var N=false;O.onload=O.onreadystatechange=function(){if(!N&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){N=true;if(Q){Q()}O.onload=O.onreadystatechange=null;if(O.parentNode.tagName=="HEAD"){P.removeChild(O)}}};P.appendChild(O)}},appendClassName:function(O,N){if(!O.className.match("/w*"+N+"w*/")){O.className=O.className+" "+N}}}})();function e(){return"/k"}function o(){return document.location.protocol=="https:"?"https://":"http://"}var f={};var d={};var t={};var G={};var B={};var k=[];if(window.tkKitsTracked==undefined){window.tkKitsTracked=0}function z(I){for(var H in I){d[H]=I[H]}i("setOptions",d)}function E(J){if(J.enabledBrowsers){A.enable(J.enabledBrowsers)}var I=d.ua;if(I){var H=A.ua(I);d.fonts=H.fonts;d.compatibility=H.format;i("detectUA",d.fonts,d.compatibility)}}function i(H){if(d.debug&&window.console&&window.console.log){window.console.log(arguments)}}function n(H,I){if(!G[H]){G[H]=[]}if(I){G[H].push(I);i("addCallback",H,G[H].length,I)}}function y(H){var I=document.getElementsByTagName("body")[0];if(I){c.appendClassName(I,H)}}function p(I){var H=new Date().getTime();n(I,function(J){r(I).time=(new Date().getTime())-H})}function x(K,J){i("executeCallbacks",K);var I=G[K];if(I){for(var H=0;H<I.length;H++){I[H](J)}}}function a(K,H,L,I,J){i("addDataSet",K,H,L,I,J);t[K]={kitId:K,securityToken:H,badgeOptions:L,kitOptions:I,callbackData:J};t[K].callbackData.kitId=K}function w(I,H){if(I){i("loading kit",I);u(t[I],H)}else{for(var J in t){i("loading kit",J);u(t[J],H)}}}function u(H,I){E(H.kitOptions);if(H&&H.kitId){i("loadKit",H);k.push(H);j(H.callbackData);if(I.init){I.init(H.callbackData)}if(d.fonts){p(H.kitId);n(H.kitId,function(){v(function(){y("tk-active");if(I.active){I.active(H.callbackData)}})});s(H.kitId,H.securityToken,d.compatibility)}else{v(function(){y("tk-inactive");if(I.inactive){I.inactive(H.callbackData)}})}}else{i("loadKit","data is invalid",H)}}function j(N){if(N&&N.fonts){var O=N.fonts;var L=[];for(var K=0;K<O.length;K++){var H=O[K];if(H){var M=O[K].css_stack;var J=O[K].css_selectors;if(M&&J){for(var I=0;I<J.length;I++){L.push(J[I]+"{font-family:"+M+";}")}}}}c.insertInto("head",c.createStyleElement(L.join("")))}}function s(K,H,I){var J=o()+d.host+d.root+e()+"/"+K+"-"+I+".css?"+H;i("loadKitStyle",J);if(c.insertInto("head",c.createCssLink(J))){C(K)}}function v(I){function H(){var J=document.getElementsByTagName("body")[0];if(J){I()}else{setTimeout(H,d.bodyWaitIntervalTime)}}H()}function C(K){i("waitForStyleLoaded",K);var H=document.createElement("div");H.setAttribute("id","tkload"+K);H.setAttribute("style","display:none");var I=false;function J(){if(I){var L=c.css(H,"color");if(L=="rgb(255, 0, 0)"||L=="red"){if(t[K]){x(K,t[K].callbackData);return}}}else{I=c.insertInto("body",H)}setTimeout(J,d.styleLoadIntervalTime)}J()}function r(I){var H=B[I];if(!H){H=B[I]={time:0}}return H}function g(I,H){f[I]=H}function F(){if(!d.fonts){return}for(var J=0;J<k.length;J++){var I=k[J];var L=I.badgeOptions;if(L&&L.enabled){var K=f["default"];if(K){var H=K(I.kitId,L,d);if(H){H.setAttribute("id","typekit-badge-"+I.kitId);c.insertInto("body",H)}}}}}function b(){if(window.tkKitsTracked>0){return}for(var I=0;I<k.length;I++){var H=k[I];var J=H.kitOptions;if(J&&J.ga){if(window._gat){l()}else{var L=o();var K=L.match(/https/)?"ssl":"www";c.loadScript(L+K+".google-analytics.com/ga.js",l)}break}}}function l(){try{window._gat._getTracker("UA-8850781-3")._trackPageview()}catch(H){}window.tkKitsTracked++}c.ready(F);c.ready(b);z({host:"use.typekit.com",root:"",assetHost:"use.typekit.com",assetRoot:"",colophonHost:"typekit.com",ua:navigator.userAgent,styleLoadIntervalTime:50,bodyWaitIntervalTime:50,debug:false});function D(){return{addDataSet:a,clearDataSets:function(){t={}},insertBadges:F,optionallyCallGoogleAnalytics:b}}function q(){return{configure:z,load:function(H){var J,I;if(typeof arguments[0]=="string"){J=arguments[0];I=arguments[1]}else{J=null;I=arguments[0]}w(J,I||{})},stats:r}}g("default",function(O,M,R){function Q(U,T){var S=0,V=0;if(document.documentElement&&(document.documentElement[U]||document.documentElement[T])){S=document.documentElement[U];V=document.documentElement[T]}else{if(document.body&&(document.body[U]||document.body[T])){S=document.body[U];V=document.body[T]}}return[S,V]}function L(){return Q("clientWidth","clientHeight")}function J(){return Q("scrollLeft","scrollTop")}function K(U,T,S){if(U.attachEvent){U["e"+T+S]=S;U[T+S]=function(){U["e"+T+S](window.event)};U.attachEvent("on"+T,U[T+S])}else{U.addEventListener(T,S,false)}}var N=document.createElement("img");var I=62;var P=25;N.setAttribute("width",I);N.setAttribute("height",P);N.setAttribute("src",o()+R.assetHost+R.assetRoot+"/badges/default.gif");N.setAttribute("class","typekit-badge");N.setAttribute("alt","Fonts by Typekit");N.setAttribute("title","Information about the fonts used on this site");N.style.position="fixed";N.style.zIndex=2000000000;N.style.right=0;N.style.bottom=0;N.style.cursor="pointer";N.style.border=0;N.style.content="normal";N.style.display="inline";N.style["float"]="none";N.style.height=P+"px";N.style.left="auto";N.style.margin=0;N.style.maxHeight=P+"px";N.style.maxWidth=I+"px";N.style.minHeight=P+"px";N.style.minWidth=I+"px";N.style.orphans=2;N.style.outline="none";N.style.overflow="visible";N.style.padding=0;N.style.pageBreakAfter="auto";N.style.pageBreakBefore="auto";N.style.pageBreakInside="auto";N.style.tableLayout="auto";N.style.textIndent=0;N.style.top="auto";N.style.unicodeBidi="normal";N.style.verticalAlign="baseline";N.style.visibility="visible";N.style.widows=2;N.style.width="65px";K(N,"click",function(){document.location.href="http://"+R.colophonHost+"/colophons/"+O});if(R.ua.match(/MSIE\s(\d+\.\d+)/)){N.style.position="absolute";function H(){N.style.bottom="auto";N.style.right="auto";N.style.top=(J()[1]+L()[1]-P)+"px";N.style.left=(J()[0]+L()[0]-3-I)+"px"}c.ready(H);K(window,"scroll",H);K(window,"resize",H)}return N});a("xjd7gus","3bb2a6e53c9684ffdc9a9bf41d5b2a62183a574751fd848f787439b66bb94621c9be06d5ff510e48e4261a39220e65f31eddd2fa9e6488f77d552390b1a083ab2c45d4e7566aa824f7dd8dcdd485f65d241d3290342006d0a07d6c57f6e5b4397a77da275be77567d2f29ec3ba99a4e04fd2ba78a0a174812c6269f5bd04c9",{enabled:true},{ga:true,enabledBrowsers:["ff36","ff35","safari","chrome","chromewin","ie"]},{fonts:[{css_stack:'"proxima-nova-1","proxima-nova-2",sans-serif',css_selectors:["#article_nav","#nav",".entry-title",".heading_container",".tk-proxima-nova"]}]});return q()})();
window.Typekit.config={"p":"//p.typekit.net/p.gif?s=1&k=xjd7gus&ht=tk&h={host}&f=139.171&a=80&_={_}"};
/*{"k":"1.8.3","created":"2014-05-07 13:43:21 UTC"}*/
;(function(window,document,undefined){
function e(a){return function(){return this[a]}}var f=this;function h(a,b){var d=a.split("."),c=f;!(d[0]in c)&&c.execScript&&c.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)!d.length&&void 0!==b?c[g]=b:c=c[g]?c[g]:c[g]={}}function k(a,b,d){this.M=a;this.K=b;this.L=d}h("webfont.BrowserInfo",k);k.prototype.A=e("M");k.prototype.hasWebFontSupport=k.prototype.A;k.prototype.B=e("K");k.prototype.hasWebKitFallbackBug=k.prototype.B;k.prototype.C=e("L");k.prototype.hasWebKitMetricsBug=k.prototype.C;
function l(a,b,d,c,g,j,u,v,w,x,y){this.D=a;this.R=b;this.J=d;this.o=c;this.P=g;this.n=j;this.G=u;this.Q=v;this.F=w;this.m=x;this.k=y}h("webfont.UserAgent",l);l.prototype.getName=e("D");l.prototype.getName=l.prototype.getName;l.prototype.z=e("J");l.prototype.getVersion=l.prototype.z;l.prototype.s=e("o");l.prototype.getEngine=l.prototype.s;l.prototype.t=e("n");l.prototype.getEngineVersion=l.prototype.t;l.prototype.v=e("G");l.prototype.getPlatform=l.prototype.v;l.prototype.w=e("F");
l.prototype.getPlatformVersion=l.prototype.w;l.prototype.r=e("m");l.prototype.getDocumentMode=l.prototype.r;l.prototype.q=e("k");l.prototype.getBrowserInfo=l.prototype.q;function m(a){this.f=a}m.prototype.toString=function(){return encodeURIComponent(this.f.c.location.hostname||this.f.e.location.hostname)};function n(a,b){this.H=a;this.g=b}
n.prototype.toString=function(){for(var a=[],b=0;b<this.g.length;b++)for(var d=this.g[b],c=d.u(),d=d.u(this.H),g=0;g<c.length;g++){var j;a:{for(j=0;j<d.length;j++)if(c[g]===d[j]){j=!0;break a}j=!1}a.push(j?1:0)}a=a.join("");a=a.replace(/^0+/,"");b=[];for(c=a.length;0<c;c-=4)d=a.slice(0>c-4?0:c-4,c),b.unshift(parseInt(d,2).toString(16));return b.join("")};function p(a){this.I=a}
p.prototype.l=function(a,b){var d=b||{},c=this.I.replace(/\{\/?([^*}]*)(\*?)\}/g,function(a,b,c){return c&&d[b]?"/"+d[b].join("/"):d[b]||""});c.match(/^\/\//)&&(c=(a?"https:":"http:")+c);return c.replace(/\/*\?*($|\?)/,"$1")};function q(a){var b=new Image(1,1);b.src=a;b.onload=function(){b.onload=null}}var r={};r.a=r.j=r.b=r.d=function(){return[]};r.i=function(a,b,d){return[new m(a),new n(b,d)]};window.Typekit||(window.Typekit={});
var s=new function(a,b){this.e=a;this.c=b||a;this.O=this.c.document}(window),t=new function(){var a=new p(window.Typekit.config.p);this.N=null;this.h=a},z=!1;
function A(){if(!z)for(var a=document.getElementsByTagName("link"),b=0;b<a.length;b++){var d=a[b].getAttribute("href");if(d&&0<=d.indexOf("use.typekit")){a=t;b=s;if(a.h){var d=(d=window.__adobewebfontsappname__)?d.toString().substr(0,20):"",c=b.c.location.protocol;"about:"==c&&(c=b.e.location.protocol);q(a.h.l("https:"===("https:"==c?"https:":"http:"),{host:encodeURIComponent(b.c.location.hostname||b.e.location.hostname),app:encodeURIComponent(d),_:(+new Date).toString()}))}z=!0;break}}}var B=window.Typekit.load;
window.Typekit.load=function(){B&&B.apply(window.Typekit,arguments);A()};window.__webfonttypekitmodule__&&A();
})(this,document);