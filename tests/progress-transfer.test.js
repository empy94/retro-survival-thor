const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const script=fs.readFileSync('assets/progress-transfer.js','utf8'),key='retro-survival.progress.v1';
function run(transfer,origin='https://retrosurvival.online',storage=new Map([[key,JSON.stringify({waveRecords:{astrub:2}})]])){
 const window={thorProgressTransfer:transfer,fetch(){throw Error('Transfer must not bypass native validation');}};
 const context={window,location:{origin},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},Set};
 vm.runInNewContext(script,context);return {storage,window};
}
assert.equal(JSON.parse(run(null).storage.get(key)).waveRecords.astrub,2);
const transfer={id:'consented-session',progress:{waveRecords:{astrub:8},collectedDofus:['dofawa'],radiantDofus:['dofawa'],petExperience:{boo:50000}}};
const copied=run(transfer);assert.equal(JSON.parse(copied.storage.get(key)).waveRecords.astrub,8);
assert.equal(JSON.parse(copied.storage.get('thor.progress.before-transfer:consented-session')).waveRecords.astrub,2);
assert.equal(copied.window.thorProgressTransferStatus.serverAccepted,false);
copied.storage.set(key,JSON.stringify({waveRecords:{astrub:3}}));run(transfer,undefined,copied.storage);
assert.equal(JSON.parse(copied.storage.get(key)).waveRecords.astrub,3,'reload cannot overwrite the subsequent server response');
assert.equal(JSON.parse(run(transfer,'https://thor-local.invalid').storage.get(key)).waveRecords.astrub,2);
assert.equal(JSON.parse(run({...transfer,progress:{waveRecords:{},ticket:'must-not-copy'}}).storage.get(key)).waveRecords.astrub,2);
console.log('Explicit one-shot copy: default no-op, backup, schema allowlist, no HTTP, server authority and reload persistence passed');
