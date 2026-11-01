/* Exact SHA-256 checked by the host before adapting this shared module. */
;us=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=HR;HR=enemy=>thorBasicTargetable(enemy)&&!kR(enemy);
;const thorRegistrySource=Ec,thorRegistries=new Map();
;Ec=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:Wm,items:Vm,radiant:Jm,target:UL,taunts:lQ,fixedBonuses:{'sram-hat':{'sram-trap-size':50}},summonTargetable:zL});
;Qm=thorGearWork.bonus;wh=thorGearWork.total;
;window.thorGameData={version:'0f3ad77d5d72296adf269a32d4b8c5da55430fffa245be0ac9fbb61d2decd73b',attackRange:KR,getClass:w,classes:na,enemyDefs:k,summonDefs:nQ,items:Vm,spells:Ba,awakenings:Va,normalizeProgress:pn,summonState:XI,createState:B1,statDescriptors:s_,statCurrent:h_,statNext:g_,makeItem:eh,makeRadiant:th,abilityClips:Ic,mapClips:tl,loadClips:Ac,clipDirection:D,crow:z_};
;window.thorGameData.petRules={maximumXp:ee,definitions:x,level:oe,bonus:se};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?wF(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>WT(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=HR;
;window.thorGameData.achievementCatalog=h;
