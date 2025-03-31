"use strict";(self.webpackChunk_articulate_mondrian_bundles=self.webpackChunk_articulate_mondrian_bundles||[]).push([[708],{4247:(t,e,n)=>{n.d(e,{A:()=>a});var o=n(1182),i=n.n(o),s=n(2806),r=n.n(s)()(i());r.push([t.id,".hXRin0tc .tiptap {\n  font-family: var(--mon-theme-font-body);\n  height: 100%;\n  width: 100%;\n}\n\n.hXRin0tc .tiptap :is(h1, h2) {\n  line-height: inherit;\n  font-family: var(--mon-theme-font-heading);\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n.hXRin0tc .tiptap :is(p, h1, h2) {\n  margin: 0;\n}\n\n.hXRin0tc .tiptap strong {\n  font-weight: bold;\n}\n\n.hXRin0tc .tiptap em {\n  font-style: italic;\n}\n\n.hXRin0tc .tiptap s {\n  text-decoration: line-through;\n}\n\n.hXRin0tc .tiptap u {\n  text-decoration: underline;\n}\n","",{version:3,sources:["webpack://./../../packages/core/src/styles/tiptap.module.css"],names:[],mappings:"AAAA;EACE,uCAAuC;EACvC,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,oBAAoB;EACpB,0CAA0C;EAC1C,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,0BAA0B;AAC5B",sourcesContent:[".textItem :global(.tiptap) {\n  font-family: var(--mon-theme-font-body);\n  height: 100%;\n  width: 100%;\n}\n\n.textItem :global(.tiptap :is(h1, h2)) {\n  line-height: inherit;\n  font-family: var(--mon-theme-font-heading);\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n.textItem :global(.tiptap :is(p, h1, h2)) {\n  margin: 0;\n}\n\n.textItem :global(.tiptap strong) {\n  font-weight: bold;\n}\n\n.textItem :global(.tiptap em) {\n  font-style: italic;\n}\n\n.textItem :global(.tiptap s) {\n  text-decoration: line-through;\n}\n\n.textItem :global(.tiptap u) {\n  text-decoration: underline;\n}\n"],sourceRoot:""}]),r.locals={textItem:"hXRin0tc"};const a=r},708:(t,e,n)=>{n.r(e),n.d(e,{default:()=>hn});var o=n(6218);function i(t){(0,o.append_styles)(t,"svelte-su3qhz",".mondrian__img-1XHDzr{height:100%;width:100%}")}function s(t){let e,n;return{c(){e=(0,o.element)("div"),(0,o.attr)(e,"aria-label",n=t[0].alt),(0,o.attr)(e,"class","mondrian__img-1XHDzr"),(0,o.attr)(e,"role","img")},m(t,n){(0,o.insert)(t,e,n)},p(t,[i]){1&i&&n!==(n=t[0].alt)&&(0,o.attr)(e,"aria-label",n)},i:o.noop,o:o.noop,d(t){t&&(0,o.detach)(e)}}}function r(t,e,n){let{item:o}=e;return t.$$set=t=>{"item"in t&&n(0,o=t.item)},[o]}n(9763);class a extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,r,s,o.safe_not_equal,{item:0},i)}}const l=a;var d=n(7268),c=n(6195);class u{constructor(t){this.parse=t=>this.zod.parse(t),this.is=t=>this.zod.safeParse(t).success,this.assert=t=>{this.parse(t)},this.zod=t}}const m=new u(c.Ay.object({name:c.Ay.enum(["fadeInUp"]),delay:c.Ay.number().min(0),duration:c.Ay.number().positive(),easing:c.Ay.enum(["ease","ease-in","ease-out","ease-in-out","linear","step-start","step-end"])})),p=new u(c.Ay.object({id:c.Ay.string(),path:c.Ay.string(),width:c.Ay.number().optional(),height:c.Ay.number().optional()})),h=new u(c.Ay.object({unit:c.Ay.enum(["px","%","auto","fr"]),value:c.Ay.number()})),g=new u(c.Ay.object({applied:c.Ay.boolean().default(!1),type:c.Ay.enum(["none","fill"]).default("none"),color:c.Ay.string().default("#000000"),opacity:c.Ay.number().default(1),style:c.Ay.enum(["solid","dashed","dotted"]).default("solid"),width:h.zod.default({value:1,unit:"px"})})),f=new u(c.Ay.object({assetId:c.Ay.string().optional(),color:c.Ay.string().optional(),opacity:c.Ay.number().min(0).max(1).default(1)})),y=new u(f.zod.extend({type:c.Ay.literal("color"),color:f.zod.shape.color.unwrap().default("#e4e4e4")})),_=new u(f.zod.extend({type:c.Ay.literal("image"),assetId:f.zod.shape.assetId.unwrap()})),b=new u(f.zod.extend({type:c.Ay.literal("none")})),v=new u(c.Ay.discriminatedUnion("type",[y.zod,_.zod,b.zod])),$=new u(c.Ay.discriminatedUnion("type",[y.zod,b.zod])),w=new u(c.Ay.object({id:c.Ay.string(),clonedFromId:c.Ay.string().optional(),state:c.Ay.string(),visible:c.Ay.boolean()})),A=new u(c.Ay.object({top:h.zod.default({value:0,unit:"px"}),left:h.zod.default({value:0,unit:"px"}),bottom:h.zod.default({value:0,unit:"px"}),right:h.zod.default({value:0,unit:"px"})})),x=new u(c.Ay.object({id:c.Ay.string(),type:c.Ay.literal("tiptap")})),k="default",C=c.Ay.object({id:c.Ay.string().default(k),name:c.Ay.string().max(128),children:c.Ay.array(w.zod).optional(),text:x.zod.optional(),textVerticalAlign:c.Ay.enum(["top","middle","bottom"]).default("top"),x:h.zod.default({value:0,unit:"px"}),y:h.zod.default({value:0,unit:"px"}),position:c.Ay.enum(["absolute"]).default("absolute"),width:h.zod.default({value:100,unit:"%"}),height:h.zod.default({value:100,unit:"%"}),padding:A.zod,fill:v.zod,overlay:$.zod,aspectRatioLocked:c.Ay.boolean().default(!1),clipPath:c.Ay.literal("ellipse").optional(),border:g.zod,borderRadius:c.Ay.object({applied:c.Ay.boolean().default(!1),topLeft:h.zod.default({value:0,unit:"px"}),topRight:h.zod.default({value:0,unit:"px"}),bottomRight:h.zod.default({value:0,unit:"px"}),bottomLeft:h.zod.default({value:0,unit:"px"})}),entranceAnimation:m.zod.nullable().optional()}),S=new u(C),z=(new u(C.required({children:!0})),C.partial().required({id:!0,name:!0})),E=new u(z),L=new u(z.required({children:!0})),I="changeState",M="changeVisibility",R=new u(c.Ay.object({id:c.Ay.string(),event:c.Ay.enum(["click","hover"])}).and(c.Ay.discriminatedUnion("action",[c.Ay.object({action:c.Ay.literal(I),targetId:c.Ay.string(),targetState:c.Ay.string().default(k)}),c.Ay.object({action:c.Ay.literal(M),targetId:c.Ay.string(),targetVisibility:c.Ay.boolean()})]))),B=new u(c.Ay.object({id:c.Ay.string(),blockumentId:c.Ay.string(),clonedFromId:c.Ay.string().optional(),parentId:c.Ay.string(),type:c.Ay.string(),name:c.Ay.string().max(128),tagName:c.Ay.enum(["div","figure","figcaption","blockquote"]).default("div"),locked:c.Ay.boolean().default(!1),authoringVisible:c.Ay.boolean().default(!0),initialVisible:c.Ay.boolean().default(!0),initialState:c.Ay.string().default(k),states:c.Ay.intersection(c.Ay.object({default:S.zod}),c.Ay.record(E.zod)),triggers:c.Ay.array(R.zod),assets:c.Ay.record(p.zod).default({}).optional(),removed:c.Ay.boolean().default(!1)})),q=(new u(c.Ay.object({id:c.Ay.string(),title:c.Ay.string().max(255),children:c.Ay.array(w.zod).max(1)})),new u(B.zod.extend({type:c.Ay.literal("group"),states:c.Ay.intersection(c.Ay.object({default:S.zod.required({children:!0})}),c.Ay.record(L.zod.required({children:!0})))}))),F=new u(B.zod.extend({type:c.Ay.literal("image"),alt:c.Ay.string()})),N=new u(B.zod.extend({type:c.Ay.literal("shape")})),j=new u(B.zod.extend({type:c.Ay.literal("text")}));new u(c.Ay.discriminatedUnion("type",[q.zod,F.zod,N.zod,j.zod]));var H,U;!function(t){t.Blockuments="blockuments",t.Items="items"}(H||(H={})),H.Blockuments,H.Items,function(t){t.APP="app",t.BLOCKUMENT="blockument",t.COURSE="course"}(U||(U={})),n(9840);var T=n(4198),Z=n(4717),D=n(2359),K=n(31),P=n(2740),O=n(1430);const X=/([a-z%]+)\s*$/i,G=T.YY.create({name:"textSize",addGlobalAttributes:()=>[{types:["textStyle"],attributes:{textSize:{default:14,parseHTML(t){const e=t.style.fontSize,n=parseFloat(e);if(isNaN(n))return null;const o=X.exec(e);if(null==o)return null;switch(o[1]){case"rem":return Math.round(10*n);case"px":return Math.round(n);default:return null}},renderHTML:t=>({style:`font-size: ${t.textSize/10}rem`})}}}],addCommands:()=>({setTextSize:t=>({chain:e})=>e().setMark("textStyle",{textSize:t}).run()})}),W=T.YY.create({name:"lineHeight",addGlobalAttributes:()=>[{types:["paragraph"],attributes:{lineHeight:{default:1.2,parseHTML(t){const e=t.style.lineHeight,n=parseFloat(e);return isNaN(n)?null:n},renderHTML:t=>({style:`line-height: ${t.lineHeight};`})}}}],addCommands:()=>({setLineHeight:t=>({commands:e})=>e.updateAttributes("paragraph",{lineHeight:t})})}),Y=T.YY.create({name:"paragraphStyle",addCommands:()=>({setParagraphStyle:(t,e)=>({dispatch:n,state:o,tr:i})=>{const s=i.selection.$from.blockRange(i.selection.$from);return null!=s&&(null!=n&&(i.doc.nodesBetween(s.start,s.end,((n,s)=>{if(n.type===o.schema.nodes.heading||n.type===o.schema.nodes.paragraph){const r="heading"===t?o.schema.nodes.heading:o.schema.nodes.paragraph,a={...n.attrs};"heading"===t&&"number"==typeof e.level&&(a.level=e.level),i.setNodeMarkup(s,r,a,n.marks)}if(n.type===o.schema.nodes.text){const t=o.schema.marks.textStyle.isInSet(n.marks);i.addMark(s,s+n.nodeSize,o.schema.marks.textStyle.create({...t?.attrs,textSize:e.textSize}))}})),e.bold?i.addMark(s.start,s.end,o.schema.marks.bold.create()):i.removeMark(s.start,s.end,o.schema.marks.bold)),!0)}})});Z.A.configure({types:["textStyle"]});const V=[O.A.configure({history:!1,heading:{levels:[1,2]}}),D.A.configure({types:["heading","paragraph"]}),K.A,Z.A,Y,G,W,P.A];(0,T._w)(V);var Q=n(1120);const J=new Map,tt={...(0,Q.writable)(J),add:(t,e)=>(J.has(t)||J.set(t,function(t){let e,n,o;t.subscribe((t=>{e=t}));const i=(0,Q.writable)(e);i.subscribe((t=>{n=o??e,o=t}));const s={...i,revert(){s.set(n)},reset(){s.set(e)}};return s}(e)),J.get(t)),get(t){if(!J.has(t))throw new Error(`No state found for item ${t}`);return J.get(t)},resetAll(){[...J.values()].forEach((t=>{t.reset()}))}},et=new Map,nt={...(0,Q.writable)(et),add:(t,e)=>(et.set(t,function(t){let e;t.subscribe((t=>{e=t}));const n={...(0,Q.writable)(e),show(){n.set(!0)},hide(){n.set(!1)},reset(){n.set(e)}};return n}(e)),et.get(t)),get(t){if(!et.has(t))throw new Error(`No visibility found for item ${t}`);return et.get(t)},resetAll(){[...et.values()].forEach((t=>{t.reset()}))}};function ot(t,e,n){return e.addEventListener(t,n),()=>{e.removeEventListener(t,n)}}matchMedia("(prefers-reduced-motion)");const it=new WeakMap;function st(t,e,n=Object.keys(t.states.default)){const o=t.states.default,i=structuredClone(t.states[e]);return n.reduce(((t,e)=>(t[e]||(t[e]=structuredClone(o[e])),t)),i)}new IntersectionObserver((t=>{for(const e of t){if(!e.isIntersecting)continue;const t=it.get(e.target);null!=t&&"paused"===t.playState&&t.play()}}),{threshold:.3});const rt=({value:t,unit:e})=>{switch(e){case"auto":return"auto";case"px":return t/10+"rem";default:return(({value:t,unit:e})=>`${t}${e}`)({value:t,unit:e})}};function at(t){(0,o.append_styles)(t,"svelte-bbp0xy",".mondrian__clipped-KfJDq2{border-radius:inherit;display:flex;height:100%;inset:0;position:absolute;width:100%;z-index:-1}")}function lt(t){let e,n;const i=t[7].default,s=(0,o.create_slot)(i,t,t[6],null);return{c(){e=(0,o.element)("div"),s&&s.c(),(0,o.attr)(e,"class","mondrian__clipped-KfJDq2"),(0,o.set_style)(e,"clip-path",t[0])},m(t,i){(0,o.insert)(t,e,i),s&&s.m(e,null),n=!0},p(t,[r]){s&&s.p&&(!n||64&r)&&(0,o.update_slot_base)(s,i,t,t[6],n?(0,o.get_slot_changes)(i,t[6],r,null):(0,o.get_all_dirty_from_scope)(t[6]),null),1&r&&(0,o.set_style)(e,"clip-path",t[0])},i(t){n||((0,o.transition_in)(s,t),n=!0)},o(t){(0,o.transition_out)(s,t),n=!1},d(t){t&&(0,o.detach)(e),s&&s.d(t)}}}function dt(t,e,n){let i,s,r,a,{$$slots:l={},$$scope:d}=e,{item:c}=e;const u=tt.get(c.id);return(0,o.component_subscribe)(t,u,(t=>n(5,a=t))),t.$$set=t=>{"item"in t&&n(2,c=t.item),"$$scope"in t&&n(6,d=t.$$scope)},t.$$.update=()=>{36&t.$$.dirty&&n(4,i=c.states[a]),16&t.$$.dirty&&n(3,s="ellipse"===i.clipPath),8&t.$$.dirty&&n(0,r=s?"ellipse(50% 50%)":void 0)},[r,u,c,s,i,a,d,l]}class ct extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,dt,lt,o.safe_not_equal,{item:2},at)}}const ut=ct;function mt(t){(0,o.append_styles)(t,"svelte-1cx7a5",".mondrian__fill-QARoMt{background-position:center;background-size:cover;inset:0;position:absolute;border-radius:inherit}")}function pt(t){let e;return{c(){e=(0,o.element)("div"),(0,o.attr)(e,"class","mondrian__fill-QARoMt"),(0,o.set_style)(e,"background-color",t[1]),(0,o.set_style)(e,"background-image",t[2]),(0,o.set_style)(e,"opacity",t[0].opacity)},m(t,n){(0,o.insert)(t,e,n)},p(t,n){2&n&&(0,o.set_style)(e,"background-color",t[1]),4&n&&(0,o.set_style)(e,"background-image",t[2]),1&n&&(0,o.set_style)(e,"opacity",t[0].opacity)},d(t){t&&(0,o.detach)(e)}}}function ht(t){let e,n=(null!=t[1]||null!=t[2])&&pt(t);return{c(){n&&n.c(),e=(0,o.empty)()},m(t,i){n&&n.m(t,i),(0,o.insert)(t,e,i)},p(t,[o]){null!=t[1]||null!=t[2]?n?n.p(t,o):(n=pt(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},i:o.noop,o:o.noop,d(t){t&&(0,o.detach)(e),n&&n.d(t)}}}function gt(t,e,n){let{assets:o}=e,{fill:i}=e,s=null,r=null;return t.$$set=t=>{"assets"in t&&n(3,o=t.assets),"fill"in t&&n(0,i=t.fill)},t.$$.update=()=>{if(9&t.$$.dirty)switch(i?.type){case"color":n(1,s=i.color),n(2,r=null);break;case"image":{n(1,s=null);const t=o?.[i.assetId];n(2,r=null==t?null:`url("${function(t){return`assets/${t.path}`}(t)}")`);break}default:n(1,s=n(2,r=null))}},[i,s,r,o]}class ft extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,gt,ht,o.safe_not_equal,{assets:3,fill:0},mt)}}const yt=ft;function _t(t){(0,o.append_styles)(t,"svelte-k757y1",".mondrian__item-ykFLLU{--mon-item-bounding-box-color:var(--mon-color-border-selected);--mon-item-bounding-box-inset:calc(-1 * var(--mon-item-border-width));position:absolute;z-index:1;height:max-content;width:max-content;pointer-events:var(--mon-item-pointer-events)}.mondrian__item-ykFLLU::before{content:'';pointer-events:none;position:absolute;inset:var(--mon-item-bounding-box-inset, 0);outline:0 solid transparent;transition:outline 0.15s ease-in-out}.mondrian__item-ykFLLU.mondrian__--mon-dragging-2lKG_5{cursor:grab;opacity:0.3}.mondrian__item-ykFLLU.mondrian__--root-2LaCKb{position:relative}.mondrian__item-ykFLLU.mondrian__--hidden-2X7RB4{display:none}.mondrian__item-ykFLLU:is(\n      .mondrian__--hover-BMweZ2,\n      .mondrian__--selected-2RER7P,\n      .mondrian__--dropping-into-29gcsy,\n      [data-clickable-children]\n    )::before{outline:var(--bounding-box-thickness, 0) var(--bounding-box-style, solid)\n      var(--mon-item-bounding-box-color)}.mondrian__item-ykFLLU.mondrian__--hover-BMweZ2{--bounding-box-thickness:var(--art-border-width-lg)}.mondrian__item-ykFLLU.mondrian__--selected-2RER7P{--bounding-box-thickness:var(--art-border-width-md)}.mondrian__item-ykFLLU.mondrian__--dropping-into-29gcsy{--bounding-box-thickness:var(--art-border-width-md);--bounding-box-style:dashed}.mondrian__item-ykFLLU[data-clickable-children]::before{--bounding-box-thickness:var(--art-border-width-lg);--bounding-box-style:dashed}.mondrian__item-ykFLLU.mondrian__--clickable-3iWGDT{cursor:pointer}.mondrian__item-ykFLLU:is(.mondrian__--selected-2RER7P):hover{cursor:grab}.mondrian__item-ykFLLU:is(.mondrian__--selected-2RER7P):active{cursor:grabbing}.mondrian__item-ykFLLU[data-mon-disabled],.mondrian__item-ykFLLU[data-mon-disabled] *{pointer-events:none !important}.mondrian__item-ykFLLU.mondrian__--debug-158Qe1::after{content:attr(data-parent-id) '>' attr(data-item-id);position:absolute;bottom:0;right:0;overflow:hidden;white-space:nowrap;padding:var(--art-space-0-25) var(--art-space-0-5);font:1.1rem / 1 monospace;background-color:#f006;backdrop-filter:grayscale(100%) blur(3px);color:#000;border-radius:var(--art-border-radius-sm) 0 0 0;pointer-events:none}.mondrian__item-ykFLLU.mondrian__--preview-item-2k2WRL{--mon-item-pointer-events:none;position:static}.mondrian__item-ykFLLU:focus-visible{outline:none}.mon-app:not(.mon-meta-key-down, .mon-preview-active)\n    :is(\n      .mondrian__item-ykFLLU[data-item-type='group']:not(.mondrian__--root-2LaCKb):not([data-clickable-children])\n        .mondrian__item-ykFLLU:not(.mondrian__--selected-2RER7P)\n    ){--mon-item-pointer-events:none}")}const bt=t=>({}),vt=t=>({}),$t=t=>({}),wt=t=>({});function At(t){let e,n;return e=new yt({props:{assets:t[0].assets,fill:t[22]}}),{c(){(0,o.create_component)(e.$$.fragment)},m(t,i){(0,o.mount_component)(e,t,i),n=!0},p(t,n){const o={};1&n[0]&&(o.assets=t[0].assets),4194304&n[0]&&(o.fill=t[22]),e.$set(o)},i(t){n||((0,o.transition_in)(e.$$.fragment,t),n=!0)},o(t){(0,o.transition_out)(e.$$.fragment,t),n=!1},d(t){(0,o.destroy_component)(e,t)}}}function xt(t){let e,n;return e=new yt({props:{assets:t[0].assets,fill:t[21]}}),{c(){(0,o.create_component)(e.$$.fragment)},m(t,i){(0,o.mount_component)(e,t,i),n=!0},p(t,n){const o={};1&n[0]&&(o.assets=t[0].assets),2097152&n[0]&&(o.fill=t[21]),e.$set(o)},i(t){n||((0,o.transition_in)(e.$$.fragment,t),n=!0)},o(t){(0,o.transition_out)(e.$$.fragment,t),n=!1},d(t){(0,o.destroy_component)(e,t)}}}function kt(t){let e,n,i,s=null!=t[22]&&At(t),r=null!=t[21]&&xt(t);return{c(){s&&s.c(),e=(0,o.space)(),r&&r.c(),n=(0,o.empty)()},m(t,a){s&&s.m(t,a),(0,o.insert)(t,e,a),r&&r.m(t,a),(0,o.insert)(t,n,a),i=!0},p(t,i){null!=t[22]?s?(s.p(t,i),4194304&i[0]&&(0,o.transition_in)(s,1)):(s=At(t),s.c(),(0,o.transition_in)(s,1),s.m(e.parentNode,e)):s&&((0,o.group_outros)(),(0,o.transition_out)(s,1,1,(()=>{s=null})),(0,o.check_outros)()),null!=t[21]?r?(r.p(t,i),2097152&i[0]&&(0,o.transition_in)(r,1)):(r=xt(t),r.c(),(0,o.transition_in)(r,1),r.m(n.parentNode,n)):r&&((0,o.group_outros)(),(0,o.transition_out)(r,1,1,(()=>{r=null})),(0,o.check_outros)())},i(t){i||((0,o.transition_in)(s),(0,o.transition_in)(r),i=!0)},o(t){(0,o.transition_out)(s),(0,o.transition_out)(r),i=!1},d(t){t&&((0,o.detach)(e),(0,o.detach)(n)),s&&s.d(t),r&&r.d(t)}}}function Ct(t){let e,n,i,s,r,a,l,d,c,u,m,p,h,g,f,y,_;n=new ut({props:{item:t[0],$$slots:{default:[kt]},$$scope:{ctx:t}}});const b=t[29].before,v=(0,o.create_slot)(b,t,t[35],wt),$=[t[16]];var w=t[2];function A(t,e){let n={};for(let t=0;t<$.length;t+=1)n=(0,o.assign)(n,$[t]);return void 0!==e&&65536&e[0]&&(n=(0,o.assign)(n,(0,o.get_spread_update)($,[(0,o.get_spread_object)(t[16])]))),{props:n}}w&&(r=(0,o.construct_svelte_component)(w,A(t)));const x=t[29].after,k=(0,o.create_slot)(x,t,t[35],vt);let C=[{"data-item-type":l=t[0].type},{"data-item-id":d=t[0].id.slice(0,5)},{"data-parent-id":c=t[0].parentId.slice(0,5)},{"data-mon-disabled":u=!!t[7]||void 0},{"data-mon-item-id":m=t[0].id},{"data-clickable-children":p=t[12]||void 0},{class:"mondrian__item-ykFLLU"},{tabindex:"-1"}],S={};for(let t=0;t<C.length;t+=1)S=(0,o.assign)(S,C[t]);return{c(){e=(0,o.element)(t[0].tagName??"div"),(0,o.create_component)(n.$$.fragment),i=(0,o.space)(),v&&v.c(),s=(0,o.space)(),r&&(0,o.create_component)(r.$$.fragment),a=(0,o.space)(),k&&k.c(),(0,o.set_dynamic_element_data)(t[0].tagName??"div")(e,S),(0,o.toggle_class)(e,"mondrian__--debug-158Qe1",!1),(0,o.toggle_class)(e,"mondrian__--mon-dragging-2lKG_5",t[8]),(0,o.toggle_class)(e,"mondrian__--root-2LaCKb",t[1]),(0,o.toggle_class)(e,"mondrian__--hidden-2X7RB4",!t[11]),(0,o.toggle_class)(e,"mondrian__--selected-2RER7P",t[5]),(0,o.toggle_class)(e,"mondrian__--dropping-into-29gcsy",t[9]),(0,o.toggle_class)(e,"mondrian__--hover-BMweZ2",t[6]),(0,o.toggle_class)(e,"mondrian__--preview-item-2k2WRL",t[4]),(0,o.toggle_class)(e,"mondrian__--clickable-3iWGDT",t[15]),(0,o.set_style)(e,"--mon-item-border-width",t[13].border?.applied?`${t[13].border?.width.value}px`:"0px"),(0,o.set_style)(e,"padding",t[20]),(0,o.set_style)(e,"width",t[26]),(0,o.set_style)(e,"height",t[25]),(0,o.set_style)(e,"border",t[19]),(0,o.set_style)(e,"border-radius",t[18]),(0,o.set_style)(e,"top",t[23]),(0,o.set_style)(e,"left",t[24]),(0,o.set_style)(e,"z-index",t[17])},m(l,d){(0,o.insert)(l,e,d),(0,o.mount_component)(n,e,null),(0,o.append)(e,i),v&&v.m(e,null),(0,o.append)(e,s),r&&(0,o.mount_component)(r,e,null),(0,o.append)(e,a),k&&k.m(e,null),t[34](e),f=!0,y||(_=[(0,o.listen)(e,"mousedown",t[30]),(0,o.listen)(e,"click",t[31]),(0,o.listen)(e,"keydown",t[32]),(0,o.listen)(e,"keyup",t[33]),(0,o.action_destroyer)(h=t[10].call(null,e,{itemId:t[0].id,enabled:!t[7]})),(0,o.action_destroyer)(g=t[3].call(null,e,t[0]))],y=!0)},p(t,i){const s={};if(1&i[0]&&(s.item=t[0]),6291457&i[0]|16&i[1]&&(s.$$scope={dirty:i,ctx:t}),n.$set(s),v&&v.p&&(!f||16&i[1])&&(0,o.update_slot_base)(v,b,t,t[35],f?(0,o.get_slot_changes)(b,t[35],i,$t):(0,o.get_all_dirty_from_scope)(t[35]),wt),4&i[0]&&w!==(w=t[2])){if(r){(0,o.group_outros)();const t=r;(0,o.transition_out)(t.$$.fragment,1,0,(()=>{(0,o.destroy_component)(t,1)})),(0,o.check_outros)()}w?(r=(0,o.construct_svelte_component)(w,A(t,i)),(0,o.create_component)(r.$$.fragment),(0,o.transition_in)(r.$$.fragment,1),(0,o.mount_component)(r,e,a)):r=null}else if(w){const e=65536&i[0]?(0,o.get_spread_update)($,[(0,o.get_spread_object)(t[16])]):{};r.$set(e)}k&&k.p&&(!f||16&i[1])&&(0,o.update_slot_base)(k,x,t,t[35],f?(0,o.get_slot_changes)(x,t[35],i,bt):(0,o.get_all_dirty_from_scope)(t[35]),vt),(0,o.set_dynamic_element_data)(t[0].tagName??"div")(e,S=(0,o.get_spread_update)(C,[(!f||1&i[0]&&l!==(l=t[0].type))&&{"data-item-type":l},(!f||1&i[0]&&d!==(d=t[0].id.slice(0,5)))&&{"data-item-id":d},(!f||1&i[0]&&c!==(c=t[0].parentId.slice(0,5)))&&{"data-parent-id":c},(!f||128&i[0]&&u!==(u=!!t[7]||void 0))&&{"data-mon-disabled":u},(!f||1&i[0]&&m!==(m=t[0].id))&&{"data-mon-item-id":m},(!f||4096&i[0]&&p!==(p=t[12]||void 0))&&{"data-clickable-children":p},{class:"mondrian__item-ykFLLU"},{tabindex:"-1"}])),h&&(0,o.is_function)(h.update)&&129&i[0]&&h.update.call(null,{itemId:t[0].id,enabled:!t[7]}),g&&(0,o.is_function)(g.update)&&1&i[0]&&g.update.call(null,t[0]),(0,o.toggle_class)(e,"mondrian__--debug-158Qe1",!1),(0,o.toggle_class)(e,"mondrian__--mon-dragging-2lKG_5",t[8]),(0,o.toggle_class)(e,"mondrian__--root-2LaCKb",t[1]),(0,o.toggle_class)(e,"mondrian__--hidden-2X7RB4",!t[11]),(0,o.toggle_class)(e,"mondrian__--selected-2RER7P",t[5]),(0,o.toggle_class)(e,"mondrian__--dropping-into-29gcsy",t[9]),(0,o.toggle_class)(e,"mondrian__--hover-BMweZ2",t[6]),(0,o.toggle_class)(e,"mondrian__--preview-item-2k2WRL",t[4]),(0,o.toggle_class)(e,"mondrian__--clickable-3iWGDT",t[15]),8192&i[0]&&(0,o.set_style)(e,"--mon-item-border-width",t[13].border?.applied?`${t[13].border?.width.value}px`:"0px"),1048576&i[0]&&(0,o.set_style)(e,"padding",t[20]),67108864&i[0]&&(0,o.set_style)(e,"width",t[26]),33554432&i[0]&&(0,o.set_style)(e,"height",t[25]),524288&i[0]&&(0,o.set_style)(e,"border",t[19]),262144&i[0]&&(0,o.set_style)(e,"border-radius",t[18]),8388608&i[0]&&(0,o.set_style)(e,"top",t[23]),16777216&i[0]&&(0,o.set_style)(e,"left",t[24]),131072&i[0]&&(0,o.set_style)(e,"z-index",t[17])},i(t){f||((0,o.transition_in)(n.$$.fragment,t),(0,o.transition_in)(v,t),r&&(0,o.transition_in)(r.$$.fragment,t),(0,o.transition_in)(k,t),f=!0)},o(t){(0,o.transition_out)(n.$$.fragment,t),(0,o.transition_out)(v,t),r&&(0,o.transition_out)(r.$$.fragment,t),(0,o.transition_out)(k,t),f=!1},d(i){i&&(0,o.detach)(e),(0,o.destroy_component)(n),v&&v.d(i),r&&(0,o.destroy_component)(r),k&&k.d(i),t[34](null),y=!1,(0,o.run_all)(_)}}}function St(t){let e,n,i=t[0].tagName??"div",s=(t[0].tagName??"div")&&Ct(t);return{c(){s&&s.c(),e=(0,o.empty)()},m(t,i){s&&s.m(t,i),(0,o.insert)(t,e,i),n=!0},p(t,n){t[0].tagName??"div"?i?(0,o.safe_not_equal)(i,t[0].tagName??"div")?(s.d(1),s=Ct(t),i=t[0].tagName??"div",s.c(),s.m(e.parentNode,e)):s.p(t,n):(s=Ct(t),i=t[0].tagName??"div",s.c(),s.m(e.parentNode,e)):i&&(s.d(1),s=null,i=t[0].tagName??"div")},i(t){n||((0,o.transition_in)(s,t),n=!0)},o(t){(0,o.transition_out)(s,t),n=!1},d(t){t&&(0,o.detach)(e),s&&s.d(t)}}}function zt({event:t}){return"click"===t}function Et(t,e,n){let i,s,r,a,l,d,c,u,m,p,h,g,f,y,{$$slots:_={},$$scope:b}=e,{item:v}=e,{idx:$=0}=e,{isRoot:w=!1}=e,{ItemComponent:A}=e,{bindTriggers:x=(()=>{})}=e,{stateId:k}=e,{isPreviewItem:C=!1}=e,{isSelected:S=!1}=e,{isHovered:z=!1}=e,{isDisabled:E=!1}=e,{isDragging:L=!1}=e,{isDroppingInto:I=!1}=e,{hoverItem:M=(()=>{})}=e,{visible:R}=e,{clickableChildren:B=!1}=e;return t.$$set=t=>{"item"in t&&n(0,v=t.item),"idx"in t&&n(27,$=t.idx),"isRoot"in t&&n(1,w=t.isRoot),"ItemComponent"in t&&n(2,A=t.ItemComponent),"bindTriggers"in t&&n(3,x=t.bindTriggers),"stateId"in t&&n(28,k=t.stateId),"isPreviewItem"in t&&n(4,C=t.isPreviewItem),"isSelected"in t&&n(5,S=t.isSelected),"isHovered"in t&&n(6,z=t.isHovered),"isDisabled"in t&&n(7,E=t.isDisabled),"isDragging"in t&&n(8,L=t.isDragging),"isDroppingInto"in t&&n(9,I=t.isDroppingInto),"hoverItem"in t&&n(10,M=t.hoverItem),"visible"in t&&n(11,R=t.visible),"clickableChildren"in t&&n(12,B=t.clickableChildren),"$$scope"in t&&n(35,b=t.$$scope)},t.$$.update=()=>{268435457&t.$$.dirty[0]&&n(13,i=st(v,k)),8192&t.$$.dirty[0]&&n(26,s=rt(i.width)),8192&t.$$.dirty[0]&&n(25,r=rt(i.height)),8192&t.$$.dirty[0]&&n(24,a=rt(i.x)),8192&t.$$.dirty[0]&&n(23,l=rt(i.y)),8192&t.$$.dirty[0]&&n(22,d=i.fill),8192&t.$$.dirty[0]&&n(21,c=i.overlay),8192&t.$$.dirty[0]&&n(20,u=[i.padding.top,i.padding.right,i.padding.bottom,i.padding.left].map(rt).join(" ")),8192&t.$$.dirty[0]&&n(19,m=i.border?.applied?`${rt(i.border.width)} ${i.border.style} color-mix(in srgb, ${i.border.color} ${100*i.border.opacity}%, transparent)`:void 0),8192&t.$$.dirty[0]&&n(18,p=i.borderRadius.applied?rt(i.borderRadius.topLeft):void 0),134217728&t.$$.dirty[0]&&n(17,h=9999-$),268435457&t.$$.dirty[0]&&n(16,g=function(t,e){switch(t){case"text":case"shape":return{item:v,stateId:e};default:return{item:v}}}(v.type,k)),1&t.$$.dirty[0]&&n(15,f=v?.triggers.some(zt))},[v,w,A,x,C,S,z,E,L,I,M,R,B,i,y,f,g,h,p,m,u,c,d,l,a,r,s,$,k,_,function(e){o.bubble.call(this,t,e)},function(e){o.bubble.call(this,t,e)},function(e){o.bubble.call(this,t,e)},function(e){o.bubble.call(this,t,e)},function(t){o.binding_callbacks[t?"unshift":"push"]((()=>{y=t,n(14,y)}))},b]}class Lt extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,Et,St,o.safe_not_equal,{item:0,idx:27,isRoot:1,ItemComponent:2,bindTriggers:3,stateId:28,isPreviewItem:4,isSelected:5,isHovered:6,isDisabled:7,isDragging:8,isDroppingInto:9,hoverItem:10,visible:11,clickableChildren:12},_t,[-1,-1])}}const It=Lt;function Mt(t){(0,o.append_styles)(t,"svelte-1wgxiik",".mondrian__text-item-base-2GzC1M{display:flex;flex-direction:column;height:100%}.mondrian__text-item-base-2GzC1M[data-vertical-align='top']{justify-content:flex-start}.mondrian__text-item-base-2GzC1M[data-vertical-align='middle']{justify-content:center}.mondrian__text-item-base-2GzC1M[data-vertical-align='bottom']{justify-content:flex-end}.mondrian__text-item-base-2GzC1M .tiptap{height:auto}")}const Rt=t=>({item:1&t}),Bt=t=>({item:t[0]});function qt(t){let e,n,i;const s=t[4].default,r=(0,o.create_slot)(s,t,t[3],Bt);return{c(){e=(0,o.element)("div"),r&&r.c(),(0,o.attr)(e,"class","mondrian__text-item-base-2GzC1M"),(0,o.attr)(e,"data-vertical-align",n=t[1].textVerticalAlign)},m(t,n){(0,o.insert)(t,e,n),r&&r.m(e,null),i=!0},p(t,[a]){r&&r.p&&(!i||9&a)&&(0,o.update_slot_base)(r,s,t,t[3],i?(0,o.get_slot_changes)(s,t[3],a,Rt):(0,o.get_all_dirty_from_scope)(t[3]),Bt),(!i||2&a&&n!==(n=t[1].textVerticalAlign))&&(0,o.attr)(e,"data-vertical-align",n)},i(t){i||((0,o.transition_in)(r,t),i=!0)},o(t){(0,o.transition_out)(r,t),i=!1},d(t){t&&(0,o.detach)(e),r&&r.d(t)}}}function Ft(t,e,n){let o,{$$slots:i={},$$scope:s}=e,{item:r}=e,{stateId:a}=e;return t.$$set=t=>{"item"in t&&n(0,r=t.item),"stateId"in t&&n(2,a=t.stateId),"$$scope"in t&&n(3,s=t.$$scope)},t.$$.update=()=>{5&t.$$.dirty&&n(1,o=st(r,a))},[r,o,a,s,i]}class Nt extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,Ft,qt,o.safe_not_equal,{item:0,stateId:2},Mt)}}const jt=Nt;o.SvelteComponent;var Ht=n(2604),Ut=n.n(Ht),Tt=n(101),Zt=n.n(Tt),Dt=n(5863),Kt=n.n(Dt),Pt=n(3124),Ot=n.n(Pt),Xt=n(6896),Gt=n.n(Xt),Wt=n(9917),Yt=n.n(Wt),Vt=n(4247),Qt={};Qt.styleTagTransform=Yt(),Qt.setAttributes=Ot(),Qt.insert=Kt().bind(null,"head"),Qt.domAPI=Zt(),Qt.insertStyleElement=Gt(),Ut()(Vt.A,Qt);const Jt=Vt.A&&Vt.A.locals?Vt.A.locals:void 0;var te=n(3948);const ee=function(){const t=(0,Q.writable)({blockuments:{},items:{},tiptap:{}}),{subscribe:e,set:n,update:o}=t,i=new Map;return{subscribe:e,set:n,update:o,addManifest:(t,e)=>{i.set(t,e),s()},removeManifest:t=>{i.delete(t),s()}};function s(){n(function(...t){const e={};for(const n of t)for(const[t,o]of Object.entries(n))e[t]=Object.assign({},e[t],o);return e}(...i.values()))}}();function ne(t){let e,n;return e=new jt({props:{item:t[0],stateId:t[1],$$slots:{default:[oe]},$$scope:{ctx:t}}}),{c(){(0,o.create_component)(e.$$.fragment)},m(t,i){(0,o.mount_component)(e,t,i),n=!0},p(t,n){const o={};1&n&&(o.item=t[0]),2&n&&(o.stateId=t[1]),68&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||((0,o.transition_in)(e.$$.fragment,t),n=!0)},o(t){(0,o.transition_out)(e.$$.fragment,t),n=!1},d(t){(0,o.destroy_component)(e,t)}}}function oe(t){let e,n,i,s=(0,te.Z)(t[2],V)+"";return{c(){e=(0,o.element)("div"),n=(0,o.element)("div"),(0,o.attr)(n,"class","tiptap"),(0,o.attr)(e,"class",i=Jt.textItem)},m(t,i){(0,o.insert)(t,e,i),(0,o.append)(e,n),n.innerHTML=s},p(t,e){4&e&&s!==(s=(0,te.Z)(t[2],V)+"")&&(n.innerHTML=s)},d(t){t&&(0,o.detach)(e)}}}function ie(t){let e,n,i=void 0!==t[2]&&ne(t);return{c(){i&&i.c(),e=(0,o.empty)()},m(t,s){i&&i.m(t,s),(0,o.insert)(t,e,s),n=!0},p(t,[n]){void 0!==t[2]?i?(i.p(t,n),4&n&&(0,o.transition_in)(i,1)):(i=ne(t),i.c(),(0,o.transition_in)(i,1),i.m(e.parentNode,e)):i&&((0,o.group_outros)(),(0,o.transition_out)(i,1,1,(()=>{i=null})),(0,o.check_outros)())},i(t){n||((0,o.transition_in)(i),n=!0)},o(t){(0,o.transition_out)(i),n=!1},d(t){t&&(0,o.detach)(e),i&&i.d(t)}}}function se(t,e,n){let i,s,r,a;(0,o.component_subscribe)(t,ee,(t=>n(5,a=t)));let{item:l}=e,{stateId:d}=e;return t.$$set=t=>{"item"in t&&n(0,l=t.item),"stateId"in t&&n(1,d=t.stateId)},t.$$.update=()=>{3&t.$$.dirty&&n(4,i=l.states[d]),16&t.$$.dirty&&n(3,s=i.text.id),40&t.$$.dirty&&n(2,r=a.tiptap?.[s])},[l,d,r,s,i,a]}class re extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,se,ie,o.safe_not_equal,{item:0,stateId:1})}}const ae=re;function le(t){(0,o.append_styles)(t,"svelte-1vwx6yd",".mondrian__surface-3PSuzl{width:100%;position:relative}")}function de(t,e,n){const o=t.slice();return o[5]=e[n],o[7]=n,o}function ce(t,e){let n,i,s,r;var a=e[0];function l(t,e){return{props:{idx:t[7],itemId:t[5].id}}}return a&&(i=(0,o.construct_svelte_component)(a,l(e))),{key:t,first:null,c(){n=(0,o.empty)(),i&&(0,o.create_component)(i.$$.fragment),s=(0,o.empty)(),this.first=n},m(t,e){(0,o.insert)(t,n,e),i&&(0,o.mount_component)(i,t,e),(0,o.insert)(t,s,e),r=!0},p(t,n){if(e=t,1&n&&a!==(a=e[0])){if(i){(0,o.group_outros)();const t=i;(0,o.transition_out)(t.$$.fragment,1,0,(()=>{(0,o.destroy_component)(t,1)})),(0,o.check_outros)()}a?(i=(0,o.construct_svelte_component)(a,l(e)),(0,o.create_component)(i.$$.fragment),(0,o.transition_in)(i.$$.fragment,1),(0,o.mount_component)(i,s.parentNode,s)):i=null}else if(a){const t={};2&n&&(t.idx=e[7]),2&n&&(t.itemId=e[5].id),i.$set(t)}},i(t){r||(i&&(0,o.transition_in)(i.$$.fragment,t),r=!0)},o(t){i&&(0,o.transition_out)(i.$$.fragment,t),r=!1},d(t){t&&((0,o.detach)(n),(0,o.detach)(s)),i&&(0,o.destroy_component)(i,t)}}}function ue(t){let e,n,i=[],s=new Map,r=(0,o.ensure_array_like)(t[1].children);const a=t=>t[5].id;for(let e=0;e<r.length;e+=1){let n=de(t,r,e),o=a(n);s.set(o,i[e]=ce(o,n))}return{c(){e=(0,o.element)("div");for(let t=0;t<i.length;t+=1)i[t].c();(0,o.attr)(e,"class","mondrian__surface-3PSuzl")},m(t,s){(0,o.insert)(t,e,s);for(let t=0;t<i.length;t+=1)i[t]&&i[t].m(e,null);n=!0},p(t,[n]){3&n&&(r=(0,o.ensure_array_like)(t[1].children),(0,o.group_outros)(),i=(0,o.update_keyed_each)(i,n,a,1,t,r,s,e,o.outro_and_destroy_block,ce,null,de),(0,o.check_outros)())},i(t){if(!n){for(let t=0;t<r.length;t+=1)(0,o.transition_in)(i[t]);n=!0}},o(t){for(let t=0;t<i.length;t+=1)(0,o.transition_out)(i[t]);n=!1},d(t){t&&(0,o.detach)(e);for(let t=0;t<i.length;t+=1)i[t].d()}}}function me(t,e,n){let i,s,{item:r}=e,{Item:a=be}=e;const l=tt.get(r.id);return(0,o.component_subscribe)(t,l,(t=>n(4,s=t))),t.$$set=t=>{"item"in t&&n(3,r=t.item),"Item"in t&&n(0,a=t.Item)},t.$$.update=()=>{24&t.$$.dirty&&n(1,i=r.states[s])},[a,i,l,r,s]}class pe extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,me,ue,o.safe_not_equal,{item:3,Item:0},le)}}const he=pe,ge=(t,e)=>{function n(n,o={}){e.triggers.filter((t=>t.event===n)).forEach((n=>{!function(t,e,n){e.dispatchEvent(new CustomEvent("trigger",{detail:n,bubbles:!0}))}(0,t,{itemId:e.id,triggerId:n.id,...o})}))}const o=[...new Set(e.triggers.map((t=>t.event)))].map((e=>"hover"===e?[ot("mouseenter",t,(()=>{n(e,{hovered:!0})})),ot("mouseleave",t,(()=>{n(e,{hovered:!1})}))]:ot(e,t,(()=>{n(e)})))).flat(2).filter(Boolean);return{destroy(){o.forEach((t=>{t()}))}}};function fe(t){let e,n;return e=new It({props:{item:t[2],idx:t[0],isRoot:t[1],stateId:t[5],ItemComponent:t[4],bindTriggers:ge,visible:t[6]}}),{c(){(0,o.create_component)(e.$$.fragment)},m(t,i){(0,o.mount_component)(e,t,i),n=!0},p(t,[n]){const o={};4&n&&(o.item=t[2]),1&n&&(o.idx=t[0]),2&n&&(o.isRoot=t[1]),32&n&&(o.stateId=t[5]),16&n&&(o.ItemComponent=t[4]),64&n&&(o.visible=t[6]),e.$set(o)},i(t){n||((0,o.transition_in)(e.$$.fragment,t),n=!0)},o(t){(0,o.transition_out)(e.$$.fragment,t),n=!1},d(t){(0,o.destroy_component)(e,t)}}}function ye(t,e,n){let i,s,r,a,d,c,u=o.noop;(0,o.component_subscribe)(t,ee,(t=>n(9,a=t))),t.$$.on_destroy.push((()=>u()));let{itemId:m}=e,{idx:p=0}=e,{isRoot:h=!1}=e;const g=nt.get(m);return(0,o.component_subscribe)(t,g,(t=>n(6,c=t))),t.$$set=t=>{"itemId"in t&&n(8,m=t.itemId),"idx"in t&&n(0,p=t.idx),"isRoot"in t&&n(1,h=t.isRoot)},t.$$.update=()=>{768&t.$$.dirty&&n(2,i=a.items[m]),4&t.$$.dirty&&n(4,s=(t=>({image:()=>l,text:()=>ae,group:()=>he,shape:()=>ae}[t.type]()))(i)),4&t.$$.dirty&&(n(3,r=tt.get(i.id)),u(),u=(0,o.subscribe)(r,(t=>n(5,d=t))))},[p,h,i,r,s,d,c,g,m,a]}class _e extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,ye,fe,o.safe_not_equal,{itemId:8,idx:0,isRoot:1})}}const be=_e;var ve=n(5608),$e=n(251);function we(t,e){return[...t.querySelectorAll(e)]}function Ae(t,e,n,o){return e.addEventListener(t,n,o),()=>{e.removeEventListener(t,n,o)}}var xe=n(9205);const ke=n.n(xe)()("mondrian").extend("keyboard"),Ce=Object.freeze(["Alt","Control","Meta","Shift"]),Se={activeModifierKeys:new Set,get alt(){return Se.activeModifierKeys.has("Alt")},get meta(){return Se.activeModifierKeys.has("Meta")||Se.activeModifierKeys.has("Control")},get shift(){return Se.activeModifierKeys.has("Shift")},key:void 0,get combo(){return[Se.meta&&"Meta",Se.alt&&"Alt",Se.shift&&"Shift",Se.key].filter(Boolean).join("+")}},ze=(0,Q.readable)(Se,(t=>{function e(e){const n="keydown"===e.type,{key:o}=e;Ce.includes(o)?n?Se.activeModifierKeys.add(o):(Se.activeModifierKeys.delete(o),Se.key=void 0):Se.key=n?o:void 0,t(Se)}return window.addEventListener("keydown",e),window.addEventListener("keyup",e),function(){window.removeEventListener("keydown",e),window.removeEventListener("keyup",e)}})),Ee={...ze,is:t=>(Se.combo&&ke(`comparing keycombos, store: ${Se.combo}, comparison: ${t}`),Se.combo.toLowerCase()===t.toLowerCase()),on(t,e){const n=n=>{Ee.is(t)&&(ke("keyCombo matched, executing handler",t),e(n))};return window.addEventListener("keydown",n),()=>{window.removeEventListener("keydown",n)}},reset(){Se.activeModifierKeys.clear(),Se.key=void 0}},Le={down:!1,downX:-1,downY:-1,target:void 0,x:-1,y:-1},Ie=((0,Q.readable)(Le,(t=>{return window.addEventListener("mousedown",e),window.addEventListener("mousemove",o),window.addEventListener("mouseup",n),function(){window.removeEventListener("mousedown",e),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",n)};function e(t){Le.down=!0,Le.downX=Le.x=t.clientX,Le.downY=Le.y=t.clientY,Le.target=t.target,i()}function n(){Le.down=!1,Le.downX=Le.x=Le.downY=Le.y=-1,Le.target=void 0,i()}function o(t){Le.x=t.x,Le.y=t.y,i()}function i(){t(Le)}})),"mondrian-suspense");var Me,Re,Be=n(5942);class qe extends $e.WF{get $form(){return(0,ve.gn)(this,Re,"f")?.form??null}get $slotted(){return this.$$$("*")}constructor(){super(),Me.set(this,[]),Re.set(this,void 0),this.$=t=>function(t,e){return t.querySelector(e)}(this.shadowRoot,t),this.$$=t=>we(this.shadowRoot,t),this.$$$=(t,e)=>{const n=e?`slot[name="${e}"]`:"slot:not([name])",o=this.$(n);return o?o.assignedElements({flatten:!0}).map((e=>e.matches(t)?[e]:we(e,t))).flat():(console.warn(`Could not query ${n} within ${this.tagName.toLowerCase()} because it does not exist.`),[])},this.hasSlotted=t=>this.$slotted.some((e=>e.contains(t))),this.hasWithin=t=>this.contains(t)||this.hasSlotted(t),this.unbindEvents=()=>{(0,ve.gn)(this,Me,"f").forEach((t=>t()))},this.collectOff=t=>{(0,ve.gn)(this,Me,"f").push(t)},this.on=(t,e,n)=>{const o=Ae(t,this,e,n);return this.collectOff(o),o},this.dispatch=(t,e={})=>function(t,e,n={},o={}){t.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,...o,detail:n}))}(this,t,e),this.constructor.formAssociated&&(0,ve.GG)(this,Re,this.attachInternals(),"f")}connectedCallback(){super.connectedCallback(),this.bindEvents()}disconnectedCallback(){super.disconnectedCallback(),this.unbindEvents()}bindEvents(){}}Me=new WeakMap,Re=new WeakMap,qe.shadowRootOptions={...$e.WF.shadowRootOptions,delegatesFocus:!0};const Fe=$e.AH`
  * {
    box-sizing: border-box;
  }

  :host {
    display: block;
    width: var(--width, fit-content);
  }

  :host([block]) {
    --width: 100%;
  }

  :host([size='s']) {
    --height: 2.4rem;
    --font-size: 1.2rem;
  }

  :host([size='m']) {
    --height: 3.2rem;
    --font-size: 1.4rem;
  }

  :host([kind='primary']) {
    --background-color: var(--mon-color-primary);
    --color: var(--art-color-mono-white);
  }

  :host([kind='primary-ghost']) {
    --border-color: var(--mon-color-primary);
    --color: var(--mon-color-primary);
  }

  :host([kind='secondary']) {
    --background-color: var(--art-color-mono-black);
    --color: var(--art-color-mono-white);
  }

  :host([kind='secondary-ghost']) {
    --border-color: var(--art-color-neutral-600);
    --color: var(--art-color-mono-black);
  }

  :host([kind='danger']) {
    --background-color: var(--art-color-critical-root);
    --color: var(--art-color-mono-white);
  }

  :host([kind='danger-ghost']) {
    --border-color: var(--art-color-critical-root);
    --color: var(--art-color-critical-root);
  }

  :host .button {
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    border: 1px solid var(--border-color, transparent);
    background-color: var(--background-color, transparent);
    color: var(--color, var(--art-color-mono-black));
    height: var(--height, auto);
    font-size: var(--font-size, auto);
    font-weight: var(--art-font-weight-600);
    white-space: nowrap;
    border-radius: var(--height, 0);
    padding: 0 1.25em;
    transition: all ease-in-out 0.1s;
  }

  :host .button[aria-disabled='true'] {
    pointer-events: none;
  }

  :host .mon-button-contents:has(.button[aria-disabled='true']) {
    cursor: not-allowed;
  }
`;let Ne=class extends qe{constructor(){super(...arguments),this.kind="primary",this.size="m",this.type="button",this.href=void 0,this.block=!1,this.disabled=!1}get submits(){return"submit"===this.type&&!this.disabled}bindEvents(){this.on("click",(()=>{this.submits&&this.$form?.requestSubmit()}))}render(){return this.href?$e.qy`
        <div class="mon-button-contents">
          <a
            class="button"
            href=${this.href}
            aria-disabled="${JSON.stringify(this.disabled)}"
          >
            <slot />
          </a>
        </div>
      `:$e.qy`
      <div class="mon-button-contents">
        <button
          class="button"
          type=${this.type}
          ${this.disabled?'disabled="true"':""}
          aria-disabled="${JSON.stringify(this.disabled)}"
        >
          <slot />
        </button>
      </div>
    `}};Ne.formAssociated=!0,Ne.styles=Fe,(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Ne.prototype,"kind",void 0),(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Ne.prototype,"size",void 0),(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Ne.prototype,"type",void 0),(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Ne.prototype,"href",void 0),(0,ve.Cg)([(0,Be.MZ)({type:Boolean,reflect:!0})],Ne.prototype,"block",void 0),(0,ve.Cg)([(0,Be.MZ)({type:Boolean,reflect:!0})],Ne.prototype,"disabled",void 0),Ne=(0,ve.Cg)([(0,Be.EM)("mon-button")],Ne);var je=n(4993),He=n.n(je);const Ue=$e.AH`
  :host {
    cursor: pointer;
    display: flex;
    gap: var(--art-space-1);
    padding: var(--art-space-1) var(--art-space-2);
    background-color: var(--art-color-mono-white);
    align-items: center;
  }

  :host([selected]) {
    background-color: var(--art-color-blue-100);
  }

  slot[name='icon'] {
    --_icon-size: var(--mon-menu-item-icon-size, 1.6rem);
    --mon-icon-size: var(--_icon-size);
    flex: none;
    width: var(--_icon-size);
    height: var(--_icon-size);
  }

  .content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;let Te=class extends qe{constructor(){super(...arguments),this.selected=!1,this.bindEvents=()=>{this.on("mouseenter",(()=>{this.dispatch("hover",{value:this.value,hovered:!0})})),this.on("mouseleave",(()=>{this.dispatch("hover",{value:this.value,hovered:!1})}))}}updated(t){t.has("selected")&&this.dispatch("change:selected",{selected:t.get("selected"),value:this.value})}render(){return $e.qy`
      <slot name="icon"></slot>
      <span class="content">
        <slot></slot>
      </span>
    `}};Te.formAssociated=!0,Te.styles=Ue,(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Te.prototype,"name",void 0),(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Te.prototype,"value",void 0),(0,ve.Cg)([(0,Be.MZ)({type:Boolean,reflect:!0})],Te.prototype,"selected",void 0),(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Te.prototype,"for",void 0),Te=(0,ve.Cg)([(0,Be.EM)("mon-menu-item")],Te);const Ze=$e.AH`
  * {
    box-sizing: border-box;
  }

  :host {
    --icon-color: var(--art-color-neutral-600);
    display: block;
    position: relative;
    max-width: 100%;
  }

  :host(:is(:hover, :focus-within)) {
    --icon-color: var(--art-color-blue-600);
  }

  .hidden {
    display: none;
  }

  .trigger {
    cursor: pointer;
    width: 100%;
    display: flex;
    gap: var(--art-space-1);
    border: 1px solid var(--mon-color-border);
    border-radius: var(--art-border-radius-md);
    background: var(--mon-color-input);
    padding: var(--art-space-1) var(--art-space-2);
    text-align: left;
    font-family: inherit;
    font-size: var(--art-font-size-14);
  }

  .trigger-content {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .trigger-icon {
    width: 12px;
    height: 12px;
    fill: var(--art-color-neutral-700);
  }

  .menu {
    --inset: calc(100% + var(--art-space-0-5)) 0 auto 0;
    width: fit-content;
    overflow-y: auto;
  }
`;let De=class extends qe{constructor(){super(...arguments),this.open=!1,this.value=null,this.maxMenuHeight="100vh",this.calculateMaxMenuHeight=()=>{if(this.shadowRoot&&this.open){const{bottom:t}=this.shadowRoot.host.getBoundingClientRect();this.maxMenuHeight=window.innerHeight-t+"px"}},this.onSubmit=t=>{this.value=t.detail.value,this.open=!1},this.onClickOutside=t=>{this.hasWithin(t.detail.$target)||(this.open=!1)},this.onClickTrigger=()=>{this.open=!this.open,this.calculateMaxMenuHeight()},this.onKeyUp=t=>{"ArrowDown"===t.key&&(t.preventDefault(),this.open=!0,this.calculateMaxMenuHeight())},this.onSlotChange=()=>{this.value||(this.value=this.$selected?.value??null)},this.onSelectedChange=()=>{this.value=this.$selected?.value??null},this.renderLabel=()=>{if(this.value)return this.$$$(`mon-menu-item[value="${this.value}"]`)[0]?.innerText}}get $selected(){return this.$$$("mon-menu-item[selected]")[0]}bindEvents(){const t=He()(this.calculateMaxMenuHeight,100,{leading:!1,trailing:!0});window.addEventListener("resize",t),this.collectOff((()=>window.removeEventListener("resize",t)))}renderTrigger(){const t=this.renderLabel()??$e.qy`<slot name="placeholder">Choose an item…</slot>`;return $e.qy`
      <button
        @click=${this.onClickTrigger}
        @keyup=${this.onKeyUp}
        type="button"
        class="trigger"
      >
        <span class="trigger-content"> ${t} </span>
        <span class="trigger-icon">
          <!-- TODO: Stop using '<i />'-based icons; use svgs instead. -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
            />
          </svg>
        </span>
      </button>
    `}renderMenu(){return this.open?$e.qy`
      <mon-menu
        class="menu"
        name=${this.name}
        floating
        autofocusit
        @clickoutside=${this.onClickOutside}
        @mon-menu:submit=${this.onSubmit}
        style=${`max-height: calc(${this.maxMenuHeight} - var(--art-space-2));`}
      >
        <slot
          @change:selected=${this.onSelectedChange}
          @slotchange=${this.onSlotChange}
        ></slot>
      </mon-menu>
    `:$e.qy`
        <slot
          class="hidden"
          @change:selected=${this.onSelectedChange}
          @slotchange=${this.onSlotChange}
        ></slot>
      `}render(){return $e.qy` ${this.renderTrigger()} ${this.renderMenu()} `}};var Ke;De.styles=Ze,(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],De.prototype,"name",void 0),(0,ve.Cg)([(0,Be.MZ)({type:Boolean,reflect:!0})],De.prototype,"open",void 0),(0,ve.Cg)([(0,Be.wk)()],De.prototype,"value",void 0),(0,ve.Cg)([(0,Be.MZ)({type:String})],De.prototype,"maxMenuHeight",void 0),De=(0,ve.Cg)([(0,Be.EM)("mon-dropdown")],De);const Pe=$e.AH`
  * {
    box-sizing: border-box;
  }

  :host {
    background: var(--art-color-mono-white);
    border-radius: var(--art-border-radius-md);
    padding: var(--art-space-1) 0;
    min-width: var(--min-width, auto);
  }

  :host([bordered]) {
    border: 1px solid var(--mon-color-border);
  }

  :host([floating]) {
    position: var(--position, absolute);
    inset: var(--inset, 100% 0 auto 0);
    z-index: 99999;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;let Oe=class extends qe{constructor(){super(...arguments),this.bordered=!0,this.floating=!1,this.autofocusit=!1,this.value=null,this.pressing=!1,this.bindEvents=()=>{this.on("change",this.onChange),this.on("click",this.onClick),this.on("keydown",this.onKeydown),this.on("keyup",this.onKeyup),this.on("mouseover",this.onMouseover),this.collectOff(Ae("mousedown",window,(t=>{t.target instanceof HTMLElement&&!this.hasWithin(t.target)&&this.dispatch("clickoutside",{$target:t.target})})))},this.submit=()=>{this.dispatch("mon-menu:submit",{name:this.name,value:this.value})},this.choose=t=>{const e=t.closest("label")?.querySelector("input");e&&(e.checked=!0,e.focus(),e.dispatchEvent(new Event("change",{bubbles:!0})))},this.focusFirstApplicableItem=()=>{const t=this.$selected??this.$$$("mon-menu-item")[0];t&&this.choose(t)},this.onMouseover=t=>{t.target instanceof Te&&this.choose(t.target)},this.onChange=t=>{this.value=t.target.value??null,this.$slotted.forEach((t=>{const e=t.querySelector("mon-menu-item");e&&e.toggleAttribute("selected",e.value===this.value)}))},this.onClick=t=>{!this.pressing&&t.target instanceof HTMLInputElement&&requestAnimationFrame((()=>{this.submit()}))},this.onKeyup=t=>{const{key:e}=t;"Enter"!==e&&" "!==e||this.submit(),this.pressing=!1},this.onKeydown=()=>{this.pressing=!0},this.onSlotChange=()=>{this.wrapSlots(),this.autofocusit&&this.focusFirstApplicableItem()},this.wrapSlots=()=>{this.$slotted.forEach((t=>{if(!(t instanceof Te))return;const e=document.createElement("div"),n=document.createElement("li");t.replaceWith(e),(0,$e.XX)($e.qy`
          <label ?for=${t.for}>
            ${(0,ve.gn)(this,Ke,"f").call(this,t)} ${t}
          </label>
        `,n),e.replaceWith(n)}))},Ke.set(this,(t=>null!=t.for?$e.qy``:$e.qy`
      <input
        type="radio"
        role="menuitem"
        checked=${t.selected}
        name=${this.name}
        value=${t.value}
        class="mon-visually-hidden"
      />
    `))}get $selected(){return this.$$$("mon-menu-item[selected]")[0]}render(){return $e.qy`
      <ul
        aria-label=${this.getAttribute("aria-label")}
        class="list"
        role="menu"
      >
        <slot @slotchange=${this.onSlotChange}>
          <li>Nothing to see here…</li>
        </slot>
      </ul>
    `}};function Xe(t){(0,o.append_styles)(t,"svelte-1ooljvd",".mondrian__suspense-3tgPBN.mondrian__--loading-3irTkJ{visibility:hidden}")}Ke=new WeakMap,Oe.styles=Pe,(0,ve.Cg)([(0,Be.MZ)({type:String,reflect:!0})],Oe.prototype,"name",void 0),(0,ve.Cg)([(0,Be.MZ)({type:Boolean,reflect:!0})],Oe.prototype,"bordered",void 0),(0,ve.Cg)([(0,Be.MZ)({type:Boolean,reflect:!0})],Oe.prototype,"floating",void 0),(0,ve.Cg)([(0,Be.MZ)({type:Boolean,reflect:!0})],Oe.prototype,"autofocusit",void 0),Oe=(0,ve.Cg)([(0,Be.EM)("mon-menu")],Oe),n(2466),o.SvelteComponent,n(9777),o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,n(2732),o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent,o.SvelteComponent;const Ge=t=>({isLoading:1&t}),We=t=>({isLoading:t[0]});function Ye(t){let e,n;const i=t[2].default,s=(0,o.create_slot)(i,t,t[1],We);return{c(){e=(0,o.element)("div"),s&&s.c(),(0,o.attr)(e,"class","mondrian__suspense-3tgPBN"),(0,o.toggle_class)(e,"mondrian__--loading-3irTkJ",t[0])},m(t,i){(0,o.insert)(t,e,i),s&&s.m(e,null),n=!0},p(t,[r]){s&&s.p&&(!n||3&r)&&(0,o.update_slot_base)(s,i,t,t[1],n?(0,o.get_slot_changes)(i,t[1],r,Ge):(0,o.get_all_dirty_from_scope)(t[1]),We),(!n||1&r)&&(0,o.toggle_class)(e,"mondrian__--loading-3irTkJ",t[0])},i(t){n||((0,o.transition_in)(s,t),n=!0)},o(t){(0,o.transition_out)(s,t),n=!1},d(t){t&&(0,o.detach)(e),s&&s.d(t)}}}function Ve(t,e,n){let{$$slots:o={},$$scope:i}=e;const s=function(){const t=new Set;return(0,d.setContext)(Ie,t),t}();let r=!0;return(0,d.onMount)((()=>{Promise.all(s).then((()=>{n(0,r=!1)}))})),t.$$set=t=>{"$$scope"in t&&n(1,i=t.$$scope)},[r,i,o]}class Qe extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,Ve,Ye,o.safe_not_equal,{},Xe)}}const Je=Qe;o.SvelteComponent,o.SvelteComponent;const tn={[I](t,e,n,o){const i="self"===t.targetId?n:o[t.targetId];!1===e.hovered?tt.get(i.id)?.revert():tt.get(i.id)?.set(t.targetState)},[M](t,e,n,o){const i="self"===t.targetId?n:o[t.targetId];!1===e.hovered?nt.get(i.id)?.set(!t.targetVisibility):nt.get(i.id)?.set(t.targetVisibility)}},en=(t,e)=>{const n=ot("trigger",t,(t=>{const{itemId:n,triggerId:o,...i}=t.detail,s=e[n];if(!s)throw new Error(`Could not execute trigger ${o} on item ${n} because the item could not be found.`);const r=s?.triggers.find((t=>t.id===o));if(!r)throw new Error(`Could not execute trigger ${o} on item ${n} because the trigger could not be found.`);const a=tn[r.action];if(!a)throw new Error(`Could not execute trigger ${o} on item ${n} because an appropriate handler for its '${r.action}' action could not be found.`);a(r,i,s,e)}));return{destroy(){n()}}};function nn(t){(0,o.append_styles)(t,"svelte-1cqy2hj",".mondrian__preview-3xSDFv{display:flex;justify-content:center;position:relative;z-index:0}.mondrian__preview--empty-1NrG6Q{background-color:var(--art-color-neutral-050)}")}function on(t){let e,n;return e=new Je({props:{$$slots:{default:[rn]},$$scope:{ctx:t}}}),{c(){(0,o.create_component)(e.$$.fragment)},m(t,i){(0,o.mount_component)(e,t,i),n=!0},p(t,n){const o={};258&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||((0,o.transition_in)(e.$$.fragment,t),n=!0)},o(t){(0,o.transition_out)(e.$$.fragment,t),n=!1},d(t){(0,o.destroy_component)(e,t)}}}function sn(t){let e,n,i,s;return{c(){e=(0,o.element)("div"),n=(0,o.text)("Block "),i=(0,o.text)(t[0]),s=(0,o.text)(" could not be loaded")},m(t,r){(0,o.insert)(t,e,r),(0,o.append)(e,n),(0,o.append)(e,i),(0,o.append)(e,s)},p(t,e){1&e&&(0,o.set_data)(i,t[0])},i:o.noop,o:o.noop,d(t){t&&(0,o.detach)(e)}}}function rn(t){let e,n,i,s,r,a;return n=new be({props:{itemId:t[7].id,isRoot:!0}}),{c(){e=(0,o.element)("div"),(0,o.create_component)(n.$$.fragment),(0,o.attr)(e,"class","mondrian__preview-3xSDFv"),(0,o.toggle_class)(e,"mondrian__preview--empty-1NrG6Q",t[1])},m(l,d){(0,o.insert)(l,e,d),(0,o.mount_component)(n,e,null),s=!0,r||(a=(0,o.action_destroyer)(i=en.call(null,e,t[3])),r=!0)},p(t,n){(!s||2&n)&&(0,o.toggle_class)(e,"mondrian__preview--empty-1NrG6Q",t[1])},i(t){s||((0,o.transition_in)(n.$$.fragment,t),s=!0)},o(t){(0,o.transition_out)(n.$$.fragment,t),s=!1},d(t){t&&(0,o.detach)(e),(0,o.destroy_component)(n),r=!1,a()}}}function an(t){let e,n,i,s;const r=[sn,on],a=[];function l(t,e){return 1===e?function(t){const e=t.slice(),n=e[3][e[4]];return e[7]=n,e}(t):t}return e=function(t,e){return void 0===t[2]||void 0===t[4]?0:1}(t),n=a[e]=r[e](l(t,e)),{c(){n.c(),i=(0,o.empty)()},m(t,n){a[e].m(t,n),(0,o.insert)(t,i,n),s=!0},p(t,[o]){n.p(l(t,e),o)},i(t){s||((0,o.transition_in)(n),s=!0)},o(t){(0,o.transition_out)(n),s=!1},d(t){t&&(0,o.detach)(i),a[e].d(t)}}}function ln(t,e,n){let o,{manifest:i}=e,{blockumentId:s}=e;const r=Symbol("LearnComponent"),a=i.blockuments?.[s],l=i.items??{},c=a?.children[0]?.id;return ee.addManifest(r,i),Object.values(l).forEach((t=>{tt.add(t.id,(0,Q.readable)(t.initialState)),nt.add(t.id,(0,Q.readable)(t.initialVisible))})),(0,d.onMount)((()=>{tt.resetAll(),nt.resetAll()})),(0,d.onDestroy)((()=>{ee.removeManifest(r)})),t.$$set=t=>{"manifest"in t&&n(5,i=t.manifest),"blockumentId"in t&&n(0,s=t.blockumentId)},n(1,o=1===Object.keys(l).length),[s,o,a,l,c,i]}class dn extends o.SvelteComponent{constructor(t){super(),(0,o.init)(this,t,ln,an,o.safe_not_equal,{manifest:5,blockumentId:0},nn)}}const cn=dn;var un=n(2834),mn=n.n(un);const pn=((t,e={},n="div")=>o=>{const i=(0,un.useRef)(null),s=(0,un.useRef)(null),[r,a]=(0,un.useState)(!1);return(0,un.useEffect)((()=>{const e=/on([A-Z]{1,}[a-zA-Z]*)/,n=/watch([A-Z]{1,}[a-zA-Z]*)/;s.current=new t({target:i.current,props:o});const r=[];for(const t in o){const i=t.match(e),a=t.match(n);null!=i&&"function"==typeof o[t]&&s.current.$on(`${i[1][0].toLowerCase()}${i[1].slice(1)}`,o[t]),null!=a&&"function"==typeof o[t]&&r.push([`${a[1][0].toLowerCase()}${a[1].slice(1)}`,o[t]])}if(r.length>0){const t=s.current.$$.update;s.current.$$.update=function(){r.forEach((([t,e])=>{if(null!==s.current){const n=s.current.$$.props[t];e(s.current.$$.ctx[n])}})),t.apply(null)}}return()=>{null!==s.current&&s.current.$destroy()}}),[o]),(0,un.useEffect)((()=>{r?null!==s.current&&s.current.$set(o):a(!0)}),[o,r]),mn().createElement(n,{ref:i,style:e})})(cn),hn=t=>mn().createElement(pn,{...t})}}]);
//# sourceMappingURL=87cd0e44.js.map