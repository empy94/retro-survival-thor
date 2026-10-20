'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const policy=require('../assets/spell-policy.js'),mapping=require('../assets/spell-bindings.js');
assert.deepEqual(policy.sanitize({feca:['shield','shield','area','bad'],iop:['shield','jump'],sram:'bad'}),{feca:['shield'],iop:['jump'],sram:[],enutrof:[],osamodas:[],cra:[]});
for(const [level,character] of Object.entries({astrub:'feca',litneg:'iop',wabbit:'sram',gelee:'enutrof',dragoeuf:'osamodas'}))assert.equal(policy.classFor(level),character);
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

assert.equal(Object.keys(policy.catalog.spells).length,79);assert.equal(policy.catalog.classes.enutrof.length,19);for(const [id,awakening] of [['shield',2],['vitality',3],['amplification',1]]){assert(policy.isPassive(id,{[id]:awakening}));assert(!policy.allowed(id,id==='shield'?'feca':'iop','full',{}, {[id]:awakening}));}assert(mapping.needsAim('arnaque'));assert(mapping.needsAim('brokle'));assert(mapping.needsAim('brokle',{brokle:1}));assert.equal(mapping.travelRange('dash',{}, {dash:2}),112.5);assert.equal(mapping.travelRange('jump',{}, {jump:1}),270);
for(const characterId of Object.keys(policy.catalog.classes))for(const levelId of ['astrub','wabbit','gelee','litneg','dragoeuf'])assert.equal(policy.classFor({characterId,levelId}),characterId,'class independent of map');
assert.equal(policy.classFor({characterId:'unknown',levelId:'astrub'}),null,'unknown explicit class fails closed');assert.equal(policy.classFor({levelId:'astrub'}),'feca','older state remains supported');

for(const id of ["shovelKiss","slaughteringShovel","tofuSummon","bouftouSummon"]){assert(policy.isPassive(id));assert(!mapping.needsAim(id));}assert(policy.allowed("crow","osamodas","full",{}));assert(policy.isPassive("crow",{crow:1}));assert(mapping.isHeld("stingingClaw"));assert(mapping.needsAim("cracklerStrike"));

const displayed=[...fs.readFileSync('assets/dashboard.html','utf8').matchAll(/data-class="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(displayed.sort(),Object.keys(policy.catalog.classes).sort(),'each class has a visible selector');
