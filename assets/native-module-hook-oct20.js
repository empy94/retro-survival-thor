/* Official split-module build, verified 19 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='b6c21e218ffeb9e2eb14bbfc4ef25ba1237b1b8fee970709b69043f1134e4826')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'511ac6afd270438a8011f12e228269868dbb8ae176a8ae9c1a9a7032a94f27c1',canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>by(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=Bb(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=YI;YI=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 _b=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,gb(state,id)]));
 Sb=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,xb(state,id)]));
})();
