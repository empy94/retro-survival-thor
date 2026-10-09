'use strict';
const assert=require('node:assert/strict'),{plan}=require('../assets/auto-spells.js'),mapping=require('../assets/spell-bindings.js');
const base={phase:'playing',busy:false,width:742,height:432,player:{x:350,y:220,hp:5,maxHp:5},buffs:{},upgrades:{},awakenings:{},enemies:[{x:430,y:220,r:12,hp:5}]};
const spell=id=>({id,ready:true,aimed:mapping.needsAim(id)});
const choose=(s,ids)=>plan(s,ids.map(spell),mapping);
assert.equal(choose({...base,phase:'dying'},['shield']),null);
assert.equal(choose({...base,busy:true},['shield']),null);
assert.equal(choose({...base,enemies:[]},['shield']),null);
assert.equal(plan(base,[{...spell('shield'),ready:false}],mapping),null);
assert.equal(choose(base,['shield','burningGlyph']).spell.id,'shield');
assert.equal(choose({...base,player:{...base.player,shieldTimer:1}},['shield']),null);
assert.equal(choose({...base,buffs:{science:1,power:1,invisible:1}},['staffScience','power','invisibility']),null);
assert.equal(choose(base,['invisibility']),null,'do not cancel invisibility or waste it at a safe distance');
const cluster={...base,enemies:[{x:180,y:220,r:12},{x:490,y:220,r:12},{x:510,y:240,r:12},{x:515,y:200,r:12}]};
assert.ok(choose(cluster,['burningGlyph']).target.x>400,'zone covers group rather than isolated nearest enemy');
assert.equal(choose({...base,enemies:[{x:650,y:220,r:12}]},['lethalAttack']),null,'no out of range melee spell');
assert.equal(choose(base,['dash','jump']),null,'no routine teleport');
const danger={...base,enemies:[{x:360,y:220,r:12},{x:370,y:210,r:12}]};
let escape=choose(danger,['dash']);assert.ok(escape);assert.ok(Math.hypot(escape.target.x-350,escape.target.y-220)>=149);
const upgraded=choose({...danger,upgrades:{dashRange:2}},['dash']);assert.ok(Math.hypot(upgraded.target.x-350,upgraded.target.y-220)>=249,'range upgrades');
assert.equal(choose({...danger,awakenings:{dash:3},player:{...danger.player,teleportReturnTimer:1,teleportReturnX:360,teleportReturnY:220}},['dash']),null,'reject return into worse danger');
assert.equal(choose({...base,traps:[{x:430,y:220}]},['massTrap']),null,'avoid repeated traps');
assert.equal(choose({...base,double:{x:400,y:200},awakenings:{}},['sramDouble']),null,'do not replace live double');
const original=JSON.stringify(cluster);choose(cluster,['burningGlyph','shield','cut']);assert.equal(JSON.stringify(cluster),original,'planner never writes game state');
// Behavioral input checks: original handlers, two committed frames, manual
// cancellation, mode disable and moving-character target compensation.
const fs=require('node:fs'),vm=require('node:vm');let ready,frame=0,player={x:350,y:220};const frames=new Map(),events=[];
const el={isConnected:true,setPointerCapture(){},getAttribute:()=>null,getBoundingClientRect:()=>({left:600,top:300,width:30,height:30}),dispatchEvent:e=>events.push(e)};
const main={classList:{contains:k=>k==='phase-playing'}};
const ctx={window:{thorDashboard:{abilities:()=>({awakenings:{}}),playerPosition:()=>player,travelState:()=>({scaleX:1,scaleY:1})}},document:{querySelector:s=>s==='main'?main:null,querySelectorAll:()=>[],addEventListener:(n,f)=>{if(n==='DOMContentLoaded')ready=f;},createElement:()=>({style:{},setAttribute(){},addEventListener(){}}),head:{append(){}},body:{append(){}}},Date,innerWidth:742,innerHeight:432,MutationObserver:function(){this.observe=()=>{};},PointerEvent:function(t,p){this.type=t;Object.assign(this,p);},requestAnimationFrame:f=>{frames.set(++frame,f);return frame;},cancelAnimationFrame:i=>frames.delete(i)};
vm.runInNewContext(fs.readFileSync('assets/controls.js','utf8'),ctx);ctx.window.thorSpellBindings=mapping;ready();const controls=ctx.window.thorControls;
controls.configure({autoSpells:true});controls.setActive(false);assert.equal(controls.autoAvailable(),false);controls.setActive(true);const aimed={el,aimed:true};assert.equal(controls.autoCast(aimed,{x:480,y:250}),true);assert.equal(events.at(-1).type,'pointerdown');assert.equal(controls.autoCast(aimed,{x:450,y:200}),false);
const advance=()=>{const list=[...frames.values()];frames.clear();list.forEach(f=>f());};advance();assert.equal(events.at(-1).type,'pointermove');player={x:370,y:225};advance();assert.equal(events.at(-1).type,'pointerup');assert.equal(events.at(-1).clientX,460);assert.equal(events.at(-1).clientY,245);
controls.autoCast(aimed,{x:480,y:250});controls.configure({autoSpells:false});advance();assert.equal(events.at(-1).type,'pointercancel');
controls.configure({autoSpells:true,autoSpellMode:'full'});controls.autoCast(aimed,{x:480,y:250});controls.configure({autoSpellMode:'buffs'});advance();assert.equal(events.at(-1).type,'pointercancel','switch to buffs cannot release a queued attack');controls.configure({autoSpellMode:'full'});assert.equal(controls.autoCast(aimed,{x:480,y:250}),true);controls.configure({spellManual:{feca:['staffBoomerang']}});advance();assert.equal(events.at(-1).type,'pointercancel','manual exception cancels an automatic target already held');controls.autoCast(aimed,{x:480,y:250});controls.rightStick(1,0);advance();assert.equal(events.at(-1).type,'pointercancel');assert.equal(controls.autoAvailable(),false);
console.log('Auto spells: buffs, clusters, range, escape, duplicate traps, pause, no writes, committed input and manual priority passed');

