const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
for(const suffix of ['latest','newest']){
let time=0;const canvas={width:1600,height:900},viewport={width:800,height:450},paused={current:false};let rendered;
const ctx={window:{},devicePixelRatio:2,performance:{now:()=>time},fs:()=>false,hc:id=>({id}),HN:[],U:()=>({abilities:['crow','tofuSummon']}),mN:(s,id)=>({id}),yN:(s,id)=>({id}),WB:()=>({renderGame:s=>{rendered=s;}})};
Object.assign(ctx,{JB:ctx.WB,KN:ctx.HN,vN:ctx.mN,CN:ctx.yN});
vm.createContext(ctx);vm.runInContext(fs.readFileSync('assets/native-performance-hook-'+suffix+'.js','utf8'),ctx);
assert.equal(ctx.fs(),true);for(const level of ['astrub','wabbit','litneg','gelee','dragoeuf'])assert.equal(ctx.hc(level),ctx.hc(level),'static registry cached '+level);
const state={phase:'playing',enemies:Array(100),osamodas:{summons:Array(20)}};
const api=(suffix==='newest'?ctx.JB:ctx.WB)({pausedRef:paused},canvas,{}, {},viewport);
for(let i=0;i<245;i++){time+=1000/30;api.renderGame(state);}
assert.equal(ctx.window.thorPerformanceStatus().resolutionScale,.75);assert.equal(canvas.width,600);assert.equal(canvas.height,338);assert.equal(rendered,state,'native state passed intact');
assert.deepEqual(Object.keys((suffix==='newest'?ctx.yN:ctx.hN)(state)),['crow','tofuSummon']);assert.deepEqual(Object.keys((suffix==='newest'?ctx.wN:ctx.bN)(state)),['crow','tofuSummon']);
paused.current=true;for(let i=0;i<400;i++){time+=1000/60;api.renderGame(state);}assert.equal(ctx.window.thorPerformanceStatus().resolutionScale,.75,'pause cannot falsely restore quality');
paused.current=false;state.enemies=[];state.osamodas.summons=[];for(let i=0;i<1300;i++){time+=1000/60;api.renderGame(state);}assert.equal(ctx.window.thorPerformanceStatus().resolutionScale,1,'quiet scene restores quality');
}
console.log('Adaptive rendering: budget, raster size, native state identity, pause and recovery passed.');
