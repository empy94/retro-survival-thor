const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
for(const family of ['latest','newest','live']){
 const fixture=require('./fixtures/native-work-'+family+'.json'),{names,definitions}=fixture;
 const catalogue={a:{effects:[{stat:'damage'},{stat:'damage'},{stat:'speed'}]},b:{effects:[]},c:{effects:[{stat:'speed'},{stat:'evasion'}]}};
 const ctx={window:{},items:catalogue,radiant:{b:{speed:8}},Nk:s=>s.others,Rk:s=>s.others,kk:s=>s.others,VA:kind=>kind==='wall',LA:kind=>kind==='wall',$A:kind=>kind==='wall'};vm.createContext(ctx);
 vm.runInContext(`const ${family==='live'?'Qf':family==='newest'?'Zf':'Yf'}=items,${family==='live'?'np':family==='newest'?'tp':'$f'}=radiant;`,ctx);
 for(const role of ['slots','flat','bonus','total','summons','taunts','kind','targetable','target'].filter(role=>definitions[role])){
  const code=definitions[role];vm.runInContext(code.startsWith('function ')?code:`var ${names[role]}=${code};`,ctx);
 }
 vm.runInContext(fs.readFileSync('assets/native-work-cache.js','utf8'),ctx);
 const work=vm.runInContext(`window.thorWorkCache.install({slots:${names.slots},items,radiant,target:${names.target},taunts:${names.taunts}${names.targetable?',summonTargetable:'+names.targetable:''}})`,ctx);
 let seed=43920;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 for(let i=0;i<4000;i++){
  const make=()=>({id:['a','b','c'][Math.floor(rand()*3)],rolls:[rand()*20-10,rand()*20-10,rand()*20-10],radiant:rand()<.5});
  ctx.equipment=Object.fromEntries(['hat','cape','boots','belt','weapon','amulet','shield'].map(slot=>[slot,rand()<.3?null:make()]));
  ctx.equipment.ring=Array.from({length:i%3},make);ctx.equipment.dofus=Array.from({length:i%7},make);
  if(i%4===0)delete ctx.equipment.dofus[1];
  for(const stat of ['damage','speed','evasion','absent']){
   ctx.stat=stat;assert.equal(work.total(ctx.equipment,stat),vm.runInContext(`${names.total}(equipment,stat)`,ctx));
  }
  ctx.equipment.hat={id:'a',rolls:[1,99,3],radiant:false};assert.equal(work.total(ctx.equipment,'damage'),vm.runInContext(`${names.total}(equipment,'damage')`,ctx));
  ctx.equipment.hat.rolls[0]=14;ctx.equipment.hat.id='c';ctx.equipment.hat.radiant=true;
  assert.equal(work.total(ctx.equipment,'speed'),vm.runInContext(`${names.total}(equipment,'speed')`,ctx),'in-place item changes read immediately');
 }
 for(let i=0;i<6000;i++){
  ctx.state={levelId:i%9===0?'astrub':'dragoeuf',player:{x:300,y:200},osamodas:{playerHiddenTimer:i%3===0?1:0,summons:Array.from({length:i%60},()=>({kind:rand()<.2?'wall':rand()<.5?'tofu':'other',hp:rand()<.15?0:3,state:rand()<.15?'appear':'idle',invisibleTimer:rand()<.15?1:0,wallTimer:rand()<.15?1:0,x:Math.floor(rand()*2400)-1200,y:Math.floor(rand()*1600)-800}))},awakenings:{tofuSummon:i%4===0?3:1},others:[]};
  ctx.enemy={x:300,y:200,kind:i%11===0?'dragoeuf-flying':'other'};
  assert.equal(work.enemyTarget(ctx.state,ctx.enemy),vm.runInContext(`${names.target}(state,enemy)`,ctx),'native summon target identity '+i);
 }
 ctx.state={levelId:'dragoeuf',player:{x:300,y:0},osamodas:{summons:[{x:260,y:0,kind:'wall',hp:2},{x:-260,y:0,kind:'wall',hp:2}]},awakenings:{}};ctx.enemy={x:0,y:0};
 assert.equal(work.enemyTarget(ctx.state,ctx.enemy),ctx.state.osamodas.summons[0],'inclusive taunt radius and first equal target');
}
let paints=0,creates=0,draws=0;
const ctx={window:{},document:{createElement(){creates++;return {getContext(){return {drawImage(){paints++;}}}};}}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('assets/native-work-cache.js','utf8'),ctx);
const painter=ctx.window.thorWorkCache.mapPainter(),target={getTransform:()=>({a:.75,b:0,c:0,d:.75}),drawImage(){draws++;}},image={complete:true,naturalWidth:2000,naturalHeight:1000};
for(let i=0;i<120;i++)assert(painter(target,image,1000,500));assert.equal(paints,1);assert.equal(creates,1);assert.equal(draws,120);
assert(painter(target,image,800,500));assert.equal(paints,2,'resize invalidates');
assert(painter(target,{...image},800,500));assert.equal(paints,3,'map change invalidates');
image.src='new-map.webp';assert(painter(target,image,800,500));assert.equal(paints,4,'same image with a changed source invalidates');
assert.equal(painter(target,{...image,complete:false},800,500),false,'unloaded map falls back');
assert.equal(painter(target,image,100000,100000),false,'allocation remains bounded');
console.log('Native parity: 4000 equipment cases and 6000 summon-target cases per family; live mutations, ordering, map load/resize/change and cache bounds passed.');
