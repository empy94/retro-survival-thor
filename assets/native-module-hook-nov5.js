/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='fe2bac829e322573be8d90f90ae062c82464dc7528636623bc5a51ec158b9ffe')return;
 // Installed before React mounts: hook order remains stable throughout the document.
 if(window.thorControllerOwnership?.owner==='android'){hK=()=>{};window.thorNativeGamepadDisabled=true;}
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'e4bb15ff9d5d7d918c84bbf30da1a5d5469cf252812a4bc70dbc4363ce026239',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?qg(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return (s?.characterId==='osamodas'||s?.levelId==='arena'&&s.abilityUnlocked.crow)&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return (s?.characterId==='enutrof'||s?.levelId==='arena')?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=jw(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=YW;YW=context=>{window.thorNativeContext=context;return canvas(context);};
 window.thorGameAdapter.sadidaTarget=id=>{const s=window.thorNativeContext?.gameRef.current;return (s?.characterId==='sadida'||s?.levelId==='arena')?ch(s,id):null;};
 // Arena previews must retain the native union of learned spells across classes.
})();
