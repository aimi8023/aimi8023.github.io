---
title: 图片压缩与转换
layout: page
date: 2026-07-27 23:10:00
description: 在浏览器本地批量转换、压缩和缩放 JPG、PNG 与 WebP 图片，文件不会上传。
---

<style>
.ict{--ic-border:var(--aimi-line,#ddd6c9);--ic-paper:var(--aimi-paper,#fffdf7);--ic-ink:var(--aimi-ink,#24282c);--ic-muted:var(--aimi-muted,#6c706f);--ic-teal:var(--aimi-teal,#176c70);--ic-coral:var(--aimi-coral,#b34f5f);color:var(--ic-ink);font-size:14px}
.ict *{box-sizing:border-box}
.ict button,.ict input,.ict select{font:inherit}
.ic-local{display:flex;align-items:center;margin-bottom:1rem;padding:.9rem 1rem;border:1px solid #b9d5d2;border-radius:7px;background:#e8f3f1;gap:.75rem}
.ic-local-mark{display:grid;place-items:center;flex:0 0 2rem;height:2rem;border-radius:50%;color:#fff;background:var(--ic-teal);font-weight:800}
.ic-local strong{display:block;color:var(--ic-teal);font-size:.76rem;letter-spacing:.04em}
.ic-local p{margin:.08rem 0 0!important;color:#4f6e6c;font-size:.76rem}
.ic-drop{display:grid;place-items:center;min-height:190px;padding:2rem;border:2px dashed #9ebebc;border-radius:9px;background:linear-gradient(145deg,rgba(219,236,235,.56),rgba(255,253,247,.75));cursor:pointer;text-align:center;transition:border-color .15s,background .15s,transform .15s}
.ic-drop:hover,.ic-drop.drag{transform:translateY(-1px);border-color:var(--ic-teal);background:#e9f4f2}
.ic-drop:focus-visible{outline:3px solid var(--ic-coral);outline-offset:3px}
.ic-drop-icon{display:grid;place-items:center;width:3.5rem;height:3.5rem;margin-bottom:.85rem;border-radius:8px;color:#fff;background:var(--ic-coral);font-family:"SFMono-Regular",Consolas,monospace;font-size:.78rem;font-weight:800;letter-spacing:.08em;box-shadow:4px 4px 0 rgba(179,79,95,.16)}
.ic-drop strong{display:block;font-size:1.05rem}
.ic-drop p{margin:.35rem 0 0!important;color:var(--ic-muted);font-size:.78rem}
.ic-drop small{display:block;margin-top:.7rem;color:#858986;font-size:.68rem}
.ic-file-input{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.ic-panel{margin-top:1rem;padding:1.15rem;border:1px solid var(--ic-border);border-radius:9px;background:var(--ic-paper);box-shadow:0 4px 0 rgba(61,57,47,.06)}
.ic-panel-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem;gap:1rem}
.ic-panel-head h2,.ic-queue-head h2{margin:0!important;color:var(--ic-ink);font-size:1rem;font-weight:760}
.ic-panel-head p,.ic-queue-head p{margin:.2rem 0 0!important;color:var(--ic-muted);font-size:.72rem}
.ic-settings{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.85rem}
.ic-field{min-width:0}
.ic-field>label,.ic-field-title{display:block;margin-bottom:.38rem;color:#505655;font-size:.68rem;font-weight:750;letter-spacing:.035em}
.ic-control{width:100%;height:38px;padding:0 .68rem;border:1px solid var(--ic-border);border-radius:6px;color:var(--ic-ink);background:var(--ic-paper);outline:none}
.ic-control:focus{border-color:var(--ic-teal);box-shadow:0 0 0 3px rgba(23,108,112,.12)}
.ic-control:disabled{cursor:not-allowed;opacity:.52}
.ic-range-row{display:grid;grid-template-columns:minmax(0,1fr) 3rem;align-items:center;height:38px;gap:.6rem}
.ic-range{width:100%;accent-color:var(--ic-teal)}
.ic-range-value{color:var(--ic-teal);font-family:"SFMono-Regular",Consolas,monospace;font-size:.72rem;font-weight:750;text-align:right}
.ic-inline-input{position:relative}
.ic-inline-input .ic-control{padding-right:2.4rem}
.ic-unit{position:absolute;top:50%;right:.7rem;color:var(--ic-muted);font-size:.68rem;transform:translateY(-50%);pointer-events:none}
.ic-size-fields{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}
.ic-color-row{display:flex;align-items:center;height:38px;padding:0 .5rem;border:1px solid var(--ic-border);border-radius:6px;gap:.55rem}
.ic-color-row input{width:30px;height:25px;padding:0;border:0;background:transparent;cursor:pointer}
.ic-color-value{color:var(--ic-muted);font-family:"SFMono-Regular",Consolas,monospace;font-size:.7rem}
.ic-field-note{margin:.35rem 0 0!important;color:var(--ic-muted);font-size:.65rem;line-height:1.5}
.ic-settings-actions{display:flex;align-items:center;justify-content:space-between;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--ic-border);gap:1rem}
.ic-settings-hint{max-width:34rem;margin:0!important;color:var(--ic-muted);font-size:.68rem;line-height:1.55}
.ic-buttons{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:.55rem}
.ic-btn{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 .9rem;border:1px solid var(--ic-border);border-radius:6px;color:var(--ic-ink);background:var(--ic-paper);cursor:pointer;font-size:.76rem;font-weight:750;transition:transform .15s,border-color .15s}
.ic-btn:hover:not(:disabled){transform:translateY(-1px);border-color:var(--ic-coral)}
.ic-btn:focus-visible{outline:3px solid rgba(179,79,95,.25);outline-offset:2px}
.ic-btn:disabled{cursor:not-allowed;opacity:.5}
.ic-btn-primary{border-color:var(--ic-teal);color:#fff;background:var(--ic-teal)}
.ic-btn-danger:hover:not(:disabled){border-color:var(--ic-coral);color:var(--ic-coral)}
.ic-queue{margin-top:1.4rem}
.ic-queue-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:.75rem;gap:1rem}
.ic-summary{color:var(--ic-teal);font-family:"SFMono-Regular",Consolas,monospace;font-size:.72rem;font-weight:750}
.ic-empty{padding:2rem;border:1px dashed var(--ic-border);border-radius:8px;color:var(--ic-muted);background:rgba(255,253,247,.45);font-size:.78rem;text-align:center}
.ic-list{display:grid;gap:.75rem}
.ic-card{display:grid;grid-template-columns:150px minmax(0,1fr) auto;overflow:hidden;border:1px solid var(--ic-border);border-radius:8px;background:var(--ic-paper);box-shadow:0 3px 0 rgba(61,57,47,.05)}
.ic-preview{position:relative;display:grid;place-items:center;min-height:142px;overflow:hidden;background:repeating-conic-gradient(#e9e7df 0 25%,#f8f6ef 0 50%) 50%/18px 18px}
.ic-preview img{display:block;width:100%;height:100%;max-height:180px;object-fit:contain;background:rgba(255,255,255,.55)}
.ic-preview-badge{position:absolute;left:.55rem;bottom:.5rem;padding:.18rem .4rem;border-radius:4px;color:#fff;background:rgba(36,40,44,.78);font-size:.62rem;font-weight:700;backdrop-filter:blur(4px)}
.ic-card-main{min-width:0;padding:1rem}
.ic-card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:.7rem}
.ic-card-name{overflow:hidden;margin:0!important;color:var(--ic-ink);font-size:.86rem;font-weight:760;text-overflow:ellipsis;white-space:nowrap}
.ic-card-original{margin:.25rem 0 0!important;color:var(--ic-muted);font-size:.68rem}
.ic-status{flex:0 0 auto;padding:.2rem .45rem;border-radius:999px;color:#65706d;background:#eff0eb;font-size:.61rem;font-weight:750}
.ic-status.processing{color:#755313;background:#fff1c9}
.ic-status.done{color:#17634f;background:#dff2e9}
.ic-status.error{color:#9a3444;background:#f7dfe3}
.ic-result{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:.85rem;border-top:1px solid var(--ic-border);border-left:1px solid var(--ic-border)}
.ic-metric{min-width:0;padding:.55rem .6rem;border-right:1px solid var(--ic-border);border-bottom:1px solid var(--ic-border)}
.ic-metric span{display:block;color:var(--ic-muted);font-size:.58rem}
.ic-metric strong{display:block;overflow:hidden;margin-top:.14rem;color:var(--ic-ink);font-family:"SFMono-Regular",Consolas,monospace;font-size:.68rem;text-overflow:ellipsis;white-space:nowrap}
.ic-metric strong.good{color:var(--ic-teal)}
.ic-warning{margin:.65rem 0 0!important;color:#9a6a18;font-size:.66rem;line-height:1.5}
.ic-error{margin:.65rem 0 0!important;color:var(--ic-coral);font-size:.68rem;line-height:1.5}
.ic-view-toggle{display:inline-flex;margin-top:.75rem;padding:2px;border:1px solid var(--ic-border);border-radius:5px}
.ic-view-toggle button{padding:.28rem .55rem;border:0;border-radius:3px;color:var(--ic-muted);background:transparent;cursor:pointer;font-size:.63rem}
.ic-view-toggle button.active{color:#fff;background:var(--ic-teal)}
.ic-card-actions{display:flex;flex-direction:column;justify-content:space-between;padding:.85rem;border-left:1px solid var(--ic-border);gap:.65rem}
.ic-card-actions .ic-btn{min-width:76px;min-height:34px;padding:0 .65rem;font-size:.68rem}
.ic-meta-note{margin-top:1rem;padding:.85rem 1rem;border-left:3px solid var(--ic-coral);color:var(--ic-muted);background:rgba(243,223,226,.45);font-size:.68rem;line-height:1.65}
.ic-toast{position:fixed;z-index:9999;top:82px;left:50%;max-width:min(90vw,520px);padding:.7rem 1rem;border:1px solid var(--ic-border);border-radius:7px;color:var(--ic-ink);background:var(--ic-paper);box-shadow:0 10px 30px rgba(0,0,0,.14);font-size:.76rem;opacity:0;pointer-events:none;transform:translate(-50%,-12px);transition:opacity .2s,transform .2s}
.ic-toast.show{opacity:1;transform:translate(-50%,0)}
.ic-toast.error{border-color:#e2a7b1;color:#9a3444;background:#fff5f6}
.ic-toast.success{border-color:#9ccbc0;color:#17634f;background:#f0faf6}
.ic-hidden{display:none!important}
html[data-user-color-scheme="dark"] .ic-local{border-color:#28575a;background:#18383a}
html[data-user-color-scheme="dark"] .ic-local p{color:#b4cfcc}
html[data-user-color-scheme="dark"] .ic-drop{border-color:#3e6867;background:linear-gradient(145deg,#18383a,#202426)}
html[data-user-color-scheme="dark"] .ic-drop:hover,html[data-user-color-scheme="dark"] .ic-drop.drag{background:#1d3b3c}
html[data-user-color-scheme="dark"] .ic-panel,html[data-user-color-scheme="dark"] .ic-card,html[data-user-color-scheme="dark"] .ic-btn,html[data-user-color-scheme="dark"] .ic-control,html[data-user-color-scheme="dark"] .ic-color-row,html[data-user-color-scheme="dark"] .ic-toast{background:#202426}
html[data-user-color-scheme="dark"] .ic-empty{background:rgba(32,36,38,.58)}
html[data-user-color-scheme="dark"] .ic-status{color:#bec5c1;background:#303638}
html[data-user-color-scheme="dark"] .ic-status.processing{color:#f4d38a;background:#4a3c20}
html[data-user-color-scheme="dark"] .ic-status.done{color:#94ddc3;background:#1d4437}
html[data-user-color-scheme="dark"] .ic-status.error{color:#f1a7b3;background:#4a2630}
html[data-user-color-scheme="dark"] .ic-meta-note{background:rgba(110,45,57,.22)}
@media(max-width:900px){.ic-settings{grid-template-columns:repeat(2,minmax(0,1fr))}.ic-card{grid-template-columns:130px minmax(0,1fr)}.ic-card-actions{grid-column:1/-1;flex-direction:row;justify-content:flex-end;border-top:1px solid var(--ic-border);border-left:0}.ic-result{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){.ic-drop{min-height:170px;padding:1.4rem}.ic-panel{padding:.9rem}.ic-settings{grid-template-columns:1fr}.ic-settings-actions,.ic-queue-head{align-items:stretch;flex-direction:column}.ic-buttons{justify-content:stretch}.ic-buttons .ic-btn{flex:1}.ic-card{grid-template-columns:1fr}.ic-preview{min-height:190px}.ic-preview img{max-height:240px}.ic-card-actions{grid-column:auto}.ic-result{grid-template-columns:repeat(2,minmax(0,1fr))}.ic-summary{text-align:left}}
</style>

{% image_tool_intro %}

<div class="ict" id="ic-tool">
  <section class="ic-local" aria-label="隐私说明">
    <span class="ic-local-mark" aria-hidden="true">✓</span>
    <div><strong>LOCAL-FIRST</strong><p>图片只在当前设备中解码和处理，不会上传到服务器。</p></div>
  </section>
  <label class="ic-drop" id="ic-drop" for="ic-files" tabindex="0">
    <input class="ic-file-input" id="ic-files" type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" multiple>
    <span class="ic-drop-icon" aria-hidden="true">IMG</span>
    <span><strong>拖拽、粘贴或选择图片</strong><p>支持 JPG、PNG、WebP，可一次选择多张图片</p><small>单张不超过 40 MB · 暂不支持动态图片</small></span>
  </label>
  <section class="ic-panel" aria-labelledby="ic-settings-title">
    <div class="ic-panel-head">
      <div><h2 id="ic-settings-title">处理设置</h2><p>设置会应用到队列中的全部图片</p></div>
    </div>
    <div class="ic-settings">
      <div class="ic-field">
        <label for="ic-format">输出格式</label>
        <select class="ic-control" id="ic-format">
          <option value="original">保持原格式</option>
          <option value="image/jpeg">JPG</option>
          <option value="image/png">PNG</option>
          <option value="image/webp">WebP</option>
        </select>
      </div>
      <div class="ic-field">
        <label for="ic-mode">压缩方式</label>
        <select class="ic-control" id="ic-mode">
          <option value="quality">按质量压缩</option>
          <option value="target">压缩到目标体积</option>
        </select>
      </div>
      <div class="ic-field" id="ic-quality-field">
        <span class="ic-field-title">输出质量</span>
        <div class="ic-range-row">
          <input class="ic-range" id="ic-quality" type="range" min="10" max="100" step="1" value="82" aria-label="输出质量">
          <output class="ic-range-value" id="ic-quality-value" for="ic-quality">82%</output>
        </div>
      </div>
      <div class="ic-field ic-hidden" id="ic-target-field">
        <label for="ic-target">目标体积</label>
        <div class="ic-inline-input">
          <input class="ic-control" id="ic-target" type="number" min="10" max="51200" step="10" value="500">
          <span class="ic-unit">KB</span>
        </div>
        <p class="ic-field-note">尽量接近，不保证严格等于</p>
      </div>
      <div class="ic-field">
        <label for="ic-resize">输出尺寸</label>
        <select class="ic-control" id="ic-resize">
          <option value="original">保持原尺寸</option>
          <option value="75">缩放至 75%</option>
          <option value="50">缩放至 50%</option>
          <option value="25">缩放至 25%</option>
          <option value="custom">限制最大尺寸</option>
        </select>
      </div>
      <div class="ic-field ic-hidden" id="ic-size-field">
        <span class="ic-field-title">最大宽度 × 高度</span>
        <div class="ic-size-fields">
          <input class="ic-control" id="ic-width" type="number" min="1" max="16384" placeholder="宽度" aria-label="最大宽度">
          <input class="ic-control" id="ic-height" type="number" min="1" max="16384" placeholder="高度" aria-label="最大高度">
        </div>
        <p class="ic-field-note">自动保持比例，不会放大小图</p>
      </div>
      <div class="ic-field ic-hidden" id="ic-bg-field">
        <span class="ic-field-title">透明区域背景</span>
        <div class="ic-color-row">
          <input id="ic-bg" type="color" value="#ffffff" aria-label="JPG 背景颜色">
          <span class="ic-color-value" id="ic-bg-value">#ffffff</span>
        </div>
      </div>
    </div>
    <div class="ic-settings-actions">
      <p class="ic-settings-hint" id="ic-settings-hint">JPG 与 WebP 支持有损质量压缩；PNG 使用无损导出。</p>
      <div class="ic-buttons">
        <button class="ic-btn ic-btn-danger" id="ic-clear" type="button" disabled>清空队列</button>
        <button class="ic-btn ic-btn-primary" id="ic-process" type="button" disabled>开始处理</button>
      </div>
    </div>
  </section>
  <section class="ic-queue" aria-labelledby="ic-queue-title">
    <div class="ic-queue-head">
      <div><h2 id="ic-queue-title">图片队列</h2><p id="ic-count">尚未添加图片</p></div>
      <span class="ic-summary" id="ic-summary"></span>
    </div>
    <div class="ic-empty" id="ic-empty">添加图片后，可在这里查看原始信息、处理结果和下载入口。</div>
    <div class="ic-list" id="ic-list"></div>
  </section>
  <aside class="ic-meta-note">
    重新编码会移除 EXIF、拍摄时间和 GPS 等元数据。动态 PNG/WebP 暂不处理，以免动画被静默转换成单帧。
  </aside>
  <div class="ic-toast" id="ic-toast" role="status" aria-live="polite"></div>
</div>

<script>
(function(){
'use strict';

var MAX_FILES=20;
var MAX_FILE_SIZE=40*1024*1024;
var MAX_PIXELS=40000000;
var MAX_SIDE=16384;
var items=[];
var nextId=1;
var busy=false;
var toastTimer=null;

function $(id){return document.getElementById(id)}
var fileInput=$('ic-files');
var drop=$('ic-drop');
var list=$('ic-list');
var empty=$('ic-empty');
var count=$('ic-count');
var summary=$('ic-summary');
var formatSelect=$('ic-format');
var modeSelect=$('ic-mode');
var qualityInput=$('ic-quality');
var qualityValue=$('ic-quality-value');
var targetInput=$('ic-target');
var resizeSelect=$('ic-resize');
var widthInput=$('ic-width');
var heightInput=$('ic-height');
var bgInput=$('ic-bg');
var bgValue=$('ic-bg-value');
var processButton=$('ic-process');
var clearButton=$('ic-clear');
var toast=$('ic-toast');

function esc(value){
  return String(value).replace(/[&<>"']/g,function(char){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]
  })
}

function formatBytes(bytes){
  if(!Number.isFinite(bytes)||bytes<0)return'—';
  if(bytes<1024)return bytes+' B';
  if(bytes<1024*1024)return(bytes/1024).toFixed(bytes<10240?1:0)+' KB';
  return(bytes/1024/1024).toFixed(bytes<10*1024*1024?2:1)+' MB'
}

function showToast(message,type){
  toast.textContent=message;
  toast.className='ic-toast '+(type||'')+' show';
  if(toastTimer)clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){toast.classList.remove('show')},2800)
}

function fileKind(file){
  var type=(file.type||'').toLowerCase();
  var name=file.name.toLowerCase();
  if(type==='image/jpeg'||/\.(jpe?g)$/.test(name))return'image/jpeg';
  if(type==='image/png'||/\.png$/.test(name))return'image/png';
  if(type==='image/webp'||/\.webp$/.test(name))return'image/webp';
  return''
}

function hasToken(bytes,token){
  var chars=token.split('').map(function(char){return char.charCodeAt(0)});
  outer:for(var i=0;i<=bytes.length-chars.length;i++){
    for(var j=0;j<chars.length;j++)if(bytes[i+j]!==chars[j])continue outer;
    return true
  }
  return false
}

async function isAnimated(file,kind){
  if(kind!=='image/png'&&kind!=='image/webp')return false;
  var buffer=await file.slice(0,Math.min(file.size,1024*1024)).arrayBuffer();
  var bytes=new Uint8Array(buffer);
  return kind==='image/png'?hasToken(bytes,'acTL'):hasToken(bytes,'ANIM')||hasToken(bytes,'ANMF')
}

function decodeWithImage(file){
  return new Promise(function(resolve,reject){
    var url=URL.createObjectURL(file);
    var image=new Image();
    image.onload=function(){
      resolve({source:image,width:image.naturalWidth,height:image.naturalHeight,dispose:function(){URL.revokeObjectURL(url)}})
    };
    image.onerror=function(){URL.revokeObjectURL(url);reject(new Error('浏览器无法解码这张图片'))};
    image.src=url
  })
}

async function decodeFile(file){
  if('createImageBitmap'in window){
    try{
      var bitmap;
      try{bitmap=await createImageBitmap(file,{imageOrientation:'from-image'})}
      catch(error){bitmap=await createImageBitmap(file)}
      return{source:bitmap,width:bitmap.width,height:bitmap.height,dispose:function(){if(bitmap.close)bitmap.close()}}
    }catch(error){}
  }
  return decodeWithImage(file)
}

function cleanupResult(item){
  if(item.resultUrl)URL.revokeObjectURL(item.resultUrl);
  item.resultUrl='';
  item.resultBlob=null;
  item.result=null
}

function cleanupItem(item){
  cleanupResult(item);
  if(item.originalUrl)URL.revokeObjectURL(item.originalUrl)
}

async function addFiles(fileList){
  if(busy)return;
  var incoming=Array.prototype.slice.call(fileList||[]);
  if(!incoming.length)return;
  var available=MAX_FILES-items.length;
  if(available<=0){showToast('队列最多放置 '+MAX_FILES+' 张图片','error');return}
  if(incoming.length>available){
    incoming=incoming.slice(0,available);
    showToast('已达到队列上限，仅添加前 '+available+' 张','error')
  }
  var added=0;
  for(var i=0;i<incoming.length;i++){
    var file=incoming[i];
    var kind=fileKind(file);
    if(!kind){showToast(file.name+'：仅支持 JPG、PNG、WebP','error');continue}
    if(file.size>MAX_FILE_SIZE){showToast(file.name+'：文件超过 40 MB','error');continue}
    try{
      if(await isAnimated(file,kind)){showToast(file.name+'：暂不支持动态图片','error');continue}
      var decoded=await decodeFile(file);
      if(!decoded.width||!decoded.height){
        decoded.dispose();
        throw new Error('无法读取图片尺寸');
      }
      var item={
        id:nextId++,
        file:file,
        kind:kind,
        name:file.name,
        size:file.size,
        width:decoded.width,
        height:decoded.height,
        originalUrl:URL.createObjectURL(file),
        resultUrl:'',
        resultBlob:null,
        result:null,
        preview:'original',
        status:'ready',
        error:''
      };
      decoded.dispose();
      items.push(item);
      added++
    }catch(error){
      showToast(file.name+'：'+(error.message||'读取失败'),'error')
    }
    render()
  }
  fileInput.value='';
  if(added)showToast('已添加 '+added+' 张图片','success')
}

function outputMime(item,settings){
  return settings.format==='original'?item.kind:settings.format
}

function outputExtension(mime){
  if(mime==='image/jpeg')return'jpg';
  if(mime==='image/webp')return'webp';
  return'png'
}

function outputName(item,mime){
  var base=item.name.replace(/\.[^.]+$/,'')||'image';
  return base+'-optimized.'+outputExtension(mime)
}

function dimensionsFor(item,settings){
  var scale=1;
  if(settings.resize!=='original'&&settings.resize!=='custom')scale=Number(settings.resize)/100;
  if(settings.resize==='custom'){
    var maxWidth=settings.maxWidth||Infinity;
    var maxHeight=settings.maxHeight||Infinity;
    scale=Math.min(1,maxWidth/item.width,maxHeight/item.height)
  }
  var width=Math.max(1,Math.round(item.width*scale));
  var height=Math.max(1,Math.round(item.height*scale));
  if(width>MAX_SIDE||height>MAX_SIDE||width*height>MAX_PIXELS){
    throw new Error('输出尺寸过大，请缩小到 4000 万像素以内')
  }
  return{width:width,height:height}
}

function encodeCanvas(canvas,mime,quality){
  return new Promise(function(resolve,reject){
    canvas.toBlob(function(blob){
      if(!blob){reject(new Error('图片编码失败'));return}
      if(blob.type&&blob.type!==mime){
        reject(new Error('当前浏览器不支持导出 '+outputExtension(mime).toUpperCase()));
        return
      }
      resolve(blob)
    },mime,quality)
  })
}

async function encodeTarget(canvas,mime,targetBytes,maxQuality){
  var minimum=0.1;
  var lowBlob=await encodeCanvas(canvas,mime,minimum);
  if(lowBlob.size>targetBytes){
    return{blob:lowBlob,quality:minimum,met:false}
  }
  var highBlob=await encodeCanvas(canvas,mime,maxQuality);
  if(highBlob.size<=targetBytes){
    return{blob:highBlob,quality:maxQuality,met:true}
  }
  var low=minimum;
  var high=maxQuality;
  var bestBlob=lowBlob;
  var bestQuality=minimum;
  for(var i=0;i<8;i++){
    var mid=(low+high)/2;
    var blob=await encodeCanvas(canvas,mime,mid);
    if(blob.size<=targetBytes){
      bestBlob=blob;
      bestQuality=mid;
      low=mid
    }else{
      high=mid
    }
  }
  return{blob:bestBlob,quality:bestQuality,met:true}
}

async function processItem(item,settings){
  cleanupResult(item);
  item.status='processing';
  item.error='';
  render();
  var decoded;
  var canvas;
  try{
    decoded=await decodeFile(item.file);
    var dims=dimensionsFor(item,settings);
    var mime=outputMime(item,settings);
    if(settings.mode==='target'&&mime==='image/png'){
      throw new Error('目标体积模式仅支持 JPG 或 WebP')
    }
    canvas=document.createElement('canvas');
    canvas.width=dims.width;
    canvas.height=dims.height;
    var context=canvas.getContext('2d',{alpha:mime!=='image/jpeg'});
    if(!context)throw new Error('无法创建图片处理画布');
    context.imageSmoothingEnabled=true;
    context.imageSmoothingQuality='high';
    if(mime==='image/jpeg'){
      context.fillStyle=settings.background;
      context.fillRect(0,0,dims.width,dims.height)
    }
    context.drawImage(decoded.source,0,0,dims.width,dims.height);
    var encoded;
    if(settings.mode==='target'){
      encoded=await encodeTarget(canvas,mime,settings.targetBytes,settings.quality)
    }else{
      encoded={blob:await encodeCanvas(canvas,mime,settings.quality),quality:settings.quality,met:true}
    }
    item.resultBlob=encoded.blob;
    item.resultUrl=URL.createObjectURL(encoded.blob);
    item.result={
      mime:mime,
      width:dims.width,
      height:dims.height,
      size:encoded.blob.size,
      quality:encoded.quality,
      metTarget:encoded.met,
      name:outputName(item,mime)
    };
    item.preview='result';
    item.status='done'
  }catch(error){
    item.status='error';
    item.error=error.message||'处理失败'
  }finally{
    if(decoded)decoded.dispose();
    if(canvas){canvas.width=0;canvas.height=0}
    render()
  }
}

function settingsSnapshot(){
  var maxWidth=Number(widthInput.value);
  var maxHeight=Number(heightInput.value);
  if(resizeSelect.value==='custom'&&!maxWidth&&!maxHeight){
    throw new Error('请至少填写一个最大尺寸')
  }
  var targetKB=Number(targetInput.value);
  if(modeSelect.value==='target'&&(!targetKB||targetKB<10)){
    throw new Error('目标体积不能小于 10 KB')
  }
  return{
    format:formatSelect.value,
    mode:modeSelect.value,
    quality:modeSelect.value==='target'?0.95:Number(qualityInput.value)/100,
    targetBytes:Math.round(targetKB*1024),
    resize:resizeSelect.value,
    maxWidth:maxWidth>0?maxWidth:0,
    maxHeight:maxHeight>0?maxHeight:0,
    background:bgInput.value
  }
}

async function processAll(){
  if(busy||!items.length)return;
  var settings;
  try{settings=settingsSnapshot()}
  catch(error){showToast(error.message,'error');return}
  busy=true;
  setControls();
  for(var i=0;i<items.length;i++){
    processButton.textContent='处理中 '+(i+1)+' / '+items.length;
    await processItem(items[i],settings)
  }
  busy=false;
  processButton.textContent='重新处理全部';
  setControls();
  var failed=items.filter(function(item){return item.status==='error'}).length;
  showToast(failed?'处理完成，'+failed+' 张失败':'全部图片处理完成',failed?'error':'success')
}

function savingsText(item){
  if(!item.result)return'—';
  var value=(1-item.result.size/item.size)*100;
  return(value>=0?'减少 ':'增加 ')+Math.abs(value).toFixed(1)+'%'
}

function cardMarkup(item){
  var previewUrl=item.preview==='result'&&item.resultUrl?item.resultUrl:item.originalUrl;
  var previewLabel=item.preview==='result'&&item.result?'处理后':'原图';
  var statusText={ready:'等待处理',processing:'处理中',done:'处理完成',error:'处理失败'}[item.status];
  var result=item.result;
  var metrics=result?
    '<div class="ic-result">'+
      '<div class="ic-metric"><span>输出体积</span><strong>'+formatBytes(result.size)+'</strong></div>'+
      '<div class="ic-metric"><span>体积变化</span><strong class="'+(result.size<=item.size?'good':'')+'">'+savingsText(item)+'</strong></div>'+
      '<div class="ic-metric"><span>输出尺寸</span><strong>'+result.width+' × '+result.height+'</strong></div>'+
      '<div class="ic-metric"><span>输出格式</span><strong>'+outputExtension(result.mime).toUpperCase()+'</strong></div>'+
    '</div>':'';
  var warning=result&&!result.metTarget?'<p class="ic-warning">最低质量仍高于目标体积，请同时缩小输出尺寸。</p>':'';
  var error=item.error?'<p class="ic-error">'+esc(item.error)+'</p>':'';
  var toggle=result?
    '<div class="ic-view-toggle" aria-label="预览切换">'+
      '<button type="button" data-view="original" data-id="'+item.id+'" class="'+(item.preview==='original'?'active':'')+'">原图</button>'+
      '<button type="button" data-view="result" data-id="'+item.id+'" class="'+(item.preview==='result'?'active':'')+'">处理后</button>'+
    '</div>':'';
  return'<article class="ic-card" data-card="'+item.id+'">'+
    '<div class="ic-preview"><img src="'+previewUrl+'" alt="'+esc(item.name)+' 预览"><span class="ic-preview-badge">'+previewLabel+'</span></div>'+
    '<div class="ic-card-main">'+
      '<div class="ic-card-top"><div style="min-width:0"><h3 class="ic-card-name" title="'+esc(item.name)+'">'+esc(item.name)+'</h3><p class="ic-card-original">'+item.width+' × '+item.height+' · '+formatBytes(item.size)+' · '+outputExtension(item.kind).toUpperCase()+'</p></div><span class="ic-status '+item.status+'">'+statusText+'</span></div>'+
      metrics+warning+error+toggle+
    '</div>'+
    '<div class="ic-card-actions">'+
      '<button class="ic-btn" type="button" data-download="'+item.id+'" '+(result?'':'disabled')+'>下载</button>'+
      '<button class="ic-btn ic-btn-danger" type="button" data-remove="'+item.id+'" '+(busy?'disabled':'')+'>移除</button>'+
    '</div>'+
  '</article>'
}

function render(){
  empty.classList.toggle('ic-hidden',items.length>0);
  list.innerHTML=items.map(cardMarkup).join('');
  count.textContent=items.length?items.length+' 张图片，逐张排队处理':'尚未添加图片';
  var done=items.filter(function(item){return item.result}).length;
  if(done){
    var originalTotal=items.reduce(function(sum,item){return item.result?sum+item.size:sum},0);
    var resultTotal=items.reduce(function(sum,item){return item.result?sum+item.result.size:sum},0);
    var change=(1-resultTotal/originalTotal)*100;
    summary.textContent=formatBytes(originalTotal)+' → '+formatBytes(resultTotal)+' · '+(change>=0?'减少 ':'增加 ')+Math.abs(change).toFixed(1)+'%'
  }else{
    summary.textContent=''
  }
  setControls()
}

function setControls(){
  processButton.disabled=busy||!items.length;
  clearButton.disabled=busy||!items.length;
  fileInput.disabled=busy;
  Array.prototype.forEach.call(document.querySelectorAll('.ic-control,.ic-range,#ic-bg'),function(control){
    control.disabled=busy
  })
}

function removeItem(id){
  if(busy)return;
  var index=items.findIndex(function(item){return item.id===id});
  if(index<0)return;
  cleanupItem(items[index]);
  items.splice(index,1);
  render()
}

function clearAll(){
  if(busy)return;
  items.forEach(cleanupItem);
  items=[];
  processButton.textContent='开始处理';
  render();
  showToast('队列已清空','success')
}

function downloadItem(id){
  var item=items.find(function(entry){return entry.id===id});
  if(!item||!item.resultUrl||!item.result)return;
  var anchor=document.createElement('a');
  anchor.href=item.resultUrl;
  anchor.download=item.result.name;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor)
}

function updateSettings(){
  qualityValue.textContent=qualityInput.value+'%';
  bgValue.textContent=bgInput.value;
  $('ic-quality-field').classList.toggle('ic-hidden',modeSelect.value!=='quality');
  $('ic-target-field').classList.toggle('ic-hidden',modeSelect.value!=='target');
  $('ic-size-field').classList.toggle('ic-hidden',resizeSelect.value!=='custom');
  var selected=formatSelect.value;
  $('ic-bg-field').classList.toggle('ic-hidden',selected!=='image/jpeg');
  if(modeSelect.value==='target'&&(selected==='original'||selected==='image/png')){
    var webpOption=formatSelect.querySelector('option[value="image/webp"]');
    formatSelect.value=webpOption&&!webpOption.disabled?'image/webp':'image/jpeg';
    $('ic-bg-field').classList.toggle('ic-hidden',formatSelect.value!=='image/jpeg');
    showToast('目标体积模式已切换为可调质量格式','success')
  }
  if(formatSelect.value==='image/png'){
    $('ic-settings-hint').textContent='PNG 使用无损导出，质量参数不会改变压缩程度。'
  }else if(modeSelect.value==='target'){
    $('ic-settings-hint').textContent='工具会多次编码，寻找不超过目标体积的最高可用质量。'
  }else{
    $('ic-settings-hint').textContent='JPG 与 WebP 支持有损质量压缩；PNG 使用无损导出。'
  }
}

async function detectFormat(mime){
  var canvas=document.createElement('canvas');
  canvas.width=1;canvas.height=1;
  try{
    var blob=await encodeCanvas(canvas,mime,.8);
    return blob.type===mime
  }catch(error){
    return false
  }finally{
    canvas.width=0;canvas.height=0
  }
}

async function detectCapabilities(){
  var webpSupported=await detectFormat('image/webp');
  var option=formatSelect.querySelector('option[value="image/webp"]');
  if(!webpSupported){
    option.disabled=true;
    option.textContent='WebP（当前浏览器不支持导出）';
    if(formatSelect.value==='image/webp')formatSelect.value='image/jpeg';
    updateSettings()
  }
}

fileInput.addEventListener('change',function(event){addFiles(event.target.files)});
drop.addEventListener('keydown',function(event){
  if(event.key==='Enter'||event.key===' '){event.preventDefault();fileInput.click()}
});
drop.addEventListener('dragover',function(event){event.preventDefault();drop.classList.add('drag')});
drop.addEventListener('dragleave',function(){drop.classList.remove('drag')});
drop.addEventListener('drop',function(event){
  event.preventDefault();
  drop.classList.remove('drag');
  addFiles(event.dataTransfer.files)
});
document.addEventListener('paste',function(event){
  if(busy||!event.clipboardData)return;
  var files=[];
  Array.prototype.forEach.call(event.clipboardData.items||[],function(item){
    if(item.kind==='file'&&item.type.indexOf('image/')===0){
      var file=item.getAsFile();
      if(file)files.push(file)
    }
  });
  if(files.length){event.preventDefault();addFiles(files)}
});

list.addEventListener('click',function(event){
  var remove=event.target.closest('[data-remove]');
  var download=event.target.closest('[data-download]');
  var view=event.target.closest('[data-view]');
  if(remove){removeItem(Number(remove.getAttribute('data-remove')));return}
  if(download){downloadItem(Number(download.getAttribute('data-download')));return}
  if(view){
    var item=items.find(function(entry){return entry.id===Number(view.getAttribute('data-id'))});
    if(item){item.preview=view.getAttribute('data-view');render()}
  }
});

processButton.addEventListener('click',processAll);
clearButton.addEventListener('click',clearAll);
[formatSelect,modeSelect,resizeSelect].forEach(function(control){control.addEventListener('change',updateSettings)});
qualityInput.addEventListener('input',updateSettings);
bgInput.addEventListener('input',updateSettings);
window.addEventListener('beforeunload',function(){items.forEach(cleanupItem)});

updateSettings();
render();
detectCapabilities();
})();
</script>
