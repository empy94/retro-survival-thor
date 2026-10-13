/* Verified official game module: 13 October 2026 content update. */
;window.thorGameAdapter={cleanProgress:tL,version:"1d0ca84d7f804519dbeeb7a1eb9233292d6e3a770ffbe04511dcc16dff3491b4",canAutoCast(id){if(id!=='crow')return true;const s=window.thorNativeContext?.gameRef.current;return !!s&&s.levelId==='dragoeuf'&&s.phase==='playing'&&s.enemies.some(e=>gM(e)&&Math.hypot(e.x-s.player.x,e.y-s.player.y)<=Am.range+e.r);},summonState(s){return s?.levelId==='gelee'?{chest:wD(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length,chestLimit:CD(s,'animatedChest')}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s||s.levelId!=='dragoeuf')return null;if(id==='cracklerStrike'){const v=xM(s);return {distance:Math.hypot(v.x,v.y),variable:false,showRange:true};}if(id==='toad')return {distance:Math.hypot(s.width,s.height),variable:true,showRange:false};return null;}};
;const thorOriginalCanvas=KV;KV=context=>{window.thorNativeContext=context;return thorOriginalCanvas(context);};
;const thorOriginalLoot=Tb;
Tb=(state,loot)=>{
 if(window.thorSalePolicy?.enabled&&loot.item&&window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,...Sb(state,loot.x,loot.y),kind:'kama-purse',kamas:ib(loot.item),life:60}),true;
 return thorOriginalLoot(state,loot);
};
