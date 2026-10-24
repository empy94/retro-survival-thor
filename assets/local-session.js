(function(){'use strict';
 const local=location.origin==='https://thor-local.invalid';
 Object.defineProperty(window,'thorSession',{value:Object.freeze({local}),writable:false,configurable:false});
 if(!local)return;
 // The session control shows the mode without covering the playfield.
 const style=document.createElement("style");style.textContent=".unofficial-host-banner{display:none!important}";document.head.append(style);
 // Runs in the first script of the local document, before any native game code.
 const allowed=input=>{try{const u=new URL(typeof input==='string'?input:input.url,location.href);return u.origin===location.origin&&(u.pathname.startsWith('/assets/')||u.pathname.startsWith('/_next/static/'));}catch{return false;}};
 const reject=()=>new DOMException('Mode local : réseau bloqué','SecurityError');
 const originalFetch=window.fetch.bind(window);
 window.fetch=(input,options)=>allowed(input)&&(!options?.method||['GET','HEAD'].includes(options.method.toUpperCase()))?originalFetch(input,options):Promise.reject(reject());
 const open=XMLHttpRequest.prototype.open;
 XMLHttpRequest.prototype.open=function(method,url,...rest){if(!['GET','HEAD'].includes(String(method).toUpperCase())||!allowed(String(url)))throw reject();return open.call(this,method,url,...rest);};
 navigator.sendBeacon=()=>false;
 for(const name of ['WebSocket','EventSource','Worker','SharedWorker','RTCPeerConnection','webkitRTCPeerConnection'])if(name in window)window[name]=function(){throw reject();};
 if(navigator.serviceWorker)navigator.serviceWorker.register=()=>Promise.reject(reject());
 const seed=window.thorLocalSeed,revision=window.thorLocalSeedRevision;
 const key='retro-survival.progress.v1',revisionKey='thor.local.seed-revision';
 if(seed&&typeof seed==='object'&&!Array.isArray(seed)&&seed.waveRecords&&typeof seed.waveRecords==='object'&&!Array.isArray(seed.waveRecords)){
  const existing=localStorage.getItem(key);
  if(typeof revision==='string'&&revision&&revision!==localStorage.getItem(revisionKey)){
   const preferenceKeys=['retro-survival.settings.v1','retro-survival.character-genders.v1','retro-survival.character-colors.v1'];
   const preferences=preferenceKeys.map(name=>[name,localStorage.getItem(name)]).filter(([,value])=>value!==null);
   // A new session starts clean: no progression, pending scores or checkpoints survive.
   localStorage.clear();
   sessionStorage.clear();
   for(const [name,value] of preferences)localStorage.setItem(name,value);
   localStorage.setItem(key,JSON.stringify(seed));
   localStorage.setItem(revisionKey,revision);
  }else if(!existing)localStorage.setItem(key,JSON.stringify(seed));
 }
 delete window.thorLocalSeed;
 delete window.thorLocalSeedRevision;
})();
