import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';import assert from 'node:assert/strict';import {webcrypto} from 'node:crypto';
process.on('uncaughtException',error=>{console.error(error.stack.split('\n').filter(line=>line.length<500).slice(0,8).join('\n'));process.exit(1);});

const base=path.resolve(process.argv[2]||'build/official-20261018'),modules=new Map(),storage=new Map();
const context=vm.createContext({console,performance,URL,URLSearchParams,AbortController,AbortSignal,Response,Request,Headers,structuredClone,queueMicrotask,TextEncoder,TextDecoder,crypto:webcrypto,setTimeout,clearTimeout,setInterval,clearInterval,location:new URL('https://retrosurvival.online/'),history:{state:null,pushState(){},replaceState(){},back(){},length:1},navigator:{language:'fr',userAgent:'Local module test'},addEventListener(){},removeEventListener(){},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},fetch(){throw Error('Network forbidden in module smoke test')}});
context.window=context;context.self=context;context.thorSession={local:true};
async function load(file){if(modules.has(file))return modules.get(file);let code=fs.readFileSync(file,'utf8');
 if(file.endsWith('discord-identity-fyQiljmH.js'))code+='\n'+fs.readFileSync('assets/native-work-cache.js','utf8')+'\n'+fs.readFileSync('assets/native-shared-hook-oct18.js','utf8');
 if(file.endsWith('page-CEksd6bP.js')){
  code=fs.readFileSync(process.argv[3]||'build/official-20261018/page-CEksd6bP.js.adapted.js','utf8')+'\n'+fs.readFileSync('assets/native-module-hook-oct18.js','utf8')+'\n'+fs.readFileSync('assets/native-performance-hook-oct18.js','utf8');
  code+='\n;window.thorPageTest={Xv:ny,Ey:Iy};';
 }
 const mod=new vm.SourceTextModule(code,{context,identifier:file});modules.set(file,mod);await mod.link(async spec=>load(path.resolve(path.dirname(file),spec)));return mod;
}
const page=await load(path.join(base,'page-CEksd6bP.js'));try{await page.evaluate();}catch(error){console.error(error.message);console.error(error.stack.split('\n').filter(line=>line.length<500).slice(0,5).join('\n'));process.exit(1);}
assert.equal(context.thorGameAdapter.version,'0ece8d95aeb0e97879c45350227ceb83ff10b7788a9802de4a6b208c5c64bcf5');
const data=context.thorGameData,native=context.thorPageTest;
let totals=0;
for(const characterId of Object.keys(data.classes))for(const levelId of ['astrub','wabbit','litneg','gelee','dragoeuf']){
 const s=data.createState(1500,875,'arcade-wasd',levelId,[],[],6,6,1,1,characterId);s.phase='playing';s.testMode=true;
 context.thorNativeContext={gameRef:{current:s},setPhase(){},thorRefreshHud(){},pausedRef:{current:false}};
 assert.equal(data.getClass(s).id,characterId);assert.equal(Object.keys(data.spells).length,65);assert.equal(Object.keys(data.items).length,225);
 const previews=native.Xv(s);for(const id of data.getClass(s).abilities)assert(Object.hasOwn(previews,id));
 for(const id of data.getClass(s).abilities){s.abilityUnlocked[id]=true;s.abilityLevels[id]=1;s.awakenings[id]=null;}
 totals++;
}
console.log('ES modules linked with immutable imports; page/shared adapters evaluated; native class/previews for',totals,'class/map pairs passed.');



// Native dispatcher accepts current Iop controls on every map, without React or network.
for(const levelId of ['astrub','wabbit','litneg','gelee','dragoeuf']){
 const s=data.createState(1500,875,'arcade-wasd',levelId,[],[],6,6,1,1,'iop');s.phase='playing';s.testMode=true;s.abilityUnlocked.brokle=true;
 const before=JSON.stringify(s);
 native.Ey({gameRef:{current:s},pointerRef:{current:{inside:true,x:s.player.x,y:s.player.y}},pausedRef:{current:false},burst(){}}).castAbility('brokle');
 assert.notEqual(JSON.stringify(s),before,'Native Brokle accepts automatic player-centred input: '+levelId);
}
console.log('Native Brokle dispatch accepted on all five maps.');
