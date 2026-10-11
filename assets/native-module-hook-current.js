/* Verified official game module: 11 October 2026 content update. */
;window.thorGameAdapter={cleanProgress:$D,version:"67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2"};
;const thorOriginalCanvas=SM;SM=context=>{window.thorNativeContext=context;return thorOriginalCanvas(context);};
;const thorOriginalLoot=k_;
k_=(state,loot)=>{
 if(window.thorSalePolicy?.enabled&&loot.item&&window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,...O_(state,loot.x,loot.y),kind:'kama-purse',kamas:cg(loot.item),life:60}),true;
 return thorOriginalLoot(state,loot);
};
