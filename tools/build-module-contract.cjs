// Build-time only: exact function contracts with module-binding renames.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),acorn=require(root+'/build/audit-tools/node_modules/acorn'),scope=require(root+'/build/audit-tools/node_modules/eslint-scope');
const [sourceFile,output,...scripts]=process.argv.slice(2),source=fs.readFileSync(sourceFile,'utf8');
function parse(text){return acorn.parse(text,{ecmaVersion:2022,sourceType:'module',ranges:true});}
const ast=parse(source),analysis=scope.analyze(ast,{ecmaVersion:2022,sourceType:'module'}),mod=analysis.scopes.find(s=>s.type==='module');
const bindings=new Map(mod.variables.map(v=>[v.name,v])),positions=new Map(),definitions=new Map(),imports={};
for(const v of mod.variables){for(const n of [...v.identifiers,...v.references.map(r=>r.identifier)])positions.set(n.start,{end:n.end,symbol:v.name});const d=v.defs[0];if(d?.type==='FunctionName')definitions.set(v.name,d.node);else if(d?.type==='Variable')definitions.set(v.name,d.node);}
for(const n of ast.body)if(n.type==='ImportDeclaration')for(const s of n.specifiers)imports[s.local.name]={source:n.source.value,export:s.imported?.name||s.imported?.value||'default'};
function template(text,from,to,refs){const spans=[...refs].filter(([s])=>s>=from&&s<to).sort((a,b)=>a[0]-b[0]);const out=[];let at=from;for(const[start,v]of spans){if(start<at)continue;out.push(text.slice(at,start),{symbol:v.symbol});at=v.end;}out.push(text.slice(at,to));return out;}
const required=new Set(),hooks=[];
for(const file of scripts){const code=fs.readFileSync(file,'utf8'),p=parse(code),s=scope.analyze(p,{ecmaVersion:2022,sourceType:'module'}),refs=new Map();for(const r of s.globalScope.through){const n=r.identifier;if(bindings.has(n.name)){required.add(n.name);refs.set(n.start,{end:n.end,symbol:n.name});}}hooks.push(template(code,0,code.length,refs));}
// Raster insertion uses this module-level scale, outside the appended hooks.
if(scripts.some(f=>f.includes('performance-hook')))required.add('mp');
const localPositions=new Map(positions);let counter=0;for(const [scopeIndex,sc] of analysis.scopes.entries())if(sc!==mod&&sc.type!=='global')for(const v of sc.variables){const key='@'+scopeIndex+':'+counter++;for(const n of [...v.identifiers,...v.references.map(r=>r.identifier)])if(!positions.has(n.start))localPositions.set(n.start,{end:n.end,symbol:key});}
const contracts=[];for(const id of required){if(imports[id])continue;const n=definitions.get(id);if(!n)throw Error('No definition: '+id);contracts.push({symbol:id,parts:template(source,n.start,n.end,localPositions)});}
const used=new Set(required);for(const c of contracts)for(const p of c.parts)if(typeof p==='object')used.add(p.symbol);
const result={schema:1,family:'511ac6afd270438a8011f12e228269868dbb8ae176a8ae9c1a9a7032a94f27c1',imports:Object.fromEntries([...used].filter(id=>imports[id]).map(id=>[id,imports[id]])),contracts,hooks};
fs.writeFileSync(output,JSON.stringify(result));console.log(path.basename(output),contracts.length,'contracts,',Object.keys(result.imports).length,'import bindings,',fs.statSync(output).size,'bytes');
