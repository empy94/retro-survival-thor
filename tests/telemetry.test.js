// Observer contract: current React tree, real totals, unknown data and no writes.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
let phase='phase-title',paused=false,canvas=null;
const document={querySelector(selector){if(selector==='main')return {className:phase};if(selector==='canvas')return canvas;if(selector==='.pause-panel')return paused?{}:null;},querySelectorAll(){return [];}};
const context={window:{},document};vm.createContext(context);
vm.runInContext(fs.readFileSync('assets/telemetry.js','utf8'),context);
const sample=()=>JSON.parse(JSON.stringify(context.window.thorDashboard.snapshot()));
assert.equal(sample().status,'title');phase='phase-playing';assert.equal(sample().status,'unavailable');
const live={player:{hp:3,maxHp:7},equipment:{hat:null,ring:[{id:'test-ring'},{id:'second-ring'}]},kamas:42,level:8,wave:3,phase:'playing'};
const hud={equipment:live.equipment,statBreakdowns:{critical:{detail:'Actuellement : +21 % · Avant plafond : +28 %',gear:'+7 %'}}};
const original=JSON.stringify({live,hud});
const mounted={memoizedState:{memoizedState:{current:live},next:{memoizedState:hud,next:null}}};
// The canvas property can point to the older fiber; the root.current is authoritative.
const root={stateNode:{current:{child:mounted}}};canvas={__reactFiberTest:{return:root,memoizedState:{current:{player:{hp:99}}}}};
let value=sample();assert.equal(value.hp,3);assert.equal(value.kamas,42);assert.equal(value.items.length,2);
assert.equal(value.stats.find(s=>s.name==='Critique').value,'+21 %');
assert.equal(value.stats.find(s=>s.name==='Vitesse').value,null);
assert.equal(JSON.stringify({live,hud}),original);
paused=true;assert.equal(sample().phase,'paused');
live.player.hp=NaN;assert.equal(sample().status,'unavailable');
canvas=null;assert.equal(sample().status,'unavailable');
console.log('Telemetry observer contract passed.');
