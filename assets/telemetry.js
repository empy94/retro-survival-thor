(function(){
 'use strict';
 const labels={'damage':'Dommages','spell-damage':'Dommages des sorts','basic-damage':'Dommages attaque','basic-speed':'Vitesse d’attaque','critical':'Critique','critical-damage':'Dégâts critiques','move-speed':'Vitesse','evasion':'Esquive','cooldown':'Vitesse récup.','effect-duration':'Durée des effets','spell-size':'Taille des sorts','experience-gain':'XP reçue','prospection':'Prospection'};
 const slots={hat:'Coiffe',cape:'Cape',amulet:'Amulette',weapon:'Arme',shield:'Bouclier',belt:'Ceinture',boots:'Bottes',ring:'Anneaux',dofus:'Dofus'};
 let liveRef=null,liveCanvas=null,abilityCache=null,abilityAt=0;
 const text=value=>window.thorLocale?.text(value)||value;
 // Read the mounted React tree, including the current side of double buffering.
 // No game state, score, inventory or input is written by this observer.
 function state(){
   const canvas=document.querySelector('canvas');if(!canvas)return {};
   let root=canvas[Object.keys(canvas).find(k=>k.startsWith('__reactFiber'))];
   while(root?.return)root=root.return;
   root=root?.stateNode?.current;if(!root)return {};
   let live=null,hud=null,count=0;const stack=[root];
   while(stack.length&&count++<2500){const f=stack.pop();if(f.sibling)stack.push(f.sibling);if(f.child)stack.push(f.child);
     let h=f.memoizedState;
     for(let i=0;h&&i<120;i++,h=h.next){const s=h.memoizedState;
       if(s?.current?.player&&s.current.equipment){live=s.current;liveRef=s;liveCanvas=canvas;}
       if(s?.statBreakdowns&&s.equipment)hud=s;
     }
   }
   return {live,hud};
 }
 window.thorDashboard={
 character(){this.playerPosition();return window.thorSpellPolicy?.classFor(liveRef?.current?.levelId);},
 combatState(includeTargets=true){
   if(!this.playerPosition())return null;
   const s=liveRef.current,p=s.player;
   const copy=(o,keys)=>Object.fromEntries(keys.map(k=>[k,Number(o?.[k])||0]));
   return {character:window.thorSpellPolicy?.classFor(s.levelId),phase:s.phase,width:s.width,height:s.height,player:copy(p,['x','y','hp','maxHp','rollTimer','hurtTimer','shieldTimer','speedBoostTimer','teleportReturnTimer','teleportReturnX','teleportReturnY']),
     busy:!!s.wabbitTravel||(s.wabbitPlayerArrival||0)>0||[s.characterCastTimer,s.glyphCastTimer,s.shieldCastTimer,s.speedCastTimer,s.feca?.scienceCastTimer,s.feca?.glyphCastTimer,p.rollTimer,p.hurtTimer].some(v=>v>0),
     upgrades:copy(s.upgrades,['dashRange','jumpRange','staffRange','cutRange','liberationRadius']),awakenings:{...s.awakenings},
     buffs:{science:s.feca?.scienceTimer||0,power:s.powerTimer||0,invisible:s.sram?.invisible||0},
     double:s.sram?.double?.hp>0&&s.sram.double.life>0?copy(s.sram.double,['x','y','swapCooldown']):null,
     traps:includeTargets?(s.sram?.traps||[]).filter(t=>t.life>0).slice(0,72).map(t=>copy(t,['x','y'])):[],
     enemies:includeTargets?(s.enemies||[]).filter(e=>e.hp>0&&e.state!=='dead'&&!(e.invisibleTimer>0)&&!(e.arrival>0)).slice(0,128).map(e=>copy(e,['x','y','r','hp'])):[]};
 },
 travelState(){
   const position=this.playerPosition();if(!position)return null;
   const live=liveRef.current,rect=liveCanvas.getBoundingClientRect(),scaleX=rect.width/live.width,scaleY=rect.height/live.height;
   const p=live.player,returning=live.awakenings?.dash===3&&p.teleportReturnTimer>0;
   const returnTarget=returning&&[p.teleportReturnX,p.teleportReturnY].every(Number.isFinite)?{x:rect.left+p.teleportReturnX*scaleX,y:rect.top+p.teleportReturnY*scaleY}:null;
   return {...position,scaleX,scaleY,angle:Number.isFinite(p.angle)?p.angle:0,
     upgrades:{dashRange:live.upgrades?.dashRange,jumpRange:live.upgrades?.jumpRange,staffRange:live.upgrades?.staffRange,cutRange:live.upgrades?.cutRange},
     awakenings:{dash:live.awakenings?.dash,jump:live.awakenings?.jump,cut:live.awakenings?.cut,burningGlyph:live.awakenings?.burningGlyph},returnTarget,
     doubleTarget:live.awakenings?.sramDouble===2&&live.sram?.double?.hp>0&&live.sram.double.life>0&&[live.sram.double.x,live.sram.double.y].every(Number.isFinite)?{x:rect.left+live.sram.double.x*scaleX,y:rect.top+live.sram.double.y*scaleY}:null};
 },
 playerPosition(refresh=false){
   const canvas=document.querySelector('canvas');if(!canvas)return null;
   if(refresh||!liveRef||canvas!==liveCanvas){liveRef=null;state();}
   const live=liveRef?.current,rect=canvas.getBoundingClientRect();
   if(!live||![live.player?.x,live.player?.y,live.width,live.height,rect.left,rect.top,rect.width,rect.height].every(Number.isFinite)||live.width<=0||live.height<=0||rect.width<=0||rect.height<=0)return null;
   return {x:rect.left+live.player.x/live.width*rect.width,y:rect.top+live.player.y/live.height*rect.height};
 },
 abilities(refresh=false){const now=Date.now();if(refresh||!abilityCache||now-abilityAt>=250){const {hud}=state();abilityCache={awakenings:hud?.awakenings||{}};abilityAt=now;}return abilityCache;},snapshot(){
   const phase=document.querySelector('main')?.className||'';
   const locale=window.thorLocale?.sync()||'fr',collection=window.thorCollection?.snapshot()||{status:'unavailable'};
   if(phase.includes('phase-title'))return {status:'title',locale,collection};
   const {live,hud}=state();
   if(!live||!hud||![live.player.hp,live.player.maxHp,live.kamas,live.level,live.wave].every(Number.isFinite)||live.player.maxHp<=0)return {status:'unavailable',locale,collection};
   const cards=[...document.querySelectorAll('.hud-inventory .filled')];
   const items=Object.entries(live.equipment).flatMap(([slot,value])=>(Array.isArray(value)?value:value?[value]:[]).map(item=>{
     const card=cards.find(el=>el.querySelector('img')?.getAttribute('src')?.includes('item-'+item.id+'.'));
     const img=card?.querySelector('img');
     const name=card?.querySelector('.equipment-tooltip strong')?.textContent||item.id;
     const effects=card?.querySelector('.equipment-tooltip')?.textContent?.slice(name.length).trim()||'';
     const icon=img?.src;
     return {slot,name,effects,radiant:item.radiant===true,ranges:window.thorCollection?.describe(item)||null,icon:icon?.startsWith('https://retrosurvival.online/assets/')?icon:null};
   }));
   const helper=window.thorControls?.helperEnabled()===false?null:{lowHealth:live.player.hp>0&&live.player.hp/live.player.maxHp<=.25};
   return {status:'run',locale,collection,helper,character:window.thorSpellPolicy?.classFor(live.levelId),unlocked:Object.keys(live.abilityUnlocked||{}).filter(id=>live.abilityUnlocked[id]),spellBindings:window.thorControls?.bindings?.().filter(Boolean)||[],phase:document.querySelector('.pause-panel')?'paused':live.phase,level:live.level,wave:live.wave,hp:live.player.hp,maxHp:live.player.maxHp,kamas:live.kamas,
     stats:Object.entries(labels).map(([key,name])=>{const b=hud.statBreakdowns[key];const match=b?.detail?.match(/^(?:Actuellement|Currently|Current|Actualmente)\s*:\s*([^·]+)/);return {name:text(name),value:match?match[1].trim():null,gear:b?.gear||''};}),
     slots:Object.fromEntries(Object.entries(slots).map(([key,name])=>[key,text(name)])),items};
 }};
})();
