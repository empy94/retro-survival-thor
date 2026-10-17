/* Official split-module build, verified 17 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='147bdcf4f603c279dbd38995aa3a4b137e592d3f2f6cd6d49c82d57db6156f6c')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'707fcdf646b13f086b261af84039a2bf517a1f656352b8a18e13ef19b2b7518b',canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>av(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=pf.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=Ty(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=nF;nF=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 ny=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,ty(state,id)]));
 sy=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,oy(state,id)]));
})();
