/* Official split-module build, verified 21 November 2026. */
;(function(){
 const data=window.thorGameData;
 if(data?.version!=='cf673af30b9a12c73c5f00b94dbb5b73ca461f78cbf86fe1d312b2b07ccf363f')return;
 // Installed before React mounts: hook order remains stable throughout the document.
 if(window.thorControllerOwnership?.owner==='android'){u0=()=>{};window.thorNativeGamepadDisabled=true;}
 window.thorGameAdapter={cleanProgress:data.normalizeProgress,version:'c3a7613ab4306c6d7eb7e6379c661d03b7b9eb59777b0f1c6e07c61414adaa6d',aimTiming(id){const s=window.thorNativeContext?.gameRef.current;return s?Fy(s,id):0;},canAutoCast(id){
  if(id==='xelorDarkRay')return !window.thorNativeContext?.gameRef.current?.xelor?.beam;
  if(id!=='crow')return true;
  const s=window.thorNativeContext?.gameRef.current;
  return (s?.characterId==='osamodas'||s?.levelId==='arena'&&s.abilityUnlocked.crow)&&s.phase==='playing'&&s.enemies.some(enemy=>data.canTargetEnemy(enemy)&&Math.hypot(enemy.x-s.player.x,enemy.y-s.player.y)<=data.crow.range+enemy.r);
 },summonState(s){return (s?.characterId==='enutrof'||s?.levelId==='arena')?{chest:data.summonState(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s)return null;const distance=tN(s,id);return Number.isFinite(distance)?{distance,variable:distance>0&&!['dash','jump','cracklerStrike','fear','arnaque','swordOfFate'].includes(id),showRange:distance>0&&!['cracklerStrike','fear','arnaque','swordOfFate'].includes(id)}:null;}};
 const canvas=r1;r1=context=>{window.thorNativeContext=context;return canvas(context);};
 // Invert the game's touch normalization to preserve the requested direction and range.
 window.thorGameAdapter.touchNeedsCommit=id=>ZM.includes(id);
 window.thorGameAdapter.touchAimDelta=(id,originX,originY,dx,dy,ratio)=>{
  void nN;void vJ;
  const length=Math.hypot(dx,dy);
  if(!length||ji(id))return null;
  const room=_J(originX,originY,innerWidth,innerHeight);
  const x=dx/length*(dx>=0?room.right:room.left);
  const y=dy/length*(dy>=0?room.down:room.up);
  const scale=Math.max(ratio,12.1/Math.hypot(x,y));
  return {x:x*scale,y:y*scale};
 };
 window.thorGameAdapter.captureTarget=()=>{const s=window.thorNativeContext?.gameRef.current;return s?Qx(s,s.player.x,s.player.y):null;};
 window.thorGameAdapter.sadidaTarget=id=>{const s=window.thorNativeContext?.gameRef.current;return (s?.characterId==='sadida'||s?.levelId==='arena')?tu(s,id):null;};
 // Arena previews must retain the native union of learned spells across classes.
})();
