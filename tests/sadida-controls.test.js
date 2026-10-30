const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const policy=require('../assets/spell-policy.js'),mapping=require('../assets/spell-bindings.js');
const ids=policy.catalog.classes.sadida;assert.equal(ids.length,14);
for(const id of ['tremor','paralysingPoison','aggressiveBrambles'])assert(!policy.allowed(id,'sadida','full',{}));
for(const id of ['multipleBrambles','tear','soothingBramble','madGrass']){assert(mapping.needsAim(id));assert(policy.allowed(id,'sadida','full',{}));}
const active=ids.filter(id=>!policy.isPassive(id));assert.equal(mapping.assign(active.map(id=>({id}))).filter(Boolean).length,active.length);
assert(policy.allowed('sylvanPower','sadida','buffs',{}));assert(!policy.allowed('tear','sadida','buffs',{}));
const window={thorGameAdapter:{sadidaTarget:()=>({x:110,y:100})}},out={exports:{}};
vm.runInNewContext(fs.readFileSync('assets/auto-spells.js','utf8'),{window,module:out});const plan=out.exports.plan;
const state={character:'sadida',phase:'playing',player:{x:100,y:100,hp:5,maxHp:5},buffs:{},enemies:[{x:120,y:100,r:10}],upgrades:{},awakenings:{},width:1500,height:875};
assert.equal(plan(state,[{id:'sylvanPower',ready:true}],mapping).spell.id,'sylvanPower');
state.enemies[0].x=500;assert.equal(plan(state,[{id:'sylvanPower',ready:true}],mapping),null);
assert.equal(plan(state,[{id:'tear',ready:true}],mapping).target.x,110);
window.thorGameAdapter.sadidaTarget=()=>undefined;assert.equal(plan(state,[{id:'tear',ready:true}],mapping),null,'no cast at invalid native target');
state.player.hp=1;assert.equal(plan(state,[{id:'sylvanPower',ready:true}],mapping,'buffs').spell.id,'sylvanPower');
console.log('Sadida: manual targeting, native automatic targeting, passive exclusion and defensive tree passed');
