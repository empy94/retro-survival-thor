(function(root){
 'use strict';
 // Confirmed in the official game on 2026-10-08. Only read its existing save.
 const catalogue=[{id:'dofawa',name:'Dofawa',level:'Astrub',icon:'https://retrosurvival.online/assets/item-dofawa.png'},{id:'cawotte',name:'Dofus Cawotte',level:'Île Wabbit',icon:'https://retrosurvival.online/assets/wabbit/cawotte.png'}];
 const ranges={dofawa:[['PV max',1,1,'']],cawotte:[['XP reçue',6,50,'%']],kritter:[['Critique',25,40,'%']],'chafer-helmet':[['Dommages',50,90,'%'],['Dommages des sorts',50,90,'%'],['Dommages attaque',50,90,'%']]};
 const text=value=>root.thorLocale?.text(value)||value;
 let previousRaw,previousLocale,previousSnapshot;
 function describe(item){
   const effects=ranges[item?.id];if(!effects)return null;
   return effects.map(([label,min,max,unit])=>({label:text(label),min,max,unit,radiant:Math.ceil(max*1.5)}));
 }
 function snapshot(){
   let progress;
   try{const raw=root.localStorage.getItem('retro-survival.progress.v1'),locale=root.thorLocale?.language||'fr';
     if(previousSnapshot&&raw===previousRaw&&locale===previousLocale)return previousSnapshot;
     previousRaw=raw;previousLocale=locale;previousSnapshot=null;
     progress=raw===null?{collectedDofus:[],radiantDofus:[]}:JSON.parse(raw);
     if(!progress||!Array.isArray(progress.collectedDofus)||progress.collectedDofus.some(id=>typeof id!=='string'))return {status:'unavailable'};
   }catch{return {status:'unavailable'};}
   const radiant=new Set(Array.isArray(progress.radiantDofus)?progress.radiantDofus:[]),owned=new Set([...progress.collectedDofus,...radiant]);
   const entries=catalogue.map(item=>{
     const obtained=owned.has(item.id),isRadiant=obtained&&radiant.has(item.id);
     const roll=Number.isInteger(progress.cawotteRoll)&&progress.cawotteRoll>=6&&progress.cawotteRoll<=50?progress.cawotteRoll:null;
     const bonus=!obtained?'':item.id==='dofawa'?'+'+(isRadiant?2:1)+' '+text('PV max'):isRadiant?'+75 % XP':roll===null?text('Jet indisponible'):'+'+roll+' % XP';
     return {...item,name:text(item.name),level:text(item.level),owned:obtained,radiant:isRadiant,bonus,ranges:describe(item)};
   });
   return previousSnapshot={status:'available',owned:entries.filter(item=>item.owned).length,total:entries.length,entries};
 }
 const api={snapshot,describe};if(typeof module==='object'&&module.exports)module.exports=api;else root.thorCollection=api;
})(typeof window==='object'?window:globalThis);
