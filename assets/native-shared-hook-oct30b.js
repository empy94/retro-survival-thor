/* Exact SHA-256 checked by the host before adapting this shared module. */
;$o=()=>true;
// Do not let passive crowd control freeze a Boo in its invulnerable puddle phase.
// Only target selection changes; native phases, damage and cooldowns remain authoritative.
;const thorBasicTargetable=lI;lI=enemy=>thorBasicTargetable(enemy)&&!XF(enemy);
;const thorRegistrySource=gc,thorRegistries=new Map();
;gc=level=>{if(!thorRegistries.has(level))thorRegistries.set(level,thorRegistrySource(level));return thorRegistries.get(level);};
;window.thorAnimationRegistryCached=true;
;window.thorMobileAssetsEnabled=true;
;const thorGearWork=window.thorWorkCache.install({slots:Pm,items:jm,radiant:Rm,target:uF,taunts:qZ,fixedBonuses:{'sram-hat':{'sram-trap-size':50}},summonTargetable:oF});
;Hm=thorGearWork.bonus;N=thorGearWork.total;
;window.thorGameData={version:'2809ed12b1ca404c0a6f5c86ab0fdd5925f415d0c5c7af923886c08c89b2e961',attackRange:pI,getClass:T,classes:ta,enemyDefs:k,summonDefs:BZ,items:jm,spells:ka,awakenings:Aa,normalizeProgress:pn,summonState:_P,createState:w1,statDescriptors:Xg,statCurrent:i_,statNext:a_,makeItem:Wm,makeRadiant:Gm,abilityClips:Ec,mapClips:Gc,loadClips:bc,clipDirection:D,crow:O_};
;window.thorGameData.petRules={maximumXp:ee,definitions:x,level:oe,bonus:se};
// Read-only warning geometry for the invulnerable late-game pursuer.
;window.thorGameData.specialThreats=state=>state.enemies.flatMap(enemy=>{
 const action=enemy.kind==='oto-mustam'&&enemy.hp>0&&enemy.state!=='dead'&&enemy.oto?.action;
 if(!action||action.released)return [];
 if(action.spell==='melee')return [(x,y)=>Math.hypot(x-enemy.x,y-enemy.y)<=134];
 const cells=action.spell==='rekop'?GM(state,action.x,action.y):action.cells;
 return cells?.length?[(x,y)=>NT(state,cells,x,y)]:[];
});

;window.thorGameData.canTargetEnemy=lI;
;window.thorGameData.achievementCatalog=h;
