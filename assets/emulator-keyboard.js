/* Desktop emulator only: keep physical movement keys in the native continuous input set. */
(function(){'use strict';
 const controls=window.thorControls;if(!controls||window.thorEmulatorKeyboard)return;
 const held=new Map(),issued=new Set(),stick=controls.stick.bind(controls);
 function preferences(){try{return JSON.parse(localStorage.getItem('retro-survival.settings.v1')||'{}');}catch{return {};}}
 function editable(target){return !!target?.closest?.('input,textarea,select,[contenteditable="true"],[contenteditable=""]');}
 function playing(){const c=window.thorNativeContext;return c?.gameRef.current?.phase==='playing'&&!c.pausedRef?.current&&!document.querySelector('.pause-panel,.levelup-panel,.loot-panel,.intro-panel');}
 function sync(){
  const c=window.thorNativeContext,keys=c?.keysRef?.current;if(!keys)return;
  for(const key of issued)keys.delete(key);issued.clear();
  const azerty=c.gameRef.current?.controlMode==='arcade-zqsd';
  const letters={up:azerty?'z':'w',left:azerty?'q':'a',down:'s',right:'d'};
  for(const direction of new Set(held.values())){const key=letters[direction];keys.add(key);issued.add(key);}
 }
 function release(){held.clear();sync();}
 controls.stick=(x,y,digital=false)=>{
  if(digital||Math.hypot(x,y)>.16||!playing())release();else if(held.size)sync();
  return stick(x,y,digital);
 };
 document.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.altKey||event.metaKey||event.isComposing||editable(event.target)||!playing())return;
  const settings=preferences(),mode=window.thorNativeContext?.gameRef.current?.controlMode||settings.controlMode;
  if(mode==='moba')return;
  const azerty=settings.keyboardLayout==='azerty'||!settings.keyboardLayout&&mode==='arcade-zqsd';
  const letter=String(event.key||'').toLowerCase(),direction=(azerty?{z:'up',q:'left',s:'down',d:'right'}:{w:'up',a:'left',s:'down',d:'right'})[letter];
  if(!direction)return;
  held.set(event.code||letter,direction);event.preventDefault();event.stopPropagation();
  window.thorMenu?.resumeCombat?.();sync();
 },true);
 document.addEventListener('keyup',event=>{
  if(!held.delete(event.code||String(event.key||'').toLowerCase()))return;
  event.preventDefault();event.stopPropagation();sync();
 },true);
 window.addEventListener('blur',release);
 window.addEventListener('pagehide',release);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)release();});
 window.thorEmulatorKeyboard={release};
})();
