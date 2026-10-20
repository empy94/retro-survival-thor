import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';import assert from 'node:assert/strict';import {webcrypto} from 'node:crypto';
process.on('uncaughtException',error=>{console.error(error.stack.split('\n').filter(line=>line.length<500).slice(0,8).join('\n'));process.exit(1);});

const base=path.resolve(process.argv[2]||'build/official-20261020'),modules=new Map(),storage=new Map();
const context=vm.createContext({console,performance,URL,URLSearchParams,AbortController,AbortSignal,Response,Request,Headers,structuredClone,queueMicrotask,TextEncoder,TextDecoder,crypto:webcrypto,setTimeout,clearTimeout,setInterval,clearInterval,location:new URL('https://retrosurvival.online/'),history:{state:null,pushState(){},replaceState(){},back(){},length:1},navigator:{language:'fr',userAgent:'Local module test'},addEventListener(){},removeEventListener(){},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},fetch(){throw Error('Network forbidden in module smoke test')}});
context.window=context;context.self=context;context.thorSession={local:true};
async function load(file){if(modules.has(file))return modules.get(file);let code=fs.readFileSync(file,'utf8');
 if(file.endsWith('discord-identity-mqIdrlji.js'))code+='\n'+fs.readFileSync('assets/native-work-cache.js','utf8')+'\n'+fs.readFileSync('assets/native-shared-hook-oct20.js','utf8');
 if(file.endsWith('page-DvMap3K8.js')){
  code=fs.readFileSync(process.argv[3]||'build/official-20261020/page-DvMap3K8.js.adapted.js','utf8')+'\n'+fs.readFileSync('assets/native-module-hook-oct20.js','utf8')+'\n'+fs.readFileSync('assets/native-performance-hook-oct20.js','utf8');
  code+='\n;window.thorPageTest={Xv:_b,Ey:Zb,render:kF};';
 }
 const mod=new vm.SourceTextModule(code,{context,identifier:file});modules.set(file,mod);await mod.link(async spec=>load(path.resolve(path.dirname(file),spec)));return mod;
}
const page=await load(path.join(base,'page-DvMap3K8.js'));try{await page.evaluate();}catch(error){console.error(error.message);console.error(error.stack.split('\n').filter(line=>line.length<500).slice(0,5).join('\n'));process.exit(1);}
assert.equal(context.thorGameAdapter.version,'511ac6afd270438a8011f12e228269868dbb8ae176a8ae9c1a9a7032a94f27c1');
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

// This check uses the real range object rather than a substituted test fixture.
assert.equal(data.crow.range,650);
for(const characterId of Object.keys(data.classes)){
 const s=data.createState(1500,875,'arcade-wasd','dragoeuf',[],[],6,6,1,1,characterId);s.phase='playing';
 context.thorNativeContext={gameRef:{current:s}};
 if(characterId==='osamodas'){
  const e={kind:'dragoeuf-black',x:s.player.x+660,y:s.player.y,r:20,hp:5,state:'chase',invisibleTimer:0,arrival:0};s.enemies=[e];
  assert.equal(context.thorGameAdapter.canAutoCast('crow'),true);e.x=s.player.x+671;assert.equal(context.thorGameAdapter.canAutoCast('crow'),false);
 }
}
console.log('Native crow range table and target checks passed.');

context.devicePixelRatio=2;context.HTMLImageElement=class {};
const s=data.createState(1500,875,'arcade-wasd','dragoeuf',[],[],6,6,1,1,'osamodas');s.phase='playing';
const ref=current=>({current}),noop=()=>{},paint=new Proxy({measureText:()=>({width:10})},{get:(t,k)=>k in t?t[k]:noop,set:(t,k,v)=>(t[k]=v,true)});
const e={gameRef:ref(s),clipsRef:ref({}),mapRef:ref(null),lootImagesRef:ref({}),pausedRef:ref(false),pointerRef:ref({inside:false,x:0,y:0}),touchEnabledRef:ref(true),touchMovementRef:ref({x:0,y:0}),touchAimRef:ref(null),keyboardGlyphAimKeyRef:ref(null),localeRef:ref('fr')};
context.thorNativeContext=e;const canvas={style:{},width:1200,height:700};const renderer=native.render(e,canvas,paint,{}, {width:1200,height:700});
context.thorGraphics.configure('no-spells');renderer.renderGame(s);assert.equal(canvas.width,900);
context.thorGraphics.setActive(false);renderer.renderGame(s);context.thorGraphics.setActive(true);renderer.renderGame(s);
console.log('Actual native renderer factory/draw, raster preset and focus recovery passed.');
