(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,14595,(e,t,r)=>{"use strict";var a=e.r(71645),s="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=a.useSyncExternalStore,i=a.useRef,n=a.useEffect,l=a.useMemo,c=a.useDebugValue;r.useSyncExternalStoreWithSelector=function(e,t,r,a,d){var u=i(null);if(null===u.current){var p={hasValue:!1,value:null};u.current=p}else p=u.current;var f=o(e,(u=l(function(){function e(e){if(!n){if(n=!0,o=e,e=a(e),void 0!==d&&p.hasValue){var t=p.value;if(d(t,e))return i=t}return i=e}if(t=i,s(o,e))return t;var r=a(e);return void 0!==d&&d(t,r)?(o=e,t):(o=e,i=r)}var o,i,n=!1,l=void 0===r?null:r;return[function(){return e(t())},null===l?void 0:function(){return e(l())}]},[t,r,a,d]))[0],u[1]);return n(function(){p.hasValue=!0,p.value=f},[f]),c(f),f}},13027,(e,t,r)=>{"use strict";t.exports=e.r(14595)},55487,e=>{"use strict";var t=e.i(71645),r=e.i(13027),a={notify(){},get:()=>[]},s="u">typeof window&&void 0!==window.document&&void 0!==window.document.createElement,o="u">typeof navigator&&"ReactNative"===navigator.product,i=s||o?t.useLayoutEffect:t.useEffect,n=Symbol.for("react-redux-context"),l="u">typeof globalThis?globalThis:{},c=function(){if(!t.createContext)return{};let e=l[n]??=new Map,r=e.get(t.createContext);return r||(r=t.createContext(null),e.set(t.createContext,r)),r}(),d=function(e){let{children:r,context:s,serverState:o,store:n}=e,l=t.useMemo(()=>{let e=function(e,t){let r,s=a,o=0,i=!1;function n(){d.onStateChange&&d.onStateChange()}function l(){if(o++,!r){let t,a;r=e.subscribe(n),t=null,a=null,s={clear(){t=null,a=null},notify(){let e=t;for(;e;)e.callback(),e=e.next},get(){let e=[],r=t;for(;r;)e.push(r),r=r.next;return e},subscribe(e){let r=!0,s=a={callback:e,next:null,prev:a};return s.prev?s.prev.next=s:t=s,function(){r&&null!==t&&(r=!1,s.next?s.next.prev=s.prev:a=s.prev,s.prev?s.prev.next=s.next:t=s.next)}}}}}function c(){o--,r&&0===o&&(r(),r=void 0,s.clear(),s=a)}let d={addNestedSub:function(e){l();let t=s.subscribe(e),r=!1;return()=>{r||(r=!0,t(),c())}},notifyNestedSubs:function(){s.notify()},handleChangeWrapper:n,isSubscribed:function(){return i},trySubscribe:function(){i||(i=!0,l())},tryUnsubscribe:function(){i&&(i=!1,c())},getListeners:()=>s};return d}(n);return{store:n,subscription:e,getServerState:o?()=>o:void 0}},[n,o]),d=t.useMemo(()=>n.getState(),[n]);return i(()=>{let{subscription:e}=l;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),d!==n.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[l,d]),t.createElement((s||c).Provider,{value:l},r)};function u(e=c){return function(){return t.useContext(e)}}var p=u();function f(e=c){let t=e===c?p:u(e),r=()=>{let{store:e}=t();return e};return Object.assign(r,{withTypes:()=>r}),r}var m=f(),g=function(e=c){let t=e===c?m:f(e),r=()=>t().dispatch;return Object.assign(r,{withTypes:()=>r}),r}(),y=(e,t)=>e===t,v=function(e=c){let a=e===c?p:u(e),s=(e,s={})=>{let{equalityFn:o=y}="function"==typeof s?{equalityFn:s}:s,{store:i,subscription:n,getServerState:l}=a();t.useRef(!0);let c=t.useCallback({[e.name]:t=>e(t)}[e.name],[e]),d=(0,r.useSyncExternalStoreWithSelector)(n.addNestedSub,i.getState,l||i.getState,c,o);return t.useDebugValue(d),d};return Object.assign(s,{withTypes:()=>s}),s}();e.s(["Provider",()=>d,"useDispatch",()=>g,"useSelector",()=>v])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let o={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+i+";":a+="f"==o[1]?c(i,o):o+"{"+c(i,"k"==o[1]?"":t)+"}":"object"==typeof i?a+=c(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(o,i):o+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,a,s=this||{},p=e.call?e(s.p):e;return((e,t,r,a,s)=>{var o;let p=u(e),f=d[p]||(d[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!d[f]){let t=p!==e?e:(e=>{let t,r,a=[{}];for(;t=i.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[f]=c(s?{["@keyframes "+f]:t}:t,r?"":"."+f)}let m=r&&d.g?d.g:null;return r&&(d.g=d[f]),o=d[f],m?t.data=t.data.replace(m,o):-1===t.data.indexOf(o)&&(t.data=a?o+t.data:t.data+o),f})(p.unshift?p.raw?(t=[].slice.call(arguments,1),r=s.p,p.reduce((e,a,s)=>{let o=t[s];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==o?"":o)},"")):p.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):p,(a=s.target,"object"==typeof window?((a?a.querySelector("#_goober"):window._goober)||Object.assign((a||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:a||o),s.g,s.o,s.k)}p.bind({g:1});let f,m,g,y=p.bind({k:1});function v(e,t){let r=this||{};return function(){let a=arguments;function s(o,i){let n=Object.assign({},o),l=n.className||s.className;r.p=Object.assign({theme:m&&m()},n),r.o=/ *go\d+/.test(l),n.className=p.apply(r,a)+(l?" "+l:""),t&&(n.ref=i);let c=e;return e[0]&&(c=n.as||e,delete n.as),g&&c[0]&&g(n),f(c,n)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,h=(t=0,()=>(++t).toString()),x=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},S="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},C=[],I={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},O={},E=(e,t=S)=>{O[t]=w(O[t]||I,e),C.forEach(([e,r])=>{e===t&&r(O[t])})},k=e=>Object.keys(O).forEach(t=>E(e,t)),T=(e=S)=>t=>{E(t,e)},j={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},N=(e={},t=S)=>{let[r,a]=(0,s.useState)(O[t]||I),o=(0,s.useRef)(O[t]);(0,s.useEffect)(()=>(o.current!==O[t]&&a(O[t]),C.push([t,a]),()=>{let e=C.findIndex(([e])=>e===t);e>-1&&C.splice(e,1)}),[t]);let i=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||j[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:i}},P=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||h()}))(t,e,r);return T(s.toasterId||(a=s.id,Object.keys(O).find(e=>O[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},A=(e,t)=>P("blank")(e,t);A.error=P("error"),A.success=P("success"),A.loading=P("loading"),A.custom=P("custom"),A.dismiss=(e,t)=>{let r={type:3,toastId:e};t?T(t)(r):k(r)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let r={type:4,toastId:e};t?T(t)(r):k(r)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,r)=>{let a=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?A.success(s,{id:a,...r,...null==r?void 0:r.success}):A.dismiss(a),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?A.error(s,{id:a,...r,...null==r?void 0:r.error}):A.dismiss(a)}),e};var D=1e3,$=(e,t="default")=>{let{toasts:r,pausedAt:a}=N(e,t),o=(0,s.useRef)(new Map).current,i=(0,s.useCallback)((e,t=D)=>{if(o.has(e))return;let r=setTimeout(()=>{o.delete(e),n({type:4,toastId:e})},t);o.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&A.dismiss(r.id);return}return setTimeout(()=>A.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(T(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:o}=t||{},i=r.filter(t=>(t.position||o)===(e.position||o)&&t.height),n=i.findIndex(t=>t.id===e.id),l=i.filter((e,t)=>t<n&&e.visible).length;return i.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[r,i]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},_=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,z=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${_} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${R} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,L=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,J=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,V=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,H=v("div")`
  position: absolute;
`,B=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===r?null:s.createElement(B,null,s.createElement(L,{...a}),"loading"!==r&&s.createElement(H,null,"error"===r?s.createElement(z,{...a}):s.createElement(V,{...a})))},Y=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Z=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=s.memo(({toast:e,position:t,style:r,children:a})=>{let o=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=x()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${y(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=s.createElement(W,{toast:e}),n=s.createElement(Z,{...e.ariaProps},b(e.message,e));return s.createElement(Y,{className:e.className,style:{...o,...r,...e.style}},"function"==typeof a?a({icon:i,message:n}):s.createElement(s.Fragment,null,i,n))});a=s.createElement,c.p=void 0,f=a,m=void 0,g=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:a,children:o})=>{let i=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:i,className:t,style:r},o)},X=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:o,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=$(r,i);return s.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let i,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(i=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:x()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(i?1:-1)}px)`,...i?{top:0}:{bottom:0},...n});return s.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?X:"",style:u},"custom"===r.type?b(r.message,r):o?o(r):s.createElement(G,{toast:r,position:l}))}))};e.s(["CheckmarkIcon",()=>V,"ErrorIcon",()=>z,"LoaderIcon",()=>L,"ToastBar",()=>G,"ToastIcon",()=>W,"Toaster",()=>ee,"default",()=>A,"resolveValue",()=>b,"toast",()=>A,"useToaster",()=>$,"useToasterStore",()=>N],5766)},84780,e=>{"use strict";var t=e.i(64645);let r=e=>{try{localStorage.setItem("iclone_cart",JSON.stringify(e))}catch(e){}},a=(0,t.createSlice)({name:"cart",initialState:(()=>{{let e=localStorage.getItem("iclone_cart");if(e)try{return JSON.parse(e)}catch(e){}}return{total:0,cartItems:{}}})(),reducers:{addToCart:(e,t)=>{let{productId:a}=t.payload;e.cartItems[a]?e.cartItems[a]++:e.cartItems[a]=1,e.total+=1,r(e)},removeFromCart:(e,t)=>{let{productId:a}=t.payload;e.cartItems[a]&&(e.cartItems[a]--,0===e.cartItems[a]&&delete e.cartItems[a]),e.total-=1,r(e)},deleteItemFromCart:(e,t)=>{let{productId:a}=t.payload;e.total-=e.cartItems[a]?e.cartItems[a]:0,delete e.cartItems[a],r(e)},clearCart:e=>{e.cartItems={},e.total=0,r(e)}}}),{addToCart:s,removeFromCart:o,clearCart:i,deleteItemFromCart:n}=a.actions,l=a.reducer;e.s(["addToCart",0,s,"clearCart",0,i,"default",0,l,"deleteItemFromCart",0,n,"removeFromCart",0,o])},57437,e=>{"use strict";let t=(e,t=null)=>{try{let r=localStorage.getItem(e);return r?JSON.parse(r):t}catch(e){return t}},r=(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch(e){}},a=()=>t("iclone_orders",[]),s=()=>t("iclone_addresses",[]);e.s(["getAddresses",0,s,"getMessages",0,()=>t("iclone_messages",[]),"getOrders",0,a,"saveAddress",0,e=>{let t=s();return t.push({...e,id:Date.now().toString()}),r("iclone_addresses",t),t},"saveOrder",0,e=>{let t=a();return t.push({...e,id:Date.now().toString(),createdAt:new Date().toISOString()}),r("iclone_orders",t),t},"saveToStorage",0,r])},43941,e=>{"use strict";var t=e.i(64645);let r=e=>{try{localStorage.setItem("iclone_products",JSON.stringify(e))}catch(e){}},a=(0,t.createAsyncThunk)("product/fetchProducts",async()=>{let e=await fetch("/api/products");return await e.json()}),s=(0,t.createSlice)({name:"product",initialState:{list:(()=>{{let e=localStorage.getItem("iclone_products");if(e)try{return JSON.parse(e)}catch(e){}}return[]})(),loading:!1,error:null},reducers:{setProduct:(e,t)=>{e.list=t.payload,r(e.list)},clearProduct:e=>{e.list=[],r(e.list)},addProduct:(e,t)=>{e.list.push(t.payload),r(e.list)},updateProduct:(e,t)=>{let a=e.list.findIndex(e=>e.id===t.payload.id);-1!==a&&(e.list[a]=t.payload,r(e.list))},deleteProduct:(e,t)=>{e.list=e.list.filter(e=>e.id!==t.payload),r(e.list)}},extraReducers:e=>{e.addCase(a.pending,e=>{e.loading=!0,e.error=null}).addCase(a.fulfilled,(e,t)=>{e.loading=!1,e.list=t.payload,r(e.list)}).addCase(a.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message})}}),{setProduct:o,clearProduct:i,addProduct:n,updateProduct:l,deleteProduct:c}=s.actions,d=s.reducer;e.s(["addProduct",0,n,"default",0,d,"fetchProducts",0,a])},51134,e=>{"use strict";var t=e.i(64645),r=e.i(57437);let a=(0,t.createSlice)({name:"orders",initialState:{list:(0,r.getOrders)(),loading:!1,error:null},reducers:{addOrder:(e,t)=>{e.list=(0,r.saveOrder)(t.payload)},clearOrders:e=>{e.list=[],localStorage.removeItem("iclone_orders")},setOrders:(e,t)=>{e.list=t.payload}}}),{addOrder:s,clearOrders:o,setOrders:i}=a.actions,n=a.reducer;e.s(["addOrder",0,s,"default",0,n])},46450,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(55487),s=e.i(64645),o=e.i(84780),i=e.i(43941),n=e.i(57437);let l=(0,s.createSlice)({name:"address",initialState:{list:(0,n.getAddresses)()},reducers:{addAddress:(e,t)=>{e.list=(0,n.saveAddress)(t.payload)}}}),{addAddress:c}=l.actions,d=l.reducer,u=(0,s.createSlice)({name:"rating",initialState:{ratings:[]},reducers:{addRating:(e,t)=>{e.ratings.push(t.payload)}}}),{addRating:p}=u.actions,f=u.reducer;var m=e.i(51134);function g({children:e}){let n=(0,r.useRef)(void 0);return n.current||(n.current=(0,s.configureStore)({reducer:{cart:o.default,product:i.default,address:d,rating:f,orders:m.default}})),(0,t.jsx)(a.Provider,{store:n.current,children:e})}e.s(["default",()=>g],46450)}]);