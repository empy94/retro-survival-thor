(function(root){
 'use strict';
 // IDs used by the official game's touch controls (checked 2026-10-08).
 const aimed=new Set(['dash','immobilizationGlyph','burningGlyph','staffBoomerang','cut','swordOfFate','jump','celestialSword','iopSword','lethalAttack','massTrap','repulsiveTrap','sramDouble','fear']);
 const names=['X','Y','L1','R1','L2','R2'];
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
 const api={names,needsAim,assign};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.thorSpellBindings=api;
})(typeof window==='object'?window:globalThis);
