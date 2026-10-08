'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const mapping=require('../assets/spell-bindings.js');
let player={x:400,y:250},domReady,frameId=0,id='dash',travel={scaleX:.5,scaleY:.25,angle:Math.PI/2,upgrades:{},awakenings:{},returnTarget:null};
const frames=new Map(),events=[],vars=new Map();
const element=()=>({style:{},setAttribute(){},addEventListener(){},append(){},remove(){this.removed=true;}});
const surface={...element(),getBoundingClientRect:()=>({left:20,top:30}),style:{setProperty:(k,v)=>vars.set(k,v)},classList:{add(){},remove(){}}};
const cursor=element();cursor.style.display='block';
const button={isConnected:true,closest:()=>surface,setPointerCapture(){},getAttribute:k=>k==='aria-label'?id:null,
 getBoundingClientRect:()=>({left:750,top:450,width:50,height:50}),querySelector:()=>({style:{},textContent:'L1'}),
 dispatchEvent:e=>events.push({type:e.type,x:e.clientX,y:e.clientY}),get __reactFiberTest(){return {key:id};}};
const context={window:{thorSpellBindings:mapping,thorDashboard:{abilities:()=>({awakenings:{}}),playerPosition:()=>player,travelState:()=>({...player,...travel})}},
 document:{head:{append(){}},body:{append(){}},querySelector:s=>s==='#thor-cursor'?cursor:null,querySelectorAll:()=>[button],createElement:element,
 elementFromPoint:()=>null,addEventListener:(name,callback)=>{if(name==='DOMContentLoaded')domReady=callback;}},
 innerWidth:1000,innerHeight:600,MutationObserver:function(){this.observe=()=>{};},getComputedStyle:()=>({position:'relative'}),
 requestAnimationFrame:callback=>{frames.set(++frameId,callback);return frameId;},cancelAnimationFrame:id=>frames.delete(id),
 PointerEvent:function(type,props){this.type=type;Object.assign(this,props);}};
vm.runInNewContext(fs.readFileSync('assets/controls.js','utf8'),context);domReady();
const c=context.window.thorControls;
function frame(){const queued=[...frames.values()];frames.clear();queued.forEach(f=>f());}
function target(){return {x:parseFloat(vars.get('--thor-target-x'))+20,y:parseFloat(vars.get('--thor-target-y'))+30};}
// Forward defaults to left-stick direction, regardless of the old mouse position.
c.move(800,500);c.stick(1,0);c.button(2,true);frame();
assert.deepEqual(target(),{x:475,y:250});assert.equal(cursor.style.display,'none');
player={x:430,y:270};frame();assert.deepEqual(target(),{x:505,y:270});
c.stick(0,-1);frame();assert.deepEqual(target(),{x:430,y:232.5});
// The right stick chooses direction directly; releasing it keeps that direction.
assert.equal(c.rightStick(-1,0),true);frame();assert.deepEqual(target(),{x:355,y:270});
c.rightStick(0,0);c.move(900,550);player={x:440,y:275};frame();assert.deepEqual(target(),{x:365,y:275});
c.button(2,false);assert.equal(cursor.style.display,'block');assert.equal(c.rightStick(1,0),false);
// Cursor navigation resumes at its previous position, not at the radial reticle.
id='burningGlyph';c.button(2,true);frame();assert.deepEqual(target(),{x:800,y:500});c.cancel();
// Iop range, including awakening, and screen-space diagonal on nonuniform scale.
id='jump';travel.upgrades={jumpRange:3};travel.awakenings={jump:1};c.button(2,true);c.rightStick(1,1);frame();
const t=target(),dx=(t.x-player.x)/.5,dy=(t.y-player.y)/.25;
assert.ok(Math.abs(Math.hypot(dx,dy)-1080)<1e-9);assert.ok(Math.abs(t.x-player.x-(t.y-player.y))<1e-9);c.cancel();
// The game's fixed return teleport must not imply a selectable destination.
id='dash';travel.returnTarget={x:100,y:120};c.button(2,true);c.rightStick(1,0);frame();
assert.deepEqual(target(),{x:100,y:120});c.cancel();assert.equal(frames.size,0);
// Starting at rest uses the character's facing, never a stale mouse location.
c.stick(0,0);travel.returnTarget=null;travel.upgrades={};travel.awakenings={};
c.button(2,true);frame();assert.deepEqual(target(),{x:440,y:312.5});c.cancel();
console.log('Travel aiming: forward, follow, direct stick direction, retained direction, range, return, cursor restoration and spell isolation passed');
