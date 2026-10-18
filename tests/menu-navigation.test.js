const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const classes=initial=>{const values=new Set(initial);return {contains:v=>values.has(v),add:v=>values.add(v),remove:v=>values.delete(v)};};
let phase='phase-title',clicked=0,measurements=0;
function item(text,left,top=20){return {text,isConnected:true,disabled:false,classList:classes([]),getAttribute:()=>null,matches:()=>false,closest:()=>null,getBoundingClientRect:()=>{measurements++;return {left,top,width:80,height:50,right:left+80,bottom:top+50}},scrollIntoView(){},click(){clicked++}};}
const first=item('Jouer',10),second=item('Classement',110),disabled=item('Verrouillé',210);disabled.disabled=true;
let items=[first,second,disabled];
const main={get className(){return phase},classList:{contains:v=>phase.includes(v)},querySelector:()=>null,querySelectorAll:s=>s.startsWith('[role=')||s.startsWith('.levelup-overlay')?[]:items};
let padCalls=0;const window={thorControls:{pad:()=>padCalls++}};vm.runInNewContext(fs.readFileSync('assets/menu-navigation.js','utf8'),{window,document:{querySelector:()=>main,addEventListener(){}},innerWidth:500,innerHeight:500,getComputedStyle:()=>({display:'block',visibility:'visible'})});
const menu=window.thorMenu,selected=el=>el.classList.contains('thor-menu-selected');
assert.equal(menu.tick(0,0,0),true);assert.equal(menu.activate(),false);
const idleMeasurements=measurements;for(let n=0;n<300;n++)menu.tick(0,0,n);
assert.equal(measurements,idleMeasurements,'unchanged menu does not remeasure every button at rest');
menu.tick(1,0,10);assert(selected(first));
assert.equal(padCalls,1,'menu direction explicitly switches away from pointer mode');
menu.tick(1,0,30);assert(selected(first),'held direction does not immediately repeat');
menu.tick(1,0,510);assert(selected(second));
menu.tick(1,0,710);assert(selected(first),'wraps and skips disabled choices');
menu.tick(0,0,720);menu.tick(-1,0,740);assert(selected(second));
assert.equal(menu.activate(),true);assert.equal(clicked,1);assert(selected(second),'activation keeps the inspected offer selected');menu.step(-1,0,640);assert(selected(first),'next direction continues from the inspected offer');
phase='phase-playing';assert.equal(menu.tick(1,0,700),false);assert(!selected(second));
phase='phase-playing modal-open';menu.tick(1,0,800);assert(selected(first));
items=[second];first.isConnected=false;menu.tick(0,0,850);assert(!selected(first));assert.equal(menu.activate(),false,'stale choice never launches');
menu.tick(1,0,900);assert(selected(second));menu.clear();assert(!selected(second));
items=[first,second];first.isConnected=true;menu.step(1,0,1000);assert(selected(first));menu.step(1,0,1010);assert(selected(second),'separate brief presses each move once');
console.log('Menu navigation: repeat delay, wrap, disabled choices, phase changes, stale choices and single activation passed');

// Loot comparisons contain a second loot-panel with no actions. Select the
// outer dialog, and restore a shop offer after closing a replacement dialog.
let dialogs=[];
const panel=buttons=>({isConnected:true,getBoundingClientRect:()=>({left:0,top:0,width:400,height:400,right:400,bottom:400}),querySelectorAll:()=>buttons});
const equip=item('Equiper',40),sell=item('Vendre',180),comparison=panel([]),loot=panel([equip,sell]);
const shop1=item('Offre 1',20),shop2=item('Offre 2',130),shop3=item('Offre 3',240),shop=panel([shop1,shop2,shop3]),confirm=panel([equip,sell]);
const modalMain={className:'phase-playing modal-open',classList:{contains:k=>k==='phase-playing'||k==='modal-open'},querySelectorAll:s=>s==='[role="dialog"]'?dialogs:s.startsWith('.levelup-overlay')?[comparison]:[],querySelector:()=>null};
const win={thorControls:{pad(){}}};vm.runInNewContext(fs.readFileSync('assets/menu-navigation.js','utf8'),{window:win,document:{querySelector:()=>modalMain,addEventListener(){}},innerWidth:500,innerHeight:500,getComputedStyle:()=>({display:'block',visibility:'visible'})});
const nav=win.thorMenu;dialogs=[loot];nav.step(1,0,0);assert(selected(equip));nav.step(1,0,1);assert(selected(sell),'comparison panel cannot steal loot actions');
dialogs=[shop];nav.step(1,0,2);nav.step(1,0,3);assert(selected(shop2));nav.activate();nav.step(-1,0,4);assert(selected(shop1),'offer inspection preserves position');nav.step(1,0,5);assert(selected(shop2));
dialogs=[shop,confirm];nav.step(1,0,6);assert(selected(equip));dialogs=[shop];nav.tick(0,0,7);assert(selected(shop2),'closing confirmation restores originating shop offer');
console.log('Loot outer scope, shop inspection position and nested dialog return passed');

// Side panels leave the native simulation running: only the D-pad owns choices.
let docked=true,hard=false,focusChanges=0;
const reward1=item('Damage',20),reward2=item('Speed',150),side=panel([reward1,reward2]);
const liveMain={classList:{contains:k=>k==='phase-playing'||k==='modal-open'&&hard},querySelector:()=>null,querySelectorAll:s=>s==='[role="dialog"]'&&docked?[side]:[]};
const liveWindow={thorControls:{pad(){},menuFocus(){focusChanges++;}}};
vm.runInNewContext(fs.readFileSync('assets/menu-navigation.js','utf8'),{window:liveWindow,document:{querySelector:()=>liveMain,addEventListener(){}},innerWidth:500,innerHeight:500,getComputedStyle:()=>({display:'block',visibility:'visible'})});
const liveNav=liveWindow.thorMenu;
assert.equal(liveNav.active(),false,'a docked panel cannot steal combat');
assert.equal(liveNav.analog(1,0,0),false);liveNav.step(0,1,1);assert(liveNav.active());assert(selected(reward1));assert.equal(focusChanges,1);
assert.equal(liveNav.analog(1,0,2),false,'previously held movement continues');assert(liveNav.active(),'unchanged stick does not reclaim buttons');
assert(liveNav.activate());liveNav.analog(.5,.8,3);assert(!liveNav.active());assert(!selected(reward1));assert(!liveNav.activate(),'no queued confirmation after switching to combat');
liveNav.dpad(0,1,4);assert(!liveNav.active(),'a previously held D-pad cannot immediately steal focus again');liveNav.dpad(0,0,5);liveNav.dpad(0,1,6);assert(liveNav.active());assert(selected(reward2),'new direction continues from the remembered selection');
liveNav.analog(0,0,7);assert(liveNav.active(),'neutral does not switch modes');liveNav.analog(-1,0,8);assert(!liveNav.active());
hard=true;assert(liveNav.active());assert(liveNav.analog(1,0,9),'real pause/modal remains navigable with a stick');
hard=false;docked=false;assert(!liveNav.active());liveNav.step(1,0,10);assert(!liveNav.active(),'D-pad never moves character without a choice');
docked=true;assert(!liveNav.active(),'new docked window starts in combat');
console.log('Live side panels: D-pad ownership, analog movement, held-input priority, confirmation and real modal fallback passed');

liveNav.analog(1,0,11);liveNav.step(0,1,12);liveNav.analog(.98,.02,13);assert(liveNav.active());liveNav.analog(.96,.04,14);assert(!liveNav.active(),'slow accumulated stick movement also reclaims combat');
