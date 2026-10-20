import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';import assert from 'node:assert/strict';import {webcrypto} from 'node:crypto';
process.on('uncaughtException',error=>{console.error(error.stack.split('\n').filter(line=>line.length<500).slice(0,8).join('\n'));process.exit(1);});

const base=path.resolve(process.argv[2]||'build/official-20261020c'),modules=new Map(),storage=new Map();
const context=vm.createContext({console,performance,URL,URLSearchParams,AbortController,AbortSignal,Response,Request,Headers,structuredClone,queueMicrotask,TextEncoder,TextDecoder,crypto:webcrypto,setTimeout,clearTimeout,setInterval,clearInterval,location:new URL('https://retrosurvival.online/'),history:{state:null,pushState(){},replaceState(){},back(){},length:1},navigator:{language:'fr',userAgent:'Local module test'},addEventListener(){},removeEventListener(){},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},fetch(){throw Error('Network forbidden in module smoke test')}});
context.window=context;context.self=context;context.thorSession={local:true};
async function load(file){if(modules.has(file))return modules.get(file);let code=fs.readFileSync(file,'utf8');
 if(file.endsWith('discord-identity-BofEmv2P.js'))code+='\n'+fs.readFileSync('assets/native-work-cache.js','utf8')+'\n'+fs.readFileSync('assets/native-shared-hook-oct20c.js','utf8');
 if(file.endsWith('page-D8qRcVId.js')){
  code=fs.readFileSync("build/official-20261020c/page-D8qRcVId.js.adapted.js","utf8")+'\n'+fs.readFileSync('assets/native-module-hook-oct20c.js','utf8')+'\n'+fs.readFileSync('assets/native-performance-hook-oct20c.js','utf8');
  code+='\n;window.thorPageTest={Xv:Rx,Ey:SS,render:XR};';
 }
 const mod=new vm.SourceTextModule(code,{context,identifier:file});modules.set(file,mod);await mod.link(async spec=>load(path.resolve(path.dirname(file),spec)));return mod;
}
const page=await load(path.join(base,'page-D8qRcVId.js'));try{await page.evaluate();}catch(error){console.error(error.message);console.error(error.stack.split('\n').filter(line=>line.length<500).slice(0,5).join('\n'));process.exit(1);}
assert.equal(context.thorGameAdapter.version,'03e4768020c7b58114b82b628526f4313739e3eb3f29219748de338ad203ae4c');
const data=context.thorGameData,native=context.thorPageTest;


for(const id of Object.keys(data.classes))for(const map of ['astrub','wabbit','litneg','gelee','dragoeuf','rat-noir']){const s=data.createState(1500,875,'arcade-wasd',map,[],[],6,6,1,1,id);s.phase='playing';s.testMode=true;context.thorNativeContext={gameRef:{current:s},pausedRef:{current:false}};assert.equal(data.getClass(s).id,id);const preview=native.Xv(s);for(const spell of data.getClass(s).abilities)assert(Object.hasOwn(preview,spell),id+': '+spell);}
console.log('Native current modules: six classes on six maps and all class previews passed.');

for(const id of data.classes.cra.abilities){const s=data.createState(1500,875,'arcade-wasd','rat-noir',[],[],0,0,0,0,'cra');s.phase='playing';s.testMode=true;s.abilityUnlocked[id]=true;s.abilityLevels[id]=1;const p=s.player;s.enemies=[{id:1,x:p.x+80,y:p.y,r:15,hp:50,maxHp:50,state:'chase',invisibleTimer:0,arrival:0,kind:'kolerat',angle:0,speed:80}];const before=JSON.stringify(s);native.Ey({gameRef:{current:s},pointerRef:{current:{inside:true,x:p.x+80,y:p.y}},pausedRef:{current:false},burst(){}}).castAbility(id);assert.equal(JSON.stringify(s)!==before,!['frozenArrow','harassingArrow','distantShot','criticalShot'].includes(id),'native cast/passive distinction: '+id);}
