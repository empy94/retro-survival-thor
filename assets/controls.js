(function(){
 'use strict';
 // Keep the site's original Android interface and drive its virtual controls.
 let zone=null,origin=null,lastX=0,lastY=0,ability=null;
 let settings={showLabels:true,labelOpacity:.45,showJoystick:true};
 function bindings(){
   const spells=[...document.querySelectorAll('.touch-ability')].map(el=>{
     let f=el[Object.keys(el).find(k=>k.startsWith('__reactFiber'))];
     // The keyed touch button carries the stable spell ID, independent of locale.
     let id=null;for(let i=0;f&&i<4;i++,f=f.return){if(f.key){id=f.key;break;}}
     return {el,id,name:el.getAttribute('aria-label')||''};
   });
   return window.thorSpellBindings.assign(spells,window.thorDashboard?.abilities().awakenings||{});
 }
 function decorate(){
   const slots=bindings();
   document.querySelectorAll('.touch-ability').forEach(el=>{
     const spell=slots.find(s=>s?.el===el);
     let label=el.querySelector('.thor-button-label');
     if(!spell){label?.remove();return;}
     if(!label){label=document.createElement('span');label.className='thor-button-label';label.setAttribute('aria-hidden','true');label.style.cssText='position:absolute;right:3px;top:3px;z-index:3;border:1px solid #ffe4a0;border-radius:5px;padding:2px 4px;background:#ffda83;color:#18221b;font:900 11px/1.15 sans-serif;pointer-events:none;box-shadow:0 1px 3px #0008';if(getComputedStyle(el).position==='static')el.style.position='relative';el.append(label);}
     if(label.textContent!==spell.button)label.textContent=spell.button;
     label.title=spell.aimed?'Maintenir, viser au stick droit, relâcher':'Appuyer pour lancer';
     label.style.display=settings.showLabels?'':'none';label.style.opacity=String(settings.labelOpacity);
   });
   const z=document.querySelector('.touch-joystick-zone');if(z)z.style.opacity=settings.showJoystick?'1':'0';
 }
 function event(el,type,id,x,y){el.dispatchEvent(new PointerEvent(type,{pointerId:id,pointerType:'touch',isPrimary:id===177,clientX:x,clientY:y,pageX:x,pageY:y,buttons:type==='pointerup'||type==='pointercancel'?0:1,button:0,bubbles:true,cancelable:true}));}
 function finish(type){const held=ability;if(!held)return;ability=null;event(held.el,type,179,held.x,held.y);const label=held.el.querySelector('.thor-button-label');if(label)label.style.background='#ffda83';}
 window.thorControls={
   bindings(){return bindings().map(s=>s?{button:s.button,id:s.id,name:s.name,aimed:s.aimed}:null);},
   cancel(){finish('pointercancel');},
   configure(value){settings={...settings,...value};decorate();},
   beginPreferences(){const main=document.querySelector('main');const shouldPause=main?.classList.contains('phase-playing')&&!main.classList.contains('modal-open');if(shouldPause)this.pause();return !!shouldPause;},
   endPreferences(){if(document.querySelector('.pause-panel'))this.pause();},
   key(key,code,down){
     const el=document.activeElement||document.body;
     el.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{key,code,bubbles:true,cancelable:true}));
   },
   stick(x,y){
     const next=document.querySelector('.touch-joystick-zone');
     if(!next||document.querySelector('main')?.classList.contains('modal-open')){if(zone&&origin)event(zone,'pointerup',177,lastX,lastY);zone=null;origin=null;return;}
     if(Math.hypot(x,y)<.16){if(zone&&origin)event(zone,'pointerup',177,lastX,lastY);zone=null;origin=null;return;}
     if(!origin||zone!==next){zone=next;const r=zone.getBoundingClientRect();const radius=Math.max(68,Math.min(88,innerHeight*.21))/2;origin={x:Math.max(r.left+radius+14,Math.min(68,r.right-radius-14)),y:Math.min(r.bottom-radius-14,innerHeight-68)};event(zone,'pointerdown',177,origin.x,origin.y);}
     const radius=Math.max(68,Math.min(88,innerHeight*.21))/2;
     const n=Math.max(1,Math.hypot(x,y));lastX=origin.x+x/n*radius;lastY=origin.y+y/n*radius;
     event(zone,'pointermove',177,lastX,lastY);
   },
   pause(){const el=document.querySelector('.pause-toggle');if(el){const r=el.getBoundingClientRect();event(el,'pointerdown',180,r.left+r.width/2,r.top+r.height/2);event(el,'pointerup',180,r.left+r.width/2,r.top+r.height/2);}},
   button(index,down){
     if(!down&&ability?.index===index){finish('pointerup');return;}
     if(!down)return;
     if(document.querySelector('main')?.classList.contains('modal-open'))return;
     const spell=bindings()[index];const el=spell?.el;if(!el||el.getAttribute('aria-disabled')==='true')return;
     const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
     if(!spell.aimed){event(el,'pointerdown',181,x,y);event(el,'pointerup',181,x,y);return;}
     if(ability)return;
     ability={el,index,x,y};
     const label=el.querySelector('.thor-button-label');if(label)label.style.background='#ffffff';
     if(!el.__thorCapture){const real=el.setPointerCapture.bind(el);el.setPointerCapture=id=>{if(id!==179)real(id)};el.__thorCapture=true;}
     event(el,'pointerdown',179,ability.x,ability.y);
   }
 };
 document.addEventListener('DOMContentLoaded',()=>{
   const menu=document.createElement('button');menu.id='thor-settings';menu.type='button';menu.textContent='⚙ Thor';menu.setAttribute('aria-label','Paramètres des commandes AYN Thor');
   menu.style.cssText='position:fixed;top:12px;left:104px;z-index:2147483646;padding:6px 9px;border:1px solid #bfa77480;border-radius:8px;background:#17251ccc;color:#ffe4a0;font:600 12px sans-serif;opacity:.78';
   menu.addEventListener('click',()=>window.ThorPreferences?.openSettings());document.body.append(menu);
   let queued=false;const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;decorate()});}});observer.observe(document.body,{childList:true,subtree:true});decorate();
   const c=document.createElement('div'); c.id='thor-cursor';
   c.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;width:18px;height:18px;border:2px solid #ffe192;border-radius:50%;box-shadow:0 0 3px 2px #000;transform:translate(-50%,-50%);left:50%;top:50%;display:none';
   document.body.append(c);
   let px=innerWidth/2,py=innerHeight/2;
   window.thorControls.move=function(x,y){
     px=Math.max(1,Math.min(innerWidth-2,x));py=Math.max(1,Math.min(innerHeight-2,y));
     c.style.display='block';c.style.left=px+'px';c.style.top=py+'px';
     const el=document.elementFromPoint(px,py);
     if(el){el.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',clientX:px,clientY:py,bubbles:true}));el.dispatchEvent(new MouseEvent('mousemove',{clientX:px,clientY:py,bubbles:true}));}
     if(ability){ability.x=px;ability.y=py;event(ability.el,'pointermove',179,px,py);}
   };
 });
})();
