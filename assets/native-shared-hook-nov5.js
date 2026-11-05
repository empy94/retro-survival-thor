/* Exact SHA-256 checked by the host before adapting this shared module. */
;$o=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=XM;XM=enemy=>thorBasicTargetable(enemy)&&!LM(enemy);
;const thorRegistrySource=hc,thorRegistries=new Map();
;hc=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:pg,items:ug,radiant:_g,target:Zj,taunts:WX,fixedBonuses:{'sram-hat':{'sram-trap-size':50}},summonTargetable:qj});
;xg=thorGearWork.bonus;P=thorGearWork.total;
;window.thorGameData={version:'fe2bac829e322573be8d90f90ae062c82464dc7528636623bc5a51ec158b9ffe',attackRange:eN,getClass:wr,classes:Cr,enemyDefs:O,summonDefs:LX,items:ug,spells:ci,awakenings:li,normalizeProgress:gn,summonState:ij,createState:y2,statDescriptors:zm,statCurrent:qm,statNext:Jm,makeItem:Cg,makeRadiant:Tg,abilityClips:Tc,mapClips:nl,loadClips:yc,clipDirection:E,crow:v_};
;window.thorGameData.petRules={maximumXp:ee,definitions:x,level:oe,bonus:se};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?V1(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>R$(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=XM;
;window.thorGameData.achievementCatalog=h;
