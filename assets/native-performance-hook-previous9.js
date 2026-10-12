/* Exact audited module only. Its animation descriptors are static and callers
 * only read this registry. Io otherwise merges the entire Sufokia registry
 * once per discarded clip every 750 ms, overwhelming older Android WebViews. */
;(function(){
 if(window.thorAnimationRegistryCached)return;
 // Prefer the official mobile sprite variants and reduced appearance atlas scale.
 // Android WebView can expose desktop pointer/memory hints on a controller console.
 Ga=()=>true;
 window.thorMobileAssetsEnabled=true;
 const original=zo,registries=new Map();
 zo=level=>{
   if(!['astrub','wabbit','litneg','gelee'].includes(level))return original(level);
   if(!registries.has(level))registries.set(level,original(level));
   return registries.get(level);
 };
 window.thorAnimationRegistryCached=true;
})();

/* The native touch deck omits Enutrof targets, although castTouchAbility
 * accepts their vectors. Enable the same hold/move/release path as other casts. */
;(function(){for(const id of ['shovelJudgment', 'slaughteringShovel', 'shovelKiss', 'mound', 'animatedChest', 'shovelThrow', 'corruption']){if(!dk.includes(id))dk.push(id);}})();
