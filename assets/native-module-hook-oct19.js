/* Official split-module build, verified 17 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='dd11a2dafbfe3568aeda998b50431276424dc77b9a0c286e0aab35476739c6b6')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'ea54faf3fbdab1d304764b85cf1a1087b2a23d4172589c3f3d83a5e863ce12f6',canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>uv(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=Ay(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=gL;gL=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 sy=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,oy(state,id)]));
 fy=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,dy(state,id)]));
})();
