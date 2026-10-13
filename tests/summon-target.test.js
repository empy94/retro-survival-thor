const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
for(const suffix of ['latest','newest','live']){
const native=JSON.parse(fs.readFileSync(suffix==='live'?'tests/fixtures/osamodas-target-live.json':suffix==='newest'?'tests/fixtures/osamodas-target-oct13c.json':'tests/fixtures/osamodas-target-oct13.json','utf8'));
let seed=74891;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
const ctx={window:{},devicePixelRatio:2,performance:{now:()=>0},fs:()=>false,hc:()=>({}),HN:[],U:()=>({abilities:[]}),mN(){},yN(){},WB:()=>({renderGame(){}}),IA:{tofu:{contact:34}},Dj:10,X:{markPull:200},hb:(s,e)=>e.reachable};
Object.assign(ctx,{JB:ctx.WB,KN:ctx.HN,vN:ctx.mN,CN:ctx.yN,BA:ctx.IA,jj:ctx.Dj,_b:ctx.hb,ps:ctx.fs,gc:ctx.hc,aP:ctx.HN,H:ctx.U,jN:ctx.mN,MN:ctx.yN,IN:ctx.yN,LN:ctx.yN,gV:ctx.WB,QA:ctx.IA,Wj:ctx.Dj,Y:ctx.X,vb:ctx.hb});vm.createContext(ctx);vm.runInContext(suffix==='live'?'const pj='+native.pj+';'+native.Aj+';'+native.jj+';const originalTarget=jj;':suffix==='newest'?'const tj='+native.tj+';'+native._j+';'+native.vj+';const originalTarget=vj;':'const ZA='+native.ZA+';'+native.pj+';'+native.mj+';const originalTarget=mj;',ctx);
vm.runInContext(fs.readFileSync('assets/native-performance-hook-'+suffix+'.js','utf8'),ctx);
for(let i=0;i<5000;i++){
 ctx.state={enemies:Array.from({length:i%200},(_,j)=>({id:j,x:Math.floor(rand()*800),y:Math.floor(rand()*500),r:10+rand()*60,hp:rand()<.2?0:2,state:rand()<.2?'dead':'idle',invisibleTimer:rand()<.2?1:0,arrival:rand()<.2?1:0,osamodasMarkTimer:rand()<.3?1:0,reachable:rand()<.3}))};
 ctx.summon={kind:'tofu',x:400,y:250};
 assert.equal(vm.runInContext(suffix==='live'?'jj(state,summon)':suffix==='newest'?'vj(state,summon)':'mj(state,summon)',ctx),vm.runInContext('originalTarget(state,summon)',ctx),'native target identity case '+i);
}
ctx.state={enemies:[0,1].map(id=>({id,x:100,y:0,r:10,hp:2,state:'idle',invisibleTimer:0,reachable:true,osamodasMarkTimer:1}))};ctx.summon={kind:'tofu',x:0,y:0};
assert.equal(vm.runInContext(suffix==='live'?'jj(state,summon).id':suffix==='newest'?'vj(state,summon).id':'mj(state,summon).id',ctx),0,'first enemy wins equal-distance ties');
}
console.log('Summon target equivalence: 5000 native comparisons plus marked tie ordering passed.');
