/* Verified official game module: 13 October 2026 content update. */
;window.thorGameAdapter={cleanProgress:aL,version:"53641e4311a21c12e3e176a4d32f0d12b79d870db7ea37addd9de121e0cf47b4",canAutoCast(id){if(id!=='crow')return true;const s=window.thorNativeContext?.gameRef.current;return !!s&&s.levelId==='dragoeuf'&&s.phase==='playing'&&s.enemies.some(e=>bM(e)&&Math.hypot(e.x-s.player.x,e.y-s.player.y)<=Mm.range+e.r);},summonState(s){return s?.levelId==='gelee'?{chest:DD(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length,chestLimit:ED(s,'animatedChest')}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s||s.levelId!=='dragoeuf')return null;if(id==='cracklerStrike'){const v=TM(s);return {distance:Math.hypot(v.x,v.y),variable:false,showRange:true};}if(id==='toad')return {distance:Math.hypot(s.width,s.height),variable:true,showRange:false};return null;}};
;const thorOriginalCanvas=XV;XV=context=>{window.thorNativeContext=context;return thorOriginalCanvas(context);};
;const thorOriginalLoot=Db;
Db=(state,loot)=>{
 if(window.thorSalePolicy?.enabled&&loot.item&&window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,...wb(state,loot.x,loot.y),kind:'kama-purse',kamas:ob(loot.item),life:60}),true;
 return thorOriginalLoot(state,loot);
};
