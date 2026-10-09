const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const classes=initial=>{const values=new Set(initial);return {contains:v=>values.has(v),add:v=>values.add(v),remove:v=>values.delete(v)};};
let phase='phase-title',clicked=0;
function item(text,left,top=20){return {text,isConnected:true,disabled:false,classList:classes([]),getAttribute:()=>null,matches:()=>false,closest:()=>null,getBoundingClientRect:()=>({left,top,width:80,height:50,right:left+80,bottom:top+50}),scrollIntoView(){},click(){clicked++}};}
const first=item('Jouer',10),second=item('Classement',110),disabled=item('Verrouillé',210);disabled.disabled=true;
let items=[first,second,disabled];
const main={get className(){return phase},classList:{contains:v=>phase.includes(v)},querySelector:()=>null,querySelectorAll:s=>s.startsWith('[role=')||s.startsWith('.levelup-overlay')?[]:items};
let padCalls=0;const window={thorControls:{pad:()=>padCalls++}};vm.runInNewContext(fs.readFileSync('assets/menu-navigation.js','utf8'),{window,document:{querySelector:()=>main,addEventListener(){}},innerWidth:500,innerHeight:500,getComputedStyle:()=>({display:'block',visibility:'visible'})});
const menu=window.thorMenu,selected=el=>el.classList.contains('thor-menu-selected');
assert.equal(menu.tick(0,0,0),true);assert.equal(menu.activate(),false);
menu.tick(1,0,10);assert(selected(first));
assert.equal(padCalls,1,'menu direction explicitly switches away from pointer mode');
menu.tick(1,0,30);assert(selected(first),'held direction does not immediately repeat');
menu.tick(1,0,410);assert(selected(second));
menu.tick(1,0,560);assert(selected(first),'wraps and skips disabled choices');
menu.tick(0,0,600);menu.tick(-1,0,620);assert(selected(second));
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
