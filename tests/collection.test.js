const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
let raw=null,reads=0;const context={window:{localStorage:{getItem:key=>{assert.equal(key,'retro-survival.progress.v1');reads++;return raw;},setItem:()=>assert.fail('observer must not write saves')},thorLocale:{language:'fr',text:s=>s}}};vm.createContext(context);
vm.runInContext(fs.readFileSync('assets/collection.js','utf8'),context);
const api=context.window.thorCollection;
let result=api.snapshot();assert.equal(result.owned,0);assert.equal(result.total,4);assert.equal(api.snapshot(),result,'unchanged save reuses metadata');
raw=JSON.stringify({collectedDofus:['cawotte','unrecognised'],radiantDofus:[],cawotteRoll:23});result=api.snapshot();assert.equal(result.owned,1);assert.equal(result.entries[1].bonus,'+23 % XP reçue');assert.equal(result.entries[1].ranges[0].min,6);assert.equal(result.entries[1].ranges[0].max,50);
raw=JSON.stringify({collectedDofus:[],radiantDofus:['dofawa','cawotte'],cawotteRoll:50});result=api.snapshot();assert.equal(result.owned,2);assert.equal(result.entries[0].bonus,'+2 PV max');assert.equal(result.entries[1].bonus,'+75 % XP reçue');
raw=JSON.stringify({collectedDofus:['cawotte'],cawotteRoll:51});assert.equal(api.snapshot().entries[1].bonus,'Jet indisponible');
for(const value of ['bad','null','{}','{"collectedDofus":[42]}']){raw=value;assert.equal(api.snapshot().status,'unavailable');}
assert.equal(api.describe({id:'kritter'})[0].radiant,60);assert.equal(api.describe({id:'chafer-helmet'}).length,3);assert.equal(api.describe({id:'chafer-helmet'})[2].radiant,135);assert.equal(api.describe({id:'unknown'}),null);
raw=null;result=api.snapshot();context.window.thorLocale.language='en';assert.notEqual(api.snapshot(),result,'language changes invalidate metadata');assert.ok(reads>0);
console.log('Collection: read-only saves, cache, invalid saves, ownership, normal/radiant ranges passed');

raw=JSON.stringify({collectedDofus:['sufokien','dofus-emeraude'],sufokienRoll:17,emeraudeRoll:4});result=api.snapshot();assert.equal(result.owned,2);assert.ok(result.entries[2].bonus.startsWith('+17'));assert.equal(result.entries[3].bonus,'+4 PV max');raw=JSON.stringify({collectedDofus:[],radiantDofus:['sufokien','dofus-emeraude']});result=api.snapshot();assert.ok(result.entries[2].bonus.startsWith('+30'));assert.equal(result.entries[3].bonus,'+8 PV max');

assert.equal(api.describe({id:'gelocoiffe'})[0].unit,'');assert.equal(api.describe({id:'sram-hat'})[0].label,'Taille des pièges Sram');
