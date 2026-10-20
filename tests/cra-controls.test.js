'use strict';
const assert=require('node:assert/strict'),bindings=require('../assets/spell-bindings.js'),policy=require('../assets/spell-policy.js'),{plan}=require('../assets/auto-spells.js');
for(const id of ['burningArrow','explosiveArrow','moleEye','dispersingArrow','recoilArrow','lashingArrow','punitiveArrow']){
 assert(bindings.needsAim(id),id);assert(policy.allowed(id,'cra','full',{}),id);
}
for(const id of ['frozenArrow','harassingArrow','distantShot','criticalShot'])assert(!policy.allowed(id,'cra','full',{}),'native passive: '+id);
assert(!policy.allowed('explosiveArrow','cra','full',{}, {explosiveArrow:2}));assert(!bindings.needsAim('explosiveArrow',{explosiveArrow:2}));
const state={character:'cra',phase:'playing',width:742,height:432,player:{x:200,y:216,hp:15,maxHp:15},buffs:{bowMasteryTimer:4},upgrades:{},awakenings:{},enemies:[]};
assert.equal(plan(state,[{id:'bowMastery',ready:true}],bindings,'buffs'),null,'do not recast active native buff');
assert.equal(plan(state,[{id:'powerfulShot',ready:true}],bindings,'buffs').spell.id,'powerfulShot');
const map={radialSpec:()=>({distance:450,variable:true})},enemies=[{x:330,y:210,r:15},{x:350,y:220,r:15},{x:340,y:240,r:15}];
const shot=plan({...state,enemies},[{id:'explosiveArrow',ready:true,aimed:true}],map,'full');assert(shot&&shot.target.x>300);
const slots=bindings.assign(policy.catalog.classes.cra.filter(id=>!policy.isPassive(id)).map(id=>({id})));
assert(slots.some(s=>s?.id==='punitiveArrow'&&s.aimed));assert.equal(policy.classFor('rat-noir'),'cra');
console.log('Crâ controls: seven aimed casts, four native passives, automatic awakening, buff timers, clustered aim and controller slots passed.');
