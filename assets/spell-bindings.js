(function(root){
 'use strict';
 // IDs used by the official game's touch controls (checked 2026-10-09).
 const aimed=new Set(['dash','immobilizationGlyph','burningGlyph','staffBoomerang','cut','swordOfFate','jump','celestialSword','iopSword','lethalAttack','massTrap','repulsiveTrap','sramDouble','fear','arnaque','brokle']);
 const names=['X','Y','L1','R1','L2','R2','A','B',...['L1','R1','L2','R2'].flatMap(m=>['X','Y','A','B'].map(b=>m+' + '+b))];
 const travel=new Set(['dash','jump']);
 function isTravel(id){return travel.has(id);}
 function travelRange(id,upgrades={},awakenings={}){
   const upgrade=key=>Number.isFinite(upgrades[key])?Math.max(0,upgrades[key]):0;
   if(id==='dash')return (150+upgrade('dashRange')*50)*(awakenings.dash===1?2:awakenings.dash===2?.75:1);
   if(id==='jump')return 270*(1+upgrade('jumpRange')/3);
   return null;
 }
 function needsAim(id,awakenings={}){return aimed.has(id)&&!(id==='burningGlyph'&&awakenings.burningGlyph===2)&&!(id==='brokle'&&awakenings.brokle!==1);}
 function radialSpec(id,upgrades={},awakenings={}){
   if(!needsAim(id,awakenings))return null;
   if(isTravel(id))return {distance:travelRange(id,upgrades,awakenings),variable:false,showRange:true};
   const upgrade=key=>Number.isFinite(upgrades[key])?Math.max(0,upgrades[key]):0;
   if(id==='staffBoomerang')return {distance:310*(1+upgrade('staffRange')*.2),variable:false,showRange:true};
   if(id==='cut')return {distance:350*(1+upgrade('cutRange')*.2)*(awakenings.cut===1?1.65:1),variable:true,showRange:true};
   const ranges={burningGlyph:200,immobilizationGlyph:200,celestialSword:360,iopSword:380,lethalAttack:80,massTrap:230,repulsiveTrap:330,sramDouble:80,brokle:220};
   if(id in ranges)return {distance:ranges[id],variable:true,showRange:true};
   // These casts use direction rather than distance. This is a visible aiming
   // handle, not a claim about their attack range or area of effect.
   if(id==='arnaque')return {distance:180,variable:false,showRange:true};
   if(id==='swordOfFate'||id==='fear')return {distance:150,variable:false,showRange:false};
   return null;
 }
 function assign(spells,awakenings={},custom={}){
   const slots=Array(names.length).fill(null);
   const entries=spells.map(spell=>({...spell,aimed:needsAim(spell.id,awakenings)}));
   for(const spell of entries){const index=names.indexOf(custom[spell.id]);if(index>=0&&!slots[index])slots[index]={...spell,button:names[index],index};}
   for(const group of [true,false])for(const spell of entries.filter(s=>s.aimed===group&&!slots.some(entry=>entry?.id===s.id))){
     const order=group?[2,3,4,5,0,1,6,7]:[0,1,2,3,4,5,6,7];order.push(...names.map((_,i)=>i).slice(8));
     const index=order.find(i=>slots[i]===null);
     if(index!==undefined)slots[index]={...spell,button:names[index],index};
   }
   return slots;
 }
 const api={names,needsAim,assign,isTravel,travelRange,radialSpec};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.thorSpellBindings=api;
})(typeof window==='object'?window:globalThis);
