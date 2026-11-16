/* Exact SHA-256 checked by the host before adapting this shared module. */
;hc=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=c1;c1=enemy=>thorBasicTargetable(enemy)&&!K$(enemy);
;const thorRegistrySource=Il,thorRegistries=new Map();
;Il=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:I_,items:N_,radiant:B_,target:s$,taunts:O4,fixedBonuses:{'sram-hat':{'sram-trap-size':50}},summonTargetable:r$});
;W_=thorGearWork.bonus;vv=thorGearWork.total;
;window.thorGameData={version:'a72515d2e370b73a75791e5421325b0be5e174801091acb9d0ad90a7c7071ac4',attackRange:f1,getClass:vi,classes:_i,enemyDefs:O,summonDefs:x4,items:N_,spells:la,awakenings:ua,normalizeProgress:rr,summonState:mQ,createState:m9,statDescriptors:tx,statCurrent:lx,statNext:ux,statAvailable:n9,makeItem:K_,makeRadiant:J_,abilityClips:Kl,mapClips:ku,loadClips:Bl,clipDirection:E,crow:eE};
;window.thorGameData.dofusDefinitions=v;
;window.thorGameData.petRules={maximumXp:re,definitions:C,level:de,bonus:fe};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?N5(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>j8(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=c1;
;window.thorGameData.achievementCatalog=b;
