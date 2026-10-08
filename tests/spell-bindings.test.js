'use strict';
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const mapping=require('../assets/spell-bindings.js');
const spells=ids=>ids.map(id=>({id,name:id}));
let slots=mapping.assign(spells(['shield','burningGlyph','speed','immobilizationGlyph']));
assert.deepEqual(slots.map(s=>s?.id||null),['shield','speed','burningGlyph','immobilizationGlyph',null,null]);
slots=mapping.assign(spells(['shield','burningGlyph','speed']),{burningGlyph:2});
assert.deepEqual(slots.map(s=>s?.id||null),['shield','burningGlyph','speed',null,null,null]);
assert.equal(mapping.needsAim('burningGlyph',{burningGlyph:1}),true);
assert.equal(mapping.needsAim('fear'),true);
assert.equal(mapping.needsAim('liberation'),false);
slots=mapping.assign(spells(['shield','dash','burningGlyph','jump','cut','fear','speed','power']));
assert.equal(new Set(slots.map(s=>s.id)).size,6);
assert.deepEqual(slots.slice(2).map(s=>s.id),['dash','burningGlyph','jump','cut']);
assert.deepEqual(slots.slice(0,2).map(s=>s.id),['fear','shield']);
// Exercise real input routing: another button release must not launch a held glyph.
const received=[];
const buttons=['shield','burningGlyph','immobilizationGlyph'].map(id=>({
 __reactFiberTest:{key:id},setPointerCapture(){},
 getAttribute(name){return name==='aria-label'?id:null;},
 getBoundingClientRect(){return {left:10,top:10,width:30,height:30};},
 querySelector(){return null;},
 dispatchEvent(e){received.push([id,e.type,e.pointerId]);}
}));
const context={window:{thorSpellBindings:mapping,thorDashboard:{abilities:()=>({awakenings:{}})}},
 document:{querySelectorAll:()=>buttons,querySelector:()=>null,addEventListener(){}},
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
