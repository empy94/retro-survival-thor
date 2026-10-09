const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
class Node{constructor(tag){this.tag=tag;this.children=[];this.attrs={};}append(...nodes){this.children.push(...nodes)}setAttribute(k,v){this.attrs[k]=v}remove(){this.removed=true}}
const document={body:new Node('body'),createElement:tag=>new Node(tag),addEventListener(){}};const window={thorLocale:{text:s=>s}};
vm.runInNewContext(fs.readFileSync('assets/deck.js','utf8').split('/* deck */')[0],{window,document});
const saved=[];const picker=window.thorDeckChoice.create('Libération',[{value:'',label:'Automatique'},{value:'L1 + Y',label:'L1 + Y'}],'',v=>saved.push(v));
assert.equal(picker.tag,'button');picker.onclick();let layer=document.body.children.at(-1),list=layer.children[0].children[1];assert.equal(list.attrs.role,'listbox');assert.equal(picker.attrs['aria-expanded'],'true');list.children[1].onclick();assert.deepEqual(saved,['L1 + Y']);assert.equal(picker.value,'L1 + Y');assert(layer.removed);assert.equal(picker.attrs['aria-expanded'],'false');
picker.onclick();layer=document.body.children.at(-1);layer.children[0].children[2].onclick();assert(layer.removed);assert.equal(saved.length,1,'closing must not change settings');picker.onclick();window.thorDeckChoice.close();assert.equal(picker.attrs['aria-expanded'],'false');
assert(!fs.readFileSync('assets/deck.js','utf8').includes("createElement('select')"),'no Android native select popup on either display');
console.log('Deck picker: DOM-only popup, saved selection, dismissal and no native selects passed');
