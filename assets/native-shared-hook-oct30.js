/* Exact SHA-256 checked by the host before adapting this shared module. */
;$o=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=oI;oI=enemy=>thorBasicTargetable(enemy)&&!qF(enemy);
;const thorRegistrySource=hc,thorRegistries=new Map();
;hc=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:Nm,items:Am,radiant:Lm,target:oF,taunts:UZ,summonTargetable:rF});
;Vm=thorGearWork.bonus;ph=thorGearWork.total;
;window.thorGameData={version:'415982b2dfdca8716165280d62adf2d34710b6f65209766d2af025631a1fc30b',attackRange:uI,getClass:T,classes:ta,enemyDefs:A,summonDefs:IZ,items:Am,spells:ka,awakenings:Aa,normalizeProgress:pn,summonState:hP,createState:b1,statDescriptors:Xg,statCurrent:i_,statNext:a_,makeItem:Um,makeRadiant:Wm,abilityClips:Tc,mapClips:Wc,loadClips:yc,clipDirection:O,crow:O_};
;window.thorGameData.petRules={maximumXp:ee,definitions:x,level:oe,bonus:se};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?UM(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>NT(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=oI;
;window.thorGameData.achievementCatalog=h;
