const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
for(const suffix of ['latest','newest']){
let now=0,draws=0;const canvas={},viewport={width:800,height:450},paused={current:false};
const enemies={dragon:{clips:{idle:'dragoeufIdle',attack:'dragoeufAttack'}}},summons={tofu:{prefix:'tofu'}};
const ctx={window:{},devicePixelRatio:2,performance:{now:()=>now},fs:()=>false,hc:()=>({}),HN:[],KN:[],yf:enemies,xf:enemies,IA:summons,BA:summons,U:()=>({abilities:[]}),mN(){},yN(){},vN(){},CN(){},WB:()=>({renderGame(){draws++}}),JB:()=>({renderGame(){draws++}})};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('assets/native-performance-hook-'+suffix+'.js','utf8'),ctx);
const state=Object.freeze({phase:'playing',width:1500,height:880,particles:Object.freeze([]),enemies:[],osamodas:{summons:[]}});ctx.window.thorNativeContext={gameRef:{current:state}};ctx.window.thorGraphics.configure('no-spells');
const paths=[],paint={save(){},restore(){},beginPath(){},closePath(){},fill(){},stroke(){},moveTo(...p){paths.push(['M',...p])},lineTo(...p){paths.push(['L',...p])},arc(...p){paths.push(['A',...p])}};
const marker=(id,descriptor={frameWidth:53,frameHeight:27,resolutionScale:1},rotation=0)=>ctx.window.thorRenderSpellMarker(paint,id,100,200,1,1,1,1,descriptor,1.2,rotation);
for(const id of ['fighterAttack','dragoeufIdleUpRight','tofuAttackLeft','enutrofChestIdle','sramTrapMarker'])assert.equal(marker(id),false,'native actor/marker preserved '+id);
for(const id of ['osamodasStingingClaw','osamodasCracklerStrike','fecaLightning','bworkTornado']){paths.length=0;assert(marker(id));assert.equal(paths.length,0,'heavy effect suppressed');}
paths.length=0;assert(marker('dragoeufMeteorCell'));assert.equal(paths.length,4);assert.equal(paths[0][0],'M');assert(Math.abs(paths[1][1]-131.8)<.001,'diamond extent matches native scale');
paths.length=0;assert(marker('chaferArrowProjectile__hostile'));assert.equal(paths[0][0],'A');assert.equal(paint.strokeStyle,'#ff654c');
paths.length=0;assert(marker('waBeamFx',undefined,Math.PI/2));assert.equal(paths[1][0],'L');assert(Math.abs(paths[1][1]-100)<.001,'beam direction retained');
ctx.window.thorGraphics.configure('balanced');assert.equal(marker('fecaLightning'),false,'original graphics restored');
const api=(suffix==='newest'?ctx.JB:ctx.WB)({pausedRef:paused},canvas,{}, {},viewport);paused.current=true;for(let i=0;i<60;i++){now+=1000/60;api.renderGame(state);}assert(draws<=5,'paused scene is not repainted 60 times each second');
const before=draws;ctx.window.thorGraphics.configure('no-spells');api.renderGame(state);assert.equal(draws,before+1,'preset immediately invalidates paused scene');paused.current=false;now+=16;api.renderGame(state);assert.equal(draws,before+2,'active rendering resumes');
}
console.log('No-animation rendering: actors retained, effects bypassed, scaled ground cells and danger projectiles drawn, pause redraws throttled, original graphics recoverable.');
