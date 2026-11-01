/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='0f3ad77d5d72296adf269a32d4b8c5da55430fffa245be0ac9fbb61d2decd73b')return;
 // Installed before React mounts: hook order remains stable throughout the document.
 if(window.thorControllerOwnership?.owner==='android'){hG=()=>{};window.thorNativeGamepadDisabled=true;}
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'0aad7caa8732a0621137c2481c16a5f4f7a6cc44d3bdc840305e63d5880e233a',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?mp(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return s?.characterId==='osamodas'&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return s?.characterId==='enutrof'?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=XC(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=ZU;ZU=context=>{window.thorNativeContext=context;return canvas(context);};
 window.thorGameAdapter.sadidaTarget=id=>{const s=window.thorNativeContext?.gameRef.current;return s?.characterId==='sadida'?Od(s,id):null;};
 // Current-class previews retain the official calculations.
 DC=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,TC(state,id)]));
 MC=state=>Object.fromEntries([...new Set([...data.getClass(state).abilities,...['cawotte','chaferfu','arakne'].filter(id=>state.abilityUnlocked[id])])].map(id=>[id,jC(state,id)]));
})();
