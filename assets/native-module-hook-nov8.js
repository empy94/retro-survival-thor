/* Official split-module build, verified 21 October 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='76dad3737b8ada8a872d021bfb60da7a0fbfd4f8474863be9bb6eb9150949eb9')return;
 // Installed before React mounts: hook order remains stable throughout the document.
 if(window.thorControllerOwnership?.owner==='android'){DY=()=>{};window.thorNativeGamepadDisabled=true;}
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'88182314debe18747ddb011479a3bc8f7d39e3ddb5823b689d2065ca17488ccd',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?Cd(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return (s?.characterId==='osamodas'||s?.levelId==='arena'&&s.abilityUnlocked.crow)&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return (s?.characterId==='enutrof'||s?.levelId==='arena')?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=BE(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=sJ;sJ=context=>{window.thorNativeContext=context;return canvas(context);};
 window.thorGameAdapter.sadidaTarget=id=>{const s=window.thorNativeContext?.gameRef.current;return (s?.characterId==='sadida'||s?.levelId==='arena')?Go(s,id):null;};
 // Arena previews must retain the native union of learned spells across classes.
})();
