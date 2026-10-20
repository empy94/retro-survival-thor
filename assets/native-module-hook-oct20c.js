/* Official split-module build, verified 20 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='cd3ea78d85b12946c572a5098d452ae134d876cd326d48ce8d42c969748b2ed2')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'03e4768020c7b58114b82b628526f4313739e3eb3f29219748de338ad203ae4c',canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>((e)=>e.hp>0&&e.state!==`dead`&&e.invisibleTimer<=0&&(e.arrival??0)<=0)(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=sS(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=gB;gB=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 Rx=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Lx(state,id)]));
 Ux=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Hx(state,id)]));
})();
