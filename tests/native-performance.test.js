const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
for(const [file,binding] of [['current','jo'],['previous3','ko']]){
const script=fs.readFileSync('assets/native-performance-hook-'+file+'.js','utf8');
const shared={fighterIdle:{src:'fighter.webp'},arakneIdle:{src:'arakne.png'}};
let calls=0;
const touch=['dash','fear'];const ctx={window:{},fO:touch,pO:touch,[binding]:level=>{calls++;return {...shared,level};}};
vm.createContext(ctx);vm.runInContext(script,ctx);
for(const level of ['astrub','wabbit','litneg','gelee']){
 const registry=ctx[binding](level);
 assert.deepEqual({...registry},{...shared,level});
 for(let frame=0;frame<100;frame++)for(let clip=0;clip<200;clip++)assert.equal(ctx[binding](level),registry);
 assert.equal(registry.arakneIdle,shared.arakneIdle,'native animation descriptors retained');
}
assert.equal(calls,4,'one merge per supported map, rather than per discarded animation');
assert.notEqual(ctx[binding]('future-map'),ctx[binding]('future-map'),'unknown maps retain native behavior');
assert.equal(touch.length,9);assert(touch.includes('shovelThrow'));
const gelee=ctx[binding]('gelee');vm.runInContext(script,ctx);assert.equal(ctx[binding]('gelee'),gelee,'APK and imported patch coexist');
}
console.log('Current and prior native animation registry regression passed.');
