const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const state={phase:'playing',particles:[],player:{hp:5,maxHp:5},width:1500,height:875},root={thorGameData:{version:'cf673af30b9a12c73c5f00b94dbb5b73ca461f78cbf86fe1d312b2b07ccf363f',enemyDefs:{},summonDefs:{}},thorNativeContext:{gameRef:{current:state}}};
vm.runInNewContext(fs.readFileSync('assets/native-performance-hook-nov21.js','utf8'),{window:root,Kt:1,rQ:()=>({}),performance:{now:()=>0}});root.thorGraphics.configure('no-spells');
const paint={save(){},restore(){},beginPath(){},closePath(){},fill(){},stroke(){},moveTo(){},lineTo(){},arc(){}},clip=id=>root.thorRenderSpellMarker(paint,id,100,100,1,1,1,1,{frameWidth:53,frameHeight:27},1);
for(const prefix of ['xelorSeeker','xelorDial','xelorMominotor','xelorMomieNova','xelorMinotoror','xelorMummy'])assert.equal(clip(prefix+'Idle'),false,'new summon remains visible');
assert.equal(clip('xelorDarkRayEffect'),true);assert.equal(clip('xelorDustCell'),true);assert.equal(clip('otomaiWarning'),false);root.thorGraphics.configure('full');assert.equal(clip('xelorDarkRayEffect'),false);
console.log('Current graphics: Xelor summons and attack warnings visible, spell effects simplified only in the selected preset.');
