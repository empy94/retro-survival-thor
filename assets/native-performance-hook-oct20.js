/* Change raster resolution only; world coordinates, simulation and input stay native. */
;(function(){
 if(window.thorGameData?.version!=='b6c21e218ffeb9e2eb14bbfc4ef25ba1237b1b8fee970709b69043f1134e4826')return;
 const original=kF;
 let quality=['full','balanced','minimal','no-spells'].includes(window.thorGraphicsQuality)?window.thorGraphicsQuality:'balanced';
 const limits=()=>quality==='full'?[2,2]:['minimal','no-spells'].includes(quality)?[.75,.75]:[.75,1];
 const combat=state=>['playing','dying','gameover'].includes(state?.phase);
 window.thorRenderScale=2;
 const paintMap=window.thorWorkCache?.mapPainter();
 window.thorDrawMap=(ctx,image,width,height)=>combat(window.thorNativeContext?.gameRef.current)&&quality!=='full'&&!!paintMap?.(ctx,image,width,height);
 let frames=0,elapsed=0,last=null,fastWindows=0,ratio=limits()[1],fps=0,lastPausedDraw=-Infinity,lastDrawQuality=null,lastDrawWidth=0,lastDrawHeight=0,measuring=window.thorGraphicsActive!==false;
 const resetTiming=()=>{frames=0;elapsed=0;last=null;fps=0;fastWindows=0;};
 window.thorGraphics={configure(value){if(!['full','balanced','minimal','no-spells'].includes(value)||value===quality)return;quality=value;ratio=limits()[1];resetTiming();},setActive(value){const next=value===true;if(next!==measuring){measuring=next;resetTiming();}},status(){return {quality,resolutionScale:ratio,observedFps:fps};}};
 window.thorVisualParticles=state=>{
  if(!combat(state)||quality==='full')return state.particles;
  const budget=['minimal','no-spells'].includes(quality)?0:64,markers=[],decor=[];
  for(const particle of state.particles){if(particle.vx===0&&particle.vy===0&&particle.size>=12)markers.push(particle);else decor.push(particle);}
  return markers.concat(budget?decor.slice(-budget):[]);
 };
 let hudStamp='';
 window.thorHudChanged=state=>{const stamp=[state.player.hp,state.player.maxHp,state.kamas,state.level,state.wave,state.phase].join(':');if(stamp===hudStamp)return false;hudStamp=stamp;return true;};
 window.thorHudInterval=state=>combat(state)&&quality!=='full'?.2:.08;
 const actorBases=window.thorGameData?.enemyDefs?Object.values(window.thorGameData.enemyDefs).flatMap(def=>Object.values(def.clips||{})).filter(id=>typeof id==='string'):[];
 const summonPrefixes=window.thorGameData?.summonDefs?Object.values(window.thorGameData.summonDefs).map(def=>def.prefix).filter(Boolean):[];
 const actorCache=new Map();
 const isActor=id=>{if(actorCache.has(id))return actorCache.get(id);const yes=id.startsWith('fighter')||actorBases.some(base=>id.startsWith(base))||summonPrefixes.some(prefix=>id.startsWith(prefix)&&/(Idle|Walk|Run|Attack|Hit|Death|Appear|Cast)/.test(id.slice(prefix.length)))||/^(enutrofBag|enutrofChest|enutrofShovel)/.test(id);actorCache.set(id,yes);return yes;};
 const cosmetic=new Set(['fecaNaturalSpark','fecaBubbleParticle','fecaFlamicheSmoke','sramTrapSpark','sramRepulsiveSpark','sramFearMote','sramPoisonPuff','sramChakraStem','enutrofCoinParticle']);
 window.thorDecorativeBlur=value=>combat(window.thorNativeContext?.gameRef.current)&&quality!=='full'?0:value;
 window.thorRenderSpellMarker=(ctx,id,x,y,scale,alpha,stretchY,stretchX,descriptor,artScale,rotation=0)=>{
  const state=window.thorNativeContext?.gameRef.current;
  if(quality!=='no-spells'||!combat(state)||!Number.isFinite(x)||!Number.isFinite(y))return false;
  const name=id.replace(/__hostile$/,'');
  const cell=/Cell$/.test(name),projectile=/(Projectile|Flight|Bolt|ReturningStaff|ThrownShovel|Needle|BeamFx|BeamTip|Arrow|Bread|Bucket|SpikeFx|Fireball|FireBall|Meteor)/.test(name);
  if(!cell&&!projectile&&(isActor(name)||/^(kama|loot|dofus|cawotte|merchant)/i.test(name)||name==='sramTrapMarker'))return false;
  const effect=cell||projectile||!!descriptor||/^(feca|sram|iop|enutrof|osamodas|dragoeuf|bwork|caniaClaw|larvaSmoke|boufton)/.test(name);
  if(!effect)return false;
  if(!cell&&!projectile)return true;
  ctx.save();ctx.globalAlpha=Math.max(.45,Math.min(1,Number.isFinite(alpha)?alpha:1));
  const danger=id.endsWith('__hostile')||/^(dragoeuf|wa|chafer|bandit|larva|boufton|scara|darkBaker|wobot)/.test(name);
  ctx.fillStyle=danger?'rgba(255,65,35,.18)':'rgba(75,190,255,.12)';ctx.strokeStyle=danger?'#ff654c':'#66d4ff';ctx.lineWidth=2;
  ctx.beginPath();
  if(cell){
   const factor=scale*artScale/(descriptor?.resolutionScale||1);
   const w=descriptor?.frameWidth?Math.abs(descriptor.frameWidth*factor*stretchX)/2:53*state.width/742/2;
   const h=descriptor?.frameHeight?Math.abs(descriptor.frameHeight*factor*stretchY)/2:27*state.height/432/2;
   ctx.moveTo(x,y-h);ctx.lineTo(x+w,y);ctx.lineTo(x,y+h);ctx.lineTo(x-w,y);ctx.closePath();
  }else if(/BeamFx$/.test(name)){const length=Math.abs((descriptor?.frameWidth||0)*scale*artScale*stretchX/(descriptor?.resolutionScale||1));ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(rotation)*length,y+Math.sin(rotation)*length);ctx.lineWidth=4;}else{ctx.arc(x,y,6,0,Math.PI*2);}
  ctx.fill();ctx.stroke();ctx.restore();return true;
 };
 window.thorHideCosmeticClip=(id,state)=>combat(state)&&quality==='minimal'&&cosmetic.has(id);
 kF=(...args)=>{const api=original(...args),draw=api.renderGame,canvas=args[1],viewport=args[4],paused=args[0].pausedRef;
 api.renderGame=state=>{
  // Keep the last image while an Android dialog covers the game. Simulation
  // and multiplayer networking remain entirely owned by the native game.
  if(!measuring)return;
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
  if(paused.current&&now-lastPausedDraw<250&&lastDrawQuality===quality&&lastDrawWidth===width&&lastDrawHeight===height)return;
  lastPausedDraw=paused.current?now:-Infinity;lastDrawQuality=quality;lastDrawWidth=width;lastDrawHeight=height;
  return draw(state);
 };
 return api;
 };
 if(typeof document==='object')document.addEventListener('visibilitychange',resetTiming);
 window.thorPerformanceStatus=()=>window.thorGraphics.status();
})();
