/* Official split-module build, verified 15 November 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='00e039ed29b61db9cfd08337897527cf6000f62b1ca1366a1fae49833f92776c')return;
 // Installed before React mounts: hook order remains stable throughout the document.
 if(window.thorControllerOwnership?.owner==='android'){KY=()=>{};window.thorNativeGamepadDisabled=true;}
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'eb68ae3df286d7ed378cd00592588ac4e9159557129edc87f40df9e129c2f8e7',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?vh(s,id):0;},canAutoCast(id){
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return (s?.characterId==='osamodas'||s?.levelId==='arena'&&s.abilityUnlocked.crow)&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return (s?.characterId==='enutrof'||s?.levelId==='arena')?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=hD(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=VJ;VJ=context=>{window.thorNativeContext=context;return canvas(context);};
 // Invert the game's touch normalization to preserve the requested direction and range.
 window.thorGameAdapter.touchNeedsCommit=id=>dD.includes(id);
 window.thorGameAdapter.touchAimDelta=(id,originX,originY,dx,dy,ratio)=>{
  void gD;void OU;
  const length=Math.hypot(dx,dy);
  if(!length||ol(id))return null;
  const room=DU(originX,originY,innerWidth,innerHeight);
  const x=dx/length*(dx>=0?room.right:room.left);
  const y=dy/length*(dy>=0?room.down:room.up);
  const scale=Math.max(ratio,12.1/Math.hypot(x,y));
  return {x:x*scale,y:y*scale};
 };
 window.thorGameAdapter.sadidaTarget=id=>{const s=window.thorNativeContext?.gameRef.current;return (s?.characterId==='sadida'||s?.levelId==='arena')?hl(s,id):null;};
 // Arena previews must retain the native union of learned spells across classes.
})();
