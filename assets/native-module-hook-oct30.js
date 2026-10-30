/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='415982b2dfdca8716165280d62adf2d34710b6f65209766d2af025631a1fc30b')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'c65f99356ced4c4c4b334cd29aaa97312dc44efa71c5f7f9881a5a2385494c4e',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?Gi(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=HC(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=DU;DU=context=>{window.thorNativeContext=context;return canvas(context);};
 window.thorGameAdapter.sadidaTarget=id=>{const s=window.thorNativeContext?.gameRef.current;return s?.characterId==='sadida'?sv(s,id):null;};
 // Current-class previews retain the official calculations.
 yC=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,_C(state,id)]));
 wC=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,CC(state,id)]));
})();
