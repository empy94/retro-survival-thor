/* Exact audited module only. Its animation descriptors are static and callers
 * only read this registry. Io otherwise merges the entire Sufokia registry
 * once per discarded clip every 750 ms, overwhelming older Android WebViews. */
;(function(){
 if(window.thorAnimationRegistryCached)return;
 // Prefer the official mobile sprite variants and reduced appearance atlas scale.
 // Android WebView can expose desktop pointer/memory hints on a controller console.
 fs=()=>true;
 window.thorMobileAssetsEnabled=true;
 const original=hc,registries=new Map();
 hc=level=>{
   if(!['astrub','wabbit','litneg','gelee','dragoeuf'].includes(level))return original(level);
   if(!registries.has(level))registries.set(level,original(level));
   return registries.get(level);
 };
 window.thorAnimationRegistryCached=true;
})();

/* The native touch deck omits Enutrof targets, although castTouchAbility
 * accepts their vectors. Enable the same hold/move/release path as other casts. */
;(function(){for(const id of ['shovelJudgment', 'slaughteringShovel', 'shovelKiss', 'mound', 'animatedChest', 'shovelThrow', 'corruption']){if(!HN.includes(id))HN.push(id);}})();


/* Upgrade offers only contain abilities of the current native class. */
;hN=e=>Object.fromEntries(U(e.levelId).abilities.map(id=>[id,mN(e,id)]));
;bN=e=>Object.fromEntries(U(e.levelId).abilities.map(id=>[id,yN(e,id)]));

/* Change raster resolution only; world coordinates, simulation and input stay native. */
;(function(){
 const original=WB;
 window.thorRenderScale=2;
 let frames=0,elapsed=0,last=0,fastWindows=0,ratio=2,fps=60;
 WB=(...args)=>{const api=original(...args),draw=api.renderGame,canvas=args[1],viewport=args[4],paused=args[0].pausedRef;
 api.renderGame=state=>{
  const now=performance.now();
  if(state.phase==='playing'&&!paused.current){
   if(last&&now-last<250){elapsed+=now-last;frames++;}
   last=now;
   if(frames>=60){fps=frames*1000/elapsed;
    if(fps<53){ratio=Math.max(1,ratio-.25);fastWindows=0;}
    else if(fps>58&&state.enemies.length+state.osamodas.summons.length<40){if(++fastWindows>=5){ratio=Math.min(2,ratio+.25);fastWindows=0;}}
    else fastWindows=0;
    frames=0;elapsed=0;
   }
  }else{last=0;frames=0;elapsed=0;}
  window.thorRenderScale=ratio;
  const scale=Math.min(devicePixelRatio,ratio),width=Math.max(1,Math.round(viewport.width*scale)),height=Math.max(1,Math.round(viewport.height*scale));
  if(canvas.width!==width)canvas.width=width;
  if(canvas.height!==height)canvas.height=height;
  return draw(state);
 };
 return api;
 };
 window.thorPerformanceStatus=()=>({resolutionScale:ratio,observedFps:fps});
})();

/* Preserve native reachability, marks and tie ordering without two temporary arrays. */
;mj=(state,summon)=>{
 const contact=IA[summon.kind].contact+Dj,pull=X.markPull;
 let nearest,nearestDistance=Infinity,marked,markedDistance=pull;
 let hasPreferred=false,reachableNearest,reachableDistance=Infinity,reachableMarked,reachableMarkedDistance=pull;
 for(const enemy of state.enemies){
  if(!ZA(enemy))continue;
  const distance=Math.hypot(enemy.x-summon.x,enemy.y-summon.y);
  const preferred=distance<=enemy.r+contact||hb(state,enemy);
  if(distance<nearestDistance){nearest=enemy;nearestDistance=distance;}
  if((enemy.osamodasMarkTimer??0)>0&&distance<markedDistance){marked=enemy;markedDistance=distance;}
  if(preferred){
   hasPreferred=true;
   if(distance<reachableDistance){reachableNearest=enemy;reachableDistance=distance;}
   if((enemy.osamodasMarkTimer??0)>0&&distance<reachableMarkedDistance){reachableMarked=enemy;reachableMarkedDistance=distance;}
  }
 }
 return hasPreferred?(reachableMarked??reachableNearest):(marked??nearest);
};
