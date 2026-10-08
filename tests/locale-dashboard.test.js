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
render({...data,locale:'es'});assert.equal(fixed[0].textContent,'Personaje');assert.equal(fixed[3].textContent,'Equipo');assert.equal(ids.get('equipment').replacements,equipmentUpdates+1);
render({status:'title',locale:'fr'});assert.equal(fixed[0].textContent,'Personnage');
console.log('Locale and dashboard: FR/EN/ES, initial synchronization, invalid locale and incremental updates passed');
