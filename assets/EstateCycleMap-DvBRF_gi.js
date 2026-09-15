import{c as r}from"./common-D47hmsVg.js";import{j as s,c as n,b as l}from"./theme-BDXPxamA.js";import{L as c}from"./leaflet-src-yqmlQvx8.js";import{M as h,T as m,f as p,a as y,u as f}from"./machineSites-C2Agmq4N.js";/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=r("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=r("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=r("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.427.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=r("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);function x(){const e=f();return l.useEffect(()=>{e.fitBounds(c.latLngBounds([[49.9,-8.4],[59.2,1.9]]),{paddingTopLeft:[820,70],paddingBottomRight:[80,90],animate:!1})},[e]),null}function u(e){return e>=30?22:e>=10?18:e>=3?14:11}function k(e,a,o=1){const i=Math.min(e*6*o,1400*o),t=u(a),d=a>=8;return c.divIcon({className:"",html:`<div class="bb-dot">${d?`<span class="bb-dot-ring" style="width:${t*2}px;height:${t*2}px;margin:${-t}px 0 0 ${-t}px;animation-delay:${i}ms"></span>`:""}<span class="bb-dot-core" style="width:${t}px;height:${t}px;margin:${-t/2}px 0 0 ${-t/2}px;animation-delay:${i}ms"></span></div>`,iconSize:[0,0]})}function j({pace:e=1}){return s.jsx("div",{style:{position:"absolute",inset:0,background:n.bg},children:s.jsxs(h,{style:{width:"100%",height:"100%",background:n.bg},center:[54.2,-3],zoom:5.4,minZoom:4,maxZoom:10,zoomSnap:.1,zoomControl:!1,dragging:!1,doubleClickZoom:!1,scrollWheelZoom:!1,boxZoom:!1,keyboard:!1,touchZoom:!1,zoomAnimation:!1,markerZoomAnimation:!1,attributionControl:!1,children:[s.jsx(x,{}),s.jsx(m,{url:"https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",detectRetina:!0}),p.map((a,o)=>s.jsx(y,{position:[a.lat,a.lng],icon:k(o,a.count,e),interactive:!1},`${a.postcode}-${o}`))]})})}export{$ as E,z as L,L as R,j as U,w as a};
