/* Exact SHA-256 checked by the host before adapting this shared module. */
;xo=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=wS;wS=enemy=>thorBasicTargetable(enemy)&&!BP(enemy);
;const thorRegistrySource=Is,thorRegistries=new Map();
;Is=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:th,items:Qm,radiant:ah,target:eP,taunts:_V,summonTargetable:XN});
;ch=thorGearWork.bonus;B=thorGearWork.total;
;window.thorGameData={version:'4350d495a1ebcbe425223a1cb9cd5cdf537853f22433728dbad08019f4410f52',attackRange:OS,getClass:O,classes:Di,enemyDefs:I,summonDefs:uV,items:Qm,spells:ta,awakenings:na,normalizeProgress:St,summonState:cN,createState:CU,statDescriptors:Jf,statCurrent:np,statNext:rp,makeItem:uh,makeRadiant:dh,abilityClips:Ks,mapClips:dc,loadClips:Bs,clipDirection:T,crow:rg};
;window.thorGameData.petRules={maximumXp:v,definitions:y,level:ie,bonus:ae};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?Hj(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>Ww(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=wS;
;window.thorGameData.achievementCatalog=f;
