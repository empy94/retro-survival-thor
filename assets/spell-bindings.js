(function(root){
 'use strict';
 // IDs used by the official game's touch controls (checked 2026-10-08).
 const aimed=new Set(['dash','immobilizationGlyph','burningGlyph','staffBoomerang','cut','swordOfFate','jump','celestialSword','iopSword','lethalAttack','massTrap','repulsiveTrap','sramDouble','fear']);
 const names=['X','Y','L1','R1','L2','R2'];
 const travel=new Set(['dash','jump']);
 function isTravel(id){return travel.has(id);}
 function travelRange(id,upgrades={},awakenings={}){
   const upgrade=key=>Number.isFinite(upgrades[key])?Math.max(0,upgrades[key]):0;
   if(id==='dash')return (150+upgrade('dashRange')*50)*(awakenings.dash===1?2:1);
   if(id==='jump')return 270*(1+upgrade('jumpRange')/3)*(awakenings.jump===1?2:1);
   return null;
 }
 function needsAim(id,awakenings={}){return aimed.has(id)&&!(id==='burningGlyph'&&awakenings.burningGlyph===2);}
 function assign(spells,awakenings={}){
   const slots=Array(6).fill(null);
   const entries=spells.map(spell=>({...spell,aimed:needsAim(spell.id,awakenings)}));
   for(const group of [true,false])for(const spell of entries.filter(s=>s.aimed===group)){
     const order=group?[2,3,4,5,0,1]:[0,1,2,3,4,5];
     const index=order.find(i=>slots[i]===null);
     if(index!==undefined)slots[index]={...spell,button:names[index],index};
   }
   return slots;
 }
 const api={names,needsAim,assign,isTravel,travelRange};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.thorSpellBindings=api;
})(typeof window==='object'?window:globalThis);
