/* Exact audited module only. Its animation descriptors are static and callers
 * only read this registry. Io otherwise merges the entire Sufokia registry
 * once per discarded clip every 750 ms, overwhelming older Android WebViews. */
;(function(){
 if(window.thorAnimationRegistryCached)return;
 const original=Ao,registries=new Map();
 Ao=level=>{
   if(!['astrub','wabbit','litneg','gelee'].includes(level))return original(level);
   if(!registries.has(level))registries.set(level,original(level));
   return registries.get(level);
 };
 window.thorAnimationRegistryCached=true;
})();

/* The native touch deck omits Enutrof targets, although castTouchAbility
 * accepts their vectors. Enable the same hold/move/release path as other casts. */
;(function(){for(const id of ['shovelJudgment', 'slaughteringShovel', 'shovelKiss', 'mound', 'animatedChest', 'shovelThrow', 'corruption']){if(!mO.includes(id))mO.push(id);}})();