// Scheduler is opt-in, bounded, skips manual/pause/background and throttles
// rejected casts rather than flooding the touch handlers.
let timer=null,clock=10000,paused=false,available=true,hidden=false,reads=0,attempts=0,disabled=false;
const runtimeDoc={get hidden(){return hidden;},querySelector:k=>k==='main'?{classList:{contains:v=>v==='phase-playing'}}:k==='.pause-panel'&&paused?{}:null,querySelectorAll:()=>[{__reactFiberTest:{key:'shield'},getAttribute:()=>disabled?'true':'false'}],addEventListener(){}};
const runtimeWindow={document:runtimeDoc,thorSpellBindings:mapping,thorDashboard:{combatState:()=>{reads++;return base;},travelState:()=>({x:350,y:220,scaleX:1,scaleY:1})},thorControls:{autoAvailable:()=>available,autoCast:()=>{attempts++;return false;}}};
vm.runInNewContext(fs.readFileSync('assets/auto-spells.js','utf8'),{window:runtimeWindow,document:runtimeDoc,Date:{now:()=>clock},performance:{now:()=>0},setInterval:f=>{timer=f;return 1;},clearInterval:()=>{timer=null;}});
const auto=runtimeWindow.thorAutoSpells;assert.equal(auto.status().enabled,false);assert.equal(timer,null);auto.configure(true);assert.ok(timer);
paused=true;timer();assert.equal(reads,0);paused=false;available=false;timer();assert.equal(reads,0);available=true;hidden=true;timer();assert.equal(reads,0);hidden=false;
timer();assert.equal(attempts,1);clock+=79;timer();assert.equal(attempts,1);clock+=800;timer();assert.equal(attempts,2);disabled=true;clock+=1000;timer();assert.equal(attempts,2);auto.configure(false);assert.equal(timer,null);
console.log('Auto scheduler: opt-in, inactive renderer, manual priority, modal pause, cooldown and rejected-cast backoff passed');

// Buff-only mode has no enemy requirement and cannot attack, place a zone,
// teleport or dismiss an invisibility buff that is still active.
const buffPlan=(s,ids)=>plan(s,ids.map(spell),mapping,'buffs');
const quiet={...base,enemies:[]};
for(const id of ['shield','speed','staffScience','power','invisibility'])assert.equal(buffPlan(quiet,[id]).spell.id,id);
assert.equal(buffPlan(quiet,['burningGlyph','dash','jump','massTrap','sramDouble','cut']),null);
assert.equal(buffPlan({...quiet,player:{...quiet.player,shieldTimer:1,speedBoostTimer:1},buffs:{science:1,power:1,invisible:1}},['shield','speed','staffScience','power','invisibility']),null);
assert.equal(buffPlan({...quiet,busy:true},['shield']),null);
assert.equal(buffPlan({...quiet,phase:'dying'},['shield']),null);
assert.equal(plan(quiet,[{...spell('shield'),ready:false}],mapping,'buffs'),null);
assert.equal(plan(quiet,[spell('shield')],mapping,'off'),null);
assert.equal(plan(quiet,[spell('shield')],mapping,'unknown'),null);
assert.equal(choose(quiet,['shield']),null,'full mode still waits for enemies');
let targetRead=null;runtimeWindow.thorDashboard.combatState=include=>{targetRead=include;return quiet;};disabled=false;auto.configure('buffs');assert.equal(auto.status().mode,'buffs');timer();assert.equal(targetRead,false);assert.equal(attempts,3);
auto.configure('full');timer();assert.equal(targetRead,true);assert.equal(attempts,3);
auto.configure('off');assert.equal(timer,null);
console.log('Buff mode: cast when available without monsters, no attacks/travel, no active-buff cancellation, mode switches and no target reads passed');

assert.equal(choose({...base,character:'enutrof'},['shovelJudgment']).spell.id,'shovelJudgment');assert.equal(choose({...base,character:'enutrof',summons:{chest:true}},['animatedChest']),null);assert.equal(choose({...base,buffs:{acceleration:3}},['acceleration']),null);assert.deepEqual(choose(base,['brokle']).target,{x:base.player.x,y:base.player.y});assert.equal(choose({...base,busy:true,character:'enutrof'},['corruption']),null);

for(const id of ['shovelJudgment','slaughteringShovel','shovelKiss','mound','animatedChest','shovelThrow','corruption']){
 const action=choose({...base,character:'enutrof'},[id]);assert(action?.target,'Enutrof needs an enemy target: '+id);assert.equal(action.target.x,430);assert.equal(action.target.y,220);
}
assert.equal(choose({...base,character:'enutrof',enemies:[{x:1000,y:220,r:12}]},['shovelThrow']),null);
assert.equal(choose({...base,character:'enutrof',summons:{chest:true}},['animatedChest']),null);
assert(choose({...base,character:'enutrof',enemies:[{x:930,y:220,r:12}],upgrades:{enutrofSpell:{shovelThrow:{range:2}}}},['shovelThrow'])?.target);
