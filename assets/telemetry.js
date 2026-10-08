(function(){
 'use strict';
 const labels={'damage':'Dommages','spell-damage':'Dommages des sorts','basic-damage':'Dommages attaque','basic-speed':'Vitesse d’attaque','critical':'Critique','critical-damage':'Dégâts critiques','move-speed':'Vitesse','evasion':'Esquive','cooldown':'Vitesse récup.','effect-duration':'Durée des effets','spell-size':'Taille des sorts','experience-gain':'XP reçue','prospection':'Prospection'};
 const slots={hat:'Coiffe',cape:'Cape',amulet:'Amulette',weapon:'Arme',shield:'Bouclier',belt:'Ceinture',boots:'Bottes',ring:'Anneaux',dofus:'Dofus'};
 let liveRef=null,liveCanvas=null;
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
 travelState(){
   const position=this.playerPosition();if(!position)return null;
   const live=liveRef.current,rect=liveCanvas.getBoundingClientRect(),scaleX=rect.width/live.width,scaleY=rect.height/live.height;
   const p=live.player,returning=live.awakenings?.dash===3&&p.teleportReturnTimer>0;
   const returnTarget=returning&&[p.teleportReturnX,p.teleportReturnY].every(Number.isFinite)?{x:rect.left+p.teleportReturnX*scaleX,y:rect.top+p.teleportReturnY*scaleY}:null;
   return {...position,scaleX,scaleY,angle:Number.isFinite(p.angle)?p.angle:0,
     upgrades:{dashRange:live.upgrades?.dashRange,jumpRange:live.upgrades?.jumpRange},
     awakenings:{dash:live.awakenings?.dash,jump:live.awakenings?.jump},returnTarget};
 },
 playerPosition(refresh=false){
   const canvas=document.querySelector('canvas');if(!canvas)return null;
   if(refresh||!liveRef||canvas!==liveCanvas){liveRef=null;state();}
   const live=liveRef?.current,rect=canvas.getBoundingClientRect();
   if(!live||![live.player?.x,live.player?.y,live.width,live.height,rect.left,rect.top,rect.width,rect.height].every(Number.isFinite)||live.width<=0||live.height<=0||rect.width<=0||rect.height<=0)return null;
   return {x:rect.left+live.player.x/live.width*rect.width,y:rect.top+live.player.y/live.height*rect.height};
 },
 abilities(){const {hud}=state();return {awakenings:hud?.awakenings||{}};},snapshot(){
   const phase=document.querySelector('main')?.className||'';
   if(phase.includes('phase-title'))return {status:'title'};
   const {live,hud}=state();
   if(!live||!hud||![live.player.hp,live.player.maxHp,live.kamas,live.level,live.wave].every(Number.isFinite)||live.player.maxHp<=0)return {status:'unavailable'};
   const cards=[...document.querySelectorAll('.hud-inventory .filled')];
   const items=Object.entries(live.equipment).flatMap(([slot,value])=>(Array.isArray(value)?value:value?[value]:[]).map(item=>{
     const card=cards.find(el=>el.querySelector('img')?.getAttribute('src')?.includes('item-'+item.id+'.'));
     const img=card?.querySelector('img');
     const name=card?.querySelector('.equipment-tooltip strong')?.textContent||item.id;
     const effects=card?.querySelector('.equipment-tooltip')?.textContent?.slice(name.length).trim()||'';
     const icon=img?.src;
     return {slot,name,effects,icon:icon?.startsWith('https://retrosurvival.online/assets/')?icon:null};
   }));
   return {status:'run',phase:document.querySelector('.pause-panel')?'paused':live.phase,level:live.level,wave:live.wave,hp:live.player.hp,maxHp:live.player.maxHp,kamas:live.kamas,
     stats:Object.entries(labels).map(([key,name])=>{const b=hud.statBreakdowns[key];const match=b?.detail?.match(/^Actuellement\s*:\s*([^·]+)/);return {name,value:match?match[1].trim():null,gear:b?.gear||''};}),
     slots,items};
 }};
})();
