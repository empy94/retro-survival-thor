const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),mapping=require('../assets/spell-bindings.js');
let ids=['burningGlyph','immobilizationGlyph','staffBoomerang','dash','shield','speed','liberation'],inMenu=false,confirmed=0;
const events=[],surface={append(){},getBoundingClientRect:()=>({left:0,top:0}),classList:{add(){},remove(){}},style:{setProperty(){}}};
const buttons=()=>ids.map(id=>({__reactFiberTest:{key:id},isConnected:true,closest:()=>surface,setPointerCapture(){},getAttribute:()=>null,getBoundingClientRect:()=>({left:10,top:10,width:40,height:40}),querySelector:()=>({style:{}}),dispatchEvent:e=>events.push([id,e.type])}));
let elements=buttons();
const main={className:'phase-playing',classList:{contains:k=>k==='phase-playing'}};
const window={thorSpellBindings:mapping,thorMenu:{active:()=>inMenu,activate:()=>{confirmed++;return true},clear(){}},thorDashboard:{character:()=> 'feca',abilities:()=>({awakenings:{}}),playerPosition:()=>({x:50,y:60}),travelState:()=>({scaleX:1,scaleY:1,angle:0})}};
const context={window,document:{querySelector:s=>s==='main'?main:null,querySelectorAll:()=>elements,addEventListener(){},createElement:()=>({style:{},remove(){}})},getComputedStyle:()=>({position:'relative'}),requestAnimationFrame:()=>1,cancelAnimationFrame(){},PointerEvent:function(type,props){this.type=type;Object.assign(this,props);}};
const clock={value:1000};context.Date={now:()=>clock.value};
vm.runInNewContext(fs.readFileSync('assets/controls.js','utf8'),context);const controls=window.thorControls;
let pauses=0;controls.pause=()=>pauses++;
controls.controller('B',true);controls.controller('B',false);assert.equal(pauses,0,'unassigned B never pauses');
inMenu=true;controls.controller('B',true);controls.controller('B',false);assert.equal(pauses,0,'B never resumes or pauses menus');inMenu=false;
controls.configure({spellShortcuts:{feca:{shield:'B'}}});controls.controller('B',true);controls.controller('B',false);assert.deepEqual(events,[['shield','pointerdown'],['shield','pointerup']]);assert.equal(pauses,0,'B casts an instant spell without pausing');events.length=0;controls.configure({spellShortcuts:{}});
assert.equal(controls.controller('A',true),true);controls.controller('A',false);
assert.deepEqual(events,[['liberation','pointerdown'],['liberation','pointerup']],'seventh spell assigned A');
inMenu=true;controls.controller('A',true);controls.controller('A',false);assert.equal(confirmed,1);assert.equal(events.length,2,'A confirms instead of casting in menus');inMenu=false;
controls.configure({spellShortcuts:{feca:{staffBoomerang:'L1 + Y'}}});events.length=0;
controls.controller('L1',true);controls.controller('Y',true);
assert.deepEqual(events.slice(0,3),[['burningGlyph','pointerdown'],['burningGlyph','pointercancel'],['staffBoomerang','pointerdown']]);
controls.controller('L1',false);assert.equal(events.at(-1)[1],'pointerdown','modifier release cannot cast the chord');
controls.controller('Y',false);assert.deepEqual(events.at(-1),['staffBoomerang','pointerup']);const count=events.length;controls.controller('Y',false);assert.equal(events.length,count);
// A non-aimed modifier must not execute its standalone spell while forming a chord.
controls.configure({spellShortcuts:{feca:{shield:'L1',liberation:'L1 + Y'}}});events.length=0;
controls.controller('L1',true);assert.equal(events.length,0);clock.value+=1000;assert.equal(controls.autoAvailable(),false,'pending modifier blocks automation after manual delay');controls.controller('Y',true);controls.controller('Y',false);controls.controller('L1',false);
assert.deepEqual(events,[['liberation','pointerdown'],['liberation','pointerup']]);
controls.controller('L1',true);controls.controller('L1',false);assert.deepEqual(events.slice(-2),[['shield','pointerdown'],['shield','pointerup']]);
controls.configure({spellShortcuts:{feca:{staffBoomerang:'A'}}});controls.controller('A',true);controls.cancel();const cancelled=events.length;controls.controller('A',false);assert.equal(events.length,cancelled,'cancelled route cannot cast on later release');
console.log('Controller shortcuts: seventh spell, contextual A, aimed/instant chords, release ownership, modifier deferral and cancellation passed');

ids=["stingingClaw"];elements=buttons();controls.configure({spellShortcuts:{feca:{stingingClaw:"X"}}});events.length=0;controls.controller("X",true);assert.deepEqual(events,[["stingingClaw","pointerdown"]]);controls.controller("X",false);assert.deepEqual(events.at(-1),["stingingClaw","pointerup"]);events.length=0;controls.controller("X",true);controls.cancel();assert.deepEqual(events.at(-1),["stingingClaw","pointercancel"]);

let releaseChannel;context.setTimeout=fn=>{releaseChannel=fn;};controls.configure({autoSpells:true});clock.value+=1000;events.length=0;assert(controls.autoCast({id:"stingingClaw",aimed:false,el:elements[0]},null));assert.deepEqual(events,[["stingingClaw","pointerdown"]]);releaseChannel();assert.deepEqual(events.at(-1),["stingingClaw","pointerup"]);clock.value+=1000;assert(controls.autoCast({id:"stingingClaw",aimed:false,el:elements[0]},null));controls.cancel();const ended=events.length;releaseChannel();assert.equal(events.length,ended);assert.deepEqual(events.at(-1),["stingingClaw","pointercancel"]);

// R3 must suspend committed automatic casts and restore the exact previous mode.
const autoModes=[];window.thorAutoSpells={refreshLabel(){},configure:mode=>autoModes.push(mode)};
controls.configure({autoSpells:true,autoSpellMode:'full'});
assert.equal(controls.toggleAutoSpells(),'off');assert.equal(autoModes.at(-1),'off');
assert.equal(controls.toggleAutoSpells(),'full');assert.equal(autoModes.at(-1),'full');
controls.configure({autoSpells:true,autoSpellMode:'buffs'});
assert.equal(controls.toggleAutoSpells(),'off');assert.equal(controls.toggleAutoSpells(),'buffs');
inMenu=true;const modeCount=autoModes.length;assert.equal(controls.toggleAutoSpells(),false);assert.equal(autoModes.length,modeCount);inMenu=false;
context.document.hidden=true;assert.equal(controls.toggleAutoSpells(),false);context.document.hidden=false;
controls.setActive(false);assert.equal(controls.toggleAutoSpells(),false);controls.setActive(true);
console.log('R3: exact full/buffs restoration and menu/background guards passed');
