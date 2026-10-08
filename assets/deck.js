(function(){'use strict';
 const el=id=>document.getElementById(id),text=value=>window.thorLocale?.text(value)||value;
 let page=0,character='feca',chosenClass=false,data={},signature='',optionsSignature='',start=null,skipClick=false;
 const classes={feca:'Féca',iop:'Iop',sram:'Sram'};
 function showPage(next){page=Math.max(0,Math.min(2,next));['character','spells','options'].forEach((name,i)=>el('page-'+name).hidden=i!==page);document.querySelectorAll('[data-page]').forEach(n=>n.setAttribute('aria-pressed',String(Number(n.dataset.page)===page)));}
 function card(tag,value){const n=document.createElement(tag);n.textContent=value;return n;}
 function saveOption(name,value){window.ThorDeck?.setOption(name,String(value));}
 function renderSpells(){
  const policy=window.thorSpellPolicy;if(!policy)return;
  const controls=data.controls||{},catalog=policy.catalog,manual=controls.manual?.[character]||[];
  const next=JSON.stringify([character,data.locale,data.character,data.unlocked,controls.mode,manual]);if(next===signature)return;signature=next;
  document.querySelectorAll('[data-class]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.class===character)));
  el('spell-hint').textContent=text('Touche une icône pour choisir Auto ou Manuel. Auto suit le mode global ; tes exceptions sont sauvegardées par classe.');
  const nodes=catalog.classes[character].map(id=>{
   const meta=catalog.spells[id],passive=catalog.passive.includes(id),isManual=manual.includes(id),active=policy.allowed(id,character,controls.mode,controls.manual);
   const b=card('button','');b.type='button';b.className='spell-card'+(isManual?' manual':'');b.disabled=passive;b.dataset.spell=id;b.setAttribute('aria-pressed',String(isManual));
   const img=document.createElement('img');img.src=meta.icon;img.alt='';b.append(img);
   const info=card('span','');info.append(card('strong',text(meta.name)),card('b',text(passive?'Auto du jeu':isManual?'Manuel':active?'Auto':'Auto · en attente')));
   info.append(card('small',data.character===character&&(data.unlocked||[]).includes(id)?text('Débloqué'):text('À débloquer')));b.append(info);
   b.setAttribute('aria-label',text(meta.name)+' · '+text(passive?'Auto du jeu':isManual?'Manuel':'Auto'));
   b.onclick=()=>{window.ThorDeck?.setSpellManual(character,id,!isManual);};return b;
  });el('spell-grid').replaceChildren(...nodes);
 }
 function renderOptions(){
  const controls=data.controls||{};const next=JSON.stringify([data.locale,controls]);if(next===optionsSignature)return;optionsSignature=next;
  const rows=[],row=(label,input)=>{const r=card('label','');r.className='deck-option';r.append(card('span',text(label)),input);rows.push(r);return r;};
  const select=document.createElement('select');select.setAttribute('aria-label',text('Assistance des sorts'));
  for(const [value,label] of [['off','Désactivée'],['buffs','Buffs auto uniquement'],['full','Tous les sorts intelligents']]){const option=card('option',text(label));option.value=value;select.append(option);}select.value=controls.mode||'off';select.onchange=()=>saveOption('autoSpellMode',select.value);row('Assistance des sorts',select);
  for(const [key,label] of [['radialAim','Visée radiale des sorts à cibler'],['hideCombatCursor','Masquer le curseur pendant les combats'],['showLabels','Touches sur les sorts actifs'],['showJoystick','Joystick visuel en bas à gauche'],['combatHelper','Alerte de PV faibles sur la fiche']]){const input=document.createElement('input');input.type='checkbox';input.checked=controls[key]!==false;input.onchange=()=>saveOption(key,input.checked);row(label,input);}
  for(const [key,label,min,max] of [['cursorSensitivity','Sensibilité du curseur : ',25,250],['labelOpacity','Opacité des touches : ',15,85]]){const input=document.createElement('input');input.type='range';input.min=min;input.max=max;input.value=controls[key]??(key==='cursorSensitivity'?100:45);const out=card('output',input.value+' %');input.oninput=()=>out.textContent=input.value+' %';input.onchange=()=>saveOption(key,input.value);row(label,input).append(out);}
  el('deck-options').replaceChildren(...rows);
 }
 window.thorDeckUI={render(next){data=next;if(data.character&&!chosenClass)character=data.character;renderSpells();renderOptions();el('deck-save').textContent=text('Sauvegarde auto');}};
 document.querySelectorAll('[data-page]').forEach(n=>n.onclick=()=>showPage(Number(n.dataset.page)));
 document.querySelectorAll('[data-class]').forEach(n=>n.onclick=()=>{character=n.dataset.class;chosenClass=true;renderSpells();});
 const sheet=document.querySelector('.sheet');sheet.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.target.closest('input,select'))return;start={id:e.pointerId,x:e.clientX,y:e.clientY};},{passive:true});
 sheet.addEventListener('pointerup',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(Math.abs(dx)>=60&&Math.abs(dx)>Math.abs(dy)*1.5){skipClick=true;setTimeout(()=>{skipClick=false;},0);showPage(page+(dx<0?1:-1));}}, {passive:true});
 sheet.addEventListener('pointercancel',()=>{start=null;});sheet.addEventListener('click',e=>{if(skipClick){skipClick=false;e.preventDefault();e.stopPropagation();}},true);
 let touchStart=null;
 sheet.addEventListener('touchstart',e=>{if(e.target.closest('input,select')||e.touches.length!==1){touchStart=null;return;}const t=e.touches[0];touchStart={x:t.clientX,y:t.clientY};},{passive:true});
 sheet.addEventListener('touchmove',e=>{if(!touchStart||e.touches.length!==1)return;const t=e.touches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;if(Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)*1.5)e.preventDefault();},{passive:false});
 sheet.addEventListener('touchend',e=>{if(!touchStart)return;const t=e.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>=60&&Math.abs(dx)>Math.abs(dy)*1.5){skipClick=true;setTimeout(()=>{skipClick=false;},0);showPage(page+(dx<0?1:-1));}},{passive:true});
 sheet.addEventListener('touchcancel',()=>{touchStart=null;});
 showPage(0);
})();
