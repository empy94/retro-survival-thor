(function(root){
 'use strict';
 let selected=null,lastDirection='',nextRepeat=0,lastScope=null,choiceFocus=false,lastAnalog={x:0,y:0},lastPad='';const bookmarks=new WeakMap();
 function clear(){selected?.classList.remove('thor-menu-selected');selected=null;lastDirection='';nextRepeat=0;}
 function scope(){
   const main=document.querySelector('main');if(!main)return null;
   // The outer dialog owns actions. Inner loot-panel comparison cards can have
   // no buttons and must never steal the navigation scope.
   const dialogs=[...main.querySelectorAll('[role="dialog"]')].filter(visible);
   if(dialogs.length)return dialogs.at(-1);
   const panels=[...main.querySelectorAll('.levelup-overlay,.pause-panel,.gameover-panel,.level-select-panel,.intro-panel')].filter(visible);
   return panels.at(-1)||main;
 }
 function playing(){const main=document.querySelector('main');return !!main&&main.classList.contains('phase-playing')&&!main.classList.contains('modal-open')&&!main.querySelector('.pause-panel');}
 function available(){const main=document.querySelector('main');return !!main&&(!playing()||scope()!==main);}
 function resumeCombat(){if(!playing())return false;choiceFocus=false;clear();lastScope=null;return true;}
 function menu(){if(!available()){choiceFocus=false;clear();lastScope=null;return false;}return !playing()||choiceFocus;}
 function candidates(root=scope()){
   if(!root)return [];
   return [...root.querySelectorAll('button,[role="button"],a[href],input[type="submit"]')].filter(el=>visible(el)&&!el.disabled&&el.getAttribute('aria-disabled')!=='true'&&!el.matches('.pause-toggle,.fullscreen-toggle,.settings-toggle,.language-choice,#thor-settings')&&!el.closest('.touch-controls'));
 }
 function identity(el){let fiber=el[Object.keys(el).find(k=>k.startsWith('__reactFiber'))];for(let i=0;fiber&&i<4;i++,fiber=fiber.return)if(fiber.key)return 'key:'+fiber.key;return el.id||el.getAttribute('data-loot-key')||el.getAttribute('aria-label')||el.textContent?.trim().slice(0,150)||'';}
 function sync(){
   const next=scope(),items=candidates(next);
   if(next!==lastScope){if(lastScope&&selected)bookmarks.set(lastScope,{el:selected,key:identity(selected),index:candidates(lastScope).indexOf(selected)});clear();lastScope=next;const saved=next&&bookmarks.get(next);if(saved)choose(items.find(el=>el===saved.el)||(saved.key&&items.find(el=>identity(el)===saved.key))||items[Math.max(0,saved.index)]||null);}
   if(selected&&!items.includes(selected)){const key=identity(selected);choose(key&&items.find(el=>identity(el)===key)||null);}
   return items;
 }
 function visible(el){const r=el.getBoundingClientRect(),s=getComputedStyle(el);return el.isConnected&&r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;}
 function choose(el){selected?.classList.remove('thor-menu-selected');selected=el;if(el){el.classList.add('thor-menu-selected');el.scrollIntoView({block:'nearest',inline:'nearest'});}}
 function tick(x,y,now){
   if(!menu()){clear();lastScope=null;return false;}
   const direction=Math.max(Math.abs(x),Math.abs(y))<.5?'':Math.abs(x)>=Math.abs(y)?(x>0?'right':'left'):(y>0?'down':'up');
   if(!direction){lastDirection='';nextRepeat=0;if(selected&&!selected.isConnected)clear();if(scope()!==lastScope)sync();return true;}
   const items=sync();
   root.thorControls?.pad();
   if(direction===lastDirection&&now<nextRepeat)return true;
   nextRepeat=now+(direction===lastDirection?200:500);lastDirection=direction;
   if(!items.length)return true;
   if(!selected){choose(items[0]);return true;}
   let next;
   if(direction==='right'||direction==='left'){const a=selected.getBoundingClientRect(),sign=direction==='right'?1:-1;const ax=a.left+a.width/2,ay=a.top+a.height/2;next=items.filter(el=>el!==selected).map(el=>{const r=el.getBoundingClientRect(),dx=(r.left+r.width/2-ax)*sign,dy=Math.abs(r.top+r.height/2-ay);return {el,dx,cost:dx+dy*4};}).filter(v=>v.dx>4).sort((a,b)=>a.cost-b.cost)[0]?.el;const peers=selected.matches('.merchant-offer')?items.filter(el=>el.matches('.merchant-offer')):items;if(!next)next=peers[(peers.indexOf(selected)+sign+peers.length)%peers.length];}
   else{
     const a=selected.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2,sign=direction==='down'?1:-1;
     next=items.filter(el=>el!==selected).map(el=>{const r=el.getBoundingClientRect(),dy=(r.top+r.height/2-ay)*sign;return {el,dy,cost:Math.abs(r.left+r.width/2-ax)+Math.abs(dy)*2};}).filter(v=>v.dy>4).sort((a,b)=>a.cost-b.cost)[0]?.el||items[(items.indexOf(selected)+sign+items.length)%items.length];
   }
   choose(next);return true;
 }
 function activate(){if(!menu())return false;const items=sync();if(!selected||!items.includes(selected))return false;const el=selected;bookmarks.set(lastScope,{el,key:identity(el),index:items.indexOf(el)});lastDirection='';nextRepeat=0;el.click();return true;}
 function dpad(x,y,now,fresh=false){
   const direction=Math.max(Math.abs(x),Math.abs(y))<.5?'':Math.abs(x)>=Math.abs(y)?(x>0?'right':'left'):(y>0?'down':'up');
   const press=!!direction&&(fresh||direction!==lastPad);lastPad=direction;
   if(press&&available()){if(!choiceFocus)root.thorControls?.menuFocus?.();choiceFocus=true;}
   if(!menu())return false;
   return tick(x,y,now);
 }
 root.thorMenu={tick,activate,clear,active:menu,combat:playing,resumeCombat,dpad,
   analog(x,y,now){const moved=Math.hypot(x,y)>.16&&(Math.hypot(lastAnalog.x,lastAnalog.y)<=.16||Math.hypot(x-lastAnalog.x,y-lastAnalog.y)>.04);if(!choiceFocus||moved||Math.hypot(x,y)<=.16)lastAnalog={x,y};if(playing()){if(moved)resumeCombat();return false;}if(lastPad)return true;return tick(x,y,now);},
   step(x,y,now){lastDirection='';return dpad(x,y,now,true);}};
 document.addEventListener('DOMContentLoaded',()=>{
   const style=document.createElement('style');style.textContent='.thor-menu-selected{outline:3px solid #ffc348!important;outline-offset:-4px;box-shadow:0 0 0 2px #544e42,0 0 16px #ffc34888!important}';document.head.append(style);
   document.addEventListener('pointerdown',e=>{if(e.isTrusted)clear();},true);
 });
})(typeof window==='object'?window:globalThis);
