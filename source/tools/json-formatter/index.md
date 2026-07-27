---
title: JSON 格式化工具
date: 2026-07-20 16:30:00
description: 在浏览器本地格式化、校验、搜索和编辑 JSON 数据，不会上传输入内容。
---

<style>
/* ===== Reset / Layout ===== */
.jtw{font-family:-apple-system,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif;font-size:14px}
.jtw-bar{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:10px}
.jtw-bar .sp{flex:1}
.jtw-bar button,.upbtn{height:32px;font-size:13px;border-radius:6px;border:1px solid var(--border-color,#d0d5dd);background:var(--card-bg,#fff);color:var(--text-color,#333);cursor:pointer;padding:0 12px;display:inline-flex;align-items:center;gap:4px;transition:background .15s;white-space:nowrap}
.jtw-bar button:hover,.upbtn:hover{background:var(--btn-hover-bg,#f0f2f5);border-color:var(--text-secondary,#999)}
.jtw-bar .bi{padding:0 8px;font-size:16px;line-height:1}
.upbtn{position:relative;overflow:hidden}
.upbtn input{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;cursor:pointer}
/* Search toolbar */
.jtw-srch{display:inline-flex;align-items:center;gap:6px;flex:1;max-width:340px;height:32px}
.srch-grp{display:inline-flex;border:1px solid var(--border-color,#d0d5dd);border-radius:6px;overflow:hidden;flex:1;height:100%}
.srch-grp input{flex:1;border:none;padding:0 10px;font-size:13px;background:transparent;color:inherit;outline:none;min-width:50px}
.srch-grp input:focus{outline:none}
.srch-grp button{border:none;border-left:1px solid var(--border-color,#d0d5dd);background:var(--label-bg,#f7f8fa);cursor:pointer;padding:0 10px;font-size:12px;color:var(--text-color,#333);white-space:nowrap;transition:background .15s}
.srch-grp button:hover{background:var(--btn-hover-bg,#f0f2f5)}
.srch-nav{display:inline-flex;align-items:center;gap:2px}
.srch-nav button{border:1px solid var(--border-color,#d0d5dd);border-radius:5px;background:none;cursor:pointer;padding:0 6px;font-size:11px;color:var(--text-color,#333);line-height:28px;transition:background .15s}
.srch-nav button:hover{background:var(--btn-hover-bg,#f0f2f5)}
.jtw-srch .cnt{font-size:11px;color:var(--text-secondary,#999);white-space:nowrap;min-width:30px;text-align:center}

/* ===== Panels ===== */
.jtw-body{display:flex;gap:12px}
.jtw-pane{flex:1;display:flex;flex-direction:column;border:1px solid var(--border-color,#d0d5dd);border-radius:8px;overflow:hidden;background:var(--card-bg,#fff)}
.jtw-pl{padding:5px 12px;font-size:12px;font-weight:600;color:var(--text-secondary,#666);background:var(--label-bg,#f7f8fa);border-bottom:1px solid var(--border-color,#d0d5dd);user-select:none;flex-shrink:0;display:flex;justify-content:space-between;align-items:center}
.jtw-pl .ha{display:flex;gap:4px;align-items:center}
.jtw-pl .ha button{background:none;border:1px solid transparent;border-radius:4px;cursor:pointer;font-size:14px;padding:2px 6px;color:var(--text-secondary,#888);line-height:1}
.jtw-pl .ha button:hover{border-color:var(--border-color,#d0d5dd);background:var(--btn-hover-bg,#f0f2f5);color:var(--text-color,#333)}
.jtw-pane textarea{flex:1;resize:none;border:none;padding:10px;font-family:"SF Mono","Fira Code","Consolas",monospace;font-size:13px;line-height:1.6;tab-size:2;background:transparent;color:inherit;overflow:auto;min-height:300px}
.jtw-pane textarea:focus{outline:none}
.jtw-pane.drag-over{border-color:#4a90d9;box-shadow:0 0 0 2px rgba(74,144,217,.3)}

/* ===== Tree ===== */
.jtw-tree{flex:1;overflow:auto;padding:6px 0;font-family:"SF Mono","Fira Code","Consolas",monospace;font-size:13px;line-height:1.7}
.tn{display:block;white-space:nowrap}
.tni{display:inline-block;padding:1px 3px;border-radius:3px;cursor:default}
.tni:hover{background:rgba(128,128,128,.08)}
.tn-tg{display:inline-block;width:14px;cursor:pointer;user-select:none;color:#999;font-size:11px;text-align:center}
.tn-k{color:#1a73e8}
.tn-s{color:#5f6368}
.tn-vs{color:#188038}
.tn-vn{color:#e37400}
.tn-vb{color:#9334e6}
.tn-vu{color:#9334e6}
.tn-br{color:#5f6368}
.tn-cn{color:#999;font-size:12px;margin-left:4px}
.tn-ch{display:none}
.tn-ch.o{display:block}
.tn-ed{font-family:inherit;font-size:13px;line-height:inherit;border:1px solid #4a90d9;border-radius:3px;padding:0 4px;background:#fff;color:#333;outline:none;min-width:80px}
.tn-hl{background:rgba(255,200,0,.25)!important;border-radius:2px}
.tn-hc{background:rgba(255,180,0,.35)!important;border-radius:2px;outline:2px solid #ff9800}

/* ===== Toast ===== */
.jtw-tt{position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:9999;padding:8px 18px;border-radius:8px;font-size:13px;font-weight:500;pointer-events:none;opacity:0;transition:opacity .25s;box-shadow:0 2px 12px rgba(0,0,0,.12)}
.jtw-tt.s{opacity:1}
.jtw-tt.ok{background:#f0fdf4;border:1px solid #86efac;color:#166534}
.jtw-tt.er{background:#fef2f2;border:1px solid #fecaca;color:#b91c1c}
.jtw-tt.in{background:#eff6ff;border:1px solid #93c5fd;color:#1e40af}

/* ===== Modal ===== */
.jtw-mo{position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;padding:24px}
.jtw-mo.o{display:flex}
.jtw-mbx{background:var(--card-bg,#fff);border-radius:12px;width:100%;height:100%;max-width:1200px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.2)}
.jtw-mhd{padding:10px 16px;border-bottom:1px solid var(--border-color,#e0e0e0);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;font-weight:600}
.jtw-mhd button{background:none;border:none;font-size:18px;cursor:pointer;color:var(--text-color,#333);padding:4px 8px;border-radius:6px}
.jtw-mhd button:hover{background:var(--btn-hover-bg,#f0f2f5)}
.jtw-mbd{flex:1;overflow:auto;padding:6px 0}

/* ===== Dark ===== */
html[data-user-color-scheme="dark"] .jtw-pane{background:#1e1e1e;border-color:#444}
html[data-user-color-scheme="dark"] .jtw-pl{background:#2a2a2a;color:#aaa;border-bottom-color:#444}
html[data-user-color-scheme="dark"] .jtw-bar button,
html[data-user-color-scheme="dark"] .upbtn{background:#2a2a2a;border-color:#555;color:#e0e0e0}
html[data-user-color-scheme="dark"] .jtw-bar button:hover,
html[data-user-color-scheme="dark"] .upbtn:hover{background:#3a3a3a}
html[data-user-color-scheme="dark"] .srch-grp{background:#2a2a2a;border-color:#555}
html[data-user-color-scheme="dark"] .srch-grp input{background:transparent;color:#e0e0e0}
html[data-user-color-scheme="dark"] .srch-grp button{background:#333;border-color:#555;color:#e0e0e0}
html[data-user-color-scheme="dark"] .srch-grp button:hover{background:#444}
html[data-user-color-scheme="dark"] .srch-nav button{background:#2a2a2a;border-color:#555;color:#e0e0e0}
html[data-user-color-scheme="dark"] .srch-nav button:hover{background:#3a3a3a}
html[data-user-color-scheme="dark"] .jtw-tt.ok{background:#1a2e1a;border-color:#2a4a2a;color:#86efac}
html[data-user-color-scheme="dark"] .jtw-tt.er{background:#3b1a1a;border-color:#5c2a2a;color:#fca5a5}
html[data-user-color-scheme="dark"] .jtw-tt.in{background:#1e293b;border-color:#334155;color:#93c5fd}
html[data-user-color-scheme="dark"] .tn-k{color:#7cb8ff}
html[data-user-color-scheme="dark"] .tn-vs{color:#7ee07e}
html[data-user-color-scheme="dark"] .tn-vn{color:#ffb347}
html[data-user-color-scheme="dark"] .tn-vb{color:#c58aff}
html[data-user-color-scheme="dark"] .tn-vu{color:#c58aff}
html[data-user-color-scheme="dark"] .tn-s,.tn-br{color:#999}
html[data-user-color-scheme="dark"] .tn-cn{color:#666}
html[data-user-color-scheme="dark"] .tn-ed{background:#2a2a2a;color:#e0e0e0;border-color:#4a90d9}
html[data-user-color-scheme="dark"] .tn-hl{background:rgba(255,200,50,.18)!important}
html[data-user-color-scheme="dark"] .tn-hc{background:rgba(255,200,50,.3)!important;outline-color:#ffb300}
html[data-user-color-scheme="dark"] .tni:hover{background:rgba(255,255,255,.06)}
html[data-user-color-scheme="dark"] .jtw-mbx{background:#1e1e1e}
html[data-user-color-scheme="dark"] .jtw-mhd{border-color:#444}

@media(max-width:768px){
  .jtw-body{flex-direction:column;height:auto}
  .jtw-pane{min-width:0}
  .jtw-pane textarea,.jtw-tree{min-height:300px}
  .jtw-srch{order:2;flex-basis:100%;max-width:none}
  .jtw-bar .sp{display:none}
  .jtw-mo{padding:0}
  .jtw-mbx{max-height:100vh;border-radius:0}
}
@media(min-width:769px){.jtw-body{height:520px}}
</style>

{% json_tool_intro %}

<div class=jtw>
<div class=jtw-bar>
  <label class=upbtn><span>📂 上传</span><input type=file accept=".json,application/json" id=f></label>
  <button id=bf>格式化</button>
  <button id=bv>校验</button>
  <button id=bc>复制</button>
  <button class=bi id=bd title="下载" aria-label="下载格式化后的 JSON">⬇</button>
  <button class=bi id=bx title="清空" aria-label="清空输入和输出">✕</button>
  <span class=sp></span>
  <span class=jtw-srch>
    <span class=srch-grp>
      <input type=text id=si placeholder="搜索…" aria-label="搜索 JSON 键或值">
      <button id=sb>搜索</button>
    </span>
    <span class=srch-nav>
      <button id=sp style="display:none" aria-label="上一个搜索结果">▲</button>
      <button id=sn style="display:none" aria-label="下一个搜索结果">▼</button>
      <span class=cnt id=sc></span>
    </span>
  </span>
  <span id=sz style="font-size:11px;color:var(--text-secondary,#999)"></span>
</div>

<div class=jtw-body>
  <div class=jtw-pane id=ip>
    <div class=jtw-pl><span>输入</span></div>
    <textarea id=ta placeholder="粘贴 JSON 或拖入 .json 文件…" spellcheck=false aria-label="JSON 输入"></textarea>
  </div>
  <div class=jtw-pane>
    <div class=jtw-pl><span>输出</span><span class=ha><button id=bex title="全屏" aria-label="全屏查看 JSON 树">⛶</button></span></div>
    <div class=jtw-tree id=tr><span style="color:var(--text-secondary,#999);padding:10px">等待输入…</span></div>
  </div>
</div>
</div>

<div class=jtw-tt id=tt></div>

<div class=jtw-mo id=mo>
  <div class=jtw-mbx>
    <div class=jtw-mhd><span>JSON 树形视图</span><button id=mbc aria-label="关闭全屏视图">✕</button></div>
    <div class=jtw-mbd id=mb></div>
  </div>
</div>

<script>
(function(){
'use strict';
var $=function(id){return document.getElementById(id)};
var ta=$('ta'), tr=$('tr'), tt=$('tt');
var fi=$('f'), sz=$('sz'), mo=$('mo'), mb=$('mb');
var si=$('si'), sc=$('sc');
var root=null, sq='', mz=[], mi=-1;

function t(m,c){tt.textContent=m;tt.className='jtw-tt '+c+' s';if(window._tt)clearTimeout(window._tt);window._tt=setTimeout(function(){tt.classList.remove('s')},2500);}

function di(t){var ls=t.split('\n');for(var i=1;i<Math.min(ls.length,20);i++){var m=ls[i].match(/^(\s+)\S/);if(m){var s=m[1];if(s.indexOf('\t')===0)return'\t';if(s.length===4)return'    ';return'  '}}return'  ';}
function us(){sz.textContent=(ta.value.length?ta.value.length<1024?ta.value.length+' B':(ta.value.length/1024).toFixed(1)+' KB':'')+'';}

// Upload
fi.addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(ev){ta.value=ev.target.result;us();t('已加载 '+f.name,'in');af()};r.onerror=function(){t('文件读取失败','er')};r.readAsText(f);});
// Drag-drop
ta.addEventListener('dragover',function(e){e.preventDefault();$('ip').classList.add('drag-over')});
ta.addEventListener('dragleave',function(){$('ip').classList.remove('drag-over')});
ta.addEventListener('drop',function(e){e.preventDefault();$('ip').classList.remove('drag-over');var f=e.dataTransfer.files[0];if(!f||(!f.name.endsWith('.json')&&f.type!=='application/json')){t('仅支持 .json 文件','er');return}var r=new FileReader();r.onload=function(ev){ta.value=ev.target.result;us();t('已加载 '+f.name,'in');af()};r.readAsText(f);});
$('ip').addEventListener('dragover',function(e){e.preventDefault();this.classList.add('drag-over')});
$('ip').addEventListener('dragleave',function(){this.classList.remove('drag-over')});
$('ip').addEventListener('drop',function(e){e.preventDefault();this.classList.remove('drag-over');var f=e.dataTransfer.files[0];if(!f||(!f.name.endsWith('.json')&&f.type!=='application/json')){t('仅支持 .json 文件','er');return}var r=new FileReader();r.onload=function(ev){ta.value=ev.target.result;us();t('已加载 '+f.name,'in');af()};r.readAsText(f);});

// Tree data model
function bn(k,v){var n={key:k,c:true};if(v===null){n.t='u';n.v=null}else if(typeof v==='boolean'){n.t='b';n.v=v}else if(typeof v==='number'){n.t='n';n.v=v}else if(typeof v==='string'){n.t='s';n.v=v}else if(Array.isArray(v)){n.t='a';n.v=v;n.l=v.length;n.x=v.map(function(x,i){return bn(i,x)})}else{n.t='o';n.v=v;var ks=Object.keys(v);n.l=ks.length;n.x=ks.map(function(k){return bn(k,v[k])})}return n;}
function n2v(n){if(n.t==='u')return null;if(n.t==='b'||n.t==='n'||n.t==='s')return n.v;if(n.t==='a')return n.x.map(function(c){return n2v(c)});var o={};n.x.forEach(function(c){o[c.key]=n2v(c)});return o;}

// Render tree
function rt(n,el){el.innerHTML='';if(!n){el.innerHTML='<span style="color:var(--text-secondary,#999);padding:10px">等待输入…</span>';return}rn(n,el,0);}
function rn(n,el,d){
  var l=document.createElement('div');l.className='tn';
  var i=document.createElement('span');i.className='tni';i.style.paddingLeft=(d*20+4)+'px';l.appendChild(i);
  if(n.t==='o'||n.t==='a'){
    var tg=document.createElement('span');tg.className='tn-tg';tg.textContent=n.c?'▶':'▼';
    tg.onclick=function(e){e.stopPropagation();n.c=!n.c;rt(root,tr);if(mo.classList.contains('o')){mb.innerHTML='';rn(root,mb,0)};if(sq)se()};
    i.appendChild(tg);
    var ks=document.createElement('span');ks.className='tn-k';ks.textContent=typeof n.key==='number'?n.key:'"'+n.key+'"';i.appendChild(ks);
    var sp=document.createElement('span');sp.className='tn-s';sp.textContent=': ';i.appendChild(sp);
    var bk=document.createElement('span');bk.className='tn-br';bk.textContent=n.t==='o'?'{':'[';i.appendChild(bk);
    if(n.c){var ct=document.createElement('span');ct.className='tn-cn';ct.textContent=n.t==='o'?n.l+' keys':n.l+' items';i.appendChild(ct);var bk2=document.createElement('span');bk2.className='tn-br';bk2.textContent=n.t==='o'?'}':']';i.appendChild(bk2);}
    el.appendChild(l);
    if(!n.c){var ch=document.createElement('div');ch.className='tn-ch o';n.x.forEach(function(c){rn(c,ch,d+1)});el.appendChild(ch);var cl=document.createElement('div');cl.className='tn';var ci=document.createElement('span');ci.className='tni';ci.style.paddingLeft=(d*20+4)+'px';var bk3=document.createElement('span');bk3.className='tn-br';bk3.textContent=n.t==='o'?'}':']';ci.appendChild(bk3);cl.appendChild(ci);el.appendChild(cl);}
  }else{
    var ks2=document.createElement('span');ks2.className='tn-k';ks2.textContent=typeof n.key==='number'?n.key:'"'+n.key+'"';i.appendChild(ks2);
    var sp2=document.createElement('span');sp2.className='tn-s';sp2.textContent=': ';i.appendChild(sp2);
    var vs=document.createElement('span');vs.className='tn-v'+n.t;vs.textContent=n.t==='s'?'"'+n.v+'"':n.t==='u'?'null':String(n.v);i.appendChild(vs);
    vs.ondblclick=function(e){e.stopPropagation();ed(n,vs)};el.appendChild(l);
  }
}

// Edit
function ed(n,sp){
  if(n.t==='u')return;
  var inp=document.createElement('input');inp.className='tn-ed';inp.type='text';inp.value=n.t==='s'?n.v:String(n.v);inp.style.width=Math.max(12,String(n.v).length+2)+'ch';
  function sv(){var v=inp.value.trim();if(v==='null'){n.t='u';n.v=null}else if(v==='true'){n.t='b';n.v=true}else if(v==='false'){n.t='b';n.v=false}else if(/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(v)){n.t='n';n.v=parseFloat(v)}else{n.t='s';n.v=v}rt(root,tr);}
  inp.addEventListener('blur',function(){sv()});
  inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sv()}if(e.key==='Escape'){e.preventDefault();rt(root,tr)}});
  sp.parentNode.replaceChild(inp,sp);inp.focus();inp.select();
}

// Search
function se(){
  sq=si.value;cl();
  if(!sq.trim()){sc.textContent='';return}
  var q=sq.toLowerCase();
  // Walk tree, expand collapsed ancestors of matches
  (function w(n){if(!n)return 0;var m=0;if(String(n.key).toLowerCase().indexOf(q)!==-1)m++;if(n.t==='o'||n.t==='a'){var cm=0;n.x.forEach(function(c){cm+=w(c)});m+=cm;if(m>0&&n.c)n.c=false}else{if(String(n.v).toLowerCase().indexOf(q)!==-1)m++}return m})(root);
  rt(root,tr);if(mo.classList.contains('o')){mb.innerHTML='';rn(root,mb,0)}
  // Collect matches from active container only
  var cx=mo.classList.contains('o')?mb:tr;mz=[];cx.querySelectorAll('.tni').forEach(function(e){if(e.textContent.toLowerCase().indexOf(q)!==-1){e.classList.add('tn-hl');mz.push(e)}else{e.classList.remove('tn-hl')}});
  if(mz.length>0){sc.textContent='1/'+mz.length;$('sp').style.display='inline-block';$('sn').style.display='inline-block';mi=0;gm()}
  else{sc.textContent='0/0';$('sp').style.display='none';$('sn').style.display='none';mi=-1}
}
function cl(){document.querySelectorAll('.tn-hl,.tn-hc').forEach(function(e){e.classList.remove('tn-hl','tn-hc')});mz=[];mi=-1;$('sp').style.display='none';$('sn').style.display='none';}
function gm(){document.querySelectorAll('.tn-hc').forEach(function(e){e.classList.remove('tn-hc')});if(mi>=0&&mi<mz.length){mz[mi].classList.add('tn-hc');mz[mi].scrollIntoView({block:'nearest',behavior:'smooth'});sc.textContent=(mi+1)+'/'+mz.length}}
function nm(d){if(mz.length===0)return;mi=(mi+d+mz.length)%mz.length;gm()}

$('sb').addEventListener('click',se);
si.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();se()}});
$('sp').addEventListener('click',function(){nm(-1)});
$('sn').addEventListener('click',function(){nm(1)});

// Actions
function fmt(){var x=ta.value.trim();if(!x){t('请先输入 JSON','er');return}try{var d=JSON.parse(x);root=bn('root',d);rt(root,tr);t('格式化完成','ok');sq='';sc.textContent='';cl()}catch(e){re(e)}}
function val(){var x=ta.value.trim();if(!x){t('请先输入 JSON','er');return}try{JSON.parse(x);t('JSON 格式正确 ('+(x.length<1024?x.length+' B':(x.length/1024).toFixed(1)+' KB')+')','ok')}catch(e){re(e)}}
function re(e){var m=(e.message||'JSON 解析失败').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');root=null;rt(null,tr);sq='';sc.textContent='';cl();t(m,'er');}
function gj(){if(!root)return null;try{return JSON.stringify(n2v(root),null,di(ta.value))}catch(e){return null}}
function cp(){var j=gj();if(!j){t('没有可复制的内容','er');return}navigator.clipboard.writeText(j).then(function(){t('已复制到剪贴板','ok')}).catch(function(){var x=document.createElement('textarea');x.value=j;document.body.appendChild(x);x.select();document.execCommand('copy');document.body.removeChild(x);t('已复制到剪贴板','ok')});}
function dl(){var j=gj();if(!j){t('没有可下载的内容','er');return}var b=new Blob([j],{type:'application/json'}),u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download='formatted.json';document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(u);t('已下载 formatted.json','ok');}
function bx(){ta.value='';root=null;rt(null,tr);sq='';sc.textContent='';cl();sz.textContent='';t('已清空','in');ta.focus()}
function om(){if(!root){t('没有内容可展示','er');return}mb.innerHTML='';rn(root,mb,0);mo.classList.add('o');if(sq&&sq.trim()){var q=sq.toLowerCase();mb.querySelectorAll('.tni').forEach(function(el){if(el.textContent.toLowerCase().indexOf(q)!==-1)el.classList.add('tn-hl')})}}
function cm(){mo.classList.remove('o')}
mo.addEventListener('click',function(e){if(e.target===mo)cm()});

$('bf').addEventListener('click',fmt);$('bv').addEventListener('click',val);
$('bc').addEventListener('click',cp);$('bd').addEventListener('click',dl);
$('bx').addEventListener('click',bx);$('bex').addEventListener('click',om);
$('mbc').addEventListener('click',cm);

// Auto-format
var at=null;
function af(){if(at)clearTimeout(at);at=setTimeout(function(){var t=ta.value.trim();us();if(!t){root=null;rt(null,tr);sq='';sc.textContent='';cl();return}try{var d=JSON.parse(t);root=bn('root',d);rt(root,tr)}catch(e){}},600);}

ta.addEventListener('input',function(){us();af()});
ta.addEventListener('keydown',function(e){if(e.key==='Tab'){e.preventDefault();var s=this.selectionStart,en=this.selectionEnd;this.value=this.value.substring(0,s)+'  '+this.value.substring(en);this.selectionStart=this.selectionEnd=s+2}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();fmt()}});
})();
</script>



