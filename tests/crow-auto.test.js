const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const state={levelId:'dragoeuf',phase:'playing',player:{x:0,y:0},enemies:[]};
for(const suffix of ['current','latest','newest','live']){
const ctx={window:{thorNativeContext:{gameRef:{current:state}}},LI(){},Tm:{range:650},$j:e=>e.hp>0&&e.state!=='dead'&&e.invisibleTimer<=0&&(e.arrival??0)<=0};
Object.assign(ctx,{tL:ctx.LI,Am:ctx.Tm,gM:ctx.$j,aL:ctx.LI,Mm:ctx.Tm,bM:ctx.$j,yL:ctx.LI,Nm:ctx.Tm,NM:ctx.$j});
vm.createContext(ctx);const source=fs.readFileSync('assets/native-module-hook-'+suffix+'.js','utf8').split(';const thorOriginalCanvas')[0];vm.runInContext(source,ctx);
const can=()=>ctx.window.thorGameAdapter.canAutoCast('crow');
assert.equal(can(),false);
const enemy={hp:1,state:'idle',invisibleTimer:0,arrival:0,x:670,y:0,r:20};state.enemies=[enemy];assert.equal(can(),true,'native range includes enemy radius');
enemy.x=671;assert.equal(can(),false,'outside range');enemy.x=300;
for(const [key,value] of [['hp',0],['state','dead'],['invisibleTimer',1],['arrival',1]]){const previous=enemy[key];enemy[key]=value;assert.equal(can(),false,key);enemy[key]=previous;}
assert.equal(can(),true);enemy.hp=0;assert.equal(can(),false,'death after planning rechecked before cast');
assert.equal(ctx.window.thorGameAdapter.canAutoCast('tofu'),true,'other spells unaffected');
assert.match(fs.readFileSync('assets/controls.js','utf8'),/canAutoCast\?\.\(spell.id\)===false/);
}
console.log('Crow live range and targetability checks passed.');
