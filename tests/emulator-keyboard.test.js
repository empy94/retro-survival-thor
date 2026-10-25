const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const handlers={},calls=[];let layout='azerty',paused=false,modal=false;
const window={thorControls:{stick:(x,y,digital)=>calls.push({x,y,digital})},thorNativeContext:{gameRef:{current:{phase:'playing',controlMode:'arcade-zqsd'}},keysRef:{current:new Set()},pausedRef:{get current(){return paused;}}},addEventListener:(name,fn)=>handlers[name]=fn};
const document={addEventListener:(name,fn)=>handlers[name]=fn,querySelector:()=>modal?{}:null};
vm.runInNewContext(fs.readFileSync('assets/emulator-keyboard.js','utf8'),{window,document,localStorage:{getItem:()=>JSON.stringify({keyboardLayout:layout})}});
function key(type,letter,code='Key'+letter.toUpperCase(),extra={}){let prevented=false;handlers[type]({key:letter,code,target:{closest:()=>null},preventDefault(){prevented=true;},stopPropagation(){},...extra});return prevented;}
const last=()=>{const keys=window.thorNativeContext.keysRef.current;let x=Number(keys.has('d'))-Number(keys.has('q')||keys.has('a')),y=Number(keys.has('s'))-Number(keys.has('z')||keys.has('w'));const length=Math.max(1,Math.hypot(x,y));return {x:x/length,y:y/length};};
assert(key('keydown','z'));assert.equal(last().y,-1);assert.equal(last().x,0);
window.thorControls.stick(0,0);assert.equal(last().y,-1,'idle controller polls must not cancel the keyboard');
key('keydown','z');key('keydown','d');assert(Math.abs(last().x-Math.SQRT1_2)<1e-9);assert(Math.abs(last().y+Math.SQRT1_2)<1e-9);
key('keyup','z');assert.equal(last().x,1);assert.equal(last().y,0);key('keyup','d');assert.equal(last().x,0);
for(const [letter,x,y]of [['q',-1,0],['s',0,1],['d',1,0]]){key('keydown',letter);assert.equal(last().x,x);assert.equal(last().y,y);key('keyup',letter);}
key('keydown','Z');handlers.blur();assert.equal(last().y,0);
assert(!key('keydown','z','KeyZ',{target:{closest:()=>({})}}));assert(!key('keydown','z','KeyZ',{ctrlKey:true}));
paused=true;assert(!key('keydown','z'));paused=false;modal=true;assert(!key('keydown','z'));modal=false;
layout='qwerty';assert(!key('keydown','z'));assert(key('keydown','w'));key('keyup','w');
layout='azerty';key('keydown','q');window.thorControls.stick(1,0);window.thorControls.stick(0,0);assert.equal(last().x,0,'controller takeover releases keyboard input');
key('keydown','z');document.hidden=true;handlers.visibilitychange();assert.equal(last().y,0);
console.log('Emulator keyboard: AZERTY/QWERTY, normalized diagonals, held keys, idle polls, focus loss, text/modal exclusion and controller takeover passed');
