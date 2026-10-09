(function(root){'use strict';
 // Heuristic planner in game coordinates. Original touch handlers remain the
 // sole authority for cooldowns, terrain, damage and valid placements.
 const buffs={shield:'shieldTimer',speed:'speedBoostTimer',staffScience:'science',power:'power',invisibility:'invisible',vitality:'vitality',mutilation:'mutilation',amplification:'amplification',acceleration:'acceleration'};
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
 function plan(s,spells,mapping,mode='full'){
   if(!s||s.phase!=='playing'||s.busy||s.player.hp<=0)return null;
   if(mode==='buffs'){const spell=spells.find(spell=>spell.ready&&Object.prototype.hasOwnProperty.call(buffs,spell.id)&&!((s.player[buffs[spell.id]]??s.buffs?.[buffs[spell.id]])>0));return spell?{spell,target:null,score:1}:null;}
   if(mode!=='full'||!s.enemies.length)return null;
   const p=s.player,enemies=s.enemies.filter(e=>[e.x,e.y].every(Number.isFinite));if(!enemies.length)return null;
   const nearest=Math.min(...enemies.map(e=>distance(e,p)-e.r)),urgent=nearest<65;
   const candidates=[];
   const add=(spell,target,score)=>candidates.push({spell,target,score});
   const danger=q=>enemies.reduce((v,e)=>v+Math.max(0,140+e.r-distance(q,e)),0);
   for(const spell of spells){if(!spell.ready)continue;const id=spell.id;
     if(id==='animatedChest'&&s.summons?.chest)continue;
     if(id in buffs){const timer=p[buffs[id]]??s.buffs[buffs[id]];
       if(timer>0)continue;if(id==='invisibility'&&!urgent&&p.hp/p.maxHp>.5)continue;
       add(spell,null,(id==='shield'||id==='invisibility'?urgent?1000:300:250));continue;}
     const spec=mapping.radialSpec(id,s.upgrades,s.awakenings);
     if(id==='dash'||id==='jump'||id==='sramDouble'&&s.double&&s.awakenings.sramDouble===2){
       if(!urgent)continue;let best=null,bestRisk=danger(p)-35;
       const fixed=id==='dash'&&s.awakenings.dash===3&&p.teleportReturnTimer>0?{x:p.teleportReturnX,y:p.teleportReturnY}:id==='sramDouble'?s.double:null;
       const points=fixed?[fixed]:Array.from({length:16},(_,i)=>({x:p.x+Math.cos(i*Math.PI/8)*spec.distance,y:p.y+Math.sin(i*Math.PI/8)*spec.distance}));
       for(const q of points){if(q.x<20||q.y<20||q.x>s.width-20||q.y>s.height-20)continue;const risk=danger(q);if(risk<bestRisk){best=q;bestRisk=risk;}}
       if(best)add(spell,best,900);continue;
     }
     if(id==='sramDouble'&&s.double)continue;
     if(id==='liberation'||id==='intimidation'||id==='brokle'&&s.awakenings.brokle!==1||id==='burningGlyph'&&!spell.aimed){
       const range=id==='liberation'?150*(1+(s.upgrades.liberationRadius||0)*.15):id==='intimidation'?125:110;
       if(nearest<=range)add(spell,id==='brokle'?{x:p.x,y:p.y}:null,id==='liberation'&&urgent?850:120);continue;
     }
     if(!spec){if(id==='earlyRetreat'){if(urgent)add(spell,null,700);}else if(!spell.aimed&&s.character==='enutrof'&&!(id==='animatedChest'&&s.summons?.chest))add(spell,null,100);continue;}
     const range=id==='swordOfFate'?Math.hypot(s.width,s.height):id==='fear'?300:spec.distance;
     const directional=['staffBoomerang','cut','swordOfFate','fear','arnaque','shovelThrow'].includes(id);
     const enutrofRadius={shovelJudgment:85,slaughteringShovel:100,shovelKiss:50,mound:195,corruption:100};
     const radius=id in enutrofRadius?enutrofRadius[id]*(1+(Number(s.upgrades.enutrofSpell?.[id]?.radius)||0)*.1)*(id==='mound'&&s.awakenings.mound===1?1.5:1):id==='massTrap'?57.5:id==='celestialSword'?105:id==='lethalAttack'?80:id==='immobilizationGlyph'||id==='burningGlyph'?100:60;
     let best=null,bestScore=0;
     // Limit quadratic cluster work: 24 nearest candidate centers, up to 128
     // monsters. No canvas/image analysis, networking, or React tree traversal.
     const targets=enemies.filter(e=>distance(e,p)<=range+e.r).sort((a,b)=>distance(a,p)-distance(b,p)).slice(0,24);
     for(const target of targets){const d=distance(target,p),ratio=Math.min(1,range/Math.max(1,d));const q={x:p.x+(target.x-p.x)*ratio,y:p.y+(target.y-p.y)*ratio};
       let score=0;const vx=(q.x-p.x)/(distance(q,p)||1),vy=(q.y-p.y)/(distance(q,p)||1);
       for(const enemy of enemies){let hit;
         if(directional){const ex=enemy.x-p.x,ey=enemy.y-p.y,along=ex*vx+ey*vy;hit=along>=0&&along<=range+enemy.r&&Math.abs(ex*vy-ey*vx)<=35+enemy.r;}
         else hit=distance(enemy,q)<=radius+enemy.r;
         if(hit)score+=100+(distance(enemy,p)<85?25:0);}
       // Reduce repeated traps on the same already occupied location.
       if(s.traps?.some(t=>distance(t,q)<50)&&['massTrap','repulsiveTrap'].includes(id))score=0;
       if(score>bestScore){best=q;bestScore=score;}
     }
     if(best)add(spell,best,bestScore+(id==='immobilizationGlyph'&&urgent?200:0));
   }
   candidates.sort((a,b)=>b.score-a.score);return candidates[0]||null;
 }
 const api={plan};if(typeof module==='object')module.exports=api;
 if(!root?.document)return;
 let manual={},enabled=false,mode='off',timer=null,lastAttempt=new Map(),casts=0,lastSpell=null,lastMs=0,badge=null;
 function tick(){
   if(!enabled||root.document.hidden||!root.thorControls?.autoAvailable())return;
   const main=document.querySelector('main');if(!main?.classList.contains('phase-playing')||main.classList.contains('modal-open')||document.querySelector('.pause-panel'))return;
   const start=performance.now(),now=Date.now(),s=root.thorDashboard?.combatState(mode!=='buffs');
   const spells=[...document.querySelectorAll('.touch-ability')].map(el=>{let f=el[Object.keys(el).find(k=>k.startsWith('__reactFiber'))],id=null;for(let i=0;f&&i<4;i++,f=f.return){if(f.key){id=f.key;break;}}return {el,id,ready:el.getAttribute('aria-disabled')!=='true'&&now-(lastAttempt.get(id)||0)>=800,aimed:root.thorSpellBindings.needsAim(id,s?.awakenings||{})};});
   const eligible=root.thorSpellPolicy?spells.filter(spell=>root.thorSpellPolicy.allowed(spell.id,s?.character,mode,manual,s?.awakenings)):spells;
   const chosen=plan(s,eligible,root.thorSpellBindings,mode);lastMs=performance.now()-start;if(!chosen)return;
   const travel=chosen.target?root.thorDashboard.travelState():null;if(chosen.target&&!travel)return;
   const target=chosen.target?{x:travel.x+(chosen.target.x-s.player.x)*travel.scaleX,y:travel.y+(chosen.target.y-s.player.y)*travel.scaleY}:null;
   lastAttempt.set(chosen.spell.id,now);
   if(root.thorControls.autoCast(chosen.spell,target)){casts++;lastSpell=chosen.spell.id;}
 }
 root.thorAutoSpells={refreshLabel(){if(badge){badge.hidden=!enabled;const key=mode==='buffs'?'Buffs auto':'Sorts auto',label=root.thorLocale?.text(key)||key;if(badge.textContent!==label)badge.textContent=label;}},configure(value,exclusions={}){manual=root.thorSpellPolicy?.sanitize(exclusions)||{};const next=value===true?'full':['full','buffs'].includes(value)?value:'off';if(mode!==next)lastAttempt.clear();mode=next;enabled=mode!=='off';if(!enabled){clearInterval(timer);timer=null;}else if(timer===null)timer=setInterval(tick,80);this.refreshLabel();},status(){return {enabled,mode,attempts:casts,lastSpell,plannerMs:lastMs};}};
 document.addEventListener('DOMContentLoaded',()=>{badge=document.createElement('span');badge.id='thor-auto-status';badge.style.cssText='position:fixed;top:45px;left:104px;z-index:2147483645;border:1px solid #bbce9780;border-radius:5px;padding:3px 7px;background:#17251ccc;color:#cce5aa;font:600 10px sans-serif;pointer-events:none';badge.hidden=true;document.body.append(badge);});
})(typeof window==='object'?window:null);
