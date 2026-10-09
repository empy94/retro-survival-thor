const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const script=fs.readFileSync('assets/native-performance-hook-current.js','utf8');
const shared={fighterIdle:{src:'fighter.webp'},arakneIdle:{src:'arakne.png'}};
let calls=0;
const ctx={window:{},ko:level=>{calls++;return {...shared,level};}};
vm.createContext(ctx);vm.runInContext(script,ctx);
for(const level of ['astrub','wabbit','litneg','gelee']){
 const registry=ctx.ko(level);
 assert.deepEqual({...registry},{...shared,level});
 for(let frame=0;frame<100;frame++)for(let clip=0;clip<200;clip++)assert.equal(ctx.ko(level),registry);
 assert.equal(registry.arakneIdle,shared.arakneIdle,'native animation descriptors retained');
}
assert.equal(calls,4,'one merge per supported map, rather than per discarded animation');
assert.notEqual(ctx.ko('future-map'),ctx.ko('future-map'),'unknown maps retain native behavior');
const gelee=ctx.ko('gelee');vm.runInContext(script,ctx);assert.equal(ctx.ko('gelee'),gelee,'APK and imported patch coexist');
console.log('Native animation registry regression passed.');
