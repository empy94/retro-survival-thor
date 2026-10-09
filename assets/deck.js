(function(){'use strict';
 let opened=null;
 function close(){if(!opened)return;opened.layer.remove();opened.button.setAttribute('aria-expanded','false');opened=null;}
 function create(label,choices,value,onchange){
  const button=document.createElement('button');button.type='button';button.className='deck-choice';button.value=value;button.setAttribute('aria-label',label);button.setAttribute('aria-haspopup','listbox');button.setAttribute('aria-expanded','false');
  const refresh=()=>{button.textContent=(choices.find(c=>c.value===button.value)?.label||label)+' ▾';};refresh();
  button.onclick=()=>{close();const layer=document.createElement('div');layer.className='deck-choice-layer';layer.setAttribute('role','dialog');layer.setAttribute('aria-label',label);
   const box=document.createElement('div');box.className='deck-choice-box';const title=document.createElement('strong');title.textContent=label;box.append(title);
   const list=document.createElement('div');list.className='deck-choice-list';list.setAttribute('role','listbox');list.setAttribute('aria-label',label);
   for(const choice of choices){const option=document.createElement('button');option.type='button';option.textContent=choice.label;option.setAttribute('role','option');option.setAttribute('aria-selected',String(choice.value===button.value));option.onclick=()=>{button.value=choice.value;refresh();close();onchange(choice.value);};list.append(option);}box.append(list);
   const dismiss=document.createElement('button');dismiss.type='button';dismiss.textContent=window.thorLocale?.text('Fermer')||'Fermer';dismiss.className='deck-choice-close';dismiss.onclick=close;box.append(dismiss);layer.append(box);layer.onclick=e=>{if(e.target===layer)close();};document.body.append(layer);button.setAttribute('aria-expanded','true');opened={layer,button};
  };return button;
 }
 window.thorDeckChoice={create,close};document.addEventListener('keydown',e=>{if(opened&&e.key==='Escape'){e.preventDefault();close();}});
})();
/* deck */
(function(){'use strict';
 const el=id=>document.getElementById(id),text=value=>window.thorLocale?.text(value)||value;
 let page=0,character='feca',chosenClass=false,data={},signature='',optionsSignature='',start=null,skipClick=false;
 const classes={feca:'Féca',iop:'Iop',sram:'Sram'};
 function showPage(next){window.thorDeckChoice.close();const pages=[...document.querySelectorAll('.deck-page')];page=Math.max(0,Math.min(pages.length-1,next));pages.forEach((node,i)=>node.hidden=i!==page);document.querySelectorAll('[data-page]').forEach(n=>n.setAttribute('aria-pressed',String(Number(n.dataset.page)===page)));}
 function card(tag,value){const n=document.createElement(tag);n.textContent=value;return n;}
 function saveOption(name,value){window.ThorDeck?.setOption(name,String(value));}
 function renderSpells(){
  const policy=window.thorSpellPolicy;if(!policy)return;
  const controls=data.controls||{},catalog=policy.catalog,manual=controls.manual?.[character]||[];
  const next=JSON.stringify([character,data.locale,data.character,data.unlocked,data.spellBindings,controls.mode,manual,controls.shortcuts]);if(next===signature)return;signature=next;
  document.querySelectorAll('[data-class]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.class===character)));
  el('spell-hint').textContent=text('Touche une icône pour choisir Auto ou Manuel. Auto suit le mode global ; tes exceptions sont sauvegardées par classe.');
  const nodes=catalog.classes[character].map(id=>{
   const meta=catalog.spells[id],passive=catalog.passive.includes(id),isManual=manual.includes(id),active=policy.allowed(id,character,controls.mode,controls.manual);
   const b=card('button','');b.type='button';b.className='spell-card'+(isManual?' manual':'');b.disabled=passive;b.dataset.spell=id;b.setAttribute('aria-pressed',String(isManual));
   const img=document.createElement('img');img.src=meta.icon;img.alt='';b.append(img);
   const info=card('span','');info.append(card('strong',text(meta.name)),card('b',text(passive?'Auto du jeu':isManual?'Manuel':active?'Auto':'Auto · en attente')));
   info.append(card('small',data.character===character&&(data.unlocked||[]).includes(id)?text('Débloqué'):text('À débloquer')));b.append(info);
   b.setAttribute('aria-label',text(meta.name)+' · '+text(passive?'Auto du jeu':isManual?'Manuel':'Auto'));
   b.onclick=()=>{window.ThorDeck?.setSpellManual(character,id,!isManual);};
   const wrapper=card('div','');wrapper.className='spell-entry';wrapper.append(b);
   if(!passive){const automatic=text('Automatique')+(data.character===character&&data.spellBindings?.find(s=>s.id===id)?' · '+data.spellBindings.find(s=>s.id===id).button:'');const choices=[{value:'',label:automatic},...(window.thorSpellBindings?.names||[]).map(name=>({value:name,label:name}))];const selector=window.thorDeckChoice.create(text('Raccourci')+' · '+text(meta.name),choices,controls.shortcuts?.[character]?.[id]||'',value=>window.ThorDeck?.setShortcut(character,id,value));selector.dataset.binding=id;wrapper.append(selector);}return wrapper;
  });el('spell-grid').replaceChildren(...nodes);
 }
 function renderOptions(){
  const controls=data.controls||{};const next=JSON.stringify([data.locale,controls]);if(next===optionsSignature)return;optionsSignature=next;
  const rows=[],row=(label,input)=>{const r=card('label','');r.className='deck-option';r.append(card('span',text(label)),input);rows.push(r);return r;};
  const choices=[['off','Désactivée'],['buffs','Buffs auto uniquement'],['full','Tous les sorts intelligents']].map(([value,label])=>({value,label:text(label)}));const select=window.thorDeckChoice.create(text('Assistance des sorts'),choices,controls.mode||'off',value=>saveOption('autoSpellMode',value));row('Assistance des sorts',select);
  for(const [key,label] of [['radialAim','Visée radiale des sorts à cibler'],['hideCombatCursor','Masquer le curseur pendant les combats'],['showLabels','Touches sur les sorts actifs'],['showJoystick','Joystick visuel en bas à gauche'],['combatHelper','Alerte de PV faibles sur la fiche'],['safeAutoSell','Vendre les doublons identiques moins bons']]){const input=document.createElement('input');input.type='checkbox';input.checked=key==='safeAutoSell'?controls[key]===true:controls[key]!==false;input.onchange=()=>saveOption(key,input.checked);row(label,input);}
  for(const [key,label,min,max] of [['cursorSensitivity','Sensibilité du curseur : ',25,250],['labelOpacity','Opacité des touches : ',15,85]]){const input=document.createElement('input');input.type='range';input.min=min;input.max=max;input.value=controls[key]??(key==='cursorSensitivity'?100:45);const out=card('output',input.value+' %');input.oninput=()=>out.textContent=input.value+' %';input.onchange=()=>saveOption(key,input.value);row(label,input).append(out);}
  el('deck-options').replaceChildren(...rows);
 }
 window.thorDeckUI={page:showPage,render(next){data=next;if(data.character&&!chosenClass)character=data.character;renderSpells();renderOptions();el('deck-save').textContent=text('Sauvegarde auto');}};
 document.querySelectorAll('[data-page]').forEach(n=>n.onclick=()=>showPage(Number(n.dataset.page)));
 document.querySelectorAll('[data-class]').forEach(n=>n.onclick=()=>{character=n.dataset.class;chosenClass=true;renderSpells();});
 const sheet=document.querySelector('.sheet');sheet.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.target.closest('input,.deck-choice,.deck-choice-layer'))return;start={id:e.pointerId,x:e.clientX,y:e.clientY};},{passive:true});
 sheet.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>=60&&Math.abs(dx)>Math.abs(dy)*1.5){skipClick=true;setTimeout(()=>{skipClick=false;},0);showPage(page+(dx<0?1:-1));}}, {passive:true});
 sheet.addEventListener('pointercancel',()=>{start=null;});sheet.addEventListener('click',e=>{if(skipClick){skipClick=false;e.preventDefault();e.stopPropagation();}},true);
 let touchStart=null;
 sheet.addEventListener('touchstart',e=>{if(e.target.closest('input,.deck-choice,.deck-choice-layer')||e.touches.length!==1){touchStart=null;return;}const t=e.touches[0];touchStart={x:t.clientX,y:t.clientY};},{passive:true});
 sheet.addEventListener('touchmove',e=>{if(!touchStart||e.touches.length!==1)return;const t=e.touches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.5)e.preventDefault();},{passive:false});
 sheet.addEventListener('touchend',e=>{if(!touchStart)return;const t=e.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>=60&&Math.abs(dx)>Math.abs(dy)*1.5){skipClick=true;setTimeout(()=>{skipClick=false;},0);showPage(page+(dx<0?1:-1));}},{passive:true});
 sheet.addEventListener('touchcancel',()=>{touchStart=null;});
 showPage(0);
})();
