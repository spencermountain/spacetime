let e=(()=>{if("undefined"==typeof Intl||void 0===Intl.DateTimeFormat)return null;let e=Intl.DateTimeFormat();if(void 0===e||void 0===e.resolvedOptions)return null;let t=e.resolvedOptions().timeZone;return t||null})();var t=function(t,r){return t=t||"",r.zones.hasOwnProperty(t)?t:(t=t.toLowerCase().trim(),e||r.config.fallbackTz)};const r=e=>"number"==typeof e;let n={sept:9};var o=function(e){return r(e)?e:(e=e.toLowerCase().trim(),n[e])};const a=/^([+-])?([0-9]{1,2}):?([0-9]{2})?$/;var l=e=>{if(!e)return null;if("Z"===e||"z"===e)return 0;let t=e.match(a);if(null!==t){let[,e,r,n]=t;r=parseInt(r||"",10)||0,n=parseInt(n||"",10)||0,n/=60;let o=r+n;return"-"===e&&(o*=-1),o}return null};var s=function(e){if(r(e))return e;e=(e=(e=e.trim().toLowerCase()).replace(/^[0:]+/,"")).replace(/([0-9])h$/,"$1");let t=parseInt(e,10);if(t)return t;let n=e.match(/([0-9]+) ?(am|pm)$/);if(null!==n&&n[1]){let e=Number(n[1]);return"pm"===n[2]&&(e+=12),e}return 0};const i={hour:0,minute:0,second:0,millisecond:0};var u=(e="",t)=>{t=Object.assign({},i,t);let r=(e=e.replace(/^\s+/,"").toLowerCase()).match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:.]?([0-9]{1,4})?/);if(null!==r){let n=Number(r[1]);if(n<0||n>24)return t;let o=Number(r[2]);if(r[2].length<2||o<0||o>59)return t;t.hour=n,t.minute=o,t.second=Number(r[3])||0,t.millisecond=function(e=""){return(e=String(e)).length>3?e=e.substring(0,3):1===e.length?e+="00":2===e.length&&(e+="0"),Number(e)||0}(r[4]);let a=e.match(/[\\b0-9] ?(am|pm)\b/);return null!==a&&"pm"===a[1]&&(t.hour+=12),t}let n=s(e);return null!==n&&(t.hour=n),t};var m=(e="")=>{if(r(e))return e;if(e=e.trim(),!0===/^'[0-9][0-9]$/.test(e)){let t=Number(e.replace(/'/,""));return t>50?1900+t:2e3+t}let t=parseInt(e,10);return t=t||(new Date).getFullYear(),t};var c=(e="")=>{if(r(e))return e;return e=(e=(e=e.trim()).replace(/^0+/,"")).replace(/([0-9])(st|nd|rd|th)$/i,"$1"),parseInt(e,10)||1},p=[].concat([{reg:/^(-?0{0,2}[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-+:]+)?$/i,parse:e=>{let t={year:m(e[1]),month:parseInt(e[2],10),date:c(e[3])};return t.offset=l(e[5]),t=u(e[4],t),t}},{reg:/^([0-9]{4})[-/. ]([0-9]{1,2})[-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:e=>{let t={year:m(e[1]),month:parseInt(e[2],10),date:c(e[3])};return t.month>12&&(t.date=c(e[2]),t.month=parseInt(e[3],10)),t=u(e[4],t),t}},{reg:/^([0-9]{4})[-/. ]([a-z]+)[-/. ]([0-9]{1,2})( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:e=>{let t={year:m(e[1]),month:o(e[2]),date:c(e[3]||"")};return t=u(e[4],t),t}}],[{reg:/^([0-9]{1,2})[-/.]([0-9]{1,2})[-/.]?([0-9]{4})?( [0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,parse:e=>{let t=parseInt(e[1],10);return{date:c(e[2]),month:t,year:m(e[3])}}},{reg:/^([a-z]+)[-/. ]([0-9]{1,2})[-/. ]?([0-9]{4}|'[0-9]{2})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:e=>{let t={year:m(e[3]),month:o(e[1]),date:c(e[2]||"")};return t=u(e[4],t),t}},{reg:/^([a-z]+) ([0-9]{1,2})( [0-9]{4})?( ([0-9:]+( ?am| ?pm| ?gmt)?))?$/i,parse:e=>{let t={year:m(e[3]),month:o(e[1]),date:c(e[2]||"")};return t=u(e[4],t),t}},{reg:/^([a-z]+) ([0-9]{1,2})( [0-9:]+)?( \+[0-9]{4})?( [0-9]{4})?$/i,parse:e=>{let t={year:m(e[5]),month:o(e[1]),date:c(e[2]||"")};return t=u(e[4],t),t}}],[{reg:/^([0-9]{1,2})[-/]([a-z]+)[-/]?([0-9]{4})?$/i,parse:e=>{let t={year:m(e[3]),month:o(e[2]),date:c(e[1]||"")};return t=u(e[4],t),t}},{reg:/^([0-9]{1,2})( [a-z]+)( [0-9]{4}| '[0-9]{2})? ?([0-9]{1,2}:[0-9]{2}:?[0-9]{0,2} ?(am|pm|gmt))?$/i,parse:e=>{let t={year:m(e[3]),month:o(e[2]),date:c(e[1])};return t.month?(t=u(e[4],t),t):null}},{reg:/^([0-9]{1,2})[ /]([a-z]+)[ /]([0-9]{4})?( [0-9]{1,2}(:[0-9]{0,2})?(:[0-9]{0,3})? ?(am|pm)?)?$/i,parse:e=>{let t={date:c(e[1]),month:o(e[2]),year:m(e[3])};return t=u(e[4],t),t}}],[{reg:/^([0-9]{4})[-/]([0-9]{2})$/,parse:e=>({year:m(e[1]),month:parseInt(e[2],10)})},{reg:/^([a-z]+) ([0-9]{4})$/i,parse:e=>({year:m(e[2]),month:o(e[1])})},{reg:/^(q[0-9])( of)?( [0-9]{4})?/i,parse:e=>{if(e[1],e[3]){return{year:m(e[3])}}return{}}},{reg:/^(spring|summer|winter|fall|autumn)( of)?( [0-9]{4})?/i,parse:e=>{if(e[1],e[3]){return{year:m(e[3])}}return{}}},{reg:/^[0-9,]+ ?b\.?c\.?$/i,parse:e=>{let t=e[0]||"";return t=t.replace(/^([0-9,]+) ?b\.?c\.?$/i,"-$1").trim(),{year:parseInt(t.trim(),10)}}},{reg:/^[0-9,]+ ?(a\.?d\.?|c\.?e\.?)$/i,parse:e=>{let t=e[0]||"";return t=t.replace(/,/g,""),{year:parseInt(t.trim(),10)}}},{reg:/^[0-9]{4}( ?a\.?d\.?)?$/i,parse:e=>({year:m(e[0])})}]);const h=["year","month","date","hour","minute","second","millisecond"];var d=function(e,t,r){if(n=e,"[object Array]"===Object.prototype.toString.call(n)){let t=h.reduce(((t,r,n)=>(t[r]=e[n],t)),{});return t.month&&(t.month=o(t.month)),t}var n,a;if(e&&(a=e,"[object Object]"===Object.prototype.toString.call(a))){if(!0===e.isSpacetime)return e.clone();return Object.assign({},e)}if((e=>"string"==typeof e)(e)){let t=function(e,t){e=(e=(e=(e=(e=(e=e.toLowerCase()).replace(/([0-9])(th|rd|st|nd)\b/,"$1")).replace(/\b(mon|tues?|wed|wednes|thur?s?|fri|sat|satur|sun)(day)?\b/i,"")).replace(/,/g,"")).replace(/ +/g," ").trim()).trim();for(let t=0;t<p.length;t+=1){let r=e.match(p[t].reg);if(null!==r){let e=p[t].parse(r);if(e)return e}}return{}}(e);return null!==t.offset&&void 0!==t.offset&&(t.offset<0?Math.abs(t.offset):t.offset),t}return{}};var f=function(e,t,r){return!(!e.year&&0===!e.year)&&(!(!e.month||e.month<1||e.month>12)&&(!(!e.date||e.date<1||e.date>31)&&(!(e.hour&&e.hour<0&&e.hour>24)&&(!(e.minute&&e.minute<0&&e.minute>60)&&(!(e.second&&e.second<0&&e.second>60)&&!(e.millisecond&&e.millisecond<0&&e.millisecond>1e3))))))};var g=function(e,r,n){if(r=t(r,n),null==e)return{epoch:n.now.epoch(),tz:r};if("number"==typeof(o=e)&&isFinite(o))return n.config.minimumEpoch&&e<n.config.minimumEpoch&&e>0&&(e*=1e3),{epoch:e,tz:r};var o;let a=d(e);if(!1===f(a))throw new Error(`Error: invalid spacetime input: '${e}'`);console.log(a)};var y=function(e,t,r){let n=function(e){let t=e%100;return(t+parseInt(t/4,10))%7}(e),o=[null,0,3,3,6,1,4,6,2,5,0,3,5][t];let a=function(e){if(e<1752)return(18-parseInt(e/100,10))%7;let t=parseInt(e/100,10);return{17:4,18:2,19:0,20:6,21:4,22:2,23:0}[String(t)]||0}(e),l=r,s=function(e){return!0==(e%4==0&&e%100!=0||e%400==0)?-1:0}(e);return(n+o+a+l+s)%7};var b={methods:{isLeap:e=>e%4==0&&(e%100!=0||e%400==0),getDay:e=>y(e.year,e.month,e.date),now:()=>(new Date).getTime()},model:{months:[{long:"January",short:"Jan",len:31},{long:"February",short:"Feb",len:28},{long:"March",short:"Mar",len:31},{long:"April",short:"Apr",len:30},{long:"May",short:"May",len:31},{long:"June",short:"Jun",len:30},{long:"July",short:"Jul",len:31},{long:"August",short:"Aug",len:31},{long:"September",short:"Sep",len:30},{long:"October",short:"Oct",len:31},{long:"November",short:"Nov",len:30},{long:"December",short:"Dec",len:31}],days:[{long:"sunday",short:"sun"},{long:"monday",short:"mon"},{long:"tuesday",short:"tue"},{long:"wednesday",short:"wed"},{long:"thursday",short:"thu"},{long:"friday",short:"fri"},{long:"saturday",short:"sat"}],time:{am:"am",pm:"pm"},ms:{SECOND:1e3,MINUTE:6e4,HOUR:36e5,DAY:864e5,YEAR:31536e6},units:{second:[1,"second"],decade:[10,"year"]}},config:{useTitleCase:!0,weekStart:1,fallbackTz:"Etc/Utc",fallbackHemisphere:"n",preferDMY:!1},parsers:{},zones:{}};class w{constructor(e,t){let r=g(e,t,b);this._epoch=r.epoch,this.tz=r.tz,Object.defineProperty(this,"world",{value:b}),Object.defineProperty(this,"isSpacetime",{value:!0})}get epoch(){if(this.isRunning&&null!==this.startEpoch){let e=this.world.now.epoch()-this.startEpoch;return this._epoch+e}return this._epoch}}w.prototype._from=function(e,t){let r=new w(e,t||this.tz);return r.started=this.started,r.world=this.world,r};var v=w;const $=(e,t)=>new v(e,t);$.world={},$.now=e=>new v(null,e),$.today=e=>$.now(e).startOf("day"),$.tomorrow=e=>$.today(e).add(1,"day"),$.yesterday=e=>$.today(e).minus(1,"day"),$.version="7.4.0",$.plugin=function(e){e.api&&Object.assign(v.prototype,e.api),Object.assign($.world.methods,e.methods||{}),Object.assign($.world.zones,e.zones||{}),Object.assign($.world.config,e.config||{})};var z=$;z.plugin({});export{z as default};