(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7651e874"],{1276:function(t,e,a){"use strict";var i=a("d784"),n=a("44e7"),s=a("825a"),r=a("1d80"),l=a("4840"),c=a("8aa5"),d=a("50c4"),o=a("14c3"),u=a("9263"),h=a("d039"),g=[].push,p=Math.min,f=4294967295,v=!h((function(){return!RegExp(f,"y")}));i("split",2,(function(t,e,a){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,a){var i=String(r(this)),s=void 0===a?f:a>>>0;if(0===s)return[];if(void 0===t)return[i];if(!n(t))return e.call(i,t,s);var l,c,d,o=[],h=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,v=new RegExp(t.source,h+"g");while(l=u.call(v,i)){if(c=v.lastIndex,c>p&&(o.push(i.slice(p,l.index)),l.length>1&&l.index<i.length&&g.apply(o,l.slice(1)),d=l[0].length,p=c,o.length>=s))break;v.lastIndex===l.index&&v.lastIndex++}return p===i.length?!d&&v.test("")||o.push(""):o.push(i.slice(p)),o.length>s?o.slice(0,s):o}:"0".split(void 0,0).length?function(t,a){return void 0===t&&0===a?[]:e.call(this,t,a)}:e,[function(e,a){var n=r(this),s=void 0==e?void 0:e[t];return void 0!==s?s.call(e,n,a):i.call(String(n),e,a)},function(t,n){var r=a(i,t,this,n,i!==e);if(r.done)return r.value;var u=s(t),h=String(this),g=l(u,RegExp),m=u.unicode,b=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(v?"y":"g"),x=new g(v?u:"^(?:"+u.source+")",b),w=void 0===n?f:n>>>0;if(0===w)return[];if(0===h.length)return null===o(x,h)?[h]:[];var C=0,_=0,k=[];while(_<h.length){x.lastIndex=v?_:0;var y,A=o(x,v?h:h.slice(_));if(null===A||(y=p(d(x.lastIndex+(v?0:_)),h.length))===C)_=c(h,_,m);else{if(k.push(h.slice(C,_)),k.length===w)return k;for(var I=1;I<=A.length-1;I++)if(k.push(A[I]),k.length===w)return k;_=C=y}}return k.push(h.slice(C)),k}]}),!v)},"44e7":function(t,e,a){var i=a("861d"),n=a("c6b6"),s=a("b622"),r=s("match");t.exports=function(t){var e;return i(t)&&(void 0!==(e=t[r])?!!e:"RegExp"==n(t))}},"4f6a":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._m(0),a("div",{staticClass:"row"},[a("div",{staticClass:"col-xl-12"},[a("div",{staticClass:"widget-chart with-sidebar"},[a("div",{staticClass:"widget-chart-content bg-white",attrs:{id:"chart"}},[a("line-chart",{staticClass:"height-sm"})],1)])])]),a("div",{staticClass:"row"},t._l(t.data,(function(e){return a("div",{key:e.id,staticClass:"col-md-3"},[a("a",{staticClass:"widget-card widget-card-rounded m-b-20",attrs:{href:"#","data-id":"widget"}},[a("div",{staticClass:"widget-card-cover"}),a("div",{staticClass:"widget-card-content"},[a("h5",{staticClass:"f-s-12 text-black-transparent-7",attrs:{"data-id":"widget-elm","data-light-class":"f-s-12 text-black-transparent-7","data-dark-class":"f-s-12 text-white-transparent-7"}},[a("b",[t._v(t._s(e.parameter_name))])]),t._m(1,!0),t._m(2,!0),a("h4",{staticClass:"f-lg-11 text-black-transparent-7",attrs:{"data-id":"widget-elm"}},[a("b",[t._v(t._s(e.value))])])])])])})),0)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h1",{staticClass:"page-header"},[t._v(" PT Kalbe Morinaga Indonesia || "),a("small",[t._v("Digital Quality Management System")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"widget-icon widget-icon-lg rounded bg-primary pull-left m-r-10 m-b-5 text-white"},[a("i",{staticClass:"fab fa-twitter"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h3",{staticClass:"f-lg-12 text-black-transparent-7 pl-10",attrs:{"data-id":"widget-elm","data-light-class":"f-s-12 text-black-transparent-7","data-dark-class":"f-s-12 text-white-transparent-7"}},[a("b",[t._v("Value")])])}],s=(a("ac1f"),a("1276"),a("3b78")),r={components:{LineChart:s["a"]},name:"dashboard-graph",data:function(){return{series:[{name:"STOCK ABC",data:[30,20,10,50,230,42,34,61]}],chartOptions:{chart:{type:"area",height:350,zoom:{enabled:!0,type:"x",zoomedArea:{fill:{color:"#90CAF9",opacity:.4},stroke:{color:"#0D47A1",opacity:.4,width:1}}}},dataLabels:{enabled:!1},stroke:{curve:"straight"},title:{text:"parameter_update Parameter Graphic",align:"left"},subtitle:{text:"fluid 100/mg movement",align:"left"},labels:["2021-03-10","2021-03-11","2021-03-12","2021-03-13","2021-03-14","2021-03-15","2021-03-16","2021-03-17"],xaxis:{type:"datetime"},yaxis:{opposite:!0},legend:{horizontalAlign:"left"}},cpID:"",data:[]}},created:function(){var t=this.$route.path.split("/");this.cpID=t[3]},methods:{getData:function(){var t=this,e="/setting/parameter/"+this.cpID+"/control-point";this.$axios.get(e).then((function(e){t.data=e.data.data.data,console.log(t.data)})).catch((function(t){console.log(t)}))}},mounted:function(){this.getData()}},l=r,c=a("2877"),d=Object(c["a"])(l,i,n,!1,null,null,null);e["default"]=d.exports},6547:function(t,e,a){var i=a("a691"),n=a("1d80"),s=function(t){return function(e,a){var s,r,l=String(n(e)),c=i(a),d=l.length;return c<0||c>=d?t?"":void 0:(s=l.charCodeAt(c),s<55296||s>56319||c+1===d||(r=l.charCodeAt(c+1))<56320||r>57343?t?l.charAt(c):s:t?l.slice(c,c+2):r-56320+(s-55296<<10)+65536)}};t.exports={codeAt:s(!1),charAt:s(!0)}},"8aa5":function(t,e,a){"use strict";var i=a("6547").charAt;t.exports=function(t,e,a){return e+(a?i(t,e).length:1)}}}]);
//# sourceMappingURL=chunk-7651e874.e525c995.js.map