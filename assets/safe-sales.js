(function(){'use strict';
 let enabled=false,last=null;
 function canSell(equipment,item){
  if(!item||item.stolen||item.slot==='dofus'||item.radiant||!Array.isArray(item.rolls)||!item.rolls.length||!item.rolls.every(Number.isFinite))return false;
  const own=Object.values(equipment||{}).flatMap(value=>Array.isArray(value)?value:value?[value]:[]).find(e=>e.id===item.id&&e.slot===item.slot);
  return !!own&&Array.isArray(own.rolls)&&own.rolls.length===item.rolls.length&&own.rolls.every(Number.isFinite)&&item.rolls.every((value,i)=>value<=own.rolls[i]);
 }
 function tick(){
  if(!enabled||!window.thorGameAdapter)return;const state=window.thorDashboard?.context(),dialog=document.querySelector('.loot-overlay');if(!dialog||!state||state.phase!=='playing'){last=null;return;}
  let fiber=dialog[Object.keys(dialog).find(k=>k.startsWith('__reactFiber'))],offer=null;
  for(let i=0;fiber&&i<10;i++,fiber=fiber.return){const props=fiber.memoizedProps;if(props?.item&&props?.onChoose){offer=props;break;}if(props?.item&&typeof props.onAction==='function'){offer=props;break;}if(props?.item&&Object.values(props).some(v=>typeof v==='function'))offer=props;}
  if(!offer||!canSell(state.equipment,offer.item)||last===offer.item)return;
  const buttons=[...dialog.querySelectorAll('.loot-actions button')],sell=buttons.find(b=>/^(?:\d\s*)?(?:vendre|sell|vender)\b/i.test(b.textContent.trim()));
  if(!sell||sell.disabled||dialog.getAttribute('aria-busy')==='true')return;
  // The original dialog's guard requires a real pointer/touch transaction.
  const box=sell.getBoundingClientRect();if(!box.width||!box.height)return;
  sell.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:box.x+box.width/2,clientY:box.y+box.height/2,pointerType:'mouse'}));sell.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,clientX:box.x+box.width/2,clientY:box.y+box.height/2,pointerType:'mouse'}));sell.click();last=offer.item;
 }
 window.thorSalePolicy={get enabled(){return enabled;},configure(value){enabled=value===true;last=null;},canSell,tick};
})();
