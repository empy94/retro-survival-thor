const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const state={levelId:'dragoeuf',phase:'playing',player:{x:0,y:0},enemies:[]};
for(const suffix of ['current','latest','newest','live','oct17','docked','oct18','oct19']){
state.characterId='osamodas';const ctx={window:{thorNativeContext:{gameRef:{current:state}}},LI(){},Tm:{range:650},$j:e=>e.hp>0&&e.state!=='dead'&&e.invisibleTimer<=0&&(e.arrival??0)<=0};
Object.assign(ctx,{tL:ctx.LI,Am:ctx.Tm,gM:ctx.$j,aL:ctx.LI,Mm:ctx.Tm,bM:ctx.$j,yL:ctx.LI,Nm:ctx.Tm,NM:ctx.$j});
ctx.window.thorGameData={version:suffix==='oct19'?'dd11a2dafbfe3568aeda998b50431276424dc77b9a0c286e0aab35476739c6b6':suffix==='oct18'?'a161ca10ffe43612c1b8015e4b03fca63d6c5425430793b7388a4de3206d1eb4':suffix==='docked'?'147bdcf4f603c279dbd38995aa3a4b137e592d3f2f6cd6d49c82d57db6156f6c':'5487ff3251ae4881d60089eb496f10616af9679522c83c21402bf07d979b1202'};Object.assign(ctx,{$_:ctx.$j,$r:ctx.Tm,SP(){},Xv(){},ty(){},nF(){},ny(){},sy(){},av:ctx.$j,pf:ctx.Tm,nu:ctx.Tm,CF(){},gL(){},Ay(){},fy(){},oy(){},dy(){},uv:ctx.$j});ctx.window.thorGameData.crow={range:650};
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
