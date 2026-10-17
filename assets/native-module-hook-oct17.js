/* Official split-module build, verified 17 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='5487ff3251ae4881d60089eb496f10616af9679522c83c21402bf07d979b1202')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'1b97b721d070bcbe2f280813318d5b59605a4a0863d13a73db302e49f348c9a3',canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>$_(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=$r.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=yy(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=SP;SP=context=>{window.thorNativeContext=context;return canvas(context);};
 // Current-class previews retain the official calculations.
 Xv=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...(state.abilityUnlocked.cawotte?['cawotte']:[])])].map(id=>[id,Yv(state,id)]));
 ty=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...(state.abilityUnlocked.cawotte?['cawotte']:[])])].map(id=>[id,ey(state,id)]));
})();
