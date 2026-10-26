/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='4350d495a1ebcbe425223a1cb9cd5cdf537853f22433728dbad08019f4410f52')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'fec9b2bce499c676cbf8a728110fb1575039a19f89be42641d0b085a94b8be0c',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?bi(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=vS(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=bV;bV=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 Yx=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,Jx(state,id)]));
 eS=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,$x(state,id)]));
})();
