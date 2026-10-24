/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='5bcd46ed7a03fa4e2252ded4083159b10306c4c75de6d77990c47252d720ac8d')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'257fef2cedf1d5f0f065a026da1dad8a729fe38b9fe7965a80bda2ffed85c66b',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?Be(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=pS(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=kB;kB=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 Wx=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Ux(state,id)]));
 Yx=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Jx(state,id)]));
})();
