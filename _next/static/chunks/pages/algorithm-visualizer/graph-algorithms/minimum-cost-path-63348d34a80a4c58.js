(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[747],{8155:(e,t,l)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/algorithm-visualizer/graph-algorithms/minimum-cost-path",function(){return l(5554)}])},9925:e=>{"use strict";let t=()=>{t.queue=[],t.offset=0,t.getLength=function(){return queue.length-offset},t.isEmpty=()=>0==(void 0).queue.length,t.enqueue=e=>{(void 0).queue.push(e)},t.dequeue=()=>{if(0==(void 0).queue.length)return;let e=(void 0).queue[(void 0).offset];return 2*++(void 0).offset>=(void 0).queue.length&&((void 0).queue=(void 0).queue.slice(offset),(void 0).offset=0),e},t.peek=()=>(void 0).queue.length>0?(void 0).queue[offset]:void 0};e.exports=t},5554:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>o});var n=l(4848),r=l(6540),u=l(7805),i=l.n(u);let s=l(9925),a=(e,t)=>{let l=e.length,n=e[0].length,r=[],u=[],i=[],a=[];for(let t=0;t<e.length;t++){let l=[],n=[],s=[],d=[];e[t];for(let r=0;r<e[t].length;r++){let u=parseFloat(e[t][r],10);l.push(u),n.push(1e8),s.push([]),d.push(0)}r.push(l),u.push(n),i.push(s),a.push(d)}let d=new s;d.enqueue([0,0]),u[0][0]=r[0][0],i[0][0]=[0,0];let o=[0,0,1,-1],h=[1,-1,0,0];for(;!d.isEmpty();){let e=d.peek();d.dequeue();for(let t=0;t<4;t++){let s=e[0]+o[t],a=e[1]+h[t];if(s>=0&&s<l&&a>=0&&a<n){let t=u[e[0]][e[1]]+r[s][a];t<u[s][a]&&(u[s][a]=t,i[s][a]=[e[0],e[1]],d.enqueue([s,a]))}}}let c=[l-1,n-1];for(;0!=c[0]||0!=c[1];)a[c[0]][c[1]]=1,t(c[0],c[1],!0),c=i[c[0]][c[1]];a[0][0]=1,t(0,0,!0)};function d(e){console.log("Rendered Table");let t=e.grid.length,l=e.grid[0].length,r=[],u=e.grid;for(let s=0;s<t;s++){let t=[];for(let r=0;r<l;r++){let l=e.selectedCells[s][r]?i().animated_cell:"";t.push((0,n.jsx)("td",{className:"cell".concat(l),id:"".concat(s,"-").concat(r),children:(0,n.jsx)("input",{type:"number",className:l,value:u[s][r],onChange:t=>e.handleGrid(s,r,t)})},"".concat(s).concat(r)))}r.push((0,n.jsx)("tr",{id:"".concat(s),children:t},"".concat(s)))}let s=(0,n.jsx)("div",{id:"grid",className:"no-margin",children:(0,n.jsx)("table",{cellSpacing:"0",children:(0,n.jsx)("tbody",{children:r})})});return(0,n.jsxs)("div",{children:[s,(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)("button",{onClick:t=>a(e.grid,e.handleUpdatingSelectedCell),children:" Solve "})]})}let o=()=>{let[e,t]=(0,r.useState)(!1),[l,u]=(0,r.useState)(3),[i,s]=(0,r.useState)(3),[a,o]=(0,r.useState)(Array.from({length:l},e=>Array.from({length:i},e=>0))),[h,c]=(0,r.useState)(Array.from({length:l},e=>Array.from({length:i},e=>!1))),g=(0,r.useId)(),p=(0,r.useId)(),f=(e,t)=>{u(e),s(t),o(Array.from({length:e},e=>Array.from({length:t},e=>0))),c(Array.from({length:e},e=>Array.from({length:t},e=>!1)))};return(0,n.jsx)("div",{children:(0,n.jsxs)("center",{children:[(0,n.jsxs)("div",{id:"input_rc",children:[(0,n.jsx)("label",{htmlFor:g,children:"Rows"}),(0,n.jsx)("input",{type:"number",id:g,max:"50",value:l,style:{width:"50px"},onInput:e=>f(e.target.value,i)}),(0,n.jsx)("label",{htmlFor:p,children:"Cols"}),(0,n.jsx)("input",{type:"number",id:p,max:"50",value:i,style:{width:"50px"},onInput:e=>f(l,e.target.value)}),(0,n.jsx)("button",{onClick:()=>{t(!0),f(l,i)},children:"Generate"})]}),(0,n.jsx)("div",{id:"matrix",children:e?(0,n.jsx)(d,{handleUpdatingSelectedCell:(e,t,l)=>{let n=[...h];n[e][t]=l,c(n)},selectedCells:h,grid:a,handleGrid:(e,t,l)=>{let n=[...a];n[e][t]=l.target.value,o(n)}}):null})]})})}},7805:e=>{e.exports={animated_cell:"page_animated_cell____QV3","wall-animate":"page_wall-animate__Lmoec"}}},e=>{var t=t=>e(e.s=t);e.O(0,[636,593,792],()=>t(8155)),_N_E=e.O()}]);