import{f as z,g as I,r as R,m as l,n as C,d as D,h as L,B as N,a as o,I as p,p as q,i as w}from"./index-30482789.js";import{L as O}from"./index-fea92e77.js";const[U,a]=z("button"),_=I({},R,{tag:l("button"),text:String,icon:String,type:l("default"),size:l("normal"),color:String,block:Boolean,plain:Boolean,round:Boolean,square:Boolean,loading:Boolean,hairline:Boolean,disabled:Boolean,iconPrefix:String,nativeType:l("button"),loadingSize:C,loadingText:String,loadingType:String,iconPosition:l("left")});var E=D({name:U,props:_,emits:["click"],setup(e,{emit:g,slots:i}){const f=L(),b=()=>i.loading?i.loading():o(O,{size:e.loadingSize,type:e.loadingType,class:a("loading")},null),c=()=>{if(e.loading)return b();if(i.icon)return o("div",{class:a("icon")},[i.icon()]);if(e.icon)return o(p,{name:e.icon,class:a("icon"),classPrefix:e.iconPrefix},null)},m=()=>{let n;if(e.loading?n=e.loadingText:n=i.default?i.default():e.text,n)return o("span",{class:a("text")},[n])},x=()=>{const{color:n,plain:r}=e;if(n){const t={color:r?n:"white"};return r||(t.background=n),n.includes("gradient")?t.border=0:t.borderColor=n,t}},y=n=>{e.loading?q(n):e.disabled||(g("click",n),f())};return()=>{const{tag:n,type:r,size:t,block:B,round:S,plain:P,square:k,loading:T,disabled:s,hairline:d,nativeType:h,iconPosition:u}=e,v=[a([r,t,{plain:P,block:B,round:S,square:k,loading:T,disabled:s,hairline:d}]),{[N]:d}];return o(n,{type:h,class:v,style:x(),disabled:s,onClick:y},{default:()=>[o("div",{class:a("content")},[u==="left"&&c(),m(),u==="right"&&c()])]})}}});const A=w(E);export{A as B};
