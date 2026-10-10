const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const script=fs.readFileSync('assets/progress-transfer.js','utf8');
const key='retro-survival.progress.v1',old=JSON.stringify({waveRecords:{astrub:8}});
const storage=new Map([[key,old],['retro-survival.pending-score.v1:existing','original']]);
function run(transfer,origin='https://retrosurvival.online',store=storage){
 const window={thorProgressTransfer:transfer};
 vm.runInNewContext(script,{window,location:{origin},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)}});
 assert.equal(window.thorProgressTransfer,undefined);
}
const transfer={id:'one',progress:{waveRecords:{astrub:12,wabbit:64},collectedDofus:['cawotte'],cawotteRoll:50,combatLog:['x'],ticket:'local-ticket',stats:{damage:999},checkpoint:{}}};
run(transfer);
assert.equal(storage.get('thor.progress.before-transfer:one'),old);
const result=JSON.parse(storage.get(key));assert.equal(result.waveRecords.wabbit,64);assert.equal(result.cawotteRoll,50);
for(const k of ['combatLog','ticket','stats','checkpoint'])assert.equal(result[k],undefined);
assert.equal(storage.get('retro-survival.pending-score.v1:existing'),'original');
storage.set(key,JSON.stringify({waveRecords:{astrub:20}}));run(transfer);assert.equal(JSON.parse(storage.get(key)).waveRecords.astrub,20);
const isolated=new Map([[key,old]]);run(transfer,'https://thor-local.invalid',isolated);assert.equal(isolated.get(key),old);
const malformed=new Map([[key,old]]);assert.throws(()=>run({id:'bad',progress:{waveRecords:{astrub:-1}}},undefined,malformed));assert.equal(malformed.get(key),old);
// Backup failure must leave the online save untouched.
assert.throws(()=>vm.runInNewContext(script,{window:{thorProgressTransfer:transfer},location:{origin:'https://retrosurvival.online'},localStorage:{getItem:()=>old,setItem:()=>{throw Error('quota');}}}));
const interrupted=new Map([[key,old]]);let fail=true;
assert.throws(()=>vm.runInNewContext(script,{window:{thorProgressTransfer:transfer},location:{origin:'https://retrosurvival.online'},localStorage:{getItem:k=>interrupted.get(k)||null,setItem:(k,v)=>{if(k==='thor.progress.transfer-applied'&&fail)throw Error('quota');interrupted.set(k,v);}}}));
fail=false;run(transfer,undefined,interrupted);assert.equal(interrupted.get('thor.progress.before-transfer:one'),old);
console.log('Progress transfer: exact fields, recovery copy, one-time apply, local untouched, malformed input and no combat state copied passed');
