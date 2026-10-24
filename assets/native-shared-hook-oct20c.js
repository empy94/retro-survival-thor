/* Exact SHA-256 checked by the host before adapting this shared module. */
;Ba=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=qx;qx=enemy=>thorBasicTargetable(enemy)&&!iC(enemy);
;const thorRegistrySource=ns,thorRegistries=new Map();
;ns=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:sp,items:ip,radiant:dp,target:kN,taunts:TP,summonTargetable:TN});
;mp=thorGearWork.bonus;P=thorGearWork.total;
;window.thorGameData={version:'cd3ea78d85b12946c572a5098d452ae134d876cd326d48ce8d42c969748b2ed2',attackRange:Xx,getClass:T,classes:xi,enemyDefs:A,summonDefs:gP,items:ip,spells:Xt,awakenings:Zt,normalizeProgress:_t,summonState:LM,createState:GH,statDescriptors:mm,statCurrent:Sm,statNext:Cm,makeItem:gp,makeRadiant:_p,abilityClips:fs,mapClips:js,loadClips:os,clipDirection:O,crow:my};
;window.thorGameData.petRules={maximumXp:v,definitions:y,level:ae,bonus:oe};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?KA(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>GN(state,cells,x,y)]:[];
});
