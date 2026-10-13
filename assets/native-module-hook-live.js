/* Verified official game module: 13 October 2026 content update. */
;window.thorGameAdapter={cleanProgress:yL,version:"c3f2557230b1ea96cf1e33d0730864d48a31efa1367bc135e95b605724ec3149",canAutoCast(id){if(id!=='crow')return true;const s=window.thorNativeContext?.gameRef.current;return !!s&&s.levelId==='dragoeuf'&&s.phase==='playing'&&s.enemies.some(e=>NM(e)&&Math.hypot(e.x-s.player.x,e.y-s.player.y)<=Nm.range+e.r);},summonState(s){return s?.levelId==='gelee'?{chest:OD(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length,chestLimit:DD(s,'animatedChest')}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s||s.levelId!=='dragoeuf')return null;if(id==='cracklerStrike'){const v=RM(s);return {distance:Math.hypot(v.x,v.y),variable:false,showRange:true};}if(id==='toad')return {distance:Math.hypot(s.width,s.height),variable:true,showRange:false};return null;}};
;const thorOriginalCanvas=vH;vH=context=>{window.thorNativeContext=context;return thorOriginalCanvas(context);};
;const thorOriginalLoot=Ob;
Ob=(state,loot)=>{
 if(window.thorSalePolicy?.enabled&&loot.item&&window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,...Tb(state,loot.x,loot.y),kind:'kama-purse',kamas:sb(loot.item),life:60}),true;
 return thorOriginalLoot(state,loot);
};
