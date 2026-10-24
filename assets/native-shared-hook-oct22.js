/* Exact SHA-256 checked by the host before adapting this shared module. */
;vo=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=GM;GM=enemy=>thorBasicTargetable(enemy)&&!HS(enemy);
;const thorRegistrySource=Ns,thorRegistries=new Map();
;Ns=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:Zm,items:Jm,radiant:th,target:NM,taunts:oV,summonTargetable:kM});
;ih=thorGearWork.bonus;B=thorGearWork.total;
;window.thorGameData={version:'1dd7f9facf3a3a87da6c1b3e71c5d20e5d0b9095bfecc321144b2db154a72f98',attackRange:YM,getClass:D,classes:Ti,enemyDefs:I,summonDefs:$B,items:Jm,spells:$i,awakenings:ea,normalizeProgress:bt,summonState:Vj,createState:fU,statDescriptors:Wf,statCurrent:Qf,statNext:$f,makeItem:oh,makeRadiant:sh,abilityClips:Us,mapClips:cc,loadClips:Ls,clipDirection:w,crow:$h};
;window.thorGameData.petRules={maximumXp:v,definitions:y,level:ae,bonus:oe};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?xA(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>NC(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=GM;
;window.thorGameData.achievementCatalog=f;
