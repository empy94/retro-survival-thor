/* Exact SHA-256 checked by the host before adapting this shared module. */
;go=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=HM;HM=enemy=>thorBasicTargetable(enemy)&&!zS(enemy);
;const thorRegistrySource=js,thorRegistries=new Map();
;js=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:Jm,items:Gm,radiant:Qm,target:AM,taunts:rV,summonTargetable:EM});
;th=thorGearWork.bonus;B=thorGearWork.total;
;window.thorGameData={version:'5bcd46ed7a03fa4e2252ded4083159b10306c4c75de6d77990c47252d720ac8d',attackRange:KM,getClass:D,classes:Ci,enemyDefs:I,summonDefs:XB,items:Gm,spells:Zi,awakenings:Qi,normalizeProgress:bt,summonState:Rj,createState:lU,statDescriptors:Vf,statCurrent:Yf,statNext:Xf,makeItem:rh,makeRadiant:ih,abilityClips:Vs,mapClips:oc,loadClips:Fs,clipDirection:w,crow:Xh};
;window.thorGameData.petRules={maximumXp:v,definitions:y,level:ae,bonus:oe};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?vA(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>AC(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=HM;
;window.thorGameData.achievementCatalog=f;
