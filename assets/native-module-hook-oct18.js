/* Official split-module build, verified 17 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='a161ca10ffe43612c1b8015e4b03fca63d6c5425430793b7388a4de3206d1eb4')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'0ece8d95aeb0e97879c45350227ceb83ff10b7788a9802de4a6b208c5c64bcf5',canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>av(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=nu.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=Ty(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=CF;CF=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 ny=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,ty(state,id)]));
 sy=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,oy(state,id)]));
})();
