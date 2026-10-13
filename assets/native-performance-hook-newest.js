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
;(function(){for(const id of ['shovelJudgment', 'slaughteringShovel', 'shovelKiss', 'mound', 'animatedChest', 'shovelThrow', 'corruption']){if(!KN.includes(id))KN.push(id);}})();


/* Upgrade offers only contain abilities of the current native class. */
;yN=e=>Object.fromEntries(U(e.levelId).abilities.map(id=>[id,vN(e,id)]));
;wN=e=>Object.fromEntries(U(e.levelId).abilities.map(id=>[id,CN(e,id)]));

/* Change raster resolution only; world coordinates, simulation and input stay native. */
;(function(){
 const original=JB;
 let quality=['full','balanced','minimal'].includes(window.thorGraphicsQuality)?window.thorGraphicsQuality:'balanced';
 const limits=()=>quality==='full'?[2,2]:quality==='minimal'?[.75,.75]:[.75,1];
 const combat=state=>['playing','dying','gameover'].includes(state?.phase);
 window.thorRenderScale=2;
 let frames=0,elapsed=0,last=null,fastWindows=0,ratio=limits()[1],fps=0,measuring=window.thorGraphicsActive!==false;
 const resetTiming=()=>{frames=0;elapsed=0;last=null;fps=0;fastWindows=0;};
 window.thorGraphics={configure(value){if(!['full','balanced','minimal'].includes(value)||value===quality)return;quality=value;ratio=limits()[1];resetTiming();},setActive(value){const next=value===true;if(next!==measuring){measuring=next;resetTiming();}},status(){return {quality,resolutionScale:ratio,observedFps:fps};}};
 window.thorVisualParticles=state=>{
  if(!combat(state)||quality==='full')return state.particles;
  const budget=quality==='minimal'?0:64,markers=[],decor=[];
  for(const particle of state.particles){if(particle.vx===0&&particle.vy===0&&particle.size>=12)markers.push(particle);else decor.push(particle);}
  return markers.concat(budget?decor.slice(-budget):[]);
 };
 let hudStamp='';
 window.thorHudChanged=state=>{const stamp=[state.player.hp,state.player.maxHp,state.kamas,state.level,state.wave,state.phase].join(':');if(stamp===hudStamp)return false;hudStamp=stamp;return true;};
 window.thorHudInterval=state=>combat(state)&&quality!=='full'?.2:.08;
 const cosmetic=new Set(['fecaNaturalSpark','fecaBubbleParticle','fecaFlamicheSmoke','sramTrapSpark','sramRepulsiveSpark','sramFearMote','sramPoisonPuff','sramChakraStem','enutrofCoinParticle']);
 window.thorDecorativeBlur=value=>combat(window.thorNativeContext?.gameRef.current)&&quality!=='full'?0:value;
 window.thorHideCosmeticClip=(id,state)=>combat(state)&&quality==='minimal'&&cosmetic.has(id);
 JB=(...args)=>{const api=original(...args),draw=api.renderGame,canvas=args[1],viewport=args[4],paused=args[0].pausedRef;
 api.renderGame=state=>{
  const now=performance.now();
  if(measuring&&state.phase==='playing'&&!paused.current&&!(typeof document==='object'&&document.hidden)){
   if(last!==null&&Number.isFinite(now-last)&&now>last){elapsed+=now-last;frames++;}
   last=now;
   if(elapsed>=1000&&frames>0){fps=frames*1000/elapsed;
    if(fps<58){ratio=Math.max(limits()[0],ratio-.25);fastWindows=0;}
    else if(fps>58&&state.enemies.length+state.osamodas.summons.length<40){if(++fastWindows>=5){ratio=Math.min(limits()[1],ratio+.25);fastWindows=0;}}
    else fastWindows=0;
    frames=0;elapsed=0;
   }
  }else resetTiming();
  window.thorRenderScale=combat(state)?ratio:2;
  const scale=Math.min(devicePixelRatio,window.thorRenderScale),width=Math.max(1,Math.round(viewport.width*scale)),height=Math.max(1,Math.round(viewport.height*scale));
  if(canvas.width!==width)canvas.width=width;
  if(canvas.height!==height)canvas.height=height;
  return draw(state);
 };
 return api;
 };
 if(typeof document==='object')document.addEventListener('visibilitychange',resetTiming);
 window.thorPerformanceStatus=()=>window.thorGraphics.status();
})();

/* Preserve native reachability, marks and tie ordering without two temporary arrays. */
;vj=(state,summon)=>{
 const contact=BA[summon.kind].contact+jj,pull=X.markPull;
 let nearest,nearestDistance=Infinity,marked,markedDistance=pull;
 let hasPreferred=false,reachableNearest,reachableDistance=Infinity,reachableMarked,reachableMarkedDistance=pull;
 for(const enemy of state.enemies){
  if(!tj(enemy))continue;
  const distance=Math.hypot(enemy.x-summon.x,enemy.y-summon.y);
  const preferred=distance<=enemy.r+contact||_b(state,enemy);
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
