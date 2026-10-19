/* Official split-module build, verified 19 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='7a9a8a55f0e9f828f2ccb6a016e6c3d026ba5d0cd3a3fb17bb3157fd46d0b3e7')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'843e12753edb91179a804da52a4bd65af6be7edce58b6e4e34ce5b785fcfd269',canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>Jv(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=mb(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=ML;ML=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 Gy=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Wy(state,id)]));
 Xy=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Yy(state,id)]));
})();
