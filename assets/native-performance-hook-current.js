/* Exact audited module only. Its animation descriptors are static and callers
 * only read this registry. Io otherwise merges the entire Sufokia registry
 * once per discarded clip every 750 ms, overwhelming older Android WebViews. */
;(function(){
 if(window.thorAnimationRegistryCached)return;
 const original=ko,registries=new Map();
 ko=level=>{
   if(!['astrub','wabbit','litneg','gelee'].includes(level))return original(level);
   if(!registries.has(level))registries.set(level,original(level));
   return registries.get(level);
 };
 window.thorAnimationRegistryCached=true;
})();
