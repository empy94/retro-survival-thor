/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='2809ed12b1ca404c0a6f5c86ab0fdd5925f415d0c5c7af923886c08c89b2e961')return;
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'19bbbc6ed02316897a13cf7882f110b7b6ccc6e01c4de96bc293baa18f7f7543',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?pp(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=UC(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=OU;OU=context=>{window.thorNativeContext=context;return canvas(context);};
 window.thorGameAdapter.sadidaTarget=id=>{const s=window.thorNativeContext?.gameRef.current;return s?.characterId==='sadida'?cv(s,id):null;};
 // Current-class previews retain the official calculations.
 bC=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,vC(state,id)]));
 TC=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,wC(state,id)]));
})();
