'use strict';
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const mapping=require('../assets/spell-bindings.js');
const spells=ids=>ids.map(id=>({id,name:id}));
let slots=mapping.assign(spells(['shield','burningGlyph','speed','immobilizationGlyph']));
assert.deepEqual(slots.slice(0,6).map(s=>s?.id||null),['shield','speed','burningGlyph','immobilizationGlyph',null,null]);
slots=mapping.assign(spells(['shield','burningGlyph','speed']),{burningGlyph:2});
assert.deepEqual(slots.slice(0,6).map(s=>s?.id||null),['shield','burningGlyph','speed',null,null,null]);
assert.equal(mapping.needsAim('burningGlyph',{burningGlyph:1}),true);
assert.equal(mapping.needsAim('fear'),true);
assert.equal(mapping.needsAim('liberation'),false);
assert.equal(mapping.isTravel('dash'),true);assert.equal(mapping.isTravel('jump'),true);
for(const id of ['sramDouble','repulsiveTrap','burningGlyph','lethalAttack','fear'])assert.equal(mapping.isTravel(id),false);
assert.equal(mapping.travelRange('dash'),150);
assert.equal(mapping.travelRange('dash',{dashRange:2},{dash:1}),500);
assert.equal(mapping.travelRange('jump',{jumpRange:3},{jump:1}),540);
slots=mapping.assign(spells(['shield','dash','burningGlyph','jump','cut','fear','speed','power']));
assert.equal(new Set(slots.filter(Boolean).map(s=>s.id)).size,8);
assert.deepEqual(slots.slice(2,6).map(s=>s.id),['dash','burningGlyph','jump','cut']);
assert.deepEqual(slots.slice(0,2).map(s=>s.id),['fear','shield']);
// All unlocked active spells remain reachable, including Liberation.
const seven=spells(['dash','burningGlyph','immobilizationGlyph','staffBoomerang','shield','speed','liberation']);
slots=mapping.assign(seven);assert.equal(slots.find(s=>s?.id==='liberation').button,'A');
slots=mapping.assign(seven,{}, {liberation:'L1 + Y'});assert.equal(slots.find(s=>s?.id==='liberation').button,'L1 + Y');assert.equal(new Set(slots.filter(Boolean).map(s=>s.id)).size,7);
slots=mapping.assign(spells(Array.from({length:20},(_,i)=>'future'+i)));assert.equal(slots.filter(Boolean).length,20);
assert.equal(new Set(slots.filter(Boolean).map(s=>s.button)).size,20);
// Exercise real input routing: another button release must not launch a held glyph.
const received=[];
const surface={append(){},getBoundingClientRect:()=>({left:0,top:0}),classList:{add(){},remove(){}},style:{setProperty(){}}};
const buttons=['shield','burningGlyph','immobilizationGlyph'].map(id=>({
 isConnected:true,closest:()=>surface,
 __reactFiberTest:{key:id},setPointerCapture(){},
 getAttribute(name){return name==='aria-label'?id:null;},
 getBoundingClientRect(){return {left:10,top:10,width:30,height:30};},
 querySelector(){return null;},
 dispatchEvent(e){received.push([id,e.type,e.pointerId]);}
}));
const context={window:{thorSpellBindings:mapping,thorDashboard:{abilities:()=>({awakenings:{}}),playerPosition:()=>({x:50,y:60}),travelState:()=>({scaleX:1,scaleY:1,angle:0})}},
 document:{querySelectorAll:()=>buttons,querySelector:()=>null,addEventListener(){},createElement:()=>({style:{},remove(){}})},
 requestAnimationFrame:()=>1,cancelAnimationFrame(){},
 PointerEvent:function(type,props){this.type=type;Object.assign(this,props);}};
vm.runInNewContext(fs.readFileSync(require.resolve('../assets/controls.js'),'utf8'),context);
const controls=context.window.thorControls;
controls.button(2,true);controls.button(0,true);controls.button(0,false);
assert.deepEqual(received,[['burningGlyph','pointerdown',179],['shield','pointerdown',181],['shield','pointerup',181]]);
controls.button(3,true);assert.equal(received.length,3);
controls.button(2,false);assert.deepEqual(received.at(-1),['burningGlyph','pointerup',179]);
controls.button(2,true);controls.cancel();controls.button(2,false);
assert.deepEqual(received.at(-1),['burningGlyph','pointercancel',179]);
console.log('Spell mapping and held-input ownership: passed');
