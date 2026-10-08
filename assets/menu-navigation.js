(function(root){
 'use strict';
 let selected=null,lastDirection='',nextRepeat=0,lastScope='';
 function clear(){selected?.classList.remove('thor-menu-selected');selected=null;lastDirection='';nextRepeat=0;}
 function menu(){const main=document.querySelector('main');return !!main&&(!main.classList.contains('phase-playing')||main.classList.contains('modal-open'));}
 function candidates(){
   const main=document.querySelector('main');if(!main)return [];
   const dialogs=[...main.querySelectorAll('[role="dialog"],.upgrade-panel,.loot-panel,.pause-panel,.gameover-panel,.level-select-panel')].filter(visible);
   const intro=main.querySelector('.intro-panel');
   const scope=dialogs.at(-1)||(intro&&visible(intro)?intro:main);
   return [...scope.querySelectorAll('button,[role="button"],a[href],input[type="submit"]')].filter(el=>visible(el)&&!el.disabled&&el.getAttribute('aria-disabled')!=='true'&&!el.matches('.pause-toggle,.fullscreen-toggle,.settings-toggle,.language-choice,#thor-settings')&&!el.closest('.touch-controls'));
 }
 function visible(el){const r=el.getBoundingClientRect(),s=getComputedStyle(el);return el.isConnected&&r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;}
 function choose(el){selected?.classList.remove('thor-menu-selected');selected=el;if(el){el.classList.add('thor-menu-selected');el.scrollIntoView({block:'nearest',inline:'nearest'});}}
 function tick(x,y,now){
   if(!menu()){clear();lastScope='';return false;}
   const main=document.querySelector('main'),scope=main.className;
   if(scope!==lastScope){clear();lastScope=scope;}
   const direction=Math.max(Math.abs(x),Math.abs(y))<.5?'':Math.abs(x)>=Math.abs(y)?(x>0?'right':'left'):(y>0?'down':'up');
   if(!direction){lastDirection='';nextRepeat=0;if(selected&&!selected.isConnected)clear();return true;}
   if(direction===lastDirection&&now<nextRepeat)return true;
   nextRepeat=now+(direction===lastDirection?150:400);lastDirection=direction;
   const items=candidates();if(selected&&!items.includes(selected))choose(null);
   if(!items.length)return true;
   if(!selected){choose(items[0]);return true;}
   let next;
   if(direction==='right'||direction==='left')next=items[(items.indexOf(selected)+(direction==='right'?1:-1)+items.length)%items.length];
   else{
     const a=selected.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2,sign=direction==='down'?1:-1;
     next=items.filter(el=>el!==selected).map(el=>{const r=el.getBoundingClientRect(),dy=(r.top+r.height/2-ay)*sign;return {el,dy,cost:Math.abs(r.left+r.width/2-ax)+Math.abs(dy)*2};}).filter(v=>v.dy>4).sort((a,b)=>a.cost-b.cost)[0]?.el||items[(items.indexOf(selected)+sign+items.length)%items.length];
   }
   choose(next);return true;
 }
 function activate(){if(!menu()||!selected||!candidates().includes(selected)){clear();return false;}const el=selected;clear();el.click();return true;}
 root.thorMenu={tick,activate,clear,active:menu,step(x,y,now){lastDirection="";return tick(x,y,now);}};
 document.addEventListener('DOMContentLoaded',()=>{
   const style=document.createElement('style');style.textContent='.thor-menu-selected{outline:3px solid #ffc348!important;outline-offset:-4px;box-shadow:0 0 0 2px #544e42,0 0 16px #ffc34888!important}';document.head.append(style);
   document.addEventListener('pointerdown',e=>{if(e.isTrusted)clear();},true);
 });
})(typeof window==='object'?window:globalThis);
