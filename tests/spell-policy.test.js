'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const policy=require('../assets/spell-policy.js'),mapping=require('../assets/spell-bindings.js');
assert.deepEqual(policy.sanitize({feca:['shield','shield','area','bad'],iop:['shield','jump'],sram:'bad'}),{feca:['shield'],iop:['jump'],sram:[]});
for(const [level,character] of Object.entries({astrub:'feca',litneg:'iop',wabbit:'sram'}))assert.equal(policy.classFor(level),character);
const manual={feca:['shield','staffBoomerang'],iop:['jump'],sram:['invisibility']};
assert.equal(policy.allowed('shield','feca','full',manual),false);
assert.equal(policy.allowed('speed','feca','buffs',manual),true);
assert.equal(policy.allowed('burningGlyph','feca','buffs',manual),false);
assert.equal(policy.allowed('burningGlyph','feca','full',manual),true);
assert.equal(policy.allowed('jump','iop','full',manual),false);
assert.equal(policy.allowed('power','iop','full',manual),true);
assert.equal(policy.allowed('invisibility','sram','buffs',manual),false);
assert.equal(policy.allowed('shield','iop','full',{}),false);
for(const character of Object.keys(policy.catalog.classes))for(const id of policy.catalog.classes[character]){
 assert.equal(policy.allowed(id,character,'off',{}),false);
 if(policy.catalog.passive.includes(id))assert.equal(policy.allowed(id,character,'full',{}),false);
 assert.ok(policy.catalog.spells[id].icon.startsWith('https://retrosurvival.online/assets/'));
}
let tick=null,chosen=[];
const document={hidden:false,addEventListener(){},querySelector:s=>s==='main'?{classList:{contains:c=>c==='phase-playing'}}:null,querySelectorAll:()=>['shield','speed'].map(id=>({__reactFiberTest:{key:id},getAttribute:()=>null}))};
const state={character:'feca',phase:'playing',busy:false,player:{hp:5,maxHp:5},buffs:{},enemies:[]};
const window={document,thorSpellPolicy:policy,thorSpellBindings:mapping,thorDashboard:{combatState:()=>state},thorControls:{autoAvailable:()=>true,autoCast:s=>{chosen.push(s.id);return true;}}};
vm.runInNewContext(fs.readFileSync('assets/auto-spells.js','utf8'),{window,document,Date:{now:()=>10000},performance:{now:()=>0},setInterval:f=>{tick=f;return 1;},clearInterval:()=>{tick=null;}});
window.thorAutoSpells.configure('buffs',{feca:['shield']});tick();assert.deepEqual(chosen,['speed']);
window.thorAutoSpells.configure('buffs',{feca:['shield','speed']});tick();assert.deepEqual(chosen,['speed'],'all excluded means no fallback cast');
window.thorAutoSpells.configure('off',{});assert.equal(tick,null);
console.log('Per-class spell policy: sanitization, passive exclusion, mode inheritance, isolated preferences and runtime filtering passed');
