/* Verified official game module: 12 October 2026 content update. */
;window.thorGameAdapter={cleanProgress:LI,version:"200389afa2729d9ad2204b18d3605c3a8c3df59afae449cbb7da9587db616ca3",summonState(s){return s?.levelId==='gelee'?{chest:uD(s,'animatedChest'),chestCount:s.enutrof.chests.filter(c=>c.hp>0&&c.remaining>0&&c.state!=='dead').length,chestLimit:lD(s,'animatedChest')}:null;},radialSpec(id){const s=window.thorNativeContext?.gameRef.current;if(!s||s.levelId!=='dragoeuf')return null;if(id==='cracklerStrike'){const v=iM(s);return {distance:Math.hypot(v.x,v.y),variable:false,showRange:true};}if(id==='toad')return {distance:Math.hypot(s.width,s.height),variable:true,showRange:false};return null;}};
;const thorOriginalCanvas=eH;eH=context=>{window.thorNativeContext=context;return thorOriginalCanvas(context);};
;const thorOriginalLoot=gb;
gb=(state,loot)=>{
 if(window.thorSalePolicy?.enabled&&loot.item&&window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,...pb(state,loot.x,loot.y),kind:'kama-purse',kamas:eb(loot.item),life:60}),true;
 return thorOriginalLoot(state,loot);
};
