/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='1dd7f9facf3a3a87da6c1b3e71c5d20e5d0b9095bfecc321144b2db154a72f98')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'fc2c0e3e3bc60df5ae464ce53a88d798f4da8fb5975d56df9c97f4ec934671f0',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?He(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=gS(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=gV;gV=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 qx=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Kx(state,id)]));
 Qx=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Zx(state,id)]));
})();
