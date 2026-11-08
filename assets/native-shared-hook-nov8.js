/* Exact SHA-256 checked by the host before adapting this shared module. */
;nc=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=m1;m1=enemy=>thorBasicTargetable(enemy)&&!Q$(enemy);
;const thorRegistrySource=Cl,thorRegistries=new Map();
;Cl=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:F_,items:M_,radiant:z_,target:f$,taunts:R4,fixedBonuses:{'sram-hat':{'sram-trap-size':50}},summonTargetable:c$});
;U_=thorGearWork.bonus;_v=thorGearWork.total;
;window.thorGameData={version:'76dad3737b8ada8a872d021bfb60da7a0fbfd4f8474863be9bb6eb9150949eb9',attackRange:v1,getClass:gi,classes:w,enemyDefs:O,summonDefs:j4,items:M_,spells:Zi,awakenings:Qi,normalizeProgress:ir,summonState:bQ,createState:R9,statDescriptors:Jb,statCurrent:nx,statNext:rx,statAvailable:E9,makeItem:G_,makeRadiant:q_,abilityClips:Nl,mapClips:gu,loadClips:Dl,clipDirection:E,crow:rE};
;window.thorGameData.dofusDefinitions=v;
;window.thorGameData.petRules={maximumXp:ie,definitions:ae,level:pe,bonus:me};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?U5(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>V8(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=m1;
;window.thorGameData.achievementCatalog=b;
