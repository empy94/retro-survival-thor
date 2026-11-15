/* Exact SHA-256 checked by the host before adapting this shared module. */
;pc=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=E1;E1=enemy=>thorBasicTargetable(enemy)&&!u1(enemy);
;const thorRegistrySource=Nl,thorRegistries=new Map();
;Nl=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:I_,items:N_,radiant:B_,target:w$,taunts:K4,fixedBonuses:{'sram-hat':{'sram-trap-size':50}},summonTargetable:y$});
;W_=thorGearWork.bonus;vv=thorGearWork.total;
;window.thorGameData={version:'00e039ed29b61db9cfd08337897527cf6000f62b1ca1366a1fae49833f92776c',attackRange:A1,getClass:bi,classes:yi,enemyDefs:O,summonDefs:z4,items:N_,spells:ca,awakenings:la,normalizeProgress:ir,summonState:jQ,createState:M9,statDescriptors:tx,statCurrent:lx,statNext:ux,statAvailable:b9,makeItem:K_,makeRadiant:J_,abilityClips:Ul,mapClips:Eu,loadClips:Ll,clipDirection:E,crow:iE};
;window.thorGameData.dofusDefinitions=v;
;window.thorGameData.petRules={maximumXp:re,definitions:C,level:de,bonus:fe};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?Z5(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>Y8(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=E1;
;window.thorGameData.achievementCatalog=b;
