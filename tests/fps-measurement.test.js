const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
for(const suffix of ['latest','newest']){
let now=0;const listeners={},paused={current:false},document={hidden:false,addEventListener:(name,fn)=>{listeners[name]=fn;}};
const ctx={window:{},document,devicePixelRatio:2,performance:{now:()=>now},fs:()=>false,hc:()=>({}),HN:[],U:()=>({abilities:[]}),mN(){},yN(){},WB:()=>({renderGame(){}})};
Object.assign(ctx,{JB:ctx.WB,KN:ctx.HN,vN:ctx.mN,CN:ctx.yN});
vm.createContext(ctx);vm.runInContext(fs.readFileSync('assets/native-performance-hook-'+suffix+'.js','utf8'),ctx);
const state={phase:'playing',enemies:[],osamodas:{summons:[]}},canvas={},view={width:800,height:450},api=(suffix==='newest'?ctx.JB:ctx.WB)({pausedRef:paused},canvas,{}, {},view),stats=()=>ctx.window.thorGraphics.status();
api.renderGame(state);for(let i=0;i<8;i++){now+=500;api.renderGame(state);}assert.equal(stats().observedFps,2,'500 ms frames must count, rather than being discarded');assert.equal(stats().resolutionScale,.75,'slow rendering lowers raster after the first measured second');
paused.current=true;api.renderGame(state);assert.equal(stats().observedFps,0,'paused reading is reset');now+=30000;paused.current=false;for(let i=0;i<130;i++){now+=1000/60;api.renderGame(state);}assert(Math.abs(stats().observedFps-60)<.01,'pause duration excluded');
ctx.window.thorGraphics.setActive(false);now+=60000;ctx.window.thorGraphics.setActive(true);assert.equal(stats().observedFps,0);for(let i=0;i<130;i++){now+=1000/60;api.renderGame(state);}assert(Math.abs(stats().observedFps-60)<.01,'Android background duration excluded');
document.hidden=true;listeners.visibilitychange();api.renderGame(state);now+=60000;document.hidden=false;listeners.visibilitychange();for(let i=0;i<130;i++){now+=1000/60;api.renderGame(state);}assert(Math.abs(stats().observedFps-60)<.01,'hidden page duration excluded');
ctx.window.thorGraphics.configure('full');assert.equal(stats().observedFps,0,'changing quality starts a fresh measurement');
}
console.log('FPS measurements: stalled frames counted; pause, Android background, hidden page and preset changes reset timing.');
