'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const mapping=require('../assets/spell-bindings.js');
let player={x:400,y:250},domReady,frameId=0;
const frames=new Map(),events=[],vars=new Map(),classes=new Set();
const surface={getBoundingClientRect:()=>({left:20,top:30}),style:{setProperty:(k,v)=>vars.set(k,v)},classList:{add:k=>classes.add(k),remove:k=>classes.delete(k)}};
const button={__reactFiberTest:{key:'burningGlyph'},isConnected:true,closest:()=>surface,
 setPointerCapture(){},getAttribute:k=>k==='aria-label'?'Glyphe':null,
 getBoundingClientRect:()=>({left:750,top:450,width:50,height:50}),querySelector:()=>({style:{},textContent:'L1'}),
 dispatchEvent:e=>events.push({type:e.type,x:e.clientX,y:e.clientY})};
const element=()=>({style:{},setAttribute(){},addEventListener(){},append(){}});
const context={window:{thorSpellBindings:mapping,thorDashboard:{abilities:()=>({awakenings:{}}),playerPosition:()=>player}},
 document:{head:{append(){}},body:{append(){}},querySelector:()=>null,querySelectorAll:()=>[button],createElement:element,
 elementFromPoint:()=>null,addEventListener:(name,callback)=>{if(name==='DOMContentLoaded')domReady=callback;}},
 innerWidth:1000,innerHeight:600,MutationObserver:function(){this.observe=()=>{};},getComputedStyle:()=>({position:'relative'}),
 requestAnimationFrame:callback=>{frames.set(++frameId,callback);return frameId;},cancelAnimationFrame:id=>frames.delete(id),
 PointerEvent:function(type,props){this.type=type;Object.assign(this,props);}};
vm.runInNewContext(fs.readFileSync('assets/controls.js','utf8'),context);domReady();
const controls=context.window.thorControls;
function frame(){const queued=[...frames.values()];frames.clear();queued.forEach(f=>f());}
controls.move(700,350);controls.button(2,true);
assert.deepEqual(events.at(-1),{type:'pointerdown',x:400,y:250}); // Never the icon at 775,475.
frame();assert.deepEqual(events.at(-1),{type:'pointermove',x:700,y:350});
assert.equal(vars.get('--thor-aim-x'),'380px');assert.equal(vars.get('--thor-target-x'),'680px');
// Player moves while the right stick/cursor stays completely idle.
player={x:450,y:280};frame();
assert.deepEqual(events.at(-1),{type:'pointermove',x:650,y:320});
assert.equal(vars.get('--thor-aim-x'),'430px');assert.equal(vars.get('--thor-aim-y'),'250px');
assert.equal(vars.get('--thor-target-x'),'680px'); // Target remains at the chosen screen point.
// Refresh the vector once more at release, even between animation frames.
player={x:470,y:290};controls.button(2,false);
assert.deepEqual(events.at(-1),{type:'pointerup',x:630,y:310});
assert.equal(events.at(-1).x-400,700-470);assert.equal(events.at(-1).y-250,350-290);
assert.equal(frames.size,0);assert.equal(classes.has('thor-aiming'),false);
controls.button(2,true);player=null;frame();assert.equal(events.at(-1).type,'pointercancel');
assert.equal(frames.size,0);
console.log('Aim follows moving player, keeps target, refreshes release and cancels unavailable position: passed');
