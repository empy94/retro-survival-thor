/* Exact SHA-256 checked by the host before adapting this shared module. */
;Zd=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=Z;Z=enemy=>thorBasicTargetable(enemy)&&!v4(enemy);
;const thorRegistrySource=Cp,thorRegistries=new Map();
;Cp=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:_y,items:my,radiant:xy,target:Z2,taunts:F6,fixedBonuses:{'sram-hat':{'sram-trap-size':50}},summonTargetable:K2});
;Ty=thorGearWork.bonus;$y=thorGearWork.total;
;window.thorGameData={version:'cf673af30b9a12c73c5f00b94dbb5b73ca461f78cbf86fe1d312b2b07ccf363f',attackRange:P4,getClass:ns,classes:ts,enemyDefs:D,summonDefs:k6,items:my,spells:tl,awakenings:nl,normalizeProgress:ai,summonState:S2,createState:p9,statDescriptors:hx,statCurrent:bx,statNext:xx,statAvailable:r9,makeItem:Dy,makeRadiant:ky,abilityClips:Np,mapClips:ine,loadClips:Dp,clipDirection:E,crow:wb};
;window.thorGameData.dofusDefinitions=b;
;window.thorGameData.petRules={maximumXp:me,definitions:he,level:Ce,bonus:we};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?u7(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>M5(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=Z;
;window.thorGameData.achievementCatalog=le;
