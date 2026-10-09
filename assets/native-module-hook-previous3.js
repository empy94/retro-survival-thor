/* Verified official game module: 9 October 2026 content update. */
;window.thorGameAdapter={cleanProgress:PD,version:"67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2"};
;const thorOriginalCanvas=nj;nj=context=>{window.thorNativeContext=context;return thorOriginalCanvas(context);};
;const thorOriginalLoot=g_;
g_=(state,loot)=>{
 if(window.thorSalePolicy?.enabled&&loot.item&&window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,...h_(state,loot.x,loot.y),kind:'kama-purse',kamas:Yh(loot.item),life:30}),true;
 return thorOriginalLoot(state,loot);
};
