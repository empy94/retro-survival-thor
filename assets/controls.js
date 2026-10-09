(function(){
 'use strict';
 // Keep the site's original Android interface and drive its virtual controls.
 let zone=null,origin=null,lastX=0,lastY=0,ability=null;
 let px=0,py=0,aimFrame=null,autoPointer=null,manualUntil=0,foreground=true;const touches=new Set(),padHeld=new Set(),padRoutes=new Map();
 let leftX=0,leftY=0;
 let settings={showLabels:true,labelOpacity:.45,showJoystick:true,radialAim:true,hideCombatCursor:true,combatHelper:true},pointerUsed=false,cursorPhase=null,cursorScope=null;
 function refreshCursor(){
   const cursor=document.querySelector('#thor-cursor');if(!cursor)return;
   const phase=document.querySelector('main')?.className||'';
   const scope=document.querySelector('.upgrade-panel,.loot-panel,.pause-panel,.gameover-panel,.level-select-panel,.intro-panel');
   if(cursorPhase!==phase||cursorScope!==scope){cursorPhase=phase;cursorScope=scope;pointerUsed=false;}
   const combat=phase.includes('phase-playing')&&!phase.includes('modal-open')&&!document.querySelector('.pause-panel');
   const visible=!ability?.radial&&(pointerUsed||ability)&&(!settings.hideCombatCursor||!combat||ability&&!ability.radial);
   const display=visible?'block':'none';if(cursor.style.display!==display)cursor.style.display=display;
 }
 function text(value){return window.thorLocale?.text(value)||value;}
 function bindings(refresh=false){
   const spells=[...document.querySelectorAll('.touch-ability')].map(el=>{
     let f=el[Object.keys(el).find(k=>k.startsWith('__reactFiber'))];
     // The keyed touch button carries the stable spell ID, independent of locale.
     let id=null;for(let i=0;f&&i<4;i++,f=f.return){if(f.key){id=f.key;break;}}
     return {el,id,name:el.getAttribute('aria-label')||''};
   });
   return window.thorSpellBindings.assign(spells,window.thorDashboard?.abilities(refresh).awakenings||{},settings.spellShortcuts?.[window.thorDashboard?.character?.()]);
 }
 function decorate(){
   refreshCursor();
   window.thorLocale?.sync();
   window.thorAutoSpells?.refreshLabel();
   document.querySelector('#thor-settings')?.setAttribute('aria-label',text('Paramètres de jeu et manette'));
   const slots=bindings();
   document.querySelectorAll('.touch-ability').forEach(el=>{
     const spell=slots.find(s=>s?.el===el);
     let label=el.querySelector('.thor-button-label');
     if(!spell){label?.remove();return;}
     if(!label){label=document.createElement('span');label.className='thor-button-label';label.setAttribute('aria-hidden','true');label.style.cssText='position:absolute;right:3px;top:3px;z-index:3;border:1px solid #ffe4a0;border-radius:5px;padding:2px 4px;background:#ffda83;color:#18221b;font:900 11px/1.15 sans-serif;pointer-events:none;box-shadow:0 1px 3px #0008';if(getComputedStyle(el).position==='static')el.style.position='relative';el.append(label);}
     if(label.textContent!==spell.button)label.textContent=spell.button;
     label.title=spell.aimed?text('Maintenir, viser au stick droit, relâcher'):text('Appuyer pour lancer');
     label.style.display=settings.showLabels?'':'none';label.style.opacity=String(settings.labelOpacity);
   });
   const z=document.querySelector('.touch-joystick-zone');if(z)z.style.opacity=settings.showJoystick?'1':'0';
 }
 function event(el,type,id,x,y){el.dispatchEvent(new PointerEvent(type,{pointerId:id,pointerType:'touch',isPrimary:id===177,clientX:x,clientY:y,pageX:x,pageY:y,buttons:type==='pointerup'||type==='pointercancel'?0:1,button:0,bubbles:true,cancelable:true}));}
 function cancelAuto(){const held=autoPointer;autoPointer=null;if(held)event(held.el,'pointercancel',182,held.x,held.y);}
 function manual(){manualUntil=Date.now()+700;cancelAuto();}
 function capture(el){if(el.__thorCapture)return;const real=el.setPointerCapture.bind(el);el.setPointerCapture=id=>{if(id!==179&&id!==182)real(id);};el.__thorCapture=true;}
 function aimPoint(held){
   const player=window.thorDashboard?.playerPosition();if(!player)return null;
   let targetX=px,targetY=py,range=null,travel=null,showRange=true,fixed=null;
   if(held.radial){
     travel=window.thorDashboard?.travelState();if(!travel)return null;
     const spec=window.thorSpellBindings.radialSpec(held.id,travel.upgrades,travel.awakenings);if(!spec)return null;
     range=spec.distance;showRange=spec.showRange;
     const fixedTarget=held.id==='dash'?travel.returnTarget:held.id==='sramDouble'?travel.doubleTarget:null;
     if(fixedTarget){targetX=fixedTarget.x;targetY=fixedTarget.y;range=0;fixed=held.id==='dash'?text('Retour au point de départ'):text('Échange avec le double');}
     else{
       if(Math.hypot(leftX,leftY)>.16)held.forward={x:leftX,y:leftY};
       const d=held.rightDirection?{x:held.rightDirection.x/travel.scaleX,y:held.rightDirection.y/travel.scaleY}:held.forward;
       const length=Math.hypot(d.x,d.y)||1;
       // Preserve the chosen distance when the stick returns to its dead zone.
       // Stay above the game's touch-vector threshold to avoid an auto-aim cast.
       const ratio=spec.variable?Math.min(1,Math.max(held.distanceRatio,12.1/(range*Math.min(travel.scaleX,travel.scaleY)))):1;
       targetX=player.x+d.x/length*range*ratio*travel.scaleX;targetY=player.y+d.y/length*range*ratio*travel.scaleY;
     }
   }
   const rect=held.controls.getBoundingClientRect(),dx=targetX-player.x,dy=targetY-player.y;
   // The game keeps a fixed touch origin; translate the virtual finger so its
   // vector always equals cursor minus current player. Never write game state.
   return {x:rect.left+held.originX+dx,y:rect.top+held.originY+dy,player,rect,dx,dy,targetX,targetY,range,travel,showRange,fixed};
 }
 function updateAim(){
   if(!ability)return;
   if(!ability.el.isConnected||document.querySelector('main')?.classList.contains('modal-open')){finish('pointercancel');return;}
   const p=aimPoint(ability);if(!p){finish('pointercancel');return;}
   ability.x=p.x;ability.y=p.y;
   event(ability.el,'pointermove',179,p.x,p.y);
   const style=ability.controls.style;
   style.setProperty('--thor-aim-x',(p.player.x-p.rect.left)+'px');style.setProperty('--thor-aim-y',(p.player.y-p.rect.top)+'px');
   style.setProperty('--thor-aim-distance',Math.hypot(p.dx,p.dy)+'px');style.setProperty('--thor-aim-angle',Math.atan2(p.dy,p.dx)+'rad');
   style.setProperty('--thor-target-x',(p.targetX-p.rect.left)+'px');style.setProperty('--thor-target-y',(p.targetY-p.rect.top)+'px');
   if(ability.radius){const ring=ability.radius.style;ring.left=(p.player.x-p.rect.left)+'px';ring.top=(p.player.y-p.rect.top)+'px';ring.width=p.range*p.travel.scaleX*2+'px';ring.height=p.range*p.travel.scaleY*2+'px';ring.display=p.range&&p.showRange?'':'none';const caption=p.fixed||(ability.variable?text('Stick droit : direction et distance'):text('Stick droit : direction'));if(ability.caption.textContent!==caption)ability.caption.textContent=caption;ability.caption.style.left=(p.player.x-p.rect.left)+'px';ability.caption.style.top=(p.player.y-p.rect.top+20)+'px';}
 }
 function aimTick(){aimFrame=null;updateAim();if(ability)aimFrame=requestAnimationFrame(aimTick);}
 function finish(type){
   const held=ability;if(!held)return;
   if(type==='pointerup'){const p=aimPoint(held);if(p){held.x=p.x;held.y=p.y;}else type='pointercancel';}
   ability=null;if(aimFrame!==null){cancelAnimationFrame(aimFrame);aimFrame=null;}
   event(held.el,type,179,held.x,held.y);held.controls?.classList.remove('thor-aiming');
   held.radius?.remove();held.caption?.remove();refreshCursor();
   const label=held.el.querySelector('.thor-button-label');if(label)label.style.background='#ffda83';
 }
 window.thorControls={
   setActive(value){foreground=value===true;if(!foreground){touches.clear();cancelAuto();}},
   autoAvailable(){return foreground&&!ability&&!autoPointer&&!touches.size&&!padRoutes.size&&Date.now()>=manualUntil;},
   autoCast(spell,target){
     if(!settings.autoSpells||!this.autoAvailable()||!spell.el.isConnected||spell.el.getAttribute('aria-disabled')==='true')return false;
     const main=document.querySelector('main');if(!main?.classList.contains('phase-playing')||main.classList.contains('modal-open')||document.querySelector('.pause-panel'))return false;
     const el=spell.el,r=el.getBoundingClientRect();
     if(!spell.aimed){event(el,'pointerdown',181,r.left+r.width/2,r.top+r.height/2);event(el,'pointerup',181,r.left+r.width/2,r.top+r.height/2);return true;}
     const player=window.thorDashboard.playerPosition(),travel=window.thorDashboard.travelState();if(!player||!travel||!target)return false;
     const held={el,x:player.x,y:player.y,origin:player};autoPointer=held;capture(el);event(el,'pointerdown',182,held.x,held.y);
     // React must commit the held touch before move and release. Only one cast
     // is in flight; recheck menus/settings/manual input at both boundaries.
     const valid=()=>autoPointer===held&&foreground&&el.isConnected&&settings.autoSpells&&!document.hidden&&main===document.querySelector('main')&&main.classList.contains('phase-playing')&&!main.classList.contains('modal-open')&&!document.querySelector('.pause-panel');
     const point=()=>{const p=window.thorDashboard.playerPosition();if(!p)return false;held.x=held.origin.x+target.x-p.x;held.y=held.origin.y+target.y-p.y;return true;};
     requestAnimationFrame(()=>{if(!valid()||!point()){if(autoPointer===held)cancelAuto();return;}event(el,'pointermove',182,held.x,held.y);requestAnimationFrame(()=>{if(!valid()||!point()){if(autoPointer===held)cancelAuto();return;}autoPointer=null;event(el,'pointerup',182,held.x,held.y);});});return true;
   },
   bindings(){return bindings().map(s=>s?{button:s.button,id:s.id,name:s.name,aimed:s.aimed,travel:window.thorSpellBindings.isTravel(s.id)}:null);},
   helperEnabled(){return settings.combatHelper;},
   pad(){pointerUsed=false;refreshCursor();},
   rightStick(x,y){if(Math.hypot(x,y)>.16)manual();if(!ability?.radial)return false;const length=Math.hypot(x,y);if(length>.16){ability.rightDirection={x,y};ability.distanceRatio=Math.max(0,Math.min(1,(length-.16)/.84));}return true;},
   cancel(){manual();finish('pointercancel');padHeld.clear();padRoutes.clear();window.thorMenu?.clear();},
   configure(value){if(Object.prototype.hasOwnProperty.call(value,'spellShortcuts')&&JSON.stringify(value.spellShortcuts)!==JSON.stringify(settings.spellShortcuts)){finish('pointercancel');padHeld.clear();padRoutes.clear();}const before=settings.autoSpellMode;settings={...settings,...value};if(!settings.autoSpells||before!==settings.autoSpellMode||Object.prototype.hasOwnProperty.call(value,'spellManual'))cancelAuto();window.thorAutoSpells?.configure(settings.autoSpells===true?(settings.autoSpellMode||'full'):'off',settings.spellManual);decorate();},
   beginPreferences(){const main=document.querySelector('main');const shouldPause=main?.classList.contains('phase-playing')&&!main.classList.contains('modal-open');if(shouldPause)this.pause();return !!shouldPause;},
   endPreferences(){if(document.querySelector('.pause-panel'))this.pause();},
   key(key,code,down){
     const el=document.activeElement||document.body;
     el.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{key,code,bubbles:true,cancelable:true}));
   },
   stick(x,y,digital=false){
     if(Math.hypot(x,y)>.16)pointerUsed=false;
     refreshCursor();
     if(digital?window.thorMenu?.active():window.thorMenu?.tick(x,y,performance.now())){x=0;y=0;}
     leftX=x;leftY=y;
     const next=document.querySelector('.touch-joystick-zone');
     if(!next||document.querySelector('main')?.classList.contains('modal-open')){if(zone&&origin)event(zone,'pointerup',177,lastX,lastY);zone=null;origin=null;return;}
     if(Math.hypot(x,y)<.16){if(zone&&origin)event(zone,'pointerup',177,lastX,lastY);zone=null;origin=null;return;}
     if(!origin||zone!==next){zone=next;const r=zone.getBoundingClientRect();const radius=Math.max(68,Math.min(88,innerHeight*.21))/2;origin={x:Math.max(r.left+radius+14,Math.min(68,r.right-radius-14)),y:Math.min(r.bottom-radius-14,innerHeight-68)};event(zone,'pointerdown',177,origin.x,origin.y);}
     const radius=Math.max(68,Math.min(88,innerHeight*.21))/2;
     const n=Math.max(1,Math.hypot(x,y));lastX=origin.x+x/n*radius;lastY=origin.y+y/n*radius;
     event(zone,'pointermove',177,lastX,lastY);
   },
   pause(){manual();const el=document.querySelector('.pause-toggle');if(el){const r=el.getBoundingClientRect();event(el,'pointerdown',180,r.left+r.width/2,r.top+r.height/2);event(el,'pointerup',180,r.left+r.width/2,r.top+r.height/2);}},
   controller(button,down){
     // Routes are captured at press time: releasing a modifier or changing a
     // spell list must not release a different spell than the one being held.
     if(!down){padHeld.delete(button);const route=padRoutes.get(button);padRoutes.delete(button);if(!route)return true;if(!route.suppressed){if(route.pending)this.button(route.index,true);this.button(route.index,false);}return true;}
     if(padHeld.has(button))return true;
     if(window.thorMenu?.active()){if(button==='A')return window.thorMenu.activate();if(button==='B'){this.pause();return true;}return true;}
     manual();const slots=bindings(true),modifiers=['L1','R1','L2','R2'];
     padHeld.add(button);
     const chord=['X','Y','A','B'].includes(button)?modifiers.map(m=>padHeld.has(m)?slots.find(s=>s?.button===m+' + '+button):null).find(Boolean):null;
     if(chord){for(const m of modifiers){const route=padRoutes.get(m);if(route&&!route.suppressed){route.suppressed=true;if(ability?.index===route.index)finish('pointercancel');}}padRoutes.set(button,{index:chord.index});this.button(chord.index,true);return true;}
     const spell=slots.find(s=>s?.button===button);
     if(!spell){if(button==='B'){this.pause();return true;}return button!=='A';}
     const pending=modifiers.includes(button)&&!spell.aimed;padRoutes.set(button,{index:spell.index,pending});if(!pending)this.button(spell.index,true);return true;
   },
   button(index,down){
     if(!down&&ability?.index===index){finish('pointerup');return;}
     if(!down)return;
     manual();
     if(document.querySelector('main')?.classList.contains('modal-open'))return;
     const spell=bindings(true)[index];const el=spell?.el;if(!el||el.getAttribute('aria-disabled')==='true')return;
     const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
     if(!spell.aimed){event(el,'pointerdown',181,x,y);event(el,'pointerup',181,x,y);return;}
     if(ability)return;
     const player=window.thorDashboard?.playerPosition(true),controls=el.closest('.touch-controls');
     if(!player||!controls)return;
     const rect=controls.getBoundingClientRect();
     const travel=window.thorSpellBindings.isTravel(spell.id),radial=travel||settings.radialAim,state=radial?window.thorDashboard?.travelState():null;
     const spec=radial&&state?window.thorSpellBindings.radialSpec(spell.id,state.upgrades,state.awakenings):null;
     if(radial&&!spec)return;
     ability={el,index,controls,id:spell.id,travel,radial,variable:spec?.variable,distanceRatio:1,x:player.x,y:player.y,originX:player.x-rect.left,originY:player.y-rect.top,
       forward:Math.hypot(leftX,leftY)>.16?{x:leftX,y:leftY}:{x:Math.cos(state?.angle||0),y:Math.sin(state?.angle||0)}};
     if(radial){
       ability.cursor=document.querySelector('#thor-cursor');if(ability.cursor){ability.cursorDisplay=ability.cursor.style.display;ability.cursor.style.display='none';}
       const ring=document.createElement('div');ring.className='thor-travel-radius';ring.style.cssText='position:absolute;transform:translate(-50%,-50%);border:1px dashed #ffe19299;border-radius:50%;pointer-events:none;box-sizing:border-box';controls.append(ring);ability.radius=ring;
       const caption=document.createElement('span');caption.style.cssText='position:absolute;transform:translateX(-50%);white-space:nowrap;color:#ffe4a0;background:#17251ccc;border-radius:5px;padding:3px 5px;font:600 10px sans-serif;pointer-events:none';controls.append(caption);ability.caption=caption;
     }
     controls.classList.add('thor-aiming');
     const label=el.querySelector('.thor-button-label');if(label)label.style.background='#ffffff';
     capture(el);
     event(el,'pointerdown',179,ability.x,ability.y);
     refreshCursor();
     aimFrame=requestAnimationFrame(aimTick);
   }
 };
 document.addEventListener('DOMContentLoaded',()=>{
   document.addEventListener('pointerdown',e=>{if(e.isTrusted&&!e.target.closest?.('.touch-joystick-zone')){touches.add(e.pointerId);manual();}},true);
   for(const type of ['pointerup','pointercancel'])document.addEventListener(type,e=>{if(e.isTrusted&&touches.has(e.pointerId)){touches.delete(e.pointerId);manual();}},true);
   document.addEventListener('visibilitychange',()=>{if(document.hidden){touches.clear();cancelAuto();}});
   px=innerWidth/2;py=innerHeight/2;
   const aimStyle=document.createElement('style');aimStyle.textContent='.thor-aiming .touch-target-line{left:var(--thor-aim-x)!important;top:var(--thor-aim-y)!important;width:var(--thor-aim-distance)!important;transform:translateY(-50%) rotate(var(--thor-aim-angle))!important}.thor-aiming .touch-map-target{left:var(--thor-target-x)!important;top:var(--thor-target-y)!important}';document.head.append(aimStyle);
   const menu=document.createElement('button');menu.id='thor-settings';menu.type='button';menu.textContent='⚙ APK';menu.setAttribute('aria-label',text('Paramètres de jeu et manette'));
   menu.style.cssText='position:fixed;top:12px;left:104px;z-index:2147483646;padding:6px 9px;border:1px solid #bfa77480;border-radius:8px;background:#17251ccc;color:#ffe4a0;font:600 12px sans-serif;opacity:.78';
   menu.addEventListener('click',()=>window.ThorPreferences?.openSettings());document.body.append(menu);
   let queued=false;const observer=new MutationObserver(()=>{if(!queued){queued=true;setTimeout(()=>{queued=false;decorate()},120);}});observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['lang','class']});decorate();
   const c=document.createElement('div'); c.id='thor-cursor';
   c.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;width:18px;height:18px;border:2px solid #ffe192;border-radius:50%;box-shadow:0 0 3px 2px #000;transform:translate(-50%,-50%);left:50%;top:50%;display:none';
   document.body.append(c);
   window.thorControls.move=function(x,y){
     if(ability?.radial)return;
     window.thorMenu?.clear();
     px=Math.max(1,Math.min(innerWidth-2,x));py=Math.max(1,Math.min(innerHeight-2,y));
     refreshCursor();pointerUsed=true;refreshCursor();c.style.left=px+'px';c.style.top=py+'px';
     const el=document.elementFromPoint(px,py);
     if(el){el.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientX:px,clientY:py,bubbles:true}));el.dispatchEvent(new MouseEvent('mousemove',{clientX:px,clientY:py,bubbles:true}));}
     // Aim is refreshed every animation frame, even with an idle right stick.
   };
 });
})();
