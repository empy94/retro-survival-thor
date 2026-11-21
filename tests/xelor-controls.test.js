const assert=require('node:assert/strict'),policy=require('../assets/spell-policy.js'),mapping=require('../assets/spell-bindings.js'),{plan}=require('../assets/auto-spells.js');
for(const id of ['xelorSlow','xelorCounter','xelorSeeker','xelorHourglass','xelorClock','xelorDevotion']){assert(policy.isPassive(id));assert(!policy.allowed(id,'xelor','full',{}));}
for(const id of ['xelorDust','xelorDial','xelorStrike','xelorDarkRay','xelorTeleport','xelorFlight']){assert(mapping.needsAim(id));assert(policy.allowed(id,'xelor','full',{}));assert(!policy.allowed(id,'xelor','full',{xelor:[id]}));}
assert(policy.isPassive('xelorDarkRay',{xelorDarkRay:3}));assert(!mapping.needsAim('xelorDarkRay',{xelorDarkRay:3}));assert(mapping.needsAim('soulCapture'));
assert(policy.allowed('xelorBlur','xelor','buffs',{}));assert(policy.allowed('xelorMummification','xelor','buffs',{}));assert(mapping.isTravel('xelorFlight'));
const s={character:'xelor',phase:'playing',width:742,height:432,player:{x:371,y:216,hp:8,maxHp:8},buffs:{xelorBlur:2},enemies:[],upgrades:{},awakenings:{}};
assert.equal(plan(s,[{id:'xelorBlur',ready:true}],mapping,'buffs'),null,'do not recast an active time buff');s.buffs.xelorBlur=0;assert.equal(plan(s,[{id:'xelorBlur',ready:true}],mapping,'buffs').spell.id,'xelorBlur');
console.log('Xelor: native passives, active aiming, manual exclusions, mirror awakening, shared Capture spell and buff timers passed.');
