const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
class Node {constructor(){this.style={};this.children=[];this.dataset={};this.replacements=0;}append(...n){this.children.push(...n)}replaceChildren(...n){this.children=n;this.replacements++}setAttribute(){}}
const ids=new Map(),fixed=['Personnage','♥ Points de vie','Caractéristiques','Équipement'].map(s=>{const n=new Node();n.dataset.i18n=s;return n;});
let code='fr';const notified=[];
const document={documentElement:{},querySelector:()=>({lang:code}),querySelectorAll:()=>fixed,getElementById:id=>{if(!ids.has(id))ids.set(id,new Node());return ids.get(id)},createElement:()=>new Node()};
const context={window:{ThorPreferences:{setLanguage:c=>notified.push(c)}},document};vm.createContext(context);
vm.runInContext(fs.readFileSync('assets/locale.js','utf8'),context);
const locale=context.window.thorLocale;locale.sync();assert.deepEqual(notified,['fr']);
code='en';locale.sync();assert.equal(locale.text('Stick droit : direction'),'Right stick: direction');
code='es';locale.sync();assert.equal(locale.text('Fermer'),'Cerrar');locale.setLanguage('invalid');assert.equal(locale.language,'es');
const script=fs.readFileSync('assets/dashboard.html','utf8').match(/<script>([\s\S]+)<\/script>/)[1];vm.runInContext(script,context);
const render=context.window.renderThorDashboard;
render({status:'title',locale:'en'});assert.equal(fixed[0].textContent,'Character');
const data={status:'run',locale:'en',phase:'playing',hp:4,maxHp:5,kamas:100,level:2,wave:1,stats:[{name:'Damage',value:'+15 %'}],slots:{hat:'Hat'},items:[]};
render(data);assert.equal(fixed[1].textContent,'♥ Health');const statUpdates=ids.get('stats').replacements,equipmentUpdates=ids.get('equipment').replacements;
render({...data,hp:3});assert.equal(ids.get('hp').textContent,'3 / 5');assert.equal(ids.get('stats').replacements,statUpdates);assert.equal(ids.get('equipment').replacements,equipmentUpdates,'health updates do not rebuild equipment');
assert.equal(ids.get('health').style.height,'60%');assert.equal(ids.get('hp-current').textContent,3);assert.equal(ids.get('hp-max').textContent,5);
render({...data,locale:'es'});assert.equal(fixed[0].textContent,'Personaje');assert.equal(fixed[3].textContent,'Equipo');assert.equal(ids.get('equipment').replacements,equipmentUpdates+1);
render({status:'title',locale:'fr'});assert.equal(fixed[0].textContent,'Personnage');
const collection={status:'available',owned:0,total:2,entries:[{id:'cawotte',name:'Dofus Cawotte',level:'Île Wabbit',owned:false,ranges:[{label:'XP reçue',min:6,max:50,unit:'%',radiant:75}]}]};
render({status:'title',locale:'fr',collection});assert.equal(ids.get('collection-detail').hidden,true,'rolls do not occupy space by default');
ids.get('collection-items').children[0].onclick();assert.equal(ids.get('collection-detail').hidden,false);assert.match(ids.get('collection-detail').children[1].textContent,/6 \/ 50 %.*75 %/);
ids.get('collection-items').children[0].onclick();assert.equal(ids.get('collection-detail').hidden,true,'second tap collapses details');
render({...data,collection});const collectionUpdates=ids.get('collection-items').replacements;render({...data,hp:2,collection});assert.equal(ids.get('collection-items').replacements,collectionUpdates,'health changes do not rebuild collection');
render({...data,hp:1,helper:{lowHealth:true}});assert.equal(ids.get('run').className,'danger');assert.match(ids.get('health-label').textContent,/Danger/);assert.equal(ids.get('phase').children.length,1,'no proximity counter in header');
assert.equal(ids.get('health').style.height,'20%');render({...data,hp:0,helper:null});assert.equal(ids.get('health').style.height,'0%');render({...data,hp:5,helper:null});assert.equal(ids.get('health').style.height,'100%');
render({...data,helper:null});assert.equal(ids.get('run').className,'');assert.equal(ids.get('phase').children.length,1,'disabled helper leaves no extra line');
console.log('Locale and dashboard: FR/EN/ES, initial synchronization, invalid locale and incremental updates passed');

for(const folder of ['assets','src','res']){for(const file of fs.readdirSync(folder,{recursive:true})){const path=folder+'/'+file;if(!/\.(js|json|html|java|xml|css)$/.test(path))continue;const text=fs.readFileSync(path,'utf8');assert(!/[\u00c3][\u00a0-\u00bf]|\u00c2\u00a0|\u00e2\u20ac|\ufffd/.test(text),'Invalid French encoding: '+path);}}
